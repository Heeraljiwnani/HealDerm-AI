import torch
import torch.nn as nn
import segmentation_models_pytorch as smp

def build_model():
    """
    Build a UNet model for wound segmentation.
    - Takes a wound image as input
    - Outputs a mask showing where the wound is
    """
    model = smp.Unet(
        encoder_name="efficientnet-b4",  # Brain of the model
        encoder_weights="imagenet",       # Already pretrained — saves weeks of training
        in_channels=3,                    # Input: RGB image (3 color channels)
        classes=1,                        # Output: 1 mask (wound vs background)
        activation='sigmoid'              # Output values between 0 and 1
    )
    return model

if __name__ == "__main__":
    print("Building model...")
    model = build_model()

    # Test with a fake image
    dummy_input = torch.randn(1, 3, 512, 512)
    output = model(dummy_input)

    print(f"✅ Model built successfully!")
    print(f"Input shape  : {dummy_input.shape}")
    print(f"Output shape : {output.shape}")
    print(f"Output range : {output.min():.2f} to {output.max():.2f}")