from PIL import Image
import os

def fix(path):
    if not os.path.exists(path): return
    img = Image.open(path).convert("RGBA")
    data = img.getdata()
    bg = img.getpixel((0,0))
    if bg[3] == 255:
        new = [(r,g,b,0) if (r,g,b) == bg[:3] else (r,g,b,a) for (r,g,b,a) in data]
        img.putdata(new)
        img.save(path)
        print(f"Fixed {path}")

logo_dir = r"c:\Users\dell\jAnitGravity\jCorporateEvents\TacTiq Corp\digital_clone\logo"
target_dir = r"c:\Users\dell\jAnitGravity\jCorporateEvents\TacTiq Corp\logo"

for n in [17, 20]:
    for d in [logo_dir, target_dir]:
        fix(os.path.join(d, f"logo_{n}.png"))
