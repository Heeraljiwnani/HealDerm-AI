from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
import numpy as np
import io
import os
from pathlib import Path
from tensorflow.keras.applications.efficientnet import preprocess_input

# -------------------------
# Initialize FastAPI
# -------------------------
app = FastAPI(
    title="DFU Detection API",
    description="Upload an image to detect DFU",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Load Model (IMPORTANT FIX)
# -------------------------
BASE_DIR = Path(__file__).resolve().parent
DEFAULT_MODEL_PATH = BASE_DIR.parent / "machine-learning" / "best_phase1.keras"
MODEL_PATH = Path(os.getenv("SKIN_MODEL_PATH", str(DEFAULT_MODEL_PATH)))

try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Error loading model: {e}")

# -------------------------
# Class Labels (UPDATE if needed)
# -------------------------
classes = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"]

# -------------------------
# Image Preprocessing
# -------------------------
IMG_SIZE = (224, 224)

def preprocess_image(image: Image.Image):
    image = image.resize(IMG_SIZE)
    image = np.array(image).astype(np.float32)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image

# -------------------------
# Routes
# -------------------------

@app.get("/")
def home():
    return {"message": "DFU API is running 🚀"}

@app.get("/health")
def health():
    return {"status": "OK"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Upload an image")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        processed_image = preprocess_image(image)

        predictions = model.predict(processed_image)

        predicted_class_index = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))

        return {
            "prediction": classes[predicted_class_index],
            "confidence": confidence,
            "confidence_percent": round(confidence * 100, 2),
            "classes": classes
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
