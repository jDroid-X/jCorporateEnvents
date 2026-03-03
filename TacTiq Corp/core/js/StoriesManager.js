/**
 * StoriesManager.js
 * Centralized navigation for all TacTiq projects and stories.
 * Designed for portability and consistent UI across the ecosystem.
 */

window.StoriesManager = {
    // Relative to Repo Root
    projects: [
        { id: 'master', name: 'Master Website', path: 'TacTiq Corp/index.html', category: 'main' },
        { id: 'website1', name: 'Conferences & Events', path: 'Website1/index.html', category: 'web' },
        { id: 'website2', name: 'Website2 (Leadership)', path: 'Website2/index.html', category: 'web' },
        { id: 'website3', name: 'Website3 (Retail)', path: 'Website3/jShopingMart/index.html', category: 'web' },
        { id: 'safari', name: 'Jungle Safari', path: 'TacTiq Corp/Jungle Safari/index.html', category: 'exp' },
        { id: 'shop', name: 'jShopingMart', path: 'TacTiq Corp/jShopingMart/index.html', category: 'exp' },
        { id: 'story1', name: 'TacTiq Story 1', path: 'TacTiq Corp/digital_clone/TacTiq Story1/index.html', category: 'story' },
        { id: 'story2', name: 'TacTiq Story 2', path: 'TacTiq Corp/digital_clone/TacTiq Story2/index.html', category: 'story' },
        { id: 'story3', name: 'TacTiq Story 3', path: 'TacTiq Corp/digital_clone/TacTiq Story3/index.html', category: 'story' },
        { id: 'story4', name: 'TacTiq Story 4', path: 'TacTiq Corp/digital_clone/TacTiq Story4/index.html', category: 'story' },
        { id: 'story5', name: 'TacTiq Story 5 (Vogue)', path: 'TacTiq Corp/digital_clone/TacTiq Story5/vogue_fashion/index.html', category: 'story' },
        { id: 'pdf', name: 'PDF Stories', path: 'TacTiq Corp/digital_clone/PDF Stories/index.html', category: 'story' }
    ],

    /**
     * Renders the stories menu into a target element.
     * @param {HTMLElement} target - The element to mount the menu into.
     */
    renderMenu: function (target) {
        if (!target) return;

        // Auto-discover repo root prefix by looking for where this script is loaded from
        // We expect the script to be at [Root]/TacTiq%20Corp/core/js/StoriesManager.js
        let rootPrefix = "";
        const scripts = document.getElementsByTagName('script');
        for (let s of scripts) {
            const src = s.getAttribute('src');
            // Check for both encoded and decoded paths
            if (src && (src.includes('core/js/StoriesManager.js') || src.includes('core%2Fjs%2FStoriesManager.js'))) {
                // The root is just before 'TacTiq%20Corp/core/js/StoriesManager.js'
                const parts = src.split('TacTiq%20Corp/core/js/StoriesManager.js');
                if (parts.length > 1) {
                    rootPrefix = parts[0];
                } else {
                    // Try without TacTiq Corp prefix (if loaded relatively)
                    const subParts = src.split('core/js/StoriesManager.js');
                    if (subParts.length > 1) {
                        // We are inside TacTiq Corp or something.
                        // Let's check how many ../ we have.
                        rootPrefix = subParts[0];
                        // If rootPrefix is "", it means we are in TacTiq Corp root.
                        // But wait! If we are in TacTiq Corp/index.html, path is "core/js/..."
                        // We need to go UP one more to reach Repo root.
                    }
                }
                break;
            }
        }

        // Simpler discovery: find how many levels up to Repo Root
        // We know core/ is always inside TacTiq Corp/
        // So Repo Root is always one level ABOVE the TacTiq Corp/ folder.

        const storiesBtn = document.createElement('button');
        storiesBtn.className = 'stories-mgr-btn';
        storiesBtn.style.cssText = "background: rgba(0,0,0,0.3); border: 1px solid var(--accent, #FF9933); color: white; padding: 8px 14px; border-radius: 4px; font-size: 0.85rem; cursor: pointer; transition: 0.3s; position: relative; font-family: 'Inter', sans-serif; height: 36px; display: flex; align-items: center; gap: 8px; font-weight: 500;";
        storiesBtn.innerHTML = 'Explore Stories <span style="font-size:0.6rem;">▼</span>';

        const storiesPopup = document.createElement('div');
        storiesPopup.className = 'stories-mgr-popup';
        storiesPopup.style.cssText = "display:none; position:absolute; top:45px; right:0; width:240px; border:1px solid var(--accent, #FF9933); border-radius:8px; box-shadow:0 15px 40px rgba(0,0,0,0.9); z-index:9999; overflow:hidden; background: #0a0a0a; text-align:left; backdrop-filter: blur(15px); border: 1px solid rgba(255, 153, 51, 0.3);";

        this.projects.forEach(project => {
            const row = document.createElement('div');
            row.style.cssText = "padding:12px 16px; font-size:0.75rem; color:#ccc; border-bottom:1px solid rgba(255,255,255,0.03); cursor:pointer; transition: 0.2s; display:flex; justify-content:space-between; align-items:center;";

            // Highlight current project
            const isCurrent = window.location.pathname.includes(project.path.replace(/ /g, '%20'));
            if (isCurrent) {
                row.style.color = '#fff';
                row.style.background = 'rgba(255, 153, 51, 0.15)';
                row.style.borderLeft = '3px solid var(--accent, #FF9933)';
            }

            row.innerHTML = `<span>${project.name}</span><span style="opacity:0.3; font-size:0.6rem;">${project.category.toUpperCase()}</span>`;
            row.onmouseenter = () => { if (!isCurrent) row.style.background = 'rgba(255, 255, 255, 0.05)'; row.style.color = '#fff'; };
            row.onmouseleave = () => { if (!isCurrent) row.style.background = 'transparent'; row.style.color = isCurrent ? '#fff' : '#ccc'; };

            row.onclick = (e) => {
                e.stopPropagation();
                // Construct the link correctly based on current context
                // We'll use a smart relative jump
                window.location.href = this.calculateLink(project.path);
            };
            storiesPopup.appendChild(row);
        });

        storiesBtn.appendChild(storiesPopup);
        storiesBtn.onclick = (e) => {
            const isVisible = storiesPopup.style.display === 'block';
            storiesPopup.style.display = isVisible ? 'none' : 'block';
            e.stopPropagation();
        };

        document.addEventListener('click', () => storiesPopup.style.display = 'none');

        target.innerHTML = '';
        target.appendChild(storiesBtn);
    },

    calculateLink: function (targetPath) {
        // Find how many levels up to Repo Root
        // Current location: .../jCorporateEnvents/[Subfolders]/index.html
        // Target: [Subfolders]/index.html

        // We'll use the "core" folder as a marker for RepoRoot/TacTiq Corp/
        const currentPath = window.location.pathname;
        const repoName = "jCorporateEnvents";

        // If we are in jCorporateEnvents/TacTiq Corp/index.html
        // and target is Website1/index.html
        // we need "../Website1/index.html"

        // Strategy: find common base (jCorporateEnvents)
        if (currentPath.includes(repoName)) {
            const basePath = currentPath.split(repoName)[0] + repoName + "/";
            return basePath + targetPath;
        }

        // Fallback for local folders (C:/...)
        // Use a relative jump based on known depth
        const segments = currentPath.split('/');
        // Find index of TacTiq Corp or Website folders
        let repoRootIndex = -1;
        if (currentPath.includes('TacTiq%20Corp')) repoRootIndex = segments.findIndex(s => s === 'TacTiq%20Corp') - 1;
        else if (currentPath.includes('Website1')) repoRootIndex = segments.findIndex(s => s === 'Website1') - 1;
        else if (currentPath.includes('Website2')) repoRootIndex = segments.findIndex(s => s === 'Website2') - 1;

        if (repoRootIndex >= 0) {
            let dots = "";
            const currentDepth = segments.length - 1 - repoRootIndex;
            for (let i = 0; i < currentDepth; i++) dots += "../";
            return dots + targetPath;
        }

        return "../../" + targetPath; // Rough guess
    },

    init: function () {
        console.log("StoriesManager: Initialized v1.3 (Auto-Discovery)");
        document.addEventListener('DOMContentLoaded', () => {
            const mount = document.getElementById('stories-menu-mount') || document.getElementById('header-stories-container');
            if (mount) this.renderMenu(mount);
        });
    }
};

window.StoriesManager.init();
