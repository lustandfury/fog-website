import React from 'react';
import { PanelRightClose } from 'lucide-react';
import { OfferCard } from './OfferCard';
import { IconHelper } from './IconHelper';

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

interface MobileMenuProps {
  isOpen: boolean;
  activeIndex: number;
  logo: string;
  logoUrl: string;
  primaryItems: NavItem[];
  secondaryItems: SecondaryNavItem[];
  onClose: () => void;
}

export function MobileMenu({
  isOpen,
  activeIndex,
  logo,
  logoUrl,
  primaryItems,
  secondaryItems,
  onClose,
}: MobileMenuProps) {
  return (
    <>
      {/* Mobile menu card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed -mt-4 inset-y-0 -right-[20px] w-full max-w-sm h-[100dvh] bg-black transform transition-transform duration-300 ease-out lg:hidden overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
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
                  onClick={onClose}
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
                              onClose();
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
                  onClick={onClose}
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
                    <span className="mr-2"><IconHelper iconName={item.icon} /></span>
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
        onClick={onClose}
      ></div>
    </>
  );
}