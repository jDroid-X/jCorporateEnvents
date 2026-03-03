import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

# Add ctss-holi-activation to On-Ground dropdown
# List ends at hp-chromebook-srcc.html
old_line = """<li><a href="our-work/on-ground/hp-chromebook-srcc.html">HP × Chromebook @ SRCC
                                                Conclave</a></li>"""
new_line = """<li><a href="our-work/on-ground/hp-chromebook-srcc.html">HP × Chromebook @ SRCC Conclave</a></li>
                                        <li><a href="our-work/on-ground/ctss-holi-activation.html">CTSS Holi Activation</a></li>"""

html = html.replace(old_line, new_line)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Added CTSS Holi Activation to index.html")
