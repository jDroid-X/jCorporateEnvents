
import os

def update_html_files(root_dir):
    new_css_links = '''    <link rel="stylesheet" href="{path_prefix}css/desktop.css">
    <link rel="stylesheet" href="{path_prefix}css/tablet.css" media="(max-width: 992px)">
    <link rel="stylesheet" href="{path_prefix}css/mobile.css" media="(max-width: 768px)">'''

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                # Calculate relative path to css folder
                # depth = 0 (Website2) -> css/
                # depth = 1 (Website2/subdir) -> ../css/
                rel_path = os.path.relpath(file_path, root_dir)
                depth = rel_path.count(os.sep)
                path_prefix = "../" * depth if depth > 0 else ""
                
                # Special case for files in root
                if depth == 0:
                     path_prefix = ""

                current_links = new_css_links.format(path_prefix=path_prefix)

                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Basic regex replacement or string replacement
                # Look for the old style.css link and replace it
                if "css/style.css" in content:
                    import re
                    # Replace the entire link tag containing style.css
                    # <link rel="stylesheet" href="css/style.css?v=2"> or similar
                    
                    pattern = r'<link[^>]*href="[^"]*css/style\.css[^"]*"[^>]*>'
                    
                    if re.search(pattern, content):
                        new_content = re.sub(pattern, current_links, content)
                        
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {file}")
                    else:
                        print(f"Skipped {file} (pattern not found)")
                else:
                    print(f"Skipped {file} (style.css not found)")

update_html_files(r"C:\Users\dell\jAnitGravity\jCorporateEvents\Website2")
