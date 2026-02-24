"""
Tactiq Experiences — Sub-page Generator
Generates all ~35 project sub-pages using a split-view HTML template.
Run from the Tactiq/ root directory.
"""

import os, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ────────────────────────────────────────────────────────────────
# Page data: (output_path, category_label, year, title, tag, description, extra_blocks)
# ────────────────────────────────────────────────────────────────
PAGES = [
    # ──── Section 01: Where Creativity Meets Scale ────
    ("our-work/creativity-scale/classic-hyperx.html",
     "Where Creativity Meets Scale", "2025",
     "Classic &amp; HyperX – Telecom Partner Meet",
     "Mumbai · Bengaluru · Kolkata",
     "A one-day meet across Mumbai, Bengaluru, and Kolkata introduced HP's Classic and HyperX products to key telecom partners through presentations, live demos, and insight sessions. The event saw strong engagement, active networking, positive feedback, and ended with a musical performance, strengthening partner connections.",
     [("Event Format", "One-day multi-city partner meet"), ("Key Highlights", "Live product demos · Insight sessions · Musical performance · Active networking"), ("Outcome", "Strong partner engagement, positive feedback across all 3 cities")]),

    ("our-work/creativity-scale/aim-together.html",
     "Where Creativity Meets Scale", "2025",
     "Aim Together: Pan-India Diwali Celebration",
     "8 Cities · 100+ Partners Each",
     "A festive, residential Diwali meet across 8 cities, engaging 100+ partners in each location. Themed décor, product insights, interactive activities, and partner recognitions created a powerful celebration. From the 'Aim Together' theme to the immersive setup and experience, every element was thoughtfully crafted—earning appreciation from partners and the HP team alike.",
     [("Scale", "8 cities · 100+ partners per city"), ("Experience", "Themed décor · Interactive activities · Partner recognitions"), ("Platform", "Residential meet format with immersive setups")]),

    ("our-work/creativity-scale/ai-copilot-launch.html",
     "Where Creativity Meets Scale", "2025",
     "AI Product Launch – Powered by Copilot+ PC",
     "100+ Media Professionals",
     "HP hosted an exclusive launch event introducing its new Copilot PCs to over 100 media professionals. A futuristic thematic entry and photo-op set the tone, followed by interactive demo zones where media experienced the AI-powered Copilot features firsthand. The showcase offered live demonstrations, expert walk-throughs, and hands-on exploration of HP's latest AI PC innovations, making it a successful, high-impact media launch.",
     [("Audience", "100+ media professionals"), ("Theme", "Futuristic thematic entry · AI demo zones"), ("Key Feature", "Live Copilot+ PC demonstrations · Expert walk-throughs")]),

    ("our-work/creativity-scale/ai-windows-launch.html",
     "Where Creativity Meets Scale", "2024",
     "AI Product Launch – Powered by Windows 11 Pro",
     "100+ Media Attendees",
     "The HP AI Product Launch, powered by Windows 11 Pro, brought the theme 'Be Unstoppable – Get Ahead of the Curve' to life. Over 100+ media attendees experienced live demos of the new Copilot+ PCs, exploring Windows 11 AI features, enhanced performance, and the future of intelligent computing.",
     [("Theme", '"Be Unstoppable – Get Ahead of the Curve"'), ("Audience", "100+ Media Attendees"), ("Showcase", "Copilot+ PCs · Windows 11 AI features · Enhanced performance demo")]),

    ("our-work/creativity-scale/ai-portfolio-launch.html",
     "Where Creativity Meets Scale", "2024",
     "AI Portfolio Launch – 6 Cities",
     "500+ Attendees · Omen · HyperX · Envy",
     "Showcasing HP's cutting-edge AI-powered lineup—including the Omen Transcend 14, the HyperX ecosystem, and the Envy x360 14 with Microsoft Copilot—across six major cities. The experience drew 500+ engaged attendees, delivering powerful hands-on interactions and marking a bold step into the future of gaming and creator-focused AI technology.",
     [("Scale", "6 major cities · 500+ engaged attendees"), ("Products Showcased", "Omen Transcend 14 · HyperX Ecosystem · Envy x360 14"), ("Highlight", "Hands-on AI interactions · Gaming &amp; creator technology showcase")]),

    ("our-work/creativity-scale/hp-pc-plus.html",
     "Where Creativity Meets Scale", "2024",
     "HP PC Plus Launch",
     "Plus-Shaped Stage · Media &amp; Partner Engagement",
     "HP unveiled its new PC Plus Series to media and partners through an immersive, one-day experiential showcase featuring interactive tech sessions, hands-on product demos, and a powerful launch reveal. A striking Plus-shaped stage, high-energy performances, and deep partner and media engagement made the event a memorable and impactful celebration of HP's upgraded next-gen PC lineup.",
     [("Centrepiece", "Distinctive Plus-shaped stage design"), ("Format", "Interactive tech sessions · Hands-on demos · Launch reveal"), ("Outcome", "High media and partner engagement · Memorable brand moment")]),

    ("our-work/creativity-scale/laserjet-launch.html",
     "Where Creativity Meets Scale", "2023",
     "LaserJet Series – Launch Highlight",
     "3-Day Immersive Event",
     "A 3-day immersive event introduced HP's new LaserJet printer series to key stakeholders, building excitement, innovation awareness, and partner trust. The experience featured interactive sessions, product demos, impactful keynotes, a dynamic stage reveal, hands-on printer engagement, and vibrant entertainment like the Tron dance, leaving a strong and lasting impression.",
     [("Duration", "3-day residential event"), ("Entertainment", "Tron dance performance · Dynamic stage reveal"), ("Impact", "Partner trust built · Innovation awareness · Lasting impression")]),

    ("our-work/creativity-scale/omen-influencer.html",
     "Where Creativity Meets Scale", "2023",
     "Omen by HP – Influencer Launch Highlight",
     "150+ Influencers · Beat the Heat",
     "A high-energy 'Beat the Heat' launch for 150+ influencers, featuring ice-themed installations, a dramatic ice-break product reveal, and two hands-on zones — Gamer's Zone and Product Display Zone — delivering powerful engagement and standout visibility.",
     [("Audience", "150+ influencers"), ("Theme", '"Beat the Heat" with ice installations'), ("Zones", "Gamer's Zone · Product Display Zone"), ("Reveal", "Dramatic ice-break product reveal")]),

    ("our-work/creativity-scale/chalo-raushan.html",
     "Where Creativity Meets Scale", "2023",
     "Chalo Raushan Karein – HP Diwali Partner Meet",
     "Pan-India · 8 Cities",
     "A festive Pan-India celebration across 8 cities, uniting HP partners to strengthen relationships and drive business growth. The meet featured bold Diwali décor, interactive partner zones, and curated entertainment, supported by seamless event production with stage, registration, and photo-op setups. The vibrant Chalo Raushan Karein theme and illuminated Diwali elements created a mesmerizing, high-impact experience admired by all partners.",
     [("Scale", "8 cities across India"), ("Design", "Bold Diwali décor · Illuminated installations · Interactive zones"), ("Outcome", "Stronger partner relationships · Business growth conversations")]),

    # ──── Section 02: Large-Scale Deployment ────
    ("our-work/large-deployment/inkredible-connect.html",
     "Large-Scale Deployment of Small Events", "2025",
     "Inkredible Nationwide Partner Connect",
     "10 Cities · HP Supplies Partners",
     "Executed the HP 'Inkredible' Partners Supplies Meet across 10 cities, delivering end-to-end stage &amp; screen setup, registration desk, and structured product display zones. Engaged Tier 1 &amp; Tier 2 HP Supplies Partners with insightful toner &amp; ink knowledge sessions, supported by HP-branded giveaways that boosted brand recall and partner satisfaction.",
     [("Scale", "10-city pan-India rollout"), ("Audience", "Tier 1 &amp; Tier 2 HP Supplies Partners"), ("Activities", "Knowledge sessions · Product display zones · HP-branded giveaways")]),

    ("our-work/large-deployment/printposium.html",
     "Large-Scale Deployment of Small Events", "2024/25",
     "Printposium – Pan-India Print Partner Summit",
     "4-Zone Residential Event",
     "Printposium was a Pan-India residential event for HP print partners, executed in two phases: North &amp; West zones in Phase 1, East &amp; South zones in Phase 2. The event offered engaging sessions, interactive experiences, and a curated venue experience, fostering stronger partnerships, knowledge sharing, and business growth.",
     [("Format", "Residential · Two phases"), ("Zones", "Phase 1: North &amp; West · Phase 2: East &amp; South"), ("Purpose", "Knowledge sharing · Business growth · Stronger partnerships")]),

    ("our-work/large-deployment/south-india-rlfr.html",
     "Large-Scale Deployment of Small Events", "2025",
     "HP Next Gen AI Laptops – South India RLFR Connect",
     "6-City RLFR Partner Meet",
     "Executed a successful HP Next Gen AI Laptop Introduction for RLFRs across South India, delivering a 6-city RLFR Meet with complete stage setup, registration desk, and immersive product display zones. The experience was elevated through impactful HP-branded giveaways, ensuring high recall and stronger engagement. The platform united RLFR partners for key business discussions, sales growth strategies, and meaningful networking.",
     [("Coverage", "6 cities across South India"), ("Setup", "Stage · Registration desk · Immersive product display zones"), ("Goals", "Sales growth strategy · Business discussions · Partner networking")]),

    ("our-work/large-deployment/ignite-together.html",
     "Large-Scale Deployment of Small Events", "2025",
     "Ignite Together: HP's 16-City ESF Festive Connect",
     "16 Cities · ISP Partners",
     "HP ESF Festive Meets 2025, themed 'Ignite Together,' united ISPs across 16 cities in a high-energy celebration of collaboration, festive spirit, and business growth. The meets featured insightful PC &amp; Print presentations, ending each evening with a celebratory dinner and team photo, reinforcing partnership and shared success.",
     [("Scale", "16 cities, ISP partners"), ("Theme", '"Ignite Together" — festive collaboration'), ("Format", "Presentations · Festive dinner · Team photo · Partner celebrate")]),

    ("our-work/large-deployment/growthon.html",
     "Large-Scale Deployment of Small Events", "2023",
     "Growthon – HP Partner Accelerator",
     "Sales Growth Summit · Multi-City",
     "HP's Growthon was a high-energy partner accelerator event designed to drive sales momentum and business growth. The event brought together HP partners across multiple cities, featuring business presentations, growth strategy sessions, and celebratory team moments — reinforcing HP's commitment to partner success.",
     [("Type", "Partner accelerator"), ("Focus", "HP partner ecosystem · Sales momentum"), ("Format", "Business sessions · Strategy workshops · Partner celebration")]),

    ("our-work/large-deployment/fighters.html",
     "Large-Scale Deployment of Small Events", "2024",
     "Fighters: A Tribute to Target Achievers",
     "HP RSM ZM Meet · Fighter Theme",
     "HP RSM ZM Meet — Fighters — united Regional Sales Managers and Zone Managers from all zones, along with the SLT and key teams, to celebrate their resilience and target achievements. The event featured a fighter-themed stage setup and demo zones, creatively showcasing HP's frontline leaders as the champions driving business success.",
     [("Meeting", "HP RSM ZM Meet 2024"), ("Theme", "Fighter-themed — celebrating frontline champions"), ("Design", "Fighter-themed stage · Product demo zones · Recognitions")]),

    ("our-work/large-deployment/omen-playground.html",
     "Large-Scale Deployment of Small Events", "2023/24",
     "Omen Playground – India's Gaming Retail Expansion",
     "18 Stores · Cosplayers · Ribbon-Cutting",
     "HP launched 18 Omen Playground gaming stores across India in 2024–2025, featuring immersive store decor, ribbon-cutting ceremonies, and cosplayers bringing the gaming world to life. These launches created strong local buzz, enhanced brand visibility, and expanded HP's gaming retail footprint with engaging, hands-on experiences.",
     [("Scale", "18 gaming store launches across India"), ("Theme", "Immersive gaming retail experience"), ("Elements", "Cosplayers · Ribbon-cutting · Immersive decor · Gaming demos")]),

    # ──── Section 03: Brand Partner Engagement ────
    ("our-work/brand-partner/redington-partner.html",
     "Brand Partner Engagement Highlights", "2025",
     "Redington Partner Meet 2025",
     "Goa-Themed · 2-Day Offsite",
     "The event strengthened partnerships through a vibrant Goa-themed experience featuring interactive zones and team activities. Over two days, themed setups, photo-ops, and engaging team-building boosted collaboration and left a memorable impact.",
     [("Theme", "Vivid Goa-themed design"), ("Duration", "2-Day offsite event"), ("Highlights", "Interactive zones · Photo-ops · Team-building activities")]),

    ("our-work/brand-partner/annual-conference.html",
     "Brand Partner Engagement Highlights", "2023",
     "Redington Annual Conference 2023",
     "250 Employees · The Lalit Goa",
     "The Redington Annual Conference brought together 250 employees for a two-day offsite at The Lalit, Goa, with seamless travel, check-ins, conferences, team-building, and awards. The meet celebrated yearly achievements and boosted motivation, ending with a high-energy gala night featuring Neeraj Shridhar and a Goan band, leaving every participant refreshed and valued.",
     [("Venue", "The Lalit, Goa"), ("Attendance", "250 employees"), ("Gala Night", "Neeraj Shridhar performance · Goan band · Awards ceremony")]),

    ("our-work/brand-partner/google-amd-redington.html",
     "Brand Partner Engagement Highlights", "2023",
     "Google–AMD–Redington Partner Connect",
     "ITC Narmada · 100 Partners · Ahmedabad",
     "The event showcased the Google–AMD–Redington partnership, highlighting growth opportunities for Ahmedabad partners and reinforcing their role in digital transformation. Held at ITC Narmada with 100 partners, it featured impactful presentations, interactive segments, and a premium setup, ending with a live band that made the experience memorable.",
     [("Venue", "ITC Narmada, Ahmedabad"), ("Attendance", "100 partners"), ("Highlight", "Impactful presentations · Interactive segments · Live band performance")]),

    # ──── Section 04: On-Ground Impact ────
    ("our-work/on-ground/holi-cheer.html",
     "On-Ground Impact", "2025",
     "Holi Cheer Meets HP Power",
     "Holi-Themed Partner Activation",
     "Ran a Holi-themed activation with promoters and festive branding to engage HP partners, strengthen relationships, and drive sales at partner outlets.",
     [("Type", "Festive brand activation"), ("Theme", "Holi-themed with vibrant branding"), ("Goal", "Partner engagement · Sales drive · Brand strengthening")]),

    ("our-work/on-ground/ai-pc-pre-diwali.html",
     "On-Ground Impact", "2024",
     "HP AI PC Pre-Diwali Drive",
     "Festive Demo Zone · AI Offers",
     "Engage the right audience and boost leads, footfall, and sales with a festive setup, interactive demo zone, and targeted outreach. Promoters drive interest through leaflets, product insights, and AI-powered offers—ensuring strong customer connect and conversions.",
     [("Setup", "Festive interactive demo zone"), ("Tools", "Leaflets · Product insight sessions · AI-powered offer showcases"), ("Target", "Footfall boost · Lead generation · Sales conversions")]),

    ("our-work/on-ground/diwali-gaming-fest.html",
     "On-Ground Impact", "2024",
     "Diwali Gaming Fest by HP",
     "IT Hub · Maze Game · Gaming Laptops",
     "HP brought festive cheer to the IT hub with Diwali-themed gaming laptop offers and an interactive tech experience. A vibrant setup and a crowd-pulling maze game boosted footfall, generated strong leads, and drove weekend gaming laptop sales.",
     [("Venue", "IT hub location"), ("Attraction", "Crowd-pulling maze game"), ("Outcome", "Strong footfall · Lead generation · Gaming laptop sales boost")]),

    ("our-work/on-ground/ctss-printer-launch.html",
     "On-Ground Impact", "2023",
     "CTSS Printer Pan-India Launch Activation",
     "50+ In-Store Stalls · QR Selfie",
     "A pan-India IT hub activation for HP's new CTSS Printer featured 50+ in-store stalls, QR selfie engagement, hashtags, and giveaways to drive leads and social buzz. With streamlined setup, trained manpower, and daily reporting, the campaign delivered high visibility and strong customer engagement for the launch.",
     [("Scale", "50+ in-store stalls across India"), ("Engagement Tools", "QR selfie · Hashtags · Giveaways"), ("Operations", "Trained manpower · Daily reporting · Streamlined logistics")]),

    ("our-work/on-ground/independence-day.html",
     "On-Ground Impact", "2023",
     "HP Celebrates Independence Day with AI Power",
     "Plinko Game · AI Demos · Festive Setup",
     "Celebrate with HP's AI-powered PCs through an engaging festive activation featuring a thematic offer-led backdrop, a high-energy Plinko game to draw crowds, and hands-on AI demos by promoters—driving strong footfall, interaction, and sales.",
     [("Theme", "Independence Day patriotic branding"), ("Crowd Draw", "High-energy Plinko game"), ("Activation", "Hands-on AI demos · Offer-led backdrop · Promoter engagement")]),

    ("our-work/on-ground/ctss-holi-activation.html",
     "On-Ground Impact", "2023",
     "CTSS Printer Pan-India Holi Activation",
     "Dhol · Look-Walkers · Partner Connect",
     "HP executed a pan-India Holi market-storming activity for the CTSS printer launch, where the team and partners visited stores across zones, exchanged Holi greetings, and created festive engagement with dhol, look-walkers, and traditional welcomes. Gifts and photos added to the celebration, ensuring strong partner connect and high product visibility.",
     [("Format", "Market-storming across zones"), ("Festive Elements", "Dhol · Look-walkers · Traditional welcomes · Holi gifts"), ("Outcome", "Strong partner connect · High product visibility")]),

    ("our-work/on-ground/diwali-ai-tech.html",
     "On-Ground Impact", "2023",
     "HP Lights Up Diwali with AI-Powered Tech",
     "900+ Laptops · ₹4.5 Cr in 2 Days",
     "HP celebrated Diwali with an interactive showcase of AI-enabled laptops, featuring exclusive festive offers and exchange deals. A vibrant setup and engaging maze game drew strong footfall, leading to impressive results—over 900 laptops sold, generating ₹4.5 crore in just two days.",
     [("Setup", "Interactive AI laptop showcase · Maze game"), ("Offers", "Exclusive festive offers · Exchange deals"), ("Results", "900+ laptops sold · ₹4.5 crore revenue in 2 days")]),

    ("our-work/on-ground/hp-chromebook-srcc.html",
     "On-Ground Impact", "2023",
     "HP × Chromebook @ SRCC Business Conclave",
     "1000+ Students · Dual-Zone · Reel Contest",
     "The three-day SRCC Business Conclave drew 1,000+ students to an engaging HP–Google Chromebook stall featuring interactive demos and contests. Students created reels at the booth, and a Chromebook was awarded to the reel with the highest likes. The dual-zone setup showcased HP products and Google Chromebooks, giving students a fun, hands-on tech experience.",
     [("Event", "SRCC Business Conclave · 3-day"), ("Audience", "1000+ students"), ("Highlight", "Reel contest · Chromebook prize · Dual-zone HP &amp; Google showcase")]),

    # ──── Section 05: Exhibition & Retail ────
    ("our-work/exhibition/hyperx-gaming-con.html",
     "Exhibition &amp; Retail — End to End", "2024",
     "HyperX Gaming Con Mumbai",
     "High Footfall · Gaming Gear Trials",
     "At Gaming Con Mumbai, the HyperX stall attracted a high footfall with gamers testing the latest gear. On-ground contests energized the crowd, rewarding top players with HyperX accessories. The immersive gaming zone showcased headsets, keyboards, and mice, offering hands-on trials and keeping the stall buzzing all day.",
     [("Venue", "Gaming Con Mumbai"), ("Products", "Headsets · Keyboards · Mice"), ("Engagement", "On-ground contests · Top player rewards · Hands-on trials")]),

    ("our-work/exhibition/india-craft-week.html",
     "Exhibition &amp; Retail — End to End", "2019",
     "India Craft Week @ GMR Aerocity",
     "4–8 December · Artisan Showcase · Craft Village",
     "Held from 4–8 December at GMR Aerocity, the event showcased India's finest handcrafted traditions on a modern platform. Organized by Craft Village, it brought together artisans, designers and craft brands with live demos, rare art forms, curated workshops and sustainable handcrafted products—celebrating luxury craft while connecting traditional skills to contemporary markets.",
     [("Venue", "GMR Aerocity, New Delhi"), ("Duration", "4–8 December 2019"), ("Highlights", "Live art demos · Rare craft forms · Curated workshops · Sustainable products")]),

    ("our-work/exhibition/vedanta-stall.html",
     "Exhibition &amp; Retail — End to End", "2018",
     "Vedanta Stall @ Make in Odisha Conclave",
     "Industrial Growth · Alumina &amp; Metals",
     "Vedanta showcased its growth vision at the Make in Odisha Conclave 2018, highlighting major investments in alumina and metals. The stall presented Vedanta's commitment to Odisha's industrial development, reinforcing its role as a key contributor to the state's manufacturing and mining ecosystem.",
     [("Client", "Vedanta Limited"), ("Conclave", "Make in Odisha 2018"), ("Showcase", "Investment vision · Alumina &amp; metals sector · Industrial development story")]),

    ("our-work/exhibition/zee-jaipur-litfest.html",
     "Exhibition &amp; Retail — End to End", "2018",
     "ZEE TV — 'Extraordinary Together' @ Jaipur Lit Fest",
     "11th Zee Jaipur Literature Festival · Cozy Library Stall",
     "At the 11th Zee Jaipur Literature Fest, we created a cozy 10x10 stall with a library, reading lamps, and bean bags, letting book lovers enjoy their favourite reads with coffee. Interactive photo ops reflected Zee's theme, 'Extraordinary Together.'",
     [("Stall Design", "10x10 · Library setup · Reading lamps · Bean bags"), ("Theme", '"Extraordinary Together" — ZEE brand identity'), ("Engagement", "Interactive photo ops · Coffee &amp; book experience")]),

    # ──── Pre-Lockdown Legacy (2018) ────
    ("pre-lockdown/global-steering-summit.html",
     "Pre-Lockdown Legacy", "2018",
     "Global Steering Group Summit – India's First",
     "150 Speakers · 900 Delegates · 22 Countries",
     "Truly a global movement, the 4th edition of the summit, held for the first time ever in India, gave a platform to more than 150 Impact speakers, 900 Delegates, and esteemed representatives from over 22 countries to address societal challenges to make the world a better place.",
     [("Edition", "4th Global Steering Group Summit"), ("Scale", "150+ speakers · 900 delegates · 22 countries"), ("Significance", "First-ever India hosting of this global forum")]),

    ("pre-lockdown/buddha-jayanti.html",
     "Pre-Lockdown Legacy", "2018",
     "Buddha Jayanti – National Museum Sacred Relics",
     "PM Narendra Modi · Indira Gandhi Indoor Stadium",
     "PM Narendra Modi, along with Minister of State for Culture Mahesh Sharma and Minister of State for Home Affairs Kiren Rijiju, paid respects to the sacred Buddha relics brought from the National Museum. The event featured traditional Buddhist chanting and cultural performances across multiple stages set up around the main area.",
     [("Venue", "Indira Gandhi Indoor Stadium"), ("Chief Guest", "PM Narendra Modi"), ("Cultural Elements", "Buddhist chanting · Multi-stage cultural performances · Sacred relic display")]),

    ("pre-lockdown/gmr-igia-awards.html",
     "Pre-Lockdown Legacy", "2018",
     "GMR IGIA Awards – Grand Airport-Themed Gala",
     "Custom Trophy Installation · Celebrity Hosts",
     "The IGIA Awards by GMR showcased a grand airport-themed setup with a history-wall tunnel entry, custom trophy installation, and specially designed awards. The evening featured curated performances, celebrity hosts, and a memorable celebration of GMR Airport Commercials.",
     [("Theme", "Grand airport-themed setup"), ("Design", "History-wall tunnel entry · Custom trophy installation"), ("Entertainment", "Celebrity hosts · Curated performances")]),

    ("pre-lockdown/gmr-hyderabad-rgia.html",
     "Pre-Lockdown Legacy", "2018",
     "Decennial Celebration of GMR Hyderabad RGIA",
     "10-Year Anniversary · Minister as Chief Guest",
     "The Decennial Celebration of GMR Hyderabad Rajiv Gandhi International Airport featured a grand, immersive setup showcasing the airport's 10-year journey. The Hon'ble Minister of Telangana graced the event as the Chief Guest. Guests experienced a thematic entry, dynamic stage design, curated entertainment, and special showcases honoring a decade of excellence in aviation and customer service.",
     [("Occasion", "10-Year anniversary of RGIA"), ("Chief Guest", "Hon'ble Minister of Telangana"), ("Highlights", "Thematic entry · Dynamic stage · Decade journey showcase")]),

    # ──── Media & Trailer Rollout ────
    ("media-trailer/escaype-live.html",
     "Media &amp; Trailer Rollout (2023–2025)", "2023",
     "Escaype Live – OTT Show Launch",
     "MX Player Original · Media Launch Event",
     "Executed the launch event for Escaype Live, an MX Player original series, creating buzz and media engagement through a high-energy event production and immersive launch experience. The event drew strong press coverage and audience curiosity ahead of the show's premiere.",
     [("Format", "OTT show media launch event"), ("Platform", "MX Player Original"), ("Outcome", "Strong media coverage and show awareness")]),

    ("media-trailer/koffee-karan.html",
     "Media &amp; Trailer Rollout (2023–2025)", "2022/23 · 2023/24",
     "Koffee with Karan – Season 6 &amp; Season 7",
     "Iconic Talk Show · Star-Studded Launch",
     "Managed trailer and media rollout events for Koffee with Karan Seasons 6 and 7 — India's most iconic celebrity talk show on Disney+ Hotstar — creating memorable, high-profile launch moments that trended nationally and generated massive pre-premiere buzz.",
     [("Show", "Koffee with Karan — Disney+ Hotstar"), ("Seasons Covered", "Season 6 &amp; Season 7"), ("Format", "Star-studded media rollout events · Trailer reveals")]),

    ("media-trailer/the-night-manager.html",
     "Media &amp; Trailer Rollout (2023–2025)", "2023",
     "The Night Manager – Series Premiere",
     "Disney+ Hotstar · Thriller Series Launch",
     "Executed the premiere and media rollout for The Night Manager, Disney+ Hotstar's high-stakes thriller adapted from John le Carré's novel, featuring Anil Kapoor and Aditya Roy Kapur. The launch event created significant media buzz and editorial coverage across leading publications.",
     [("Show", "The Night Manager — Disney+ Hotstar"), ("Genre", "Thriller · International adaptation"), ("Cast", "Anil Kapoor · Aditya Roy Kapur"), ("Impact", "Extensive national media coverage · Strong premiere performance")]),

    ("media-trailer/sultan-of-delhi.html",
     "Media &amp; Trailer Rollout (2023–2025)", "2023",
     "Sultan of Delhi – Series Launch",
     "Disney+ Hotstar · High-Impact OTT Launch",
     "Handled the launch event for Sultan of Delhi, Disney+ Hotstar's gripping crime drama set in Delhi's underworld. The immersive media event generated strong buzz and editorial coverage, bringing audiences into the world of the show.",
     [("Show", "Sultan of Delhi — Disney+ Hotstar"), ("Genre", "Crime drama"), ("Impact", "Strong editorial coverage · Media buzz · Social media traction")]),

    ("media-trailer/show-time-karma.html",
     "Media &amp; Trailer Rollout (2023–2025)", "2023",
     "Show Time, Karma Calling &amp; More",
     "Multi-Title OTT Launch Events",
     "Managed launch events for multiple high-profile OTT titles including Show Time (Apple TV+), Karma Calling, Janta Hai Mera Dil, and Kaun Hai? — delivering premium media moments, curated trailer reveals, and A-list celebrity attendance that drove pre-premiere excitement across streaming platforms.",
     [("Titles", "Show Time · Karma Calling · Janta Hai Mera Dil · Kaun Hai?"), ("Platforms", "Apple TV+ · OTT platforms"), ("Format", "Curated trailer reveals · Media preview events")]),

    ("media-trailer/good-luck-jerry.html",
     "Media &amp; Trailer Rollout (2023–2025)", "2022/23",
     "Good Luck Jerry, Gulmohar &amp; Freelancer",
     "Disney+ Hotstar · Film &amp; Series Premieres",
     "Executed premiere and media launch events for Good Luck Jerry (starring Janhvi Kapoor), Gulmohar (starring Manoj Bajpayee and Sharmila Tagore), and The Freelancer — three critically acclaimed Disney+ Hotstar productions. Each event was crafted to generate maximum pre-release buzz and media traction.",
     [("Titles", "Good Luck Jerry · Gulmohar · The Freelancer"), ("Notable Cast", "Janhvi Kapoor · Manoj Bajpayee · Sharmila Tagore"), ("Platform", "Disney+ Hotstar")]),

    ("media-trailer/taaza-khabar.html",
     "Media &amp; Trailer Rollout (2023–2025)", "2023",
     "Taaza Khabar – OTT Series Launch",
     "Disney+ Hotstar · Bhuvan Bam's Debut Series",
     "Executed the launch and trailer rollout event for Taaza Khabar, Bhuvan Bam's acting debut on Disney+ Hotstar, creating a high-energy media moment that drove audience anticipation and strong digital engagement — making it one of the most talked-about OTT launches of the season.",
     [("Show", "Taaza Khabar — Disney+ Hotstar"), ("Significance", "Bhuvan Bam's debut series"), ("Outcome", "High audience anticipation · Trending digital engagement")]),
]



# ────────────────────────────────────────────────────────────────
# HTML Template — Split-view Art Gallery Layout
# ────────────────────────────────────────────────────────────────
def depth(path):
    """Return relative path prefix based on directory depth."""
    parts = path.split("/")
    levels = len(parts) - 1
    return "../" * levels


def build_extra_blocks(blocks):
    html = ""
    for title, text in blocks:
        html += f"""
                <div class="content-block">
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>"""
    return html


def build_page(out_path, category, year, title, tag, description, extra_blocks):
    rel = depth(out_path)
    blocks_html = build_extra_blocks(extra_blocks)
    image_slug = os.path.splitext(os.path.basename(out_path))[0]
    _IMAGE_MAP = {
        "classic-hyperx":          "images/work-showcase/creativity-scale/classic-hyperx/event-3.jpeg",
        "aim-together":          "images/work-showcase/creativity-scale/aim-together/event-3.jpeg",
        "ai-copilot-launch":          "images/work-showcase/creativity-scale/ai-copilot-launch/event-3.jpeg",
        "ai-windows-launch":          "images/work-showcase/creativity-scale/ai-windows-launch/event-3.jpeg",
        "ai-portfolio-launch":          "images/work-showcase/creativity-scale/ai-portfolio-launch/event-3.jpeg",
        "hp-pc-plus":          "images/work-showcase/creativity-scale/hp-pc-plus/event-3.jpeg",
        "laserjet-launch":          "images/work-showcase/creativity-scale/laserjet-launch/event-3.jpeg",
        "omen-influencer":          "images/work-showcase/creativity-scale/omen-influencer/event-2.jpeg",
        "chalo-raushan":          "images/work-showcase/creativity-scale/chalo-raushan/event-3.jpeg",
        "inkredible-connect":          "images/work-showcase/large-deployment/inkredible-connect/event-3.jpeg",
        "printposium":          "images/work-showcase/large-deployment/printposium/event-3.jpeg",
        "south-india-rlfr":          "images/work-showcase/large-deployment/south-india-rlfr/event-4.jpeg",
        "ignite-together":          "images/work-showcase/large-deployment/ignite-together/event-4.jpeg",
        "growthon":          "images/work-showcase/large-deployment/growthon/event-5.jpeg",
        "fighters":          "images/work-showcase/large-deployment/fighters/event-5.jpeg",
        "omen-playground":          "images/work-showcase/large-deployment/omen-playground/event-5.jpeg",
        "redington-partner":          "images/work-showcase/brand-partner/redington-partner/event-5.jpeg",
        "annual-conference":          "images/work-showcase/brand-partner/annual-conference/event-5.jpeg",
        "google-amd-redington":          "images/work-showcase/brand-partner/google-amd-redington/event-5.jpeg",
        "holi-cheer":          "images/work-showcase/on-ground/holi-cheer/event-2.jpeg",
        "ai-pc-pre-diwali":          "images/work-showcase/on-ground/ai-pc-pre-diwali/event-6.jpeg",
        "diwali-gaming-fest":          "images/work-showcase/on-ground/diwali-gaming-fest/event-5.jpeg",
        "ctss-printer-launch":          "images/work-showcase/on-ground/ctss-printer-launch/event-2.jpeg",
        "independence-day":          "images/work-showcase/on-ground/independence-day/event-3.jpeg",
        "ctss-holi-activation":          "images/work-showcase/on-ground/ctss-holi-activation/event-2.jpeg",
        "diwali-ai-tech":          "images/work-showcase/on-ground/diwali-ai-tech/event-3.jpeg",
        "hp-chromebook-srcc":          "images/work-showcase/on-ground/hp-chromebook-srcc/event-2.jpeg",
        "hyperx-gaming-con":          "images/work-showcase/exhibition/hyperx-gaming-con/event-2.jpeg",
        "india-craft-week":          "images/work-showcase/exhibition/india-craft-week/event-3.jpeg",
        "vedanta-stall":          "images/work-showcase/exhibition/vedanta-stall/event-3.jpeg",
        "zee-jaipur-litfest":          "images/work-showcase/exhibition/zee-jaipur-litfest/event-4.jpeg",
        "global-steering-summit":"images/work-showcase/pre-lockdown/global-steering-summit/event-2.jpeg",
        "buddha-jayanti":          "images/work-showcase/pre-lockdown/buddha-jayanti/event-4.jpeg",
        "gmr-igia-awards":          "images/work-showcase/pre-lockdown/gmr-igia-awards/event-3.jpeg",
        "gmr-hyderabad-rgia":          "images/work-showcase/pre-lockdown/gmr-hyderabad-rgia/event-4.jpeg",
        "escaype-live":          "images/work-showcase/media-trailer/escaype-live/event-4.jpeg",
        "koffee-karan":          "images/work-showcase/media-trailer/koffee-karan/event-s7-3.jpeg",
        "sultan-of-delhi":          "images/work-showcase/media-trailer/sultan-of-delhi/event-3.jpeg",
        "taaza-khabar":          "images/work-showcase/media-trailer/taaza-khabar/event-3.jpeg",
        "the-night-manager":          "images/work-showcase/media-trailer/the-night-manager/event-3.jpeg",
        "show-time-karma":          "images/work-showcase/media-trailer/show-time-karma/event-3.jpeg",
        "good-luck-jerry":          "images/work-showcase/media-trailer/good-luck-jerry/event-2.jpeg",
    }
    _img_rel = _IMAGE_MAP.get(image_slug, "")
    if _img_rel:
        img_src = rel + _img_rel
    else:
        folder = os.path.dirname(out_path).replace("our-work/", "work-showcase/")
        img_src = f"{rel}images/{folder}/{image_slug}.jpg"
    back_href = f"{rel}our-work/our-work.html"
    plain_title = title.replace("&amp;", "&").replace("–", "-")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{plain_title} — Tactiq Experiences</title>
    <meta name="description" content="{description[:160]}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{rel}css/desktop.css" />
    <link rel="stylesheet" media="(max-width: 992px)" href="{rel}css/tablet.css" />
    <link rel="stylesheet" media="(max-width: 768px)" href="{rel}css/mobile.css" />
</head>
<body>

<nav class="navbar">
    <div class="container">
        <div class="nav-flex">
            <a href="{rel}index.html" class="logo">Tactiq<span style="color:var(--text-gold);">.</span></a>
            <div class="nav-links" id="main-nav-links">
                <a href="{back_href}">Our Work</a>
                <a href="{rel}index.html#about">About</a>
                <a href="{rel}index.html#contact" class="btn btn-gold-outline">Get in Touch</a>
            </div>
            <button class="menu-toggle" id="menu-toggle-btn" aria-label="Open menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>
</nav>

<main class="split-layout">

    <!-- Left: Image -->
    <div class="split-image">
        <img src="{img_src}" 
             alt="{plain_title}" 
             onerror="this.parentElement.style.background='linear-gradient(160deg,#1c1c1c 0%,#0d0d0d 100%)'" />
    </div>

    <!-- Right: Content -->
    <div class="split-content">
        <span class="page-category">← <a href="{back_href}" style="color:var(--text-gold);">Our Work</a> / {category}</span>

        <div style="margin:2rem 0 0.5rem;">
            <span class="eyebrow">{year}</span>
            <h1 class="page-title fade-in">{title}</h1>
            <p style="font-size:0.82rem; color:var(--text-gold); text-transform:uppercase; letter-spacing:2px; margin-top:0.5rem;">{tag}</p>
        </div>

        <div class="hero-divider" style="margin:1.5rem 0;"></div>

        <p class="page-description fade-in delay-1">{description}</p>
{blocks_html}

        <div style="margin-top:3rem; display:flex; gap:1rem; flex-wrap:wrap;">
            <a href="{rel}index.html#contact" class="btn btn-primary">Start a Conversation →</a>
            <a href="{back_href}" class="btn btn-gold-outline">← Back to All Work</a>
        </div>
    </div>

</main>

<footer style="background:#070707; padding:2rem 0; border-top:1px solid rgba(197,160,89,0.1);">
    <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <a href="{rel}index.html" class="logo">Tactiq<span style="color:var(--text-gold);">.</span></a>
        <span style="color:#333; font-size:0.78rem;">© 2025 Tactiq Experiences. All Rights Reserved.</span>
    </div>
</footer>

<script src="{rel}js/script.js"></script>
</body>
</html>
"""


# ────────────────────────────────────────────────────────────────
# Main: Write all pages
# ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    total = 0
    for page_data in PAGES:
        out_path, category, year, title, tag, description, extra_blocks = page_data
        abs_path = os.path.join(BASE_DIR, out_path.replace("/", os.sep))
        os.makedirs(os.path.dirname(abs_path), exist_ok=True)
        html = build_page(out_path, category, year, title, tag, description, extra_blocks)
        with open(abs_path, "w", encoding="utf-8") as f:
            f.write(html)
        total += 1
        print(f"  ✓ Created: {out_path}")

    print(f"\n✅ Done! {total} pages generated.")
