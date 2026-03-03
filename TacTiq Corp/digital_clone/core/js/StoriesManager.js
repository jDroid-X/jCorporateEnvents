/**
 * TacTiq Enterprise - Central Stories Navigation
 */
const StoriesManager = {
    stories: [
        { name: 'TacTiq Story 1', path: 'TacTiq Story1/index.html' },
        { name: 'TacTiq Story 2', path: 'TacTiq Story2/index.html' },
        { name: 'TacTiq Story 3', path: 'TacTiq Story3/index.html' },
        { name: 'TacTiq Story 4', path: 'TacTiq Story4/index.html' },
        { name: 'TacTiq Story 5', path: 'TacTiq Story5/vogue_fashion/index.html' },
        { name: 'PDF Stories', path: 'PDF Stories/index.html' }
    ],

    determinePathBase() {
        const isWeb = window.location.hostname.includes('github.io');
        const isLocal = window.location.protocol === 'file:';

        if (isWeb) {
            // WEB STRATEGY: Absolute GitHub Pages URL
            console.log("StoriesManager: Using Web Strategy");
            return 'https://jdroid-x.github.io/jCorporateEnvents/TacTiq%20Corp/digital_clone/';
        }

        // LOCAL STRATEGY: Relative mapping to C:\Users\dell\jAnitGravity\jCorporateEvents\TacTiq Corp\digital_clone\
        console.log("StoriesManager: Using Local Strategy");
        const path = decodeURIComponent(window.location.pathname);
        const parts = path.split(/[\\\/]/).filter(p => p);
        const dcIndex = parts.lastIndexOf('digital_clone');

        if (dcIndex === -1) {
            return 'digital_clone/';
        }

        const segmentsAfterDC = parts.length - dcIndex - 1;
        const lastIsFile = parts.length > 0 && parts[parts.length - 1].includes('.');
        const folderDepth = lastIsFile ? segmentsAfterDC - 1 : segmentsAfterDC;

        if (folderDepth <= 0) return '';
        return '../'.repeat(folderDepth);
    },

    renderMenu(mountPoint) {
        if (!mountPoint) return;

        const base = this.determinePathBase();

        const btn = document.createElement('button');
        btn.className = 'stories-manager-btn stories-btn'; // Use combined classes
        btn.textContent = 'Stories';

        const popup = document.createElement('div');
        popup.id = 'stories-popup-menu';
        popup.className = 'glass-popup';

        const header = document.createElement('div');
        header.style.cssText = "padding: 10px 12px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent, #d4af37); opacity: 0.6; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 800;";
        header.textContent = 'Archives';
        popup.appendChild(header);

        if (mountPoint.id === 'year-filter') {
            btn.style.marginLeft = '5px';
        }

        this.stories.forEach(s => {
            const row = document.createElement('div');
            row.style.cssText = "padding:8px 12px; font-size:0.7rem; color: #fff; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer;";
            row.textContent = s.name;
            row.onclick = (e) => {
                e.stopPropagation();
                window.location.href = base + s.path;
            };
            popup.appendChild(row);
        });

        // Anchor popup to the container instead of the button for better alignment
        mountPoint.appendChild(btn);

        const container = mountPoint.parentElement || mountPoint;
        if (container) {
            container.style.position = 'relative';
            container.appendChild(popup);
        }

        btn.onclick = (e) => {
            e.stopPropagation();

            const themePopup = document.getElementById('theme-popup-menu');
            if (themePopup) themePopup.style.display = 'none';

            const isVisible = popup.style.display === 'block';
            popup.style.display = isVisible ? 'none' : 'block';
        };

        mountPoint.appendChild(btn);

        document.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    },

    init() {
        const mount = document.getElementById('stories-menu-mount');
        if (mount) {
            mount.style.display = 'flex';
            this.renderMenu(mount);
        }
    }
};

window.StoriesManager = StoriesManager;
document.addEventListener('DOMContentLoaded', () => StoriesManager.init());
