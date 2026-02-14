
import re

def validate_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    stack = []
    for i, line in enumerate(lines):
        line_clean = re.sub(r'/\*.*?\*/', '', line) # precise comment removal needed? naive for now
        # Better: tokenize
        for char in line:
            if char == '{':
                stack.append(i + 1)
            elif char == '}':
                if not stack:
                    print(f"Error: Unexpected closing brace at line {i + 1}")
                    return
                stack.pop()
    
    if stack:
        print(f"Error: Unclosed brace starting at line {stack[-1]}")
    else:
        print("CSS is balanced.")

validate_css(r"C:\Users\dell\jAnitGravity\jCorporateEvents\Website2\css\style.css")
