# ⚡ SnippetBase

> Your knowledge base for everything code

🌐 **Live at:** [snippetbase.dev](https://snippetbase.dev)

![SnippetBase](https://img.shields.io/badge/snippets-153-brightgreen) ![Cheat Sheets](https://img.shields.io/badge/cheat%20sheets-27-blue) ![React](https://img.shields.io/badge/react-18-blue) ![License](https://img.shields.io/badge/license-MIT-blue)

SnippetBase is your complete knowledge base for developers. Find production-tested code snippets, quick reference cheat sheets, in-depth guides, and interview prep for data engineering, machine learning, and software development.

## 🚀 Features

### Code Snippets (153+)
- **Production-Ready Snippets** - PySpark, SQL, Python, dbt, Kafka, Airflow, Databricks, Docker
- **Smart Search** - Search across title, tags, code content, and description
- **Language Filters** - Filter by technology stack (8 languages)
- **Syntax Highlighting** - Powered by Prism.js with line numbers
- **Code Formatting** - Automatic beautification and formatting
- **One-Click Copy** - Copy code to clipboard instantly
- **Favorites** - Star your most-used snippets
- **Usage Tracking** - See how many times each snippet has been copied
- **Pagination** - Browse snippets efficiently (8 per page)

### Cheat Sheets (27+)
- **Quick Reference Guides** - Comprehensive cheat sheets for various technologies
- **21 Categories** - Organized by technology and use case
- **Markdown Support** - Rich content with code blocks
- **Syntax Highlighting** - Full code highlighting in cheat sheets
- **Search & Filter** - Find cheat sheets quickly
- **Dedicated Detail Pages** - Full-screen view with copy functionality

### Design & UX
- **Neobrutalist Design** - Bold, high-contrast UI that stands out
- **Responsive** - Works perfectly on mobile, tablet, and desktop
- **Offline-First** - Works without internet (localStorage)
- **Fast Loading** - Code-splitting and lazy loading for optimal performance
- **Error Handling** - Error boundaries and 404 pages for graceful error handling

## 🎯 Tech Stack

- **Frontend:** React 18 + Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS
- **Syntax Highlighting:** Prism.js
- **Icons:** Lucide React
- **Storage:** Browser localStorage
- **Deployment:** Vercel
- **Fonts:** Inter (body), Space Grotesk (headings), JetBrains Mono/Fira Code (code)

## 🎨 Design System

SnippetBase features a **neobrutalist design** with:

- **Color Palette:**
  - Primary: `#4ECDC4` (Cyan) - Main brand color
  - Secondary: `#FF6B6B` (Coral) - Code snippets
  - Tertiary: `#FFE66D` (Yellow) - Cheat sheets
  - Accent: `#A8E6CF` (Mint) - Guides
  - Dark: `#000000` (Black) - Borders/text
  - Light: `#FAFAF5` (Cream) - Background

- **Typography:**
  - Headings: Space Grotesk (Bold/Black)
  - Body: Inter Regular
  - Code: JetBrains Mono / Fira Code

- **Design Elements:**
  - Thick black borders (2-8px)
  - Bold box shadows
  - High-contrast color palette
  - Smooth animations and transitions

## 📦 Content

### Code Snippets (153 Total)

- **PySpark (25+):** Window functions, Delta Lake, caching, optimization, schema evolution, partitioning
- **SQL (20+):** Deduplication, window functions, CTEs, SCD Type 2, pagination, JSON queries
- **Python (10+):** Retry patterns, validation, logging, parallel processing
- **dbt (15+):** Incremental models, tests, snapshots, macros, SCD Type 3, freshness monitoring
- **Airflow (8+):** DAGs, sensors, XCom communication, dynamic DAGs, TaskFlow API
- **Databricks (8+):** Auto Loader, widgets, secrets, Unity Catalog, DLT, Photon
- **Kafka (7+):** Producer, consumer, exactly-once, schema registry, DLQ
- **Docker (2+):** Multi-stage builds, docker-compose

### Cheat Sheets (27 Total)

- **21 Categories:** PySpark, SQL, Python, dbt, Kafka, Git, Docker, Pandas, Regex, Linux, Databricks, NumPy, VSCode, HTTP, Airflow, YAML, Bash, MongoDB, API, CSS, Markdown

## 🏃 Quick Start

```bash
# Clone the repository
git clone https://github.com/KrishnaSathvik/snippetbase.git

# Install dependencies
cd snippetbase
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Project Structure

```
snippetbase/
├── public/
│   └── favicon.svg          # Lightning bolt favicon
├── src/
│   ├── components/          # Reusable components
│   │   ├── CodeBlock.jsx    # Syntax highlighting & copy
│   │   ├── ErrorBoundary.jsx # Error handling
│   │   ├── FilterBar.jsx    # Language filters
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Footer.jsx        # Footer
│   │   └── ...
│   ├── data/                # Seed data
│   │   ├── seedSnippets.js  # 153 code snippets
│   │   └── cheatSheets.js   # 27 cheat sheets
│   ├── hooks/               # Custom React hooks
│   │   ├── useSnippets.js    # Snippet management
│   │   ├── useCheatSheets.js # Cheat sheet management
│   │   └── useLocalStorage.js # localStorage wrapper
│   ├── pages/               # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── LandingPage.jsx   # Landing page content
│   │   ├── SnippetsPage.jsx  # Snippets listing
│   │   ├── SnippetDetail.jsx # Snippet detail view
│   │   ├── CheatSheetsPage.jsx # Cheat sheets listing
│   │   ├── CheatSheetDetail.jsx # Cheat sheet detail view
│   │   └── NotFound.jsx      # 404 page
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html              # HTML template
├── vercel.json             # Vercel configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🔧 Development

```bash
# Run development server (port 3001)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚢 Deployment

### Vercel (Recommended)

The project is configured for Vercel deployment:

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

Configuration is in `vercel.json`:
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites configured
- Cache headers optimized

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist folder to your hosting provider
```

## 🎯 Key Features Explained

### Code Quality Features
- **Syntax Highlighting:** Full Prism.js integration with language detection
- **Line Numbers:** Numbered lines for easier reference
- **Code Formatting:** Automatic beautification and whitespace cleanup
- **Copy Functionality:** One-click copy for entire code blocks

### Performance Optimizations
- **Code Splitting:** Route-based and data-based code splitting
- **Lazy Loading:** Pages and data loaded on demand
- **Optimized Bundles:** Separate chunks for vendor, data, and code
- **Caching:** Proper cache headers for static assets

### Error Handling
- **Error Boundaries:** React error boundaries to catch and handle errors gracefully
- **404 Page:** Custom 404 page for unknown routes
- **Production Logging:** Console errors only in development mode

## 📄 License

MIT License - feel free to use this project for your own knowledge base!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more snippets or cheat sheets
- Improve the UI/UX
- Fix bugs
- Add new features
- Improve documentation

## 📧 Contact

- **Website:** [snippetbase.dev](https://snippetbase.dev)
- **GitHub:** [@KrishnaSathvik/snippetbase](https://github.com/KrishnaSathvik/snippetbase)

---

**⭐ Star this repo if you find it useful!**

Built with ❤️ for developers who want to stop Googling the same things over and over.
