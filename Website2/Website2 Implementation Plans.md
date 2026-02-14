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

