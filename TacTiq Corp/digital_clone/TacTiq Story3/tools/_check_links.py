import os, re

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'

def check_file(rel_from, src):
    full = os.path.normpath(os.path.join(BASE, rel_from, src))
    return os.path.isfile(full)

for fpath in ['index.html', 'our-work/our-work.html']:
    abs_fpath = os.path.join(BASE, fpath)
    if not os.path.exists(abs_fpath):
        print(f"File not found: {abs_fpath}")
        continue
    print(f'\n--- Checking {fpath} ---')
    with open(abs_fpath, encoding='utf-8') as f:
        content = f.read()
    
    # Check HREFs
    hrefs = re.findall(r'href="([^"]+)"', content)
    for h in hrefs:
        if h.startswith(('http', '#', 'mailto:', 'tel:')): continue
        if not check_file(os.path.dirname(fpath), h):
            print(f'  [BROKEN HREF] {h}')
            
    # Check IMGs
    imgs = re.findall(r'src="([^"]+)"', content)
    for i in imgs:
        if i.startswith('http') or i.endswith('.js') or i.endswith('.css'): continue
        if not check_file(os.path.dirname(fpath), i):
            print(f'  [BROKEN IMG] {i}')
