import os
from bs4 import BeautifulSoup

def check_site(html_path):
    if not os.path.exists(html_path):
        print(f"Error: {html_path} not found.")
        return

    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    base_dir = os.path.dirname(html_path)
    imgs = soup.find_all("img")
    missing_imgs = []
    for img in imgs:
        src = img.get("src")
        if not src:
            continue
        # handle potential encoded paths
        src = src.replace("%20", " ")
        full_src = os.path.join(base_dir, src)
        if not os.path.exists(full_src):
            missing_imgs.append(src)

    links = soup.find_all("a")
    broken_anchors = []
    for link in links:
        href = link.get("href")
        if not href: continue
        if href.startswith("#") and href != "#":
            anchor = href[1:]
            if not soup.find(id=anchor) and not soup.find(attrs={"name": anchor}):
                broken_anchors.append(href)

    print(f"--- Checking {html_path} ---")
    if missing_imgs:
        print("Missing Images:")
        for m in sorted(set(missing_imgs)):
            print(f"  - {m}")
    else:
        print("All images found!")

    if broken_anchors:
        print("Broken Anchor Links:")
        for b in sorted(set(broken_anchors)):
            print(f"  - {b}")
    else:
        print("All anchor links are valid!")

check_site(r"c:\Users\dell\jAnitGravity\jCorporateEvents\TacTiq Corp\index.html")
check_site(r"c:\Users\dell\jAnitGravity\jCorporateEvents\TacTiq Corp\digital_clone\PDF Stories\index.html")
