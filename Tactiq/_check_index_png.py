import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'src="([^"]+)"', html)
for i in imgs:
    if i.endswith('.png') and 'images' in i:
        print(i)
