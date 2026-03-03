/**
 * JDROID-X ENGINE MODULE
 * Data Persistence & Pattern Generation
 */

JdroidX.Engine = {
    init: function () {
        this.load();
        JdroidX.UI.render();
        JdroidX.UI.renderVisibilityPanel();
        if (JdroidX.Actions.updateCallerContext) JdroidX.Actions.updateCallerContext();
    },

    load: function () {
        const S = JdroidX.state;
        const C = S.constants;
        try {
            // MIGRATION: check version and clean old jdroid keys if present
            const storedVersion = localStorage.getItem('tactiq-version');
            if (storedVersion !== 'V11.2') {
                localStorage.removeItem(C.THEME_KEY);
                localStorage.setItem('tactiq-version', 'V11.2');
            }

            const savedThemes = localStorage.getItem(C.THEME_KEY);
            const savedElements = localStorage.getItem(C.ELEMENT_KEY);
            const savedSite = localStorage.getItem(C.SITE_KEY);
            const savedLog = localStorage.getItem(C.LOGBOOK_KEY);
            const savedPath = localStorage.getItem(C.PATH_KEY);

            if (savedThemes) S.themes = JSON.parse(savedThemes);
            if (savedElements) S.elements = JSON.parse(savedElements);
            if (savedSite) S.activeSite = savedSite;
            if (savedLog) S.logbook = JSON.parse(savedLog);
            if (savedPath) S.lastPath = savedPath;

            if (S.themes.length === 0 || S.elements.length === 0) {
                this.setupDefaults();
            }

            this.loadVisibility();
        } catch (e) {
            console.error("Critical Engine Failure:", e);
            this.setupDefaults();
        }
    },

    save: function () {
        const S = JdroidX.state;
        const C = S.constants;
        localStorage.setItem(C.THEME_KEY, JSON.stringify(S.themes));
        localStorage.setItem(C.ELEMENT_KEY, JSON.stringify(S.elements));
        localStorage.setItem(C.SITE_KEY, S.activeSite || "Standalone");
        localStorage.setItem(C.LOGBOOK_KEY, JSON.stringify(S.logbook));
        localStorage.setItem(C.PATH_KEY, S.lastPath);

        // Store visibility separately for sync persistence
        const visMap = S.themes.map(t => t.visible);
        localStorage.setItem(C.VISIBLE_KEY, JSON.stringify(visMap));

        const pill = document.getElementById('status-pill');
        if (pill) {
            pill.style.opacity = '1';
            setTimeout(() => pill.style.opacity = '0', 2000);
        }
    },

    setupDefaults: function () {
        JdroidX.state.themes = [];
        JdroidX.state.elements = [
            { name: "Main Body BG", mapping: "main-bg", role: "Interface Background", colors: [] },
            { name: "Sidebar / UI BG", mapping: "side-bg", role: "UI Container", colors: [] },
            { name: "Header and Footer", mapping: "header-bg", role: "Navigation Bar", colors: [] },
            { name: "Action Buttons", mapping: "btn-bg", role: "Triggers", colors: [] },
            { name: "Primary Accent", mapping: "accent", role: "Brand Color", colors: [] },
            { name: "Secondary Accent", mapping: "accent-soft", role: "Soft Highlight", colors: [] },
            { name: "Primary Font", mapping: "text-main", role: "Typography", colors: [] },
            { name: "Highlighted Font", mapping: "text-gold", role: "Critical Info", colors: [] },
            { name: "UI Border / Divider", mapping: "border", role: "Structure", colors: [] },
            { name: "Card & Tile BG", mapping: "card-bg", role: "Content Modules", colors: [] },
            { name: "Scrollbar & Track", mapping: "scroll-thumb", role: "Navigation Tool", colors: [] },
            { name: "Success / Alert", mapping: "success", role: "Feedback", colors: [] },
            { name: "Input & Form BG", mapping: "input-bg", role: "User Input", colors: [] },
            { name: "Modal & Overlay", mapping: "modal-bg", role: "Dialogue Mask", colors: [] },
            { name: "Dynamic Glow", mapping: "glow", role: "FX Layer", colors: [] },
            { name: "Interactive Shadow", mapping: "shadow", role: "Depth Module", colors: [] }
        ];
        this.generateDefaultThemes();
        this.applyDefaultVisibility();
        this.save();
    },

    applyDefaultVisibility: function () {
        JdroidX.state.themes.forEach((t, i) => {
            t.visible = i < 7;
        });
    },

    loadVisibility: function () {
        const saved = localStorage.getItem(JdroidX.state.constants.VISIBLE_KEY);
        if (saved) {
            const map = JSON.parse(saved);
            JdroidX.state.themes.forEach((t, i) => {
                if (map[i] !== undefined) t.visible = map[i];
            });
        } else {
            this.applyDefaultVisibility();
        }
    },

    generateDefaultThemes: function () {
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
                    S.themes.push({ name, key, active: false, locked: false, visible: false });
                    S.elements.forEach(el => el.colors.push(this.generateIntelligentColor(b.name, el.name, v, b.hue)));
                }
            });
        });
    },

    generateIntelligentColor: function (themeName, elName, variant, manualHue = null) {
        const name = (themeName || '').toLowerCase();
        let baseH = manualHue !== null ? manualHue : 0;
        let isGrey = false;

        if (manualHue === null) {
            if (name.includes('grey') || name.includes('gray') || name.includes('silver') ||
                name.includes('slate') || name.includes('metal')) {
                isGrey = true; baseH = 210;
            } else if (name.includes('red')) baseH = 0;
            else if (name.includes('orange')) baseH = 25;
            else if (name.includes('gold')) baseH = 48;
            else if (name.includes('green')) baseH = 135;
            else if (name.includes('blue')) baseH = 215;
            else { for (let i = 0; i < name.length; i++) baseH += name.charCodeAt(i); baseH = baseH % 360; }
        } else {
            if (name.includes('alumin') || name.includes('titan') || name.includes('silver') ||
                name.includes('grey') || name.includes('gray') || name.includes('metal')) {
                isGrey = true;
            }
        }

        let h = baseH, s = isGrey ? 5 : 70, l = 50;

        // Semantic Role Logic
        if (elName.includes('Main Body')) { h = (baseH + 5) % 360; s = isGrey ? 2 : 20; l = 10; }
        else if (elName.includes('Sidebar')) { h = (baseH + 10) % 360; s = isGrey ? 3 : 25; l = 7; }
        else if (elName.includes('Header')) { h = baseH; s = isGrey ? 4 : 40; l = 18; }
        else if (elName.includes('Primary Font')) { s = isGrey ? 0 : 70; l = 92; }
        else if (elName.includes('Button')) { h = baseH; s = isGrey ? 8 : 45; l = 28; }
        else if (elName.includes('Accent')) { h = baseH; s = isGrey ? 15 : 100; l = 60; }
        else if (elName.includes('Secondary Accent')) { h = (baseH + 20) % 360; s = isGrey ? 5 : 50; l = 40; }
        else if (elName.includes('Highlighted')) { h = 45; s = 90; l = 75; }
        else if (elName.includes('Border')) { h = baseH; s = isGrey ? 2 : 15; l = 25; }
        else if (elName.includes('Card')) { h = (baseH + 5) % 360; s = isGrey ? 4 : 22; l = 14; }
        else if (elName.includes('Scrollbar')) { h = baseH; s = isGrey ? 0 : 20; l = 35; }
        else if (elName.includes('Success')) { h = 140; s = 80; l = 45; }
        else if (elName.includes('Input & Form')) { h = baseH; s = isGrey ? 5 : 15; l = 5; }
        else if (elName.includes('Modal & Overlay')) { h = baseH; s = isGrey ? 5 : 10; l = 2; }
        else if (elName.includes('Dynamic Glow')) { h = baseH; s = 100; l = 60; }
        else if (elName.includes('Interactive Shadow')) { h = baseH; s = 10; l = 5; }

        // Variant Eras
        if (variant === 1) { // Old school
            if (isGrey) { s = 2; l = 35; }
            else { s = Math.max(10, s - 30); l = Math.max(10, l - 5); }
        } else if (variant === 2) { // New school
            if (isGrey) { s = 15; h = 215; l = 45; }
            else { s = 100; l = Math.min(90, l + 5); }
        } else { // GenZ
            s = 100;
            h = (baseH + 35) % 360;
            if (elName.includes("Main Body")) { l = 3; h = (baseH + 200) % 360; s = 40; }
            else if (elName.includes("Accent")) { l = 60; s = 100; h = (baseH + 35) % 360; }
        }

        return Utils.hslToHex(h, s, l);
    }
};
