import re

with open('index.html', encoding='utf-8') as f:
    src = f.read()

# Replace directory links with our-work.html
# Using regex to catch variations in quotes or slash
src = re.sub(r'href="our-work/creativity-scale/?"', 'href="our-work/our-work.html"', src)
src = re.sub(r'href="our-work/brand-partner/?"', 'href="our-work/our-work.html"', src)
src = re.sub(r'href="our-work/on-ground/?"', 'href="our-work/our-work.html"', src)
src = re.sub(r'href="our-work/exhibition/?"', 'href="our-work/our-work.html"', src)
src = re.sub(r'href="our-work/large-deployment/?"', 'href="our-work/our-work.html"', src)
src = re.sub(r'href="pre-lockdown/?"', 'href="our-work/our-work.html"', src)
src = re.sub(r'href="media-trailer/?"', 'href="our-work/our-work.html"', src)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(src)
print("Updated index.html links")
