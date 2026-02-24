/**
 * JDROID-X THEME PALETTE - CORE ENGINE (PRO EDITION V11.0)
 * Architecture: Encapsulated State Management & Universal Protocol Synchronization
 */

// 1. STATE ENCAPSULATION
window.JdroidX = {
    state: {
        themes: [],
        elements: [],
        logbook: [],
        activeSite: "Standalone Mode",
        lastPath: "",
        pendingOptions: null,
        constants: {
            THEME_KEY: 'jdroid-x-matrix-themes',
            ELEMENT_KEY: 'jdroid-x-matrix-elements',
            SITE_KEY: 'jdroid-x-active-site',
            LOGBOOK_KEY: 'WebsiteLogBook',
            PATH_KEY: 'jdroid-x-last-path'
        }
    },

    // 2. CORE ENGINE PROTOCOLS
    Engine: {
        init() {
            this.load();
            this.UI.render();
            console.log("Jdroid-X Architect: Build V11.0 Online.");
        },

        load() {
            const S = JdroidX.state;
            const C = S.constants;
            try {
                // ── V11 AUTO-UPGRADE: wipe stale themes, keep elements ──
                const storedVersion = localStorage.getItem('jdroid-x-version');
                if (storedVersion !== 'V11') {
                    localStorage.removeItem(C.THEME_KEY); // force theme regen
                    localStorage.setItem('jdroid-x-version', 'V11');
                }

                const savedThemes = localStorage.getItem(C.THEME_KEY);
                const savedElements = localStorage.getItem(C.ELEMENT_KEY);
                const savedSite = localStorage.getItem(C.SITE_KEY);
                const savedLog = localStorage.getItem(C.LOGBOOK_KEY);
                const savedPath = localStorage.getItem(C.PATH_KEY);

                if (savedLog) S.logbook = JSON.parse(savedLog);
                if (savedPath) S.lastPath = savedPath;
                if (savedSite) {
                    S.activeSite = savedSite;
                    const badge = document.getElementById('active-protocol-badge');
                    if (badge) badge.innerText = S.activeSite;
                }
                if (savedThemes && savedElements) {
                    S.themes = JSON.parse(savedThemes).filter(t => t.key !== 'default');
                    S.elements = JSON.parse(savedElements);
                    // Ensure Title Case
                    S.themes.forEach(t => t.name = toTitleCase(t.name));
                    S.elements.forEach(e => {
                        e.name = toTitleCase(e.name);
                        if (e.role) e.role = toTitleCase(e.role);
                        if (!e.mapping) e.mapping = e.name.toLowerCase().replace(/\s+/g, '-');
                    });
                } else {
                    this.setupDefaults();
                }
            } catch (e) {
                this.setupDefaults();
            }
        },

        setupDefaults() {
            const S = JdroidX.state;
            S.themes = [{ name: "Jdroid-X Teal (Base)", key: "jdroidx-teal", active: true, locked: false }];
            S.elements = [
                { name: "Main Body BG", mapping: "main-body-bg", role: "Page Backdrop", colors: ["#174C56"] },
                { name: "Sidebar / UI BG", mapping: "sidebar-ui-bg", role: "Navigation Rails", colors: ["#0F353C"] },
                { name: "Header and Footer", mapping: "header-and-footer", role: "Structural Bars", colors: ["#0F353C"] },
                { name: "Action Buttons", mapping: "action-buttons", role: "Primary Interaction", colors: ["#174C56"] },
                { name: "Primary Accent", mapping: "primary-accent", role: "Brand Identity", colors: ["#FF9933"] },
                { name: "Secondary Accent", mapping: "secondary-accent", role: "Soft Highlights", colors: ["#CC7A29"] },
                { name: "Primary Font", mapping: "primary-font", role: "Content Body", colors: ["#FFFFFF"] },
                { name: "Highlighted Font", mapping: "highlighted-font", role: "Indicators / Titles", colors: ["#FFD700"] },
                { name: "UI Border / Divider", mapping: "ui-border-divider", role: "Tactical Grid", colors: ["#FFFFFF1A"] },
                { name: "Card & Tile BG", mapping: "card-tile-bg", role: "Content Modules", colors: ["#0F353C"] },
                { name: "Scrollbar & Track", mapping: "scrollbar-track", role: "Utility Theming", colors: ["#FF9933"] },
                { name: "Success / Alert", mapping: "success-alert", role: "Status Feedback", colors: ["#44FF44"] },
                { name: "Input & Form BG", mapping: "input-form-bg", role: "Input Surfaces", colors: ["#0000004D"] },
                { name: "Modal & Overlay", mapping: "modal-overlay", role: "Pop-up Layers", colors: ["#000000CC"] },
                { name: "Dynamic Glow", mapping: "dynamic-glow", role: "Aura Effects", colors: ["#FF993333"] },
                { name: "Interactive Shadow", mapping: "interactive-shadow", role: "Depth Control", colors: ["#00000099"] }
            ];
            generateDefaultThemes();
            this.save();
        },

        save() {
            const S = JdroidX.state;
            const C = S.constants;
            localStorage.setItem(C.THEME_KEY, JSON.stringify(S.themes));
            localStorage.setItem(C.ELEMENT_KEY, JSON.stringify(S.elements));
            localStorage.setItem(C.SITE_KEY, S.activeSite);
            localStorage.setItem(C.LOGBOOK_KEY, JSON.stringify(S.logbook));
            localStorage.setItem(C.PATH_KEY, S.lastPath);
            const pill = document.getElementById('status-pill');
            if (pill) {
                pill.style.display = 'block';
                setTimeout(() => { pill.style.display = 'none'; }, 2000);
            }
        }
    },

    UI: {
        render() {
            const S = JdroidX.state;
            const headerRow = document.getElementById('header-row');
            const tbody = document.getElementById('table-body');
            if (!headerRow || !tbody) return;

            const logOptions = S.logbook.map(site => {
                const short = site.includes('/') ? site.split('/').pop() : site;
                return `<option value="${site}" title="${site}" ${S.activeSite === short ? 'selected' : ''}>${short}</option>`;
            }).join('');

            headerRow.innerHTML = `
                <th class="push-col">Mapping</th>
                <th class="theme-name" style="text-align:center;">UI Element Layer</th>
                <th class="proto-col">
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <span style="font-size:0.55rem; opacity:0.6;">AUTOSYNC LOG</span>
                        <select id="logbook-dropdown" onchange="window.recallWebsite(this.value)" 
                            style="background:#000; color:var(--accent); border:1px solid #333; font-size:0.6rem; border-radius:4px; padding:3px;">
                            <option value="">-- History --</option>
                            ${logOptions}
                        </select>
                    </div>
                </th>
            `;

            S.themes.forEach((theme, tIdx) => {
                const isPinned = theme.active;
                const th = document.createElement('th');
                th.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
                        <span style="color:white; font-weight:800;">${theme.name}</span>
                        <button class="btn-push ${isPinned ? 'active' : ''}" onclick="window.pushTheme(${tIdx})">
                            ${isPinned ? 'PINNED' : 'SYNC'}
                        </button>
                        ${!theme.locked ?
                        `<div class="row-options"><span onclick="window.renameTheme(${tIdx})">✎</span><span onclick="window.deleteTheme(${tIdx})">×</span></div>`
                        : '<span style="font-size:0.5rem; color:#44ff44; opacity:0.4;">LOCKED</span>'}
                    </div>
                `;
                headerRow.appendChild(th);
            });

            tbody.innerHTML = '';
            S.elements.forEach((el, elIdx) => {
                const tr = document.createElement('tr');
                const tdSync = document.createElement('td');
                tdSync.className = 'push-col';
                tdSync.innerHTML = `<div class="sync-indicator active" onclick="window.toggleMapping(${elIdx})">✓</div>`;
                tr.appendChild(tdSync);

                const tdName = document.createElement('td');
                tdName.className = 'theme-name';
                tdName.innerHTML = `
                    <div style="display:flex; flex-direction:column;">
                        <span>${el.name}</span>
                        ${el.role === 'Discovered Layer' ? '<small>(Discovered)</small>' : ''}
                    </div>
                    <div class="row-options">
                        <span onclick="window.editElement(${elIdx})">✎</span>
                        <span onclick="window.deleteElement(${elIdx})">×</span>
                    </div>
                `;
                tr.appendChild(tdName);

                const tdProto = document.createElement('td');
                tdProto.className = 'proto-col';
                tdProto.innerHTML = `<code>--${el.mapping}</code>`;
                tdProto.onclick = () => JdroidX.Events.remapElement(elIdx);
                tr.appendChild(tdProto);

                S.themes.forEach((_, tIdx) => {
                    const color = el.colors[tIdx] || "#333333";
                    const tdColor = document.createElement('td');
                    tdColor.innerHTML = `
                        <div class="color-cell" onclick="JdroidX.Events.editColor(${tIdx}, ${elIdx})">
                            <div class="color-box" style="background:${color}"></div>
                            <span class="hex-code">${color}</span>
                        </div>
                    `;
                    tr.appendChild(tdColor);
                });
                tbody.appendChild(tr);
            });

            const selector = document.getElementById('theme-selector');
            if (selector) {
                selector.innerHTML = '<option value="-1">Base Designer Theme</option>';
                S.themes.forEach((t, i) => {
                    const opt = document.createElement('option');
                    opt.value = i;
                    opt.innerText = t.name;
                    selector.appendChild(opt);
                });
            }
        }
    },

    Events: {
        pushTheme(idx) {
            const S = JdroidX.state;
            S.themes.forEach(t => t.active = false);
            S.themes[idx].active = true;
            this.merge();
        },
        editColor(tIdx, elIdx) {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = JdroidX.state.elements[elIdx].colors[tIdx];
            input.oninput = (e) => {
                JdroidX.state.elements[elIdx].colors[tIdx] = e.target.value.toUpperCase();
                JdroidX.Engine.save();
                JdroidX.UI.render();
            };
            input.onchange = () => this.merge();
            input.click();
        },
        async recallWebsite(path) {
            if (!path) return;
            JdroidX.state.lastPath = path;
            JdroidX.state.activeSite = path.includes('/') ? path.split('/').pop() : path;
            this.merge();
            await JdroidX.Sync.connect(path);
        },
        merge() {
            JdroidX.Engine.save();
            JdroidX.UI.render();
        },
        remapElement(i) {
            const el = JdroidX.state.elements[i];
            const next = prompt(`Remap "${el.name}" variable:`, el.mapping);
            if (next) { el.mapping = next.replace(/^--/, ''); this.merge(); }
        }
    },

    Sync: {
        async connect(path) {
            const encoded = encodeURI(path);
            try {
                const res = await fetch(encoded);
                if (!res.ok) throw new Error("Sync Interrupted");
                const html = await res.text();
                await processStructure(html, path.includes('/') ? path.substring(0, path.lastIndexOf('/') + 1) : "", path);
            } catch (e) {
                syncToPalette();
            }
        },
        async publish() { syncToWebsite(); }
    }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => JdroidX.Engine.init());

/** --- LEGACY ADAPTERS (For Seamless water flow into existing UI) --- **/
const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

function loadData() { JdroidX.Engine.load(); }
function saveData() { JdroidX.Engine.save(); }
function renderTable() { JdroidX.UI.render(); }
window.recallWebsite = (p) => JdroidX.Events.recallWebsite(p);
window.pushTheme = (i) => JdroidX.Events.pushTheme(i);

function renameTheme(i) {
    const s = JdroidX.state.themes[i];
    const n = prompt(`Rename "${s.name}":`, s.name);
    if (n) { s.name = toTitleCase(n); JdroidX.Events.merge(); }
}
function deleteTheme(i) {
    if (confirm("Delete Theme?")) {
        JdroidX.state.themes.splice(i, 1);
        JdroidX.state.elements.forEach(e => e.colors.splice(i, 1));
        JdroidX.Events.merge();
    }
}
function editElement(i) {
    const e = JdroidX.state.elements[i];
    const n = prompt(`Rename Layer "${e.name}":`, e.name);
    if (n) { e.name = toTitleCase(n); JdroidX.Events.merge(); }
}
function deleteElement(i) {
    if (confirm("Delete Layer?")) {
        JdroidX.state.elements.splice(i, 1);
        JdroidX.Events.merge();
    }
}
function toggleMapping(i) {
    alert("Protocol Verified: This layer is synchronized with the master matrix.");
}

window.renameTheme = renameTheme;
window.deleteTheme = deleteTheme;
window.editElement = editElement;
window.deleteElement = deleteElement;
window.toggleMapping = toggleMapping;

// RE-CONNECTING THE BRANCHES
function syncToWebsite() {
    JdroidX.Engine.save();
    if (JdroidX.state.activeSite === "Standalone Mode") {
        const p = prompt("Target Site Path:", JdroidX.state.lastPath);
        if (p) {
            JdroidX.state.lastPath = p;
            JdroidX.state.activeSite = p.split('/').pop();
            JdroidX.Engine.save();
        } else return;
    }
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('sync-options-modal').style.display = 'flex';
}

async function executeUniversalSync() {
    const pos = document.querySelector('input[name="menu-pos"]:checked')?.value;
    if (!pos) return alert("Select Position Protocol.");

    localStorage.setItem('jdroid-x-sync-config', JSON.stringify({
        position: pos,
        paletteUrl: window.location.href,
        websitePath: JdroidX.state.lastPath
    }));

    closeModal();
    window.open(JdroidX.state.lastPath, '_blank');
}

function syncToPalette() {
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('connect-modal').style.display = 'block';
}

async function connectToSite() {
    const p = document.getElementById('site-url-input').value.trim();
    if (!p) return;
    await JdroidX.Sync.connect(p);
}

window.syncToWebsite = syncToWebsite;
window.syncToPalette = syncToPalette;
window.executeUniversalSync = executeUniversalSync;
window.connectToSite = connectToSite;

function generateDefaultThemes() {
    const S = JdroidX.state;
    const bases = [
        { name: "Copper", hue: 28 },
        { name: "Aluminium", hue: 210 },
        { name: "Titan", hue: 200 },
        { name: "Red", hue: 0 },
        { name: "Green", hue: 130 },
        { name: "Blue", hue: 220 },
        { name: "Orange", hue: 32 }
    ];
    bases.forEach(b => {
        [1, 2, 3].forEach(v => {
            const prefix = v === 1 ? "Old" : v === 2 ? "New" : "GenZ";
            const name = `${prefix} ${b.name}`;
            const key = name.toLowerCase().replace(/\s/g, '-');
            if (!S.themes.find(t => t.key === key)) {
                S.themes.push({ name, key, active: false, locked: false });
                S.elements.forEach(el => el.colors.push(generateIntelligentColor(b.name, el.name, v, b.hue)));
            }
        });
    });
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function generateIntelligentColor(themeName, elName, variant, manualHue = null) {
    const name = (themeName || '').toLowerCase();
    let baseH = manualHue !== null ? manualHue : 0;
    let isGrey = false;

    // Semantic detection (only if hue not manually set)
    if (manualHue === null) {
        if (name.includes('grey') || name.includes('gray') || name.includes('silver') ||
            name.includes('slate') || name.includes('metal') || name.includes('stock')) {
            isGrey = true; baseH = 210;
        } else if (name.includes('red') || name.includes('blood') || name.includes('lava')) baseH = 0;
        else if (name.includes('orange') || name.includes('sunset') || name.includes('tiger')) baseH = 25;
        else if (name.includes('gold') || name.includes('yellow') || name.includes('sun')) baseH = 48;
        else if (name.includes('green') || name.includes('emerald') || name.includes('forest')) baseH = 135;
        else if (name.includes('cyan') || name.includes('teal') || name.includes('aqua')) baseH = 185;
        else if (name.includes('blue') || name.includes('ocean') || name.includes('sky')) baseH = 215;
        else if (name.includes('purple') || name.includes('violet') || name.includes('berry')) baseH = 275;
        else if (name.includes('pink') || name.includes('rose') || name.includes('candy')) baseH = 335;
        else { for (let i = 0; i < name.length; i++) baseH += name.charCodeAt(i); baseH = baseH % 360; }
    } else {
        // When manualHue is set, detect grey from name keywords
        if (name.includes('alumin') || name.includes('titan') || name.includes('silver') ||
            name.includes('grey') || name.includes('gray') || name.includes('metal')) {
            isGrey = true;
        }
    }

    let h = baseH, s = isGrey ? 5 : 70, l = 50;

    // 16-Layer Structural Role Logic
    if (elName.includes('Main Body')) { h = (baseH + 5) % 360; s = isGrey ? 2 : 20; l = 10; }
    else if (elName.includes('Sidebar')) { h = (baseH + 10) % 360; s = isGrey ? 3 : 25; l = 7; }
    else if (elName.includes('Header')) { h = baseH; s = isGrey ? 4 : 40; l = 18; }
    else if (elName.includes('Primary Font')) { s = isGrey ? 0 : 70; l = 92; }
    else if (elName.includes('Button')) { h = baseH; s = isGrey ? 8 : 45; l = 28; }
    else if (elName.includes('Secondary Accent')) { h = (baseH + 20) % 360; s = isGrey ? 5 : 50; l = 40; }
    else if (elName.includes('Accent')) { h = baseH; s = isGrey ? 15 : 100; l = 60; }
    else if (elName.includes('Highlighted')) { h = 45; s = 90; l = 75; }
    else if (elName.includes('Border')) { h = baseH; s = isGrey ? 2 : 15; l = 25; }
    else if (elName.includes('Card')) { h = (baseH + 5) % 360; s = isGrey ? 4 : 22; l = 14; }
    else if (elName.includes('Scrollbar')) { h = baseH; s = isGrey ? 0 : 20; l = 35; }
    else if (elName.includes('Success')) { h = 140; s = 80; l = 45; }
    else if (elName.includes('Input')) { h = baseH; s = isGrey ? 5 : 15; l = 5; }
    else if (elName.includes('Modal')) { h = baseH; s = isGrey ? 5 : 10; l = 2; }
    else if (elName.includes('Dynamic Glow')) { h = baseH; s = 100; l = 60; }
    else if (elName.includes('Interactive Shadow')) { h = baseH; s = 10; l = 5; }

    // Generation Era Logic
    if (variant === 1) { // Old School — Dull / Analog
        if (isGrey) {
            s = 2;
            if (elName.includes('Accent')) { l = 45; s = 8; }
            else if (elName.includes('Primary Font')) { l = 70; s = 0; }
            else if (elName.includes('Button')) { l = 35; }
        } else {
            s = Math.max(10, s - 30);
            if (elName.includes('Main Body')) l = 12;
            else if (elName.includes('Accent')) l = 45;
        }
    } else if (variant === 2) { // New School — Glossy / Vibrant
        if (isGrey) {
            s = 15; h = 215;
            if (elName.includes('Accent')) l = 85;
            else if (elName.includes('Button')) l = 45;
            else if (elName.includes('Main Body')) l = 8;
        } else {
            s = 100;
            if (elName.includes('Main Body')) l = 10;
            else if (elName.includes('Accent')) { l = 65; s = 100; }
            else if (elName.includes('Button')) { l = 40; h = (baseH - 10 + 360) % 360; }
        }
    } else { // AI GenZ — Neon / Futuristic
        if (isGrey) {
            if (elName.includes('Main Body')) l = 2;
            else if (elName.includes('Sidebar')) l = 4;
            else if (elName.includes('Accent')) { l = 95; s = 0; }
            else if (elName.includes('Header')) { l = 15; }
            else if (elName.includes('Button')) { l = 30; }
        } else {
            s = 100; h = (baseH + 35) % 360;
            if (elName.includes('Main Body')) { l = 3; h = (baseH + 200) % 360; s = 40; }
            else if (elName.includes('Sidebar')) { l = 6; h = (baseH + 200) % 360; s = 30; }
            else if (elName.includes('Header')) { l = 10; h = (baseH + 200) % 360; s = 50; }
            else if (elName.includes('Accent')) { l = 60; s = 100; h = (baseH + 35) % 360; }
            else if (elName.includes('Button')) { l = 35; h = (baseH + 75) % 360; s = 80; }
            else if (elName.includes('Primary Font')) { l = 96; s = 50; h = (baseH + 20) % 360; }
        }
    }

    return hslToHex(h, s, l);
}
function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('suggestion-modal').style.display = 'none';
    document.getElementById('connect-modal').style.display = 'none';
    const fallback = document.getElementById('fallback-area');
    if (fallback) fallback.style.display = 'none';
    const feedback = document.getElementById('connect-feedback');
    if (feedback) feedback.style.display = 'none';
    const syncOpts = document.getElementById('sync-options-modal');
    if (syncOpts) syncOpts.style.display = 'none';
}

const semanticPatterns = {
    "Main Body BG": ["bg", "body", "background", "backdrop", "main-bg"],
    "Sidebar / UI BG": ["side", "nav", "ui-bg", "panel", "sidebar"],
    "Header and Footer": ["header", "footer", "top-bar", "bottom-bar", "railing"],
    "Action Buttons": ["btn", "button", "cta", "action", "trigger"],
    "Primary Accent": ["accent", "brand", "primary", "theme"],
    "Secondary Accent": ["soft", "secondary", "sub-accent"],
    "Primary Font": ["text", "font", "body-text", "copy"],
    "Highlighted Font": ["highlight", "title", "gold", "heading"],
    "UI Border / Divider": ["border", "divide", "line", "separator"],
    "Card & Tile BG": ["card", "tile", "box", "module", "container"],
    "Scrollbar & Track": ["scroll", "thumb", "track"],
    "Success / Alert": ["status", "ok", "success", "alert", "warning", "error"],
    "Input & Form BG": ["input", "form", "field", "text-box", "search"],
    "Modal & Overlay": ["modal", "overlay", "popup", "dialog", "mask"],
    "Dynamic Glow": ["glow", "aura", "neon", "bloom"],
    "Interactive Shadow": ["shadow", "drop", "depth", "elevation"]
};

function getSemanticGroup(varName) {
    const n = varName.toLowerCase();
    for (const [group, patterns] of Object.entries(semanticPatterns)) {
        if (patterns.some(p => n.includes(p))) return group;
    }
    return null;
}

async function processStructure(content, basePath = "", sourceUrl = "") {
    const S = JdroidX.state;
    if (sourceUrl) {
        S.lastPath = sourceUrl;
        if (!S.logbook.includes(sourceUrl)) { S.logbook.unshift(sourceUrl); if (S.logbook.length > 20) S.logbook.pop(); }
        S.activeSite = sourceUrl.includes('/') ? sourceUrl.split('/').pop() : sourceUrl;
        const badge = document.getElementById('active-protocol-badge');
        if (badge) badge.innerText = S.activeSite;
    }
    const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;!]+)/g;
    let match, foundCount = 0, newCount = 0;
    const detectedVars = [];
    while ((match = varRegex.exec(content)) !== null) {
        const varName = match[1];
        const cleanName = toTitleCase(varName.replace(/-/g, ' '));
        if (!detectedVars.find(v => v.raw === varName)) detectedVars.push({ name: cleanName, raw: varName, value: match[2].trim() });
    }
    if (content.includes('<link') && content.includes('stylesheet')) {
        const linkRegex = /<link[^>]+href=["']([^"']+\.css)["']/g;
        let linkMatch;
        while ((linkMatch = linkRegex.exec(content)) !== null) {
            try {
                const cssContent = await (await fetch(basePath + linkMatch[1])).text();
                varRegex.lastIndex = 0;
                while ((match = varRegex.exec(cssContent)) !== null) {
                    if (!detectedVars.find(v => v.raw === match[1]))
                        detectedVars.push({ name: toTitleCase(match[1].replace(/-/g, ' ')), raw: match[1], value: match[2].trim() });
                }
            } catch (e) { }
        }
    }
    if (detectedVars.length === 0) { alert('No CSS variables found. Try pointing to a .css file or pasting code manually.'); return; }
    detectedVars.forEach(v => {
        let idx = S.elements.findIndex(el => el.name.toLowerCase() === v.name.toLowerCase());
        if (idx === -1) { const g = getSemanticGroup(v.raw); if (g) idx = S.elements.findIndex(el => el.name === g); }
        const color = v.value.startsWith('#') ? v.value : null;
        if (idx !== -1) { foundCount++; S.elements[idx].mapping = v.raw; if (color && S.elements[idx].role === 'Discovered Layer') S.elements[idx].colors.fill(color); }
        else { S.elements.push({ name: v.name, mapping: v.raw, role: 'Discovered Layer', colors: new Array(S.themes.length).fill(color || '#333333') }); newCount++; }
    });
    JdroidX.Events.merge();
    closeModal();
    alert(`✓ SYNC COMPLETE\n• ${foundCount} layers matched to structure.\n• ${newCount} new layers discovered.\n• Site: ${S.activeSite}`);
}

function applyThemeToDesigner(idx) {
    if (idx == -1) {
        document.documentElement.style.setProperty('--bg', '#0a0a0a');
        document.documentElement.style.setProperty('--card-bg', '#111');
        document.documentElement.style.setProperty('--accent', '#FF9933');
        return;
    }
    const themeIdx = parseInt(idx);
    const S = JdroidX.state;
    const getColor = (n) => { const el = S.elements.find(e => e.name === n); return el ? el.colors[themeIdx] : null; };
    const bg = getColor('Main Body BG');
    const cardBg = getColor('Card & Tile BG') || getColor('Sidebar / UI BG');
    const acc = getColor('Primary Accent');
    if (bg) document.documentElement.style.setProperty('--bg', bg);
    if (cardBg) document.documentElement.style.setProperty('--card-bg', cardBg);
    if (acc) document.documentElement.style.setProperty('--accent', acc);
}
window.applyThemeToDesigner = applyThemeToDesigner;

// ── RESET ──────────────────────────────────────────────────────────────────
function resetData() {
    if (confirm('Factory Reset? All custom themes and layers will be lost.')) {
        localStorage.clear();
        location.reload();
    }
}
window.resetData = resetData;

// ── THEME DISCOVERY MODAL ──────────────────────────────────────────────────
let discoveryHue = 0;

function openThemeDiscovery() {
    let themeName = prompt('Atmosphere name (e.g. Cyber Oasis, Red Flame):', 'Cyber Oasis');
    if (!themeName) return;
    themeName = toTitleCase(themeName);
    document.getElementById('disc-theme-name').innerText = themeName;
    const n = themeName.toLowerCase();
    if (n.includes('red')) discoveryHue = 0;
    else if (n.includes('orange') || n.includes('copper')) discoveryHue = 28;
    else if (n.includes('gold') || n.includes('yellow')) discoveryHue = 48;
    else if (n.includes('green')) discoveryHue = 135;
    else if (n.includes('cyan') || n.includes('teal')) discoveryHue = 185;
    else if (n.includes('blue')) discoveryHue = 215;
    else if (n.includes('purple')) discoveryHue = 275;
    else if (n.includes('pink')) discoveryHue = 335;
    else { let t = 0; for (let i = 0; i < n.length; i++) t += n.charCodeAt(i); discoveryHue = t % 360; }
    updateDiscoveryGrid(themeName);
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('suggestion-modal').style.display = 'flex';
}
window.openThemeDiscovery = openThemeDiscovery;

function updateDiscoveryGrid(themeName) {
    const S = JdroidX.state;
    S.pendingOptions = {
        baseName: themeName,
        option1: S.elements.map(el => generateIntelligentColor(themeName, el.name, 1, discoveryHue)),
        option2: S.elements.map(el => generateIntelligentColor(themeName, el.name, 2, discoveryHue)),
        option3: S.elements.map(el => generateIntelligentColor(themeName, el.name, 3, discoveryHue))
    };
    const grid = document.getElementById('dynamic-grid');
    if (!grid) return;
    grid.innerHTML = '';
    S.elements.forEach((el, idx) => {
        const label = document.createElement('div');
        label.style.padding = '5px 10px';
        label.innerHTML = `<span style="color:#aaa; font-size:0.7rem;">${el.name}</span>`;
        grid.appendChild(label);
        [S.pendingOptions.option1[idx], S.pendingOptions.option2[idx], S.pendingOptions.option3[idx]].forEach(val => {
            const box = document.createElement('div');
            box.className = 'option-choice';
            box.innerHTML = `<div class="color-box" style="background:${val}; width:22px; height:22px;"></div><span class="hex-code" style="font-size:0.6rem;">${val}</span>`;
            grid.appendChild(box);
        });
    });
    const marker = document.getElementById('hue-selector-marker');
    const preview = document.getElementById('anchor-color-preview');
    const label = document.getElementById('anchor-color-name');
    if (marker) marker.style.left = `${(discoveryHue / 360) * 100}%`;
    if (preview) preview.style.background = `hsl(${discoveryHue},100%,60%)`;
    if (label) label.innerText = themeName.split(' ')[0];
}
window.updateDiscoveryGrid = updateDiscoveryGrid;

// Interactive hue bar
document.addEventListener('DOMContentLoaded', () => {
    const hueBar = document.getElementById('semantic-hue-bar');
    if (!hueBar) return;
    const handleHue = (e) => {
        const rect = hueBar.getBoundingClientRect();
        discoveryHue = Math.round((Math.max(0, Math.min(e.clientX - rect.left, rect.width)) / rect.width) * 360);
        updateDiscoveryGrid(document.getElementById('disc-theme-name').innerText);
    };
    hueBar.onmousedown = (e) => {
        handleHue(e);
        const move = (me) => handleHue(me);
        const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
    };
});

// ── APPLY SUGGESTION ───────────────────────────────────────────────────────
function applySuggestedTheme() {
    const S = JdroidX.state;
    const opt = document.querySelector('input[name="theme-option"]:checked')?.value;
    if (!opt || !S.pendingOptions) return;
    const colors = S.pendingOptions[`option${opt}`];
    const prefix = opt === '1' ? 'Old' : opt === '2' ? 'New' : 'GenZ';
    const fullName = toTitleCase(`${prefix} ${S.pendingOptions.baseName}`);
    const key = fullName.toLowerCase().replace(/\s/g, '-');
    S.themes.push({ name: fullName, key, active: true, locked: false });
    S.elements.forEach((el, i) => el.colors.push(colors[i]));
    JdroidX.Events.merge();
    closeModal();
    alert(`"${fullName}" created and added!`);
}
window.applySuggestedTheme = applySuggestedTheme;

// ── MANUAL CODE SCAN ───────────────────────────────────────────────────────
async function processManualContent() {
    const code = document.getElementById('manual-code-input')?.value;
    if (!code) return alert('Please paste code first.');
    await processStructure(code);
}
window.processManualContent = processManualContent;

// ── ADD UI LAYER ───────────────────────────────────────────────────────────
function addNewElement() {
    const name = prompt('Element Name:'); if (!name) return;
    const role = prompt('Visual Role:'); if (!role) return;
    const S = JdroidX.state;
    S.elements.push({ name: toTitleCase(name), role: toTitleCase(role), colors: new Array(S.themes.length).fill('#333333') });
    JdroidX.Events.merge();
}
window.addNewElement = addNewElement;

// ── EXPORT BLUEPRINT ───────────────────────────────────────────────────────
function exportBlueprint() {
    const S = JdroidX.state;
    let bp = '/* JDROID-X DESIGN ARCHITECT BLUEPRINT */\n\n';
    S.elements.forEach(el => {
        const varName = el.mapping || el.name.toLowerCase().replace(/ \/ /g, '-').replace(/ & /g, '-').replace(/ /g, '-');
        bp += `/* ${el.name} (${el.role}) */\n`;
        S.themes.forEach((t, ti) => { bp += `--${varName}-${t.key}: ${el.colors[ti]};\n`; });
        bp += '\n';
    });
    navigator.clipboard.writeText(bp).then(() => alert('Blueprint copied to clipboard! Paste into any website :root block.'));
}
window.exportBlueprint = exportBlueprint;

// ── COPY AI PROMPT ─────────────────────────────────────────────────────────
function copyAiPrompt() {
    const text = document.getElementById('ai-prompt-text')?.innerText;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const s = document.getElementById('copy-status');
        if (s) { s.innerText = '✓ Prompt Copied! Paste it in our chat now.'; s.style.color = '#44ff44'; setTimeout(() => { s.innerText = 'Click the green text to copy'; s.style.color = '#666'; }, 3000); }
    });
}
window.copyAiPrompt = copyAiPrompt;
