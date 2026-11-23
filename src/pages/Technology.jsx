import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';
import { ThreeCustomizerMockup } from '@/components/sections/ThreeCustomizerMockup';
import { Cpu, Box, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';

const techPillars = [
  {
    icon: Box,
    title: 'Real-Time 3D Garment Rendering',
    description: 'Interactive WebGL/Three.js simulation allowing university organizers and designers to rotate, inspect, and evaluate fabric drape, seam finishes, and colors with photorealistic accuracy.'
  },
  {
    icon: Sliders,
    title: 'Dynamic Crest & Typography Engine',
    description: 'Instant institutional badge, department crest, student name, and graduation year placement with automated vector resolution checks and embroidery density constraints.'
  },
  {
    icon: Layers,
    title: 'Automated Tech-Pack Generation',
    description: 'Bridging design directly to manufacturing by automatically outputting standard digital production spec sheets, pantone color recipes, and sizing grading.'
  },
  {
    icon: Cpu,
    title: 'Decentralized Production Sync',
    description: 'Real-time synchronization between digital orders and verified textile mills across India, minimizing lead times and eliminating inventory deadstock.'
  }
];

export default function Technology() {
  return (
    <>
      <Seo
        title="Technology & Innovation — 3D Fashion-Tech Ecosystem"
        description="Discover MerchX's technology roadmap: proprietary 3D apparel customization, smart tech-pack generation, and digital manufacturing coordination."
        url="/technology"
      />

      <PageHero
        label="Technology & Innovation"
        title="Beyond Merchandise. Towards a Digital Fashion Ecosystem."
        subtitle="We are pioneering proprietary 3D customization and supply-chain technology to transform how collegiate apparel is designed and produced."
        ctaText="View Growth Roadmap"
        ctaTo="/vision"
      />

      {/* Interactive 3D Customizer Studio Showcase */}
      <Section variant="white" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Interactive Prototype"
              title="3D Apparel Customisation Studio"
              subtitle="Experience our Phase 3 technology vision — test fabric colors, toggle institutional badges, and rotate the heavyweight hoodie silhouette in full 3D."
            />
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <ThreeCustomizerMockup />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The 4 Core Technology Pillars */}
      <Section variant="ivory" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Engineering The Future"
              title="Proprietary Technology Capabilities"
              subtitle="How our software infrastructure will modernize collegiate apparel production from end to end."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {techPillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="bg-white border border-beige p-8 rounded-xs h-full flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-green-primary/10 text-green-primary flex items-center justify-center rounded-xs mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-charcoal mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm text-grey leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Institutional Co-Creation Vision */}
      <Section variant="charcoal" py="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-xs mb-4">
                <Sparkles className="w-4 h-4 text-green-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                  Concept · Coming Soon · Our Vision
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight md:leading-none">
                Empowering Campus Creators & Institutions
              </h2>

              <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-neutral-300 leading-relaxed">
                By removing the friction of technical pattern making and minimum-order barriers, our technology will allow any university society, sports team, or academic department to launch professional apparel in minutes.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                <CTAButton to="/partner" variant="primary" size="lg" className="w-full sm:w-auto">
                  Collaborate on Our Vision
                </CTAButton>
                <CTAButton to="/how-it-works" variant="outline-light" size="lg" className="w-full sm:w-auto">
                  See Current Process
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

