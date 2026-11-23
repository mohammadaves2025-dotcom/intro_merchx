// ============================================================
// PROJECTS — Our Work portfolio
// Add new university projects here as data-only entries.
// Images from src/assets/placeholder/ (copied from MerchX storefront)
// ============================================================
import jamiaImg1 from '@/assets/placeholder/jamia-hoodies.jpg'
import jamiaImg2 from '@/assets/placeholder/jamia-hoodies-2.jpg'
import hoodieCreamImg from '@/assets/products/hoodie-cream.jpg'
import hoodieBlackImg from '@/assets/products/hoodie-black.jpg'

export const projects = [
  {
    id: 'jamia',
    client: 'Jamia Millia Islamia',
    title: 'Jamia Essential Collection',
    category: 'University Merchandise',
    description:
      'Our inaugural project — developing a complete merchandise ecosystem for the Jamia Millia Islamia community. From premium apparel collections to a dedicated digital storefront, this project demonstrates our end-to-end capabilities in design, production and digital commerce.',
    disclaimer:
      'An independent MerchX initiative for the Jamia community.',
    tags: ['University', 'Apparel', 'E-Commerce', 'Digital Storefront'],
    images: [jamiaImg1, jamiaImg2, hoodieCreamImg, hoodieBlackImg],
    placeholderCaption: 'Project photo: Jamia MerchX collection',
    link: 'https://merch-x-jmi.vercel.app/',
  },
  // Add future university projects here:
  // {
  //   id: 'university-2',
  //   client: 'TODO: University Name',
  //   title: 'TODO: Collection Title',
  //   category: 'TODO: Category',
  //   description: 'TODO: Description.',
  //   disclaimer: '',
  //   tags: [],
  //   images: [],
  //   placeholderCaption: 'TODO: Caption',
  //   link: null,
  // },
]

