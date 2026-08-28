import os
import cv2
import time
import numpy as np
from rembg import remove, new_session
from pathlib import Path

def process_and_save_dataset(input_dir, output_dir, session=None):
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    extensions = ['*.JPG', '*.jpg', '*.png', '*.PNG', '*.jpeg', '*.JPEG']
    
    # 1. Collect all image paths first to get an accurate total count
    print("Collecting files...")
    all_files = []
    for ext in extensions:
        all_files.extend(list(input_path.rglob(ext)))
        
    total_images = len(all_files)
    if total_images == 0:
        print(f"No images found in {input_dir}")
        return

    print(f"Found {total_images:,} images across classes. Starting processing...\n")
    
    start_time = time.time()
    processed_count = 0
    skipped_count = 0
    error_count = 0

    for idx, img_file in enumerate(all_files, start=1):
        relative_path = img_file.relative_to(input_path)
        out_file_path = output_path / relative_path
        out_file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Resume capability: skip if already processed
        if out_file_path.exists():
            skipped_count += 1
            processed_count += 1
            if idx % 100 == 0 or idx == total_images:
                print(f"[{idx:,}/{total_images:,}] Skipped existing files... ({skipped_count:,} already done)")
            continue
            
        try:
            img = cv2.imread(str(img_file))
            if img is None:
                error_count += 1
                continue
                
            # Segmentation via rembg (reusing session saves initialization overhead)
            segmented_img = remove(img, session=session) if session else remove(img)
            
            # Find bounding box from mask/alpha
            if segmented_img.shape[2] == 4:
                alpha = segmented_img[:, :, 3]
                _, thresh = cv2.threshold(alpha, 1, 255, cv2.THRESH_BINARY)
            else:
                gray = cv2.cvtColor(segmented_img, cv2.COLOR_BGR2GRAY)
                _, thresh = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)
                
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            if contours:
                largest_contour = max(contours, key=cv2.contourArea)
                x, y, w, h = cv2.boundingRect(largest_contour)
                cropped_leaf = segmented_img[y:y+h, x:x+w]
                
                # Composite over black background to preserve 3-channel BGR format
                if cropped_leaf.shape[2] == 4:
                    black_bg = np.zeros((h, w, 3), dtype=np.uint8)
                    alpha_channel = cropped_leaf[:, :, 3] / 255.0
                    color_channels = cropped_leaf[:, :, :3]
                    
                    for c in range(3):
                        black_bg[:, :, c] = (alpha_channel * color_channels[:, :, c]).astype(np.uint8)
                    cropped_leaf = black_bg
                
                cv2.imwrite(str(out_file_path), cropped_leaf)
            else:
                if segmented_img.shape[2] == 4:
                    segmented_img = cv2.cvtColor(segmented_img, cv2.COLOR_BGRA2BGR)
                cv2.imwrite(str(out_file_path), segmented_img)
                
            processed_count += 1

        except Exception as e:
            error_count += 1
            print(f"\n[ERROR] Failed processing {img_file.name}: {e}")

        # Progress update every 25 images
        if idx % 25 == 0 or idx == total_images:
            elapsed = time.time() - start_time
            imgs_per_sec = (processed_count - skipped_count) / max(elapsed, 1e-5)
            remaining_imgs = total_images - processed_count
            eta_sec = remaining_imgs / max(imgs_per_sec, 1e-5) if imgs_per_sec > 0 else 0
            
            percent = (idx / total_images) * 100
            current_class = img_file.parent.name
            
            print(
                f"Progress: [{idx:,}/{total_images:,}] ({percent:.1f}%) | "
                f"Class: {current_class[:20]:<20} | "
                f"Speed: {imgs_per_sec:.2f} img/s | "
                f"ETA: {int(eta_sec // 60)}m {int(eta_sec % 60)}s"
            )

    print(f"\nFinished directory: {input_dir}")
    print(f"Total: {total_images:,} | Processed: {processed_count - skipped_count:,} | Skipped: {skipped_count:,} | Errors: {error_count:,}\n")

if __name__ == "__main__":
    print("=" * 60)
    print("LEAF LOCALIZATION & SEGMENTATION PREPROCESSING")
    print("=" * 60)
    
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    TRAIN_DIR = os.path.join(BASE_DIR, "New Plant Diseases Dataset(Augmented)", "train")
    VALID_DIR = os.path.join(BASE_DIR, "New Plant Diseases Dataset(Augmented)", "valid")
    
    OUT_TRAIN = os.path.join(BASE_DIR, "Segmented_Dataset", "train")
    OUT_VALID = os.path.join(BASE_DIR, "Segmented_Dataset", "valid")
    
    # Initialize a persistent rembg session for speed
    session = new_session("u2net", providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
    
    if os.path.exists(TRAIN_DIR):
        print("\n--- [1/2] Processing Training Set ---")
        process_and_save_dataset(TRAIN_DIR, OUT_TRAIN, session=session)
    else:
        print(f"Missing train path: {TRAIN_DIR}")
        
    if os.path.exists(VALID_DIR):
        print("\n--- [2/2] Processing Validation Set ---")
        process_and_save_dataset(VALID_DIR, OUT_VALID, session=session)
    else:
        print(f"Missing valid path: {VALID_DIR}")
        
    print("=" * 60)
    print("All preprocessing completed successfully.")
    print("=" * 60)