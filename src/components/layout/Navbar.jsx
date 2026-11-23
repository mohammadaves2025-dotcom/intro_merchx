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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-beige transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="MerchX — Wear Your Identity"
              className="h-10 sm:h-11 w-auto object-contain"
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

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-green-primary focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-beige bg-white shadow-xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `block py-2.5 px-3 font-heading uppercase text-base font-bold tracking-wider rounded-xs transition-colors ${
                    isActive
                      ? 'bg-cream text-green-primary border-l-4 border-green-primary'
                      : 'text-charcoal hover:bg-ivory hover:text-green-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-beige">
              <CTAButton
                to="/partner"
                size="md"
                variant="primary"
                className="w-full justify-center"
              >
                Partner With MerchX
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

