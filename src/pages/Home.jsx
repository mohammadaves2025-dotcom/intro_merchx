import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Palette, Globe, Layers } from 'lucide-react';
import { Seo } from '@/components/sections/Seo';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { PillarCard } from '@/components/sections/PillarCard';
import { Timeline } from '@/components/sections/Timeline';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { TeamCard } from '@/components/sections/TeamCard';
import { ContactForm } from '@/components/sections/ContactForm';
import { ThreeCustomizerMockup } from '@/components/sections/ThreeCustomizerMockup';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

import { services } from '@/data/services';
import { steps } from '@/data/steps';
import { productCategories } from '@/data/products';
import { projects } from '@/data/projects';
import { roadmapPhases } from '@/data/roadmap';
import { team } from '@/data/team';

const pillars = [
  {
    id: 'design',
    icon: 'Palette',
    title: 'Design & Apparel',
    description: 'Premium apparel conceptualisation, fabric development, and collection design that captures institutional identity.'
  },
  {
    id: 'commerce',
    icon: 'Globe',
    title: 'Digital Commerce',
    description: 'Dedicated institution-specific digital storefronts, friction-free ordering, and managed fulfillment logistics.'
  },
  {
    id: 'tech',
    icon: 'Cpu',
    title: 'Technology & Innovation',
    description: 'Proprietary 3D digital apparel customisation, smart tech-pack generation, and agile production coordination.'
  }
];

export default function Home() {
  const jamiaProject = projects[0];

  return (
    <>
      <Seo
        title="University Merchandise & Fashion-Tech Ecosystem"
        description="MerchX builds complete merchandise ecosystems for universities, institutions, and communities — from design concept to digital storefront and delivery."
      />

      {/* ============================================================
          SECTION 1: HERO (bg-charcoal, full-bleed)
          ============================================================ */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-charcoal text-white flex items-center justify-center overflow-hidden py-24 sm:py-32">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
          aria-hidden="true"
        />

        {/* Ambient forest green glow */}
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-green-primary/20 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-neutral-900 border border-neutral-800 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-primary animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                The Collegiate Fashion-Tech Ecosystem
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none max-w-5xl mx-auto">
              YOUR INSTITUTION.{' '}
              <span className="text-green-primary">YOUR IDENTITY.</span>{' '}
              YOUR MERCHANDISE.
            </h1>

            <p className="mt-8 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
              MerchX builds complete merchandise ecosystems for universities, institutions and communities — from the first design concept to the final delivery.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <CTAButton to="/partner" variant="primary" size="lg">
                Partner With MerchX
              </CTAButton>
              <CTAButton to="/what-we-do" variant="outline-light" size="lg">
                Explore What We Do
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================================================
          SECTION 2: INTRODUCTION & 3 PILLARS (bg-white)
          ============================================================ */}
      <Section variant="white" py="md">
        <Container>
          <Reveal>
            <SectionHeading
              label="Who We Are"
              title="More Than Merchandise. We're Building an Ecosystem."
              subtitle="MerchX brings together premium apparel development, dedicated digital storefronts, and end-to-end production coordination to empower educational communities."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {pillars.map((pillar, idx) => (
              <Reveal key={pillar.id} delay={idx * 150}>
                <PillarCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 3: ORIGIN STORY (bg-ivory, editorial layout)
          ============================================================ */}
      <Section variant="ivory" py="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Big Pull Quote */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-6 bg-green-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-green-primary">
                    Our Origin
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-charcoal leading-none">
                  Every Institution Has a Legacy. Where Is Its Merchandise Culture?
                </h2>
                <div className="mt-8 p-6 bg-cream border-l-4 border-green-primary">
                  <p className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-charcoal">
                    "Globally, university apparel is a badge of honor. In India, students were left with uninspired print jobs."
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Editorial Narrative Body */}
            <div className="lg:col-span-7 space-y-6 text-charcoal text-base sm:text-lg leading-relaxed">
              <Reveal delay={200}>
                <p>
                  MerchX was founded by students who experienced the gap firsthand. While premier international universities celebrate decades of iconic collegiate merchandise, Indian universities and educational institutions have largely been underserved.
                </p>
                <p className="text-grey">
                  Traditional options forced students and administrators to navigate fragmented vendors, substandard fabrics, lack of design continuity, and complex manual collection processes. There was no single partner capable of handling brand conceptualisation, bespoke manufacturing, and high-performance digital commerce.
                </p>
                <p className="font-medium text-charcoal">
                  MerchX was built to solve this entirely: delivering institution-grade apparel collections paired with dedicated digital storefronts that celebrate student pride.
                </p>
                <div className="pt-2">
                  <CTAButton to="/about" variant="outline-dark" size="sm">
                    Read Our Full Story →
                  </CTAButton>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 4: WHAT WE DO (bg-charcoal, 5 service cards)
          ============================================================ */}
      <Section variant="charcoal" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Our Services"
              title="From Concept to Collection. From Design to Delivery."
              subtitle="A complete turnkey infrastructure providing design, web development, production coordination, and fulfillment."
              light
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.slice(0, 3).map((service, idx) => (
              <Reveal key={service.id} delay={idx * 100}>
                <ServiceCard service={service} variant="dark" />
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {services.slice(3, 5).map((service, idx) => (
              <Reveal key={service.id} delay={(idx + 3) * 100}>
                <ServiceCard service={service} variant="dark" />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <CTAButton to="/what-we-do" variant="outline-light" size="md">
              Explore All Services in Depth
            </CTAButton>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 5: HOW IT WORKS (bg-white, 6 numbered steps)
          ============================================================ */}
      <Section variant="white" py="md">
        <Container>
          <Reveal>
            <SectionHeading
              label="Our Process"
              title="One Ecosystem. Six Steps."
              subtitle="How we collaborate with institutions and communities to bring official apparel collections to life seamlessly."
            />
          </Reveal>

          <div className="mt-12">
            <Timeline steps={steps} />
          </div>

          <div className="mt-12 text-center">
            <CTAButton to="/how-it-works" variant="outline-dark" size="md">
              Learn More About Our Process
            </CTAButton>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 6: PRODUCT UNIVERSE (bg-ivory, display-only showcase)
          ============================================================ */}
      <Section variant="ivory" py="md">
        <Container>
          <Reveal>
            <SectionHeading
              label="Product Showcase"
              title="Designed to Represent. Made to Be Worn."
              subtitle="Explore the core silhouette categories engineered for collegiate comfort, durability, and institutional prestige. (Showcase only — no retail sales on corporate portal)."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {productCategories.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 100}>
                <div className="group relative bg-white border border-beige rounded-xs overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="h-1 w-full bg-green-primary" />
                  <ImagePlaceholder
                    aspectRatio="aspect-[4/3]"
                    caption={product.placeholderCaption}
                  />
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-primary">
                      Category 0{idx + 1}
                    </span>
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-charcoal mt-1 mb-2">
                      {product.label}
                    </h3>
                    <p className="text-sm text-grey leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 7: OUR WORK (bg-charcoal, Jamia initiative)
          ============================================================ */}
      <Section variant="charcoal" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Portfolio"
              title="Where the MerchX Journey Begins."
              subtitle="A look into our inaugural project — engineered from scratch for the university community."
              light
            />
          </Reveal>

          <div className="mt-12 max-w-4xl mx-auto">
            <Reveal>
              <ProjectCard project={jamiaProject} variant="dark" />
            </Reveal>
          </div>

          <div className="mt-12 text-center">
            <CTAButton to="/our-work" variant="outline-light" size="md">
              View All Work & Case Studies
            </CTAButton>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 8: TECHNOLOGY & INNOVATION (bg-white, Three.js 3D Mockup)
          ============================================================ */}
      <Section variant="white" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Technology & Innovation"
              title="Beyond Merchandise. Towards a Digital Fashion Ecosystem."
              subtitle="We are building proprietary 3D customisation technology to empower universities, student leaders, and athletic teams to co-create apparel in real time."
            />
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <ThreeCustomizerMockup />
            </Reveal>
          </div>

          <div className="mt-12 text-center">
            <CTAButton to="/technology" variant="outline-dark" size="md">
              Explore Our Technology Roadmap
            </CTAButton>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 9: VISION & ROADMAP (bg-ivory, 5 phases)
          ============================================================ */}
      <Section variant="ivory" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Strategic Roadmap"
              title="Building the Future of Institutional Merchandise."
              subtitle="Our 5-phase growth strategy to evolve from an initial collegiate launchpad into India's premier university fashion-tech platform."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {roadmapPhases.map((phaseItem, idx) => (
              <Reveal key={phaseItem.phase} delay={idx * 100}>
                <div className="bg-white border border-beige rounded-xs p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-4xl font-black text-green-primary">
                      {phaseItem.phase}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs ${
                        phaseItem.status === 'in-progress'
                          ? 'bg-green-primary text-white'
                          : 'bg-cream text-charcoal'
                      }`}
                    >
                      {phaseItem.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-charcoal mb-2">
                    {phaseItem.title}
                  </h3>

                  <p className="text-xs text-grey leading-relaxed mb-4">
                    {phaseItem.description}
                  </p>

                  <div className="mt-auto pt-3 border-t border-beige/60">
                    <ul className="space-y-1.5">
                      {phaseItem.milestones.slice(0, 2).map((m, mIdx) => (
                        <li key={mIdx} className="text-xs text-charcoal flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-primary rounded-full mt-1.5 shrink-0" />
                          <span className="line-clamp-2">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTAButton to="/vision" variant="outline-dark" size="md">
              Read Our Full Strategic Vision
            </CTAButton>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SECTION 10: FOUNDING TEAM (bg-white, auto-hides if empty)
          ============================================================ */}
      {team && team.length > 0 && (
        <Section variant="white" py="md">
          <Container>
            <Reveal>
              <SectionHeading
                label="Leadership"
                title="Meet the Team Behind MerchX."
                subtitle="Passionate student founders and operators dedicated to building India's collegiate merchandise ecosystem."
              />
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================
          SECTION 11: PARTNER CTA WITH CONTACT FORM (bg-charcoal)
          ============================================================ */}
      <Section variant="charcoal" py="lg" id="partner-section">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-1.5 w-6 bg-green-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-primary">
                  Start A Collaboration
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
                Let's Build Something Your Community Can Wear With Pride.
              </h2>
              <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
                Whether you represent a university administration, student council, athletic department, campus club, or institutional incubator — we would love to connect.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <ContactForm />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

