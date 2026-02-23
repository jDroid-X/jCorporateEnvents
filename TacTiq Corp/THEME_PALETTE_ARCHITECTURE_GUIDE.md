# TacTiq Theme Architecture Guide
## 12-Layer UI Matrix (The Master Blueprint)

This guide documents the semantic mapping between the **Atmospheric Theme Designer** and the website's technical structure. Use this blueprint to replicate the TacTiq experience across new projects.

---

### 1. Structural Variables (CSS :root)
Every theme generated follows this variable mapping. You can paste these into any project's `:root`.

| UI Element | CSS Variable | Targeted Visual Role |
| :--- | :--- | :--- |
| **Main Body BG** | `--bg` | Overall page backdrop / deep background. |
| **Sidebar / UI BG** | `--side-bg` | Navigation panels and structural containers. |
| **Header and Footer** | `--header-bg` | Top rails and bottom utility bars. |
| **Action Buttons** | `--btn-bg` | Interactive elements (Inactive state). |
| **Primary Accent** | `--accent` | Brand color / active states / borders. |
| **Secondary Accent** | `--accent-soft` | Sub-highlights / secondary buttons. |
| **Primary Font** | `--text` | Primary body copy and descriptions. |
| **Highlighted Font** | `--highlight-gold` | Pinned items / active titles / emphasis. |
| **UI Border / Divider**| `--border` | Subtle grid lines and section dividers. |
| **Card & Tile BG** | `--card-bg` | Localized content blocks (e.g., Strategy Tiles). |
| **Scrollbar & Track** | `--scroll-thumb` | Custom browser-level scrollbar theming. |
| **Success / Alert** | `--status-ok` | User feedback indicators and success states. |

---

### 2. HTML Implementation (Class Blueprint)
To ensure the theme works instantly, new websites must use these standard HTML structures:

#### **A. Layout Shell**
```html
<div class="app-container">
    <aside id="sidebar"> <!-- Uses --side-bg --> </aside>
    <main> <!-- Uses --bg -->
        <header class="slim-header"> <!-- Uses --header-bg --> </header>
        <div class="viewer-container"> <!-- Uses --bg --> </div>
        <footer class="slim-footer"> <!-- Uses --header-bg --> </footer>
    </main>
</div>
```

#### **B. Interactive Elements**
| Element Type | Required Class | CSS Association |
| :--- | :--- | :--- |
| **Primary Button** | `.btn` | `background: var(--btn-bg); color: var(--text);` |
| **Active Item** | `.active` | `color: var(--highlight-gold); border-color: var(--accent);` |
| **Content Tile** | `.strategy-tile` | `background: var(--card-bg); border: 1px solid var(--border);` |
| **Sidebar Link** | `.nav-item` | `color: var(--text);` |

---

### 3. Cloning Procedure (Website #2 & #3)
1. **Copy Logic**: Copy the `index.html` structure from the **PDF Stories Master Blueprint**.
2. **Apply Theme**: Paste the CSS variables exported from the Designer into the new site's `style.css`.
3. **Map Assets**: Update the `metadata.json` to point to the new project's specific images and videos.

**© 2026 TACTIQ • ARCHITECTURAL BLUEPRINT v1.0**
