import os
import cv2
import matplotlib.pyplot as plt

# Exact paths matching YOUR folder structure
train_img_path  = "data/wound-segmentation-images/data_wound_seg/train_images"
train_mask_path = "data/wound-segmentation-images/data_wound_seg/train_masks"
test_img_path   = "data/wound-segmentation-images/data_wound_seg/test_images"
test_mask_path  = "data/wound-segmentation-images/data_wound_seg/test_masks"

# Count files
train_images = os.listdir(train_img_path)
train_masks  = os.listdir(train_mask_path)
test_images  = os.listdir(test_img_path)
test_masks   = os.listdir(test_mask_path)

print(f"Training images : {len(train_images)}")
print(f"Training masks  : {len(train_masks)}")
print(f"Test images     : {len(test_images)}")
print(f"Test masks      : {len(test_masks)}")

if len(train_images) == len(train_masks):
    print("✅ Training data matches!")
else:
    print("⚠️  Training mismatch — check folders")

if len(test_images) == len(test_masks):
    print("✅ Test data matches!")
else:
    print("⚠️  Test mismatch — check folders")

# Show one sample
sample_name      = train_images[0]
sample_img_path  = f"{train_img_path}/{sample_name}"
mask_name        = sample_name.replace('.jpg', '.png').replace('.jpeg', '.png')
sample_mask_path = f"{train_mask_path}/{mask_name}"

print(f"\nSample image : {sample_name}")
print(f"Sample mask  : {mask_name}")

img  = cv2.imread(sample_img_path)
mask = cv2.imread(sample_mask_path, cv2.IMREAD_GRAYSCALE)

if img is None:
    print("❌ Could not load image — check the path")
elif mask is None:
    print("❌ Could not load mask — check the path")
else:
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    fig, axes = plt.subplots(1, 3, figsize=(12, 4))

    axes[0].imshow(img)
    axes[0].set_title('Wound Image')
    axes[0].axis('off')

    axes[1].imshow(mask, cmap='gray')
    axes[1].set_title('Mask')
    axes[1].axis('off')

    overlay = img.copy()
    overlay[mask > 127] = [255, 0, 0]
    axes[2].imshow(overlay)
    axes[2].set_title('Overlay (wound = red)')
    axes[2].axis('off')

    plt.tight_layout()
    plt.savefig('dataset_check.png')
    print("\n✅ Saved preview as dataset_check.png")
    print("Open that file to see your wound images!")