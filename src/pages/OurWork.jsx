import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/data/projects';
import { Sparkles, Building2, Compass, Layers } from 'lucide-react';

export default function OurWork() {
  const jamiaProject = projects[0];

  return (
    <>
      <Seo
        title="Our Work — Case Studies & University Projects"
        description="Explore MerchX's work developing university merchandise ecosystems, featuring our inaugural initiative for the Jamia Millia Islamia community."
        url="/our-work"
      />

      <PageHero
        label="Case Studies"
        title="Where the MerchX Journey Begins."
        subtitle="Explore our pilot deployments demonstrating how student-led fashion-tech transforms campus merchandise."
        ctaText="Start Your Project"
        ctaTo="/partner"
      />

      {/* Featured Inaugural Project */}
      <Section variant="white" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Featured Case Study"
              title="The Jamia Essential Collection"
              subtitle="Demonstrating our complete end-to-end model: brand conceptualisation, apparel development, bespoke digital storefront, and campus distribution."
            />
          </Reveal>

          <div className="mt-12 max-w-4xl mx-auto">
            <Reveal>
              <ProjectCard project={jamiaProject} variant="light" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What This Project Validated */}
      <Section variant="ivory" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Key Outcomes"
              title="What Our Pilot Validated."
              subtitle="Key operational benchmarks established during our inaugural rollout."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Reveal delay={100}>
              <div className="bg-white p-8 border border-beige rounded-xs h-full">
                <div className="font-heading text-4xl font-black text-green-primary mb-2">
                  100%
                </div>
                <h3 className="font-heading text-xl font-bold uppercase text-charcoal mb-2">
                  Student Community Excitement
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  Demonstrated massive student demand for heavyweight, premium-quality collegiate hoodies and tees designed with authentic cultural resonance.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white p-8 border border-beige rounded-xs h-full">
                <div className="font-heading text-4xl font-black text-green-primary mb-2">
                  Seamless
                </div>
                <h3 className="font-heading text-xl font-bold uppercase text-charcoal mb-2">
                  Digital Ordering Flow
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  Deployed a clean, dedicated digital storefront enabling students to browse silhouettes, pick sizes with precision charts, and pay via secure digital channels.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white p-8 border border-beige rounded-xs h-full">
                <div className="font-heading text-4xl font-black text-green-primary mb-2">
                  Proven
                </div>
                <h3 className="font-heading text-xl font-bold uppercase text-charcoal mb-2">
                  Quality Assurance Pipeline
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  Established direct-from-mill fabric sourcing (350+ GSM fleece) and verified embroidery tolerances that rival international collegiate brands.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Upcoming Campus Collaborations */}
      <Section variant="charcoal" py="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-green-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-primary">
                  Expansion In Progress
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                Bring MerchX to Your Campus
              </h2>

              <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
                We are actively onboarding university student councils, athletic departments, alumni associations, and institutional leaders for the upcoming academic year.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <CTAButton to="/partner" variant="primary" size="lg">
                  Submit Institutional Enquiry
                </CTAButton>
                <CTAButton to="/what-we-do" variant="outline-light" size="lg">
                  Explore Services
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

