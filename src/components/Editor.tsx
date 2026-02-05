import React from 'react';

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <textarea
      className="h-full w-full resize-none border-0 bg-gray-50 p-8 font-mono text-sm text-gray-800 focus:ring-0 outline-none"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your markdown here..."
      spellCheck={false}
    />
  );
};
