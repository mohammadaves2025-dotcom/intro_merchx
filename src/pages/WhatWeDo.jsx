import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { services } from '@/data/services';
import { CheckCircle2, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

export default function WhatWeDo() {
  return (
    <>
      <Seo
        title="What We Do — Comprehensive Merchandise Capabilities"
        description="Discover MerchX's 5 core capabilities: Product Conceptualisation, Digital Storefronts, Manufacturing Coordination, Quality Control, and Order Fulfilment."
        url="/what-we-do"
      />

      <PageHero
        label="Our Capabilities"
        title="From Concept to Collection. From Design to Delivery."
        subtitle="We provide institutions and campus communities with complete, hassle-free merchandise solutions designed to scale."
        ctaText="Explore How It Works"
        ctaTo="/how-it-works"
        ctaVariant="outline-light"
      />

      {/* 5 Core Services in Depth */}
      <Section variant="white" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Turnkey Services"
              title="A Complete Ecosystem for Institutional Merchandise."
              subtitle="Every component needed to launch, manage, and distribute premium official apparel under one unified roof."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, idx) => (
              <Reveal key={service.id} delay={idx * 100}>
                <ServiceCard service={service} variant="light" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Institutions Choose MerchX */}
      <Section variant="ivory" py="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  label="The MerchX Advantage"
                  title="Why Universities Work With Us."
                  subtitle="We eliminate the operational friction of apparel merchandising."
                />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-6">
                <Reveal delay={100}>
                  <div className="bg-white p-6 border border-beige rounded-xs flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading text-xl font-bold uppercase text-charcoal">
                        Zero Inventory Risk
                      </h4>
                      <p className="text-sm text-grey mt-1">
                        We coordinate pre-order campaign drops and flexible batch production so university departments and clubs never sit on costly leftover stock.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className="bg-white p-6 border border-beige rounded-xs flex items-start gap-4">
                    <Zap className="w-6 h-6 text-green-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading text-xl font-bold uppercase text-charcoal">
                        Dedicated Digital Storefront
                      </h4>
                      <p className="text-sm text-grey mt-1">
                        Each partner receives a clean, modern digital storefront featuring custom branding, seamless UPI/card checkout, and automated buyer confirmations.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="bg-white p-6 border border-beige rounded-xs flex items-start gap-4">
                    <ShieldCheck className="w-6 h-6 text-green-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading text-xl font-bold uppercase text-charcoal">
                        Standardized Quality Assurance
                      </h4>
                      <p className="text-sm text-grey mt-1">
                        Every single item undergoes strict dimensional, color-fastness, and stitch density inspections before being sealed in custom packaging.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Band */}
      <Section variant="charcoal" py="md">
        <Container className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight md:leading-none">
              Ready to Upgrade Your Institution's Merchandise?
            </h2>
            <p className="mt-4 text-neutral-300 text-sm sm:text-lg">
              Let our team develop a custom collection proposal tailored to your colors, crest, and community.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton to="/partner" variant="primary" size="lg" className="w-full sm:w-auto">
                Start a Conversation
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

