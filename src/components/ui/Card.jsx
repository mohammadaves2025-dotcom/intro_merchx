import React from 'react';

export function Card({
  children,
  className = '',
  noAccent = false,
  variant = 'light', // 'light' or 'dark'
  hoverEffect = true,
  ...props
}) {
  const bgStyles =
    variant === 'dark'
      ? 'bg-neutral-900 border-neutral-800 text-white'
      : 'bg-white border-beige text-charcoal';

  const liftStyles = hoverEffect ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg' : '';

  return (
    <div
      className={`relative rounded-xs border overflow-hidden flex flex-col ${bgStyles} ${liftStyles} ${className}`}
      {...props}
    >
      {!noAccent && (
        <div className="h-1 w-full bg-green-primary shrink-0" aria-hidden="true" />
      )}
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

