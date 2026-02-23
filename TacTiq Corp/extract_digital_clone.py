import fitz  # PyMuPDF
import os
import json
import re

pdf_path = "Tactiq Experiences Credentials.pdf"
output_dir = "digital_clone"
images_dir = os.path.join(output_dir, "pages")

doc = fitz.open(pdf_path)
page_data = []

current_section = "Introduction"

for page_index in range(len(doc)):
    page = doc[page_index]
    
    # Save page as JPEG (150 DPI)
    zoom = 150 / 72  
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
    image_filename = f"page_{page_index + 1}.jpg"
    pix.save(os.path.join(images_dir, image_filename), "jpeg")
    
    # Get links and check for YouTube
    links = []
    for link in page.get_links():
        if link["kind"] == fitz.LINK_URI:
            url = link["uri"]
            is_video = "youtube" in url.lower() or "vimeo" in url.lower()
            links.append({
                "url": url,
                "is_video": is_video,
                "rect": [link["from"].x0 / page.rect.width, 
                         link["from"].y0 / page.rect.height, 
                         link["from"].x1 / page.rect.width, 
                         link["from"].y1 / page.rect.height]
            })
    
    text = page.get_text()
    
    # Extract Year for Strategy View
    years = re.findall(r'\b(20\d{2})\b', text)
    primary_year = years[0] if years else None

    # Section Detection
    lower_text = text.lower()
    if "01" in text and "creativity" in lower_text: current_section = "Where Creativity Meets Scale"
    elif "02" in text and "deployment" in lower_text: current_section = "Large-Scale Deployment"
    elif "03" in text and "engagement" in lower_text: current_section = "Brand Partner Engagement"
    elif "03" in text and "trailer" in lower_text: current_section = "Media & Trailer Rollout"
    elif "04" in text and "pre-lockdown" in lower_text: current_section = "Pre-Lockdown Showcase"
    elif "04" in text and "impact" in lower_text: current_section = "On Ground Impact"
    
    page_data.append({
        "number": page_index + 1,
        "image": image_filename,
        "links": links,
        "section": current_section,
        "year": primary_year,
        "width": page.rect.width,
        "height": page.rect.height,
        "title": text.split('\n')[0].strip()[:50] # Rough title
    })

with open(os.path.join(output_dir, "metadata.json"), "w", encoding="utf-8") as f:
    json.dump(page_data, f, indent=4)

print(f"Deep dive extraction complete.")
