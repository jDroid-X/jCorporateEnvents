"""
Fix remaining 11 tile images in our-work.html that use ../ prefix 
for media-trailer and pre-lockdown sections.
Also checks CSS for the work-tile-bg display.
"""
import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'
WKDIR = os.path.join(BASE, 'images', 'work-showcase')
OUR_WORK = os.path.join(BASE, 'our-work', 'our-work.html')

# Build best JPEG map for all categories
BEST_JPEG_ABS = {}
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
            best_name = jpegs[0][1]
            # Path relative to our-work/ folder
            rel_from_ow = f'../images/work-showcase/{cat}/{slug_dir}/{best_name}'
            BEST_JPEG_ABS[f'{cat}/{slug_dir}'] = rel_from_ow

with open(OUR_WORK, encoding='utf-8') as f:
    html = f.read()

updated = 0

# Fix media-trailer tiles (paths like ../images/work-showcase/media-trailer/slug.png)
def replace_img(m):
    global updated
    full = m.group(0)
    src = m.group(1)
    # Match ../images/work-showcase/cat/slug.png OR ../../images/... 
    match = re.search(r'images/work-showcase/([^/]+)/([^/]+)\.(png|jpe?g)', src)
    if match:
        cat, slug = match.group(1), match.group(2)
        key = f'{cat}/{slug}'
        if key in BEST_JPEG_ABS:
            new_src = BEST_JPEG_ABS[key]
            updated += 1
            return full.replace(src, new_src)
    return full

new_html = re.sub(r'<img src="([^"]+work-showcase[^"]+)"', replace_img, html)

with open(OUR_WORK, 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"Updated {updated} remaining tile images -> real JPEGs")

# Now verify all tile images resolve
with open(OUR_WORK, encoding='utf-8') as f:
    html2 = f.read()
srcs = re.findall(r'<img src="(\.\./images/work-showcase[^"]+)"', html2)
missing = 0
for src in srcs:
    abs_p = os.path.normpath(os.path.join(BASE, 'our-work', src))
    if not os.path.isfile(abs_p):
        print(f"  STILL MISSING: {src}")
        missing += 1
print(f"Remaining missing: {missing}/{len(srcs)} tile images")
if missing == 0:
    print("All tile images now point to real JPEG photos!")

# Also check CSS for work-tile-bg
css_file = os.path.join(BASE, 'css', 'desktop.css')
with open(css_file, encoding='utf-8') as f:
    css = f.read()
if 'work-tile-bg' in css:
    idx = css.find('work-tile-bg')
    print(f"\nwork-tile-bg CSS found:")
    print(css[max(0,idx-10):idx+300])
else:
    print("\nwork-tile-bg CSS NOT FOUND in desktop.css!")
