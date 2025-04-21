import React from 'react';
import { ChevronDown } from 'lucide-react';

interface PrimaryNavItemProps {
  label: string;
  url?: string;
  hasDropdown: boolean;
  isActive: boolean;
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onClick: () => void;
}

export function PrimaryNavItem({
  label,
  url,
  hasDropdown,
  isActive,
  index,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onClick,
}: PrimaryNavItemProps) {
  return (
    <button
      type="button"
      aria-expanded={isActive}
      aria-haspopup={hasDropdown ? 'menu' : undefined}
      aria-controls={hasDropdown ? `dropdown-menu-${index}` : undefined}
      className="flex items-center text-gray-100 px-3 py-2 text-base font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {label}
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </button>
  );
}