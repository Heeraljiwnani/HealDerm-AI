import torch
import torch.nn as nn
from torch.utils.data import DataLoader, random_split
from segmentation_model import build_model
from dataset_loader import WoundDataset
import os

BATCH_SIZE    = 2
EPOCHS        = 30
LEARNING_RATE = 0.0001
IMG_SIZE      = 256
DEVICE        = "cpu"

print("Training on  : " + DEVICE)
print("Epochs       : " + str(EPOCHS))
print("Batch size   : " + str(BATCH_SIZE))
print("Image size   : " + str(IMG_SIZE))
print("Total images : 2208")

print("Loading ALL 2208 images...")
full_dataset = WoundDataset(
    img_folder  = "data/processed/train/images",
    mask_folder = "data/processed/train/masks",
    img_size    = IMG_SIZE,
    augment     = True
)

train_size = int(0.8 * len(full_dataset))
val_size   = len(full_dataset) - train_size
train_set, val_set = random_split(full_dataset, [train_size, val_size])

train_loader = DataLoader(train_set, batch_size=BATCH_SIZE, shuffle=True)
val_loader   = DataLoader(val_set,   batch_size=BATCH_SIZE, shuffle=False)

print("Training samples   : " + str(train_size))
print("Validation samples : " + str(val_size))

print("Building model...")
model     = build_model().to(DEVICE)
optimizer = torch.optim.AdamW(model.parameters(), lr=LEARNING_RATE)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=EPOCHS)

def dice_loss(pred, target, smooth=1):
    intersection = (pred * target).sum()
    return 1 - (2 * intersection + smooth) / (pred.sum() + target.sum() + smooth)

def combined_loss(pred, target):
    bce  = nn.BCELoss()(pred, target)
    dice = dice_loss(pred, target)
    return 0.5 * bce + 0.5 * dice

os.makedirs("models", exist_ok=True)

print("Starting overnight training...")
print("=" * 50)
print("Estimated time : 8-12 hours")
print("Do not close terminal!")
print("=" * 50)

best_val_loss = float("inf")

for epoch in range(EPOCHS):
    model.train()
    train_loss = 0

    for batch_idx, (images, masks) in enumerate(train_loader):
        images = images.to(DEVICE)
        masks  = masks.to(DEVICE)
        predictions = model(images)
        loss = combined_loss(predictions, masks)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        train_loss += loss.item()

        if (batch_idx + 1) % 100 == 0:
            print("  Epoch " + str(epoch+1) + " | Batch " + str(batch_idx+1) + "/" + str(len(train_loader)) + " | Loss: " + str(round(loss.item(), 4)))

    scheduler.step()

    model.eval()
    val_loss = 0
    with torch.no_grad():
        for images, masks in val_loader:
            images = images.to(DEVICE)
            masks  = masks.to(DEVICE)
            predictions = model(images)
            val_loss += combined_loss(predictions, masks).item()

    avg_train = train_loss / len(train_loader)
    avg_val   = val_loss   / len(val_loader)

    print("Epoch " + str(epoch+1) + "/" + str(EPOCHS) + " | Train Loss: " + str(round(avg_train, 4)) + " | Val Loss: " + str(round(avg_val, 4)))

    if avg_val < best_val_loss:
        best_val_loss = avg_val
        torch.save(model.state_dict(), "models/best_model.pth")
        print("Best model saved! val loss: " + str(round(avg_val, 4)))

print("Training complete!")
print("Best model saved to: models/best_model.pth")
print("Now run: python evaluate.py")
