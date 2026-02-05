import React, { useState, useRef, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { FileUp, Save } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';

const DEFAULT_CONTENT = `# Welcome to LaTeX Studio

Start typing on the left to see your document render on the right.

## Math Example

Here is an inline equation: $E = mc^2$.

And here is a block equation:

$$
\\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\left( -\\frac{1}{2} \\left( \\frac{x-\\mu}{\\sigma} \\right)^2 \\right)
$$

## Features
- **Markdown** support
- **LaTeX** rendering
- Live preview
`;

// Check if running in Tauri
const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;

export function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [fileName, setFileName] = useState('Untitled.md');
  const [isDirty, setIsDirty] = useState(false);
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setIsDirty(true);
  };

  const handleOpenFile = async () => {
    if (isTauri) {
      try {
        // Use Tauri dialog plugin to select file
        const selected = await open({
          multiple: false,
          filters: [
            {
              name: 'Markdown',
              extensions: ['md', 'markdown']
            },
            {
              name: 'Text',
              extensions: ['txt']
            }
          ]
        });

        if (selected && typeof selected === 'string') {
          // Read file content using Rust command
          const fileContent = await invoke<string>('read_file', { path: selected });
          setContent(fileContent);
          setCurrentFilePath(selected);
          // Extract filename from path
          const pathParts = selected.split(/[/\\]/);
          setFileName(pathParts[pathParts.length - 1]);
          setIsDirty(false);
        }
      } catch (error) {
        console.error('Failed to open file:', error);
      }
    } else {
      // Fallback to browser file input
      fileInputRef.current?.click();
    }
  };

  const handleBrowserFileOpen = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setContent(text);
        setFileName(file.name);
        setIsDirty(false);
      }
    };
    reader.readAsText(file);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      if (isTauri) {
        // In Tauri, we can read the file directly
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result;
          if (typeof text === 'string') {
            setContent(text);
            setFileName(file.name);
            setIsDirty(false);
          }
        };
        reader.readAsText(file);
      } else {
        handleBrowserFileOpen(acceptedFiles[0]);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'text/markdown': ['.md', '.markdown'],
      'text/plain': ['.txt']
    }
  });

  const handleSave = async () => {
    if (isTauri) {
      try {
        // Use Tauri dialog plugin to select save location
        const savePath = await save({
          filters: [
            {
              name: 'Markdown',
              extensions: ['md', 'markdown']
            },
            {
              name: 'Text',
              extensions: ['txt']
            }
          ],
          defaultPath: currentFilePath || fileName
        });

        if (savePath) {
          // Write file using Rust command
          await invoke('write_file', {
            path: savePath,
            content
          });

          // Update state
          setCurrentFilePath(savePath);
          const pathParts = savePath.split(/[/\\]/);
          setFileName(pathParts[pathParts.length - 1]);
          setIsDirty(false);
        }
      } catch (error) {
        console.error('Failed to save file:', error);
      }
    } else {
      // Fallback to browser download
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsDirty(false);
    }
  };

  // Keyboard shortcut for save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, fileName, currentFilePath]);

  return (
    <div className="flex h-screen flex-col bg-white text-slate-900" {...getRootProps()}>
      <input {...getInputProps()} />

      {/* Header */}
      <header className="grid grid-cols-3 h-16 items-center border-b border-gray-200 px-6 bg-white z-10 relative">
        <div className="flex items-center justify-start gap-4">
          <button
            onClick={handleOpenFile}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <FileUp size={18} />
            Open
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".md,.markdown,.txt"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleBrowserFileOpen(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold tracking-tight text-gray-900">LaTeX Studio</h1>
          <span className="text-xs text-gray-500 font-medium">{fileName}</span>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              isDirty
                ? 'bg-black text-white hover:bg-gray-800'
                : 'text-gray-400 cursor-not-allowed bg-gray-50'
            }`}
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </header>

      {/* Drag Overlay */}
      {isDragActive && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-blue-50/90 backdrop-blur-sm">
          <p className="text-2xl font-semibold text-blue-600">Drop your file here to open</p>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Editor Pane */}
        <div className="w-1/2 border-r border-gray-200 flex flex-col">
          <Editor content={content} onChange={handleContentChange} />
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 flex flex-col bg-white">
          <Preview content={content} />
        </div>
      </main>
    </div>
  );
}
