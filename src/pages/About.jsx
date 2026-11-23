import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';
import { Reveal } from '@/components/ui/Reveal';
import { PillarCard } from '@/components/sections/PillarCard';
import { TeamCard } from '@/components/sections/TeamCard';
import { team } from '@/data/team';
import { Shield, Sparkles, Award, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <>
      <Seo
        title="About Us — Our Mission & Story"
        description="Learn about MerchX, our origin, and our mission to build a world-class collegiate merchandise and fashion-tech ecosystem for educational institutions."
        url="/about"
      />

      <PageHero
        label="About MerchX"
        title="Reimagining Campus Identity Through Design & Technology."
        subtitle="We are a student-led university merchandise and fashion-tech venture bridging collegiate pride with premium apparel engineering."
        ctaText="Partner With Us"
        ctaTo="/partner"
      />

      {/* Origin Story In Depth */}
      <Section variant="white" py="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  label="Our Foundation"
                  title="Born From Campus Experience."
                  subtitle="How a simple search for quality college apparel evolved into a comprehensive B2B infrastructure."
                />
                <div className="p-6 bg-ivory border-l-4 border-green-primary rounded-xs mt-6">
                  <p className="font-heading text-xl font-bold uppercase text-charcoal">
                    "Every major university in the world has an iconic apparel culture. We asked: why should Indian campuses settle for anything less?"
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6 text-charcoal text-base sm:text-lg leading-relaxed">
              <Reveal delay={150}>
                <p>
                  MerchX started with a fundamental realization: across universities, educational institutions, student unions, and campus societies, there was no dedicated partner who understood both high-standard apparel manufacturing and modern digital commerce.
                </p>
                <p className="text-grey">
                  Existing options fell into two unsatisfactory camps: generic local printing shops offering low-grade fabrics and generic sizing, or expensive custom merchandising agencies with no understanding of student cultures, tight academic schedules, and institutional brand standards.
                </p>
                <p>
                  MerchX was created to be the unified answer. We handle everything — creative identity design, custom collection development, premium fabric manufacturing, dedicated digital storefronts, and on-campus delivery coordination.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Principles */}
      <Section variant="ivory" py="lg">
        <Container>
          <Reveal>
            <SectionHeading
              label="Core Values"
              title="The Principles That Guide MerchX."
              subtitle="Everything we engineer is built around institutional dignity, student ownership, and lasting product quality."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Reveal delay={100}>
              <div className="bg-white p-8 border border-beige rounded-xs h-full flex flex-col">
                <div className="w-12 h-12 bg-green-primary/10 text-green-primary flex items-center justify-center rounded-xs mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-charcoal mb-3">
                  Uncompromising Quality
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  We use heavyweight combed cottons, pre-shrunk fleece (350+ GSM), durable color dyes, and high-density embroidery so every garment lasts long after graduation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white p-8 border border-beige rounded-xs h-full flex flex-col">
                <div className="w-12 h-12 bg-green-primary/10 text-green-primary flex items-center justify-center rounded-xs mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-charcoal mb-3">
                  Community-First Design
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  We don't slap logos onto generic blanks. We collaborate with student leaders, societies, and campus creatives to build apparel that resonates with genuine community pride.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white p-8 border border-beige rounded-xs h-full flex flex-col">
                <div className="w-12 h-12 bg-green-primary/10 text-green-primary flex items-center justify-center rounded-xs mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-charcoal mb-3">
                  End-to-End Reliability
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  From initial sizing trials to secure digital payments and organized batch dispatches, we remove every administrative burden from campus organizers.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Team Section (if populated) */}
      {team && team.length > 0 && (
        <Section variant="white" py="lg">
          <Container>
            <Reveal>
              <SectionHeading
                label="Leadership"
                title="Meet The Team"
                subtitle="The minds driving the MerchX mission."
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

      {/* Bottom CTA Banner */}
      <Section variant="charcoal" py="md">
        <Container className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Ready to Build Your Campus Apparel Culture?
            </h2>
            <p className="mt-4 text-neutral-300 text-base sm:text-lg">
              Talk to our team about creating a dedicated merchandise drop for your university or community.
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

