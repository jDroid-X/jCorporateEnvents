import os

content_path = "extracted_content/content.txt"
images_dir = "extracted_content/images"
output_html = "index.html"

with open(content_path, "r", encoding="utf-8") as f:
    raw_content = f.read()

pages = raw_content.split("--- PAGE ")
page_data = []

for p in pages:
    if not p.strip():
        continue
    lines = p.split("\n")
    page_num = lines[0].strip().split(" ---")[0]
    text = "\n".join(lines[1:]).strip()
    
    # Simple cleanup for text
    text = text.replace("•", "• ")
    
    # Find images for this page
    p_images = [f for f in os.listdir(images_dir) if f.startswith(f"page_{page_num}_img_")]
    # Filter out very small icons if they are just bullets (like page 4 or 5)
    # But for a "snapshot" we might want them. 
    # Let's keep them but maybe skip very tiny 1x1 or similar if we can.
    p_images.sort(key=lambda x: int(x.split("_img_")[1].split(".")[0]))
    
    page_data.append({
        "number": page_num,
        "text": text,
        "images": p_images
    })

html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TacTiq Experiences | 360° Experiential Agency</title>
    <meta name="description" content="A newly formed 360° experiential and corporate event agency built by experts.">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/scrollreveal"></script>
    <style>
        .back-to-top {{
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--accent);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-weight: bold;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            z-index: 1001;
            opacity: 0;
            transition: var(--transition);
            pointer-events: none;
        }}
        .back-to-top.visible {{
            opacity: 1;
            pointer-events: auto;
        }}
    </style>
</head>
<body>
    <header>
        <div class="container mobile-nav" style="display: flex; justify-content: space-between; align-items: center;">
            <a href="#" class="logo">
                <img src="logo/logo_5.png" alt="TacTiq" style="height: 50px; width: auto; object-fit: contain;">
            </a>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#expertise">Services</a></li>
                <li><a href="#snapshots">Credentials</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </header>

    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <p style="margin-bottom: 20px;">Experts in Excellence</p>
                <h1>TACTIQ EXPERIENCES</h1>
                <p>360° Experiential & Corporate Event Agency</p>
            </div>
        </div>
    </section>

    <div style="background: var(--bg-light);">
        <section id="about" class="container">
            <h2 class="section-title">Who We Are</h2>
            <div class="grid" style="grid-template-columns: 1fr 1fr; align-items: center;">
                <div class="reveal-left">
                    <p style="font-size: 1.4rem; margin-bottom: 30px; font-weight: 500;">
                        We are a newly formed 360° experiential and corporate event agency built by experts who have spent years designing, managing, and delivering high-impact events across India.
                    </p>
                    <div style="padding-left: 20px; border-left: 4px solid var(--accent);">
                        <p style="font-size: 1.1rem; color: var(--text-muted);">
                            Our founders and core team members have led some of the most successful product launches, brand activations, and conferences.
                        </p>
                    </div>
                </div>
                <div class="reveal-right">
                    <img src="extracted_content/images/page_3_img_3.jpeg" alt="Event" style="width:100%; border-radius: 30px; box-shadow: 0 40px 80px rgba(0,0,0,0.15);">
                </div>
            </div>
        </section>
    </div>

    <section id="expertise">
        <div class="container">
            <h2 class="section-title">Core Expertise</h2>
            <div class="grid">
                <div class="card">
                    <h3>360° Event Management</h3>
                    <p>Complete planning to flawless execution for any scale.</p>
                </div>
                <div class="card">
                    <h3>Custom Fabrication</h3>
                    <p>Bespoke stalls, booths, décor, and immersive installations.</p>
                </div>
                <div class="card">
                    <h3>Premium Production</h3>
                    <p>Stage, AV, lighting, LED, and high-end show control.</p>
                </div>
                <div class="card">
                    <h3>Operations</h3>
                    <p>Manpower, logistics, coordination, and hospitality.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="snapshots" style="background: var(--bg-light);">
        <div class="container">
            <h2 class="section-title">Every Page Snapshot</h2>
            <p style="text-align: center; margin-bottom: 60px; font-size: 1.2rem; color: var(--text-muted); max-width: 700px; margin-left: auto; margin-right: auto;">
                A comprehensive look at our credentials, projects, and impact.
            </p>
            <div id="snapshot-outer">
                {pages_html}
            </div>
        </div>
    </section>

    <section id="contact" style="background: #000; color: #fff; text-align: center;">
        <div class="container">
            <h2 class="section-title" style="color: #fff; margin-bottom: 40px;">Get In Touch</h2>
            <div style="font-size: 2rem; font-weight: 700; margin-bottom: 20px;">
                Info@tactiqexperiences.com
            </div>
            <div style="font-size: 1.5rem; opacity: 0.8; margin-bottom: 40px;">
                +91 9205312666
            </div>
            <div style="display: flex; justify-content: center; gap: 20px;">
                <!-- Placeholder for social icons -->
                <div style="width: 40px; height: 40px; background: #333; border-radius: 50%;"></div>
                <div style="width: 40px; height: 40px; background: #333; border-radius: 50%;"></div>
                <div style="width: 40px; height: 40px; background: #333; border-radius: 50%;"></div>
            </div>
        </div>
    </section>

    <footer style="padding: 80px 0; background: #000; border-top: 1px solid rgba(255,255,255,0.1);">
        <div class="container" style="display: flex; justify-content: center; align-items: center;">
            <p style="opacity: 1; font-size: 2.2rem; font-weight: 900; letter-spacing: 0.05em; text-align: center; color: #ffffff; text-shadow: 0 0 20px rgba(255,255,255,0.3); margin: 0;">
                &copy; 2026 TacTiq Experiences. All Rights Reserved.
            </p>
        </div>
    </footer>

    <a href="#" class="back-to-top" id="backToTop">↑</a>

    <script>
        // Animations
        ScrollReveal().reveal('.page-section', {{ delay: 100, distance: '60px', origin: 'bottom', interval: 50, scale: 0.95 }});
        ScrollReveal().reveal('.reveal-left', {{ delay: 200, distance: '50px', origin: 'left' }});
        ScrollReveal().reveal('.reveal-right', {{ delay: 300, distance: '50px', origin: 'right' }});
        ScrollReveal().reveal('.card', {{ delay: 200, distance: '40px', origin: 'bottom', interval: 100 }});

        // Back to Top
        const btt = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {{
            if (window.scrollY > 500) {{
                btt.classList.add('visible');
            }} else {{
                btt.classList.remove('visible');
            }}
        }});
    </script>
</body>
</html>
"""

page_template = """
<div class="page-section" id="page-{number}">
    <div class="grid" style="grid-template-columns: 1fr 1.2fr; gap: 60px;">
        <div class="page-text">
            <h3>PAGE {number}</h3>
            <div style="white-space: pre-wrap;">{text}</div>
        </div>
        <div class="image-gallery">
            {images_html}
        </div>
    </div>
</div>
"""

page_1_template = """
<div class="page-section" id="page-1" style="background: #174c56; color: white; border: none; overflow: hidden; position: relative;">
    <div class="grid" style="grid-template-columns: 1fr; gap: 0;">
        <div style="position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.4);">
            <img src="digital_clone/PDF Stories/pages/page_1.jpg" style="width: 100%; height: auto; display: block; filter: brightness(0.9);">
            
            <div style="position: absolute; bottom: 40px; left: 40px; background: rgba(0,0,0,0.6); padding: 30px; border-radius: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); max-width: 500px;">
                 <h3 style="color: var(--accent); margin-bottom: 10px; opacity: 1;">CREDENTIALS</h3>
                 <div style="font-size: 1rem; color: #fff; line-height: 1.6;">{text}</div>
            </div>
        </div>
    </div>
</div>
"""

last_page_template = """
<div class="page-section" id="page-{number}" style="background: #000; color: white; border: none; min-height: 800px; padding: 60px; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 60px;">
    <div style="text-align: center;">
        <h1 style="font-size: 6rem; letter-spacing: 0.1em; opacity: 0.9; margin-bottom: 20px; line-height: 1;">THANK YOU</h1>
        <p style="font-size: 1.4rem; opacity: 0.6; letter-spacing: 0.05em; max-width: 800px; line-height: 1.8; margin: 0 auto;">
            {text}
        </p>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 20px 40px; align-items: center; justify-items: center; width: 100%; max-width: 1200px; border-top: 3px solid #ff3e3e; padding-top: 50px; transform: translateX(20%); height: auto;">
        <!-- Row 1: Compact/Small -->
        <img src="logo/logo_25.png" style="width: auto; height: auto; max-width: 90%; max-height: 60px; opacity: 0.7; border-right: 1.5px solid rgba(255,62,62,0.4); padding-right: 25px; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.6));">
        <img src="logo/logo_3.png" style="width: auto; height: auto; max-width: 90%; max-height: 65px; opacity: 0.9; border-right: 1.5px solid rgba(255,62,62,0.4); padding-right: 25px; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.6));">
        <img src="logo/logo_8.png" style="width: auto; height: auto; max-width: 90%; max-height: 100px; opacity: 0.8; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.6));">
        
        <!-- Row 2: Medium -->
        <img src="logo/logo_6.png" style="width: auto; height: auto; max-width: 90%; max-height: 130px; opacity: 0.9; border-right: 1.5px solid rgba(255,62,62,0.4); padding-right: 25px; border-top: 1.5px solid rgba(255,62,62,0.4); padding-top: 15px; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.7));">
        <img src="logo/logo_17.png" style="width: auto; height: auto; max-width: 90%; max-height: 140px; border-right: 1.5px solid rgba(255,62,62,0.4); padding-right: 25px; border-top: 1.5px solid rgba(255,62,62,0.4); padding-top: 15px; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.7));">
        <img src="logo/logo_19.png" style="width: auto; height: auto; max-width: 90%; max-height: 145px; border-top: 1.5px solid rgba(255,62,62,0.4); padding-top: 15px; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.7));">
        
        <!-- Row 3: Large Partners -->
        <img src="logo/logo_10.png" style="width: auto; height: auto; max-width: 90%; max-height: 220px; border-right: 1.5px solid rgba(255,62,62,0.4); padding-right: 25px; border-top: 1.5px solid rgba(255,62,62,0.4); padding-top: 15px; filter: drop-shadow(0 0 15px rgba(255,255,255,0.4)) drop-shadow(0 15px 25px rgba(0,0,0,0.8)) brightness(1.2);">
        <img src="logo/logo_18.png" style="width: auto; height: auto; max-width: 90%; max-height: 200px; opacity: 0.8; border-right: 1.5px solid rgba(255,62,62,0.4); padding-right: 25px; border-top: 1.5px solid rgba(255,62,62,0.4); padding-top: 15px; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.8));">
        <img src="logo/logo_20.png" style="width: auto; height: auto; max-width: 90%; max-height: 180px; border-top: 1.5px solid rgba(255,62,62,0.4); padding-top: 15px; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.8));">
        
        <!-- Row 4: Primary Anchor -->
        <img src="logo/logo_16.png" style="width: auto; height: auto; max-width: 40%; max-height: 180px; grid-column: span 3; justify-self: center; border-top: 2px solid rgba(255,62,62,0.4); padding-top: 25px; margin-top: 15px; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.9));">
    </div>
</div>
"""

pages_html = ""
for i, p in enumerate(page_data):
    if p["number"] == "1":
        pages_html += page_1_template.format(
            text=p["text"]
        )
        continue
    
    if i == len(page_data) - 1:
        pages_html += last_page_template.format(
            number=p["number"],
            text=p["text"]
        )
        continue

    imgs_html = ""
    # Only show up to 8 images per page to keep it clean, prioritize larger ones (jpeg over tiny png)
    sorted_imgs = sorted(p["images"], key=lambda x: os.path.getsize(os.path.join(images_dir, x)), reverse=True)
    for img in sorted_imgs[:8]:
        imgs_html += f'<img src="extracted_content/images/{img}" class="gallery-item" alt="Page {p["number"]} Image">'
    
    pages_html += page_template.format(
        number=p["number"],
        text=p["text"],
        images_html=imgs_html
    )

with open(output_html, "w", encoding="utf-8") as f:
    f.write(html_template.format(pages_html=pages_html))

print("index.html generated successfully with high-impact Page 1.")
