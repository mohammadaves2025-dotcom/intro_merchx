import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';
import { roadmapPhases } from '@/data/roadmap';
import { Check, Compass, TrendingUp, Flag, Globe2 } from 'lucide-react';

export default function Vision() {
  return (
    <>
      <Seo
        title="Our Vision & Roadmap — The Future of MerchX"
        description="Explore the 5-phase growth strategy of MerchX: from our inaugural university launchpad to nationwide fashion-tech infrastructure."
        url="/vision"
      />

      <PageHero
        label="Strategic Roadmap"
        title="Building the Future of Institutional Merchandise."
        subtitle="Our 5-phase growth strategy to evolve from an initial collegiate launchpad into India's defining university fashion-tech platform."
        ctaText="Join Us as a Partner"
        ctaTo="/partner"
      />

      {/* 5-Phase Detailed Roadmap */}
      <Section variant="white" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Roadmap Execution"
              title="Phased Strategic Evolution"
              subtitle="Each phase builds on proven operational milestones, expanding our reach and deepening our technological capabilities."
            />
          </Reveal>

          <div className="space-y-12 mt-12">
            {roadmapPhases.map((phaseItem, idx) => (
              <Reveal key={phaseItem.phase} delay={idx * 100}>
                <div className="bg-white border border-beige rounded-xs p-8 sm:p-10 relative overflow-hidden hover:border-green-primary transition-all duration-300 hover:shadow-xl group">
                  <div className="h-1.5 w-full bg-green-primary absolute top-0 left-0 right-0" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Phase Number & Status Tag */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-heading text-6xl sm:text-7xl font-black text-green-primary leading-none group-hover:scale-105 transition-transform origin-left">
                          {phaseItem.phase}
                        </span>
                        <div className="flex flex-col">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-xs inline-block w-fit mb-1 ${
                              phaseItem.status === 'in-progress'
                                ? 'bg-green-primary text-white'
                                : 'bg-cream text-charcoal'
                            }`}
                          >
                            {phaseItem.badge}
                          </span>
                          <span className="text-xs font-semibold text-grey">
                            {phaseItem.timeline}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-charcoal">
                        {phaseItem.title}
                      </h3>
                    </div>

                    {/* Description & Narrative */}
                    <div className="lg:col-span-4 text-sm sm:text-base text-grey leading-relaxed">
                      <p className="mb-4 text-charcoal font-medium">
                        {phaseItem.description}
                      </p>
                    </div>

                    {/* Milestones Checklist */}
                    <div className="lg:col-span-4 bg-ivory p-5 rounded-xs border border-beige">
                      <p className="text-xs font-bold uppercase tracking-wider text-green-primary mb-3">
                        Strategic Deliverables
                      </p>
                      <ul className="space-y-2.5">
                        {phaseItem.milestones.map((m, mIdx) => (
                          <li key={mIdx} className="text-xs text-charcoal flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-green-primary rounded-full mt-1.5 shrink-0" />
                            <span className="leading-snug">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Long-term Manifesto */}
      <Section variant="ivory" py="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <SectionHeading
                label="The Big Picture"
                title="Wear Your Identity."
                subtitle="Why campus culture deserves world-class design."
                align="center"
              />

              <div className="mt-8 text-base sm:text-lg text-charcoal space-y-6 text-left bg-white p-8 sm:p-12 border border-beige rounded-xs shadow-sm">
                <p>
                  Collegiate merchandise is not simply branded cloth. It is a tangible emblem of shared struggle, academic excellence, late nights in libraries, sports victories, and lifelong friendships.
                </p>
                <p className="text-grey">
                  For too long, students in India have settled for disposable promo tees that end up at the bottom of drawers. We are proving that by combining heavyweight fabrics, thoughtful design, institutional dignity, and modern software, university merchandise can become heirloom pieces.
                </p>
                <p className="font-medium text-charcoal">
                  Our goal is simple: to make every university community in India proud to wear its identity.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Partner CTA */}
      <Section variant="charcoal" py="md">
        <Container className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-tight md:leading-none">
              Be Part of Our Journey
            </h2>
            <p className="mt-4 text-neutral-300 text-sm sm:text-lg">
              We are actively speaking with universities, student leadership councils, and institutional investors who share this vision.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton to="/partner" variant="primary" size="lg" className="w-full sm:w-auto">
                Partner With MerchX
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

