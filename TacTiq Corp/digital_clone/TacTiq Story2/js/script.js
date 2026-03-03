document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Mobile Dropdown Toggle (Accordion)
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault(); // Prevent # link behavior
                const dropdownMenu = trigger.nextElementSibling;
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('active');
                    // Rotate chevron if exists
                    const chevron = trigger.querySelector('.chevron');
                    if (chevron) {
                        chevron.style.transform = dropdownMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                        chevron.style.display = 'inline-block'; // Ensure it can rotate
                        chevron.style.transition = 'transform 0.3s ease';
                    }
                }
            }
        });
    });

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

    let betterRoot = '';
    const homeLink = document.querySelector('.nav-links a[href*="index.html"]');
    if (homeLink) {
        const href = homeLink.getAttribute('href');
        betterRoot = href.replace('index.html', '').split('#')[0];
    }

    // 1. Stories Button Menu
    const storiesBtn = document.createElement('button');
    storiesBtn.style.cssText = "background: rgba(0,0,0,0.3); border: 1px solid var(--accent-gold); color: var(--text-primary); padding: 8px 14px; border-radius: 4px; font-size: 0.85rem; cursor: pointer; transition: all 0.3s ease; position: relative;";
    storiesBtn.textContent = 'Stories';

    const storiesPopup = document.createElement('div');
    storiesPopup.className = 'glass';
    storiesPopup.style.cssText = "display:none; position:absolute; top:45px; right:40px; width:190px; border:1px solid var(--accent-gold); border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:2000; overflow:hidden; background: var(--bg-secondary); text-align:left;";

    const stories = [
        { name: 'STORY 01: TAC-TIQ', url: betterRoot + '../TacTiq Story1/index.html' },
        { name: 'STORY 02: EVOLVE', url: betterRoot + 'index.html' },
        { name: 'STORY 03: IMPACT', url: betterRoot + '../TacTiq Story3/index.html' },
        { name: 'STORY 04: SCALE', url: betterRoot + '../TacTiq Story4/index.html' },
        { name: 'STORY 05: VOGUE', url: betterRoot + '../TacTiq Story5/vogue_fashion/index.html' },
        { name: 'STORY 06: PDF STORIES', url: betterRoot + '../PDF Stories/index.html' }
    ];

    stories.forEach(story => {
        const row = document.createElement('div');
        row.style.cssText = "padding:12px; font-size:0.75rem; color:var(--text-primary); border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer;";
        if (story.name === 'STORY 02: EVOLVE') row.style.color = 'var(--accent-gold)';
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
        if (themePopup) themePopup.style.display = 'none';
        e.stopPropagation();
    };
    tactiqMenus.appendChild(storiesBtn);

    // 2. Palette Icon Menu (Theme Switcher)
    const themeBtn = document.getElementById('theme-switch-btn') || document.createElement('button');
    themeBtn.id = 'theme-switch-btn';
    themeBtn.style.cssText = "background: var(--bg-secondary); border: 1px solid var(--accent-gold); color: white; padding: 0; border-radius: 6px; font-size: 1.2rem; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; width: 32px; height: 32px; flex-shrink: 0;";
    themeBtn.innerHTML = '🎨';

    const themePopup = document.createElement('div');
    themePopup.className = 'glass';
    themePopup.style.cssText = "display:none; position:absolute; top:45px; right:0; width:180px; border:1px solid var(--accent-gold); border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:2000; overflow:hidden; background: var(--bg-secondary); text-align:left;";

    function renderThemeMenu() {
        themePopup.innerHTML = '';
        const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
        const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
        const currentName = localStorage.getItem('tactiq-theme-name');

        const themesFromDB = savedThemes.map((t, themeIdx) => ({
            active: t.active,
            visible: t.visible,
            name: t.name,
            colors: savedElements.map(el => el.colors[themeIdx])
        }));

        addMenuRow('default', 'Default Theme', null, false);

        // Active Custom Themes
        const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');
        activeCustoms.forEach(t => {
            const themeIdx = savedThemes.findIndex(st => st.name === t.name);
            const colors = savedElements.map(el => el.colors[themeIdx]);
            addMenuRow('custom', t.name, colors, true);
        });

        function addMenuRow(key, name, colors, isCustom) {
            const row = document.createElement('div');
            const isActive = name === currentName || (!currentName && key === 'default');
            row.style.cssText = `padding:12px; font-size:0.8rem; color:${isActive ? 'var(--accent-gold)' : 'white'}; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; display:flex; justify-content:space-between; align-items:center;`;
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
        designerRow.style.cssText = "padding:12px; border-top:1px solid rgba(255,255,255,0.1); margin-top:5px; text-align:center; cursor:pointer;";
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

    // Palette Interaction: Click to toggle (touch friendly)
    themeBtn.onclick = (e) => {
        e.stopPropagation();
        const isVisible = themePopup.style.display === 'block';
        storiesPopup.style.display = 'none'; // Close other
        themePopup.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) renderThemeMenu();
    };

    themeBtn.onmouseenter = () => {
        renderThemeMenu();
        themePopup.style.display = 'block';
    };
    themeBtn.onmouseleave = () => {
        setTimeout(() => {
            if (!themePopup.matches(':hover')) themePopup.style.display = 'none';
        }, 300);
    };
    themePopup.onmouseleave = () => themePopup.style.display = 'none';
    themePopup.onclick = (e) => e.stopPropagation();

    if (!document.getElementById('theme-switch-btn')) tactiqMenus.appendChild(themeBtn);

    document.addEventListener('click', () => {
        storiesPopup.style.display = 'none';
        themePopup.style.display = 'none';
    });

    if (window.ThemeManager) {
        window.ThemeManager.initSync();
    }
});
