import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/site';

export function Seo({
  title,
  description,
  url,
  image,
  type = 'website',
  schema
}) {
  const metaTitle = title
    ? `${title} | ${siteConfig.name} — ${siteConfig.tagline}`
    : `${siteConfig.name} — University Merchandise & Fashion-Tech Ecosystem`;
  const metaDescription = description || siteConfig.description;
  const canonicalUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const ogImage = image || `${siteConfig.url}/og-image.jpg`;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

