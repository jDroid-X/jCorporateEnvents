import fitz
from PIL import Image
import os

pdf_path = "Tactiq Experiences Credentials.pdf"
doc = fitz.open(pdf_path)
page = doc[0]

# Render page at low res just to get color
pix = page.get_pixmap(colorspace=fitz.csRGB)
img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

# Sample top-left pixel color (usually background)
bg_color = img.getpixel((10, 10))
hex_color = '#{:02x}{:02x}{:02x}'.format(*bg_color)

print(f"Detected Background Color: {hex_color}")
