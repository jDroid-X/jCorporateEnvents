document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Active Link Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPath) && currentPath !== '/') {
            link.style.color = 'var(--clr-secondary)';
        }
    });

    // Theme Synchronization Logic
    const syncTheme = (themeData = null) => {
        let elements, themes, themeIdx;

        if (themeData) {
            elements = themeData.elements;
            themes = themeData.themes;
            themeIdx = themeData.themeIdx;
        } else {
            const savedElements = localStorage.getItem('jdroid-x-matrix-elements');
            const savedThemes = localStorage.getItem('jdroid-x-matrix-themes');

            if (savedElements && savedThemes) {
                elements = JSON.parse(savedElements);
                themes = JSON.parse(savedThemes);
                const activeThemeIdx = themes.findIndex(t => t.active);
                themeIdx = activeThemeIdx !== -1 ? activeThemeIdx : 0;
            } else {
                return;
            }
        }

        elements.forEach(el => {
            if (el.mapping && el.colors[themeIdx]) {
                document.documentElement.style.setProperty(`--${el.mapping}`, el.colors[themeIdx]);
            }
        });

        updateThemeDropdown(themes, themeIdx);
    };

    const updateThemeDropdown = (themes, activeIdx) => {
        let dropdown = document.querySelector('.theme-selector-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('select');
            dropdown.className = 'theme-selector-dropdown';

            dropdown.onchange = (e) => {
                const idx = parseInt(e.target.value);
                const savedElements = JSON.parse(localStorage.getItem('jdroid-x-matrix-elements'));
                const savedThemes = JSON.parse(localStorage.getItem('jdroid-x-matrix-themes'));

                // Update active status in storage
                savedThemes.forEach((t, i) => t.active = (i === idx));
                localStorage.setItem('jdroid-x-matrix-themes', JSON.stringify(savedThemes));

                syncTheme({ elements: savedElements, themes: savedThemes, themeIdx: idx });
            };

            document.body.appendChild(dropdown);
        }

        dropdown.innerHTML = themes.map((t, i) =>
            `<option value="${i}" ${i === activeIdx ? 'selected' : ''}>${t.name}</option>`
        ).join('');
    };

    // Initial sync and listen for storage changes
    syncTheme();
    window.addEventListener('storage', (e) => {
        if (e.key === 'jdroid-x-matrix-elements' || e.key === 'jdroid-x-matrix-themes') {
            syncTheme();
        }
    });

    // Add Theme Palette Trigger if not present
    if (!document.querySelector('.theme-palette-trigger')) {
        const trigger = document.createElement('div');
        trigger.className = 'theme-palette-trigger';
        trigger.setAttribute('title', 'Open Theme Designer');

        // Check for custom path in storage
        let palettePath = localStorage.getItem('jdroid-x-designer-path');

        if (!palettePath) {
            palettePath = '../jWebTheme/jWebThemePalette.html';
            const depth = (window.location.pathname.split('Jungle Safari/')[1] || '').split('/').length - 1;
            if (depth > 0) {
                palettePath = '../'.repeat(depth + 1) + 'jWebTheme/jWebThemePalette.html';
            }
        }

        trigger.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19M19,11.5C19,11.78 18.78,12 18.5,12C18.22,12 18,11.78 18,11.5C18,11.22 18.22,11 18.5,11C18.78,11 19,11.22 19,11.5M16.5,8.5C16.5,8.78 16.28,9 16,9C15.72,9 15.5,8.78 15.5,8.5C15.5,8.22 15.72,8 16,8C16.28,8 16.5,8.22 16.5,8.5M12,7C12.28,7 12.5,7.22 12.5,7.5C12.5,7.78 12.28,8 12,8C11.72,8 11.5,7.78 11.5,7.5C11.5,7.22 11.72,7 12,7M7.5,9C7.78,9 8,9.22 8,9.5C8,9.78 7.78,10 7.5,10C7.22,10 7,9.78 7,9.5C7,9.22 7.22,9 7.5,9M6,13C6.28,13 6.5,13.22 6.5,13.5C6.5,13.78 6.28,14 6,14C5.72,14 5.5,13.78 5.5,13.5C5.5,13.22 5.72,13 6,13Z" />
            </svg>
        `;

        trigger.onclick = async () => {
            try {
                // Verification attempt (Best effort for paths)
                const check = await fetch(palettePath, { method: 'HEAD' });
                if (check.ok || palettePath.startsWith('http')) {
                    window.open(palettePath, '_blank');
                } else {
                    throw new Error("Missing");
                }
            } catch (e) {
                const manualPath = prompt("⚠️ THEME DESIGNER NOT FOUND\n\nCurrent path: " + palettePath + "\n\nPlease enter the correct path or GitHub URL to jWebThemePalette.html:", palettePath);
                if (manualPath) {
                    localStorage.setItem('jdroid-x-designer-path', manualPath);
                    window.open(manualPath, '_blank');
                    location.reload(); // Refresh to update internal path
                }
            }
        };

        document.body.appendChild(trigger);
    }
});
