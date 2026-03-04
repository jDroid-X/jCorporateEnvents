document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Components
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
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            navLinks.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }

        updateHamburger(isActive);
        localStorage.setItem('mobile-menu-active', isActive);
    };

    // Restore Menu State (Optional - usually menu should start closed on new page)
    // if (localStorage.getItem('mobile-menu-active') === 'true') {
    //     toggleMenu(true);
    // }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => toggleMenu());
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => toggleMenu(false));
    }

    // Mobile Dropdown Toggle (Accordion)
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

    // Smooth scrolling for navigation
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

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});

// Add CSS for fade-in animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-section.visible {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(style);

// Tactiq Menus Logic
document.addEventListener('DOMContentLoaded', () => {
    const tactiqMenus = document.getElementById('tactiq-menus');
    if (!tactiqMenus) return;

    // 1. Unified Stories Menu
    if (window.StoriesManager) {
        window.StoriesManager.renderMenu(tactiqMenus);
    }

    // 2. Palette Icon Menu (Theme Switcher)
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-switch-btn';
    themeBtn.innerHTML = '🎨';

    const themePopup = document.createElement('div');
    themePopup.className = 'glass';
    themePopup.style.display = 'none';

    function renderThemeMenu() {
        themePopup.innerHTML = '';
        const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
        const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
        const currentName = localStorage.getItem('tactiq-theme-name') || 'Default Theme';

        addMenuRow('default', 'Default Theme', null, false);

        // Active Custom Themes (excluding any duplicate the user might have named "Default Theme")
        const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');
        activeCustoms.forEach(t => {
            const themeIdx = savedThemes.findIndex(st => st.name === t.name);
            const colors = savedElements.map(el => el.colors[themeIdx]);
            addMenuRow('custom', t.name, colors, true);
        });

        function addMenuRow(key, name, colors, isCustom) {
            const row = document.createElement('div');
            row.className = 'theme-menu-row';
            const isActive = name === currentName;
            if (isActive) {
                row.style.color = 'var(--accent-gold)';
                row.style.fontWeight = 'bold';
            }
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

        // Designer Link
        const designerRow = document.createElement('div');
        designerRow.className = 'theme-menu-row';
        designerRow.style.cssText = "border-top:1px solid rgba(255,255,255,0.1); margin-top:5px; text-align:center;";

        // Depth-aware base calculation
        const path = decodeURIComponent(window.location.pathname);
        const parts = path.split(/[\\\/]/).filter(p => p);
        const dcIndex = parts.lastIndexOf('digital_clone');
        let designerBase = '../../jWebTheme/index.html'; // Default for root

        if (dcIndex !== -1) {
            const segmentsAfterDC = parts.length - dcIndex - 1;
            const lastIsFile = parts.length > 0 && parts[parts.length - 1].includes('.');
            const folderDepth = lastIsFile ? segmentsAfterDC - 1 : segmentsAfterDC;

            // If depth > 0 (meaning we're inside a folder like event-solutions/), 
            // go up that many levels PLUS the 2 levels needed from TacTiq Story2 root.
            const totalUp = folderDepth + 2;
            designerBase = '../'.repeat(totalUp) + 'jWebTheme/index.html';
        }

        designerRow.innerHTML = `<a href="${designerBase}" target="_blank" style="color:var(--accent-gold); font-weight:700; text-decoration:none; font-size:0.8rem;">Designer</a>`;
        designerRow.onclick = (e) => {
            e.stopPropagation();
            window.open(designerBase, '_blank');
            themePopup.style.display = 'none';
        };
        themePopup.appendChild(designerRow);
    }

    renderThemeMenu();
    themeBtn.appendChild(themePopup);

    // Unified Toggle Interaction
    themeBtn.onclick = (e) => {
        e.stopPropagation();
        const storiesPopup = document.getElementById('stories-popup-menu');
        if (storiesPopup) storiesPopup.classList.remove('show');

        themePopup.classList.toggle('show');
        if (themePopup.classList.contains('show')) renderThemeMenu();
    };

    themeBtn.onmouseenter = () => {
        const storiesPopup = document.getElementById('stories-popup-menu');
        if (storiesPopup) storiesPopup.classList.remove('show');
        renderThemeMenu();
        themePopup.classList.add('show');
    };

    themeBtn.onmouseleave = () => {
        setTimeout(() => {
            if (!themePopup.matches(':hover')) themePopup.classList.remove('show');
        }, 300);
    };

    themePopup.onmouseleave = () => themePopup.classList.remove('show');
    themePopup.onclick = (e) => e.stopPropagation();

    // Intercept Stories Popup Toggle for transitions
    setTimeout(() => {
        const storiesBtn = tactiqMenus.querySelector('.stories-manager-btn');
        const storiesPopup = document.getElementById('stories-popup-menu');
        if (storiesBtn && storiesPopup) {
            storiesBtn.onclick = (e) => {
                e.stopPropagation();
                themePopup.classList.remove('show');
                storiesPopup.classList.toggle('show');
            };
        }
    }, 500);

    if (!document.getElementById('theme-switch-btn')) tactiqMenus.appendChild(themeBtn);

    document.addEventListener('click', () => {
        const storiesPopup = document.getElementById('stories-popup-menu');
        if (storiesPopup) storiesPopup.classList.remove('show');
        themePopup.classList.remove('show');
    });

    if (window.ThemeManager) {
        window.ThemeManager.initSync();
        // Re-render menu after initialization to reflect the newly synchronized name/state
        setTimeout(renderThemeMenu, 100);
    }
});
