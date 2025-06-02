// EllipsisMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import AppIcon from './AppIcons';
import clsx from 'clsx';

interface EllipsisMenuProps {
  onToggleOutline: () => void;
  isOutlineVisible: boolean;
}

const EllipsisMenu: React.FC<EllipsisMenuProps> = ({
  onToggleOutline,
  isOutlineVisible
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleToggleOutline = () => {
    onToggleOutline();
    setIsMenuOpen(false);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  return (
    <div className="relative" ref={menuRef}>
      <AppIcon
        iconName="ellipsis"
        className={clsx(
          "w-6 h-5 hover:cursor-pointer hover:bg-[rgb(75,75,75)] transition duration-100 rounded-md",
          isMenuOpen ? "bg-[rgb(75,75,75)]" : ""
        )}
        onClick={toggleMenu}
      />
      
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-1 bg-[#252526] border border-[#3c3c3c] rounded shadow-lg z-50 min-w-[180px]">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#04395e] flex items-center justify-between"
              onClick={handleToggleOutline}
            >
              <span>{isOutlineVisible ? 'Hide Outline' : 'Show Outline'}</span>
              {isOutlineVisible && <AppIcon iconName="check" className="w-4 h-4" />}
            </button>
            
            <div className="border-t border-[#3c3c3c] my-1"></div>
            
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#04395e] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Refresh Explorer</span>
            </button>
            
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#04395e] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Collapse Folders</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EllipsisMenu;
