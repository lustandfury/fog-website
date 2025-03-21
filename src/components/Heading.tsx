import React from 'react';

interface HeadingProps {
  title?: string;
  size?: 'small' | 'medium' | 'large';
  attributes?: any;
}

export function Heading({ title = '', size = 'medium', attributes }: HeadingProps) {
  const sizeClasses = {
    small: 'text-xl md:text-2xl',
    medium: 'text-2xl md:text-3xl',
    large: 'text-3xl md:text-4xl'
  };

  return (
    <h1 {...attributes} className={`font-bold ${sizeClasses[size]} ${attributes?.className || ''}`}>
      {title}
    </h1>
  );
}

export default Heading;