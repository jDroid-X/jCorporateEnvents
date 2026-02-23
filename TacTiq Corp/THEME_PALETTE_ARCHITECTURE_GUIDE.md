# TacTiq Theme Architecture Guide (V10.0 - TACTICAL ARCHITECT EDITION)
## 16-Layer UI Matrix (The Master Blueprint)

This guide documents the semantic mapping between the **Atmospheric Theme Designer** and the website's technical structure.

---

### 1. Unified 16-Layer Matrix (Architectural Stability)
Every Jdroid-X production site is built on this 16-layer semantic matrix. In V10.0, the matrix is fully reinforced with duplicate mapping validation and semantic group-by logic.

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

### 2. Tactical Architect Features (V10.0)

#### **A. Intelligent Semantic Grouping**
V10.0 utilizes an advanced pattern-matching engine to categorize website variables instantly.
- **Pattern Scouring**: Scans CSS variables for 60+ unique keywords.
- **Auto-Inheritance**: Elements grouped to core layers instantly inherit designer colors.
- **Discovery Intelligence**: New variables not matching the 16 core layers are flagged as **(Discovered)** and italicized.

#### **B. Structural Validation & Duplicate Flagging**
To ensure architectural integrity, the system now performs real-time validation:
- **Duplicate Alerts**: If two UI layers target the same CSS variable, the Protocol column turns **Red** with a "DUPLICATE MAP" flag.
- **Constraint Enforcement**: Column widths are locked (220px / 200px) to prevent layout distortion on complex site protocols.

#### **C. Closed-Loop Synchronization**
- **In-Context Markers**: The Table Protocol now displays the **[Origin Website]** context above every variable.
- **Site-Specific Blueprint**: "Sync To Website" generates a perfectly formatted CSS `:root` block for the active site, including site-specific comments and mapping meta-data.

---

### 3. System Evolution Log (Milestones)

- **V2.0 - V7.0**: Foundation of the 12-layer system and Tri-Column UI.
- **V8.0**: AI Proxy Bridge for CORS-restricted site scanning.
- **V9.0**: Auto-Reprotocol and Matrix Compression.
- **V9.8**: Stability Advance - Semantic Grouping and Layout Reinforcement.
- **V10.0**: **Tactical Architect Edition** - 16-Layer Suite, Duplicate Red-Flagging, and Closed-Loop Sync.

---
**© 2026 TACTIQ • ARCHITECTURAL BLUEPRINT v10.0 - TACTICAL ARCHITECT EDITION**
