import React from "react";

interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

const Icons: React.FC<IconProps> = ({ name, width = 16, height = 16, className }) => {
  switch (name) {
    // Updated: JavaScript File Icon
    case "file-type-js":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#F7DF1E" />
          <path
            fill="#000"
            d="M19.7 23.5c1.8 0 3.3-1.2 3.3-3 0-1.8-1.5-2.7-3.3-2.7-1.2 0-2.2.5-2.2 1.5 0 .7.7 1.2 1.8 1.2 1.3 0 2-.5 2-1.2 0-.5-.4-.7-1-.7-.5 0-1 .3-1 .7 0 .3.3.5.7.5.5 0 1-.3 1-.7 0-.7-.7-1-1.5-1-1 0-1.5.5-1.5 1.5 0 1.8 1.5 3 3.2 3zm-7.5 0c1.8 0 3.3-1.2 3.3-3 0-1.8-1.5-2.7-3.3-2.7-1.2 0-2.2.5-2.2 1.5 0 .7.7 1.2 1.8 1.2 1.3 0 2-.5 2-1.2 0-.5-.4-.7-1-.7-.5 0-1 .3-1 .7 0 .3.3.5.7.5.5 0 1-.3 1-.7 0-.7-.7-1-1.5-1-1 0-1.5.5-1.5 1.5 0 1.8 1.5 3 3.2 3z"
          />
        </svg>
      );

    // Updated: TypeScript File Icon
    case "file-type-typescript":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#007ACC" />
          <path
            fill="#FFF"
            d="M17.6 9h-3.2v2.4h3.2v2.4h-3.2v2.4h3.2v2.4H12V9h2.4v2.4h3.2V9zm6.4 12.8c0-2.4-1.6-3.2-3.2-3.2-1.6 0-2.4 1.6-2.4 2.4 0 .8.8 1.6 2 1.6 1.6 0 2.4-.8 2.4-1.6 0-.8-.8-1.2-1.6-1.2-.8 0-1.6.4-1.6.8 0 .4.4.8 1.2.8.8 0 1.2-.4 1.2-.8 0-.8-.8-1.2-1.6-1.2-1.2 0-1.6.8-1.6 1.6 0 1.6 1.6 2.4 3.2 2.4 1.6 0 2.4-1.2 2.4-2.4z"
          />
        </svg>
      );

    // Updated: JSON File Icon
    case "file-type-json":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#000" />
          <path fill="#FFF" d="M12 9h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      );

    // Updated: Folder Icon
    case "folder":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#FFB300" d="M4 6h10l2 2h12v18H4V6z" />
          <path fill="#000" d="M4 6h10l2 2h12v2H4v16h24v2H4V6z" opacity="0.2" />
        </svg>
      );

    // Updated: Chevron Right Icon
    case "chevron-right":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" className={className}>
          <path fill="currentColor" d="M9.4 5.6l1.4-1.4 7 7-7 7-1.4-1.4 5.6-5.6-5.6-5.6z" />
        </svg>
      );

    // Updated: Chevron Down Icon
    case "chevron-down":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" className={className}>
          <path fill="currentColor" d="M5.6 9.4l-1.4 1.4 7 7 7-7-1.4-1.4-5.6 5.6-5.6-5.6z" />
        </svg>
      );

    // New: Python File Icon
    case "file-type-python":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#3572A5" />
          <path fill="#FFF" d="M14 6h4v4h-4V6zm0 16h4v4h-4v-4zm-6-8h4v4H8v-4zm12 0h4v4h-4v-4z" />
        </svg>
      );

    // New: CSS File Icon
    case "file-type-css":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#563D7C" />
          <path fill="#FFF" d="M10 9h12v2H10v-2zm0 4h12v2H10v-2zm0 4h12v2H10v-2zm0 4h12v2H10v-2z" />
        </svg>
      );

    // New: HTML File Icon
    case "file-type-html":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#E34F26" />
          <path fill="#FFF" d="M10 9h2v14h-2V9zm4 0h2v14h-2V9zm4 0h2v14h-2V9z" />
        </svg>
      );

    // New: Java File Icon
    case "file-type-java":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#B07219" />
          <path fill="#FFF" d="M12 9h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      );

    // New: PHP File Icon
    case "file-type-php":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#777BB4" />
          <path fill="#FFF" d="M10 9h3v14h-3V9zm5 0h3v14h-3V9z" />
        </svg>
      );

    // New: Markdown File Icon
    case "file-type-markdown":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#000" />
          <path fill="#FFF" d="M10 10h3v12h-3v-12zm5 0h3v12h-3v-12zm5 0h3v12h-3v-12z" />
        </svg>
      );

    // New: YAML File Icon
    case "file-type-yaml":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#CB171E" />
          <path fill="#FFF" d="M12 9h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      );

    // New: XML File Icon
    case "file-type-xml":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#F06529" />
          <path fill="#FFF" d="M10 9h3v14h-3V9zm5 0h3v14h-3V9z" />
        </svg>
      );

    // New: SQL File Icon
    case "file-type-sql":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#00758F" />
          <path fill="#FFF" d="M12 9h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      );

    // New: Go File Icon
    case "file-type-go":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#00ADD8" />
          <path fill="#FFF" d="M10 9h3v14h-3V9zm5 0h3v14h-3V9zm5 0h3v14h-3V9z" />
        </svg>
      );

    // New: Ruby File Icon
    case "file-type-ruby":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#CC342D" />
          <path fill="#FFF" d="M12 9h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      );

    // New: Vue File Icon
    case "file-type-vue":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#41B883" />
          <path fill="#FFF" d="M10 9h3v14h-3V9zm5 0h3v14h-3V9z" />
        </svg>
      );

    // New: JSX File Icon
    case "file-type-jsx":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#61DAFB" />
          <path fill="#000" d="M12 9h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      );

    // New: TSX File Icon
    case "file-type-tsx":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#007ACC" />
          <path fill="#FFF" d="M12 9h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      );

    // New: PNG File Icon
    case "file-type-png":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#8DD6F0" />
          <path fill="#000" d="M10 9h12v14H10V9z" />
        </svg>
      );

    // New: JPG File Icon
    case "file-type-jpg":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" fill="#FFCF3C" />
          <path fill="#000" d="M10 9h12v14H10V9z" />
        </svg>
      );

    // New: node_modules Folder Icon
    case "folder-node_modules":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#CB3837" d="M4 6h10l2 2h12v18H4V6z" />
          <path fill="#000" d="M4 6h10l2 2h12v2H4v16h24v2H4V6z" opacity="0.2" />
        </svg>
      );

    // New: Git Folder Icon
    case "folder-git":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#F05032" d="M4 6h10l2 2h12v18H4V6z" />
          <path fill="#000" d="M4 6h10l2 2h12v2H4v16h24v2H4V6z" opacity="0.2" />
        </svg>
      );

    // New: Tests Folder Icon
    case "folder-tests":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#00A300" d="M4 6h10l2 2h12v18H4V6z" />
          <path fill="#000" d="M4 6h10l2 2h12v2H4v16h24v2H4V6z" opacity="0.2" />
        </svg>
      );

    // New: Dist Folder Icon
    case "folder-dist":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#6A737D" d="M4 6h10l2 2h12v18H4V6z" />
          <path fill="#000" d="M4 6h10l2 2h12v2H4v16h24v2H4V6z" opacity="0.2" />
        </svg>
      );

    default:
      return null;
  }
};

export default Icons;
