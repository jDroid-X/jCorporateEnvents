/**
 * JDROID-X CORE ENGINE
 * Encapsulated State Management
 */

window.JdroidX = {
    state: {
        themes: [],
        elements: [],
        activeSite: "Standalone Mode",
        logbook: [],
        lastPath: "",
        pendingOptions: null,
        constants: {
            THEME_KEY: 'tactiq-matrix-themes',
            ELEMENT_KEY: 'tactiq-matrix-elements',
            SITE_KEY: 'tactiq-active-site',
            LOGBOOK_KEY: 'TacTiqLogBook',
            PATH_KEY: 'tactiq-last-path',
            VISIBLE_KEY: 'tactiq-visible-themes'
        }
    },

    // Modules will be attached here
    Engine: {},
    UI: {},
    Actions: {},
    Sync: {}
};

// Utilities
window.Utils = {
    toTitleCase: str => {
        if (!str) return "";
        return str.split(' ').map(word => {
            if (!word) return "";
            const upper = word.toUpperCase();
            const techTerms = ["BG", "UI", "CSS", "PDF", "API"];
            if (techTerms.includes(upper)) return upper;
            const brands = { "tactiq": "TacTiq", "genz": "GenZ", "stories": "Stories" };
            if (brands[word.toLowerCase()]) return brands[word.toLowerCase()];
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    },

    hslToHex: (h, s, l) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    }
};
