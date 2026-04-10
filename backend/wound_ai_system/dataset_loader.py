import os
import cv2
import numpy as np
import torch
from torch.utils.data import Dataset
import random

class WoundDataset(Dataset):
    def __init__(self, img_folder, mask_folder,
                 img_size=256, augment=False):
        self.img_folder  = img_folder
        self.mask_folder = mask_folder
        self.img_size    = img_size
        self.augment     = augment
        self.filenames   = sorted(os.listdir(img_folder))

    def __len__(self):
        return len(self.filenames)

    def augment_image(self, img, mask):
        if random.random() > 0.5:
            img  = cv2.flip(img, 1)
            mask = cv2.flip(mask, 1)
        if random.random() > 0.5:
            img  = cv2.flip(img, 0)
            mask = cv2.flip(mask, 0)
        if random.random() > 0.5:
            angle = random.randint(-30, 30)
            h, w  = img.shape[:2]
            M     = cv2.getRotationMatrix2D((w//2, h//2), angle, 1)
            img   = cv2.warpAffine(img,  M, (w, h))
            mask  = cv2.warpAffine(mask, M, (w, h))
        if random.random() > 0.5:
            factor = random.uniform(0.7, 1.3)
            img    = np.clip(img * factor, 0, 1)
        return img, mask

    def __getitem__(self, idx):
        filename = self.filenames[idx]
        img_path = os.path.join(self.img_folder, filename)
        img = cv2.imread(img_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (self.img_size, self.img_size))
        img = img.astype(np.float32) / 255.0
        mask_path = os.path.join(self.mask_folder, filename)
        mask = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE)
        mask = cv2.resize(mask, (self.img_size, self.img_size))
        mask = mask.astype(np.float32) / 255.0
        if self.augment:
            img, mask = self.augment_image(img, mask)
        img_tensor  = torch.FloatTensor(img).permute(2, 0, 1)
        mask_tensor = torch.FloatTensor(mask).unsqueeze(0)
        return img_tensor, mask_tensor
