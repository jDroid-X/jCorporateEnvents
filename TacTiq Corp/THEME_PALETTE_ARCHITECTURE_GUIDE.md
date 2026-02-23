# TacTiq Theme Architecture Guide (V9.5)
## 12-Layer UI Matrix (The Master Blueprint)

This guide documents the semantic mapping between the **Atmospheric Theme Designer** and the website's technical structure. Use this blueprint to replicate the TacTiq experience across new projects.

---

### 1. Unified 12-Layer Matrix
All Jdroid-X projects now follow this horizontal command structure.

| UI Element Layer | Technical Role | Website Protocol (Default) |
| :--- | :--- | :--- |
| **Main Body BG** | Page Backdrop | `--main-body-bg` |
| **Sidebar / UI BG** | Navigation Rails | `--sidebar-ui-bg` |
| **Header and Footer** | Structural Bars | `--header-and-footer` |
| **Action Buttons** | Primary Interaction | `--action-buttons` |
| **Primary Accent** | Brand Identity | `--primary-accent` |
| **Secondary Accent** | Soft Highlights | `--secondary-accent` |
| **Primary Font** | Content Body | `--primary-font` |
| **Highlighted Font** | Indicators / Titles | `--highlighted-font` |
| **UI Border / Divider**| Tactical Grid | `--ui-border-divider` |
| **Card & Tile BG** | Content Modules | `--card-tile-bg` |
| **Scrollbar & Track** | Utility Theming | `--scrollbar-track` |
| **Success / Alert** | Status Feedback | `--success-alert` |

---

### 2. High-Efficiency Features (Added in V9.0+)

#### **A. Auto-Reprotocol Engine**
When connecting to a new website, the Designer automatically detects the site's unique CSS variable names. 
- **Dynamic Re-Mapping**: The "Website Protocol" column shifts to match the target site's code instantly.
- **Architectural Independence**: You can rename "UI Element Layer" (e.g., to "My Cool Background") while keeping the link to `--main-body-bg`.

#### **B. Discovery Intelligence (No-Code Sync)**
For unknown websites where direct connection is blocked:
1. View Source (Ctrl+U) on the target site.
2. Copy All (Ctrl+A).
3. Paste into the **Intelligent Discovery** box.
4. The system scours the code and extracts the UI architecture automatically.

#### **C. Tri-Column Command Center**
The compact 3-column header (Identity, Atmosphere, Actions) ensures maximum screen real estate for the design matrix while providing 1-click access to all system controls.

---

### 3. Cloning Procedure (Website #2 & #3)
1. **Copy Logic**: Copy the `index.html` structure from the **PDF Stories Master Blueprint**.
2. **Apply Theme**: Use **"↑ Sync To Website"** to push the JSON matrix to your production site.
3. **Validate**: Check the "Website Protocol" column in the Designer to ensure it matches the target site's variables.

---
**© 2026 TACTIQ • ARCHITECTURAL BLUEPRINT v9.5 - MATRIX OPTIMIZED**
