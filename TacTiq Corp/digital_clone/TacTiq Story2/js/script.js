document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    const updateHamburger = (isActive) => {
        const spans = menuToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    // Restore Menu State
    if (localStorage.getItem('mobile-menu-active') === 'true') {
        navLinks.classList.add('active');
        updateHamburger(true);
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            localStorage.setItem('mobile-menu-active', isActive);
            updateHamburger(isActive);
        });
    }

    // Mobile Dropdown Toggle (Accordion) with Persistence
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach((trigger, index) => {
        const storageKey = `dropdown-active-${index}`;

        const toggleDropdown = (triggerEl, forceState = null) => {
            const dropdownMenu = triggerEl.nextElementSibling;
            if (!dropdownMenu) return;

            const shouldBeActive = forceState !== null ? forceState : !dropdownMenu.classList.contains('active');
            dropdownMenu.classList.toggle('active', shouldBeActive);

            // Rotate chevron
            const chevron = triggerEl.querySelector('.chevron');
            if (chevron) {
                chevron.style.transform = shouldBeActive ? 'rotate(180deg)' : 'rotate(0)';
                chevron.style.display = 'inline-block';
                chevron.style.transition = 'transform 0.3s ease';
            }
            localStorage.setItem(storageKey, shouldBeActive);
        };

        // Restore Dropdown State
        if (localStorage.getItem(storageKey) === 'true') {
            toggleDropdown(trigger, true);
        }

        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                toggleDropdown(trigger);
            }
        });
    });

    // Close on click and go Ghost mode
    const navLinksList = navLinks.querySelectorAll('a:not(.dropdown-trigger)');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navLinks.classList.add('ghost');
                // updateHamburger(false); // Keep toggle as X if user wants to close it? 
                // Actually, let's just make it a ghost
            }
        });
    });

    // Remove ghost on toggle interaction
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.classList.contains('ghost')) {
                navLinks.classList.remove('ghost');
                navLinks.classList.remove('active');
                localStorage.setItem('mobile-menu-active', false);
                updateHamburger(false);
            }
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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
        designerRow.innerHTML = `<a href="../../jWebTheme/index.html" target="_blank" style="color:var(--accent-gold); font-weight:700; text-decoration:none; font-size:0.8rem;">Designer</a>`;
        designerRow.onclick = (e) => {
            e.stopPropagation();
            window.open('../../jWebTheme/index.html', '_blank');
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
