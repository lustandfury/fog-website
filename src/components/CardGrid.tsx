import React from 'react';
import { Image } from 'lucide-react';

interface CardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
}

interface CardGridProps {
  cards?: CardProps[];
  columns?: number;
  gap?: number;
  attributes?: any;
}

export function CardGrid({ 
  cards = [], 
  columns = 3, 
  gap = 8,
  attributes 
}: CardGridProps) {
  return (
    <div 
      {...attributes} 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-${gap} ${attributes?.className || ''}`}
    >
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-gray-900 rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 border border-gray-800"
        >
          {card.imageUrl ? (
            <img 
              src={card.imageUrl} 
              alt={card.title} 
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
              <Image className="w-8 h-8 text-gray-600" />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              {card.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardGrid;