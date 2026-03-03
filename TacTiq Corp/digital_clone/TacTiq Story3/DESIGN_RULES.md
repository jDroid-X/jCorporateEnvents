# Case Study Design Rules — Tactiq Experiences

These rules define the design system for individual project case study pages.

## 1. Split Layout (30/70)
- **Sidebar (30%)**: Contains the project metadata.
  - Logo of the client/event.
  - Page Title (Uppercase, High Contrast).
  - Year (Eyebrow).
  - Description (Body text).
  - Key Highlights (Content blocks).
  - **Video Button**: A red bordered button with a play icon that opens a YouTube modal.
- **Main View (70%)**: A dynamic image grid.
  - Uses a 12x12 grid system.
  - **Grid Items**: Large banner (grid-main), Side vertical (grid-side), and Bottom thumbnails (grid-bot-1, grid-bot-2).
  - **Wave Effect**: On mouse-over, images scale up slightly (1.05) with a smooth transition.

## 2. Navigation
- **Top Navbar**:
  - Contains Golden Arrows (❮ ❯) for Previous/Next project.
  - The current project title is displayed between the arrows.
  - Arrows should be disabled if no previous/next project exists.

## 3. Video Modal
- A full-screen overlay with a 16:9 YouTube embed.
- Must include a close button (`&times;`) and support clicking the background to close.
- Automatically handles YouTube embed conversion in `js/script.js`.

## 4. Technical Implementation
- **Styling**: All new styles are in `css/desktop.css` under the `/* NEW CASE STUDY LAYOUT */` section.
- **Automation**: Pages are generated using `generate_pages_v2.py` which maps image paths and YouTube URLs.
- **Responsiveness**: Pages collapse to a vertical stack on screens smaller than 992px.

## 5. Deployment
- When adding a new project:
  1. Add project metadata to the `PAGES` list in `generate_pages_v2.py`.
  2. Add any video link to `_VIDEO_MAP`.
  3. Ensure images are placed in `images/work-showcase/[category]/[slug]/`.
  4. Run `python generate_pages_v2.py`.
