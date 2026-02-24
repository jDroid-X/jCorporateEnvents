import os, re

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'

def resolve(start_file, rel_link):
    if rel_link.startswith(('http', '#', 'mailto:', 'tel:')):
        return True
    
    # Strip fragments/queries
    link = rel_link.split('#')[0].split('?')[0]
    if not link: return True
    
    start_dir = os.path.dirname(start_file)
    target = os.path.normpath(os.path.join(start_dir, link))
    
    return os.path.exists(target)

all_html = []
for root, dirs, files in os.walk(BASE):
    for f in files:
        if f.endswith('.html'):
            all_html.append(os.path.join(root, f))

broken_count = 0
for hf in all_html:
    rel_hf = os.path.relpath(hf, BASE)
    # print(f"Checking {rel_hf}...")
    with open(hf, encoding='utf-8') as f:
        content = f.read()
    
    refs = re.findall(r'(?:href|src)="([^"]+)"', content)
    for r in refs:
        if r.endswith(('.js', '.css')): continue
        if not resolve(hf, r):
            print(f"BROKEN in {rel_hf}: {r}")
            broken_count += 1

print(f"\nTotal broken links/images found: {broken_count}")
