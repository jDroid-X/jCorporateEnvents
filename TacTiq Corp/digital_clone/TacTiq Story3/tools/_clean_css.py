import re

with open('css/desktop.css', encoding='utf-8') as f:
    css = f.read()

# Replace the literal \n strings with real newlines
css = css.replace('\\n', '\n')

# Also fix the weird doubled newlines if any
css = re.sub(r'\n+', '\n', css)

# But keep some spacing
css = css.replace('}', '}\n\n')
css = css.replace('/* ', '\n/* ')

with open('css/desktop.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Cleaned up desktop.css")
