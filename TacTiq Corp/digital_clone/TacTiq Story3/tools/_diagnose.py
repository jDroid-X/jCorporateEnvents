"""
Diagnostic script: checks all HTML pages for broken relative paths and missing alias images.
"""
import os, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'
IMG_BASE = os.path.join(BASE, 'images', 'work-showcase')

print("=" * 60)
print("1. CHECKING ALL HTML FILE PATHS IN our-work.html")
print("=" * 60)

our_work = os.path.join(BASE, 'our-work', 'our-work.html')
with open(our_work, encoding='utf-8') as f:
    html = f.read()

import re
hrefs   = re.findall(r'href="([^"#]+\.html)"', html)
img_src = re.findall(r'src="(\.\./images/[^"]+)"', html)

print("\n--- HREF links (tiles) ---")
broken_hrefs = []
for href in hrefs:
    if href.startswith('http') or href.startswith('#'):
        continue
    abs_path = os.path.normpath(os.path.join(BASE, 'our-work', href))
    exists = os.path.isfile(abs_path)
    status = "OK" if exists else "BROKEN"
    if not exists:
        broken_hrefs.append(href)
    print(f"  [{status}] {href}")

print(f"\nTotal hrefs: {len(hrefs)}, Broken: {len(broken_hrefs)}")

print("\n--- IMG src in tiles ---")
broken_imgs = []
for src in img_src:
    abs_path = os.path.normpath(os.path.join(BASE, 'our-work', src))
    exists = os.path.isfile(abs_path)
    status = "OK" if exists else "MISSING"
    if not exists:
        broken_imgs.append(src)
    print(f"  [{status}] {src}")

print(f"\nTotal imgs: {len(img_src)}, Missing: {len(broken_imgs)}")

print("\n" + "=" * 60)
print("2. CHECKING ALL SUB-PAGE IMAGE PATHS")
print("=" * 60)

html_files = []
for root, dirs, files in os.walk(BASE):
    for f in files:
        if f.endswith('.html') and 'our-work.html' not in f and 'index.html' not in f:
            html_files.append(os.path.join(root, f))

broken_pages = []
for html_file in sorted(html_files):
    with open(html_file, encoding='utf-8') as f:
        content = f.read()
    rel_path = os.path.relpath(html_file, BASE)
    depth = len(rel_path.split(os.sep)) - 1
    prefix = '../' * depth
    
    # Check image src
    imgs = re.findall(r'<img src="([^"]+)"', content)
    for img in imgs:
        if img.startswith('http'):
            continue
        abs_img = os.path.normpath(os.path.join(os.path.dirname(html_file), img))
        if not os.path.isfile(abs_img):
            broken_pages.append((rel_path, img, abs_img))
            print(f"  BROKEN IMG in {rel_path}:")
            print(f"    src='{img}'")
            print(f"    resolved='{abs_img}'")
            print(f"    exists={os.path.isfile(abs_img)}")

if not broken_pages:
    print("  All sub-page image src paths resolve to existing files!")

print(f"\nTotal broken image paths in sub-pages: {len(broken_pages)}")

print("\n" + "=" * 60)
print("3. CSS PATH CHECK")
print("=" * 60)
css_ok = os.path.isfile(os.path.join(BASE, 'css', 'desktop.css'))
print(f"  css/desktop.css exists: {css_ok}")
js_ok = os.path.isfile(os.path.join(BASE, 'js', 'script.js'))
print(f"  js/script.js exists: {js_ok}")
