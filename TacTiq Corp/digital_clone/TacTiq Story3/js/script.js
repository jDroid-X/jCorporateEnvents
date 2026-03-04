document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Create Backdrop if it doesn't exist
    let backdrop = document.querySelector('.menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        document.body.appendChild(backdrop);
    }

    const updateHamburger = (isActive) => {
        const spans = menuToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    const toggleMenu = (forceState = null) => {
        const isActive = forceState !== null ? forceState : !navLinks.classList.contains('active');

        if (isActive) {
            navLinks.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            navLinks.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }

        updateHamburger(isActive);
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => toggleMenu());
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => toggleMenu(false));
    }

    // 2. Mobile Dropdown Toggle (Accordion)
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdownMenu = trigger.nextElementSibling;
                if (!dropdownMenu) return;

                const isActive = dropdownMenu.classList.toggle('active');

                // Rotate chevron
                const chevron = trigger.querySelector('.chevron');
                if (chevron) {
                    chevron.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0)';
                    chevron.style.transition = 'transform 0.4s ease';
                }
            }
        });
    });

    // Close on link click
    const navLinksList = navLinks.querySelectorAll('a:not(.dropdown-trigger)');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                setTimeout(() => toggleMenu(false), 300);
            }
        });
    });

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Reveal animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));

    // 5. Tactiq Menus Logic (Unified from Story2)
    const tactiqMenus = document.getElementById('tactiq-menus');
    if (tactiqMenus) {
        // Unified Stories Menu
        if (window.StoriesManager) {
            window.StoriesManager.renderMenu(tactiqMenus);
        }

        // Palette Icon Menu (Theme Switcher)
        const themeBtn = document.createElement('button');
        themeBtn.id = 'theme-switch-btn';
        themeBtn.innerHTML = '🎨';

        const themePopup = document.createElement('div');
        themePopup.className = 'glass theme-menu-popup';
        themePopup.style.display = 'none';

        function renderThemeMenu() {
            themePopup.innerHTML = '';
            const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
            const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
            const currentName = localStorage.getItem('tactiq-theme-name') || 'Default Theme';

            function addMenuRow(key, name, colors, isCustom) {
                const row = document.createElement('div');
                row.className = 'theme-menu-row';
                const isActive = name === currentName;
                if (isActive) {
                    row.style.color = 'var(--text-gold)';
                    row.style.fontWeight = 'bold';
                }
                row.style.cssText += "padding:12px; font-size: 0.75rem; cursor:pointer; border-bottom:1px solid rgba(255,255,255,0.05); color: var(--text, #fff);";
                row.innerHTML = `<span>${name}</span>`;

                row.onclick = (e) => {
                    e.stopPropagation();
                    if (window.ThemeManager) {
                        window.ThemeManager.setTheme(key, name, colors);
                    }
                    renderThemeMenu();
                };
                themePopup.appendChild(row);
            }

            addMenuRow('default', 'Default Theme', null, false);

            const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');
            activeCustoms.forEach(t => {
                const themeIdx = savedThemes.findIndex(st => st.name === t.name);
                const colors = savedElements.map(el => el.colors[themeIdx]);
                addMenuRow('custom', t.name, colors, true);
            });

            // Designer Link
            const designerRow = document.createElement('div');
            designerRow.className = 'theme-menu-row';
            designerRow.style.cssText = "border-top:1px solid rgba(255,255,255,0.1); margin-top:5px; text-align:center; padding: 12px;";

            const path = decodeURIComponent(window.location.pathname);
            const parts = path.split(/[\\\/]/).filter(p => p);
            const dcIndex = parts.lastIndexOf('digital_clone');
            let designerBase = '../../jWebTheme/index.html';

            if (dcIndex !== -1) {
                const segmentsAfterDC = parts.length - dcIndex - 1;
                const lastIsFile = parts.length > 0 && parts[parts.length - 1].includes('.');
                const folderDepth = lastIsFile ? segmentsAfterDC - 1 : segmentsAfterDC;
                const totalUp = folderDepth + 2;
                designerBase = '../'.repeat(totalUp) + 'jWebTheme/index.html';
            }

            designerRow.innerHTML = `<a href="${designerBase}" target="_blank" style="color:var(--text-gold); font-weight:700; text-decoration:none; font-size:0.8rem;">Designer</a>`;
            designerRow.onclick = (e) => {
                e.stopPropagation();
                window.open(designerBase, '_blank');
                themePopup.style.display = 'none';
            };
            themePopup.appendChild(designerRow);
        }

        renderThemeMenu();
        themeBtn.appendChild(themePopup);

        themeBtn.onclick = (e) => {
            e.stopPropagation();
            const storiesPopup = document.getElementById('stories-popup-menu');
            if (storiesPopup) storiesPopup.style.display = 'none';

            const isVisible = themePopup.style.display === 'block';
            themePopup.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) renderThemeMenu();
        };

        themeBtn.onmouseenter = () => {
            const storiesPopup = document.getElementById('stories-popup-menu');
            if (storiesPopup) storiesPopup.style.display = 'none';
            renderThemeMenu();
            themePopup.style.display = 'block';
        };

        themeBtn.onmouseleave = () => {
            setTimeout(() => {
                if (!themePopup.matches(':hover')) themePopup.style.display = 'none';
            }, 300);
        };

        if (!document.getElementById('theme-switch-btn')) tactiqMenus.appendChild(themeBtn);
    }

    if (window.ThemeManager) {
        window.ThemeManager.initSync();
    }
});

