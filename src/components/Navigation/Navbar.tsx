import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { NavArrowRight, NavArrowLeft } from 'iconoir-react';
import * as IconoirIcons from 'iconoir-react';

interface DropdownItem {
  title: string;
  description?: string;
  url: string;
  icon?: string;
}

interface NavItem {
  label: string;
  url: string;
  dropdownItems?: DropdownItem[];
}

interface SecondaryNavItem {
  label: string;
  url: string;
  icon?: string;
}

interface NavbarProps {
  logo?: string;
  primaryItems?: NavItem[];
  secondaryItems?: SecondaryNavItem[];
  attributes?: any;
}

export function Navbar({ 
  logo = 'https://cdn.builder.io/api/v1/image/assets%2F3726974884634c6bab0631b586f830bd%2Fa6435ad228f54573849a4538f49f85d9',
  primaryItems = [],
  secondaryItems = [],
  attributes 
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  let closeTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setActiveIndex(0);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setActiveIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < primaryItems.length + secondaryItems.length) {
      const timer = setTimeout(() => {
        setActiveIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, primaryItems.length, secondaryItems.length]);

  const handleDropdownEnter = (index: number) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    closeTimeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    const IconoirComponent = (IconoirIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : 
           IconoirComponent ? <IconoirComponent className="w-5 h-5" /> : null;
  };

  return (
    <nav {...attributes} className="fixed top-0 left-0 right-0 z-[99]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src={logo} alt="Logo" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Primary Navigation */}
            <div className="flex space-x-8">
              {primaryItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    className="flex items-center text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                    onMouseEnter={() => handleDropdownEnter(index)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.label}
                    {item.dropdownItems && item.dropdownItems.length > 0 && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.dropdownItems && item.dropdownItems.length > 0 && activeDropdown === index && (
                    <div
                      className="fixed left-1/2 -translate-x-1/2 mt-2 w-[80vw] max-w-6xl bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl"
                      style={{ maxWidth: '1200px' }}
                      onMouseEnter={() => handleDropdownEnter(index)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="w-full p-6">
                        <div className="grid grid-cols-1 gap-2 w-full">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <a
                              key={dropdownIndex}
                              href={dropdownItem.url}
                              className="group flex items-center w-full p-4 rounded-lg hover:bg-white/5 transition-colors duration-200"
                              onMouseEnter={() => setHoveredItem(`${index}-${dropdownIndex}`)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              {dropdownItem.icon && (
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
                                  {getIcon(dropdownItem.icon)}
                                </div>
                              )}
                              <div className="ml-4 flex-grow">
                                <p className="text-base font-medium text-white group-hover:text-primary transition-colors duration-200">
                                  {dropdownItem.title}
                                </p>
                                <div className="relative h-[20px]">
                                  {dropdownItem.description && (
                                    <>
                                      <p className="mt-1 text-sm text-gray-500 absolute top-0 left-0">
                                        {dropdownItem.description}
                                      </p>
                                      <p 
                                        className={`mt-1 text-sm text-gray-300 absolute top-0 left-0 overflow-hidden whitespace-pre ${
                                          hoveredItem === `${index}-${dropdownIndex}` ? 'animate-typing opacity-100' : 'opacity-0'
                                        }`}
                                        style={{
                                          width: 'fit-content',
                                          borderRight: hoveredItem === `${index}-${dropdownIndex}` ? '2px solid #44FFEE' : 'none'
                                        }}
                                      >
                                        {dropdownItem.description}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Secondary Navigation */}
            <div className="flex items-center space-x-4">
              {secondaryItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    index === secondaryItems.length - 1
                      ? 'bg-primary text-gray-900 hover:bg-primary-hover'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.icon && <span className="mr-2">{getIcon(item.icon)}</span>}
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              {isOpen ? <NavArrowLeft className="h-6 w-6" /> : <NavArrowRight className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-black/95 backdrop-blur-sm transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-6 pt-6 pb-8">
            <div className="flex items-center justify-between mb-8">
              <img className="h-10 w-auto" src={logo} alt="Logo" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                <NavArrowLeft className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {primaryItems.map((item, index) => {
                const isActive = activeIndex >= index;
                return (
                  <div 
                    key={index}
                    className={`transform transition-all duration-300 ${
                      isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                    }`}
                  >
                    <div className="py-3 border-b border-white/10">
                      <a
                        href={item.url}
                        className="text-lg font-medium text-white hover:text-primary transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                      {item.dropdownItems && item.dropdownItems.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <a
                              key={dropdownIndex}
                              href={dropdownItem.url}
                              className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                            >
                              {dropdownItem.icon && (
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                                  {getIcon(dropdownItem.icon)}
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-white group-hover:text-primary transition-colors duration-200">
                                  {dropdownItem.title}
                                </p>
                                {dropdownItem.description && (
                                  <p className="mt-1 text-sm text-gray-400 group-hover:text-gray-300">
                                    {dropdownItem.description}
                                  </p>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="pt-6 space-y-3">
                {secondaryItems.map((item, index) => {
                  const isActive = activeIndex >= primaryItems.length + index;
                  return (
                    <a
                      key={index}
                      href={item.url}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 transform ${
                        isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                      } ${
                        index === secondaryItems.length - 1
                          ? 'bg-primary text-gray-900 hover:bg-primary-hover'
                          : 'text-white hover:text-primary hover:bg-white/5'
                      }`}
                    >
                      {item.icon && <span className="mr-2">{getIcon(item.icon)}</span>}
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 99 }}
        onClick={() => setIsOpen(false)}
      />
    </nav>
  );
}

export default Navbar;