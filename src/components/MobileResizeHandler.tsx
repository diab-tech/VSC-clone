// MobileResizeHandler.tsx
import React, { useState, useEffect, useRef } from 'react';

interface MobileResizeHandlerProps {
  onResize: (size: number) => void;
  initialSize: number;
  minSize: number;
  maxSize: number;
}

const MobileResizeHandler: React.FC<MobileResizeHandlerProps> = ({
  onResize,
  initialSize,
  minSize,
  maxSize
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentSize, setCurrentSize] = useState(initialSize);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const containerWidth = window.innerWidth;
    const deltaX = e.touches[0].clientX - startX;
    const deltaPercent = (deltaX / containerWidth) * 100;
    
    // Calculate new size as percentage of container width
    let newSize = currentSize + deltaPercent;
    
    // Clamp to min/max
    newSize = Math.max(minSize, Math.min(maxSize, newSize));
    
    // Update size
    setCurrentSize(newSize);
    onResize(newSize);
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Add global touch event handlers when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleGlobalTouchMove);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
      };
    }
  }, [isDragging, startX, currentSize]);
  
  // Global handlers to continue tracking even if pointer leaves the handle
  const handleGlobalTouchMove = (e: TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while resizing
    
    if (!isDragging) return;
    
    const containerWidth = window.innerWidth;
    const deltaX = e.touches[0].clientX - startX;
    const deltaPercent = (deltaX / containerWidth) * 100;
    
    // Calculate new size as percentage of container width
    let newSize = currentSize + deltaPercent;
    
    // Clamp to min/max
    newSize = Math.max(minSize, Math.min(maxSize, newSize));
    
    // Update size
    setCurrentSize(newSize);
    onResize(newSize);
    setStartX(e.touches[0].clientX);
  };
  
  const handleGlobalTouchEnd = () => {
    setIsDragging(false);
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-2 bg-transparent hover:bg-blue-600 cursor-col-resize absolute right-0 top-0 bottom-0 z-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default MobileResizeHandler;
