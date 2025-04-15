import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { PanelRightOpen, PanelRightClose } from 'lucide-react';
import * as IconoirIcons from 'iconoir-react';
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
  const navRef = React.useRef<HTMLElement>(null);
  const dropdownRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const dropdownItemRefs = React.useRef<(HTMLAnchorElement | null)[][]>([]);

  useEffect(() => {
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
  }, [lastScrollY, isHoveringTop, isScrollLocked]);

  useEffect(() => {
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
  }, [isOpen]);

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
          window.location.href = primaryItems[index].url!;
        } else if (activeDropdown === null) {
          handleDropdownEnter(index);
        } else if (focusedItemIndex >= 0) {
          const item = dropdownItems[focusedItemIndex];
          if (item?.url) window.location.href = item.url;
        } else if (hasUrl) {
          window.location.href = primaryItems[index].url!;
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

  useEffect(() => {
    if (focusedItemIndex >= 0 && activeDropdown !== null) {
      dropdownItemRefs.current[activeDropdown]?.[focusedItemIndex]?.focus();
    }
  }, [focusedItemIndex, activeDropdown]);

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    const IconoirComponent = (IconoirIcons as any)[iconName];
    return IconComponent ? (
      <IconComponent className="w-5 h-5" />
    ) : IconoirComponent ? (
      <IconoirComponent className="w-5 h-5" />
    ) : null;
  };

  return (
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
                  <button
                    type="button"
                    aria-expanded={activeDropdown === index}
                    aria-haspopup={
                      item.dropdownItems?.length ? 'menu' : undefined
                    }
                    aria-controls={
                      item.dropdownItems?.length
                        ? `dropdown-menu-${index}`
                        : undefined
                    }
                    className="flex items-center text-gray-100 px-3 py-2 text-base font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
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
                  >
                    {item.label}
                    {item.dropdownItems && item.dropdownItems.length > 0 && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.dropdownItems &&
                    item.dropdownItems.length > 0 &&
                    visibleDropdown === index && (
                      <div
                        role="menu"
                        id={`dropdown-menu-${index}`}
                        ref={(el) => (dropdownRefs.current[index] = el)}
                        aria-orientation="vertical"
                        aria-labelledby={`menu-button-${index}`}
                        className={`fixed left-1/2 -translate-x-1/2 mt-2 w-[80vw] max-w-6xl bg-black/95 backdrop-blur-lg rounded-xl border border-white/30 shadow-xl transition-opacity duration-300 ${
                          dropdownFadingOut ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{ maxWidth: '1280px' }}
                        onMouseEnter={() => handleDropdownEnter(index)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="w-full p-10">
                          <div className="grid grid-cols-3 gap-10 w-full">
                            {item.dropdownItems.map(
                              (dropdownItem, dropdownIndex) => (
                                <div
                                  key={dropdownIndex}
                                  className="opacity-0"
                                  style={{
                                    animation: `dropdownFade 0.3s ease-out forwards ${
                                      dropdownFadingOut ? 'reverse' : ''
                                    }`,
                                    animationDelay: dropdownFadingOut
                                      ? `${
                                          (item.dropdownItems!.length -
                                            dropdownIndex -
                                            1) *
                                          0.05
                                        }s`
                                      : `${dropdownIndex * 0.1}s`,
                                  }}
                                >
                                  {dropdownItem.isOffering ? (
                                    <div className="block h-full">
                                      <div className="flex flex-col h-full justify-between gap-5">
                                        <div className="flex flex-col">
                                        <h2 className="text-xl/6 text-primary font-semibold tracking-wide">
                                          {dropdownItem.title}
                                        </h2>
                                        {dropdownItem.description && (
                                          <p className="text-white/85 text-base">
                                            {dropdownItem.description}
                                          </p>
                                        )}
                                        </div>
                                        <OfferCard
                                          imageUrl={dropdownItem.offeringImageUrl || ''}
                                          altText={dropdownItem.offeringAltText || dropdownItem.title}
                                          title={dropdownItem.offeringLinkText || `Learn about our ${dropdownItem.title}`}
                                          url={dropdownItem.url}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <a
                                      role="menuitem"
                                      ref={(el) => {
                                        if (!dropdownItemRefs.current[index]) {
                                          dropdownItemRefs.current[index] = [];
                                        }
                                        dropdownItemRefs.current[index][
                                          dropdownIndex
                                        ] = el;
                                      }}
                                      tabIndex={activeDropdown === index ? 0 : -1}
                                      href={dropdownItem.url}
                                      className={`group flex items-top w-full p-4 m-2 rounded-lg hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                                        focusedItemIndex === dropdownIndex
                                          ? 'bg-white/5'
                                          : ''
                                      }`}
                                      onMouseEnter={() =>
                                        setHoveredItem(`${index}-${dropdownIndex}`)
                                      }
                                      onMouseLeave={() => setHoveredItem(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === KEYS.ESC) {
                                          e.preventDefault();
                                          handleDropdownLeave();
                                        }
                                      }}
                                    >
                                      <div className="ml-4 flex-grow">
                                        <p className="text-base font-medium text-white group-hover:text-primary transition-colors duration-200">
                                          {dropdownItem.title}
                                        </p>
                                        <div className="relative h-[20px]">
                                          {dropdownItem.description && (
                                            <p
                                              className="mt-1 text-sm text-gray-300 absolute top-0 left-0 overflow-hidden whitespace-pre opacity-0 group-hover:text-gray-100"
                                              style={{
                                                animation: `typeDescription 0.3s ease-out forwards`,
                                                animationDelay: `${
                                                  dropdownIndex * 0.1 + 0.2
                                                }s`,
                                              }}
                                            >
                                              {dropdownItem.description}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              ))}

              {/* Secondary Navigation */}
              <div className="flex items-center space-x-4">
                {secondaryItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className={`flex items-center px-5 py-2 rounded-lg text-m font-medium transition-colors duration-200 ${
                      index === secondaryItems.length - 1
                        ? 'bg-primary text-gray-900 hover:bg-primary-hover'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.icon && (
                      <span className="mr-2">{getIcon(item.icon)}</span>
                    )}
                    {item.label}
                  </a>
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
              {isOpen ? (
                <PanelRightClose className="h-6 w-6" />
              ) : (
                <PanelRightOpen className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed -mt-4 inset-y-0 -right-[20px] w-full max-w-sm h-[100dvh] bg-black transform transition-transform duration-300 ease-out lg:hidden overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isScrollLocked ? 'pointer-events-auto' : ''}`}
        style={{ zIndex: 999, willChange: 'transform' }}
      >
        <div className="flex flex-col h-[100dvh]">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="px-6 pt-6 pb-8">
              <div className="flex items-center justify-between mb-8">
                <a href={logoUrl}>
                  <img className="h-8 w-auto" src={logo} alt="Logo" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-expanded={isOpen}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-md text-white hover:text-primary hover:bg-white/10 transition-colors duration-200"
                >
                  <PanelRightClose className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {primaryItems.map((item, index) => {
                  const isActive = activeIndex >= index;
                  return (
                    <div
                      key={index}
                      className={`transform transition-all duration-300 ${
                        isActive
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-8 opacity-0'
                      }`}
                    >
                      <div className="py-3 border-b border-white/10">
                        <button
                          type="button"
                          aria-expanded={
                            item.dropdownItems?.length ? 'true' : undefined
                          }
                          className={`block text-lg font-medium text-white hover:text-primary transition-colors duration-200 ${
                            !item.dropdownItems?.length ? 'w-full py-2' : ''
                          }`}
                          onClick={() => {
                            if (item.url) {
                              window.location.href = item.url;
                            }
                            if (!item.dropdownItems?.length) {
                              setIsOpen(false);
                            }
                          }}
                        >
                          {item.label}
                        </button>
                        {item.dropdownItems &&
                          item.dropdownItems.length > 0 && (
                            <div className="flex flex-col gap-5">
                              {item.dropdownItems.map(
                                (dropdownItem, dropdownIndex) => (
                                  <div key={dropdownIndex}>
                                    {dropdownItem.isOffering ? (
                                      <div className="block mt-4">
                                        <h3 className="text-xl text-primary font-medium leading-none mb-2">
                                          {dropdownItem.title}
                                        </h3>
                                        {dropdownItem.description && (
                                          <p className="text-white text-sm leading-relaxed mb-3">
                                            {dropdownItem.description}
                                          </p>
                                        )}
                                        <OfferCard
                                          imageUrl={dropdownItem.offeringImageUrl || ''}
                                          altText={dropdownItem.offeringAltText || dropdownItem.title}
                                          title={dropdownItem.offeringLinkText || `Learn about our ${dropdownItem.title}`}
                                          url={dropdownItem.url}
                                        />
                                      </div>
                                    ) : (
                                      <a
                                        href={dropdownItem.url}
                                        className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                      >
                                        <div>
                                          <p className="font-medium text-white group-hover:text-primary transition-colors duration-200">
                                            {dropdownItem.title}
                                          </p>
                                          <p className="mt-1 text-sm text-gray-300 group-hover:text-gray-100">
                                            {dropdownItem.description}
                                          </p>
                                        </div>
                                      </a>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-white/10">
            {secondaryItems.map((item, index) => {
              const isActive = activeIndex >= primaryItems.length + index;
              return (
                <a
                  key={index}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 transform mb-2 last:mb-0 ${
                    isActive
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-8 opacity-0'
                  } ${
                    index === secondaryItems.length - 1
                      ? 'bg-primary text-gray-900 hover:bg-primary-hover'
                      : 'text-white hover:text-primary hover:bg-white/5'
                  }`}
                >
                  {item.icon && (
                    <span className="mr-2">{getIcon(item.icon)}</span>
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 998 }}
        onClick={() => setIsOpen(false)}
      ></div>

      <style jsx="true">{`
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
  );
}