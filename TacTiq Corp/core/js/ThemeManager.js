/**
 * TacTiq Enterprise - Central Theme Management (ROOT HUB)
 * Version: 2.0.0
 * Purpose: Centralized design control for all TacTiq stories & Designer sync.
 */

const ThemeManager = {
    keys: {
        THEMES: 'tactiq-matrix-themes',
        ELEMENTS: 'tactiq-matrix-elements',
        ACTIVE_KEY: 'tactiq-theme-key',
        ACTIVE_NAME: 'tactiq-theme-name',
        LAST_CALLER: 'tactiq-last-caller'
    },

    setTheme(themeKey, themeName, customColors = null) {
        const root = document.documentElement;
        console.log(`ThemeManager: Setting theme to ${themeName} (${themeKey})`);

        root.classList.remove('theme-custom');
        ['--bg', '--side-bg', '--header-bg', '--footer-bg', '--btn-bg', '--text', '--accent', '--accent-soft', '--highlight-gold', '--border', '--card-bg', '--scroll-thumb', '--status-ok'].forEach(p => root.style.removeProperty(p));

        if (themeKey === 'custom' && !customColors) {
            try {
                const savedThemes = JSON.parse(localStorage.getItem(this.keys.THEMES) || '[]');
                const savedElements = JSON.parse(localStorage.getItem(this.keys.ELEMENTS) || '[]');
                const themeIdx = savedThemes.findIndex(t => t.name === themeName);
                if (themeIdx !== -1) customColors = savedElements.map(el => el.colors[themeIdx]);
            } catch (e) { console.error('ThemeManager: Load error', e); }
        }

        if (customColors && customColors.length >= 7) {
            console.log('ThemeManager: Applying custom colors', customColors);
            root.classList.add('theme-custom');
            root.style.setProperty('--bg', customColors[0]);
            root.style.setProperty('--side-bg', customColors[1]);
            root.style.setProperty('--header-bg', customColors[2]);
            root.style.setProperty('--footer-bg', customColors[2]);
            root.style.setProperty('--btn-bg', customColors[3]);
            root.style.setProperty('--accent', customColors[4]);
            if (customColors[5]) root.style.setProperty('--accent-soft', customColors[5]);
            root.style.setProperty('--text', customColors[6] || customColors[5]);
            root.style.setProperty('--highlight-gold', customColors[7] || customColors[6]);
            if (customColors[8]) root.style.setProperty('--border', customColors[8]);
            if (customColors[9]) root.style.setProperty('--card-bg', customColors[9]);
            if (customColors[10]) root.style.setProperty('--scroll-thumb', customColors[10]);
            if (customColors[11]) root.style.setProperty('--status-ok', customColors[11]);
        }

        localStorage.setItem(this.keys.ACTIVE_KEY, themeKey);
        localStorage.setItem(this.keys.ACTIVE_NAME, themeName);

        const activeNameEl = document.getElementById('active-theme-name');
        if (activeNameEl) activeNameEl.textContent = themeName;

        document.querySelectorAll('.theme-opt').forEach(opt => {
            const isActive = (opt.dataset.key === themeKey && themeKey !== 'custom') || (opt.dataset.name === themeName);
            opt.classList.toggle('active', isActive);
        });
    },

    applyActiveTheme() {
        try {
            const savedName = localStorage.getItem(this.keys.ACTIVE_NAME);
            const savedKey = localStorage.getItem(this.keys.ACTIVE_KEY) || 'default';

            if (savedName && savedName !== 'Default Theme') {
                const savedThemes = JSON.parse(localStorage.getItem(this.keys.THEMES) || '[]');
                const savedElements = JSON.parse(localStorage.getItem(this.keys.ELEMENTS) || '[]');
                const themeIdx = savedThemes.findIndex(t => t.name === savedName);
                if (themeIdx !== -1) {
                    const colors = savedElements.map(el => el.colors[themeIdx]);
                    this.setTheme('custom', savedName, colors);
                    return;
                }
            }

            this.setTheme(savedKey, savedName || 'Default Theme');
        } catch (e) {
            this.setTheme('default', 'Default Theme');
        }
    },

    hardReset() {
        if (confirm('Perform Hard Reset? This will remove all custom themes and revert to factory defaults.')) {
            Object.values(this.keys).forEach(k => localStorage.removeItem(k));
            location.reload();
        }
    },

    initSync() {
        if (!window.location.href.includes('jWebTheme')) {
            localStorage.setItem(this.keys.LAST_CALLER, window.location.href);
        }

        window.addEventListener('storage', (e) => {
            if (Object.values(this.keys).includes(e.key)) {
                this.applyActiveTheme();
            }
        });
        this.applyActiveTheme();
    }
};

window.ThemeManager = ThemeManager;
