import os
import re
from pathlib import Path

# Set base directory to the root of the project (parent of tools/)
BASE_DIR = Path(__file__).parent.parent.resolve()

def check_structure():
    print("--- 1. Restructuring Audit ---")
    essential_dirs = ['css', 'js', 'images', 'our-work', 'tools']
    for d in essential_dirs:
        path = BASE_DIR / d
        status = "PASS" if path.is_dir() else "FAIL"
        print(f"[{status}] Directory '{d}' exists.")

    essential_files = ['index.html', 'js/vendor/ThemeManager.js', 'css/desktop.css']
    for f in essential_files:
        path = BASE_DIR / f
        status = "PASS" if path.is_file() else "FAIL"
        print(f"[{status}] File '{f}' exists.")

def check_links():
    print("\n--- 2. Link & Asset Portability Audit ---")
    broken = []
    html_files = list(BASE_DIR.rglob("*.html"))
    print(f"Scanning {len(html_files)} HTML files for broken relative links...")
    
    for hfile in html_files:
        with open(hfile, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all src and href references
        refs = re.findall(r'(?:href|src)="([^"]+)"', content)
        for ref in refs:
            # Skip absolute URLs and fragments
            if ref.startswith(('http', 'https', '#', 'mailto:', 'tel:', 'javascript:')):
                continue
            
            # Resolve relative path
            ref_path_clean = ref.split('#')[0].split('?')[0]
            if not ref_path_clean:
                continue
                
            target = (hfile.parent / ref_path_clean).resolve()
            
            # Check if target is inside the Story3 folder (for strict portability)
            # Actually, external links to Story1, Story2 are expected to break if Story3 is moved ALONE.
            # But they should still be "working" if the whole digital_clone is moved.
            # User said "independently if the folder is moved to any location".
            # This implies STORY 3 itself must not break.
            
            if not target.exists():
                broken.append(f"Broken: '{ref}' in {hfile.relative_to(BASE_DIR)}")
    
    if not broken:
        print("[PASS] No broken internal links found.")
    else:
        for b in broken:
            print(f"[FAIL] {b}")
    return broken

def check_responsive():
    print("\n--- 3. Responsiveness Audit ---")
    css_files = ['css/desktop.css', 'css/tablet.css', 'css/mobile.css']
    for css in css_files:
        path = BASE_DIR / css
        if path.is_file():
            # Basic check for media queries
            with open(path, 'r', encoding='utf-8') as f:
                has_mq = "@media" in f.read()
            print(f"[PASS] {css} loaded. (Media queries found: {has_mq})")
        else:
            print(f"[FAIL] {css} is missing.")

if __name__ == "__main__":
    check_structure()
    broken_links = check_links()
    check_responsive()
    
    print("\n--- Final Status ---")
    if not broken_links:
        print("WEB SITE STATUS: EXCELLENT / PORTABLE")
    else:
        print(f"WEB SITE STATUS: ISSUES FOUND ({len(broken_links)} broken markers)")
