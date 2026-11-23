import React from 'react';

export function Section({
  children,
  variant = 'white',
  py = 'md',
  id,
  className = '',
  ...props
}) {
  const variantStyles = {
    white: 'bg-white text-charcoal',
    ivory: 'bg-ivory text-charcoal',
    charcoal: 'bg-charcoal text-white',
    cream: 'bg-cream text-charcoal'
  }[variant] || 'bg-white text-charcoal';

  const pyStyles = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-20 md:py-24',
    lg: 'py-24 md:py-32'
  }[py] || 'py-20 md:py-24';

  return (
    <section
      id={id}
      className={`relative ${variantStyles} ${pyStyles} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

