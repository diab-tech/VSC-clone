import React from "react";

interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

const Icons: React.FC<IconProps> = ({ name, width = 16, height = 16, className }) => {
  switch (name) {
    case "file-type-js":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#f7df1e" d="M0 0h32v32H0z" />
          <path
            fill="#000"
            d="M20.5 18.7c0-1.8-1.3-2.7-3.1-2.7-1.3 0-2.7.5-2.7 1.8 0 .9.7 1.4 1.8 1.4 1.3 0 2.2-.5 2.2-1.4 0-.5-.4-.9-1.3-.9-.7 0-1.3.4-1.3.9 0 .4.4.5.9.5.7 0 1.3-.4 1.3-1.3 0-1.3-1.3-1.8-2.2-1.8-1.3 0-1.8.9-1.8 1.8 0 1.8 1.8 2.7 3.1 2.7 1.8 0 3.1-1.3 3.1-2.7zm-7.6 0c0-1.8-1.3-2.7-3.1-2.7-1.3 0-2.7.5-2.7 1.8 0 .9.7 1.4 1.8 1.4 1.3 0 2.2-.5 2.2-1.4 0-.5-.4-.9-1.3-.9-.7 0-1.3.4-1.3.9 0 .4.4.5.9.5.7 0 1.3-.4 1.3-1.3 0-1.3-1.3-1.8-2.2-1.8-1.3 0-1.8.9-1.8 1.8 0 1.8 1.8 2.7 3.1 2.7 1.8 0 3.1-1.3 3.1-2.7z"
          />
        </svg>
      );
    case "file-type-typescript":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#007acc" d="M0 0h32v32H0z" />
          <path
            fill="#fff"
            d="M22.5 10.5h-5v-3h5v3zm-7 0h-5v-3h5v3zm7 7h-5v-3h5v3zm-7 0h-5v-3h5v3zm7 7h-5v-3h5v3zm-7 0h-5v-3h5v3z"
          />
        </svg>
      );
    case "file-type-json":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#000" d="M0 0h32v32H0z" />
          <path fill="#fff" d="M10 10h12v12H10z" />
        </svg>
      );
    case "folder":
      return (
        <svg width={width} height={height} viewBox="0 0 32 32" className={className}>
          <path fill="#ffb300" d="M0 0h32v32H0z" />
          <path fill="#000" d="M4 8h24v20H4z" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" className={className}>
          <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" className={className}>
          <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icons;
