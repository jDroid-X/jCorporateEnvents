import os, sys
sys.stdout.reconfigure(encoding='utf-8')
BASE = r'c:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq\images'

slugs = [
    ('creativity-scale', ['classic-hyperx','aim-together','ai-copilot-launch','ai-windows-launch','ai-portfolio-launch','hp-pc-plus','laserjet-launch','omen-influencer','chalo-raushan']),
    ('large-deployment', ['inkredible-connect','printposium','south-india-rlfr','ignite-together','growthon','fighters','omen-playground']),
    ('brand-partner',    ['redington-partner','annual-conference','google-amd-redington']),
    ('on-ground',        ['holi-cheer','ai-pc-pre-diwali','diwali-gaming-fest','ctss-printer-launch','independence-day','ctss-holi-activation','diwali-ai-tech','hp-chromebook-srcc']),
    ('exhibition',       ['hyperx-gaming-con','india-craft-week','vedanta-stall','zee-jaipur-litfest']),
    ('pre-lockdown',     ['global-steering-summit','buddha-jayanti','gmr-igia-awards','gmr-hyderabad-rgia']),
    ('media-trailer',    ['escaype-live','koffee-karan','sultan-of-delhi','taaza-khabar']),
]

for cat, events in slugs:
    for evt in events:
        folder = os.path.join(BASE, 'work-showcase', cat, evt)
        if not os.path.isdir(folder):
            print(f'NOFOLD {cat}/{evt}')
            continue
        jpegs = sorted([f for f in os.listdir(folder) if f.lower().endswith(('.jpeg','.jpg'))])
        if jpegs:
            print(f'    "{evt}": "images/work-showcase/{cat}/{evt}/{jpegs[0]}",')
        else:
            pngs = sorted([f for f in os.listdir(folder) if f.lower().endswith('.png')])
            first = pngs[0] if pngs else '?'
            print(f'PNG "{evt}": "images/work-showcase/{cat}/{evt}/{first}"')
