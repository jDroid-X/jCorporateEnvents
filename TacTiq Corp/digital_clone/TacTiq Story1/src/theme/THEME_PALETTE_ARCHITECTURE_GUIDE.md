# Jdroid-X Theme Architecture Guide (V11.2 - ENTERPRISE MODULAR EDITION)

## Unified 16-Layer UI Matrix (The Master Blueprint)

This guide documents the semantic mapping between the **Atmospheric Theme Designer** and the website's technical structure under the new **Enterprise Modular Architecture**.

---

### 1. Enterprise Project Structure (V11.2)

With the V11.2 update, the files are reorganized for high portability (Git/Drive/Desktop) using relative pathing:

- **`jWebThemePalette.html`**: The unified Designer entry point.
- **`assets/js/`**: Modularized logic suite (Core, Engine, UI, Actions).
- **`assets/css/style.css`**: Centralized Design System tokens.
- **`assets/img/`**: Brand assets and UI icons.

---

### 2. The 16-Layer Matrix (Architectural Stability)

Every Jdroid-X production site is built on this 16-layer semantic matrix. V11.2 uses the unified `tactiq-` synchronization protocol for seamless cross-site theme persistence.

| UI Element Layer (220px) | Technical Role | Website Protocol (200px) | Semantic Matching Patterns |
| :--- | :--- | :--- | :--- |
| **Main Body BG** | Page Backdrop | `--main-bg` | `bg, body, background, backdrop` |
| **Sidebar / UI BG** | Navigation Rails | `--side-bg` | `side, nav, ui-bg, sidebar` |
| **Header and Footer** | Structural Bars | `--header-bg` | `header, footer, top-bar, railing` |
| **Action Buttons** | Primary Interaction | `--btn-bg` | `btn, button, cta, action` |
| **Primary Accent** | Brand Identity | `--accent` | `accent, brand, primary, theme` |
| **Secondary Accent** | Soft Highlights | `--accent-soft` | `soft, secondary, sub-accent` |
| **Primary Font** | Content Body | `--text-main` | `text, font, body-text, copy` |
| **Highlighted Font** | System Feedback | `--text-gold` | `highlight, title, gold, heading` |
| **UI Border / Divider**| Tactical Grid | `--border` | `border, divide, line, separator` |
| **Card & Tile BG** | Content Modules | `--card-bg` | `card, tile, box, module` |
| **Scrollbar & Track** | Utility Theming | `--scroll-thumb` | `scroll, thumb, track` |
| **Success / Alert** | Status Feedback | `--success` | `status, ok, success, alert` |
| **Input & Form BG** | Input Surfaces | `--input-bg` | `input, form, field, text-box` |
| **Modal & Overlay** | Pop-up Layers | `--modal-bg` | `modal, overlay, popup, dialog` |
| **Dynamic Glow** | Aura Effects | `--glow` | `glow, aura, neon, bloom` |
| **Interactive Shadow** | Depth Control | `--shadow` | `shadow, drop, depth, elevation` |

---

### 3. Tactical Synchronization (V11.2)

#### **A. Modular Portability**

The system now uses **Relative URL handshakes**. Whether running from GitHub, a local Drive, or the Windows Desktop, the palette and target websites identify each other using standard URI navigation (e.g., `../../jWebTheme/`).

#### **B. TacTiq Storage Protocol**

Legacy `jdroidx-` keys have been migrated to the global `tactiq-` namespace:

- `tactiq-matrix-themes`: Stores all 21+ atmosphere definitions.
- `tactiq-matrix-elements`: Stores the 16-layer mapping blueprint.
- `tactiq-sync-config`: Configures browser-link placement and handshake URLs.

#### **C. Real-Time Automation Bridge**

The **Satellite Engine** (`jSystemWebPayload.js`) now polls the modular designer V11.2 every 500ms, ensuring that code changes in the designer manifest instantly on any connected website without requiring a refresh.

---

### 4. System Evolution Log (Milestones)

- **V10.5**: **Satellite Edition** - Implemented Satellite Payloads and Many-to-One Governance.
- **V11.0**: Core Designer Suite overhaul with atmospheric logic.
- **V11.2**: **Enterprise Modular Edition** - Restructured logic into modular assets (`/js`, `/css`), implemented relative path portability, and unified all storage under the `tactiq-` protocol.

---
**© 2026 JDROID-X • ENTERPRISE BLUEPRINT v11.2**
