import os, re

with open('generate_pages.py', 'r', encoding='utf-8') as f:
    text = f.read()

images_dir = 'images'
existing_files = []
for root, dirs, files in os.walk(images_dir):
    for file in files:
        existing_files.append(os.path.join(root, file).replace('\\', '/'))

paths = re.findall(r'"image_path":\s*"([^"]+)"', text)

for path in paths:
    # Check if the path exists locally in images directory
    # generate scripts paths use "images/..."
    local_path = path.replace('/', os.sep)
    if not os.path.exists(local_path):
        print('Missing:', path)
        basename = os.path.basename(path)
        for existing in existing_files:
            if basename.replace('-', '_').lower() == os.path.basename(existing).replace('-', '_').lower():
                print('Found closest match:', existing)
                text = text.replace(f'"image_path": "{path}"', f'"image_path": "{existing}"')

with open('generate_pages.py', 'w', encoding='utf-8') as f:
    f.write(text)
    
print("Updated missing images in generate_pages.py")
