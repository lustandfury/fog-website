import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  text?: string;
  buttonText?: string;
  buttonUrl?: string;
  variant?: 'primary' | 'secondary';
  attributes?: any;
}

export function CallToAction({ 
  text = '', 
  buttonText = 'Learn More', 
  buttonUrl = '#',
  variant = 'primary',
  attributes 
}: CTAProps) {
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-hover text-gray-900',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
  };

  return (
    <div {...attributes} className={`p-8 text-center ${attributes?.className || ''}`}>
      <p className="text-xl mb-6">{text}</p>
      <a 
        href={buttonUrl}
        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${variantClasses[variant]}`}
      >
        {buttonText}
        <ArrowRight className="ml-2 w-4 h-4" />
      </a>
    </div>
  );
}

