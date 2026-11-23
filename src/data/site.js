// ============================================================
// SITE CONFIGURATION
// ============================================================
// TODO: founder to fill — replace every TODO value before launch

export const siteConfig = {
  name: 'MerchX',
  tagline: 'Wear Your Identity.',
  description:
    'MerchX builds complete merchandise ecosystems for universities, institutions and communities — from the first design concept to the final delivery.',
  url: 'https://TODO_YOUR_DOMAIN.com', // TODO: update with live domain
  storeUrl: 'https://merch-x-jmi.vercel.app/', // Live JMI Storefront
  email: 'contact@TODO_DOMAIN.com',    // TODO: replace with real email
  phone: '+91 00000 00000',            // TODO: replace with real phone
  address: 'New Delhi, India',         // TODO: confirm address
  socials: {
    instagram: null, // TODO: 'https://instagram.com/YOUR_HANDLE'
    linkedin:  null, // TODO: 'https://linkedin.com/company/YOUR_HANDLE'
  },
}

// Primary navigation links (order matters)
export const navLinks = [
  { label: 'About',        href: '/about'        },
  { label: 'What We Do',   href: '/what-we-do'   },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Our Work',     href: '/our-work'     },
  { label: 'Technology',   href: '/technology'   },
  { label: 'Vision',       href: '/vision'       },
]

// Footer columns
export const footerLinks = {
  company: [
    { label: 'About Us',      href: '/about'        },
    { label: 'What We Do',    href: '/what-we-do'   },
    { label: 'How It Works',  href: '/how-it-works' },
    { label: 'Our Work',      href: '/our-work'     },
    { label: 'Technology',    href: '/technology'   },
    { label: 'Our Vision',    href: '/vision'       },
  ],
  work: [
    { label: 'JMI Storefront (Live)', href: 'https://merch-x-jmi.vercel.app/', external: true },
    { label: 'Partner With MerchX', href: '/partner'  },
    { label: 'Privacy Policy',      href: '/privacy'  },
    { label: 'Terms & Conditions',  href: '/terms'    },
  ],
}
