/**
 * JDROID-X UI MODULE
 * Dynamic Interface Rendering
 */

JdroidX.UI = {
    render: function () {
        const S = JdroidX.state;
        const headerRow = document.getElementById('header-row');
        const tbody = document.getElementById('table-body');
        if (!headerRow || !tbody) return;

        const visibleIdxList = S.themes
            .map((t, i) => ({ ...t, index: i }))
            .filter(t => t.visible)
            .sort((a, b) => (b.active === a.active) ? 0 : b.active ? 1 : -1)
            .map(t => t.index);

        const logOptions = S.logbook.map(site => {
            const short = site.includes('/') ? site.split('/').pop() : site;
            return `<option value="${site}" title="${site}" ${S.activeSite === short ? 'selected' : ''}>${short}</option>`;
        }).join('');

        headerRow.innerHTML = `
            <th class="push-col">Mapping</th>
            <th class="theme-name">
                <div style="display:flex; flex-direction:column; gap:4px; align-items:center;">
                    <span style="text-align:center; display:block;">UI Layer</span>
                    <select id="logbook-dropdown" onchange="JdroidX.Actions.recallWebsite(this.value)" 
                        style="background:#000; color:var(--accent); border:1px solid #333; font-family:'JetBrains Mono', monospace; font-size:0.75rem; border-radius:4px; padding:3px; width:auto; max-width:100%; cursor:pointer; text-align:center;">
                        <option value="">-- History --</option>
                        ${logOptions}
                    </select>
                </div>
            </th>
            <th class="proto-col" style="text-align:center;">
                <div style="display:flex; flex-direction:column; gap:4px; width:100%;">
                    <span style="font-size:0.55rem; opacity:0.6; display:block;">AUTOSYNC LOG</span>
                    <span style="font-size:0.75rem; color:var(--accent); font-weight:800; display:block;">PROTOCOL</span>
                </div>
            </th>
        `;

        visibleIdxList.forEach(tIdx => {
            const theme = S.themes[tIdx];
            const isPinned = theme.active;
            const th = document.createElement('th');
            th.className = 'color-cell';
            th.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
                    <span style="color:white; font-weight:800; font-size:0.7rem;">${theme.name}</span>
                    <button class="btn-push ${isPinned ? 'active' : ''}" onclick="JdroidX.Actions.pushTheme(${tIdx})">
                        ${isPinned ? 'PINNED' : 'PIN'}
                    </button>
                    ${!theme.locked ?
                    `<div class="row-options"><span onclick="JdroidX.Actions.renameTheme(${tIdx})">✎</span><span onclick="JdroidX.Actions.deleteTheme(${tIdx})">×</span></div>`
                    : '<span style="font-size:0.5rem; color:#44ff44; opacity:0.4;">LOCKED</span>'}
                </div>
            `;
            headerRow.appendChild(th);
        });

        tbody.innerHTML = '';
        S.elements.forEach((el, elIdx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="push-col">
                    <div class="sync-indicator active" onclick="JdroidX.Actions.toggleMapping(${elIdx})">✓</div>
                </td>
                <td class="theme-name">
                    <div style="display:flex; flex-direction:column;">
                        <span>${el.name}</span>
                    </div>
                    <div class="row-options">
                        <span onclick="JdroidX.Actions.editElement(${elIdx})">✎</span>
                        <span onclick="JdroidX.Actions.deleteElement(${elIdx})">×</span>
                    </div>
                </td>
                <td class="proto-col" onclick="JdroidX.Actions.remapElement(${elIdx})">
                    <code>--${el.mapping}</code>
                </td>
            `;

            visibleIdxList.forEach(tIdx => {
                const color = el.colors[tIdx] || "#333333";
                const td = document.createElement('td');
                td.className = 'color-cell';
                td.innerHTML = `
                    <div class="color-input-wrapper">
                        <input type="color" value="${color}" oninput="JdroidX.Actions.editColor(${tIdx}, ${elIdx}, this.value)" onchange="JdroidX.Engine.save()">
                        <span class="hex-label">${color}</span>
                    </div>
                `;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        this.updateSelector();
    },

    updateSelector: function () {
        const sel = document.getElementById('theme-selector');
        if (!sel) return;
        const current = sel.value;
        sel.innerHTML = '<option value="-1">Base Designer Theme</option>';
        JdroidX.state.themes.forEach((t, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.innerText = t.name;
            sel.appendChild(opt);
        });
        sel.value = current;
    },

    renderVisibilityPanel: function () {
        const list = document.getElementById('tvp-list');
        const count = document.getElementById('tvp-count');
        if (!list) return;

        list.innerHTML = '';
        const S = JdroidX.state;
        const visibleCount = S.themes.filter(t => t.visible).length;
        if (count) count.innerText = `${visibleCount} / ${S.themes.length}`;

        S.themes.forEach((t, i) => {
            const item = document.createElement('div');
            item.className = 'tvp-item';
            item.onclick = (e) => {
                if (e.target.tagName !== 'INPUT') {
                    const cb = item.querySelector('input');
                    cb.checked = !cb.checked;
                    JdroidX.Actions.toggleThemeVisibility(i, cb.checked);
                }
            };
            item.innerHTML = `
                <input type="checkbox" id="tvp-cb-${i}" ${t.visible ? 'checked' : ''} 
                    onchange="JdroidX.Actions.toggleThemeVisibility(${i}, this.checked)">
                <span class="tvp-name">${t.name}</span>
            `;
            list.appendChild(item);
        });
    }
};

window.closeModal = () => JdroidX.Actions.closeModal();
