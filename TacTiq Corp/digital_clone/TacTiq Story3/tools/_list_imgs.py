import re

with open('our-work/our-work.html', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'src="([^"]+)"', html)
for i in imgs:
    print(i)
