# Corporate Event Website Implementation Plan

## Goal Description
Create a premium, high-end corporate event website for "Curated Leadership Conclave" with a focus on authority, elegance, and modern design.

## Proposed Changes
### Structure
- **Root**: `C:/Users/dell/jAnitGravity/jCorporateEvents/Website2`
- **Directories**:
    - `solutions/`: Event Solutions pages.
        - `index.html`: Overview.
        - `types/`: Conferences, Incentive Trips, etc.
        - `industries/`: Franchise, Technology, etc.
    - `work/`: Our Work pages.
        - `index.html`: Overview.
        - `services/`: Strategy, Logistics, etc.
        - `success-stories/`: Case studies.
    - `resources/`: Resources pages.
        - `index.html`: Overview.
        - `insights/`: Blogs, reports.
        - `guides/`: Trend guides, checklists.
    - `css/`: Stylesheets.
    - `js/`: JavaScript files.
    - `images/`: Image assets.
- **Files**:
    - `index.html`: Main Home Page.
    - `generate_pages.py`: Static site generator script.

### Design System
- **Colors**: Deep charcoal/matte black background, Soft Gold accents.
- **Typography**:
    - Headlines: Elegant Serif (e.g., Playfair Display or similar via Google Fonts).
    - Body: Clean Sans-Serif (e.g., Inter or Lato).
- **Layout**: CSS Grid and Flexbox for structured, magazine-style layouts.
- **Image Strategy**: Implementation of a "High-End Magazine Grid + Art Gallery Narrative" theme.
    - **Primary Source**: Unsplash (authentic, high-quality).
    - **Backup Source**: Pexels (variety).
    - **Textures**: Pixabay (abstract, dark-themed).
    - **Selection Criteria**: Images chosen for their relevance and "least downloaded" status for exclusivity.
    - **Context Mapping**: Specific keywords for each page (e.g., "Logistics" -> *supply chain*).
- **Multiple Device Access**: Fully responsive design optimized for Desktop, Tablet, and Mobile contexts.
    - **Fluid Typography**: Scales smoothly across device widths.
    - **Adaptive Layouts**: Content reflows for portrait/landscape orientations avoiding clipped content.

### Technical Implementation: Responsive Design
*   **CSS Architecture**:
    *   **Goal**: Separate monolithic stylesheet for maintainability and crash prevention (Android 10).
    *   **Files**: Split into `desktop.css` (Base), `tablet.css` (< 992px), `mobile.css` (< 768px).
    *   **Method**: Linked via HTML `media` attributes:
        ```html
        <link rel="stylesheet" href="css/desktop.css">
        <link rel="stylesheet" href="css/tablet.css" media="(max-width: 992px)">
        <link rel="stylesheet" href="css/mobile.css" media="(max-width: 768px)">
        ```
*   **Mobile Optimizations**:
    *   **Menu**: Converted "Mega Menu" to vertical Accordion with touch-toggle logic.
    *   **Typography**: Implemented fluid scaling (Hero lowered from 3.5rem to 2.2rem on mobile).
    *   **Layout**: Switched fixed `100vh` heights to `min-height` to prevent landscape rotation clipping.
    *   **Crash Fixes**: Removed hardware acceleration hacks on mobile to prevent layer explosion.

### Key Features
1.  **Hero**: Full-width, cinematic, "Request Invitation" CTA.
2.  **Narrative**: 2-column layout, large typography.
3.  **Speakers**: Grid layout, hover effects.
4.  **Tracks**: Vertical cards with icons.
5.  **Agenda**: Expandable timeline.
6.  **Venue**: Full-width image with parallax.
8.  **Event Solutions Dropdown**: A mega-menu style dropdown in the navigation.
    - **Structure**: 3 Columns (Event Types, Industries, Featured Insight).
    - **Style**: Dark theme consistency (Charcoal background, Gold accents).
    - **Interaction**: Hover-triggered.
    - **Content Pages**: 10 individual pages for Event Types and Industries.
        - **Layout**: "Art Gallery" Split View. Left: Contextual Image. Right: Content (Bold Typography).
        - **Theme**: Unified Dark/Gold theme.
    - **Event Solutions Overview Page**: Landing page for "See all event solutions".
        - **Structure**: 2 Columns (Event Types, Industries).
        - **Content**: All 10 Solution Tiles (5 Event Types, 5 Industries).
        - **Design**: Tiles with specific high-quality, dark-themed background images sourced for each category (Conferences, Incentive Trips, etc.).



10. **Our Work Dropdown**: A mega-menu style dropdown in the navigation.
    - **Structure**: 3 Columns (Services, Success Stories, Featured Case Study).
    - **Style**: Dark theme consistency (Charcoal background, Gold accents).
    - **Interaction**: Hover-triggered.
    - **Content Pages**: 11 individual pages for Services and Success Stories.
        - **Layout**: "Art Gallery" Split View. Left: Contextual Image. Right: Content (Bold Typography).
        - **Theme**: Unified Dark/Gold theme.
    - **Our Work Overview Page**: Landing page for "See all our work".
        - **Structure**: 2 Columns (Services, Success Stories).
        - **Content**: All 11 Work Tiles (6 Services, 5 Success Stories).
        - **Design**: Tiles with specific high-quality, dark-themed background images sourced for each category.

11. **Resources Dropdown**: A mega-menu style dropdown in the navigation.
    - **Structure**: 3 Columns (Industry Insights, Guides, Podcast).
    - **Style**: Dark theme consistency (Charcoal background, Gold accents).
    - **Interaction**: Hover-triggered.
    - **Content Pages**: 11 individual pages for Industry Insights and Guides.
        - **Layout**: "Art Gallery" Split View. Left: Contextual Image. Right: Content (Bold Typography).
        - **Theme**: Unified Dark/Gold theme.
    - **Resources Overview Page**: Landing page for "See all resources".
        - **Structure**: 2 Columns (Industry Insights, Guides).
        - **Content**: All 11 Resource Tiles (5 Industry Insights, 6 Guides).
        - **Design**: Tiles with specific high-quality, dark-themed background images sourced for each category.




### Script Updates (generate_pages.py)
1.  **Filenames**: Update `pages` list to include relative paths (e.g., `solutions/types/event-conferences.html`).
2.  **Relative Root**: Logic to calculate relative path to root (e.g., `../../`) based on output filename depth.
3.  **Template Update**: Modify `html_template` to use `{root}` prefix for all internal links and assets (CSS/JS/Images).

### Manual Updates
- Move and rename overview pages (e.g., `event-solutions.html` -> `solutions/index.html`).
- Update `index.html` navigation to point to new locations.
- Update `css` and `js` references in overview pages.html` in browser.
- Verify responsiveness on mobile/tablet view using developer tools.
- Check hover states and interactivity.

### User Feedback Refinements
- **Dropdown Alignment**: Ensure "Resources" dropdown (and others) stays within viewport. Use `right: 0` for right-aligned items if needed.
- **Grid Stability**: fast-loading/reserved space for images in grids to prevent layout shift.
- **Button Contrast**: "Request Access" button:
    - Default: Gold text, Black background.
    - Hover: Black text, Gold background.
- **Disclaimer**:
    - "This is a demo website created for presentation purposes only. All content and images are sample references. No official association or commercial intent is implied."
    - Style: Scrolling text (marquee style) at the bottom of every page.

## Verification Plan
### Manual Verification
- Open `index.html` in browser.
- Verify "Resources" dropdown does not cause horizontal scroll or strict overflow.
- Refresh "Event Solutions" overview page multiple times to verify tile stability.
- Hover over "Request Access" button to verify text becomes dark/readable.
- Check footer scrolling text on Home, Overview phases, and a Generated Page.




## Dry Testing & Resolved Issues
### Session Snapshot (Last 5 Hours)
The following critical issues were identified and resolved during the dry run verification:

1.  **Mobile Crashes (Android 10)**
    *   **Issue**: Website crashing on older Android devices due to memory overload.
    *   **Fix**: Removed heavy `hardware-acceleration` and simplified `box-shadow` effects in `mobile.css`.

2.  **Broken Images**
    *   **Issue**: Images for "Sales Kickoff", "Home Services", and "AI Conference" were missing.
    *   **Fix**: Corrected file paths in HTML to point to the valid image locations.

3.  **CSS Architecture**
    *   **Issue**: Monolithic `style.css` was hard to manage and caused layout conflicts.
    *   **Fix**: Split into `desktop.css`, `tablet.css`, and `mobile.css` for clean, device-specific logic.

4.  **Responsive Layout & Typography**
    *   **Issue**: Text was too large on mobile; layout clipped when rotating to landscape.
    *   **Fix**: Implemented **Fluid Typography** (Hero title reduced from 3.5rem -> 2.2rem on mobile) and switched fixed heights to `min-height`.

5.  **Mobile Menu**
    *   **Issue**: Desktop "Mega Menu" was unusable on touch devices (flying off-screen).
    *   **Fix**: Converted to a vertical **Accordion** menu with touch-toggle support.
