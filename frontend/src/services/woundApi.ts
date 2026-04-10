export interface WoundAssessmentResult {
  status: string
  patient_id: number
  wound_area: number
  size_category: string
  tissue_type: string
  severity_score: number
  risk_level: string
  redness_index: number
}

export interface SkinAssessmentResult {
  prediction: string
  confidence: number
  confidence_percent: number
  classes: string[]
}

const WOUND_API_BASE_URL = import.meta.env.VITE_WOUND_API_BASE_URL ?? 'http://127.0.0.1:8000'
const SKIN_API_BASE_URL = import.meta.env.VITE_SKIN_API_BASE_URL ?? 'http://127.0.0.1:8001'

async function parseErrorMessage(response: Response, fallbackMessage: string) {
  const rawText = await response.text()

  if (!rawText) {
    return fallbackMessage
  }

  try {
    const parsed = JSON.parse(rawText) as { detail?: string }
    return parsed.detail || fallbackMessage
  } catch {
    return rawText
  }
}

export async function assessWoundImage(file: File, patientId = 0): Promise<WoundAssessmentResult> {
  const formData = new FormData()
  formData.append('patient_id', String(patientId))
  formData.append('file', file)

  const response = await fetch(`${WOUND_API_BASE_URL}/assess`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'Wound assessment failed.'))
  }

  return response.json()
}

export async function assessSkinImage(file: File): Promise<SkinAssessmentResult> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${SKIN_API_BASE_URL}/predict/`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'Skin assessment failed.'))
  }

  return response.json()
}
