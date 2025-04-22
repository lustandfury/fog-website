import React, { useState, useEffect, useRef } from 'react';
import { PanelRightOpen } from 'lucide-react';
import { PrimaryNavItem } from './PrimaryNavItem';
import { SecondaryNavItem } from './SecondaryNavItem';
import { DropdownMenu } from './DropdownMenu';
import { MobileMenu } from './MobileMenu';

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

interface NavItem {
  label: string;
  url?: string;
  dropdownItems?: DropdownItem[];
}

interface SecondaryNavItem {
  label: string;
  url: string;
  icon?: string;
}

interface NavbarProps {
  logo?: string;
  logoUrl?: string;
  primaryItems?: NavItem[];
  secondaryItems?: SecondaryNavItem[];
  attributes?: any;
}

const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESC: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
};

export function Navbar({
  logo = 'https://cdn.builder.io/api/v1/image/assets%2F3726974884634c6bab0631b586f830bd%2Fa6435ad228f54573849a4538f49f85d9',
  logoUrl = '/',
  primaryItems = [],
  secondaryItems = [],
  attributes,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [visibleDropdown, setVisibleDropdown] = useState<number | null>(null);
  const [dropdownFadingOut, setDropdownFadingOut] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  let closeTimeout: NodeJS.Timeout;
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const navRef = useRef<HTMLElement>(null);
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!isBrowser) return;
    
    const handleScroll = () => {
      if (isScrollLocked) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY || isHoveringTop);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isTopHover = e.clientY < 150;
      setIsHoveringTop(isTopHover);
      if (isTopHover) setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, isHoveringTop, isScrollLocked, isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setActiveIndex(0);
      }, 100);
      setIsScrollLocked(true);
      return () => clearTimeout(timer);
    } else {
      setIsScrollLocked(false);
      document.body.style.overflow = '';
      setActiveIndex(-1);
    }
  }, [isOpen, isBrowser]);

  useEffect(() => {
    if (
      activeIndex >= 0 &&
      activeIndex < primaryItems.length + secondaryItems.length
    ) {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, primaryItems.length, secondaryItems.length]);

  // Effect to manage dropdown visibility with animations
  useEffect(() => {
    if (activeDropdown !== null) {
      setVisibleDropdown(activeDropdown);
      setDropdownFadingOut(false);
    } else {
      if (visibleDropdown !== null) {
        setDropdownFadingOut(true);
        const timeout = setTimeout(() => {
          setVisibleDropdown(null);
          setDropdownFadingOut(false);
        }, 300); // Match this with the CSS animation duration
        return () => clearTimeout(timeout);
      }
    }
  }, [activeDropdown, visibleDropdown]);

  const handleDropdownEnter = (index: number) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setActiveDropdown(index);
    setFocusedItemIndex(-1);
  };

  const handleDropdownLeave = () => {
    closeTimeout = setTimeout(() => {
      setActiveDropdown(null);
      setFocusedItemIndex(-1);
    }, 250);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const dropdownItems = primaryItems[index]?.dropdownItems || [];
    const hasUrl = Boolean(primaryItems[index]?.url);

    switch (event.key) {
      case KEYS.ENTER:
      case KEYS.SPACE:
        event.preventDefault();
        if (hasUrl && !dropdownItems.length) {
          if (isBrowser) {
            window.location.href = primaryItems[index].url!;
          }
        } else if (activeDropdown === null) {
          handleDropdownEnter(index);
        } else if (focusedItemIndex >= 0) {
          const item = dropdownItems[focusedItemIndex];
          if (item?.url && isBrowser) window.location.href = item.url;
        } else if (hasUrl) {
          if (isBrowser) {
            window.location.href = primaryItems[index].url!;
          }
        }
        break;

      case KEYS.ESC:
        event.preventDefault();
        handleDropdownLeave();
        break;

      case KEYS.ARROW_DOWN:
        event.preventDefault();
        if (dropdownItems.length) {
          if (activeDropdown === index) {
            setFocusedItemIndex((prev) =>
              prev < dropdownItems.length - 1 ? prev + 1 : 0
            );
          } else {
            handleDropdownEnter(index);
            setFocusedItemIndex(0);
          }
        }
        break;

      case KEYS.ARROW_UP:
        event.preventDefault();
        if (activeDropdown === index && dropdownItems.length) {
          setFocusedItemIndex((prev) =>
            prev > 0 ? prev - 1 : dropdownItems.length - 1
          );
        }
        break;
    }
  };

  const handleDropdownItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KEYS.ESC) {
      e.preventDefault();
      handleDropdownLeave();
    }
  };

  return (
    <>
      <nav
        {...attributes}
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-300 transform mt-4 m-2 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-[1340px] mx-auto bg-black/80 backdrop-blur-sm rounded-full px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <a href={logoUrl}>
                  <img className="w-auto md:h-10 h-8" src={logo} alt="Logo" />
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8 pr-2">
              {/* Primary Navigation */}
              <div className="flex items-center space-x-8">
                {primaryItems.map((item, index) => (
                  <div key={index} className="relative">
                    <PrimaryNavItem
                      label={item.label}
                      url={item.url}
                      hasDropdown={!!(item.dropdownItems && item.dropdownItems.length > 0)}
                      isActive={activeDropdown === index}
                      index={index}
                      onMouseEnter={() => handleDropdownEnter(index)}
                      onMouseLeave={handleDropdownLeave}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onClick={() => {
                        if (
                          item.url &&
                          (!item.dropdownItems?.length ||
                            activeDropdown === index)
                        ) {
                          window.location.href = item.url;
                        }
                      }}
                    />

                    {/* Dropdown Menu */}
                    {item.dropdownItems &&
                      item.dropdownItems.length > 0 &&
                      visibleDropdown === index && (
                        <DropdownMenu
                          items={item.dropdownItems}
                          isVisible={visibleDropdown === index}
                          isFadingOut={dropdownFadingOut}
                          menuIndex={index}
                          focusedItemIndex={focusedItemIndex}
                          onMouseEnter={() => handleDropdownEnter(index)}
                          onMouseLeave={handleDropdownLeave}
                          onItemHover={setHoveredItem}
                          onKeyDown={handleDropdownItemKeyDown}
                        />
                      )}
                  </div>
                ))}

                {/* Secondary Navigation */}
                <div className="flex items-center space-x-4">
                  {secondaryItems.map((item, index) => (
                    <SecondaryNavItem
                      key={index}
                      label={item.label}
                      url={item.url}
                      icon={item.icon}
                      isLast={index === secondaryItems.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-primary/20 transition-colors duration-200"
              >
                <PanelRightOpen className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes dropdownFade {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isOpen}
        activeIndex={activeIndex}
        logo={logo}
        logoUrl={logoUrl}
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}