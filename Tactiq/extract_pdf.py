import pdfplumber
import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq\Tactiq Experiences Credentials.pdf"
output_path = r"C:\Users\dell\jAnitGravity\jCorporateEvents\Tactiq\pdf_content.json"

pages_data = []

with pdfplumber.open(pdf_path) as pdf:
    total_pages = len(pdf.pages)
    print(f"Total pages: {total_pages}")
    
    for i, page in enumerate(pdf.pages):
        page_num = i + 1
        text = page.extract_text()
        
        # Also try to get words with positions for better structure understanding
        words = page.extract_words()
        word_list = [w['text'] for w in words] if words else []
        
        # Extract tables if any
        tables = page.extract_tables()
        table_data = tables if tables else []
        
        page_info = {
            "page": page_num,
            "text": text if text else "",
            "words": word_list[:50],  # first 50 words for structure hint
            "has_tables": len(table_data) > 0,
            "table_count": len(table_data)
        }
        pages_data.append(page_info)
        print(f"--- PAGE {page_num} ---")
        print(text[:500] if text else "[No text extracted - likely image-based page]")
        print()

# Save full content
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(pages_data, f, indent=2, ensure_ascii=False)

print(f"\nDone! Saved to {output_path}")
print(f"Total pages processed: {total_pages}")
