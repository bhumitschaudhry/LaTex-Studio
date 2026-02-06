# LaTeX Studio

A lightweight, modern Markdown + LaTeX editor with live preview, built for performance and ease of use.

## 🚀 Highlights

- **Live Preview**: Real-time rendering of Markdown and LaTeX math.
- **Split-Pane Editor**: Edit code on one side and see the result on the other.
- **LaTeX Support**: Full support for inline (`$E=mc^2$`) and block (`$$...$$`) math using KaTeX.
- **File Management**: Open and save Markdown (`.md`) or text (`.txt`) files seamlessly.
- **Drag & Drop**: Easily load files by dragging them into the editor.
- **Cross-Platform**: Runs as a native desktop app via Tauri (Windows, macOS, Linux) or in the browser.
- **Shortcuts**: Productivity-focused with shortcuts like `Ctrl/Cmd + S` for saving.

## 📥 Download

Download the latest version for Windows:

- **Installer (.exe)**: [Download Setup](https://github.com/bhumitschaudhry/LaTex-Studio/releases/latest/download/LaTeX%20Studio_0.1.0_x64-setup.exe)
- **MSI Installer**: [Download MSI](https://github.com/bhumitschaudhry/LaTex-Studio/releases/latest/download/LaTeX%20Studio_0.1.0_x64_en-US.msi)

> **Note**: These links will point to the latest release once it is published on GitHub.

## 🛠 Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (with Typography plugin)
- **Rendering**: [KaTeX](https://katex.org/) (via `rehype-katex` & `remark-math`)
- **Desktop Framework**: [Tauri 2](https://tauri.app/) (Rust backend)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v18 or higher (v20+ recommended)
- **Rust**: Required for building the desktop application. Follow the [Tauri prerequisites guide](https://tauri.app/v1/guides/getting-started/prerequisites).

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/bhumitschaudhry/LaTex-Studio.git
cd latex-studio
npm install
```

### Development

**Web Mode** (Fastest for UI changes):
```bash
npm run dev
```

**Desktop Mode** (Test native functionality):
```bash
npm run tauri:dev
```

### Building for Production

**Web Build**:
```bash
npm run build
```

**Desktop Build**:
```bash
npm run tauri:build
```

## 📂 Project Structure

```
latex-studio/
├── src/               # React frontend
│   ├── components/    # UI components (Editor, Preview)
│   ├── utils/         # Helper functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Entry point
├── src-tauri/         # Rust backend (Tauri)
│   ├── src/           # Rust source code
│   └── tauri.conf.json # Tauri configuration
└── assets/            # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is currently unlicensed.