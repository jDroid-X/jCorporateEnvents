let currentIndex = 0;
let touchStartX = 0;
// metadata is pre-loaded via js/metadata.js as window.metadata

function init() {
    // Central Theme Synchronization
    if (window.ThemeManager) {
        window.ThemeManager.initSync();
    }

    const img = document.getElementById('slide-image');
    if (img) {
        img.onerror = () => {
            const log = document.getElementById('error-log');
            if (log) {
                log.style.display = 'block';
                log.innerHTML += `Image Failed: ${img.src}<br>`;
            }
        };
    }

    buildUI();
    loadSlide(0);

    // Navigation Controls
    const bindClick = (id, fn) => {
        const el = document.getElementById(id);
        if (el) el.onclick = fn;
    };

    bindClick('prev-btn', () => changeSlide(-1));
    bindClick('next-btn', () => changeSlide(1));
    bindClick('menu-toggle', () => document.getElementById('sidebar').classList.toggle('open'));
    bindClick('prev-section-btn', () => changeSlide(-1));
    bindClick('next-section-btn', () => changeSlide(1));
    bindClick('fs-btn', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener('fullscreenchange', () => {
        const isFS = !!document.fullscreenElement;
        const fsBtn = document.getElementById('fs-btn');
        const menuToggle = document.getElementById('menu-toggle');
        const disclaimer = document.querySelector('.demo-disclaimer');

        if (fsBtn) {
            fsBtn.textContent = isFS ? 'EXIT FULLSCREEN' : 'FULLSCREEN';
            fsBtn.style.background = isFS ? 'var(--accent)' : 'var(--btn-bg)';
        }

        if (menuToggle) menuToggle.style.display = isFS ? 'none' : '';
        if (disclaimer) disclaimer.style.opacity = isFS ? '0' : '0.6';
    });

    const container = document.getElementById('viewer-container');
    if (container) {
        container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true });
        container.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) changeSlide(diff > 0 ? -1 : 1);
        }, { passive: true });
    }

    window.addEventListener('keydown', e => {
        const overlay = document.getElementById('strategy-grid-overlay');
        if (overlay && overlay.style.display === 'block') return;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') changeSlide(-1);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') changeSlide(1);
    });

    let isScrolling = false;
    window.addEventListener('wheel', e => {
        const overlay = document.getElementById('strategy-grid-overlay');
        if (overlay && overlay.style.display === 'block') return;
        if (isScrolling) return;
        if (Math.abs(e.deltaY) > 60) {
            isScrolling = true;
            changeSlide(e.deltaY > 0 ? 1 : -1);
            setTimeout(() => { isScrolling = false; }, 700);
        }
    }, { passive: true });
}

function buildUI() {
    const menu = document.getElementById('nav-menu');
    const yearBox = document.getElementById('year-filter');
    const gridOverlay = document.getElementById('strategy-grid-overlay');
    const viewerCont = document.getElementById('viewer-container');

    let lastSection = "";
    let years = new Set();

    if (menu) menu.innerHTML = '';
    if (yearBox) yearBox.innerHTML = '';

    metadata.forEach((page, idx) => {
        if (page.section && page.section !== lastSection) {
            const item = document.createElement('div');
            item.className = 'nav-item active-section';
            let displayText = page.section;
            if (page.title && !page.title.includes("62%")) displayText += `: ${page.title}`;
            item.textContent = displayText;
            item.id = `nav-item-${idx}`;
            item.onclick = () => {
                loadSlide(idx);
                document.getElementById('sidebar').classList.remove('open');
            };
            if (menu) menu.appendChild(item);
            lastSection = page.section;
        }
        if (page.year) years.add(page.year);
    });

    Array.from(years).sort().forEach(year => {
        const pill = document.createElement('button');
        pill.style.cssText = "background: rgba(0,0,0,0.3); border: 1px solid var(--accent); color: var(--text); opacity: 0.6; padding: 8px 14px; border-radius: 4px; font-size: 0.85rem; cursor: pointer; transition: var(--transition);";
        pill.textContent = year;
        pill.dataset.year = year;
        pill.onclick = () => {
            buildStrategyGrid(year);
            if (gridOverlay) gridOverlay.style.display = 'block';
        };
        if (yearBox) yearBox.appendChild(pill);
    });

    // Stories Dropdown
    const storiesBtn = document.createElement('button');
    storiesBtn.style.cssText = "background: rgba(0,0,0,0.3); border: 1px solid var(--accent); color: var(--text); opacity: 0.6; padding: 8px 14px; border-radius: 4px; font-size: 0.85rem; cursor: pointer; transition: var(--transition); position: relative;";
    storiesBtn.textContent = 'Stories';

    const storiesPopup = document.createElement('div');
    storiesPopup.id = 'stories-popup-menu';
    storiesPopup.className = 'glass';
    storiesPopup.style.cssText = "display:none; position:absolute; bottom:45px; left:0; width:190px; border:1px solid var(--accent); opacity:0.95; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:2000; overflow:hidden; animation: scrollUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);";

    const stories = [
        { name: 'TacTiq Story 1', url: '../TacTiq Story1/index.html' },
        { name: 'TacTiq Story 2', url: '../TacTiq Story2/index.html' },
        { name: 'TacTiq Story 3', url: '../TacTiq Story3/index.html' },
        { name: 'TacTiq Story 4', url: '../TacTiq Story4/index.html' },
        { name: 'TacTiq Story 5', url: '../TacTiq Story5/vogue_fashion/index.html' },
        { name: 'PDF Stories', url: '../PDF Stories/index.html' }
    ];

    stories.forEach(story => {
        const row = document.createElement('div');
        row.className = 'theme-opt';
        row.style.cssText = "padding:12px; font-size:0.75rem; color:var(--text); opacity:1; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer;";
        row.textContent = story.name;
        row.onclick = (e) => {
            e.stopPropagation();
            window.location.href = story.url;
        };
        storiesPopup.appendChild(row);
    });

    storiesBtn.appendChild(storiesPopup);
    storiesBtn.onclick = (e) => {
        const isVisible = storiesPopup.style.display === 'block';
        storiesPopup.style.display = isVisible ? 'none' : 'block';
        e.stopPropagation();
    };
    document.addEventListener('click', () => storiesPopup.style.display = 'none');
    if (yearBox) yearBox.appendChild(storiesBtn);

    // Theme Switcher
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-switch-btn';
    themeBtn.style.cssText = "background: var(--side-bg); border: 1px solid var(--accent); color: white; padding: 0; border-radius: 6px; font-size: 1.2rem; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-left: 8px; position: relative; width: 32px; height: 32px; transition: var(--transition); flex-shrink: 0;";
    themeBtn.innerHTML = '🎨';

    const menuPopup = document.createElement('div');
    menuPopup.id = 'theme-popup-menu';
    menuPopup.className = 'glass';
    menuPopup.style.cssText = "display:none; position:absolute; bottom:40px; right:0; width:180px; border:1px solid var(--accent); opacity:0.95; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:2000; overflow:hidden; animation: scrollUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);";

    function renderThemeMenu() {
        menuPopup.innerHTML = '';
        const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
        const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
        const currentName = localStorage.getItem('tactiq-theme-name');

        const themesFromDB = savedThemes.map((t, themeIdx) => ({
            active: t.active,
            name: t.name,
            colors: savedElements.map(el => el.colors[themeIdx])
        }));

        function addMenuRow(key, name, colors, isCustom) {
            const row = document.createElement('div');
            row.className = 'theme-opt';
            const isActive = (name === currentName) || (key === 'default' && (!currentName || currentName === 'Default Theme'));
            row.style.cssText = `padding:12px; font-size:0.75rem; color:${isActive ? 'var(--highlight-gold)' : 'var(--text)'}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;`;
            row.innerHTML = `<span>${name}</span>`;
            if (isActive) row.classList.add('active');

            row.onclick = (e) => {
                e.stopPropagation();
                if (window.ThemeManager) window.ThemeManager.setTheme(key, name, colors);
                renderThemeMenu();
            };
            menuPopup.appendChild(row);
        }

        addMenuRow('default', 'Default Theme', null, false);

        // Active Custom Themes
        const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');
        activeCustoms.forEach(t => {
            const themeIdx = savedThemes.findIndex(st => st.name === t.name);
            const colors = savedElements.map(el => el.colors[themeIdx]);
            addMenuRow('custom', t.name, colors, true);
        });
        // Designer Link
        const designerRow = document.createElement('div');
        designerRow.style.cssText = "padding:12px; border-top:1px solid rgba(255,255,255,0.1); margin-top:5px; text-align:center; cursor:pointer;";
        designerRow.innerHTML = `<a href="../../jWebTheme/index.html" target="_blank" style="color:var(--highlight-gold); font-weight:700; text-decoration:none; font-size:0.8rem;">Designer</a>`;
        designerRow.onclick = (e) => {
            e.stopPropagation();
            window.open('../../jWebTheme/index.html', '_blank');
            menuPopup.style.display = 'none';
        };
        menuPopup.appendChild(designerRow);
    }

    renderThemeMenu();
    themeBtn.appendChild(menuPopup);
    if (yearBox) yearBox.appendChild(themeBtn);

    window.onfocus = () => renderThemeMenu();

    // Palette Interaction: Click to toggle (touch friendly)
    themeBtn.onclick = (e) => {
        e.stopPropagation();
        const isVisible = menuPopup.style.display === 'block';
        // Close other popups if any
        const storiesPopup = document.getElementById('stories-popup-menu');
        if (storiesPopup) storiesPopup.style.display = 'none';

        menuPopup.style.display = isVisible ? 'none' : 'block';
    };

    menuPopup.onclick = (e) => e.stopPropagation();
    document.addEventListener('click', () => menuPopup.style.display = 'none');
}

function buildStrategyGrid(targetYear = null) {
    const grid = document.getElementById('grid-content');
    const heroRow = document.getElementById('hero-row');
    const heroImg = document.getElementById('hero-intro-image');
    const gridOverlay = document.getElementById('strategy-grid-overlay');
    const viewerCont = document.getElementById('viewer-container');
    const heroImageCont = document.getElementById('hero-image-container');

    if (grid) grid.innerHTML = '';
    const items = document.getElementById('grid-content');
    if (items) items.classList.remove('active');
    if (heroImageCont) heroImageCont.classList.remove('active');

    if (viewerCont) viewerCont.style.display = 'none';
    if (gridOverlay) gridOverlay.style.display = 'block';

    setTimeout(() => {
        if (heroImageCont) heroImageCont.classList.add('active');
        if (items) items.classList.add('active');
    }, 10);

    document.querySelectorAll('[data-year]').forEach(btn => {
        const isActive = btn.dataset.year === targetYear;
        btn.style.color = isActive ? "var(--accent)" : "var(--text)";
        btn.style.opacity = isActive ? "1" : "0.5";
    });

    if (heroImg) heroImg.src = `pages/${metadata[0].image}`;
    if (heroRow) heroRow.style.display = 'flex';

    if (targetYear) {
        metadata.forEach((page, idx) => {
            if (page.year === targetYear) addTile(grid, page, idx, `PG${page.number}`);
        });
    } else {
        const years = Array.from(new Set(metadata.filter(p => p.year).map(p => p.year))).sort().reverse();
        years.forEach(year => {
            const firstIdx = metadata.findIndex(p => p.year === year);
            if (firstIdx !== -1) addTile(grid, metadata[firstIdx], firstIdx, `${year}`);
        });
    }

    function addTile(container, page, idx, label) {
        const tile = document.createElement('div');
        tile.className = 'strategy-tile';
        tile.style.cssText = "background:var(--side-bg); border:1px solid var(--accent); border-radius:10px; overflow:hidden; cursor:pointer; position:relative;";
        tile.innerHTML = `
            <div style="aspect-ratio:16/9; background:var(--bg); overflow:hidden;">
                <img src="pages/${encodeURIComponent(page.image)}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" alt="${label}">
            </div>
            <div style="position:absolute; bottom:8px; right:10px; color:white; font-size:10px; font-weight:900; background:rgba(0,0,0,0.5); padding: 2px 5px; border-radius:3px; backdrop-filter: blur(2px);">${label}</div>
        `;
        tile.onclick = () => loadSlide(idx);
        if (container) container.appendChild(tile);
    }
}

function loadSlide(index) {
    if (index < 0 || index >= metadata.length) return;
    currentIndex = index;
    const page = metadata[index];

    const gridOverlay = document.getElementById('strategy-grid-overlay');
    const viewerCont = document.getElementById('viewer-container');
    if (gridOverlay) gridOverlay.style.display = 'none';
    if (viewerCont) {
        viewerCont.style.display = 'flex';
        viewerCont.style.height = '100%';
    }

    const lastOverlay = document.getElementById('last-page-overlay');
    if (lastOverlay) lastOverlay.style.display = (index === metadata.length - 1) ? 'block' : 'none';

    const img = document.getElementById('slide-image');
    if (img) img.src = `pages/${page.image}`;

    const info = document.getElementById('page-info');
    if (info) info.textContent = `Page ${page.number} of ${metadata.length}`;

    const layer = document.getElementById('interaction-layer');
    if (layer) {
        layer.innerHTML = '';
        let hasVideo = false;
        page.links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'pdf-link';
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.left = (link.rect[0] * 100) + '%';
            a.style.top = (link.rect[1] * 100) + '%';
            a.style.width = ((link.rect[2] - link.rect[0]) * 100) + '%';
            a.style.height = ((link.rect[3] - link.rect[1]) * 100) + '%';
            if (link.is_video) {
                hasVideo = true;
                a.style.border = "2px dashed var(--accent)";
                const playIcon = document.createElement('div');
                playIcon.style.cssText = "position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:30px; height:30px; background:var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; color:white; pointer-events:none; box-shadow:0 0 15px rgba(255, 153, 51, 0.6);";
                playIcon.textContent = "▶";
                a.appendChild(playIcon);
            }
            layer.appendChild(a);
        });

        const syncLayer = () => {
            if (!img) return;
            layer.style.width = img.clientWidth + 'px';
            layer.style.height = img.clientHeight + 'px';
            layer.style.top = img.offsetTop + 'px';
            layer.style.left = img.offsetLeft + 'px';
        };
        img.onload = syncLayer;
        window.onresize = syncLayer;
        syncLayer();
        const videoAlert = document.getElementById('video-playing-now');
        if (videoAlert) videoAlert.style.display = hasVideo ? 'flex' : 'none';
    }

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    let activeIdx = -1;
    for (let i = 0; i <= index; i++) {
        if (document.getElementById(`nav-item-${i}`)) activeIdx = i;
    }
    if (activeIdx !== -1) {
        const item = document.getElementById(`nav-item-${activeIdx}`);
        if (item) item.classList.add('active');
        const title = document.getElementById('header-title');
        if (title) title.textContent = metadata[activeIdx].section || "TacTiq Credentials";
    }

    document.querySelectorAll('[data-year]').forEach(el => {
        const isActive = el.dataset.year === page.year;
        el.style.color = isActive ? "var(--highlight-gold)" : "var(--text)";
        el.style.opacity = isActive ? "1" : "0.5";
    });
}

function changeSlide(dir) {
    loadSlide(currentIndex + dir);
}

document.addEventListener('DOMContentLoaded', init);