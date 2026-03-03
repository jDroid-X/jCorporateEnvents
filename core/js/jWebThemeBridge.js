/**
 * TacTiq Enterprise - Simplified Theme Bridge
 * Connects the Website to the Atmosphere Designer
 */

(function () {
    const KEYS = {
        THEMES: 'tactiq-matrix-themes',
        ELEMENTS: 'tactiq-matrix-elements',
        CONFIG: 'tactiq-sync-config'
    };

    function init() {
        // Ensure ThemeManager is available
        if (!window.ThemeManager) {
            console.error("Theme Bridge: ThemeManager not found. Ensure ThemeManager.js is loaded first.");
            return;
        }

        // Initialize UI
        const config = JSON.parse(localStorage.getItem(KEYS.CONFIG) || '{"position":"top-right"}');
        createUI(config.position);

        // Apply active theme (already handled by ThemeManager.initSync if included, 
        // but we'll trigger it once here to be sure)
        window.ThemeManager.applyActiveTheme();
    }

    function createUI(pos) {
        // 1. Floating Trigger (Jdroid-X Logo)
        const trigger = document.createElement('div');
        trigger.id = 'tactiq-palette-trigger';
        trigger.title = "Open Atmosphere Menu";
        trigger.innerHTML = `<img src="https://raw.githubusercontent.com/manish-m-sharma/TacTiq-Theme-Palette/main/jdroidxlogo.png" style="width:24px; height:auto; filter: drop-shadow(0 0 5px #FF9933);">`;

        Object.assign(trigger.style, {
            position: 'fixed',
            zIndex: '10000',
            cursor: 'pointer',
            padding: '8px',
            background: 'rgba(0,0,0,0.85)',
            border: '1px solid #FF9933',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 0 15px rgba(255, 153, 51, 0.3)',
            backdropFilter: 'blur(5px)'
        });

        if (pos.includes('top')) trigger.style.top = '15px';
        else trigger.style.bottom = '15px';

        if (pos.includes('left')) trigger.style.left = '15px';
        else trigger.style.right = '15px';

        document.body.appendChild(trigger);

        // 2. Atmosphere Menu
        const menu = document.createElement('div');
        menu.id = 'tactiq-palette-menu';
        Object.assign(menu.style, {
            position: 'fixed',
            zIndex: '9999',
            background: '#0a0a0a',
            border: '1px solid rgba(255,153,51,0.2)',
            borderRadius: '12px',
            width: '220px',
            padding: '12px',
            display: 'none',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.9)',
            fontFamily: "'Inter', sans-serif",
            backdropFilter: 'blur(10px)',
            color: '#fff'
        });

        if (pos.includes('top')) menu.style.top = '60px';
        else menu.style.bottom = '60px';

        if (pos.includes('left')) menu.style.left = '15px';
        else menu.style.right = '15px';

        document.body.appendChild(menu);

        // Toggle Logic
        trigger.onclick = (e) => {
            e.stopPropagation();
            const isOpen = menu.style.display === 'flex';
            menu.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) {
                renderMenu(menu);
                trigger.style.transform = 'scale(0.9) rotate(45deg)';
            } else {
                trigger.style.transform = 'scale(1) rotate(0deg)';
            }
        };

        // Close when clicking outside
        document.addEventListener('click', () => {
            menu.style.display = 'none';
            trigger.style.transform = 'scale(1) rotate(0deg)';
        });
        menu.onclick = (e) => e.stopPropagation();
    }

    function renderMenu(container) {
        container.innerHTML = `
            <div style="font-size: 0.55rem; color: #888; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px; font-weight: 800;">
                Atmosphere Control
            </div>
            <button id="btn-open-designer" style="${getBtnStyle(true)}">
                <span>⚡ Atmosphere Designer</span>
                <span style="font-size:0.5rem; opacity:0.6;">NEW WINDOW</span>
            </button>
            <div style="height: 1px; background: rgba(255,255,255,0.05); margin: 4px 0;"></div>
            <div id="pinned-themes-list" style="display:flex; flex-direction:column; gap:6px;"></div>
        `;

        const designerBtn = container.querySelector('#btn-open-designer');
        designerBtn.onclick = () => {
            // Most stories are in digital_clone/<StoryName>/index.html
            // Or core/js/ (if testing there, though unlikely to run directly)
            // We use ../../ to escape the story folder and enter the root
            window.open('../../jWebTheme/index.html', '_blank');
        };

        const list = container.querySelector('#pinned-themes-list');
        const themes = JSON.parse(localStorage.getItem(KEYS.THEMES) || '[]');
        const pinnedThemes = themes.filter(t => t.active);

        // Default Option
        const defaultBtn = document.createElement('button');
        defaultBtn.innerHTML = `<span>Website Default</span>`;
        defaultBtn.style.cssText = getBtnStyle(false);
        defaultBtn.onclick = () => {
            window.ThemeManager.setTheme('default', 'Default Theme');
            container.style.display = 'none';
        };
        list.appendChild(defaultBtn);

        if (pinnedThemes.length === 0) {
            const tip = document.createElement('div');
            tip.style.cssText = "font-size:0.6rem; color:#666; padding:10px; text-align:center; font-style:italic;";
            tip.innerText = "No atmospheres pinned. Use the Designer to add themes.";
            list.appendChild(tip);
        }

        pinnedThemes.forEach(theme => {
            const btn = document.createElement('button');
            btn.innerHTML = `<span>${theme.name}</span>`;
            const currentName = localStorage.getItem('tactiq-theme-name');
            const isActive = currentName === theme.name;

            btn.style.cssText = getBtnStyle(false, isActive);
            btn.onclick = () => {
                window.ThemeManager.setTheme('custom', theme.name);
                container.style.display = 'none';
            };
            list.appendChild(btn);
        });
    }

    function getBtnStyle(isPrimary = false, isActive = false) {
        return `
            background: ${isPrimary ? 'var(--accent, #FF9933)' : (isActive ? 'rgba(255,153,51,0.15)' : 'rgba(255,255,255,0.03)')};
            color: ${isPrimary ? '#000' : (isActive ? '#FF9933' : '#ccc')};
            border: 1px solid ${isPrimary ? '#FF9933' : (isActive ? '#FF9933' : 'rgba(255,255,255,0.05)')};
            padding: 10px 12px;
            border-radius: 6px;
            font-size: 0.7rem;
            font-weight: 700;
            text-align: left;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            transition: 0.2s;
            gap: 2px;
        `;
    }

    // Auto-update if data changes in designer
    window.addEventListener('storage', (e) => {
        if (e.key === KEYS.THEMES || e.key === KEYS.ELEMENTS) {
            window.ThemeManager.applyActiveTheme();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
