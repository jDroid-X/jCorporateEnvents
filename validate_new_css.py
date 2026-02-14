
import re
import os

def check_css_braces(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    open_braces = content.count('{')
    close_braces = content.count('}')
    
    if open_braces != close_braces:
        print(f"ERROR: {os.path.basename(file_path)} has mismatched braces! {{: {open_braces}, }}: {close_braces}")
    else:
        print(f"OK: {os.path.basename(file_path)} braces are balanced.")

css_dir = r"C:\Users\dell\jAnitGravity\jCorporateEvents\Website2\css"
files = ["desktop.css", "tablet.css", "mobile.css"]

for file in files:
    check_css_braces(os.path.join(css_dir, file))
