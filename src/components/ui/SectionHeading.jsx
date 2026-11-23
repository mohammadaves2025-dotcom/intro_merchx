import React from 'react';

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = ''
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto items-center',
    right: 'text-right ml-auto items-end'
  }[align] || 'text-left';

  return (
    <div className={`mb-12 md:mb-16 flex flex-col ${alignClass} ${className}`}>
      {label && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className={`h-1.5 w-6 rounded-none ${light ? 'bg-green-primary' : 'bg-green-primary'}`} />
          <span
            className={`text-xs font-bold uppercase tracking-widest ${
              light ? 'text-green-primary' : 'text-green-primary'
            }`}
          >
            {label}
          </span>
        </div>
      )}
      {title && (
        <h2
          className={`font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none ${
            light ? 'text-white' : 'text-charcoal'
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg max-w-2xl font-normal leading-relaxed ${
            light ? 'text-neutral-300' : 'text-grey'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

