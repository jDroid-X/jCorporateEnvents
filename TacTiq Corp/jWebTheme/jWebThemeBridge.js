(function () {
    const SYNC_KEY_THEMES = 'jdroid-x-matrix-themes';
    const SYNC_KEY_ELEMENTS = 'jdroid-x-matrix-elements';
    const CONFIG_KEY = 'jdroid-x-sync-config';

    function init() {
        const config = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{"position":"top-right"}');
        createUI(config.position);
        applyActiveTheme();
    }

    function createUI(pos) {
        // 1. Create Floating Button
        const btn = document.createElement('div');
        btn.id = 'jdroid-x-palette-trigger';
        btn.innerHTML = `<img src="https://raw.githubusercontent.com/manish-m-sharma/TacTiq-Theme-Palette/main/jdroidxlogo.png" style="width:30px; height:auto; filter: drop-shadow(0 0 5px #FF9933);">`;

        const style = btn.style;
        style.position = 'fixed';
        style.zIndex = '99999';
        style.cursor = 'pointer';
        style.padding = '10px';
        style.background = 'var(--sidebar-ui-bg, #111)';
        style.border = '1px solid var(--primary-accent, #FF9933)';
        style.borderRadius = '50%';
        style.display = 'flex';
        style.alignItems = 'center';
        style.justifyContent = 'center';
        style.transition = '0.3s';
        style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

        if (pos.includes('top')) style.top = '20px';
        else style.bottom = '20px';

        if (pos.includes('left')) style.left = '20px';
        else style.right = '20px';

        document.body.appendChild(btn);

        // 2. Create Menu
        const menu = document.createElement('div');
        menu.id = 'jdroid-x-palette-menu';
        menu.style.cssText = `
            position: fixed;
            z-index: 99998;
            background: var(--sidebar-ui-bg, #111);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            width: 200px;
            padding: 15px;
            display: none;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
            font-family: 'Inter', sans-serif;
        `;

        if (pos.includes('top')) menu.style.top = '70px';
        else menu.style.bottom = '70px';

        if (pos.includes('left')) menu.style.left = '20px';
        else menu.style.right = '20px';

        document.body.appendChild(menu);

        btn.onclick = () => {
            const isVisible = menu.style.display === 'flex';
            menu.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) renderThemes(menu);
        };
    }

    function renderThemes(container) {
        const themes = JSON.parse(localStorage.getItem(SYNC_KEY_THEMES) || '[]');
        container.innerHTML = `<div style="font-size: 0.6rem; color: var(--primary-font, #fff); opacity: 0.6; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px;">Atmosphere Select</div>`;

        // Add Default Option
        const defaultBtn = document.createElement('button');
        defaultBtn.innerText = "Website Default";
        defaultBtn.style.cssText = styleBtn(false);
        defaultBtn.onclick = () => {
            clearTheme();
            menu.style.display = 'none';
        };
        container.appendChild(defaultBtn);

        themes.filter(t => t.active && t.visible !== false).forEach(theme => {
            const btn = document.createElement('button');
            btn.innerText = theme.name;
            btn.style.cssText = styleBtn(true);
            btn.onclick = () => {
                applyTheme(theme.name);
                container.style.display = 'none';
            };
            container.appendChild(btn);
        });
    }

    function styleBtn(isCustom) {
        return `
            background: ${isCustom ? 'var(--card-tile-bg, #222)' : '#333'};
            color: var(--primary-font, #ccc);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: 700;
            text-align: left;
            cursor: pointer;
            transition: 0.2s;
        `;
    }

    function applyTheme(themeName) {
        const themes = JSON.parse(localStorage.getItem(SYNC_KEY_THEMES) || '[]');
        const elements = JSON.parse(localStorage.getItem(SYNC_KEY_ELEMENTS) || '[]');
        const themeIdx = themes.findIndex(t => t.name === themeName);

        if (themeIdx === -1) return;

        let css = '';
        elements.forEach(el => {
            const val = el.colors[themeIdx];
            const key = el.mapping || el.name.toLowerCase().replace(/ \/ /g, '-').replace(/ & /g, '-').replace(/ /g, '-');
            css += `--${key}: ${val} !important;\n`;
        });

        let styleTag = document.getElementById('jdroid-x-active-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'jdroid-x-active-style';
            document.head.appendChild(styleTag);
        }
        styleTag.innerText = `:root {\n${css}}`;
    }

    function clearTheme() {
        const styleTag = document.getElementById('jdroid-x-active-style');
        if (styleTag) styleTag.remove();
    }

    function applyActiveTheme() {
        const themes = JSON.parse(localStorage.getItem(SYNC_KEY_THEMES) || '[]');
        const activeTheme = themes.find(t => t.active && t.visible !== false);
        if (activeTheme) {
            applyTheme(activeTheme.name);
        } else {
            clearTheme();
        }
    }

    // Auto-update if data changes in other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === SYNC_KEY_THEMES || e.key === SYNC_KEY_ELEMENTS) {
            applyActiveTheme();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
