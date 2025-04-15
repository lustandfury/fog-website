import React from 'react';
import * as Icons from 'lucide-react';
import * as IconoirIcons from 'iconoir-react';

interface IconHelperProps {
  iconName?: string;
}

export function IconHelper({ iconName }: IconHelperProps) {
  if (!iconName) return null;
  
  const IconComponent = (Icons as any)[iconName];
  const IconoirComponent = (IconoirIcons as any)[iconName];
  
  return IconComponent ? (
    <IconComponent className="w-5 h-5" />
  ) : IconoirComponent ? (
    <IconoirComponent className="w-5 h-5" />
  ) : null;
}