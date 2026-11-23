import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function UtilityBar() {
  return (
    <div className="bg-charcoal text-neutral-300 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-green-primary rounded-full animate-pulse" />
          <span className="font-medium tracking-wide">
            University Merchandise & Fashion-Tech Ecosystem · India
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://merch-x-jmi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            <span>Visit JMI Storefront ↗</span>
          </a>
          <span className="hidden md:inline text-neutral-600">|</span>
          <Link
            to="/partner"
            className="hidden sm:inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-white hover:text-green-primary transition-colors duration-150"
          >
            <span>Partner With MerchX</span>
            <ArrowRight className="w-3 h-3 text-green-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}

