# Marketing Insights Lab · British Management University

> *Think like marketers. Act like analysts. Create like professionals.*

A student-driven marketing publication, research hub, and professional community connected to British Management University.

---

## 🌟 Versions

### Version 2.0 (Modern Redesign — `/v2`)
- **Live URL**: [https://airx0000.github.io/Marketing-Lab/v2/](https://airx0000.github.io/Marketing-Lab/v2/)
- **Features**:
  - **Editorial Architecture**: High-contrast typography (`Playfair Display` + `Plus Jakarta Sans`), luxury Crimson & Gold BMU color palette.
  - **Dark / Light Mode**: Smooth theme transitions with system preference detection and localStorage persistence.
  - **Reading Experience**: Reading progress indicator bar, dynamic read time calculation, quotes, takeaways, table of contents.
  - **Interactive Repository**: Instant search (`<search>`), category filter chips, and personal reading list (offline bookmarking).
  - **Community & Team**: Department tab filtering (`Leadership`, `Research & Strategy`, `Editorial`, `Creative & Design`, `Advisory`), member skill badges, and LinkedIn connections.
  - **Events Hub**: Interactive event cards with instant `.ics` calendar invitation generator and spot RSVP modal.
  - **Membership Application**: Multi-step application wizard for aspiring student fellows.
  - **Protected Admin Panel**: Secure password gate (`admin123`), live article editor, site settings manager, and JSON data backup.

### Version 1.0 (Legacy Single-File Portal)
- **Live URL**: [https://airx0000.github.io/Marketing-Lab/](https://airx0000.github.io/Marketing-Lab/)
- Password protected admin portal (`admin123`).

---

## 📂 Repository Structure
```
Marketing Lab/
├── index.html            # Version 1.0 root deployment
├── Marketing Lab.html     # Version 1.0 source file
├── README.md             # Project documentation
└── v2/                   # Version 2.0 Modern Redesign
    ├── index.html        # Clean semantic HTML5 shell
    ├── css/
    │   └── styles.css    # Modern CSS design system (variables, grid, dark mode)
    ├── js/
    │   ├── data.js       # Structured dataset (articles, team, events, resources)
    │   └── app.js        # Modular reactive SPA router & controller
    └── assets/
        └── logo.png      # High-resolution BMU Marketing Lab logo
```
