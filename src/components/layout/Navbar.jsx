import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '@/assets/logo.jpg';
import { navLinks } from '@/data/site';
import { CTAButton } from '@/components/ui/CTAButton';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-beige transition-shadow duration-200 transform-gpu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group py-1" aria-label="MerchX Home">
            <img
              src={logoImg}
              alt="MerchX — Wear Your Identity"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain"
              width="140"
              height="44"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `font-heading text-sm uppercase tracking-wider font-bold transition-colors duration-150 py-1 relative ${
                    isActive
                      ? 'text-green-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-primary'
                      : 'text-charcoal hover:text-green-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <CTAButton to="/partner" size="sm" variant="primary">
              Partner With MerchX
            </CTAButton>
          </div>

          {/* Mobile Menu Button - 44x44px Touch Target */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-charcoal hover:text-green-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-green-primary rounded-xs transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 sm:top-20 bg-charcoal/60 backdrop-blur-xs z-30 lg:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="relative z-40 lg:hidden border-b border-beige bg-white shadow-2xl max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 sm:px-6 pt-3 pb-8 space-y-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `block py-3 px-4 font-heading uppercase text-base font-bold tracking-wider rounded-xs transition-colors ${
                    isActive
                      ? 'bg-cream text-green-primary border-l-4 border-green-primary'
                      : 'text-charcoal hover:bg-ivory hover:text-green-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-4 mt-2 border-t border-beige">
              <CTAButton
                to="/partner"
                size="md"
                variant="primary"
                className="w-full justify-center py-3.5"
              >
                Partner With MerchX
              </CTAButton>
            </div>

            <div className="pt-3 text-center">
              <a
                href="https://merch-x-jmi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-grey hover:text-green-primary font-medium transition-colors inline-flex items-center gap-1 py-1"
              >
                <span>Visit JMI Student Store ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
