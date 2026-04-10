from feature_extractor import analyze_wound
from report_generator import generate_report

image_path = "data/wound-segmentation-images/data_wound_seg/test_images/fusc_0007.png"

print("Analyzing wound...")
result = analyze_wound(image_path)

print("Generating PDF report...")
generate_report(
    patient_name     = "Ramesh Kumar",
    patient_age      = 58,
    result           = result,
    output_filename  = "ramesh_kumar_report.pdf"
)

print("Done!")