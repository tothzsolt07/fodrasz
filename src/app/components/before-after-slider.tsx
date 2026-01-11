import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  altBefore,
  altAfter,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-xl cursor-ew-resize select-none group"
      onMouseDown={handleMouseDown}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={altAfter}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-['Montserrat'] font-semibold">
          Utána
        </div>
      </div>

      {/* Before Image (overlay with clip) */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt={altBefore}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-background text-foreground border-2 border-primary px-3 py-1 rounded-full text-sm font-['Montserrat'] font-semibold">
          Előtte
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize transition-none"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
        }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          {/* Arrows */}
          <svg
            className="w-6 h-6 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M8 9l-4 3 4 3M16 9l4 3-4 3"
            />
          </svg>
        </div>
      </div>

      {/* Hint Text - csak mobilon */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur px-4 py-2 rounded-full text-xs text-muted-foreground md:hidden pointer-events-none">
        Húzd a csúszkát! →
      </div>
    </div>
  );
}
