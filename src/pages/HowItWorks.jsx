import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';
import { Timeline } from '@/components/sections/Timeline';
import { steps } from '@/data/steps';
import { Check, Clock, Sparkles, Truck, FileText } from 'lucide-react';

const stepDetails = [
  {
    number: '01',
    phase: 'Discovery',
    title: 'Institutional Collaboration',
    description: 'We meet with university representatives, student union leaders, or club heads to map brand guidelines, historical crests, community aesthetics, and target collection requirements.',
    deliverables: ['Design brief & guidelines review', 'Apparel silhouette selection', 'Target timeline & volume roadmap']
  },
  {
    number: '02',
    phase: 'Design',
    title: 'Concept & Collection Development',
    description: 'Our design team creates bespoke apparel mockups, selecting fabrics (cotton GSM, fleece blends), custom color-matched dyes, embroidery techniques, and label artwork.',
    deliverables: ['3D digital mockups & colorways', 'Physical fabric & print swatches', 'Approved collection deck']
  },
  {
    number: '03',
    phase: 'Digital',
    title: 'Digital Storefront Launch',
    description: 'We deploy a dedicated, high-speed branded storefront tailored to the institution. The platform handles product showcase, size charts, pre-orders, and payment gateway coordination.',
    deliverables: ['Custom domain or subdomain integration', 'Payment processing & student verification', 'Live launch campaign assets']
  },
  {
    number: '04',
    phase: 'Production',
    title: 'Manufacturing & Production Coordination',
    description: 'Once pre-order volumes are confirmed, production begins with our vetted manufacturing partners under strict MerchX supervision for thread counts, dye fastness, and embroidery precision.',
    deliverables: ['Raw material quality audits', 'Batch embroidery & screen printing', 'Mid-production checkpoint inspection']
  },
  {
    number: '05',
    phase: 'QC',
    title: 'Orders & Quality Fulfilment',
    description: 'Every single piece is individual checked for stitching, measurements, and finishing. Garments are carefully folded, tagged with MerchX identity badges, and custom-packaged.',
    deliverables: ['100% item-level quality verification', 'Individual poly-bagging & barcoding', 'Batch-sorted dispatch packaging']
  },
  {
    number: '06',
    phase: 'Distribution',
    title: 'Campus Delivery & Handover',
    description: 'We coordinate seamless distribution — either via centralized on-campus collection popups or direct doorstep parcel shipping to students, faculty, and alumni across India.',
    deliverables: ['On-campus handover event coordination', 'Direct doorstep tracking numbers', 'Customer support & sizing resolution']
  }
];

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How It Works — The 6-Step Merchandise Process"
        description="Learn how MerchX partners with universities, from initial design collaboration to dedicated storefronts, precision production, and campus delivery."
        url="/how-it-works"
      />

      <PageHero
        label="The MerchX Process"
        title="One Ecosystem. Six Seamless Steps."
        subtitle="From understanding your campus identity to the day students wear their collection with pride, here is how we make it happen."
        ctaText="Initiate Collaboration"
        ctaTo="/partner"
      />

      {/* Overview Timeline Grid */}
      <Section variant="white" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Process Flow"
              title="End-to-End Coordination."
              subtitle="An organized, transparent roadmap that takes the operational burden entirely off campus faculty and students."
            />
          </Reveal>

          <div className="mt-12">
            <Timeline steps={steps} />
          </div>
        </Container>
      </Section>

      {/* Step by Step Deep Dive */}
      <Section variant="ivory" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Deep Dive"
              title="Detailed Phase Breakdown"
              subtitle="What happens at each stage of your merchandise journey."
            />
          </Reveal>

          <div className="space-y-8 mt-12">
            {stepDetails.map((s, idx) => (
              <Reveal key={s.number} delay={idx * 80}>
                <div className="bg-white border border-beige rounded-xs p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-green-primary transition-colors">
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <span className="font-heading text-5xl font-black text-green-primary leading-none">
                      {s.number}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-green-primary">
                        Phase {idx + 1} · {s.phase}
                      </span>
                      <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-charcoal mt-1">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <div className="lg:col-span-5 text-sm text-grey leading-relaxed">
                    <p>{s.description}</p>
                  </div>

                  <div className="lg:col-span-3 bg-cream/70 p-4 rounded-xs border border-beige">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal mb-2">
                      Key Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {s.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="text-xs text-charcoal flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-green-primary shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section variant="charcoal" py="md">
        <Container className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white">
              Launch Your Official Collection
            </h2>
            <p className="mt-4 text-neutral-300 text-base sm:text-lg">
              Partner with MerchX and bring an authentic merchandise ecosystem to your university.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <CTAButton to="/partner" variant="primary" size="lg">
                Partner With MerchX
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

