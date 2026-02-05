# LaTeX Studio

A lightweight Markdown + LaTeX editor with a live preview, built with React, Vite, and Tauri.

## Highlights
- Split-pane editor and live preview
- Markdown rendering with LaTeX math (inline and block)
- Open/save Markdown or text files
- Drag-and-drop file loading
- Keyboard save shortcut (`Ctrl/Cmd + S`)
- Runs as a Tauri desktop app, with a browser fallback for file I/O

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS (with Typography)
- KaTeX for LaTeX rendering
- Tauri 2 (desktop shell + native file access)

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- Rust + Tauri prerequisites for desktop builds

### Install
```bash
npm install
```

### Run (Web Dev Server)
```bash
npm run dev
```

### Run (Tauri Desktop)
```bash
npm run tauri:dev
```

### Build (Web)
```bash
npm run build
```

### Build (Tauri Desktop)
```bash
npm run tauri:build
```

## Project Structure
- `src/` React app and UI components
- `src-tauri/` Tauri backend and native commands
- `assets/` static assets

## File I/O Behavior
- In Tauri, file open/save uses the dialog plugin plus Rust commands in `src-tauri/src/main.rs`.
- In the browser, opening uses a file input and saving triggers a download.

## License
Not specified yet.
