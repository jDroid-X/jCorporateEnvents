import os
from bs4 import BeautifulSoup
from urllib.parse import unquote

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
START_FILE = os.path.join(ROOT_DIR, "index.html")

visited_pages = set()
broken_links = []
missing_images = []
pages_to_visit = [START_FILE]

print(f"Starting verification from: {START_FILE}")

while pages_to_visit:
    current_file_path = pages_to_visit.pop(0)
    
    if current_file_path in visited_pages:
        continue
        
    visited_pages.add(current_file_path)
    
    if not os.path.exists(current_file_path):
        broken_links.append(f"PAGE NOT FOUND: {current_file_path}")
        continue
        
    try:
        with open(current_file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
            
        # Check Links
        for a in soup.find_all('a', href=True):
            href = a['href']
            if href.startswith('http') or href.startswith('#') or href.startswith('mailto:'):
                continue
                
            # Resolve relative path
            target_path = os.path.normpath(os.path.join(os.path.dirname(current_file_path), href))
            
            if not os.path.exists(target_path):
                # Check directly in images or root if it's an anchor link like index.html#register which might be parsed as filename
                if '#' in href:
                    base_href = href.split('#')[0]
                    target_path_base = os.path.normpath(os.path.join(os.path.dirname(current_file_path), base_href))
                    if os.path.exists(target_path_base):
                        continue
                        
                broken_links.append(f"BROKEN LINK: '{href}' on page '{os.path.relpath(current_file_path, ROOT_DIR)}'")
            else:
                if target_path.endswith('.html') and target_path not in visited_pages and target_path not in pages_to_visit:
                     if target_path.startswith(ROOT_DIR): # Only visit internal site pages
                        pages_to_visit.append(target_path)

        # Check Images
        for img in soup.find_all('img', src=True):
            src = img['src']
            if src.startswith('http'):
                continue
                
            target_path = os.path.normpath(os.path.join(os.path.dirname(current_file_path), src))
            
            if not os.path.exists(target_path):
                missing_images.append(f"MISSING IMAGE: '{src}' on page '{os.path.relpath(current_file_path, ROOT_DIR)}'")

    except Exception as e:
        print(f"Error processing {current_file_path}: {e}")

print("\n--- VERIFICATION REPORT ---")
print(f"Scanned {len(visited_pages)} pages.")

if broken_links:
    print("\n[BROKEN LINKS FOUND]")
    for link in broken_links:
        print(link)
else:
    print("\n[LINKS OK] No broken internal links found.")

if missing_images:
    print("\n[MISSING IMAGES FOUND]")
    for img in missing_images:
        print(img)
else:
    print("\n[IMAGES OK] All images exist.")
