"""Patch generate_pages.py IMAGE_MAP with correct verified jpeg filenames."""
import os, sys
sys.stdout.reconfigure(encoding='utf-8')

GEN_PATH = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq\generate_pages.py'

# Exact replacements: old -> new (only the file suffix part that differs)
FIXES = {
    '"aim-together":          "images/work-showcase/creativity-scale/aim-together/event-1.jpeg"':
    '"aim-together":          "images/work-showcase/creativity-scale/aim-together/event-3.jpeg"',

    '"ai-copilot-launch":     "images/work-showcase/creativity-scale/ai-copilot-launch/event-1.jpeg"':
    '"ai-copilot-launch":     "images/work-showcase/creativity-scale/ai-copilot-launch/event-3.jpeg"',

    '"ai-windows-launch":     "images/work-showcase/creativity-scale/ai-windows-launch/event-1.jpeg"':
    '"ai-windows-launch":     "images/work-showcase/creativity-scale/ai-windows-launch/event-3.jpeg"',

    '"ai-portfolio-launch":   "images/work-showcase/creativity-scale/ai-portfolio-launch/event-1.jpeg"':
    '"ai-portfolio-launch":   "images/work-showcase/creativity-scale/ai-portfolio-launch/event-3.jpeg"',

    '"hp-pc-plus":            "images/work-showcase/creativity-scale/hp-pc-plus/event-1.jpeg"':
    '"hp-pc-plus":            "images/work-showcase/creativity-scale/hp-pc-plus/event-3.jpeg"',

    '"laserjet-launch":       "images/work-showcase/creativity-scale/laserjet-launch/event-1.jpeg"':
    '"laserjet-launch":       "images/work-showcase/creativity-scale/laserjet-launch/event-3.jpeg"',

    '"omen-influencer":       "images/work-showcase/creativity-scale/omen-influencer/event-1.jpeg"':
    '"omen-influencer":       "images/work-showcase/creativity-scale/omen-influencer/event-2.jpeg"',

    '"chalo-raushan":         "images/work-showcase/creativity-scale/chalo-raushan/event-1.jpeg"':
    '"chalo-raushan":         "images/work-showcase/creativity-scale/chalo-raushan/event-3.jpeg"',

    '"inkredible-connect":    "images/work-showcase/large-deployment/inkredible-connect/event-1.jpeg"':
    '"inkredible-connect":    "images/work-showcase/large-deployment/inkredible-connect/event-3.jpeg"',

    '"printposium":           "images/work-showcase/large-deployment/printposium/event-1.jpeg"':
    '"printposium":           "images/work-showcase/large-deployment/printposium/event-3.jpeg"',

    '"south-india-rlfr":      "images/work-showcase/large-deployment/south-india-rlfr/event-1.jpeg"':
    '"south-india-rlfr":      "images/work-showcase/large-deployment/south-india-rlfr/event-3.jpeg"',

    '"ignite-together":       "images/work-showcase/large-deployment/ignite-together/event-1.jpeg"':
    '"ignite-together":       "images/work-showcase/large-deployment/ignite-together/event-3.jpeg"',

    '"growthon":              "images/work-showcase/large-deployment/growthon/event-1.jpeg"':
    '"growthon":              "images/work-showcase/large-deployment/growthon/event-3.jpeg"',

    '"fighters":              "images/work-showcase/large-deployment/fighters/event-1.jpeg"':
    '"fighters":              "images/work-showcase/large-deployment/fighters/event-3.jpeg"',

    '"omen-playground":       "images/work-showcase/large-deployment/omen-playground/event-1.jpeg"':
    '"omen-playground":       "images/work-showcase/large-deployment/omen-playground/event-3.jpeg"',

    '"redington-partner":     "images/work-showcase/brand-partner/redington-partner/event-1.jpeg"':
    '"redington-partner":     "images/work-showcase/brand-partner/redington-partner/event-3.jpeg"',

    '"annual-conference":     "images/work-showcase/brand-partner/annual-conference/event-1.jpeg"':
    '"annual-conference":     "images/work-showcase/brand-partner/annual-conference/event-3.jpeg"',

    '"google-amd-redington":  "images/work-showcase/brand-partner/google-amd-redington/event-1.jpeg"':
    '"google-amd-redington":  "images/work-showcase/brand-partner/google-amd-redington/event-3.jpeg"',

    '"holi-cheer":            "images/work-showcase/on-ground/holi-cheer/event-1.jpeg"':
    '"holi-cheer":            "images/work-showcase/on-ground/holi-cheer/event-2.jpeg"',

    '"ai-pc-pre-diwali":      "images/work-showcase/on-ground/ai-pc-pre-diwali/event-1.jpeg"':
    '"ai-pc-pre-diwali":      "images/work-showcase/on-ground/ai-pc-pre-diwali/event-3.jpeg"',

    '"diwali-gaming-fest":    "images/work-showcase/on-ground/diwali-gaming-fest/event-1.jpeg"':
    '"diwali-gaming-fest":    "images/work-showcase/on-ground/diwali-gaming-fest/event-2.jpeg"',

    '"ctss-printer-launch":   "images/work-showcase/on-ground/ctss-printer-launch/event-1.jpeg"':
    '"ctss-printer-launch":   "images/work-showcase/on-ground/ctss-printer-launch/event-2.jpeg"',

    '"independence-day":      "images/work-showcase/on-ground/independence-day/event-3.jpeg"':
    '"independence-day":      "images/work-showcase/on-ground/independence-day/event-3.jpeg"',  # already correct

    '"ctss-holi-activation":  "images/work-showcase/on-ground/ctss-holi-activation/event-1.jpeg"':
    '"ctss-holi-activation":  "images/work-showcase/on-ground/ctss-holi-activation/event-2.jpeg"',

    '"diwali-ai-tech":        "images/work-showcase/on-ground/diwali-ai-tech/event-1.jpeg"':
    '"diwali-ai-tech":        "images/work-showcase/on-ground/diwali-ai-tech/event-2.jpeg"',

    '"hp-chromebook-srcc":    "images/work-showcase/on-ground/hp-chromebook-srcc/event-1.jpeg"':
    '"hp-chromebook-srcc":    "images/work-showcase/on-ground/hp-chromebook-srcc/event-2.jpeg"',

    '"hyperx-gaming-con":     "images/work-showcase/exhibition/hyperx-gaming-con/event-1.jpeg"':
    '"hyperx-gaming-con":     "images/work-showcase/exhibition/hyperx-gaming-con/event-2.jpeg"',

    '"india-craft-week":      "images/work-showcase/exhibition/india-craft-week/event-1.jpeg"':
    '"india-craft-week":      "images/work-showcase/exhibition/india-craft-week/event-2.jpeg"',

    '"vedanta-stall":         "images/work-showcase/exhibition/vedanta-stall/event-1.jpeg"':
    '"vedanta-stall":         "images/work-showcase/exhibition/vedanta-stall/event-10.jpeg"',

    '"zee-jaipur-litfest":    "images/work-showcase/exhibition/zee-jaipur-litfest/event-1.jpeg"':
    '"zee-jaipur-litfest":    "images/work-showcase/exhibition/zee-jaipur-litfest/event-2.jpeg"',

    '"global-steering-summit":"images/work-showcase/pre-lockdown/global-steering-summit/event-1.jpeg"':
    '"global-steering-summit":"images/work-showcase/pre-lockdown/global-steering-summit/event-2.jpeg"',

    '"buddha-jayanti":        "images/work-showcase/pre-lockdown/buddha-jayanti/event-1.jpeg"':
    '"buddha-jayanti":        "images/work-showcase/pre-lockdown/buddha-jayanti/event-2.jpeg"',

    '"gmr-igia-awards":       "images/work-showcase/pre-lockdown/gmr-igia-awards/event-1.jpeg"':
    '"gmr-igia-awards":       "images/work-showcase/pre-lockdown/gmr-igia-awards/event-2.jpeg"',

    '"gmr-hyderabad-rgia":    "images/work-showcase/pre-lockdown/gmr-hyderabad-rgia/event-1.jpeg"':
    '"gmr-hyderabad-rgia":    "images/work-showcase/pre-lockdown/gmr-hyderabad-rgia/event-3.jpeg"',

    '"escaype-live":          "images/work-showcase/media-trailer/escaype-live/event-1.jpeg"':
    '"escaype-live":          "images/work-showcase/media-trailer/escaype-live/event-2.jpeg"',

    '"koffee-karan":          "images/work-showcase/media-trailer/koffee-karan/event-1.jpeg"':
    '"koffee-karan":          "images/work-showcase/media-trailer/koffee-karan/event-2.jpeg"',

    '"sultan-of-delhi":       "images/work-showcase/media-trailer/sultan-of-delhi/event-1.jpeg"':
    '"sultan-of-delhi":       "images/work-showcase/media-trailer/sultan-of-delhi/event-2.jpeg"',

    '"taaza-khabar":          "images/work-showcase/media-trailer/taaza-khabar/event-1.jpeg"':
    '"taaza-khabar":          "images/work-showcase/media-trailer/taaza-khabar/event-3.jpeg"',
}

with open(GEN_PATH, encoding='utf-8') as f:
    src = f.read()

fixed = 0
for old, new in FIXES.items():
    if old in src:
        src = src.replace(old, new)
        fixed += 1

with open(GEN_PATH, 'w', encoding='utf-8') as f:
    f.write(src)

print(f"Patched {fixed} image paths in generate_pages.py")

# Also update our-work.html work tile images (alias .png files at category level)
import re

OUR_WORK = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq\our-work\our-work.html'
with open(OUR_WORK, encoding='utf-8') as f:
    html = f.read()

# The alias png files are like: ../images/work-showcase/creativity-scale/classic-hyperx.png
# They were created by extract_images.py — we just need to inject <img> into the work-tile-bg divs
# Find empty work-tile-bg divs and inject the corresponding alias image

ALIAS_MAP = {
    'classic-hyperx':        '../images/work-showcase/creativity-scale/classic-hyperx.png',
    'aim-together':          '../images/work-showcase/creativity-scale/aim-together.png',
    'ai-copilot-launch':     '../images/work-showcase/creativity-scale/ai-copilot-launch.png',
    'ai-windows-launch':     '../images/work-showcase/creativity-scale/ai-windows-launch.png',
    'ai-portfolio-launch':   '../images/work-showcase/creativity-scale/ai-portfolio-launch.png',
    'hp-pc-plus':            '../images/work-showcase/creativity-scale/hp-pc-plus.png',
    'laserjet-launch':       '../images/work-showcase/creativity-scale/laserjet-launch.png',
    'omen-influencer':       '../images/work-showcase/creativity-scale/omen-influencer.png',
    'chalo-raushan':         '../images/work-showcase/creativity-scale/chalo-raushan.png',
    'inkredible-connect':    '../images/work-showcase/large-deployment/inkredible-connect.png',
    'printposium':           '../images/work-showcase/large-deployment/printposium.png',
    'south-india-rlfr':      '../images/work-showcase/large-deployment/south-india-rlfr.png',
    'ignite-together':       '../images/work-showcase/large-deployment/ignite-together.png',
    'redington-partner':     '../images/work-showcase/brand-partner/redington-partner.png',
    'annual-conference':     '../images/work-showcase/brand-partner/annual-conference.png',
    'google-amd-redington':  '../images/work-showcase/brand-partner/google-amd-redington.png',
    'holi-cheer':            '../images/work-showcase/on-ground/holi-cheer.png',
    'ai-pc-pre-diwali':      '../images/work-showcase/on-ground/ai-pc-pre-diwali.png',
    'diwali-gaming-fest':    '../images/work-showcase/on-ground/diwali-gaming-fest.png',
    'ctss-printer-launch':   '../images/work-showcase/on-ground/ctss-printer-launch.png',
    'independence-day':      '../images/work-showcase/on-ground/independence-day.png',
    'ctss-holi-activation':  '../images/work-showcase/on-ground/ctss-holi-activation.png',
    'diwali-ai-tech':        '../images/work-showcase/on-ground/diwali-ai-tech.png',
    'hp-chromebook-srcc':    '../images/work-showcase/on-ground/hp-chromebook-srcc.png',
    'hyperx-gaming-con':     '../images/work-showcase/exhibition/hyperx-gaming-con.png',
    'india-craft-week':      '../images/work-showcase/exhibition/india-craft-week.png',
    'vedanta-stall':         '../images/work-showcase/exhibition/vedanta-stall.png',
    'zee-jaipur-litfest':    '../images/work-showcase/exhibition/zee-jaipur-litfest.png',
    'global-steering-summit':'../images/work-showcase/pre-lockdown/global-steering-summit.png',
    'buddha-jayanti':        '../images/work-showcase/pre-lockdown/buddha-jayanti.png',
    'gmr-igia-awards':       '../images/work-showcase/pre-lockdown/gmr-igia-awards.png',
    'gmr-hyderabad-rgia':    '../images/work-showcase/pre-lockdown/gmr-hyderabad-rgia.png',
    'escaype-live':          '../images/work-showcase/media-trailer/escaype-live.png',
    'koffee-karan':          '../images/work-showcase/media-trailer/koffee-karan.png',
    'sultan-of-delhi':       '../images/work-showcase/media-trailer/sultan-of-delhi.png',
    'taaza-khabar':          '../images/work-showcase/media-trailer/taaza-khabar.png',
}

ow_patched = 0
for slug, img_path in ALIAS_MAP.items():
    # Replace empty work-tile-bg div with one containing an img tag
    old_bg = '<div class="work-tile-bg"></div>'
    new_bg = (f'<div class="work-tile-bg">'
              f'<img src="{img_path}" alt="" loading="lazy" '
              f'onerror="this.style.display=\'none\'" /></div>')
    # Only replace the FIRST occurrence after the link containing this slug
    slug_pos = html.find(f'/{slug}.html"')
    if slug_pos != -1:
        # find the next work-tile-bg after slug_pos
        bg_pos = html.find(old_bg, slug_pos)
        if bg_pos != -1 and bg_pos < slug_pos + 500:
            html = html[:bg_pos] + new_bg + html[bg_pos + len(old_bg):]
            ow_patched += 1

with open(OUR_WORK, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"our-work.html: {ow_patched} tile images injected")

# Update index.html hero + reach backgrounds inline
INDEX = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq\index.html'
with open(INDEX, encoding='utf-8') as f:
    idx = f.read()

# Hero: use the who-we-are-2.jpeg (a good content photo from the PDF intro pages)
HERO_IMG  = 'images/home/who-we-are-2.jpeg'
REACH_IMG = 'images/home/pan-india-reach-3.png'

# Check if already has inline style on hero-tactiq
if 'class="hero-tactiq"' in idx and 'style=' not in idx.split('class="hero-tactiq"')[1][:50]:
    old_hero = '<header class="hero-tactiq" id="hero">'
    new_hero = (f'<header class="hero-tactiq" id="hero" '
                f'style="background-image: radial-gradient(ellipse at 70% 40%, '
                f'rgba(13,13,13,0.82) 0%, rgba(13,13,13,0.97) 80%), url(\'{HERO_IMG}\');">')
    if old_hero in idx:
        idx = idx.replace(old_hero, new_hero)
        print("index.html: hero background updated")

if 'class="reach-section"' in idx and 'style=' not in idx.split('class="reach-section"')[1][:80]:
    old_reach = '<section class="reach-section" id="reach">'
    new_reach = (f'<section class="reach-section" id="reach" '
                 f'style="background-image: linear-gradient(rgba(0,0,0,0.72),rgba(0,0,0,0.72)), '
                 f'url(\'{REACH_IMG}\');">')
    if old_reach in idx:
        idx = idx.replace(old_reach, new_reach)
        print("index.html: reach section background updated")

with open(INDEX, 'w', encoding='utf-8') as f:
    f.write(idx)

print("\nAll done! Now run: python generate_pages.py")
