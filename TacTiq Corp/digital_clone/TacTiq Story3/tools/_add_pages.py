"""Add growthon, fighters, omen-playground to generate_pages.py PAGES list."""
with open('generate_pages.py', encoding='utf-8') as f:
    src = f.read()

marker = '    # \u2500\u2500\u2500\u2500 Section 03: Brand Partner Engagement \u2500\u2500\u2500\u2500'
if marker not in src:
    # Try alternate
    marker = '    # \u2500\u2500\u2500\u2500 Section 03'
    print('marker2 found:', marker in src)
else:
    print('marker found OK')

NEW = '''    ("our-work/large-deployment/growthon.html",
     "Large-Scale Deployment of Small Events", "2023",
     "Growthon \u2013 HP Partner Accelerator",
     "Sales Growth Summit \u00b7 Multi-City",
     "HP's Growthon was a high-energy partner accelerator event designed to drive sales momentum and business growth. The event brought together HP partners across multiple cities, featuring business presentations, growth strategy sessions, and celebratory team moments \u2014 reinforcing HP's commitment to partner success.",
     [("Type", "Partner accelerator"), ("Focus", "HP partner ecosystem \u00b7 Sales momentum"), ("Format", "Business sessions \u00b7 Strategy workshops \u00b7 Partner celebration")]),

    ("our-work/large-deployment/fighters.html",
     "Large-Scale Deployment of Small Events", "2024",
     "Fighters: A Tribute to Target Achievers",
     "HP RSM ZM Meet \u00b7 Fighter Theme",
     "HP RSM ZM Meet \u2014 Fighters \u2014 united Regional Sales Managers and Zone Managers from all zones, along with the SLT and key teams, to celebrate their resilience and target achievements. The event featured a fighter-themed stage setup and demo zones, creatively showcasing HP's frontline leaders as the champions driving business success.",
     [("Meeting", "HP RSM ZM Meet 2024"), ("Theme", "Fighter-themed \u2014 celebrating frontline champions"), ("Design", "Fighter-themed stage \u00b7 Product demo zones \u00b7 Recognitions")]),

    ("our-work/large-deployment/omen-playground.html",
     "Large-Scale Deployment of Small Events", "2023/24",
     "Omen Playground \u2013 India's Gaming Retail Expansion",
     "18 Stores \u00b7 Cosplayers \u00b7 Ribbon-Cutting",
     "HP launched 18 Omen Playground gaming stores across India in 2024\u20132025, featuring immersive store decor, ribbon-cutting ceremonies, and cosplayers bringing the gaming world to life. These launches created strong local buzz, enhanced brand visibility, and expanded HP's gaming retail footprint with engaging, hands-on experiences.",
     [("Scale", "18 gaming store launches across India"), ("Theme", "Immersive gaming retail experience"), ("Elements", "Cosplayers \u00b7 Ribbon-cutting \u00b7 Immersive decor \u00b7 Gaming demos")]),

'''

if marker in src:
    src = src.replace(marker, NEW + marker)
    with open('generate_pages.py', 'w', encoding='utf-8') as f:
        f.write(src)
    print('SUCCESS: Added 3 large-deployment entries')
else:
    print('ERROR: Marker not found')
    # Print context around "Brand Partner" 
    idx = src.find('Brand Partner')
    print(repr(src[max(0,idx-120):idx+30]))
