import os, re

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'
WKDIR = os.path.join(BASE, 'images', 'work-showcase')
OUR_WORK = os.path.join(BASE, 'our-work', 'our-work.html')

with open(OUR_WORK, encoding='utf-8') as f:
    html = f.read()

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
        jpegs.sort(reverse=True)
        return jpegs[0][1]
    return None

def replacer(match):
    src = match.group(1)
    # Match pattern like ../images/work-showcase/cat/slug.png
    m = re.search(r'images/work-showcase/([^/]+)/([^/.]+)(\.png|\.jpeg|\.jpg)?', src)
    if m:
        cat = m.group(1)
        slug = m.group(2)
        best = get_best_jpeg(cat, slug)
        if best:
            return f'src="../images/work-showcase/{cat}/{slug}/{best}"'
    return match.group(0)

# Target all img src paths in work-showcase
new_html = re.sub(r'src="([^"]+work-showcase[^"]+)"', replacer, html)

with open(OUR_WORK, 'w', encoding='utf-8') as f:
    f.write(new_html)
print("Updated all tile images in our-work.html to best JPEGs")
