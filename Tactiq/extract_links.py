import pdfplumber
import json

pdf_path = r"C:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq\Tactiq Experiences Credentials.pdf"

links_data = {}

with pdfplumber.open(pdf_path) as pdf:
    for i, page in enumerate(pdf.pages):
        page_num = i + 1
        # annots contains hyperlinks
        annots = page.annots
        if annots:
            for annot in annots:
                if 'uri' in annot:
                    uri = annot['uri']
                    if page_num not in links_data:
                        links_data[page_num] = []
                    links_data[page_num].append(uri)
                    print(f"Page {page_num}: {uri}")

with open('links.json', 'w') as f:
    json.dump(links_data, f, indent=2)

print("\nSaved links to links.json")
