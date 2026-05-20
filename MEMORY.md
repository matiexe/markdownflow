# MarkdownFlow Project Memory

## Project Overview
A minimalist Markdown visualizer and PDF exporter built with Electron, React, and TypeScript.

## Architecture
- **Main Process (`electron/main.ts`)**: Handles file system access, PDF printing, and custom protocol (`app-file://`) for local images.
- **Preload Script (`electron/preload.ts`)**: Bridges Electron APIs to the renderer using CommonJS for compatibility.
- **Renderer (`src/`)**: React application using `react-markdown` with GFM, Math (Katex), and Syntax Highlighting (Prism).
- **Styling**: Vanilla CSS following a minimalist "Notion-like" aesthetic with custom brand identity.

## Visual Identity (v1.1.0)
- **Primary Color**: `#7C5CFF` (Primary)
- **Accent Color**: `#B39DFF` (Accent)
- **Backgrounds**: `#0F1117` (Ink), `#1A1D24` (Surface), `#F5F6FA` (Light)
- **Typography**: Poppins (Primary), Inter (Secondary)
- **Logo**: Integrated "M" with document lines.

## Significant Changes
- **v1.0.0**: Initial implementation with PDF export, sidebar, and basic Markdown rendering.
- **v1.0.1**: Fixed `electronAPI` undefined error by switching preload to CommonJS. Added Drag & Drop, local image support, and code highlighting.
- **v1.1.0**: Applied brand identity from `GuiaIdentidad.png`. Added custom toast notifications. Set up `MEMORY.md`.
- **v1.1.1**: Fixed PDF export to isolate Markdown content only. Improved print margins and removed UI elements from PDF output.
- **v1.1.2**: Updated application favicon and window icon to use `logo.png`.
- **v1.1.3**: Added application version display to the sidebar footer.
- **v1.1.4**: Fixed 'Not allowed to load local resource' error in production. Created `RECOMMENDATIONS.md` for future roadmap.
- **v1.1.5**: Optimized production path resolution with fallbacks. Configured `electron-builder` to explicitly include brand icon and app metadata.

## Key Features
- Native PDF Export.
- Local image path resolution via `app-file://`.
- Drag & drop `.md` files.
- GFM, Math, and Code highlighting support.
- Modern, minimalist UI with custom branding.
