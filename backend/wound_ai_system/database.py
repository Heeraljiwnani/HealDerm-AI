from tinydb import TinyDB, Query
from datetime import datetime
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATABASE_DIR = Path(os.getenv("WOUND_DATABASE_DIR", str(BASE_DIR / "database")))
DATABASE_DIR.mkdir(parents=True, exist_ok=True)
DB_PATH = Path(os.getenv("WOUND_DATABASE_PATH", str(DATABASE_DIR / "wound_records.json")))

db = TinyDB(DB_PATH)
patients_table    = db.table("patients")
assessments_table = db.table("assessments")

def add_patient(name, age, has_diabetes=False):
    patient = {
        "name"         : name,
        "age"          : age,
        "has_diabetes" : has_diabetes,
        "created_at"   : datetime.now().isoformat()
    }
    patient_id = patients_table.insert(patient)
    print(f"Patient added with ID: {patient_id}")
    return patient_id

def save_assessment(patient_id, image_path, result):
    assessment = {
        "patient_id"    : patient_id,
        "image_path"    : image_path,
        "wound_area"    : result["wound_area"],
        "size_category" : result["size_category"],
        "tissue_type"   : result["tissue_type"],
        "redness_index" : result["redness_index"],
        "severity_score": result["severity_score"],
        "risk_level"    : result["risk_level"],
        "assessed_at"   : datetime.now().isoformat()
    }
    assessment_id = assessments_table.insert(assessment)
    print(f"Assessment saved with ID: {assessment_id}")
    return assessment_id

def get_patient_history(patient_id):
    Assessment = Query()
    history = assessments_table.search(
        Assessment.patient_id == patient_id
    )
    history.sort(key=lambda x: x["assessed_at"])
    return history

def print_patient_history(patient_id):
    history = get_patient_history(patient_id)
    if not history:
        print("No assessments found.")
        return
    print(f"--- Healing Timeline for Patient {patient_id} ---")
    for i, record in enumerate(history):
        print(f"Assessment {i+1} - {record['assessed_at'][:10]}")
        print(f"  Severity : {record['severity_score']}/100")
        print(f"  Risk     : {record['risk_level']}")
    if len(history) > 1:
        first = history[0]["severity_score"]
        last  = history[-1]["severity_score"]
        change = first - last
        if change > 0:
            print(f"Healing: severity reduced by {change} points")
        elif change < 0:
            print(f"Worsening: severity increased by {abs(change)} points")

def get_all_patients():
    return patients_table.all()
