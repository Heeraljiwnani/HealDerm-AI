import cv2
import numpy as np
import os
from pathlib import Path

# Paths to your dataset
TRAIN_IMG  = "data/wound-segmentation-images/data_wound_seg/train_images"
TRAIN_MASK = "data/wound-segmentation-images/data_wound_seg/train_masks"
TEST_IMG   = "data/wound-segmentation-images/data_wound_seg/test_images"
TEST_MASK  = "data/wound-segmentation-images/data_wound_seg/test_masks"

# Where to save processed images
PROCESSED_TRAIN_IMG  = "data/processed/train/images"
PROCESSED_TRAIN_MASK = "data/processed/train/masks"
PROCESSED_TEST_IMG   = "data/processed/test/images"
PROCESSED_TEST_MASK  = "data/processed/test/masks"

# Image size everything will be resized to
IMG_SIZE = (512, 512)

def create_output_folders():
    """Create folders to save processed images"""
    folders = [
        PROCESSED_TRAIN_IMG,
        PROCESSED_TRAIN_MASK,
        PROCESSED_TEST_IMG,
        PROCESSED_TEST_MASK
    ]
    for folder in folders:
        os.makedirs(folder, exist_ok=True)
    print("✅ Output folders created!")

def process_image(img_path, save_path):
    """
    Process one image:
    1. Load it
    2. Resize to 512x512
    3. Normalize to 0.0-1.0
    4. Save it
    """
    # Load image
    img = cv2.imread(str(img_path))
    if img is None:
        print(f"⚠️  Could not load: {img_path}")
        return False

    # Resize to 512x512
    img = cv2.resize(img, IMG_SIZE)

    # Save processed image
    cv2.imwrite(str(save_path), img)
    return True

def process_mask(mask_path, save_path):
    """
    Process one mask:
    1. Load it as grayscale
    2. Resize to 512x512
    3. Convert to pure black and white
    4. Save it
    """
    # Load mask as grayscale
    mask = cv2.imread(str(mask_path), cv2.IMREAD_GRAYSCALE)
    if mask is None:
        print(f"⚠️  Could not load mask: {mask_path}")
        return False

    # Resize to 512x512
    mask = cv2.resize(mask, IMG_SIZE)

    # Convert to pure black and white
    # Any pixel above 127 becomes 255 (white = wound)
    # Any pixel below 127 becomes 0 (black = background)
    _, mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)

    # Save processed mask
    cv2.imwrite(str(save_path), mask)
    return True

def process_all_images():
    """Process all training and test images"""

    create_output_folders()

    # Process training images
    print("\nProcessing training images...")
    train_imgs = sorted(os.listdir(TRAIN_IMG))
    success = 0
    for i, filename in enumerate(train_imgs):
        img_path  = Path(TRAIN_IMG) / filename
        save_path = Path(PROCESSED_TRAIN_IMG) / filename
        if process_image(img_path, save_path):
            success += 1
        if (i + 1) % 100 == 0:
            print(f"  {i+1}/{len(train_imgs)} images processed...")
    print(f"✅ Training images done: {success}/{len(train_imgs)}")

    # Process training masks
    print("\nProcessing training masks...")
    train_masks = sorted(os.listdir(TRAIN_MASK))
    success = 0
    for i, filename in enumerate(train_masks):
        mask_path = Path(TRAIN_MASK) / filename
        save_path = Path(PROCESSED_TRAIN_MASK) / filename
        if process_mask(mask_path, save_path):
            success += 1
        if (i + 1) % 100 == 0:
            print(f"  {i+1}/{len(train_masks)} masks processed...")
    print(f"✅ Training masks done: {success}/{len(train_masks)}")

    # Process test images
    print("\nProcessing test images...")
    test_imgs = sorted(os.listdir(TEST_IMG))
    success = 0
    for i, filename in enumerate(test_imgs):
        img_path  = Path(TEST_IMG) / filename
        save_path = Path(PROCESSED_TEST_IMG) / filename
        if process_image(img_path, save_path):
            success += 1
        if (i + 1) % 100 == 0:
            print(f"  {i+1}/{len(test_imgs)} images processed...")
    print(f"✅ Test images done: {success}/{len(test_imgs)}")

    # Process test masks
    print("\nProcessing test masks...")
    test_masks = sorted(os.listdir(TEST_MASK))
    success = 0
    for i, filename in enumerate(test_masks):
        mask_path = Path(TEST_MASK) / filename
        save_path = Path(PROCESSED_TEST_MASK) / filename
        if process_mask(mask_path, save_path):
            success += 1
        if (i + 1) % 100 == 0:
            print(f"  {i+1}/{len(test_masks)} masks processed...")
    print(f"✅ Test masks done: {success}/{len(test_masks)}")

    print("\n🎉 All preprocessing complete!")
    print(f"Processed images saved to: data/processed/")

if __name__ == "__main__":
    process_all_images()