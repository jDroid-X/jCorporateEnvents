---
description: Multi-agent design rules for building a modern corporate website
---

# 🏢 Corporate Website Design Rules (Multi-Agent Strategy)

This workflow defines which AI agent/model handles which phase of the corporate website lifecycle. All rules are to be followed on every new website project under `jCorporateEvents`.

---

## 🤖 Agent Responsibilities

### Agent 1 — Claude Sonnet 4.6 (Primary Orchestrator)
**Role:** The main agent that coordinates everything. Always active.
- Handles day-to-day coding, debugging, and content updates.
- Answers questions about the project at any time.
- Falls back to this agent for all tasks not covered below.

---

### Agent 2 — Claude 3.5 Sonnet (Architect & Designer)
**Role:** Used at the START of every new website to establish the foundation.
**When to activate:** At project kickoff, or whenever redesigning a major section.

**Responsibilities:**
1.  Define the **CSS Design System**: color tokens, typography scale, spacing vars.
2.  Choose the **Layout Architecture**: Grid strategy, split-view vs. full-width, container widths.
3.  Create the `desktop.css`, `tablet.css`, `mobile.css` structure.
4.  Set the **Aesthetic Theme**: Dark/Light, Glassmorphism, color palette (e.g., Charcoal + Gold).
5.  Define the **Navigation Pattern**: Mega-menu, Accordion, or Tabbed.
6.  Write the initial `index.html` skeleton and component library.

---

### Agent 3 — Perplexity Sonar (Research & Content)
**Role:** The research agent. Used for discovery, not coding.
**When to activate:** Before starting design, and before sourcing any images or content.

**Responsibilities:**
1.  Research **competitor corporate website trends** (e.g., "best B2B corporate event websites 2026").
2.  Generate **high-end stock image search keywords** for each page category:
    -   Hero → *"executive summit cinematic dark"*
    -   Speakers → *"professional keynote speaker portrait dark background"*
    -   Venue → *"luxury hotel ballroom architectural"*
3.  Research **font pairings** and **color palette trends** for the corporate sector.
4.  Verify any **technical facts or API documentation** needed for integrations.

---

### Agent 4 — Gemini 1.5 Pro (Global Updater)
**Role:** The bulk-processing agent. Used for large-scale, site-wide changes.
**When to activate:** Only when a change needs to be applied to 30+ pages simultaneously.

**Responsibilities:**
1.  **Global Navigation Refactoring**: Update the `<nav>` block in all HTML files at once.
2.  **Site-wide Disclaimer Update**: Push footer/disclaimer changes to all pages.
3.  **CSS Variable Refactoring**: Replace a color or font token across the entire stylesheet.
4.  **Link Path Updates**: Fix broken `href` or `src` paths across all files after a folder rename.
5.  Running and updating `generate_pages.py` for mass re-generation.

---

## 📋 Decision Matrix: Which Agent to Use?

| Task | Agent |
| :--- | :--- |
| Starting a new website from scratch | **Sonnet 3.5 (Architect)** |
| Picking images / fonts / color palettes | **Perplexity (Research)** |
| Writing daily code & fixing bugs | **Sonnet 4.6 (Primary)** |
| Updating navigation on all 30+ pages | **Gemini 1.5 Pro (Bulk)** |
| Redesigning a single section | **Sonnet 4.6 (Primary)** |
| Researching competitor features | **Perplexity (Research)** |

---

## ✅ Workflow: Starting a New Corporate Website

1.  **[Perplexity]** Research competitor trends and gather image keywords.
2.  **[Sonnet 3.5]** Design the CSS system, tokens, and page architecture.
3.  **[Sonnet 4.6]** Develop all pages, components, and JavaScript logic.
4.  **[Gemini 1.5 Pro]** Run global updates if navigation or footers change.
5.  **[Sonnet 4.6]** Final QA, bug fixes, and responsive verification.

---

## 📁 Standard File Structure (All Projects)

```
WebsiteN/
├── index.html              # Home Page
├── css/
│   ├── desktop.css         # Base styles (all devices)
│   ├── tablet.css          # Overrides for < 992px
│   └── mobile.css          # Overrides for < 768px
├── js/
│   └── script.js           # Navigation + Interactions
├── images/                 # Organized by section
├── event-solutions/        # Section sub-pages
├── our-work/               # Section sub-pages
├── resources/              # Section sub-pages
└── generate_pages.py       # Static page generator
```
