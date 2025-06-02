// OutlineIconComponent.tsx
import React from 'react';

interface OutlineIconProps {
  type: string;
}

// Map of outline item types to VSCode icon names
const typeToIconMap: Record<string, string> = {
  function: "symbol-method",
  class: "symbol-class",
  interface: "symbol-interface",
  variable: "symbol-variable",
  import: "symbol-namespace",
  type: "symbol-misc",
  constant: "symbol-constant"
};

const OutlineIcon: React.FC<OutlineIconProps> = ({ type }) => {
  const iconName = typeToIconMap[type] || "symbol-misc";
  const iconPath = `/vsc-icons/dark/${iconName}.svg`;

  return (
    <img 
      src={iconPath} 
      alt={type} 
      className="w-4 h-4 inline-block mr-1" 
      onError={(e) => {
        // Fallback if icon not found
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

export default OutlineIcon;
