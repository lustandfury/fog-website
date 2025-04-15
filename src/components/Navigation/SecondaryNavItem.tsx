import React from 'react';
import { IconHelper } from './IconHelper';

interface SecondaryNavItemProps {
  label: string;
  url: string;
  icon?: string;
  isLast: boolean;
}

export function SecondaryNavItem({ label, url, icon, isLast }: SecondaryNavItemProps) {
  return (
    <a
      href={url}
      className={`flex items-center px-5 py-2 rounded-lg text-m font-medium transition-colors duration-200 ${
        isLast
          ? 'bg-primary text-gray-900 hover:bg-primary-hover'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {icon && <span className="mr-2"><IconHelper iconName={icon} /></span>}
      {label}
    </a>
  );
}