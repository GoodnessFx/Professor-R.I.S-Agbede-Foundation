/**
 * Application constants and data
 */

import type { Program, NewsArticle, Testimonial, Trustee, GalleryImage } from './types';

// New navigation structure with dropdowns
export const NAV_LINKS = [
  {
    label: 'WHO WE ARE',
    dropdown: [
      { label: 'About the Foundation', path: '/about' },
      { label: 'Our Founder', path: '/about#founder' },
      { label: 'Board of Trustees', path: '/about#board' },
      { label: 'Our Vision & Values', path: '/about#values' },
      { label: 'Annual Reports', path: '/impact#reports' },
    ]
  },
  {
    label: 'PROGRAMMES',
    dropdown: [
      { label: 'Scholarship Programme', path: '/programs#scholarship' },
      { label: 'Healthcare Initiative', path: '/programs#healthcare' },
      { label: 'Community Development', path: '/programs#community' },
      { label: 'Digital Literacy', path: '/programs#digital' },
      { label: 'Apply for Support', path: '/donate' },
    ]
  },
  {
    label: 'GRANTMAKING',
    dropdown: [
      { label: 'Annual Grants', path: '/grantmaking#annual-grants' },
      { label: 'Discretionary Grants', path: '/grantmaking#discretionary' },
      { label: 'Partnerships', path: '/grantmaking#partnerships' },
    ]
  },
  { label: 'IMPACT', path: '/impact' },
  {
    label: 'NEWS & MEDIA',
    dropdown: [
      { label: 'Latest News', path: '/news' },
      { label: 'Press Releases', path: '/news#press' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Publications', path: '/impact#reports' },
    ]
  },
  { label: 'CONTACT US', path: '/contact' },
];

export const IMPACT_STATS = [
  { label: 'Students Supported', value: 8, suffix: '+' },
  { label: 'Communities Reached', value: 2, suffix: '' },
  { label: 'Years of Impact', value: 0, suffix: '' },
  { label: 'Funds Disbursed', value: 250, prefix: '₦', suffix: 'K+' },
];

export const PROGRAMS: Program[] = [
  {
    id: 'scholarship',
    title: 'Scholarship Program',
    icon: 'GraduationCap',
    description: 'Providing merit and need-based scholarships to exceptional students from low-income families across Nigeria\'s six geopolitical zones.',
    stats: '1,200 Beneficiaries',
    status: 'Active',
    subPrograms: [
      'University Scholarships',
      'Secondary School Grants',
      'Vocational Training Grants'
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare Access Initiative',
    icon: 'Heart',
    description: 'Partnering with public hospitals and community health workers to provide free medical care, immunization drives, and maternal health support.',
    stats: '800+ Patients Served',
    status: 'Active',
    subPrograms: [
      'Free Medical Outreach',
      'Maternal Health Support',
      'Mental Health Awareness'
    ]
  },
  {
    id: 'community',
    title: 'Community Development',
    icon: 'Building2',
    description: 'Building infrastructure for dignity — boreholes, school renovations, electrification projects, and agricultural empowerment programs.',
    stats: '18 Communities',
    status: 'Ongoing',
    subPrograms: [
      'Clean Water Projects',
      'School Renovation',
      'SME Support for Women'
    ]
  },
  {
    id: 'digital',
    title: 'Digital Literacy',
    icon: 'Laptop',
    description: 'Equipping young Nigerians with 21st-century digital skills through coding bootcamps, tech workshops, and computer lab grants.',
    stats: '400+ Students',
    status: 'Pilot Phase',
    subPrograms: [
      'Coding Bootcamps',
      'Computer Lab Grants',
      'Digital Skills for Women'
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    slug: 'new-scholars-2024-cohort',
    title: '150 New Scholars Awarded University Scholarships for 2024 Academic Year',
    category: 'Education',
    date: 'January 15, 2024',
    excerpt: 'The Foundation announced its largest scholarship cohort yet, supporting 150 brilliant students across 12 Nigerian universities. Recipients were selected from over 3,000 applications based on academic excellence and financial need.',
    author: 'Communications Team',
    image: 'https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    pullQuote: 'A scholarship is a belief statement — your dreams matter and deserve a next chapter.',
    content: [
      'From Kano to Calabar, from Surulere to Suleja, our 2024 scholarship cohort brings together brilliant minds united by courage and grit. Many are first‑generation university students; all are proof that where you start should never limit where you can go.',
      'Scholars were selected through a transparent process that prioritised academic performance, character, and financial need. We also matched students with mentors across medicine, law, engineering, education, and the creative industries to support their journey beyond the classroom.',
      'With this cohort, we renew our promise: to stand beside young Nigerians as they build lives of purpose, service, and impact.'
    ]
  },
  {
    id: '2',
    slug: 'kogi-medical-outreach-500-patients',
    title: 'Free Medical Camp Serves 500 Patients in Kogi Community',
    category: 'Health',
    date: 'December 10, 2023',
    excerpt: 'Our healthcare team conducted a three-day medical outreach in rural Kogi State, providing free consultations, medications, and health screenings. The initiative focused on maternal and child health.',
    author: 'Dr. Amaka Okafor',
    image: 'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Healthcare should never be defined by distance or income.',
    content: [
      'Working with local health workers and the community leadership, we served over 500 residents with consultations, basic laboratory tests, and essential medications.',
      'The outreach prioritised maternal and child health: prenatal checks, vaccinations, malnutrition screening, and education on hygiene and disease prevention.',
      'We are grateful to our volunteer doctors and nurses who gave their weekends to bring care closer to families.'
    ]
  },
  {
    id: '3',
    slug: 'digital-literacy-lagos-bootcamp',
    title: 'Digital Literacy Program Launches in Lagos with 80 Young Women',
    category: 'Community',
    date: 'November 22, 2023',
    excerpt: 'A groundbreaking 12-week tech bootcamp kicked off in Surulere, training young women in web development, digital marketing, and entrepreneurship skills to bridge the digital gender gap.',
    author: 'Mrs. Ngozi Eze',
    image: 'https://images.pexels.com/photos/5905569/pexels-photo-5905569.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'When women learn tech, communities leap forward.',
    content: [
      'The 12‑week curriculum blends practical skills with mentorship — from HTML/CSS and JavaScript basics to no‑code tools, digital marketing, and pitching.',
      'Participants receive data stipends and childcare support, removing barriers that often exclude women from tech training.',
      'Graduates will be connected to internships and freelance opportunities through our partner network.'
    ]
  },
  {
    id: '4',
    slug: 'clean-water-enugu-borehole',
    title: 'Clean Water Borehole Commissioned in Enugu Rural Community',
    category: 'Community',
    date: 'October 8, 2023',
    excerpt: 'Over 2,000 residents now have access to clean drinking water following the completion of a solar-powered borehole project. The initiative is part of our commitment to sustainable community infrastructure.',
    author: 'Engr. Babatunde Oyelaran',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Water changes everything — health, dignity, and time reclaimed for learning.',
    content: [
      'Powered by rooftop solar, the borehole system feeds a storage tank and taps positioned around the village centre, reducing the long treks women and children previously made for water.',
      'A local water committee now oversees maintenance and usage schedules, ensuring sustainability and community ownership.',
      'This project was co‑funded with local partners and implemented by engineers from the community.'
    ]
  },
  {
    id: '5',
    slug: 'beneficiary-summit-abuja-200-attend',
    title: 'Annual Beneficiary Summit Brings Together 200 Scholars',
    category: 'Events',
    date: 'September 12, 2023',
    excerpt: 'Current and past scholarship recipients gathered in Abuja for mentorship sessions, career workshops, and networking. The event celebrated the achievements of alumni now working in medicine, law, engineering, and public service.',
    author: 'Prof. Chukwuemeka Nwosu',
    image: 'https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Mentorship transforms gifts into trajectories.',
    content: [
      'The summit featured panels with alumni now serving as doctors, lawyers, civil servants, and entrepreneurs. Sessions focused on ethics, service, and vocational resilience.',
      'Breakout rooms connected students with mentors in their fields, leading to internship matches and research collaborations.',
      'We closed with an alumni pledge to “lift as we climb.”'
    ]
  },
  {
    id: '6',
    slug: 'unicef-partnership-school-feeding',
    title: 'Partnership with UNICEF to Expand School Feeding Program',
    category: 'Education',
    date: 'August 5, 2023',
    excerpt: 'The Foundation signed a landmark partnership with UNICEF to provide nutritious meals to 1,500 primary school children across three northern states, ensuring no child learns on an empty stomach.',
    author: 'Communications Team',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'A child who eats can learn, dream, and thrive.',
    content: [
      'Meals are sourced locally to support smallholder farmers and ensure cultural relevance. Parent‑teacher associations help track attendance and nutrition outcomes.',
      'The partnership will double coverage in the next phase and include deworming and micronutrient supplementation.',
      'We thank community volunteers who cook, serve, and keep children smiling.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Chiamaka Okonkwo',
    location: 'Lagos',
    program: 'Scholarship Program',
    quote: 'The Foundation\'s scholarship changed my life. I graduated top of my class in Computer Science and now work as a software engineer. Without their support, university would have remained a dream for my family.',
    avatar: 'https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Emeka Adebayo',
    location: 'Kano',
    program: 'Healthcare Initiative',
    quote: 'When my mother fell ill, we had nowhere to turn. The Foundation\'s medical outreach program provided the surgery and medications she needed. Today, she\'s healthy and back to caring for our community.',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Fatima Yusuf',
    location: 'Kogi',
    program: 'Digital Literacy',
    quote: 'The coding bootcamp gave me skills I never imagined having. Six months after graduation, I launched my own digital marketing agency. I\'m now training other young women in my community.',
    avatar: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400',
  }
];

export const TRUSTEES: Trustee[] = [
  {
    id: '1',
    name: 'Mr Zachery Agbede',
    title: 'Board Chairman',
  },
  {
    id: '2',
    name: 'Mrs. Ngozi Eze',
    title: 'Programs Director',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'African children in classroom hands raised, eager to learn',
    category: 'Education'
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'African community health worker with mother, providing care',
    category: 'Healthcare'
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/5905569/pexels-photo-5905569.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Young African woman learning digital skills on laptop',
    category: 'Community'
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'African community members working together on development project',
    category: 'Community'
  },
  {
    id: '5',
    src: 'https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Group of African children engaged in educational activity',
    category: 'Education'
  },
  {
    id: '6',
    src: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Young African girl reading with deep focus, immersed in learning',
    category: 'Education'
  },
  {
    id: '7',
    src: '/images/laughing-children.jpg',
    caption: 'Group of joyful laughing Black children, colorful and vibrant energy',
    category: 'Education'
  },
  {
    id: '8',
    src: '/images/baby-girl-smile.jpg',
    caption: 'Black and white close-up of a beautiful African baby girl smiling, hands cradling her face',
    category: 'Community'
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/laughing-children.jpg',
    alt: 'Group of joyful laughing Black children, colorful and vibrant energy',
    title: 'Because Every Child Deserves a Fighting Chance',
    subtitle: 'In classrooms without roofs, in communities without doctors, in families without hope — the Professor R.I.S Agbede Foundation shows up. We believe potential is never scarce. Only opportunity is.'
  },
  {
    id: 2,
    image: '/images/baby-girl-smile.jpg',
    alt: 'Black and white close-up of a beautiful African baby girl smiling, hands cradling her face, deeply emotional and intimate',
    title: 'Education Opens Doors',
    subtitle: 'Every scholarship we award is not just financial aid — it\'s a belief statement. We\'re saying: "Your dreams matter. Your story deserves a next chapter."'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Nigerian schoolgirls studying together, focused and determined',
    title: 'From Hope to Achievement',
    subtitle: 'When a student from a forgotten village graduates with honors, it\'s not luck. It\'s what happens when someone refuses to let talent go to waste.'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'African children in classroom hands raised, eager to learn',
    title: 'Healthcare for the Underserved',
    subtitle: 'In communities where the nearest clinic is 40 kilometers away, we bring medical care directly to people. Because geography should never determine if you live or die.'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'African community health worker with mother, providing care',
    title: 'Building Literate Communities',
    subtitle: 'We don\'t just teach children to read. We create environments where books are treasures and knowledge is power — transforming entire communities, one story at a time.'
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Young African girl reading with deep focus, immersed in learning',
    title: 'Joy in Every Opportunity',
    subtitle: 'This is what success looks like: children who run towards school, not away from it. Communities where hope isn\'t a luxury — it\'s a daily reality.'
  }
];

export const VALUES = [
  'Integrity',
  'Excellence',
  'Compassion',
  'Sustainability',
  'Innovation',
  'Community'
];

export const CONTACT_INFO = {
  headOffice: {
    name: 'Head Office',
    address: '14 Unity Boulevard, Wuse Zone 5',
    city: 'Abuja, FCT 900288, Nigeria'
  },
  lagosOffice: {
    name: 'Lagos Office',
    address: 'Block C, 22 Adeniran Ogunsanya Street',
    city: 'Surulere, Lagos 23401, Nigeria'
  },
  phone: '+234 809 123 4567',
  email: 'info@agbedefoundation.org',
  website: 'www.agbedefoundation.org',
  hours: 'Monday – Friday: 8:00am – 5:00pm (WAT)'
};

export const BANK_DETAILS = {
  bank: 'First Bank of Nigeria',
  accountName: 'Prof. R.I.S Agbede Foundation',
  accountNumber: '3012345678',
  sortCode: '011-151-555'
};

export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com/AgbedeFoundation', icon: 'Facebook' },
  { name: 'Twitter', url: 'https://twitter.com/AgbedeFoundation', icon: 'Twitter' },
  { name: 'Instagram', url: 'https://instagram.com/AgbedeFoundation', icon: 'Instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/agbede-foundation', icon: 'Linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/@AgbedeFoundation', icon: 'Youtube' },
];
