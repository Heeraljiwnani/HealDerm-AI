import torch
import cv2
import numpy as np
import os
from torch.utils.data import DataLoader
from segmentation_model import build_model
from dataset_loader import WoundDataset

DEVICE   = 'cpu'
IMG_SIZE = 256

print("Loading best model...")
model = build_model().to(DEVICE)
model.load_state_dict(torch.load("models/best_model.pth", 
                                  map_location=DEVICE))
model.eval()
print("✅ Model loaded!")

# Load test images
print("\nLoading test images...")
test_dataset = WoundDataset(
    img_folder  = "data/processed/test/images",
    mask_folder = "data/processed/test/masks",
    img_size    = IMG_SIZE
)
test_loader = DataLoader(test_dataset, batch_size=1, shuffle=False)
print(f"Test images : {len(test_dataset)}")

# Calculate accuracy
def calculate_iou(pred, target, threshold=0.5):
    pred   = (pred > threshold).float()
    intersection = (pred * target).sum()
    union        = pred.sum() + target.sum() - intersection
    if union == 0:
        return 1.0
    return (intersection / union).item()

def calculate_dice(pred, target, threshold=0.5):
    pred   = (pred > threshold).float()
    intersection = (pred * target).sum()
    if pred.sum() + target.sum() == 0:
        return 1.0
    return (2 * intersection / (pred.sum() + target.sum())).item()

print("\nEvaluating on test images...")
print("Please wait...")

iou_scores  = []
dice_scores = []

with torch.no_grad():
    for i, (images, masks) in enumerate(test_loader):
        images = images.to(DEVICE)
        masks  = masks.to(DEVICE)

        predictions = model(images)

        iou  = calculate_iou(predictions, masks)
        dice = calculate_dice(predictions, masks)

        iou_scores.append(iou)
        dice_scores.append(dice)

        if (i + 1) % 100 == 0:
            print(f"  Evaluated {i+1}/{len(test_dataset)} images...")

# Final results
mean_iou  = np.mean(iou_scores)
mean_dice = np.mean(dice_scores)

print("\n" + "=" * 45)
print("         YOUR MODEL ACCURACY RESULTS")
print("=" * 45)
print(f"  IoU Score  : {mean_iou:.4f}  →  {mean_iou*100:.2f}%")
print(f"  Dice Score : {mean_dice:.4f}  →  {mean_dice*100:.2f}%")
print("=" * 45)

if mean_iou >= 0.75:
    print("  🟢 EXCELLENT — Production quality!")
elif mean_iou >= 0.65:
    print("  🟡 GOOD — Ready for prototype!")
elif mean_iou >= 0.50:
    print("  🟠 OKAY — Needs augmentation")
else:
    print("  🔴 NEEDS IMPROVEMENT")

print("=" * 45)
print("\nNext step: Add augmentation to improve further!")