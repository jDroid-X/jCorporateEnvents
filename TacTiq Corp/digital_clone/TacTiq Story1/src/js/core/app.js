/**
 * TacTiq Digital Clone - Core Application Logic
 * Enterprise Restructured Version
 */

let currentIndex = 0;

function init() {
    // Central Theme Synchronization
    if (window.ThemeManager) {
        window.ThemeManager.initSync();
    }

    buildUI();
    loadSlide(0);

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const prevSectionBtn = document.getElementById('prev-section-btn');
    const nextSectionBtn = document.getElementById('next-section-btn');
    const fsBtn = document.getElementById('fs-btn');

    if (prevBtn) prevBtn.onclick = () => changeSlide(-1);
    if (nextBtn) nextBtn.onclick = () => changeSlide(1);
    if (menuToggle) menuToggle.onclick = () => document.getElementById('sidebar').classList.toggle('open');
    if (prevSectionBtn) prevSectionBtn.onclick = () => changeSlide(-1);
    if (nextSectionBtn) nextSectionBtn.onclick = () => changeSlide(1);

    if (fsBtn) {
        fsBtn.onclick = () => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen();
            else document.exitFullscreen();
        };
    }

    window.addEventListener('keydown', e => {
        const gridOverlay = document.getElementById('strategy-grid-overlay');
        if (gridOverlay && gridOverlay.style.display === 'block') return;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') changeSlide(-1);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') changeSlide(1);
    });
}
function buildUI() {
    const menu = document.getElementById('nav-menu');
    const yearBox = document.getElementById('year-filter');

    let lastSection = "";
    let years = new Set();
    const data = window.metadata || [];

    data.forEach((page, idx) => {
        if (page.section && page.section !== lastSection) {
            const item = document.createElement('div');
            item.className = 'nav-item';
            let displayText = page.section;
            if (page.title && !page.title.includes("62%")) displayText += `: ${page.title.substring(0, 15)}...`;
            item.textContent = displayText;
            item.id = `nav-item-${idx}`;
            item.onclick = () => {
                loadSlide(idx);
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('open');
            };
            if (menu) menu.appendChild(item);
            lastSection = page.section;
        }
        if (page.year) years.add(page.year);
    });

    Array.from(years).sort().forEach(year => {
        const pill = document.createElement('button');
        pill.className = 'stories-btn'; // Reusing stories-btn style for year pills
        pill.style.opacity = "0.7";
        pill.textContent = year;
        pill.dataset.year = year;
        pill.onclick = () => {
            buildStrategyGrid(year);
            const gridOverlay = document.getElementById('strategy-grid-overlay');
            if (gridOverlay) gridOverlay.style.display = 'block';
        };
        if (yearBox) yearBox.appendChild(pill);
    });

    // Stories Menu (Header)
    const headerStories = document.getElementById('header-stories-container');
    if (headerStories) {
        const storiesBtn = document.createElement('button');
        storiesBtn.className = 'stories-btn';
        storiesBtn.textContent = 'Stories';

        const storiesPopup = document.createElement('div');
        storiesPopup.id = 'stories-popup-menu';
        storiesPopup.className = 'glass-popup';
        storiesPopup.style.right = '0';
        storiesPopup.style.top = '40px';
        storiesPopup.style.width = '180px';

        const storiesList = [
            { name: 'TacTiq Story 1', url: '../TacTiq Story1/index.html' },
            { name: 'TacTiq Story 2', url: '../TacTiq Story2/index.html' },
            { name: 'TacTiq Story 3', url: '../TacTiq Story3/index.html' },
            { name: 'TacTiq Story 4', url: '../TacTiq Story4/index.html' },
            { name: 'TacTiq Story 5', url: '../TacTiq Story5/vogue_fashion/index.html' },
            { name: 'PDF Stories', url: '../PDF Stories/index.html' }
        ];

        storiesList.forEach(story => {
            const row = document.createElement('div');
            row.className = 'theme-opt';
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

            // Close other popups safely
            const tm = document.getElementById('theme-popup-menu');
            if (tm) tm.style.display = 'none';

            storiesPopup.style.display = isVisible ? 'none' : 'block';
            e.stopPropagation();
        };
        document.addEventListener('click', () => storiesPopup.style.display = 'none');
        headerStories.appendChild(storiesBtn);
    }

    // Theme Switcher (Header)
    const headerTheme = document.getElementById('header-theme-container');
    if (headerTheme) {
        const themeBtn = document.createElement('button');
        themeBtn.id = 'theme-switch-btn';
        themeBtn.className = 'theme-switch-btn';
        themeBtn.innerHTML = '🎨';

        const menuPopup = document.createElement('div');
        menuPopup.id = 'theme-popup-menu';
        menuPopup.className = 'glass-popup';
        menuPopup.style.right = '0';
        menuPopup.style.top = '40px';
        menuPopup.style.width = '180px';

        function renderThemeMenu() {
            menuPopup.innerHTML = '';
            if (!window.ThemeManager) return;

            const currentKey = localStorage.getItem('tactiq-theme-key');
            const currentName = localStorage.getItem('tactiq-theme-name');

            function addMenuRow(key, name, colors, isCustom) {
                const row = document.createElement('div');
                const isActive = name === currentName || (!currentName && key === 'default');
                row.style.cssText = `padding:12px; font-size:0.8rem; color:${isActive ? 'var(--text-gold)' : 'white'}; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; display:flex; justify-content:space-between; align-items:center;`;
                row.innerHTML = `<span>${name}</span>`;

                row.onclick = (e) => {
                    e.stopPropagation();
                    if (window.ThemeManager) window.ThemeManager.setTheme(key, name, colors);
                    renderThemeMenu();
                };
                menuPopup.appendChild(row);
            }

            addMenuRow('default', 'Default Theme', null, false);

            try {
                const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
                const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
                const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');

                activeCustoms.forEach(t => {
                    const themeIdx = savedThemes.findIndex(st => st.name === t.name);
                    const colors = savedElements.map(el => el.colors[themeIdx]);
                    addMenuRow('custom', t.name, colors, true);
                });
            } catch (e) { }

            // Designer Link
            const designerRow = document.createElement('div');
            designerRow.style.cssText = "padding:12px; border-top:1px solid rgba(255,255,255,0.1); margin-top:5px; text-align:center; cursor:pointer;";
            designerRow.innerHTML = `<a href="src/theme/jWebThemePalette.html" target="_blank" style="color:var(--text-gold); font-weight:700; text-decoration:none; font-size:0.8rem;">Designer</a>`;
            designerRow.onclick = (e) => {
                e.stopPropagation();
                window.open('src/theme/jWebThemePalette.html', '_blank');
                menuPopup.style.display = 'none';
            };
            menuPopup.appendChild(designerRow);
        }

        renderThemeMenu();
        themeBtn.appendChild(menuPopup);
        headerTheme.appendChild(themeBtn);

        window.onfocus = () => renderThemeMenu();

        // Palette Button Toggle (touch friendly)
        themeBtn.onclick = (e) => {
            e.stopPropagation();
            const isVisible = menuPopup.style.display === 'block';

            // Close other popups safely
            const sp = document.getElementById('stories-popup-menu');
            if (sp) sp.style.display = 'none';

            menuPopup.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) renderThemeMenu();
        };

        menuPopup.onclick = (e) => e.stopPropagation();
        document.addEventListener('click', () => menuPopup.style.display = 'none');
    }
}

function buildStrategyGrid(targetYear = null) {
    const grid = document.getElementById('grid-content');
    const gridCont = document.getElementById('grid-content');
    const gridOverlay = document.getElementById('strategy-grid-overlay');
    const data = window.metadata || [];

    if (grid) grid.innerHTML = '';
    if (gridCont) gridCont.classList.remove('active');

    const slideViewport = document.getElementById('slide-viewport');
    if (slideViewport) slideViewport.style.display = 'none';
    if (gridOverlay) gridOverlay.style.display = 'block';

    setTimeout(() => {
        if (gridCont) gridCont.classList.add('active');
    }, 10);

    document.querySelectorAll('[data-year]').forEach(btn => {
        const isActive = btn.dataset.year === targetYear;
        btn.style.borderColor = isActive ? "var(--highlight-gold)" : "var(--accent)";
        btn.style.color = isActive ? "var(--highlight-gold)" : "var(--text)";
        btn.style.opacity = isActive ? "1" : "0.5";
    });

    let itemsToDisplay = targetYear
        ? data.map((page, idx) => ({ page, idx })).filter(x => x.page.year === targetYear)
        : data.map((page, idx) => ({ page, idx })).filter(x => x.page.year);

    itemsToDisplay.forEach(item => {
        const tile = document.createElement('div');
        tile.className = 'strategy-tile';
        tile.innerHTML = `
            <h3>${item.page.section || 'Event'}</h3>
            <h4>${item.page.title ? item.page.title : 'Details'}</h4>
            <div class="tile-year-badge">${item.page.year || 'Showcase'}</div>
        `;
        tile.onclick = () => loadSlide(item.idx);
        grid.appendChild(tile);
    });
}

function loadSlide(index) {
    const data = window.metadata || [];
    if (index < 0 || index >= data.length) return;
    currentIndex = index;
    const page = data[index];

    const gridOverlay = document.getElementById('strategy-grid-overlay');
    if (gridOverlay) gridOverlay.style.display = 'none';

    const viewport = document.getElementById('slide-viewport');
    if (viewport) viewport.style.display = 'flex';

    const info = document.getElementById('page-info');
    if (info) info.textContent = `PAGE ${page.number} OF ${data.length}`;

    const textContainer = document.getElementById('slide-text-container');
    if (textContainer) {
        if (viewport) {
            viewport.style.backgroundImage = "url('images/page_1%20background.png')";
            viewport.style.backgroundSize = "cover";
            viewport.style.backgroundPosition = "center";
        }

        let htmlContent = '';
        let imgSrc = `images/nobg/page_${page.number}.webp`;
        if (page.number === 1) imgSrc = `images/${page.image}`;

        let linksHtml = '';
        if (page.links && page.links.length > 0) {
            page.links.forEach((link, lIdx) => {
                const rect = (link.rect && link.rect.length === 4) ? link.rect : [0.4, 0.05, 0.6, 0.15];
                const left = rect[0] * 100;
                const top = rect[1] * 100;
                const width = (rect[2] - rect[0]) * 100;
                const height = (rect[3] - rect[1]) * 100;
                linksHtml += `<a href="${link.url}" target="_blank" style="position: absolute; left: ${left}%; top: ${top}%; width: ${width}%; height: ${height}%; z-index: 100; cursor: pointer;" title="${link.is_video ? 'Watch Video' : 'Explore Link'}"></a>`;
            });
        }

        htmlContent += `
            <div class="single-image-layout">
                <div class="slide-image-frame" style="aspect-ratio: ${page.width || 1440} / ${page.height || 810};">
                    <img src="${imgSrc}" onerror="this.onerror=null; this.src='images/${page.image}';" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;" alt="${page.title || 'Event Image'}">
                    ${linksHtml}
                </div>
            </div>
        `;
        textContainer.innerHTML = htmlContent;

        // Entrance animation
        textContainer.style.opacity = 0;
        textContainer.style.transform = 'translateY(15px)';
        setTimeout(() => {
            textContainer.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            textContainer.style.opacity = 1;
            textContainer.style.transform = 'translateY(0)';
        }, 10);
    }

    const videoAlert = document.getElementById('video-playing-now');
    if (videoAlert) videoAlert.style.display = (page.links && page.links.some(l => l.is_video)) ? 'block' : 'none';

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    let activeIdx = -1;
    for (let i = 0; i <= index; i++) {
        if (document.getElementById(`nav-item-${i}`)) activeIdx = i;
    }
    if (activeIdx !== -1) {
        const activeItem = document.getElementById(`nav-item-${activeIdx}`);
        if (activeItem) activeItem.classList.add('active');
        const title = document.getElementById('header-title');
        if (title) title.textContent = data[activeIdx].section || "TacTiq Credentials";
    }

    document.querySelectorAll('[data-year]').forEach(el => {
        const isActive = el.dataset.year === page.year;
        el.style.borderColor = isActive ? "var(--highlight-gold)" : "var(--accent)";
        el.style.color = isActive ? "var(--highlight-gold)" : "var(--text)";
        el.style.opacity = isActive ? "1" : "0.5";
    });
}

function changeSlide(dir) {
    loadSlide(currentIndex + dir);
}

// Global initialization
window.addEventListener('DOMContentLoaded', init);
