import React from 'react';
import { Seo } from '@/components/sections/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CTAButton } from '@/components/ui/CTAButton';

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Privacy policy and data handling guidelines for MerchX corporate operations and partnerships."
        url="/privacy"
      />

      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="How MerchX handles institutional, organizational, and personal information."
      />

      <Section variant="white" py="lg">
        <Container className="max-w-4xl mx-auto">
          <div className="prose prose-neutral max-w-none space-y-6 text-charcoal text-base leading-relaxed">
            <p className="font-semibold text-lg">
              Last updated: November 2026
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              1. Information We Collect
            </h2>
            <p className="text-grey">
              When you submit a partnership enquiry through our corporate portal, we collect the details you provide: full name, institutional affiliation, email address, phone number, and enquiry specifics. This data is collected solely for responding to institutional enquiries and coordinating merchandise collaborations.
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              2. How We Use Your Information
            </h2>
            <p className="text-grey">
              We use the submitted information exclusively to evaluate partnership requests, prepare design decks, schedule exploratory calls, and provide customer support. We do not sell, rent, or trade institutional or contact data to third parties.
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              3. Data Security
            </h2>
            <p className="text-grey">
              We employ industry-standard encryption protocols and secure hosting infrastructure to protect all submitted communications from unauthorized access.
            </p>

            <h2 className="font-heading text-2xl font-bold uppercase text-charcoal mt-8">
              4. Contact Us
            </h2>
            <p className="text-grey">
              If you have any questions or concerns regarding our privacy practices, please contact us at our partnerships desk.
            </p>

            <div className="pt-8">
              <CTAButton to="/partner" variant="outline-dark" size="sm">
                Contact Privacy Desk →
              </CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

