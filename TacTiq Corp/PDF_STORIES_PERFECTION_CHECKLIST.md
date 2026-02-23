# 🏆 TacTiq PDF Stories: Engineering & Perfection Standards
## The "Golden Standard" (Group-By-Hierarchy Edition)

This document defines the coding, testing, and visual standards for the **Tactiq 2026 Architectural Framework**. All story clones must undergo this hierarchical audit before final synchronization.

---

## 🏗️ I. CORE CODING STANDARDS (Architecture & Logic)
### 1. Semantic Integrity (Structure)
- [ ] **HTML5 Compliance**: Use `<aside>`, `<main>`, `<header>`, and `<footer>` instead of generic `<div>` wrappers for the core rails.
- [ ] **W3C Validation**: No stray tags or malformed nesting that could break the interaction engine.
- [ ] **Accessibility (a11y) Hierarchy**: `<h1>` is reserved for the Project Title; `<h3>` for slide labels to maintain a logical document tree.

### 2. CSS-Matrix Framework (Styling)
- [ ] **12-Layer UI Sync**: Every component must reference a `--var()` from the theme engine (no hardcoded HEX except in the designer).
- [ ] **BEM Naming Convention**: Use block-element-modifier syntax (e.g., `.nav-item--active`) to prevent global style pollution.
- [ ] **Critical CSS**: Inline structural CSS in the `<head>` to prevent Flash of Unstyled Content (FOUC) during load.

### 3. Progressive Interaction (JavaScript)
- [ ] **ES6 Standards**: Use template literals, destructuring, and arrow functions for cleaner, modular interaction code.
- [ ] **DOM Sanitization**: Any dynamic content injected via `metadata.json` must be sanitized to prevent XSS.
- [ ] **Event Delegation**: Use a single listener on the strategy grid container for tile clicks to optimize memory.

---

## 🧪 II. RIGOROUS TESTING STANDARDS (Verification)
### 1. Automated Functional Audit (Dry Run)
- [ ] **Dead Image Detection**: Run `check_launch_ready.py` to ensure zero broken paths in `/pages`.
- [ ] **Anchor Validation**: Every "Watch Video" link must have a corresponding entry in the `interaction-layer`.
- [ ] **LocalStorage Reset**: Performance test with a clean cache to ensure default theme fallback works.

### 2. Multi-Device Behavioral Testing
- [ ] **Breakpoint Continuity**:
    - **Desktop (>1024px)**: Sidebar rail remains locked and fixed.
    - **Tablet (768px - 1024px)**: Sidebar auto-hides; grid reflows to 2-columns (no horizontal scrolling).
    - **Mobile (<768px)**: 1-column layout; hamburger menu z-index > 2000.
- [ ] **Input Hybridity**: Verify UI responds correctly to both Mouse (hover effects) and Touch (tap targets).

### 3. Performance & Load Reliability
- [ ] **Initial Page Weight**: Total index size < 2MB (excluding heavy metadata images).
- [ ] **Lighthouse Benchmarking**: Aim for 90+ score in "Best Practices" and "Performance."
- [ ] **Failsafe Loading**: Missing images show a "Tactiq Placeholder" rather than a broken icon.

---

## 🎨 III. BRAND & ATMOSPHERIC STANDARDS
### 1. Visual Quality (Quality Assurance)
- [ ] **DPI Consistency**: All hero assets exported at @2x for Retina/High-PPI tablet displays.
- [ ] **Glow & Atmospheric Depth**: High-visibility branding has a `35px` bloom; disclaimers centered at `0.6` opacity.
- [ ] **Scroll Symmetry**: Scrollbars (Webkit) reflect the `--scroll-thumb` color variable.

### 2. UX Micro-Animations
- [ ] **Transition Smoothness**: Page shifts use `cubic-bezier(0.4, 0, 0.2, 1)` for that "premium" feel.
- [ ] **Interactive Feedback**: All buttons show a subtle `transform: scale(1.05)` on hover/tap.

---
**© 2026 TACTIQ • ENGINEERING OFFICE • PROTOCOL v2.0 (DRILL-DOWN REVISION)**
