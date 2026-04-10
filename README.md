# HealDerm AI

This project is now organized into three deployment-friendly folders:

- [frontend](/Users/heeraljiwnani/HealDerm AI/frontend): React + Vite web app
- [backend](/Users/heeraljiwnani/HealDerm AI/backend): FastAPI services for wound and skin analysis
- [machine-learning](/Users/heeraljiwnani/HealDerm AI/machine-learning): notebook and trained model artifacts

## Frontend

From [frontend](/Users/heeraljiwnani/HealDerm AI/frontend):

```bash
npm install
npm run dev
```

Environment variables now live in [frontend/.env](/Users/heeraljiwnani/HealDerm AI/frontend/.env):

```bash
VITE_WOUND_API_BASE_URL=http://127.0.0.1:8000
VITE_SKIN_API_BASE_URL=http://127.0.0.1:8001
```

## Backend

### Wound API

From [backend/wound_ai_system](/Users/heeraljiwnani/HealDerm AI/backend/wound_ai_system):

```bash
pip install -r requirements.txt
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

### Skin API

From [backend](/Users/heeraljiwnani/HealDerm AI/backend):

```bash
uvicorn api_skin:app --reload --host 0.0.0.0 --port 8001
```

By default, [api_skin.py](/Users/heeraljiwnani/HealDerm AI/backend/api_skin.py) now reads the trained model from [machine-learning/best_phase1.keras](/Users/heeraljiwnani/HealDerm AI/machine-learning/best_phase1.keras).

If you want to override it:

```bash
export SKIN_MODEL_PATH=/absolute/path/to/best_phase1.keras
```

## Machine Learning

[machine-learning/DFU.ipynb](/Users/heeraljiwnani/HealDerm AI/machine-learning/DFU.ipynb) contains the DFU grading notebook.

[machine-learning/best_phase1.keras](/Users/heeraljiwnani/HealDerm AI/machine-learning/best_phase1.keras) is the trained skin grading model currently used by the backend.

## Integrated Features

### Wound analysis

- wound image upload
- wound segmentation
- wound area
- size category
- tissue type
- redness index
- severity score
- risk level

### Skin analysis

- skin image upload
- DFU grade prediction
- prediction confidence
- supported class list

## Notes

- The frontend build output and dependencies are currently inside [frontend/dist](/Users/heeraljiwnani/HealDerm AI/frontend/dist) and [frontend/node_modules](/Users/heeraljiwnani/HealDerm AI/frontend/node_modules).
- The root folder is now mainly an organizer for the three deployable parts.
