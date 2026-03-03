"""
Tactiq Experiences — PDF Image Extractor
Reads all images from the PDF and saves them to the correct
website image folders based on page-to-event mapping.

Run from the Tactiq/ root directory:
    python extract_images.py
"""

import os, sys, json
sys.stdout.reconfigure(encoding='utf-8')
import fitz  # PyMuPDF

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_PATH = os.path.join(BASE_DIR, "Tactiq Experiences Credentials.pdf")
IMG_DIR  = os.path.join(BASE_DIR, "images")

# ──────────────────────────────────────────────────────────────────────────────
# PAGE → (folder, filename_stem) mapping
# Multiple pages can map to the same event (all their images go to same folder
# with sequential numbering).
# Pages are 1-indexed.
# ──────────────────────────────────────────────────────────────────────────────
# folder is relative to images/
PAGE_MAP = {
    # Home / General
    1:  ("home", "cover"),
    2:  ("home", "who-we-are"),
    3:  ("home", "our-story"),
    4:  ("home", "vision"),
    5:  ("home", "why-choose-us"),
    6:  ("home", "core-expertise"),
    7:  ("home", "work-showcase-intro"),

    # ── Section 01: Where Creativity Meets Scale ──
    8:  ("work-showcase/creativity-scale", "section-cover"),
    9:  ("work-showcase/creativity-scale/classic-hyperx", "event"),
    10: ("work-showcase/creativity-scale/aim-together", "event"),
    11: ("work-showcase/creativity-scale/ai-copilot-launch", "event"),
    12: ("work-showcase/creativity-scale/ai-windows-launch", "event"),
    13: ("work-showcase/creativity-scale/ai-portfolio-launch", "event"),
    14: ("work-showcase/creativity-scale/hp-pc-plus", "event"),
    15: ("work-showcase/creativity-scale/laserjet-launch", "event"),
    16: ("work-showcase/creativity-scale/omen-influencer", "event"),
    17: ("work-showcase/creativity-scale/chalo-raushan", "event"),

    # ── Section 02: Large-Scale Deployment ──
    18: ("work-showcase/large-deployment", "section-cover"),
    19: ("work-showcase/large-deployment/inkredible-connect", "event"),
    20: ("work-showcase/large-deployment/printposium", "event"),
    21: ("work-showcase/large-deployment/south-india-rlfr", "event"),
    22: ("work-showcase/large-deployment/ignite-together", "event"),
    23: ("work-showcase/large-deployment/growthon", "event"),
    24: ("work-showcase/large-deployment/fighters", "event"),
    25: ("work-showcase/large-deployment/omen-playground", "event"),

    # ── Section 03: Brand Partner Engagement ──
    26: ("work-showcase/brand-partner", "section-cover"),
    27: ("work-showcase/brand-partner/redington-partner", "event"),
    28: ("work-showcase/brand-partner/annual-conference", "event"),
    29: ("work-showcase/brand-partner/google-amd-redington", "event"),

    # ── Media & Trailer Rollout ──
    30: ("work-showcase/media-trailer", "section-cover"),
    31: ("work-showcase/media-trailer/escaype-live", "event"),
    32: ("work-showcase/media-trailer/koffee-karan", "event"),
    33: ("work-showcase/media-trailer/koffee-karan", "event-s6"),
    34: ("work-showcase/media-trailer/koffee-karan", "event-s7"),
    35: ("work-showcase/media-trailer/sultan-of-delhi", "event"),
    36: ("work-showcase/media-trailer/taaza-khabar", "event"),

    # ── Pre-Lockdown Legacy ──
    37: ("work-showcase/pre-lockdown", "section-cover"),
    38: ("work-showcase/pre-lockdown/global-steering-summit", "event"),
    39: ("work-showcase/pre-lockdown/buddha-jayanti", "event"),
    40: ("work-showcase/pre-lockdown/gmr-igia-awards", "event"),
    41: ("work-showcase/pre-lockdown/gmr-hyderabad-rgia", "event"),

    # ── On-Ground Impact ──
    42: ("work-showcase/on-ground", "section-cover"),
    43: ("work-showcase/on-ground/holi-cheer", "event"),
    44: ("work-showcase/on-ground/ai-pc-pre-diwali", "event"),
    45: ("work-showcase/on-ground/diwali-gaming-fest", "event"),
    46: ("work-showcase/on-ground/ctss-printer-launch", "event"),
    47: ("work-showcase/on-ground/independence-day", "event"),
    48: ("work-showcase/on-ground/ctss-holi-activation", "event"),
    49: ("work-showcase/on-ground/diwali-ai-tech", "event"),
    50: ("work-showcase/on-ground/hp-chromebook-srcc", "event"),

    # ── Exhibition & Retail ──
    51: ("work-showcase/exhibition", "section-cover"),
    52: ("work-showcase/exhibition/hyperx-gaming-con", "event"),
    53: ("work-showcase/exhibition/india-craft-week", "event"),
    54: ("work-showcase/exhibition/vedanta-stall", "event"),
    55: ("work-showcase/exhibition/zee-jaipur-litfest", "event"),

    # ── Pan-India / Contact / Final pages ──
    56: ("home", "pan-india-reach"),
    57: ("home", "contact"),
}

# Minimum image dimension to skip logos/icons
MIN_WIDTH  = 80
MIN_HEIGHT = 80


def extract_images():
    if not os.path.exists(PDF_PATH):
        print(f"ERROR: PDF not found at {PDF_PATH}")
        return

    doc = fitz.open(PDF_PATH)
    total_pages = len(doc)
    print(f"PDF loaded: {total_pages} pages\n")

    total_saved = 0
    skipped_small = 0

    for page_num in range(1, total_pages + 1):
        page = doc[page_num - 1]
        mapping = PAGE_MAP.get(page_num)

        if not mapping:
            # Unmapped pages: dump into misc/
            folder_rel, stem = "misc", f"page-{page_num:02d}"
        else:
            folder_rel, stem = mapping

        # Absolute folder path
        folder_abs = os.path.join(IMG_DIR, folder_rel.replace("/", os.sep))
        os.makedirs(folder_abs, exist_ok=True)

        # Also create a matching alias in the top-level work-showcase/
        # for the HTML sub-pages that reference images/work-showcase/...
        if folder_rel.startswith("work-showcase/"):
            alias = folder_rel.split("/")
            if len(alias) >= 3:
                # Create category-level folder too (for work tile background)
                cat_folder = os.path.join(IMG_DIR, alias[0], alias[1])
                os.makedirs(cat_folder, exist_ok=True)

        # Extract all images from this page
        image_list = page.get_images(full=True)
        page_saved = 0

        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]
            try:
                base_image   = doc.extract_image(xref)
                image_bytes  = base_image["image"]
                image_ext    = base_image["ext"]   # e.g. "jpeg", "png"
                width        = base_image["width"]
                height       = base_image["height"]

                # Skip tiny images (decorative / icons)
                if width < MIN_WIDTH or height < MIN_HEIGHT:
                    skipped_small += 1
                    continue

                # Determine filename
                if img_index == 0:
                    filename = f"{stem}.{image_ext}"
                else:
                    filename = f"{stem}-{img_index}.{image_ext}"

                out_path = os.path.join(folder_abs, filename)

                # Don't overwrite if already exists
                if os.path.exists(out_path):
                    counter = 1
                    base_name = os.path.splitext(filename)[0]
                    while os.path.exists(out_path):
                        filename = f"{base_name}-v{counter}.{image_ext}"
                        out_path = os.path.join(folder_abs, filename)
                        counter += 1

                with open(out_path, "wb") as img_file:
                    img_file.write(image_bytes)

                rel_path = out_path.replace(BASE_DIR + os.sep, "")
                print(f"  [p{page_num:02d}] {width}x{height} -> {rel_path}")
                page_saved += 1
                total_saved += 1

            except Exception as e:
                print(f"  [p{page_num:02d}] img#{img_index} skipped: {e}")

        if not image_list:
            print(f"  [p{page_num:02d}] No embedded images found on this page")

    doc.close()

    print(f"\n{'='*60}")
    print(f"Done!")
    print(f"  Total images saved : {total_saved}")
    print(f"  Skipped (too small): {skipped_small}")
    print(f"  Images saved to    : {IMG_DIR}")
    print(f"{'='*60}")

    # ── Copy hero images to the top-level paths that HTML expects ──
    post_process_aliases()


def post_process_aliases():
    """
    The website HTML references images like:
      images/work-showcase/creativity-scale/classic-hyperx.jpg
    But our extractor saves them as:
      images/work-showcase/creativity-scale/classic-hyperx/event.jpeg
    
    This function copies / renames the first image from each event subfolder
    up to the category level as the tile image expected by the HTML.
    """
    print("\nCreating tile alias images...")
    categories = [
        "creativity-scale",
        "large-deployment",
        "brand-partner",
        "on-ground",
        "exhibition",
        "media-trailer",
        "pre-lockdown",
    ]

    import shutil

    for cat in categories:
        cat_path = os.path.join(IMG_DIR, "work-showcase", cat)
        if not os.path.isdir(cat_path):
            continue
        for event_folder in os.listdir(cat_path):
            event_path = os.path.join(cat_path, event_folder)
            if not os.path.isdir(event_path):
                continue
            # Find first image file
            imgs = [f for f in os.listdir(event_path)
                    if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
            if not imgs:
                continue
            src = os.path.join(event_path, sorted(imgs)[0])
            ext = os.path.splitext(src)[1]
            dst = os.path.join(cat_path, f"{event_folder}{ext}")
            if not os.path.exists(dst):
                shutil.copy2(src, dst)
                print(f"  Alias: {cat}/{event_folder}{ext}")


if __name__ == "__main__":
    extract_images()
