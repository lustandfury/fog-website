import React, { useState, useEffect } from 'react';

interface Logo {
  url: string;
  alt: string;
  width?: number;
}

interface LogoParadeProps {
  row1Logos?: Logo[];
  row2Logos?: Logo[];
  row3Logos?: Logo[];
  row1Title?: string;
  row2Title?: string;
  row3Title?: string;
  speed?: number;
  attributes?: React.HTMLAttributes<HTMLDivElement>;
}

export function LogoParade({ 
  row1Logos = [], 
  row2Logos = [], 
  row3Logos = [], 
  row1Title = 'Financial Services & Insurance Firms',
  row2Title = 'Enterprise Global Operations',
  row3Title = 'Technology & Innovation Leaders',
  attributes 
}: LogoParadeProps) {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Ensure each row has maximum 5 logos
  const limitLogos = (logos: Logo[]) => logos.slice(0, 5);

  const rows = [
    { logos: limitLogos(row1Logos), title: row1Title },
    { logos: limitLogos(row2Logos), title: row2Title },
    { logos: limitLogos(row3Logos), title: row3Title }
  ];

  useEffect(() => {
    // Set initial load to false after a brief delay
    const initialTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentRowIndex((prev) => (prev + 1) % rows.length);
        setIsInitialLoad(true); // Reset for new row
        setTimeout(() => {
          setIsTransitioning(false);
          setTimeout(() => {
            setIsInitialLoad(false); // Start staggered animation
          }, 100);
        }, 50);
      }, 300);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  const renderRow = (logos: Logo[], title: string) => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white text-center uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>{title}</h3>
      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
        {logos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className={`
              flex items-center justify-center flex-shrink-0
              transition-all duration-700
              ${isInitialLoad 
                ? 'opacity-0 translate-y-4' 
                : 'opacity-90 translate-y-0'
              }
            `}
            style={{
              width: '200px',
              height: '80px',
              transitionDelay: `${index * 150}ms`
            }}
          >
            <img
              src={logo.url}
              alt={logo.alt}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:opacity-100 brightness-125"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const currentRow = rows[currentRowIndex];

  return (
    <div {...attributes} className={`py-12 ${attributes?.className || ''}`}>
      <h2 className="text-center mb-3 uppercase text-base font-normal tracking-wider text-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        TRUSTED BY LEADING
      </h2>
      <div 
        className={`transition-all duration-300 ${
          isTransitioning 
            ? 'opacity-0 transform translate-y-4' 
            : 'opacity-100 transform translate-y-0'
        }`}
      >
        {renderRow(currentRow.logos, currentRow.title)}
      </div>
    </div>
  );
}

