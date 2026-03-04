document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // Safely get pagesContent
    let pagesContent = [];
    try {
        pagesContent = window.pagesContent || [];
        if (pagesContent.length === 0) {
            console.warn('Theme Warning: window.pagesContent is empty or undefined.');
        }
    } catch (e) {
        console.error('Theme Error: Could not access pagesContent', e);
    }

    // Render sections
    if (mainContent && pagesContent.length > 0) {
        mainContent.innerHTML = ''; // Clear placeholder
        pagesContent.forEach((page) => {
            const section = document.createElement('section');
            section.id = `page-${page.id}`;
            section.className = 'page-section';

            let contentHTML = `
                <div class="content-box fade-in">
                    ${page.subtitle ? `<h3 class="page-subtitle">${page.subtitle}</h3>` : ''}
                    <h2 class="page-title">${page.title}</h2>
                    ${page.description ? `<p class="page-desc">${page.description}</p>` : ''}
            `;

            if (page.points) {
                contentHTML += `
                    <div class="points-grid">
                        ${page.points.map(point => `<div class="point-item"><p>${point}</p></div>`).join('')}
                    </div>
                `;
            }

            if (page.services) {
                contentHTML += `
                    <div class="expertise-list">
                        ${page.services.map(s => `
                            <div class="expertise-item">
                                <h4>${s.name}</h4>
                                <p style="font-size: 0.9rem;">${s.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (page.expertise) {
                contentHTML += `
                    <div class="expertise-list">
                        ${page.expertise.map(e => `
                            <div class="expertise-item">
                                <h4>${e.title}</h4>
                                <p style="font-size: 0.85rem; opacity: 0.7;">${e.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            contentHTML += `</div>`;

            const imageHTML = `
                <div class="image-box fade-in">
                    <img src="${page.image}" alt="${page.title}" onerror="this.src='https://via.placeholder.com/800x1200?text=Image+Not+Found'">
                </div>
            `;

            section.innerHTML = contentHTML + imageHTML;
            mainContent.appendChild(section);
        });
    }

    // Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Dropdown Logic
    const paletteTrigger = document.getElementById('palette-trigger');
    const paletteDropdown = document.getElementById('palette-dropdown');
    const paletteListCont = document.getElementById('palette-list-container');
    const storiesTrigger = document.getElementById('stories-trigger');
    const storiesDropdown = document.getElementById('stories-dropdown');

    function renderPaletteMenu() {
        if (!paletteListCont) return;
        paletteListCont.innerHTML = '';

        let savedThemes = [];
        let savedElements = [];
        try {
            savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
            savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
        } catch (e) {
            console.error('ThemeManager: localStorage parse error', e);
        }

        const currentName = localStorage.getItem('tactiq-theme-name');

        const addRow = (key, name, colors, isCustom) => {
            const a = document.createElement('a');
            a.href = "javascript:void(0)";
            a.className = "theme-opt";
            const isActive = (name === currentName || (!currentName && key === 'default'));
            if (isActive) a.style.color = 'var(--accent)';

            a.innerHTML = `<span>${name}</span>`;

            if (isCustom) {
                const del = document.createElement('span');
                del.innerHTML = '×';
                del.style.cssText = "color:#ff4444; font-size:1.1rem; padding:0 5px; opacity:0.5; cursor:pointer;";
                del.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm(`Unpin "${name}"?`)) {
                        const allThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
                        const theTheme = allThemes.find(t => t.name === name);
                        if (theTheme) theTheme.active = false;
                        localStorage.setItem('tactiq-matrix-themes', JSON.stringify(allThemes));
                        renderPaletteMenu();
                    }
                };
                a.appendChild(del);
            }

            a.onclick = (e) => {
                e.stopPropagation();
                if (window.ThemeManager) {
                    window.ThemeManager.setTheme(key, name, colors);
                    renderPaletteMenu();
                }
                if (paletteDropdown) paletteDropdown.classList.remove('active');
                closeAllOverlays();
            };
            paletteListCont.appendChild(a);
        };

        addRow('default', 'Default Glass', null, false);

        // Active Custom Themes
        const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');
        activeCustoms.forEach(t => {
            const themeIdx = savedThemes.findIndex(st => st.name === t.name);
            const colors = savedElements.map(el => el.colors[themeIdx]);
            addRow('custom', t.name, colors, true);
        });

        // Designer Link
        const designerRow = document.createElement('div');
        designerRow.className = 'dropdown-designer-link';
        designerRow.innerHTML = `<a href="../../../jWebTheme/index.html" target="_blank">Designer</a>`;
        designerRow.onclick = (e) => {
            e.stopPropagation();
            window.open('../../../jWebTheme/index.html', '_blank');
            if (paletteDropdown) paletteDropdown.classList.remove('active');
            closeAllOverlays();
        };
        paletteListCont.appendChild(designerRow);
    }

    // Interaction Login
    if (paletteTrigger && paletteDropdown) {
        paletteTrigger.onclick = (e) => {
            e.stopPropagation();
            const isVisible = paletteDropdown.classList.contains('active');
            if (storiesDropdown) storiesDropdown.classList.remove('active');
            if (!isVisible) {
                renderPaletteMenu();
                paletteDropdown.classList.add('active');
            } else {
                paletteDropdown.classList.remove('active');
            }
        };
    }

    if (storiesTrigger && storiesDropdown) {
        storiesTrigger.onclick = (e) => {
            e.stopPropagation();
            const isVisible = storiesDropdown.classList.contains('active');
            if (paletteDropdown) paletteDropdown.classList.remove('active');
            if (!isVisible) {
                storiesDropdown.classList.add('active');
            } else {
                storiesDropdown.classList.remove('active');
            }
        };
    }

    // Mobile Menu Logic
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navList = document.getElementById('nav-list');
    const menuOverlay = document.getElementById('menu-overlay');

    if (mobileToggle) {
        mobileToggle.onclick = () => {
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            if (menuOverlay) menuOverlay.classList.toggle('active');
        };
    }

    if (menuOverlay) {
        menuOverlay.onclick = () => {
            navList.classList.remove('active');
            mobileToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
        };
    }

    document.addEventListener('click', (e) => {
        if (paletteDropdown && !paletteDropdown.contains(e.target) && e.target !== paletteTrigger) {
            paletteDropdown.classList.remove('active');
        }
        if (storiesDropdown && !storiesDropdown.contains(e.target) && e.target !== storiesTrigger) {
            storiesDropdown.classList.remove('active');
        }
    });

    // Initializations
    renderPaletteMenu();
    window.onfocus = () => renderPaletteMenu();
    if (window.ThemeManager) {
        window.ThemeManager.initSync();
    }

    // Global Navigation & Overlay Handler
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href === 'javascript:void(0)') return;

        // 1. Internal Anchors (#)
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            if (targetId === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Close any open overlays for anchors
            closeAllOverlays();
        }
        // 2. External / Other Stories (../../)
        else {
            // Ensure overlays close before navigating to other pages
            // This prevents the menu from 'staying open' if the browser takes time to load
            closeAllOverlays();
            // Normal navigation follows (no preventDefault)
        }
    });

    function closeAllOverlays() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navList = document.getElementById('nav-list');
        const menuOverlay = document.getElementById('menu-overlay');

        if (navList) navList.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');

        if (paletteDropdown) paletteDropdown.classList.remove('active');
        if (storiesDropdown) storiesDropdown.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }

    // Logo Scroll Logic
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            // If already on the main landing or a specific page, we let the href="../../../index.html" handle it
            closeAllOverlays();
        });
    }

    // Parallax & Scroll Effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.image-box img').forEach(img => {
            const parent = img.parentElement;
            const rect = parent.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (window.innerHeight * 0.5 - (rect.top + rect.height / 2)) * 0.15;
                img.style.transform = `scale(1.15) translateY(${shift}px)`;
            }
        });

        // Header Blur on Scroll
        const header = document.getElementById('site-header');
        if (header) {
            if (scrolled > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--header-bg)';
                header.style.backdropFilter = 'none';
            }
        }
    });
});

