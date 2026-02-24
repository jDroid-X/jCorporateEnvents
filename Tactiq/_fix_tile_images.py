"""
Check alias PNG file sizes to detect if they're all the same generic banner.
Then rebuild the tiles to use real JPEG photos directly in our-work.html instead of alias PNGs.
This ensures visual diversity in the work tiles.
"""
import os, shutil, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE   = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'
WKDIR  = os.path.join(BASE, 'images', 'work-showcase')
OUR_WORK = os.path.join(BASE, 'our-work', 'our-work.html')

print("=== Alias PNG File Sizes ===")
sizes = {}
for cat in os.listdir(WKDIR):
    cat_dir = os.path.join(WKDIR, cat)
    if not os.path.isdir(cat_dir):
        continue
    for f in os.listdir(cat_dir):
        if f.endswith('.png') and not f.startswith('section'):
            slug = os.path.splitext(f)[0]
            path = os.path.join(cat_dir, f)
            size = os.path.getsize(path)
            sizes[f'{cat}/{f}'] = size
            print(f"  {size:>8} bytes  {cat}/{f}")

# Identify likely generic banners (very similar file size = same image)
from collections import Counter
size_counts = Counter(s for s in sizes.values())
most_common_size = size_counts.most_common(1)[0]
print(f"\nMost common file size: {most_common_size[0]} bytes (appears {most_common_size[1]} times)")
generic_paths = [p for p,s in sizes.items() if s == most_common_size[0]]
print(f"Likely generic banners ({len(generic_paths)}):")
for p in generic_paths:
    print(f"  {p}")

print("\n=== Finding Best Real JPEG for each alias ===")
# For each event folder, find the largest JPEG (usually the real photo)
BEST_JPEG = {}
for cat in os.listdir(WKDIR):
    cat_dir = os.path.join(WKDIR, cat)
    if not os.path.isdir(cat_dir):
        continue
    for slug_dir in os.listdir(cat_dir):
        slug_path = os.path.join(cat_dir, slug_dir)
        if not os.path.isdir(slug_path):
            continue
        jpegs = []
        for fn in os.listdir(slug_path):
            if fn.lower().endswith(('.jpeg', '.jpg')):
                fp = os.path.join(slug_path, fn)
                jpegs.append((os.path.getsize(fp), fn, fp))
        if jpegs:
            jpegs.sort(reverse=True)
            best_size, best_name, best_path = jpegs[0]
            rel = f'../images/work-showcase/{cat}/{slug_dir}/{best_name}'
            BEST_JPEG[f'{cat}/{slug_dir}'] = rel
            print(f"  {cat}/{slug_dir}: {best_name} ({best_size:,} bytes)")

print(f"\nTotal best JPEGs mapped: {len(BEST_JPEG)}")

# Now update our-work.html: replace all alias PNG src with best real JPEG
with open(OUR_WORK, encoding='utf-8') as f:
    html = f.read()

import re
updated = 0
def replace_tile_img(m):
    global updated
    full = m.group(0)
    src = m.group(1)
    # Extract category/slug from PNG path like ../images/work-showcase/cat/slug.png
    match = re.match(r'\.\./images/work-showcase/([^/]+)/([^/]+)\.png', src)
    if match:
        cat, slug = match.group(1), match.group(2)
        key = f'{cat}/{slug}'
        if key in BEST_JPEG:
            new_src = BEST_JPEG[key]
            updated += 1
            return full.replace(src, new_src)
    return full

new_html = re.sub(r'<img src="(\.\./images/work-showcase/[^"]+\.png)"', replace_tile_img, html)

with open(OUR_WORK, 'w', encoding='utf-8') as f:
    f.write(new_html)
print(f"\nour-work.html updated: {updated} tile images now point to real best JPEG photos!")
