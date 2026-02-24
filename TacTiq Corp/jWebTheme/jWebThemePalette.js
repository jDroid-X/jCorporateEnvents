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
        { name: "Copper", hue: 25 }, { name: "Aluminium", hue: 210, isGrey: true },
        { name: "Uranium", hue: 80 }, { name: "Ocean", hue: 195 }
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

function generateIntelligentColor(baseName, elName, variant, baseHue) {
    const isDark = elName.includes("BG") || elName.includes("Shadow");
    const isAccent = elName.includes("Accent") || elName.includes("Glow");
    let l = isDark ? 10 : (isAccent ? 50 : 90);
    if (variant === 3) l += 10;
    return `hsl(${baseHue}, ${variant === 1 ? '30%' : '70%'}, ${l}%)`;
}

function closeModal() {
    document.querySelectorAll('.modal-overlay, #suggestion-modal, #connect-modal, #sync-options-modal').forEach(el => el.style.display = 'none');
}

async function processStructure(content, basePath = "", sourceUrl = "") {
    const S = JdroidX.state;
    if (sourceUrl) {
        S.lastPath = sourceUrl;
        if (!S.logbook.includes(sourceUrl)) {
            S.logbook.unshift(sourceUrl);
            if (S.logbook.length > 20) S.logbook.pop();
        }
        S.activeSite = sourceUrl.includes('/') ? sourceUrl.split('/').pop() : sourceUrl;
    }
    const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;!]+)/g;
    let match;
    while ((match = varRegex.exec(content)) !== null) {
        const raw = match[1];
        const name = toTitleCase(raw.replace(/-/g, ' '));
        let exists = S.elements.find(e => e.name.toLowerCase() === name.toLowerCase());
        const val = match[2].trim();
        const color = val.startsWith('#') ? val : null;
        if (exists) {
            exists.mapping = raw;
            if (color) exists.colors.forEach((c, i) => exists.colors[i] = color);
        } else {
            S.elements.push({ name, mapping: raw, role: "Discovered Layer", colors: new Array(S.themes.length).fill(color || "#333333") });
        }
    }
    JdroidX.Events.merge();
    closeModal();
    alert(`✓ Protocol Merged: ${S.activeSite} synchronized.`);
}

function applyThemeToDesigner(idx) {
    if (idx == -1) return;
    const themeIdx = parseInt(idx);
    const S = JdroidX.state;
    const getColor = (n) => {
        const el = S.elements.find(e => e.name === n);
        return el ? el.colors[themeIdx] : null;
    };
    const bg = getColor("Main Body BG");
    const acc = getColor("Primary Accent");
    if (bg) document.documentElement.style.setProperty('--bg', bg);
    if (acc) document.documentElement.style.setProperty('--accent', acc);
}
