import os
from feature_extractor import analyze_wound, print_result

folder = "data/wound-segmentation-images/data_wound_seg/test_images"
files  = os.listdir(folder)

print("Testing 10 images...")
print("=" * 50)

for filename in files[:10]:
    path   = folder + "/" + filename
    result = analyze_wound(path)
    print("Image    : " + filename)
    print("Area     : " + str(result["wound_area"]) + " px2")
    print("Tissue   : " + str(result["tissue_type"]))
    print("Severity : " + str(result["severity_score"]) + "/100")
    print("Risk     : " + str(result["risk_level"]))
    print("-" * 50)
