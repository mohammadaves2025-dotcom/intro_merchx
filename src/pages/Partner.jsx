import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/sections/ContactForm';
import { siteConfig } from '@/data/site';
import { Mail, Phone, MapPin, Building, Users, Trophy } from 'lucide-react';

const partnerTypes = [
  {
    icon: Building,
    title: 'Universities & Colleges',
    desc: 'Launch official institution-wide merchandise collections and digital stores with zero inventory risk.'
  },
  {
    icon: Users,
    title: 'Student Councils & Societies',
    desc: 'Bespoke apparel for department fests, academic societies, batch farewells, and campus clubs.'
  },
  {
    icon: Trophy,
    title: 'Athletic Teams & Sports Clubs',
    desc: 'High-performance team kits, jerseys, varsity hoodies, and travel wear engineered for athletes.'
  }
];

export default function Partner() {
  return (
    <>
      <Seo
        title="Partner With MerchX — Institutional Enquiries & Collaborations"
        description="Partner with MerchX to create official merchandise ecosystems for your university, college, student union, club, or sports team."
        url="/partner"
      />

      <PageHero
        label="Partner With MerchX"
        title="Let's Build Something Your Community Can Wear With Pride."
        subtitle="Whether you represent a university administration, student council, athletic team, or corporate incubator, we would love to start a conversation."
      />

      {/* Main Partnership Section with Form */}
      <Section variant="white" py="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Who We Work With & Info */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <SectionHeading
                  label="Collaboration Models"
                  title="Who We Partner With"
                  subtitle="Flexible engagement models tailored to institutional requirements."
                />

                <div className="space-y-4 mt-6">
                  {partnerTypes.map((item, idx) => {
                    const IconC = item.icon;
                    return (
                      <div key={idx} className="p-5 bg-ivory border border-beige rounded-xs flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-primary/10 text-green-primary flex items-center justify-center rounded-xs shrink-0">
                          <IconC className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold uppercase text-charcoal">
                            {item.title}
                          </h4>
                          <p className="text-xs text-grey mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-beige">
                  <h4 className="font-heading text-lg font-bold uppercase text-charcoal mb-3">
                    Direct Contact
                  </h4>
                  <ul className="space-y-2 text-sm text-grey">
                    <li className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-primary" />
                      <span>{siteConfig.email}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-primary" />
                      <span>{siteConfig.phone}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-primary" />
                      <span>{siteConfig.address}</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

