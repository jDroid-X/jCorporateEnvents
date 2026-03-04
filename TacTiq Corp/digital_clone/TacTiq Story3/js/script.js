document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.sidebar-backdrop');

    const toggleMenu = (forceState = null) => {
        const isActive = forceState !== null ? forceState : !navLinks.classList.contains('active');
        navLinks.classList.toggle('active', isActive);
        menuToggle.classList.toggle('active', isActive);
        if (backdrop) backdrop.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => toggleMenu());
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => toggleMenu(false));
    }

    // 2. Smooth Scroll & Close Menu
    document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) toggleMenu(false);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const el = document.querySelector(targetId);
            if (el) {
                e.preventDefault();
                toggleMenu(false);
                el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));

    // 4. Mobile Dropdown as Accordion
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = trigger.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                const isOpen = trigger.classList.contains('active');

                // Close all
                document.querySelectorAll('.dropdown-trigger').forEach(t => {
                    t.classList.remove('active');
                    const m = t.parentElement.querySelector('.dropdown-menu');
                    if (m) m.classList.remove('active');
                });

                // Toggle clicked
                if (!isOpen) {
                    trigger.classList.add('active');
                    if (menu) menu.classList.add('active');
                }
            }
        });
    });

    // 5. Sticky Nav scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 50
                ? '0 5px 30px rgba(0,0,0,0.5)'
                : 'none';
        });
    }

    // 6. Video Modal logic
    const videoModal = document.querySelector('.video-modal');
    const closeBtn = document.querySelector('.close-modal');
    const watchBtn = document.querySelector('.watch-video-btn');
    const iframe = videoModal ? videoModal.querySelector('iframe') : null;

    if (watchBtn && videoModal) {
        watchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = watchBtn.getAttribute('data-url');
            if (iframe && url) {
                // Convert youtu.be or youtube.com to embed
                let embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
                embedUrl = embedUrl.replace('watch?v=', 'embed/');
                // Handle shorts
                embedUrl = embedUrl.replace('youtube.com/shorts/', 'youtube.com/embed/');

                iframe.src = embedUrl + '?autoplay=1';
                videoModal.classList.add('active');
            }
        });
    }

    if (closeBtn && videoModal) {
        closeBtn.addEventListener('click', () => {
            videoModal.classList.remove('active');
            if (iframe) iframe.src = '';
        });
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                if (iframe) iframe.src = '';
            }
        });
    }

    // 7. Tactiq Menus Logic (Theme Switcher & Stories)
    const tactiqMenus = document.getElementById('tactiq-menus');
    if (tactiqMenus) {
        // Stories Button Menu
        const storiesBtn = document.createElement('button');
        storiesBtn.style.cssText = "background: rgba(0,0,0,0.3); border: 1px solid var(--text-gold); color: white; padding: 8px 14px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease; position: relative;";
        storiesBtn.textContent = 'Stories';

        const storiesPopup = document.createElement('div');
        storiesPopup.style.cssText = "display:none; position:absolute; bottom:45px; top:auto; right:0; width:190px; border:1px solid var(--text-gold); border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:2000; overflow:hidden; background: #111; text-align:left; backdrop-filter: blur(10px);";

        // UNIFIED PATH STRATEGY (Sync with StoriesManager)
        const getBasePath = () => {
            const isWeb = window.location.hostname.includes('github.io');
            if (isWeb) return 'https://jdroid-x.github.io/jCorporateEnvents/TacTiq%20Corp/digital_clone/';

            const path = decodeURIComponent(window.location.pathname);
            const parts = path.split(/[\\\/]/).filter(p => p);
            const dcIndex = parts.lastIndexOf('digital_clone');
            if (dcIndex === -1) return 'digital_clone/';
            const segmentsAfterDC = parts.length - dcIndex - 1;
            const lastIsFile = parts.length > 0 && parts[parts.length - 1].includes('.');
            const folderDepth = lastIsFile ? segmentsAfterDC - 1 : segmentsAfterDC;
            return folderDepth <= 0 ? '' : '../'.repeat(folderDepth);
        };
        const base = getBasePath();

        const stories = [
            { name: 'TacTiq Story 1', url: base + 'TacTiq Story1/index.html' },
            { name: 'TacTiq Story 2', url: base + 'TacTiq Story2/index.html' },
            { name: 'TacTiq Story 3', url: base + 'TacTiq Story3/index.html' },
            { name: 'TacTiq Story 4', url: base + 'TacTiq Story4/index.html' },
            { name: 'TacTiq Story 5', url: base + 'TacTiq Story5/vogue_fashion/index.html' },
            { name: 'PDF Stories', url: base + 'PDF Stories/index.html' }
        ];

        stories.forEach(story => {
            const row = document.createElement('div');
            row.style.cssText = "padding:12px; font-size:0.75rem; color:white; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer;";
            if (story.name === 'STORY 03') row.style.color = 'var(--text-gold)';
            row.textContent = story.name;
            row.onclick = (e) => { e.stopPropagation(); window.location.href = story.url; };
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

        // Palette Icon Menu (Theme Switcher)
        const themeBtn = document.getElementById('theme-switch-btn') || document.createElement('button');
        themeBtn.id = 'theme-switch-btn';
        themeBtn.style.cssText = "background: #111; border: 1px solid var(--text-gold); color: white; padding: 0; border-radius: 6px; font-size: 1.1rem; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; width: 32px; height: 32px; flex-shrink: 0;";
        themeBtn.innerHTML = '🎨';

        const themePopup = document.createElement('div');
        themePopup.style.cssText = "display:none; position:absolute; bottom:45px; top:auto; right:0; width:180px; border:1px solid var(--text-gold); border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:2000; overflow:hidden; background: #111; text-align:left; backdrop-filter: blur(10px);";

        function renderThemeMenu() {
            themePopup.innerHTML = '';
            const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
            const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
            const currentName = localStorage.getItem('tactiq-theme-name');

            const addMenuRow = (key, name, colors, isCustom) => {
                const row = document.createElement('div');
                const isActive = name === currentName || (!currentName && key === 'default');
                row.style.cssText = `padding:12px; font-size:0.75rem; color:${isActive ? 'var(--text-gold)' : 'white'}; cursor:pointer; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05);`;
                row.innerHTML = `<span>${name}</span>`;

                row.onclick = (e) => {
                    e.stopPropagation();
                    if (window.ThemeManager) window.ThemeManager.setTheme(key, name, colors);
                    renderThemeMenu();
                    themePopup.style.display = 'none';
                };
                themePopup.appendChild(row);
            };

            addMenuRow('default', 'Default Theme', null, false);

            // Active Custom Themes
            const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');
            activeCustoms.forEach(t => {
                const idx = savedThemes.findIndex(st => st.name === t.name);
                const colors = savedElements.map(el => el.colors[idx]);
                addMenuRow('custom', t.name, colors, true);
            });
            // Designer Link
            const designerRow = document.createElement('div');
            designerRow.style.cssText = "padding:12px; border-top:1px solid rgba(255,255,255,0.1); margin-top:5px; text-align:center; cursor:pointer;";
            designerRow.innerHTML = `<a href="../../jWebTheme/index.html" target="_blank" style="color:var(--text-gold); font-weight:700; text-decoration:none; font-size:0.8rem;">Designer</a>`;
            designerRow.onclick = (e) => {
                e.stopPropagation();
                window.open('../../jWebTheme/index.html', '_blank');
                themePopup.style.display = 'none';
            };
            themePopup.appendChild(designerRow);
        }

        renderThemeMenu();
        themeBtn.appendChild(themePopup);

        // Interaction Logic: Click to toggle (touch friendly)
        themeBtn.onclick = (e) => {
            e.stopPropagation();
            const isVisible = themePopup.style.display === 'block';
            storiesPopup.style.display = 'none';
            themePopup.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) renderThemeMenu();
        };

        themePopup.onclick = (e) => e.stopPropagation();

        if (!document.getElementById('theme-switch-btn')) tactiqMenus.appendChild(themeBtn);

        document.addEventListener('click', () => {
            storiesPopup.style.display = 'none';
            themePopup.style.display = 'none';
        });

        window.onfocus = () => renderThemeMenu();
    }

    if (window.ThemeManager) {
        window.ThemeManager.initSync();
    }
});

