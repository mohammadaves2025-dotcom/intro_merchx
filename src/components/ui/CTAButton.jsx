import React from 'react';
import { Link } from 'react-router-dom';

export function CTAButton({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-heading uppercase font-bold tracking-wider rounded-xs transition-all duration-200 cursor-pointer text-center select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-green-primary text-white hover:bg-green-dark active:scale-[0.99] shadow-sm hover:shadow',
    'outline-dark':
      'border-2 border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-white',
    'outline-light':
      'border-2 border-white text-white bg-transparent hover:bg-white hover:text-charcoal',
    'outline-green':
      'border-2 border-green-primary text-green-primary bg-transparent hover:bg-green-primary hover:text-white',
    ghost:
      'text-charcoal hover:text-green-primary bg-transparent'
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 min-h-[38px]',
    md: 'text-sm px-6 py-3 min-h-[46px]',
    lg: 'text-base px-8 py-4 min-h-[52px]'
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${
    sizes[size] || sizes.md
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}

