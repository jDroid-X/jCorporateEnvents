"""
Comprehensive final patch script:
1. Adds new media-trailer entries to IMAGE_MAP in generate_pages.py
2. Creates image folders for new media-trailer pages using shared images from related PDF pages
3. Updates our-work.html with ALL missing tiles (fighters, growthon, new media-trailer pages)
4. Regenerates all pages via generate_pages.py
"""
import os, sys, shutil, subprocess
sys.stdout.reconfigure(encoding='utf-8')

BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq'
IMG  = os.path.join(BASE, 'images')
GEN  = os.path.join(BASE, 'generate_pages.py')

# ──────────────────────────────────────────────────────────────────────────────
# 1. Create image folders for new media-trailer pages (reuse existing images)
# ──────────────────────────────────────────────────────────────────────────────
# The Night Manager, Show Time/Karma Calling, Good Luck Jerry/Gulmohar/Freelancer
# all live on PDF pages 32-35 which were captured in koffee-karan folder images
# We'll create new folders and symlink/copy the best images from koffee-karan

NEW_MEDIA_FOLDERS = {
    'the-night-manager': ('koffee-karan', ['event-s6-2.jpeg', 'event-s6-3.jpeg', 'event-s6-4.jpeg', 'event-2.jpeg', 'event-3.jpeg']),
    'show-time-karma':   ('koffee-karan', ['event-2.jpeg', 'event-3.jpeg', 'event-4.jpeg']),
    'good-luck-jerry':   ('koffee-karan', ['event-s7-2.jpeg', 'event-s7-3.jpeg', 'event-s7-4.jpeg', 'event-4.jpeg']),
}

for new_slug, (source_slug, source_files) in NEW_MEDIA_FOLDERS.items():
    src_folder = os.path.join(IMG, 'work-showcase', 'media-trailer', source_slug)
    dst_folder = os.path.join(IMG, 'work-showcase', 'media-trailer', new_slug)
    os.makedirs(dst_folder, exist_ok=True)
    
    for i, filename in enumerate(source_files):
        src_file = os.path.join(src_folder, filename)
        if os.path.isfile(src_file):
            ext = os.path.splitext(filename)[1]
            dst_name = f'event-{i+1}{ext}'
            dst_file = os.path.join(dst_folder, dst_name)
            if not os.path.exists(dst_file):
                shutil.copy2(src_file, dst_file)
                print(f'  Copied {filename} -> {new_slug}/{dst_name}')
    
    # Create alias PNG at category level
    alias_src = os.path.join(IMG, 'work-showcase', 'media-trailer', source_slug + '.png')
    alias_dst = os.path.join(IMG, 'work-showcase', 'media-trailer', new_slug + '.png')
    if os.path.isfile(alias_src) and not os.path.isfile(alias_dst):
        shutil.copy2(alias_src, alias_dst)
        print(f'  Alias: media-trailer/{new_slug}.png')

# ──────────────────────────────────────────────────────────────────────────────
# 2. Add new slugs to IMAGE_MAP in generate_pages.py
# ──────────────────────────────────────────────────────────────────────────────

NEW_MAP_ENTRIES = {
    'the-night-manager':  'images/work-showcase/media-trailer/the-night-manager/event-1.jpeg',
    'show-time-karma':    'images/work-showcase/media-trailer/show-time-karma/event-1.jpeg',
    'good-luck-jerry':    'images/work-showcase/media-trailer/good-luck-jerry/event-1.jpeg',
    'growthon':           'images/work-showcase/large-deployment/growthon/event-3.jpeg',
    'fighters':           'images/work-showcase/large-deployment/fighters/event-3.jpeg',
}

with open(GEN, encoding='utf-8') as f:
    src = f.read()

# Find the end of the _IMAGE_MAP dict (before the closing brace) and insert new entries
# The last existing entry before closing is taaza-khabar
OLD_TAAZA = '"taaza-khabar":          "images/work-showcase/media-trailer/taaza-khabar/event-3.jpeg",'
NEW_TAAZA = OLD_TAAZA
for slug, path in NEW_MAP_ENTRIES.items():
    entry = f'\n        "{slug}": "{path}",'
    if f'"{slug}"' not in src:
        NEW_TAAZA += entry

if NEW_TAAZA != OLD_TAAZA:
    src = src.replace(OLD_TAAZA, NEW_TAAZA)
    with open(GEN, 'w', encoding='utf-8') as f:
        f.write(src)
    print('generate_pages.py IMAGE_MAP updated with new entries.')
else:
    print('All IMAGE_MAP entries already present.')

# ──────────────────────────────────────────────────────────────────────────────
# 3. Verify new image files exist (update path if needed)
# ──────────────────────────────────────────────────────────────────────────────
for slug, path in NEW_MAP_ENTRIES.items():
    abs_path = os.path.join(BASE, path.replace('/', os.sep))
    if not os.path.exists(abs_path):
        # Find first jpeg in folder
        folder = os.path.dirname(abs_path)
        if os.path.isdir(folder):
            jpegs = sorted([f for f in os.listdir(folder) if f.lower().endswith(('.jpeg', '.jpg'))])
            if jpegs:
                correct = f'images/work-showcase/{os.path.relpath(folder, os.path.join(BASE, "images")).replace(os.sep, "/")}/{jpegs[0]}'
                # Fix in generate_pages.py
                with open(GEN, encoding='utf-8') as f:
                    content = f.read()
                content = content.replace(f'"{slug}": "{path}"', f'"{slug}": "{correct}"')
                with open(GEN, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'  Fixed {slug}: {path} -> {correct}')
            else:
                print(f'  WARNING: No jpeg found for {slug} in {folder}')
        else:
            print(f'  WARNING: Folder not found: {folder}')
    else:
        print(f'  OK: {slug} -> {path}')

# ──────────────────────────────────────────────────────────────────────────────
# 4. Update our-work.html with ALL missing tiles
# ──────────────────────────────────────────────────────────────────────────────

OUR_WORK = os.path.join(BASE, 'our-work', 'our-work.html')
with open(OUR_WORK, encoding='utf-8') as f:
    html = f.read()

# Check which tiles are missing
MISSING_TILES = []
TILE_DEFS = [
    # (slug, category, category-label, year, title, img-path)
    ('growthon', 'large-deployment', 'Large-Scale Deployment', '2023',
     'Growthon – HP Partner Accelerator', '../images/work-showcase/large-deployment/growthon.png'),
    ('fighters', 'large-deployment', 'Large-Scale Deployment', '2024',
     'Fighters: A Tribute to Target Achievers', '../images/work-showcase/large-deployment/fighters.png'),
    ('the-night-manager', 'media-trailer', 'Media &amp; Trailer Rollout', '2023',
     'The Night Manager – Series Premiere', '../images/work-showcase/media-trailer/the-night-manager.png'),
    ('show-time-karma', 'media-trailer', 'Media &amp; Trailer Rollout', '2023',
     'Show Time, Karma Calling &amp; More', '../images/work-showcase/media-trailer/show-time-karma.png'),
    ('good-luck-jerry', 'media-trailer', 'Media &amp; Trailer Rollout', '2022/23',
     'Good Luck Jerry, Gulmohar &amp; Freelancer', '../images/work-showcase/media-trailer/good-luck-jerry.png'),
]

for slug, cat, cat_label, year, title, img_path in TILE_DEFS:
    if f'/{slug}.html"' not in html:
        MISSING_TILES.append((slug, cat, cat_label, year, title, img_path))
        print(f'  MISSING tile: {slug}')
    else:
        print(f'  OK tile: {slug}')

# Inject missing tiles into the appropriate section in our-work.html
# Find an existing tile in the same category and append the new tile after it

def make_tile_html(slug, cat, cat_label, year, title, img_path):
    return f'''
                <a href="{slug}.html" class="work-tile">
                    <div class="work-tile-bg"><img src="{img_path}" alt="" loading="lazy" onerror="this.style.display='none'" /></div>
                    <div class="work-tile-content">
                        <span class="work-tile-cat">{cat_label}</span>
                        <h3 class="work-tile-title">{title}</h3>
                        <span class="work-tile-year">{year}</span>
                    </div>
                </a>'''

for slug, cat, cat_label, year, title, img_path in MISSING_TILES:
    tile_html = make_tile_html(slug, cat, cat_label, year, title, img_path)
    
    # Find the last tile in the same category section and insert after it
    # For large-deployment, find ignite-together.html or existing tile
    # For media-trailer, find taaza-khabar.html
    anchor_slugs = {
        'large-deployment': ['ignite-together', 'south-india-rlfr', 'printposium'],
        'media-trailer':    ['taaza-khabar', 'sultan-of-delhi', 'koffee-karan'],
    }
    inserted = False
    for anchor in anchor_slugs.get(cat, []):
        anchor_str = f'/{anchor}.html"'
        if anchor_str in html:
            # Find the end of this tile's closing </a> tag
            pos = html.find(anchor_str)
            # Find the closing </a> for this tile block
            close_a = html.find('</a>', pos)
            if close_a != -1:
                insert_pos = close_a + len('</a>')
                html = html[:insert_pos] + tile_html + html[insert_pos:]
                print(f'  Inserted {slug} after {anchor}')
                inserted = True
                break
    
    if not inserted:
        print(f'  WARNING: Could not find anchor for {slug} in {cat} - manual add needed')

with open(OUR_WORK, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'our-work.html: {len(MISSING_TILES)} new tiles added')

# ──────────────────────────────────────────────────────────────────────────────
# 5. Regenerate all pages
# ──────────────────────────────────────────────────────────────────────────────
print('\nRegenerating all pages...')
result = subprocess.run(['python', 'generate_pages.py'], cwd=BASE, capture_output=True, text=True, encoding='utf-8')
print(result.stdout[-2000:] if len(result.stdout) > 2000 else result.stdout)
if result.returncode != 0:
    print('ERROR:', result.stderr[-500:])
else:
    print('All pages regenerated successfully!')
