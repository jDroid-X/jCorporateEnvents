/**
 * JDROID-X ACTIONS MODULE
 * Event Handling & Cross-Platform Sync
 */

JdroidX.Actions = {
    discoveryHue: 0,

    pushTheme: function (idx) {
        const theme = JdroidX.state.themes[idx];
        theme.active = !theme.active;
        if (theme.active) {
            // Apply immediately to designer preview
            JdroidX.Actions.applyThemeToDesigner(idx);
        }
        this.refresh();
    },

    editColor: function (tIdx, elIdx, val) {
        JdroidX.state.elements[elIdx].colors[tIdx] = val.toUpperCase();
        // Optimized: only update the hex label in the DOM to avoid full table re-render stutters
        const labels = document.querySelectorAll('.hex-label');
        const visibleIdx = JdroidX.state.themes.filter(t => t.visible).findIndex(t => t.index === tIdx);
        // This is a bit complex for a quick fix, so let's stick to a simpler optimization:
        // Update the specific label next to the input
        const input = document.querySelector(`input[oninput*="editColor(${tIdx}, ${elIdx}, this.value)"]`);
        if (input) {
            const label = input.nextElementSibling;
            if (label) label.innerText = val.toUpperCase();
        }
    },

    recallWebsite: async function (path) {
        if (!path) return;
        try {
            const resp = await fetch(path);
            const html = await resp.text();
            await this.processStructure(html, path.substring(0, path.lastIndexOf('/') + 1), path);
        } catch (e) {
            console.error("Connection Failed:", e);
            alert("External Link Blocked. Use 'Sync Web' to establish a secure handshake.");
        }
    },

    toggleThemeVisibility: function (idx, checked) {
        const S = JdroidX.state;
        const MAX = 7;
        if (checked) {
            const current = S.themes.filter(t => t.visible).length;
            if (current >= MAX && !confirm(`⚠️ Exceeding ${MAX} themes might cause horizontal overflow. Continue?`)) {
                const cb = document.getElementById(`tvp-cb-${idx}`);
                if (cb) cb.checked = false;
                return;
            }
            S.themes[idx].visible = true;
        } else {
            JdroidX.state.themes[idx].visible = false;
            JdroidX.state.themes[idx].active = false;
        }
        this.refresh();
        JdroidX.UI.renderVisibilityPanel();
    },

    renameTheme: function (i) {
        const n = prompt("New Theme Name:", JdroidX.state.themes[i].name);
        if (n) { JdroidX.state.themes[i].name = Utils.toTitleCase(n); this.refresh(); }
    },

    deleteTheme: function (i) {
        if (confirm("Permanently delete this atmosphere?")) {
            JdroidX.state.themes.splice(i, 1);
            JdroidX.state.elements.forEach(e => e.colors.splice(i, 1));
            this.refresh();
        }
    },

    editElement: function (i) {
        const n = prompt("New Element Name:", JdroidX.state.elements[i].name);
        if (n) { JdroidX.state.elements[i].name = Utils.toTitleCase(n); this.refresh(); }
    },

    deleteElement: function (i) {
        if (confirm("Remove this UI layer?")) {
            JdroidX.state.elements.splice(i, 1);
            this.refresh();
        }
    },



    applyThemeToDesigner: function (idx) {
        if (idx == -1) {
            document.documentElement.style.setProperty('--bg', '#050505');
            document.documentElement.style.setProperty('--accent', '#FF9933');
            return;
        }
        const S = JdroidX.state;
        const getColor = (n) => { const el = S.elements.find(e => e.name === n); return el ? el.colors[idx] : null; };
        const bg = getColor('Main Body BG');
        const acc = getColor('Primary Accent');
        if (bg) document.documentElement.style.setProperty('--bg', bg);
        if (acc) document.documentElement.style.setProperty('--accent', acc);
    },

    syncToWebsite: function () {
        JdroidX.Engine.save();
        if (JdroidX.state.activeSite === "Standalone Mode") {
            const p = prompt("Enter Target Website Path:", JdroidX.state.lastPath);
            if (p) {
                JdroidX.state.lastPath = p;
                JdroidX.state.activeSite = p.split('/').pop();
                JdroidX.Engine.save();
            } else return;
        }
        document.getElementById('modal-overlay').style.display = 'block';
        document.getElementById('sync-options-modal').style.display = 'flex';
    },

    executeUniversalSync: function () {
        const pos = document.querySelector('input[name="menu-pos"]:checked')?.value;
        if (!pos) return alert("Please select a UI position.");

        localStorage.setItem('tactiq-sync-config', JSON.stringify({
            position: pos,
            paletteUrl: window.location.href,
            websitePath: JdroidX.state.lastPath
        }));

        this.closeModal();
        window.open(JdroidX.state.lastPath, '_blank');
    },

    openThemeDiscovery: function () {
        let name = prompt("Atmosphere Style Name:", "Cyber Oasis");
        if (!name) return;
        name = Utils.toTitleCase(name);
        document.getElementById('disc-theme-name').innerText = name;

        const lower = name.toLowerCase();
        if (lower.includes("red")) this.discoveryHue = 0;
        else if (lower.includes("orange")) this.discoveryHue = 25;
        else if (lower.includes("gold") || lower.includes("yellow")) this.discoveryHue = 48;
        else if (lower.includes("green")) this.discoveryHue = 135;
        else if (lower.includes("cyan") || lower.includes("teal")) this.discoveryHue = 185;
        else if (lower.includes("blue")) this.discoveryHue = 215;
        else if (lower.includes("purple")) this.discoveryHue = 275;
        else if (lower.includes("pink")) this.discoveryHue = 335;
        else {
            let tempH = 0;
            for (let i = 0; i < lower.length; i++) tempH += lower.charCodeAt(i);
            this.discoveryHue = tempH % 360;
        }

        this.updateDiscoveryGrid(name);
        document.getElementById('modal-overlay').style.display = 'block';
        document.getElementById('suggestion-modal').style.display = 'flex';
    },

    updateDiscoveryGrid: function (name) {
        const S = JdroidX.state;
        S.pendingOptions = {
            baseName: name,
            option1: S.elements.map(el => JdroidX.Engine.generateIntelligentColor(name, el.name, 1, this.discoveryHue)),
            option2: S.elements.map(el => JdroidX.Engine.generateIntelligentColor(name, el.name, 2, this.discoveryHue)),
            option3: S.elements.map(el => JdroidX.Engine.generateIntelligentColor(name, el.name, 3, this.discoveryHue))
        };

        const grid = document.getElementById('dynamic-grid');
        if (!grid) return;
        grid.innerHTML = '';

        S.elements.forEach((el, idx) => {
            const label = document.createElement('div');
            label.style.padding = "5px 10px";
            label.style.background = "#111";
            label.innerHTML = `<span style="color:#aaa; font-size:0.7rem;">${el.name}</span>`;
            grid.appendChild(label);

            [S.pendingOptions.option1[idx], S.pendingOptions.option2[idx], S.pendingOptions.option3[idx]].forEach(val => {
                const box = document.createElement('div');
                box.className = 'option-choice';
                box.innerHTML = `
                    <div style="background: ${val}; width: 22px; height: 22px; border-radius: 4px; border:1px solid #333;"></div>
                    <span class="hex-code" style="font-size:0.6rem; font-family:'JetBrains Mono', monospace; color:#666;">${val}</span>
                `;
                grid.appendChild(box);
            });
        });

        const marker = document.getElementById('hue-selector-marker');
        const preview = document.getElementById('anchor-color-preview');
        const nameLabel = document.getElementById('anchor-color-name');

        if (marker) marker.style.left = `${(this.discoveryHue / 360) * 100}%`;
        if (preview) preview.style.background = `hsl(${this.discoveryHue}, 100%, 60%)`;
        if (nameLabel) nameLabel.innerText = name.split(' ')[0];
    },

    applySuggestedTheme: function () {
        const S = JdroidX.state;
        const selectedOptNum = document.querySelector('input[name="theme-option"]:checked')?.value || "1";
        if (!S.pendingOptions) return;

        const chosenColors = S.pendingOptions[`option${selectedOptNum}`];
        const prefixes = { "1": "Old", "2": "New", "3": "GenZ" };
        const prefix = prefixes[selectedOptNum];
        const fullName = Utils.toTitleCase(`${prefix} ${S.pendingOptions.baseName}`);

        S.themes.push({ name: fullName, key: fullName.toLowerCase().replace(/\s/g, '-'), active: true, visible: true });
        S.elements.forEach((el, idx) => el.colors.push(chosenColors[idx]));

        JdroidX.Engine.save();
        JdroidX.UI.render();
        JdroidX.UI.renderVisibilityPanel();
        this.closeModal();
    },

    initDiscoveryInteractions: function () {
        const hueBar = document.getElementById('semantic-hue-bar');
        if (!hueBar) return;

        const handleHueChange = (e) => {
            const rect = hueBar.getBoundingClientRect();
            let x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            this.discoveryHue = Math.round((x / rect.width) * 360);
            const themeName = document.getElementById('disc-theme-name').innerText;
            this.updateDiscoveryGrid(themeName);
        };

        hueBar.onmousedown = (e) => {
            handleHueChange(e);
            const moveHandler = (me) => handleHueChange(me);
            const upHandler = () => {
                window.removeEventListener('mousemove', moveHandler);
                window.removeEventListener('mouseup', upHandler);
            };
            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', upHandler);
        };
    },

    resetData: function () {
        if (confirm("Factory Reset: Wiping all design history. Proceed?")) {
            localStorage.clear();
            location.reload();
        }
    },

    closeModal: function () {
        const ids = ['modal-overlay', 'suggestion-modal', 'connect-modal', 'sync-options-modal'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    },

    updateCallerContext: function () {
        if (!window.ThemeManager) return;
        const caller = localStorage.getItem(window.ThemeManager.keys.LAST_CALLER);
        const el = document.getElementById('caller-context');
        if (el && caller) {
            const name = caller.split('/').filter(p => p.includes('Story') || p.includes('PDF')).pop() || "Website";
            el.innerHTML = `Active Handshake: <span style="color:var(--accent); font-weight:800;">${name}</span>`;
            el.onclick = () => window.open(caller, '_self');
            el.style.cursor = 'pointer';
            el.title = `Return to ${caller}`;
        }
    },

    refresh: function () {
        JdroidX.Engine.save();
        JdroidX.UI.render();
        this.updateCallerContext();
    }
};
