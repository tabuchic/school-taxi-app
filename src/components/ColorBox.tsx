import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ColorBoxProps {
  color: string;
  isSelected: boolean;
  onClick?: () => void;
  isClickable?: boolean;
}

const ColorBox: React.FC<ColorBoxProps> = ({ 
  color, 
  isSelected, 
  onClick, 
  isClickable = false 
}) => {
  return (
    <div
      className={cn(
        'w-32 h-32 rounded-lg border-4 border-gray-300 transition-all duration-300',
        'hover:shadow-lg transform hover:scale-105',
        isSelected && 'scale-150 animate-rotate shadow-xl border-white z-50 relative',
        !isSelected && 'scale-100 z-10',
        isClickable && 'hover:border-gray-500 cursor-pointer',
        !isClickable && 'cursor-default'
      )}
      style={{ backgroundColor: color }}
      onClick={isClickable ? onClick : undefined}
    />
  );
};

export default ColorBox;