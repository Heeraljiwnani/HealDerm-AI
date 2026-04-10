from fpdf import FPDF
from datetime import datetime
import os

os.makedirs("reports", exist_ok=True)

def generate_report(patient_name, patient_age, result, output_filename="report.pdf"):

    pdf = FPDF()
    pdf.add_page()

    # Header
    pdf.set_fill_color(41, 128, 185)
    pdf.rect(0, 0, 210, 30, "F")
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_xy(0, 8)
    pdf.cell(210, 12, "WOUND ASSESSMENT REPORT", align="C")

    pdf.set_font("Helvetica", "", 10)
    pdf.set_xy(0, 20)
    pdf.cell(210, 8, "Generated: " + datetime.now().strftime("%Y-%m-%d %H:%M"), align="C")

    pdf.set_text_color(0, 0, 0)
    pdf.ln(20)

    # Patient Info
    pdf.set_fill_color(236, 240, 241)
    pdf.set_font("Helvetica", "B", 13)
    pdf.cell(0, 10, "  PATIENT INFORMATION", fill=True, ln=True)
    pdf.set_font("Helvetica", "", 12)
    pdf.ln(3)
    pdf.cell(0, 8, "  Name : " + str(patient_name), ln=True)
    pdf.cell(0, 8, "  Age  : " + str(patient_age), ln=True)
    pdf.ln(5)

    # Wound Measurements
    pdf.set_fill_color(236, 240, 241)
    pdf.set_font("Helvetica", "B", 13)
    pdf.cell(0, 10, "  WOUND MEASUREMENTS", fill=True, ln=True)
    pdf.set_font("Helvetica", "", 12)
    pdf.ln(3)
    pdf.cell(0, 8, "  Wound Area     : " + str(result["wound_area"]) + " px2", ln=True)
    pdf.cell(0, 8, "  Size Category  : " + str(result["size_category"]).upper(), ln=True)
    pdf.cell(0, 8, "  Tissue Type    : " + str(result["tissue_type"]).upper(), ln=True)
    pdf.cell(0, 8, "  Redness Index  : " + str(result["redness_index"]), ln=True)
    pdf.cell(0, 8, "  Darkness Index : " + str(result["darkness_index"]), ln=True)
    pdf.ln(5)

    # Risk Assessment
    risk = result["risk_level"]
    if risk == "LOW":
        pdf.set_fill_color(39, 174, 96)
    elif risk == "MEDIUM":
        pdf.set_fill_color(243, 156, 18)
    else:
        pdf.set_fill_color(231, 76, 60)

    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 13)
    pdf.cell(0, 10, "  RISK ASSESSMENT", fill=True, ln=True)
    pdf.set_font("Helvetica", "", 12)
    pdf.ln(3)
    pdf.cell(0, 8, "  Severity Score : " + str(result["severity_score"]) + " / 100", ln=True)
    pdf.cell(0, 8, "  Risk Level     : " + str(risk), ln=True)
    pdf.ln(5)

    # Recommendations
    pdf.set_text_color(0, 0, 0)
    pdf.set_fill_color(236, 240, 241)
    pdf.set_font("Helvetica", "B", 13)
    pdf.cell(0, 10, "  RECOMMENDATIONS", fill=True, ln=True)
    pdf.set_font("Helvetica", "", 12)
    pdf.ln(3)

    if risk == "LOW":
        pdf.cell(0, 8, "  - Wound is healing well", ln=True)
        pdf.cell(0, 8, "  - Monitor weekly", ln=True)
        pdf.cell(0, 8, "  - Keep wound clean and dressed", ln=True)
    elif risk == "MEDIUM":
        pdf.cell(0, 8, "  - Clinical review recommended within 72 hours", ln=True)
        pdf.cell(0, 8, "  - Monitor every 2-3 days", ln=True)
        pdf.cell(0, 8, "  - Watch for signs of infection", ln=True)
        pdf.cell(0, 8, "  - Consider debridement if slough present", ln=True)
    else:
        pdf.cell(0, 8, "  - URGENT clinical attention needed", ln=True)
        pdf.cell(0, 8, "  - Daily monitoring required", ln=True)
        pdf.cell(0, 8, "  - Check for infection immediately", ln=True)
        pdf.cell(0, 8, "  - Consider hospital admission", ln=True)

    # Footer
    pdf.ln(10)
    pdf.set_fill_color(41, 128, 185)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "I", 9)
    pdf.cell(0, 8, "  This report is AI-generated and should be reviewed by a qualified healthcare professional.", fill=True, ln=True)

    output_path = "reports/" + output_filename
    pdf.output(output_path)
    print("Report saved to: " + output_path)
    return output_path
