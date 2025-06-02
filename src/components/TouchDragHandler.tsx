// TouchDragHandler.tsx
import React, { useState, useEffect, useRef } from 'react';

interface TouchDragHandlerProps {
  onDrag: (deltaX: number) => void;
  onDragEnd: () => void;
  className?: string;
}

const TouchDragHandler: React.FC<TouchDragHandlerProps> = ({
  onDrag,
  onDragEnd,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const dragRef = useRef<HTMLDivElement>(null);
  
  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  
  // Add global touch event handlers when dragging
  useEffect(() => {
    if (!isDragging) return;
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const deltaX = e.touches[0].clientX - startX;
      onDrag(deltaX);
      setStartX(e.touches[0].clientX);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      onDragEnd();
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, onDrag, onDragEnd]);
  
  return (
    <div 
      ref={dragRef}
      className={`w-6 absolute right-0 top-0 bottom-0 z-20 touch-manipulation ${className}`}
      onTouchStart={handleTouchStart}
    >
      <div className="w-1 h-full bg-blue-500 opacity-0 hover:opacity-100 absolute right-0 top-0 bottom-0" />
    </div>
  );
};

export default TouchDragHandler;
