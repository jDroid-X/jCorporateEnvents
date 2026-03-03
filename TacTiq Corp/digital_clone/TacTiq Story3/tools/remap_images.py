"""
Tactiq — Image Remapper
Scans the images/ folder to find real extracted image filenames,
then updates generate_pages.py so sub-pages reference the correct image,
regenerates all sub-pages, and patches our-work.html work tiles.

Run from the Tactiq/ root:
    python remap_images.py
"""

import os, sys, re, json, subprocess
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMG_DIR  = os.path.join(BASE_DIR, "images")

# ──────────────────────────────────────────────────────────────────────────────
# 1. Build image map:
#    event_slug → best image path (relative to images/, using forward slashes)
#    We prefer high-res JPEGs over PNG templates. Main event image = first .jpeg
#    found in the event subfolder, or the alias .png at category level.
# ──────────────────────────────────────────────────────────────────────────────

def best_image(event_folder_abs, alias_abs=None):
    """
    Return the best single image path (absolute) for the event.
    Priority: first high-res jpeg in event subfolder > alias png at cat level.
    """
    if os.path.isdir(event_folder_abs):
        jpegs = sorted([
            f for f in os.listdir(event_folder_abs)
            if f.lower().endswith(('.jpeg', '.jpg'))
        ])
        if jpegs:
            return os.path.join(event_folder_abs, jpegs[0])
        pngs = sorted([
            f for f in os.listdir(event_folder_abs)
            if f.lower().endswith('.png') and not f.startswith('event.png')
        ])
        # Skip template PNGs (1536x864 banners) — pick the jpg-like ones
        # Just return the alias if no good jpeg found
    if alias_abs and os.path.isfile(alias_abs):
        return alias_abs
    return None


def rel_from_images(abs_path):
    """Return images/... relative path with forward slashes."""
    rel = abs_path.replace(IMG_DIR, "images").replace(os.sep, "/")
    if not rel.startswith("images/"):
        rel = "images/" + rel
    return rel


# Slug → (category relative folder, event subfolder name)
SLUG_MAP = {
    # creativity-scale
    "classic-hyperx":       ("work-showcase/creativity-scale", "classic-hyperx"),
    "aim-together":         ("work-showcase/creativity-scale", "aim-together"),
    "ai-copilot-launch":    ("work-showcase/creativity-scale", "ai-copilot-launch"),
    "ai-windows-launch":    ("work-showcase/creativity-scale", "ai-windows-launch"),
    "ai-portfolio-launch":  ("work-showcase/creativity-scale", "ai-portfolio-launch"),
    "hp-pc-plus":           ("work-showcase/creativity-scale", "hp-pc-plus"),
    "laserjet-launch":      ("work-showcase/creativity-scale", "laserjet-launch"),
    "omen-influencer":      ("work-showcase/creativity-scale", "omen-influencer"),
    "chalo-raushan":        ("work-showcase/creativity-scale", "chalo-raushan"),
    # large-deployment
    "inkredible-connect":   ("work-showcase/large-deployment", "inkredible-connect"),
    "printposium":          ("work-showcase/large-deployment", "printposium"),
    "south-india-rlfr":     ("work-showcase/large-deployment", "south-india-rlfr"),
    "ignite-together":      ("work-showcase/large-deployment", "ignite-together"),
    "growthon":             ("work-showcase/large-deployment", "growthon"),
    "fighters":             ("work-showcase/large-deployment", "fighters"),
    "omen-playground":      ("work-showcase/large-deployment", "omen-playground"),
    # brand-partner
    "redington-partner":    ("work-showcase/brand-partner", "redington-partner"),
    "annual-conference":    ("work-showcase/brand-partner", "annual-conference"),
    "google-amd-redington": ("work-showcase/brand-partner", "google-amd-redington"),
    # on-ground
    "holi-cheer":           ("work-showcase/on-ground", "holi-cheer"),
    "ai-pc-pre-diwali":     ("work-showcase/on-ground", "ai-pc-pre-diwali"),
    "diwali-gaming-fest":   ("work-showcase/on-ground", "diwali-gaming-fest"),
    "ctss-printer-launch":  ("work-showcase/on-ground", "ctss-printer-launch"),
    "independence-day":     ("work-showcase/on-ground", "independence-day"),
    "ctss-holi-activation": ("work-showcase/on-ground", "ctss-holi-activation"),
    "diwali-ai-tech":       ("work-showcase/on-ground", "diwali-ai-tech"),
    "hp-chromebook-srcc":   ("work-showcase/on-ground", "hp-chromebook-srcc"),
    # exhibition
    "hyperx-gaming-con":    ("work-showcase/exhibition", "hyperx-gaming-con"),
    "india-craft-week":     ("work-showcase/exhibition", "india-craft-week"),
    "vedanta-stall":        ("work-showcase/exhibition", "vedanta-stall"),
    "zee-jaipur-litfest":   ("work-showcase/exhibition", "zee-jaipur-litfest"),
    # pre-lockdown
    "global-steering-summit": ("work-showcase/pre-lockdown", "global-steering-summit"),
    "buddha-jayanti":        ("work-showcase/pre-lockdown", "buddha-jayanti"),
    "gmr-igia-awards":       ("work-showcase/pre-lockdown", "gmr-igia-awards"),
    "gmr-hyderabad-rgia":    ("work-showcase/pre-lockdown", "gmr-hyderabad-rgia"),
    # media-trailer
    "escaype-live":          ("work-showcase/media-trailer", "escaype-live"),
    "koffee-karan":          ("work-showcase/media-trailer", "koffee-karan"),
    "sultan-of-delhi":       ("work-showcase/media-trailer", "sultan-of-delhi"),
    "taaza-khabar":          ("work-showcase/media-trailer", "taaza-khabar"),
}

# Build slug → best_image_relative_path
IMAGE_MAP = {}
for slug, (cat_rel, event_name) in SLUG_MAP.items():
    event_folder_abs = os.path.join(IMG_DIR, cat_rel.replace("/", os.sep), event_name)
    alias_abs = os.path.join(IMG_DIR, cat_rel.replace("/", os.sep), event_name + ".png")
    img_abs = best_image(event_folder_abs, alias_abs)
    if img_abs:
        IMAGE_MAP[slug] = rel_from_images(img_abs)
        print(f"  {slug:35s} -> {IMAGE_MAP[slug]}")
    else:
        print(f"  WARNING: no image found for {slug}")

# Special: home images
HOME_HERO = "images/home/who-we-are-2.jpeg" if os.path.exists(
    os.path.join(IMG_DIR, "home", "who-we-are-2.jpeg")) else "images/home/cover.png"

HOME_REACH_CANDIDATES = [
    os.path.join(IMG_DIR, "home", "pan-india-reach-3.png"),
    os.path.join(IMG_DIR, "home", "pan-india-reach-2.png"),
    os.path.join(IMG_DIR, "home", "pan-india-reach.png"),
]
HOME_REACH = next((rel_from_images(p) for p in HOME_REACH_CANDIDATES if os.path.isfile(p)), "")

print(f"\n  hero   -> {HOME_HERO}")
print(f"  reach  -> {HOME_REACH}\n")


# ──────────────────────────────────────────────────────────────────────────────
# 2. Update generate_pages.py — patch the build_page() function
#    to use slug-specific image paths
# ──────────────────────────────────────────────────────────────────────────────

GEN_PATH = os.path.join(BASE_DIR, "generate_pages.py")

with open(GEN_PATH, encoding="utf-8") as f:
    gen_src = f.read()

# The current code computes img_src generically based on path:
#   folder = os.path.dirname(out_path).replace("our-work/", "work-showcase/")
#   img_src = f"{rel}images/{folder}/{image_slug}.jpg"
# Replace the img_src line with a dict lookup from IMAGE_MAP embedded in the script

# Build the IMAGE_MAP as a literal dict to embed
image_map_literal = "{\n"
for slug, path in sorted(IMAGE_MAP.items()):
    image_map_literal += f'    "{slug}": "{path}",\n'
image_map_literal += "}"

# New img_src generation code block to replace the old 3 lines
OLD_IMG_BLOCK = '''    image_slug = os.path.splitext(os.path.basename(out_path))[0]
    folder = os.path.dirname(out_path).replace("our-work/", "work-showcase/")
    img_src = f"{rel}images/{folder}/{image_slug}.jpg"'''

NEW_IMG_BLOCK = f'''    _IMAGE_MAP = {image_map_literal}
    image_slug = os.path.splitext(os.path.basename(out_path))[0]
    _img_rel = _IMAGE_MAP.get(image_slug, "")
    if _img_rel:
        img_src = rel + _img_rel
    else:
        folder = os.path.dirname(out_path).replace("our-work/", "work-showcase/")
        img_src = f"{{rel}}images/{{folder}}/{{image_slug}}.jpg"'''

if OLD_IMG_BLOCK in gen_src:
    gen_src = gen_src.replace(OLD_IMG_BLOCK, NEW_IMG_BLOCK)
    with open(GEN_PATH, "w", encoding="utf-8") as f:
        f.write(gen_src)
    print("generate_pages.py updated with image map.")
else:
    print("WARNING: Could not find the img_src block in generate_pages.py — check manually.")


# ──────────────────────────────────────────────────────────────────────────────
# 3. Re-run generate_pages.py to regenerate all 36 sub-pages with correct images
# ──────────────────────────────────────────────────────────────────────────────

print("\nRegenerating all sub-pages...")
result = subprocess.run(
    ["python", "generate_pages.py"],
    cwd=BASE_DIR,
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(result.stdout[-2000:] if len(result.stdout) > 2000 else result.stdout)
if result.returncode != 0:
    print("ERROR:", result.stderr[-1000:])
else:
    print("All sub-pages regenerated.")


# ──────────────────────────────────────────────────────────────────────────────
# 4. Patch our-work.html — update each work-tile img src
# ──────────────────────────────────────────────────────────────────────────────

OUR_WORK_PATH = os.path.join(BASE_DIR, "our-work", "our-work.html")

with open(OUR_WORK_PATH, encoding="utf-8") as f:
    ow_html = f.read()

patched = 0
for slug, img_path in IMAGE_MAP.items():
    # our-work.html is at our-work/ so prefix is ../
    src_val = "../" + img_path  # e.g. ../images/work-showcase/...
    # Find the work-tile for this slug and replace <div class="work-tile-bg"></div>
    # with one that has an actual img tag
    old_bg = f'href="{slug}.html" class="work-tile"><div class="work-tile-bg"></div>'
    new_bg = (f'href="{slug}.html" class="work-tile">'
              f'<div class="work-tile-bg">'
              f'<img src="{src_val}" alt="" loading="lazy" '
              f'onerror="this.parentElement.style.background=\'linear-gradient(135deg,#1a1a1a,#0d0d0d)\'" />'
              f'</div>')
    if old_bg in ow_html:
        ow_html = ow_html.replace(old_bg, new_bg)
        patched += 1

# Also look for relative links like our-work/creativity-scale/slug.html
for slug, img_path in IMAGE_MAP.items():
    src_val = "../" + img_path
    # Pattern: href="creativity-scale/classic-hyperx.html" etc (sub-paths)
    patterns = [
        f'href="creativity-scale/{slug}.html"',
        f'href="large-deployment/{slug}.html"',
        f'href="brand-partner/{slug}.html"',
        f'href="on-ground/{slug}.html"',
        f'href="exhibition/{slug}.html"',
        f'href="pre-lockdown/{slug}.html"',
        f'href="media-trailer/{slug}.html"',
    ]
    for pat in patterns:
        if pat in ow_html:
            # Find the work-tile-bg div right after this href pattern and inject img
            old_tile = f'{pat} class="work-tile"><div class="work-tile-bg"></div>'
            new_tile = (f'{pat} class="work-tile">'
                        f'<div class="work-tile-bg">'
                        f'<img src="{src_val}" alt="" loading="lazy" '
                        f'onerror="this.parentElement.style.background=\'linear-gradient(135deg,#1a1a1a,#0d0d0d)\'" />'
                        f'</div>')
            if old_tile in ow_html:
                ow_html = ow_html.replace(old_tile, new_tile)
                patched += 1

with open(OUR_WORK_PATH, "w", encoding="utf-8") as f:
    f.write(ow_html)
print(f"\nour-work.html: {patched} tile images updated.")


# ──────────────────────────────────────────────────────────────────────────────
# 5. Patch index.html — update hero background and reach section
# ──────────────────────────────────────────────────────────────────────────────

INDEX_PATH = os.path.join(BASE_DIR, "index.html")

with open(INDEX_PATH, encoding="utf-8") as f:
    idx_html = f.read()

idx_patched = 0

# Inject hero image as inline style (already references home/hero.jpg in css;
# add a style attribute to <header class="hero-tactiq")
if HOME_HERO and 'class="hero-tactiq"' in idx_html:
    # Add inline style to override CSS background image
    old_hero_tag = '<header class="hero-tactiq" id="hero">'
    new_hero_tag = (f'<header class="hero-tactiq" id="hero" '
                    f'style="background-image: radial-gradient(ellipse at 70% 40%, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.97) 80%), url(\'{HOME_HERO}\');">')
    if old_hero_tag in idx_html:
        idx_html = idx_html.replace(old_hero_tag, new_hero_tag)
        idx_patched += 1

# Inject reach section background
if HOME_REACH and 'class="reach-section"' in idx_html:
    old_reach = '<section class="reach-section" id="reach">'
    new_reach = (f'<section class="reach-section" id="reach" '
                 f'style="background-image: linear-gradient(rgba(0,0,0,0.72),rgba(0,0,0,0.72)), url(\'{HOME_REACH}\');">')
    if old_reach in idx_html:
        idx_html = idx_html.replace(old_reach, new_reach)
        idx_patched += 1

with open(INDEX_PATH, "w", encoding="utf-8") as f:
    f.write(idx_html)
print(f"index.html: {idx_patched} background images updated.")

print("\nDone! All images mapped to their HTML links.")
