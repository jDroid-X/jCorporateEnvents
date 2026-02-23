# PDF Stories Master Blueprint
## The Foundation for Website #2 & #3

This document contains the "Skeleton" code for your digital clone websites. To create a new site, simply copy the HTML and CSS sections below into new files.

---

### 1. The Structure (`index.html`)
This code includes the mobile hamburger menu, the 12-layer theme engine, and the responsive viewer.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Master Blueprint | Digital Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Mobile Navigation Toggle -->
    <button id="menu-toggle"><span></span><span></span><span></span></button>

    <div class="app-container">
        <!-- Structural Sidebar -->
        <aside id="sidebar">
            <div class="logo-box"><img src="pages/logo.png" alt="Logo"></div>
            <div class="nav-menu" id="nav-menu"></div>
            <div id="year-filter"></div>
            <div id="theme-switch-btn">🎨</div>
            <div style="padding: 10px 25px; font-size: 0.55rem; color: var(--text); opacity: 0.2; letter-spacing: 0.05em; text-align: center; margin-top: auto;">
                © 2026 TACTIQ • DIGITAL CLONE
            </div>
        </aside>

        <!-- Main Atmospheric Viewer -->
        <main>
            <header class="slim-header">
                <div class="header-title" id="header-title">Project Title</div>
            </header>
            
            <div class="viewer-container" id="viewer-container">
                <div id="slide-viewport">
                    <img id="slide-image" src="">
                    <div id="interaction-layer"></div>
                </div>
            </div>



            <footer class="slim-footer">
                <button class="btn-slim" id="prev-btn">PREV</button>
                <div class="page-info" id="page-info">0 / 0</div>
                <button class="btn-slim" id="next-btn">NEXT</button>
            </footer>
        </main>
    </div>
    
    <!-- Link your metadata.json and JS engine here -->
    <script src="engine.js"></script>

    <div class="demo-disclaimer">
        Concept Demo Presentation Only | © 2026 TacTiq Corp | All respective logos & content are property of their owners
    </div>
</body>
</html>
```

---

/* Standard 12-Layer Design System */
:root {
    --bg: #0a0a0a;              /* 1. Main Body */
    --side-bg: #111;            /* 2. Sidebar */
    --header-bg: #111;          /* 3. Header/Footer */
    --btn-bg: #1a1a1a;          /* 4. Action Buttons */
    --accent: #007bff;          /* 5. Primary Accent */
    --accent-soft: #004a99;     /* 6. Secondary Accent */
    --text: #ffffff;            /* 7. Primary Font */
    --highlight-gold: #ffd700;  /* 8. Highlighted Font */
    --border: #333;             /* 9. UI Border */
    --card-bg: #151515;         /* 10. Card / Tile */
    --scroll-thumb: #444;       /* 11. Scrollbar */
    --status-ok: #28a745;       /* 12. Success */
}

/* Base Responsive Logic */
@media (max-width: 992px) {
    #menu-toggle { display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 4px; }
    #menu-toggle span { display: block; width: 20px; height: 2px; background: var(--accent); }
    #sidebar { position: fixed; left: -320px; z-index: 1500; transition: 0.4s ease; box-shadow: 10px 0 30px rgba(0,0,0,0.5); }
    #sidebar.open { left: 0; }
    .viewer-container { padding: 60px 10px; overflow-y: auto !important; -webkit-overflow-scrolling: touch; }
    #slide-image { max-width: 100%; height: auto; }
    .demo-disclaimer { font-size: 0.75rem; bottom: 6px; opacity: 0.5; }
}

/* Professional Disclaimer Centered */
.demo-disclaimer {
    position: fixed;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    color: var(--text);
    opacity: 0.6;
    z-index: 3000;
    pointer-events: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 400;
    white-space: nowrap;
}
```

---

### 3. The Logic Engine (`engine.js`)
This script handles the theme syncing, year filtering, and viewer functions.

```javascript
/* MASTER INTERACTION ENGINE */
let currentSlide = 0;
const metadata = []; // Load from metadata.json

function setTheme(themeKey, themeName, customColors = null) {
    const body = document.body;
    
    // Auto-fetch if custom is requested without colors
    if (themeKey === 'custom' && !customColors) {
        const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
        const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
        const themeIdx = savedThemes.findIndex(t => t.name === themeName);
        if (themeIdx !== -1) customColors = savedElements.map(el => el.colors[themeIdx]);
    }

    if (customColors && customColors.length >= 7) {
        body.style.setProperty('--bg', customColors[0]);
        body.style.setProperty('--side-bg', customColors[1]);
        body.style.setProperty('--header-bg', customColors[2]);
        body.style.setProperty('--btn-bg', customColors[3]);
        body.style.setProperty('--accent', customColors[4]);
        
        // Advanced 12-Layer Mapping Logic
        if (customColors[5]) body.style.setProperty('--accent-soft', customColors[5]);
        body.style.setProperty('--text', customColors[6] || customColors[5]);
        body.style.setProperty('--highlight-gold', customColors[7] || customColors[6]);
        if (customColors[8]) body.style.setProperty('--border', customColors[8]);
        if (customColors[9]) body.style.setProperty('--card-bg', customColors[9]);
        if (customColors[10]) body.style.setProperty('--scroll-thumb', customColors[10]);
        if (customColors[11]) body.style.setProperty('--status-ok', customColors[11]);
    }
    
    localStorage.setItem('tactiq-theme-key', themeKey);
    localStorage.setItem('tactiq-theme-name', themeName);
}

function buildStrategyGrid(targetYear = null) {
    const grid = document.getElementById('grid-content');
    grid.innerHTML = '';
    const filtered = targetYear ? metadata.filter(p => p.year === targetYear) : metadata;
    // Map Tiles...
}

function loadSlide(idx) {
    document.getElementById('slide-image').src = `pages/${metadata[idx].image}`;
    document.getElementById('page-info').textContent = `${idx + 1} / ${metadata.length}`;
}

// Mobile Toggle Handler
document.getElementById('menu-toggle').onclick = () => {
    document.getElementById('sidebar').classList.toggle('open');
};
```

---

### 3. Usage Strategy
1. **Initialize**: Create a new folder for your next client (e.g., `Client_Website_2`).
2. **Assets**: Place custom images in `/pages` and videos in `/videos`.
3. **Themes**: Use the **Atmospheric Theme Designer** to create shades, click **↑ Sync To Website**, and those 12 colors will instantly bring the skeleton to life.

**© 2026 TACTIQ • MASTER BLUEPRINT READY**
