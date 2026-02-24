import re

with open('our-work/our-work.html', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'src="([^"]+)"', html)
# Filter for work-showcase images only
work_imgs = [i for i in imgs if 'work-showcase' in i]
print(f"Total work tiles in our-work.html: {len(work_imgs)}")
