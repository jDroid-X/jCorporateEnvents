import fitz  # PyMuPDF
import os
from PIL import Image
import io

pdf_path = "Tactiq Experiences Credentials.pdf"
output_dir = "extracted_content"
images_dir = os.path.join(output_dir, "images")

if not os.path.exists(images_dir):
    os.makedirs(images_dir)

doc = fitz.open(pdf_path)
text_content = []

for page_index in range(len(doc)):
    page = doc[page_index]
    text = page.get_text()
    text_content.append(f"--- PAGE {page_index + 1} ---\n{text}")
    
    # Extract images
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image = Image.open(io.BytesIO(image_bytes))
        image_filename = f"page_{page_index + 1}_img_{img_index + 1}.{image_ext}"
        image.save(os.path.join(images_dir, image_filename))

with open(os.path.join(output_dir, "content.txt"), "w", encoding="utf-8") as f:
    f.write("\n\n".join(text_content))

print(f"Extraction complete. Text and {len(os.listdir(images_dir))} images saved to {output_dir}.")
