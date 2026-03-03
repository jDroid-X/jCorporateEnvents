import re
import os

with open('generate_pages.py', 'r', encoding='utf-8') as f:
    template_script = f.read()

nav_match = re.search(r'(<!-- Navigation -->.*?</nav>)', template_script, re.DOTALL)
disclaimer_match = re.search(r'(<!-- Demo Disclaimer -->.*?</div>)', template_script, re.DOTALL)
scripts_match = re.search(r'(<script src="\{root\}js/ThemeManager\.js"></script>\s*<script src="\{root\}js/script\.js"></script>)', template_script, re.DOTALL)

nav_template = nav_match.group(1)
disclaimer_template = disclaimer_match.group(1)
scripts_template = scripts_match.group(1)

files = [
    r'event-solutions/event-solutions.html',
    r'our-work/our-work.html',
    r'resources/resources.html'
]

for fp in files:
    if os.path.exists(fp):
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
            
        root_path = '../'
        nav_rep = nav_template.replace('{root}', root_path)
        disc_rep = disclaimer_template.replace('{root}', root_path)
        scripts_rep = scripts_template.replace('{root}', root_path)
        
        content = re.sub(r'<!-- Navigation -->.*?</nav>', nav_rep, content, flags=re.DOTALL)
        content = re.sub(r'</footer>.*', '</footer>\n\n    ' + disc_rep + '\n\n    ' + scripts_rep + '\n</body>\n</html>', content, flags=re.DOTALL)
        
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated " + fp)
