import React from 'react';
import { Container } from '@/components/ui/Container';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';

export function PageHero({
  label,
  title,
  subtitle,
  ctaText,
  ctaTo,
  ctaVariant = 'primary',
  children
}) {
  return (
    <section className="relative bg-charcoal text-white py-12 sm:py-20 md:py-24 border-b border-neutral-800 overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal>
          {label && (
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="h-1.5 w-6 bg-green-primary shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-green-primary">
                {label}
              </span>
            </div>
          )}

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight md:leading-none max-w-4xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
              {subtitle}
            </p>
          )}

          {ctaText && ctaTo && (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <CTAButton to={ctaTo} variant={ctaVariant} size="lg" className="w-full sm:w-auto">
                {ctaText}
              </CTAButton>
            </div>
          )}

          {children && <div className="mt-6 sm:mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
