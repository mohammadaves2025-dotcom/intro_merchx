import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CTAButton } from '@/components/ui/CTAButton';

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms and conditions governing institutional partnerships and usage of the MerchX corporate platform."
        url="/terms"
      />

      <PageHero
        label="Legal"
        title="Terms of Service"
        subtitle="Terms and conditions governing the use of the MerchX corporate website and institutional partnership engagements."
      />

      <Section variant="white" py="lg">
        <Container className="max-w-4xl mx-auto">
          <div className="prose prose-neutral max-w-none space-y-6 text-charcoal text-base leading-relaxed">
            <p className="font-semibold text-lg">
              Last updated: November 2026
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              1. Corporate Platform Scope
            </h2>
            <p className="text-grey">
              This corporate website provides informational resources, concept demonstrations, and partnership channels for MerchX. It does not conduct consumer retail transactions, sales, or checkout operations. Individual university storefronts operate under distinct terms and privacy frameworks.
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              2. Intellectual Property & Concept Previews
            </h2>
            <p className="text-grey">
              All branding, proprietary 3D simulation interfaces, customizer prototypes, and content hosted on this website are the property of MerchX. Concept previews (including 3D mockups) are illustrative prototypes indicating technology direction and do not represent final software warranties.
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              3. Institutional Disclaimers
            </h2>
            <p className="text-grey">
              MerchX is an independent venture. Any collegiate project showcase, pilot initiative, or institutional mention (such as initiatives for the Jamia community) is conducted independently and does not constitute official university endorsement unless explicitly stated under formal partnership agreements.
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              4. Governing Law
            </h2>
            <p className="text-grey">
              These terms are governed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of New Delhi.
            </p>

            <div className="pt-8">
              <CTAButton to="/partner" variant="outline-dark" size="sm">
                Enquire Regarding Terms →
              </CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

