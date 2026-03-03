"""
Tactiq Experiences — Sub-page Generator V2
Generates project sub-pages with a 30/70 split layout based on PDF design.
"""

import os, sys, re

sys.stdout.reconfigure(encoding='utf-8')

# Fix for tools/ directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ────────────────────────────────────────────────────────────────
# Page data
# ────────────────────────────────────────────────────────────────
PAGES = [
    # ──── Section 01: Where Creativity Meets Scale ────
    ("our-work/creativity-scale/classic-hyperx.html",
     "Where Creativity Meets Scale", "2025",
     "Classic & HyperX – Telecom Partner Meet",
     "HP Telecom Partner Meet · Mumbai · Bengaluru · Kolkata",
     "A one-day meet across Mumbai, Bengaluru, and Kolkata introduced HP's Classic and HyperX products to key telecom partners through presentations, live demos, and insight sessions. The event saw strong engagement, active networking, positive feedback, and ended with a musical performance, strengthening partner connections.",
     [("Format", "One-day multi-city partner meet"), ("Highlights", "Live demos · Insight sessions · Musical performance · Active networking")]),

    ("our-work/creativity-scale/aim-together.html",
     "Where Creativity Meets Scale", "2025",
     "Aim Together: Pan-India Diwali Celebration",
     "8 Cities · 100+ Partners Each",
     "A festive, residential Diwali meet across 8 cities, engaging 100+ partners in each location. Themed décor, product insights, interactive activities, and partner recognitions created a powerful celebration. From the 'Aim Together' theme to the immersive setup and experience, every element was thoughtfully crafted.",
     [("Scale", "8 cities · 100+ partners per city")]),

    ("our-work/creativity-scale/ai-copilot-launch.html",
     "Where Creativity Meets Scale", "2025",
     "AI Product Launch – Powered by Copilot+ PC",
     "100+ Media Professionals",
     "HP hosted an exclusive launch event introducing its new Copilot PCs to over 100 media professionals. A futuristic thematic entry and photo-op set the tone, followed by interactive demo zones where media experienced the AI-powered Copilot features firsthand.",
     [("Audience", "100+ media professionals")]),

    ("our-work/creativity-scale/ai-windows-launch.html",
     "Where Creativity Meets Scale", "2024",
     "AI Product Launch – Powered by Windows 11 Pro",
     "100+ Media Attendees",
     "The HP AI Product Launch, powered by Windows 11 Pro, brought the theme 'Be Unstoppable – Get Ahead of the Curve' to life. Over 100+ media attendees experienced live demos of the new Copilot+ PCs.",
     [("Theme", '"Be Unstoppable – Get Ahead of the Curve"')]),

    ("our-work/creativity-scale/ai-portfolio-launch.html",
     "Where Creativity Meets Scale", "2024",
     "AI Portfolio Launch – 6 Cities",
     "500+ Attendees · Omen · HyperX · Envy",
     "Showcasing HP's cutting-edge AI-powered lineup across six major cities. The experience drew 500+ engaged attendees, delivering powerful hands-on interactions.",
     [("Scale", "6 major cities · 500+ attendees")]),

    ("our-work/creativity-scale/hp-pc-plus.html",
     "Where Creativity Meets Scale", "2024",
     "HP PC Plus Launch",
     "Plus-Shaped Stage · Media & Partner Engagement",
     "HP unveiled its new PC Plus Series to media and partners through an immersive, one-day experiential showcase featuring interactive tech sessions, hands-on product demos, and a powerful launch reveal.",
     [("Centrepiece", "Distinctive Plus-shaped stage design")]),

    ("our-work/creativity-scale/laserjet-launch.html",
     "Where Creativity Meets Scale", "2023",
     "LaserJet Series – Launch Highlight",
     "3-Day Immersive Event",
     "A 3-day immersive event introduced HP's new LaserJet printer series to key stakeholders, building excitement, innovation awareness, and partner trust.",
     [("Duration", "3-day residential event")]),

    ("our-work/creativity-scale/omen-influencer.html",
     "Where Creativity Meets Scale", "2023",
     "Omen by HP – Influencer Launch Highlight",
     "150+ Influencers · Beat the Heat",
     "A high-energy 'Beat the Heat' launch for 150+ influencers, featuring ice-themed installations, a dramatic ice-break product reveal, and two hands-on zones.",
     [("Audience", "150+ influencers")]),

    ("our-work/creativity-scale/chalo-raushan.html",
     "Where Creativity Meets Scale", "2023",
     "Chalo Raushan Karein – HP Diwali Partner Meet",
     "Pan-India · 8 Cities",
     "A festive Pan-India celebration across 8 cities, uniting HP partners to strengthen relationships and drive business growth.",
     [("Scale", "8 cities across India")]),

    # ──── Section 02: Large-Scale Deployment ────
    ("our-work/large-deployment/inkredible-connect.html",
     "Large-Scale Deployment", "2025",
     "Inkredible Nationwide Partner Connect",
     "10 Cities · HP Supplies Partners",
     "Executed the HP 'Inkredible' Partners Supplies Meet across 10 cities, delivering end-to-end stage & screen setup, registration desk, and structured product display zones.",
     [("Scale", "10-city pan-India rollout")]),

    ("our-work/large-deployment/printposium.html",
     "Large-Scale Deployment", "2024/25",
     "Printposium – Pan-India Print Partner Summit",
     "4-Zone Residential Event",
     "Printposium was a Pan-India residential event for HP print partners, offering engaging sessions, interactive experiences, and a curated venue experience.",
     [("Format", "Residential · Two phases")]),

    ("our-work/large-deployment/south-india-rlfr.html",
     "Large-Scale Deployment", "2025",
     "HP Next Gen AI Laptops – South India RLFR Connect",
     "6-City RLFR Partner Meet",
     "Executed a successful HP Next Gen AI Laptop Introduction for RLFRs across South India, delivering a 6-city RLFR Meet with complete stage setup.",
     [("Coverage", "6 cities across South India")]),

    ("our-work/large-deployment/ignite-together.html",
     "Large-Scale Deployment", "2025",
     "Ignite Together: HP's 16-City ESF Festive Connect",
     "16 Cities · ISP Partners",
     "HP ESF Festive Meets 2025, themed 'Ignite Together,' united ISPs across 16 cities in a high-energy celebration of collaboration.",
     [("Scale", "16 cities, ISP partners")]),

    ("our-work/large-deployment/growthon.html",
     "Large-Scale Deployment", "2023",
     "Growthon – HP Partner Accelerator",
     "Sales Growth Summit · Multi-City",
     "HP's Growthon was a high-energy partner accelerator event designed to drive sales momentum and business growth.",
     [("Type", "Partner accelerator")]),

    ("our-work/large-deployment/fighters.html",
     "Large-Scale Deployment", "2024",
     "Fighters: A Tribute to Target Achievers",
     "HP RSM ZM Meet · Fighter Theme",
     "HP RSM ZM Meet — Fighters — united Regional Sales Managers and Zone Managers to celebrate their resilience and target achievements.",
     [("Meeting", "HP RSM ZM Meet 2024")]),

    ("our-work/large-deployment/omen-playground.html",
     "Large-Scale Deployment", "2023/24",
     "Omen Playground – India's Gaming Retail Expansion",
     "18 Stores · Cosplayers · Ribbon-Cutting",
     "HP launched 18 Omen Playground gaming stores across India in 2024–2025, featuring immersive store decor and cosplayers.",
     [("Scale", "18 gaming store launches")]),

    # ──── Section 03: Brand Partner Engagement ────
    ("our-work/brand-partner/redington-partner.html",
     "Brand Partner Engagement", "2025",
     "Redington Partner Meet 2025",
     "Goa-Themed · 2-Day Offsite",
     "The event strengthened partnerships through a vibrant Goa-themed experience featuring interactive zones and team activities.",
     [("Theme", "Vivid Goa-themed design")]),

    ("our-work/brand-partner/annual-conference.html",
     "Brand Partner Engagement", "2023",
     "Redington Annual Conference 2023",
     "250 Employees · The Lalit Goa",
     "The Redington Annual Conference brought together 250 employees for a two-day offsite at The Lalit, Goa.",
     [("Venue", "The Lalit, Goa")]),

    ("our-work/brand-partner/google-amd-redington.html",
     "Brand Partner Engagement", "2023",
     "Google–AMD–Redington Partner Connect",
     "ITC Narmada · 100 Partners · Ahmedabad",
     "The event showcased the Google–AMD–Redington partnership, highlighting growth opportunities for Ahmedabad partners.",
     [("Venue", "ITC Narmada, Ahmedabad")]),

    # ──── Section 04: On-Ground Impact ────
    ("our-work/on-ground/holi-cheer.html",
     "On-Ground Impact", "2025",
     "Holi Cheer Meets HP Power",
     "Holi-Themed Partner Activation",
     "Ran a Holi-themed activation with promoters and festive branding to engage HP partners.",
     [("Type", "Festive brand activation")]),

    ("our-work/on-ground/ai-pc-pre-diwali.html",
     "On-Ground Impact", "2024",
     "HP AI PC Pre-Diwali Drive",
     "Festive Demo Zone · AI Offers",
     "Engage audience and boost leads with a festive setup and interactive demo zone.",
     [("Setup", "Festive interactive demo zone")]),

    ("our-work/on-ground/diwali-gaming-fest.html",
     "On-Ground Impact", "2024",
     "Diwali Gaming Fest by HP",
     "IT Hub · Maze Game · Gaming Laptops",
     "HP brought festive cheer to the IT hub with Diwali-themed gaming laptop offers.",
     [("Attraction", "Crowd-pulling maze game")]),

    ("our-work/on-ground/ctss-printer-launch.html",
     "On-Ground Impact", "2023",
     "CTSS Printer Pan-India Launch Activation",
     "50+ In-Store Stalls · QR Selfie",
     "A pan-India IT hub activation for HP's new CTSS Printer featured 50+ in-store stalls.",
     [("Scale", "50+ in-store stalls")]),

    ("our-work/on-ground/independence-day.html",
     "On-Ground Impact", "2023",
     "HP Celebrates Independence Day with AI Power",
     "Plinko Game · AI Demos",
     "Celebrate with HP's AI-powered PCs through an engaging festive activation.",
     [("Theme", "Independence Day patriotic branding")]),

    ("our-work/on-ground/ctss-holi-activation.html",
     "On-Ground Impact", "2023",
     "CTSS Printer Pan-India Holi Activation",
     "Dhol · Look-Walkers",
     "HP executed a pan-India Holi market-storming activity for the CTSS printer launch.",
     [("Format", "Market-storming across zones")]),

    ("our-work/on-ground/diwali-ai-tech.html",
     "On-Ground Impact", "2023",
     "HP Lights Up Diwali with AI-Powered Tech",
     "900+ Laptops · ₹4.5 Cr in 2 Days",
     "HP celebrated Diwali with an interactive showcase of AI-enabled laptops.",
     [("Results", "900+ laptops sold · ₹4.5cr revenue")]),

    ("our-work/on-ground/hp-chromebook-srcc.html",
     "On-Ground Impact", "2023",
     "HP × Chromebook @ SRCC Business Conclave",
     "1000+ Students · Dual-Zone",
     "The three-day SRCC Business Conclave drew 1,000+ students to an engaging HP–Google Chromebook stall.",
     [("Audience", "1000+ students")]),

    # ──── Section 05: Exhibition & Retail ────
    ("our-work/exhibition/hyperx-gaming-con.html",
     "Exhibition & Retail", "2024",
     "HyperX Gaming Con Mumbai",
     "High Footfall · Gaming Gear Trials",
     "At Gaming Con Mumbai, the HyperX stall attracted a high footfall with gamers testing the latest gear.",
     [("Engagement", "On-ground contests · Trials")]),

    ("our-work/exhibition/india-craft-week.html",
     "Exhibition & Retail", "2019",
     "India Craft Week @ GMR Aerocity",
     "Social Artisan Showcase",
     "Held at GMR Aerocity, the event showcased India's finest handcrafted traditions.",
     [("Venue", "GMR Aerocity, New Delhi")]),

    ("our-work/exhibition/vedanta-stall.html",
     "Exhibition & Retail", "2018",
     "Vedanta Stall @ Make in Odisha Conclave",
     "Industrial Growth Showcase",
     "Vedanta showcased its growth vision at the Make in Odisha Conclave 2018.",
     [("Client", "Vedanta Limited")]),

    ("our-work/exhibition/zee-jaipur-litfest.html",
     "Exhibition & Retail", "2018",
     "ZEE TV — 'Extraordinary Together' @ Jaipur Lit Fest",
     "11th Jaipur Literature Festival",
     "At the 11th Zee Jaipur Literature Fest, we created a cozy library stall for book lovers.",
     [("Theme", '"Extraordinary Together"')]),

    # ──── Section 06: Pre-Lockdown Legacy ────
    ("pre-lockdown/global-steering-summit.html",
     "Pre-Lockdown Legacy", "2018",
     "Global Steering Group Summit – India's First",
     "150 Speakers · 900 Delegates",
     "Truly a global movement, the 4th edition of the summit was held for the first time ever in India.",
     [("Scale", "150+ speakers · 900 delegates")]),

    ("pre-lockdown/buddha-jayanti.html",
     "Pre-Lockdown Legacy", "2018",
     "Buddha Jayanti – National Museum Sacred Relics",
     "PM Narendra Modi as Chief Guest",
     "PM Narendra Modi paid respects to the sacred Buddha relics at the Indira Gandhi Indoor Stadium.",
     [("Venue", "Indira Gandhi Indoor Stadium")]),

    ("pre-lockdown/gmr-igia-awards.html",
     "Pre-Lockdown Legacy", "2018",
     "GMR IGIA Awards – Grand Gala",
     "Custom Trophy Installation",
     "The IGIA Awards by GMR showcased a grand airport-themed setup with a history-wall tunnel.",
     [("Theme", "Airport-themed setup")]),

    ("pre-lockdown/gmr-hyderabad-rgia.html",
     "Pre-Lockdown Legacy", "2018",
     "Decennial Celebration of GMR Hyderabad RGIA",
     "10-Year Anniversary Celebration",
     "The Decennial Celebration of GMR Hyderabad Rajiv Gandhi International Airport featured a grand, immersive setup.",
     [("Occasion", "10-Year anniversary")]),

    # ──── Section 07: Media & Trailer Rollout ────
    ("media-trailer/escaype-live.html",
     "Media & Trailer Rollout", "2023",
     "Escaype Live – OTT Show Launch",
     "MX Player Original",
     "Executed the launch event for Escaype Live, producing significant media buzz.",
     [("Platform", "MX Player Original")]),

    ("media-trailer/koffee-karan.html",
     "Media & Trailer Rollout", "2022-24",
     "Koffee with Karan – Season 6 & 7",
     "Disney+ Hotstar Iconic Talk Show",
     "Managed trailer and media rollout events for India's most iconic celebrity talk show.",
     [("Show", "Koffee with Karan")]),

    ("media-trailer/the-night-manager.html",
     "Media & Trailer Rollout", "2023",
     "The Night Manager – Series Premiere",
     "Disney+ Hotstar Thriller Series",
     "Executed the premiere and media rollout for the high-stakes thriller adaptation.",
     [("Cast", "Anil Kapoor · Aditya Roy Kapur")]),

    ("media-trailer/sultan-of-delhi.html",
     "Media & Trailer Rollout", "2023",
     "Sultan of Delhi – Series Launch",
     "Disney+ Hotstar Crime Drama",
     "Handled the launch event for the gripping crime drama set in Delhi's underworld.",
     [("Genre", "Crime drama")]),

    ("media-trailer/show-time-karma.html",
     "Media & Trailer Rollout", "2023",
     "Show Time, Karma Calling & More",
     "Multi-Title OTT Launch Events",
     "Managed launch events for multiple high-profile OTT titles featuring trailer reveals.",
     [("Titles", "Show Time · Karma Calling")]),

    ("media-trailer/good-luck-jerry.html",
     "Media & Trailer Rollout", "2022/23",
     "Good Luck Jerry, Gulmohar & Freelancer",
     "Disney+ Hotstar Film & Series",
     "Executed premiere and media launch events for critically acclaimed productions.",
     [("Notable Cast", "Janhvi Kapoor · Manoj Bajpayee")]),

    ("media-trailer/taaza-khabar.html",
     "Media & Trailer Rollout", "2023",
     "Taaza Khabar – OTT Series Launch",
     "Disney+ Hotstar Bhuvan Bam Debut",
     "Executed the launch for Bhuvan Bam's acting debut on Disney+ Hotstar.",
     [("Significance", "Bhuvan Bam's debut series")]),
]

# YouTube Link Mapping
_VIDEO_MAP = {
    "classic-hyperx": "https://youtu.be/Ij6OiRwdVdI",
    "aim-together": "https://youtu.be/_AWrb3no2Nw",
    "ai-copilot-launch": "https://youtu.be/TadbFg01-kM",
    "ai-windows-launch": "https://youtu.be/bRGq-GMPIUg",
    "ai-portfolio-launch": "https://youtu.be/KUzDhMtt6Y4",
    "hp-pc-plus": "https://youtu.be/qYVWRk38fRI",
    "laserjet-launch": "https://youtu.be/fZGj99ygDc4",
    "omen-influencer": "https://youtu.be/UUnQeaH7dW8",
    "the-night-manager": "https://youtu.be/QaZ4auwwzgg",
    "fighters": "https://youtube.com/shorts/FM_0Q_Xq8P8",
    "omen-playground": "https://youtube.com/shorts/ILeHoVgbU_Y",
    "global-steering-summit": "https://youtu.be/7QHQNFcHC3I"
}

def depth(path):
    return "../" * (len(path.split("/")) - 1)

def build_extra_blocks(blocks):
    html = ""
    for title, text in blocks:
        html += f'<div class="content-block"><h3>{title}</h3><p>{text}</p></div>'
    return html

def get_grid_images(rel, out_path):
    # Find images in corresponding folder
    # out_path: our-work/creativity-scale/classic-hyperx.html
    # folder: images/work-showcase/creativity-scale/classic-hyperx/
    parts = out_path.split("/")
    
    if parts[0] == "our-work":
        cat = parts[1]
        slug = os.path.splitext(parts[2])[0]
    else:
        # media-trailer/escaype-live.html or pre-lockdown/...
        cat = parts[0]
        slug = os.path.splitext(parts[1])[0]

    img_dir = os.path.join(BASE_DIR, "images", "work-showcase", cat, slug)
    if not os.path.isdir(img_dir):
        return []
        
    jpegs = [f for f in os.listdir(img_dir) if f.lower().endswith(('.jpeg', '.jpg'))]
    jpegs.sort() # Ensure consistent order
    
    # Map to relative paths
    return [f"{rel}images/work-showcase/{cat}/{slug}/{img}" for img in jpegs]

def build_page(out_path, category, year, title, tag, description, extra_blocks, prev_p, next_p):
    rel = depth(out_path)
    blocks_html = build_extra_blocks(extra_blocks)
    image_slug = os.path.splitext(os.path.basename(out_path))[0]
    video_url = _VIDEO_MAP.get(image_slug, "")
    
    # Image Grid Logic
    grid_imgs = get_grid_images(rel, out_path)
    grid_html = ""
    classes = ["grid-main", "grid-side", "grid-bot-1", "grid-bot-2"]
    
    for i, img in enumerate(grid_imgs[:4]):
        cls = classes[i]
        grid_html += f'<div class="grid-img-wrapper {cls}"><img src="{img}" alt="" loading="lazy"/></div>'

    # Fallback if no images found
    if not grid_html:
        grid_html = '<div class="grid-img-wrapper grid-main" style="grid-column:1/-1;grid-row:1/-1;"><div style="width:100%;height:100%;background:#eee;display:flex;align-items:center;justify-content:center;color:#999;">Photos Coming Soon</div></div>'

    # Nav Buttons
    prev_link = f'<a href="{rel}{prev_p[0]}" class="arrow-btn" title="{prev_p[3]}">❮</a>' if prev_p else '<span class="arrow-btn disabled">❮</span>'
    next_link = f'<a href="{rel}{next_p[0]}" class="arrow-btn" title="{next_p[3]}">❯</a>' if next_p else '<span class="arrow-btn disabled">❯</span>'
    
    video_btn_html = f'<button class="watch-video-btn" data-url="{video_url}"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Watch Video</button>' if video_url else ""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} — Tactiq Experiences</title>
    <meta name="description" content="{description[:160]}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{rel}css/desktop.css" />
    <link rel="stylesheet" media="(max-width: 992px)" href="{rel}css/tablet.css" />
    <link rel="stylesheet" media="(max-width: 768px)" href="{rel}css/mobile.css" />
</head>
<body style="overflow-x:hidden;">

<nav class="navbar">
    <div class="container">
        <div class="nav-flex">
            <div style="display:flex; align-items:center;">
                <a href="{rel}index.html" class="logo">Tactiq<span style="color:var(--text-gold);">.</span></a>
                <div class="nav-arrows">
                    {prev_link}
                    <span class="page-name">{title}</span>
                    {next_link}
                </div>
            </div>
            <div class="nav-links" id="main-nav-links">
                <a href="{rel}our-work/our-work.html">Our Work</a>
                <a href="{rel}index.html#about">About</a>
                <a href="{rel}index.html#contact" class="btn btn-gold-outline">Get in Touch</a>
                <div id="tactiq-menus" style="display:flex; align-items:center; gap:10px; margin-left:15px; position:relative;"></div>
            </div>
        </div>
    </div>
</nav>

<main class="case-study-layout">
    <!-- Sidebar (30%) -->
    <aside class="case-study-sidebar">
        <!-- Logo box removed due to missing assets -->
        
        <h1 class="page-title">{title}</h1>
        
        <div class="eyebrow">{year}</div>

        <p class="page-description">{description}</p>
        
        {blocks_html}
        
        {video_btn_html}
    </aside>

    <!-- Main Grid (70%) -->
    <section class="case-study-main">
        {grid_html}
    </section>
</main>

<div class="video-modal">
    <div class="video-container">
        <button class="close-modal">&times;</button>
        <iframe src="" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
</div>

<script src="{rel}js/vendor/ThemeManager.js"></script>
<script src="{rel}js/script.js"></script>
</body>
</html>
"""

if __name__ == "__main__":
    for i, p in enumerate(PAGES):
        prev_p = PAGES[i-1] if i > 0 else None
        next_p = PAGES[i+1] if i < len(PAGES)-1 else None
        
        out_path, category, year, title, tag, description, extra_blocks = p
        abs_path = os.path.join(BASE_DIR, out_path.replace("/", os.sep))
        os.makedirs(os.path.dirname(abs_path), exist_ok=True)
        
        html = build_page(out_path, category, year, title, tag, description, extra_blocks, prev_p, next_p)
        with open(abs_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  ✓ Processed: {out_path}")

    print(f"\n✅ All {len(PAGES)} pages updated with 70/30 layout.")
