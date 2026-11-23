import React from 'react';
import { useReveal } from '@/hooks/useReveal';

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const { ref, isVisible } = useReveal();

  const transitionDelay = `${delay}ms`;

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: '600ms',
        transitionDelay: transitionDelay,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

