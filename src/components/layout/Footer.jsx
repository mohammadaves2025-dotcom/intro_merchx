import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { siteConfig, footerLinks } from '@/data/site';
import logoImg from '@/assets/logo.jpg';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t-4 border-green-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white p-2 rounded-xs">
              <img
                src={logoImg}
                alt="MerchX"
                className="h-8 w-auto object-contain"
                width="120"
                height="32"
              />
            </Link>
            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-green-primary font-bold">
                Headquarters
              </p>
              <p className="text-neutral-300 text-sm">{siteConfig.address}</p>
            </div>
            {/* Social Icons if configured */}
            {(siteConfig.socials.instagram || siteConfig.socials.linkedin) && (
              <div className="flex items-center gap-4 pt-2">
                {siteConfig.socials.instagram && (
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-900 hover:bg-green-primary text-neutral-300 hover:text-white rounded-xs transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socials.linkedin && (
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-900 hover:bg-green-primary text-neutral-300 hover:text-white rounded-xs transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-primary rounded-none" />
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors duration-150 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnerships & Legal */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-primary rounded-none" />
              Partnerships
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.work.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-primary hover:text-white font-medium text-sm transition-colors duration-150 inline-flex items-center gap-1.5"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-neutral-400 hover:text-white text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-primary rounded-none" />
              Get in Touch
            </h3>
            <p className="text-neutral-400 text-sm mb-3">
              Institutional enquiries, partnerships, and collaborations:
            </p>
            <Link
              to="/partner"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-green-primary hover:text-white transition-colors"
            >
              <span>Submit Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Big Tagline Banner */}
        <div className="py-8 my-6 flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-neutral-800">
          <div className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-600 select-none break-words">
            WEAR YOUR <span className="text-neutral-300">IDENTITY.</span>
          </div>
          <span className="text-xs uppercase tracking-widest text-green-primary font-bold">
            Student-Led · Tech-Enabled · Purpose-Built
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4 pt-4">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved. An independent university merchandise & fashion-tech venture.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

