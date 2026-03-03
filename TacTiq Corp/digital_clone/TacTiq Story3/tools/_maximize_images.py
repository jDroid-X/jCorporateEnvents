import os, re

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'
WKDIR = os.path.join(BASE, 'images', 'work-showcase')
OUR_WORK = os.path.join(BASE, 'our-work', 'our-work.html')

def get_best_jpeg(cat, slug):
    slug_path = os.path.join(WKDIR, cat, slug)
    if not os.path.isdir(slug_path):
        return None
    jpegs = []
    for fn in os.listdir(slug_path):
        if fn.lower().endswith(('.jpeg', '.jpg')):
            fp = os.path.join(slug_path, fn)
            jpegs.append((os.path.getsize(fp), fn))
    if jpegs:
        # Get the largest JPEG
        jpegs.sort(reverse=True)
        return jpegs[0][1]
    return None

with open(OUR_WORK, encoding='utf-8') as f:
    html = f.read()

def replacer(match):
    src = match.group(1)
    m = re.search(r'images/work-showcase/([^/]+)/([^/.]+)/([^/"]+)', src)
    if not m:
        # Match pattern like ../images/work-showcase/cat/slug.png
        m = re.search(r'images/work-showcase/([^/]+)/([^/.]+)\.png', src)
    
    if m:
        cat = m.group(1)
        slug = m.group(2)
        best = get_best_jpeg(cat, slug)
        if best:
            return f'src="../images/work-showcase/{cat}/{slug}/{best}"'
    return match.group(0)

new_html = re.sub(r'src="([^"]+work-showcase[^"]+)"', replacer, html)

with open(OUR_WORK, 'w', encoding='utf-8') as f:
    f.write(new_html)
print("Maximized JPEG quality for all tiles in our-work.html")

# Also update generate_pages.py IMAGE_MAP
with open('generate_pages.py', encoding='utf-8') as f:
    gen_src = f.read()

# I will find all entries in IMAGE_MAP and replace them
def gen_replacer(match):
    slug = match.group(1)
    # Match cat from current path
    curr_path = match.group(2)
    cat = curr_path.split('/')[2]
    best = get_best_jpeg(cat, slug)
    if best:
        return f'"{slug}":          "images/work-showcase/{cat}/{slug}/{best}",'
    return match.group(0)

# Regex for "slug": "path",
new_gen = re.sub(r'"([^"]+)":\s+"(images/work-showcase/[^"]+)",', gen_replacer, gen_src)

with open('generate_pages.py', 'w', encoding='utf-8') as f:
    f.write(new_gen)
print("Updated generate_pages.py with best JPEGs")
