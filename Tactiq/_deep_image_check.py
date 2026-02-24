import os, re

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'

def check_file(rel_from, src):
    full = os.path.normpath(os.path.join(BASE, rel_from, src))
    return os.path.isfile(full)

broken = []
for root, dirs, files in os.walk(BASE):
    for f in files:
        if f.endswith('.html'):
            fpath = os.path.join(root, f)
            with open(fpath, encoding='utf-8') as fobj:
                content = fobj.read()
            imgs = re.findall(r'src="([^"]+)"', content)
            for i in imgs:
                if i.startswith('http') or i.endswith('.js') or i.endswith('.css'): continue
                if not check_file(os.path.dirname(fpath), i):
                    broken.append((os.path.relpath(fpath, BASE), i))

if broken:
    print("Found broken images:")
    for b in broken:
        print(f"  {b[0]}: {b[1]}")
else:
    print("No broken images found in any HTML file.")
