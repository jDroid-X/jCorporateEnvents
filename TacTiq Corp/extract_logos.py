import os
import hashlib
import shutil
from PIL import Image

source_dir = r"c:\Users\dell\jAnitGravity\jCorporateEvents\TacTiq Corp\extracted_content\images"
dest_dir = r"c:\Users\dell\jAnitGravity\jCorporateEvents\TacTiq Corp\digital_clone\logo"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

def get_hash(file_path):
    hasher = hashlib.md5()
    with open(file_path, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

# Track all images and their occurrences
image_data = {}

for filename in os.listdir(source_dir):
    file_path = os.path.join(source_dir, filename)
    if not os.path.isfile(file_path):
        continue
        
    h = get_hash(file_path)
    if h not in image_data:
        image_data[h] = {
            'count': 1,
            'filenames': [filename],
            'size': os.path.getsize(file_path)
        }
    else:
        image_data[h]['count'] += 1
        image_data[h]['filenames'].append(filename)

# Clear existing logos to re-populate with better naming or just append
# To be safe, let's just append new ones or restart if the user prefers.
# The user said "still missing", so re-running with better logic is good.
# Clear dest_dir
for f in os.listdir(dest_dir):
    os.remove(os.path.join(dest_dir, f))

logo_count = 0
added_hashes = set()

def add_logo(h, original_filename):
    global logo_count
    if h in added_hashes:
        return
    
    file_path = os.path.join(source_dir, original_filename)
    ext = os.path.splitext(original_filename)[1]
    logo_count += 1
    new_name = f"logo_{logo_count}{ext}"
    shutil.copy(file_path, os.path.join(dest_dir, new_name))
    added_hashes.add(h)
    print(f"Added logo: {new_name} (from {original_filename})")

# 1. Add all recurring images (these are definitely logos/branding)
for h, data in image_data.items():
    if data['count'] > 1:
        add_logo(h, data['filenames'][0])

# 2. Add small unique images (icons, one-off logos)
# Threshold: < 30KB is usually a logo/icon
for h, data in image_data.items():
    if data['count'] == 1 and data['size'] < 30000:
        add_logo(h, data['filenames'][0])

# 3. Specifically check page 1 and last page for logos even if larger
# (Main brand logos can sometimes be high-res)
for h, data in image_data.items():
    if h in added_hashes: continue
    for fname in data['filenames']:
        if fname.startswith("page_1_img_") or "_img_1" in fname or "_img_2" in fname:
            # Check if it's not a full-page photo
            # Photos are usually larger
            if data['size'] < 100000: # 100KB threshold for a logo
                add_logo(h, data['filenames'][0])
                break

print(f"\nTotal extracted {logo_count} logos/elements to {dest_dir}.")

