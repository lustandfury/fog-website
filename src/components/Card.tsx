import React from 'react';
import { Image } from 'lucide-react';

interface CardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  attributes?: any;
}

export function Card({ title = '', description = '', imageUrl, attributes }: CardProps) {
  return (
    <div {...attributes} className={`bg-white rounded-lg shadow-md ${attributes?.className || ''}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <Image className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

