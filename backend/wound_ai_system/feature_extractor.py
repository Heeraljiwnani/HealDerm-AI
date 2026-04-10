import cv2
import numpy as np
import torch
from pathlib import Path
from segmentation_model import build_model

DEVICE   = 'cpu'
IMG_SIZE = 256
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "best_model.pth"
MODEL = None

def load_model():
    """Load the trained AI model"""
    global MODEL

    if MODEL is not None:
        return MODEL

    model = build_model().to(DEVICE)
    model.load_state_dict(torch.load(
        MODEL_PATH,
        map_location=DEVICE
    ))
    model.eval()
    MODEL = model
    return MODEL

def predict_mask(model, image_path):
    """
    Given an image path:
    1. Load and preprocess image
    2. Run AI model to predict wound mask
    3. Return original image + predicted mask
    """
    # Load image
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

    # Normalize
    img_norm = img.astype(np.float32) / 255.0

    # Convert to tensor
    tensor = torch.FloatTensor(img_norm).permute(2, 0, 1).unsqueeze(0)

    # Run AI model
    with torch.no_grad():
        prediction = model(tensor)

    # Convert to binary mask
    mask = prediction.squeeze().numpy()
    mask_binary = (mask > 0.5).astype(np.uint8) * 255

    return img, mask_binary

def extract_features(img, mask):
    """
    Extract wound measurements from image + mask
    Returns a dictionary of all measurements
    """
    features = {}

    # ── Geometric Features ─────────────────────────
    # Find wound contours
    contours, _ = cv2.findContours(
        mask,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    if contours:
        # Get largest contour = main wound
        largest = max(contours, key=cv2.contourArea)
        area    = cv2.contourArea(largest)
        perim   = cv2.arcLength(largest, True)

        features['area_px']     = round(area, 2)
        features['perimeter_px'] = round(perim, 2)

        # Circularity: 1.0 = perfect circle
        # Lower = more irregular wound shape
        if perim > 0:
            circularity = (4 * np.pi * area) / (perim ** 2)
        else:
            circularity = 0
        features['circularity'] = round(circularity, 3)

        # Wound size category
        if area < 3000:
            features['size_category'] = 'small'
        elif area < 15000:
            features['size_category'] = 'medium'
        else:
            features['size_category'] = 'large'
    else:
        features['area_px']       = 0
        features['perimeter_px']  = 0
        features['circularity']   = 0
        features['size_category'] = 'unknown'

    # ── Color Features ─────────────────────────────
    # Only look at pixels INSIDE the wound mask
    wound_pixels = img[mask > 127]

    if len(wound_pixels) > 0:
        mean_r = float(wound_pixels[:, 0].mean())
        mean_g = float(wound_pixels[:, 1].mean())
        mean_b = float(wound_pixels[:, 2].mean())

        features['mean_red']   = round(mean_r, 2)
        features['mean_green'] = round(mean_g, 2)
        features['mean_blue']  = round(mean_b, 2)

        # Redness index — high = inflamed/infected
        total = mean_r + mean_g + mean_b + 1e-6
        features['redness_index'] = round(mean_r / total, 3)

        # Darkness index — high = necrotic tissue
        brightness = (mean_r + mean_g + mean_b) / 3
        features['darkness_index'] = round(1 - (brightness / 255), 3)

        # Tissue type estimation based on color
        if mean_r > 150 and mean_g < 100:
            tissue = 'granulation'   # Red = healthy healing
        elif mean_r > 150 and mean_g > 120:
            tissue = 'slough'        # Yellow = needs cleaning
        elif brightness < 60:
            tissue = 'eschar'        # Dark = necrotic
        else:
            tissue = 'epithelial'    # Pink = good healing
        features['tissue_type'] = tissue

    else:
        features['mean_red']      = 0
        features['mean_green']    = 0
        features['mean_blue']     = 0
        features['redness_index'] = 0
        features['darkness_index'] = 0
        features['tissue_type']   = 'unknown'

    return features

def calculate_severity(features):
    """
    Calculate severity score 0-100
    and risk level LOW / MEDIUM / HIGH
    """
    score = 0

    # Area score (30% weight)
    area = features.get('area_px', 0)
    if area < 3000:       area_score = 0
    elif area < 10000:    area_score = 25
    elif area < 20000:    area_score = 50
    else:                 area_score = 100
    score += area_score * 0.30

    # Redness score (25% weight)
    redness = features.get('redness_index', 0)
    score += redness * 100 * 0.25

    # Darkness score (25% weight)
    darkness = features.get('darkness_index', 0)
    score += darkness * 100 * 0.25

    # Border irregularity (20% weight)
    irregularity = 1 - features.get('circularity', 0.5)
    score += irregularity * 100 * 0.20

    score = round(min(score, 100), 1)

    # Risk level
    if score < 30:
        risk = 'LOW'
    elif score < 60:
        risk = 'MEDIUM'
    else:
        risk = 'HIGH'

    return score, risk

def analyze_wound(image_path):
    """
    Full pipeline:
    1. Load model
    2. Predict mask
    3. Extract features
    4. Calculate severity
    5. Return full report
    """
    print(f"Analyzing: {image_path}")

    # Load model
    model = load_model()

    # Predict wound mask
    img, mask = predict_mask(model, image_path)

    # Extract features
    features = extract_features(img, mask)

    # Calculate severity
    severity_score, risk_level = calculate_severity(features)

    # Build result
    result = {
        'image_path'     : image_path,
        'wound_area'     : features['area_px'],
        'size_category'  : features['size_category'],
        'tissue_type'    : features['tissue_type'],
        'redness_index'  : features['redness_index'],
        'darkness_index' : features['darkness_index'],
        'circularity'    : features['circularity'],
        'severity_score' : severity_score,
        'risk_level'     : risk_level
    }

    return result

def print_result(result):
    """Print a readable report"""
    print("\n" + "="*45)
    print("       WOUND ANALYSIS RESULT")
    print("="*45)
    print(f"  Wound Area     : {result['wound_area']} px²")
    print(f"  Size           : {result['size_category']}")
    print(f"  Tissue Type    : {result['tissue_type']}")
    print(f"  Redness Index  : {result['redness_index']}")
    print(f"  Darkness Index : {result['darkness_index']}")
    print(f"  Circularity    : {result['circularity']}")
    print(f"  Severity Score : {result['severity_score']} / 100")
    print(f"  Risk Level     : {result['risk_level']}")
    print("="*45)

# Test with one image from your dataset
if __name__ == "__main__":
    test_image = "data/wound-segmentation-images/data_wound_seg/test_images/fusc_0002.png"
    result = analyze_wound(test_image)
    print_result(result)
