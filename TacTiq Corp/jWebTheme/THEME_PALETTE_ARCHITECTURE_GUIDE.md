# Jdroid-X Theme Architecture Guide (V10.5 - SATELLITE EDITION)
## 16-Layer UI Matrix (The Master Blueprint)

This guide documents the semantic mapping between the **Atmospheric Theme Designer** and the website's technical structure.

---

### 1. Unified 16-Layer Matrix (Architectural Stability)
Every Jdroid-X production site is built on this 16-layer semantic matrix. In V10.5, the matrix is fully reinforced with duplicate mapping validation and high-volume clustering.

| UI Element Layer (220px) | Technical Role | Website Protocol (200px) | Semantic Matching Patterns |
| :--- | :--- | :--- | :--- |
| **Main Body BG** | Page Backdrop | `--main-body-bg` | `bg, body, background, backdrop` |
| **Sidebar / UI BG** | Navigation Rails | `--sidebar-ui-bg` | `side, nav, ui-bg, sidebar` |
| **Header and Footer** | Structural Bars | `--header-and-footer` | `header, footer, top-bar, railing` |
| **Action Buttons** | Primary Interaction | `--action-buttons` | `btn, button, cta, action` |
| **Primary Accent** | Brand Identity | `--primary-accent` | `accent, brand, primary, theme` |
| **Secondary Accent** | Soft Highlights | `--secondary-accent` | `soft, secondary, sub-accent` |
| **Primary Font** | Content Body | `--primary-font` | `text, font, body-text, copy` |
| **Highlighted Font** | System Feedback | `--highlighted-font` | `highlight, title, gold, heading` |
| **UI Border / Divider**| Tactical Grid | `--ui-border-divider` | `border, divide, line, separator` |
| **Card & Tile BG** | Content Modules | `--card-tile-bg` | `card, tile, box, module` |
| **Scrollbar & Track** | Utility Theming | `--scrollbar-track` | `scroll, thumb, track` |
| **Success / Alert** | Status Feedback | `--success-alert` | `status, ok, success, alert` |
| **Input & Form BG** | Input Surfaces | `--input-form-bg` | `input, form, field, text-box` |
| **Modal & Overlay** | Pop-up Layers | `--modal-overlay` | `modal, overlay, popup, dialog` |
| **Dynamic Glow** | Aura Effects | `--dynamic-glow` | `glow, aura, neon, bloom` |
| **Interactive Shadow** | Depth Control | `--interactive-shadow` | `shadow, drop, depth, elevation` |

---

### 2. Tactical Architect Features (V10.5)

#### **A. High-Volume Governance (Normalization)**
Jdroid-X can govern websites with 100+ unique CSS variables (e.g., sites with 153 variables). 
- **Many-to-One Mapping**: A single Designer Layer (like "Action Buttons") can be mapped to a cluster of technical variables (`--btn-bg`, `--cta-color`, `--submit-btn`).
- **Semantic Distillation**: The engine reduces "Technical Chaos" (hundreds of vars) into "Design Clarity" (16 layers).
- **Control Indicators**: The Designer UI displays the number of governed variables (`[10 VARS]`) in the protocol column.

#### **B. Structural Validation & Duplicate Flagging**
- **Conflict Alerts**: If two UI layers target the same CSS variable, the Protocol column turns **Red** with a "CONFLICT" flag.
- **Enforcement**: This prevents layout "clashing" where two designer colors fight over one site property.

#### **C. Jdroid-X Satellite Sync Protocol (The "Public Site" Bridge)**
To solve the "Laptop-Only" gap (where design shifts only appear on the designer's machine), V10.5 introduces the **Satellite Payload**:
- **Durable Payload**: Generates a self-contained JavaScript snippet containing your entire 16-layer design and mapping logic.
- **Remote Injection**: Your team can paste this snippet into the **Console** of any public website to "Force-Inject" the new atmosphere instantly.
- **Persistence**: Once injected, the Satellite Script overrides the site's local styles with `!important` priority, manifesting the theme for anyone viewing that session.

---

### 3. System Evolution Log (Milestones)

- **V2.0 - V9.0**: Foundation and expansion from 12 to 16 layers.
- **V10.0**: Tactical Architect - Duplicate Red-Flagging and Architectural Stability.
- **V10.5**: **Satellite Edition** - Implemented Satellite Payloads for public site injection and Many-to-One Governance for high-volume CSS structures.

---
**© 2026 JDROID-X • ARCHITECTURAL BLUEPRINT v10.5 - SATELLITE EDITION**
