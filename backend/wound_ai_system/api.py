from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from pathlib import Path
from feature_extractor import analyze_wound
from database import add_patient, save_assessment, get_patient_history

app = FastAPI(title="Wound Assessment API")

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = Path(os.getenv("WOUND_UPLOAD_DIR", str(BASE_DIR / "uploaded_images")))
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Wound Assessment API is running!"}

@app.get("/health")
def health():
    return {"status": "OK"}

@app.post("/add-patient")
def create_patient(
    name: str = Form(...),
    age: int = Form(...),
    has_diabetes: bool = Form(False)
):
    patient_id = add_patient(name, age, has_diabetes)
    return {
        "status"     : "success",
        "patient_id" : patient_id,
        "message"    : f"Patient {name} added"
    }

@app.post("/assess")
async def assess_wound(
    patient_id: int = Form(0),
    file: UploadFile = File(...)
):
    filename = Path(file.filename or "upload-image").name
    save_path = UPLOAD_FOLDER / f"{patient_id}_{filename}"

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_wound(str(save_path))

    if patient_id > 0:
        save_assessment(patient_id, str(save_path), result)

    return JSONResponse({
        "status"        : "success",
        "patient_id"    : patient_id,
        "wound_area"    : result["wound_area"],
        "size_category" : result["size_category"],
        "tissue_type"   : result["tissue_type"],
        "severity_score": result["severity_score"],
        "risk_level"    : result["risk_level"],
        "redness_index" : result["redness_index"]
    })

@app.get("/history/{patient_id}")
def get_history(patient_id: int):
    history = get_patient_history(patient_id)
    return {
        "patient_id"  : patient_id,
        "total"       : len(history),
        "assessments" : history
    }
