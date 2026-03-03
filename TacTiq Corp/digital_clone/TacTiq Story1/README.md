# TacTiq Digital Clone - Credentials Story

Professional digital clone of the TacTiq Credentials portfolio, restructured for enterprise-grade scalability and maintainability.

## Project Structure

```text
TacTiq Story1/
├── index.html              # Main application entry point
├── src/                    # Source code
│   ├── css/
│   │   └── style.css       # Core styling/theming system
│   └── js/
│       ├── core/
│       │   └── app.js      # Main application logic
│       └── data/
│           └── metadata.js # Page metadata and content definitions
├── images/                 # Image assets (Originals & No-BG)
│   └── nobg/               # Transparent background webp versions
└── README.md              # Project documentation
```

## Features

- **Enterprise Restructuring**: Separated data, logic, and styling for modularity.
- **Dynamic Content**: Data-driven UI powered by a centralized `metadata` object.
- **Theming Engine**: Support for custom themes with persistence (LocalStorage).
- **Responsive Design**: Mobile-first architecture with a slide-out sidebar.
- **Strategy Grid**: High-level overview of projects with year-based filtering.
- **Accessibility**: Semantic HTML and keyboard navigation support.

## Development

To modify the content, edit the `src/js/data/metadata.js` file.
To update styles, use `src/css/style.css`.
The application logic resides in `src/js/core/app.js`.

## License

© 2026 TacTiq Corp. All rights reserved.
