# Implementation Plan - Align Website1 Homepage with Website2

## Goal
Update `Website1/index.html` and `Website1/css/desktop.css` to match the structural layout of Website2, while preserving the "Institutional Prestige" content and theme.

## User Review Required
> [!NOTE]
> This change involves porting the layout classes from Website2 (Modern) to Website1 (Institutional). Use of Website1's color variables (`--bg-navy`, `--text-gold`) will be maintained to ensure branding consistency.

## Proposed Changes

### CSS (`Website1/css/desktop.css`)
-   [NEW] Port `.hero` styles (replacing or augmenting `.hero-legacy`).
-   [NEW] Port `.narrative` and `.narrative-grid` styles.
-   [NEW] Port `.speakers` and `.speaker-card` styles (replacing `.council-card`).
-   [NEW] Port `.tracks` and `.track-card` styles (replacing `.pillar-col`).

### HTML (`Website1/index.html`)
-   [MODIFY] Rewrite the `<body>` content to match Website2's structure:
    -   **Hero:** Update structure to matching `.hero-content` & `.hero-cta`.
    -   **Vision:** Rename to **Narrative** section, using `.narrative-grid` (Left header, Right text).
    -   **Council:** Rename to **Speakers** section (or keep "Council" text but use `speaker-card` structure).
    -   **Pillars:** Rename to **Tracks** section (or keep "Pillars" text but use `track-card` structure).

## Verification Plan
### Automated Tests
-   None (Visual layout change).

### Manual Verification
-   **Browser Check:** Verify `index.html` loads with the new layout.
-   **Structure Check:** Confirm the sections align with Website2's layout (e.g., Narrative split, Speaker cards grid).
-   **Theme Check:** Ensure colors and fonts remain "Institutional" (Gold/Navy/Serif) and not "High-Tech" (Cyan/Black/Sans).
