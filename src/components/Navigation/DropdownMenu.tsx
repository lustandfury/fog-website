import React, { useEffect, useRef } from 'react';
import { OfferCard } from './OfferCard';

interface DropdownItem {
  title: string;
  description?: string;
  url: string;
  icon?: string;
  isOffering?: boolean;
  offeringImageUrl?: string;
  offeringAltText?: string;
  offeringLinkText?: string;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  isVisible: boolean;
  isFadingOut: boolean;
  menuIndex: number;
  focusedItemIndex: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onItemHover: (id: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESC: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
};

export function DropdownMenu({
  items,
  isVisible,
  isFadingOut,
  menuIndex,
  focusedItemIndex,
  onMouseEnter,
  onMouseLeave,
  onItemHover,
  onKeyDown,
}: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (focusedItemIndex >= 0) {
      itemRefs.current[focusedItemIndex]?.focus();
    }
  }, [focusedItemIndex]);

  return (
    <div
      role="menu"
      id={`dropdown-menu-${menuIndex}`}
      ref={dropdownRef}
      aria-orientation="vertical"
      aria-labelledby={`menu-button-${menuIndex}`}
      className={`fixed left-1/2 -translate-x-1/2 mt-2 w-[80vw] max-w-6xl bg-black/95 backdrop-blur-lg rounded-xl border border-white/30 shadow-xl transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ maxWidth: '1280px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full p-10">
        <div className="grid grid-cols-3 gap-[60px] w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="opacity-0"
              style={{
                animation: `dropdownFade 0.3s ease-out forwards ${
                  isFadingOut ? 'reverse' : ''
                }`,
                animationDelay: isFadingOut
                  ? `${(items.length - index - 1) * 0.05}s`
                  : `${index * 0.1}s`,
              }}
            >
              {item.isOffering ? (
                <div className="block h-full">
                  <div className="flex flex-col h-full justify-between gap-5">
                    <div className="flex flex-col">
                      <h2 className="text-xl/6 text-primary font-semibold tracking-wide">
                        {item.title}
                      </h2>
                      {item.description && (
                        <p className="text-white/85 text-base">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <OfferCard
                      imageUrl={item.offeringImageUrl || ''}
                      altText={item.offeringAltText || item.title}
                      title={item.offeringLinkText || `Learn about our ${item.title}`}
                      url={item.url}
                    />
                  </div>
                </div>
              ) : (
                <a
                  role="menuitem"
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  tabIndex={isVisible ? 0 : -1}
                  href={item.url}
                  className={`group flex items-top w-full p-4 m-2 rounded-lg hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    focusedItemIndex === index ? 'bg-white/5' : ''
                  }`}
                  onMouseEnter={() => onItemHover(`${menuIndex}-${index}`)}
                  onMouseLeave={() => onItemHover('')}
                  onKeyDown={onKeyDown}
                >
                  <div className="ml-4 flex-grow">
                    <p className="text-base font-medium text-white group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </p>
                    <div className="relative h-[20px]">
                      {item.description && (
                        <p
                          className="mt-1 text-sm text-gray-300 absolute top-0 left-0 overflow-hidden whitespace-pre opacity-0 group-hover:text-gray-100"
                          style={{
                            animation: `typeDescription 0.3s ease-out forwards`,
                            animationDelay: `${index * 0.1 + 0.2}s`,
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}