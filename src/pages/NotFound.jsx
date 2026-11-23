import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/sections/Seo';
import { Container } from '@/components/ui/Container';
import { CTAButton } from '@/components/ui/CTAButton';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 — Page Not Found"
        description="The page you are looking for does not exist on the MerchX corporate platform."
      />

      <div className="min-h-[70vh] bg-charcoal text-white flex items-center justify-center py-20">
        <Container className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-primary/10 text-green-primary flex items-center justify-center mx-auto mb-6">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          <span className="font-heading text-7xl sm:text-9xl font-black text-green-primary leading-none block">
            404
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mt-4">
            Page Not Found
          </h1>

          <p className="mt-4 text-neutral-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            The page you are looking for may have been moved, renamed, or does not exist.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <CTAButton to="/" variant="primary" size="md">
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </span>
            </CTAButton>
          </div>
        </Container>
      </div>
    </>
  );
}

