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
      { label: 'Kidney Replacement Therapy', path: '/programs#replacement' },
      { label: 'Kidney Disease Awareness', path: '/programs#awareness' },
      { label: 'Patient Support Programs', path: '/programs#patient-support' },
      { label: 'Laboratory Investigation Support', path: '/programs#laboratory' },
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
  { label: 'Patients Supported', value: 10, suffix: '+' },
  { label: 'Communities Reached', value: 3, suffix: '' },
  { label: 'Awareness Campaigns Run', value: 5, suffix: '' },
  { label: 'Lives Touched', value: 50, suffix: '+' },
];

export const PROGRAMS: Program[] = [
  {
    id: 'replacement',
    title: 'Kidney Replacement Therapy',
    icon: 'HeartPulse',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Supporting indigent patients with end-stage kidney disease to access life-saving kidney replacement therapy they could never afford alone.',
    stats: '500+ Patients Supported',
    status: 'Active',
    subPrograms: [
      'Dialysis Support',
      'Transplant Assistance',
      'Post-Transplant Medication'
    ]
  },
  {
    id: 'awareness',
    title: 'Kidney Disease Awareness',
    icon: 'Megaphone',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Community outreach, early detection drives, and education campaigns to reduce the burden of kidney disease across Nigeria.',
    stats: '50k+ People Reached',
    status: 'Active',
    subPrograms: [
      'Early Detection Screening',
      'Community Education',
      'Healthcare Provider Training'
    ]
  },
  {
    id: 'patient-support',
    title: 'Patient Support Programs',
    icon: 'Users',
    image: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Establishing patient support programs including counseling, education, emotional support, nutrition, and social welfare assistance to patients and caregivers.',
    stats: '1,200 Families Assisted',
    status: 'Ongoing',
    subPrograms: [
      'Counseling Services',
      'Nutritional Guidance',
      'Social Welfare Assistance'
    ]
  },
  {
    id: 'laboratory',
    title: 'Laboratory Investigation Support',
    icon: 'FlaskConical',
    image: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Providing financial assistance for laboratory investigations and related medical services for indigent end stage kidney disease patients.',
    stats: '2,000+ Tests Funded',
    status: 'Active',
    subPrograms: [
      'Diagnostic Test Support',
      'Medical Imaging Grants',
      'Regular Monitoring Assistance'
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    slug: 'kidney-replacement-therapy-lagos',
    title: 'Foundation Sponsors First Kidney Replacement Therapy for 10 Indigent Patients in Lagos',
    category: 'Health',
    date: 'March 2026',
    excerpt: 'The Professor R.I.S Agbede Foundation has successfully facilitated kidney replacement therapy for 10 patients who had no means to access this life-saving treatment.',
    author: 'Medical Team',
    image: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    pullQuote: 'Restoring health is restoring hope. Every patient deserves a chance at life regardless of their financial status.',
    content: [
      'In a landmark initiative, the Professor R.I.S Agbede Foundation has provided full financial and medical support for kidney replacement therapy to ten indigent patients in Lagos. This intervention comes at a critical time when many Nigerians are struggling with the high costs of specialized medical care.',
      'The beneficiaries were selected through a rigorous social welfare screening process to ensure that the support reached those in most desperate need. Each patient received comprehensive care, including dialysis sessions and necessary pre-operative investigations.',
      'Our foundation worked closely with top-tier medical facilities in Lagos to ensure the highest standards of care. This program is part of our broader commitment to ensuring that end-stage kidney disease is not a death sentence for those without financial means.',
      'One of the beneficiaries, a father of three, expressed his gratitude, stating that this support has given him a second chance to be there for his family. Such stories drive our mission to expand this program to more states across Nigeria.',
      'We continue to seek partnerships with healthcare providers and donors to scale this impact. Together, we can ensure that more Nigerians have access to the life-saving treatments they need to thrive.'
    ]
  },
  {
    id: '2',
    slug: 'awareness-campaign-3-communities',
    title: 'Kidney Disease Awareness Campaign Reaches 3 Communities Across Nigeria',
    category: 'Community',
    date: 'February 2026',
    excerpt: 'Our mobile awareness team visited Lokoja, Surulere, and Enugu conducting free screenings and educating over 500 residents on early kidney disease detection.',
    author: 'Outreach Coordinator',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Knowledge is the first line of defense against chronic kidney disease.',
    content: [
      'The Professor R.I.S Agbede Foundation recently concluded a multi-state awareness campaign aimed at educating the public on kidney health. The mobile team visited communities in Lokoja, Surulere, and Enugu, bringing vital health information to the grassroots.',
      'During the campaign, over 500 residents received free blood pressure and glucose screenings, which are essential for identifying early warning signs of kidney issues. Many participants were unaware of the link between hypertension and kidney failure.',
      'Our health educators provided practical advice on nutrition, hydration, and the importance of regular check-ups. We also distributed educational materials in local languages to ensure the message was clearly understood by everyone in the community.',
      'The response from the communities was overwhelming, with many leaders calling for more frequent visits. Early detection is key to preventing end-stage kidney disease, and our foundation is dedicated to making these screenings accessible to all.',
      'We are planning to expand this outreach to ten more communities by the end of the year. By catching kidney issues early, we can save lives and reduce the burden of disease across the nation.'
    ]
  },
  {
    id: '3',
    slug: 'parasitology-prize-2026',
    title: 'Excellence in Parasitology Prize Awarded to Outstanding Nigerian Researcher',
    category: 'Research',
    date: 'January 2026',
    excerpt: 'The Foundation awarded its inaugural prize for excellence in parasitology research to Dr. Amina Yusuf of the University of Lagos for her groundbreaking work on kidney-related parasitic infections.',
    author: 'Research Committee',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Scientific research is the engine of progress in modern medicine.',
    content: [
      'In line with our commitment to supporting medical excellence, the Professor R.I.S Agbede Foundation has awarded the 2026 Prize for Excellence in Parasitology to Dr. Amina Yusuf. Her research at the University of Lagos has provided new insights into how parasitic infections contribute to chronic kidney disease in tropical regions.',
      'The award ceremony, held in Lagos, brought together leading researchers and healthcare professionals. Dr. Yusuf’s work highlights the need for integrated approaches to treating infections that often go unnoticed until they cause significant organ damage.',
      'The prize includes a research grant that will allow Dr. Yusuf to continue her investigations and train younger researchers in the field. This initiative is part of our foundation\'s goal to build local capacity for medical research in Nigeria.',
      'Professor Agbede, during his keynote address, emphasized that supporting home-grown research is essential for developing treatments that are effective for our unique health challenges. We believe that Dr. Yusuf’s findings will have a lasting impact on how kidney health is managed in the country.',
      'We invite researchers across Nigeria to apply for future grants as we continue to promote excellence in parasitology and related medical fields. Our foundation remains a steadfast partner in the pursuit of scientific knowledge.'
    ]
  },
  {
    id: '4',
    slug: 'patient-support-abuja-launch',
    title: 'Patient Counseling and Support Program Launches in Abuja',
    category: 'Health',
    date: 'December 2025',
    excerpt: 'Our new patient support program now offers counseling, nutritional guidance, and social welfare assistance to kidney disease patients and their families at no cost.',
    author: 'Program Director',
    image: 'https://images.pexels.com/photos/5407208/pexels-photo-5407208.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Treating the patient means more than just medical procedures; it means caring for the whole person.',
    content: [
      'The Professor R.I.S Agbede Foundation is proud to announce the launch of its comprehensive Patient Counseling and Support Program in Abuja. This initiative is designed to provide holistic care to individuals navigating the challenges of kidney disease.',
      'Patients and their families now have access to professional counseling sessions to help them manage the emotional and psychological toll of chronic illness. Additionally, our staff nutritionists provide tailored dietary plans that are essential for maintaining kidney function.',
      'The program also includes a social welfare component, assisting indigent patients with the logistics of their treatment and connecting them with community resources. We understand that the burden of kidney disease extends far beyond the hospital ward.',
      'During the launch event, several patients shared their stories, highlighting the need for a support system that understands their unique needs. Our foundation is committed to being that support system for every patient in our care.',
      'We plan to replicate this model in other major cities across Nigeria to ensure that every kidney patient has access to the compassionate care and guidance they deserve.'
    ]
  },
  {
    id: '5',
    slug: 'luth-partnership-early-detection',
    title: 'Foundation Partners With Lagos University Teaching Hospital on Early Detection Drive',
    category: 'Community',
    date: 'November 2025',
    excerpt: 'A landmark partnership with LUTH brings free laboratory investigations and kidney screenings to indigent patients across Lagos State.',
    author: 'Partnerships Manager',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Collaboration is key to overcoming the healthcare challenges facing our nation.',
    content: [
      'The Professor R.I.S Agbede Foundation has entered into a strategic partnership with the Lagos University Teaching Hospital (LUTH) to enhance early detection of kidney disease. This collaboration focuses on providing free laboratory investigations for indigent patients who would otherwise be unable to afford these critical tests.',
      'Through this initiative, we are setting up screening points within the hospital and in surrounding underserved areas. Patients will have access to serum creatinine tests, urinalysis, and ultrasound scans to assess their kidney health.',
      'Medical professionals from both the foundation and LUTH are working together to provide immediate consultation for those found to have early signs of kidney damage. This proactive approach is designed to stop the disease in its tracks before it reaches advanced stages.',
      'The Chief Medical Director of LUTH praised the foundation for its commitment to the health of the indigent, noting that such partnerships are vital for improving healthcare outcomes in Lagos State.',
      'We are excited about the potential of this partnership to serve as a blueprint for similar collaborations with teaching hospitals across the country. Together, we are building a stronger, healthier Nigeria.'
    ]
  },
  {
    id: '6',
    slug: 'capacity-building-workshop-2025',
    title: 'Capacity Building Workshop Trains 40 Healthcare Workers on Kidney Disease Management',
    category: 'Education',
    date: 'October 2025',
    excerpt: 'Forty frontline health workers across three states completed the Foundation\'s intensive training on kidney disease prevention, detection, and patient care protocols.',
    author: 'Education Lead',
    image: 'https://images.pexels.com/photos/7088856/pexels-photo-7088856.jpeg?auto=compress&cs=tinysrgb&w=800',
    pullQuote: 'Empowering healthcare workers is empowering the entire healthcare system.',
    content: [
      'The Professor R.I.S Agbede Foundation recently hosted an intensive capacity-building workshop for frontline healthcare workers. Forty participants from various primary health centers across three states attended the three-day training session focused on kidney disease management.',
      'The workshop covered the latest protocols for preventing kidney disease, early detection techniques, and best practices for patient care. Experts in nephrology and public health led the sessions, providing practical insights that the workers can apply in their daily routines.',
      'Participants engaged in hands-on training with diagnostic tools and participated in case study discussions to improve their decision-making skills. The goal is to ensure that healthcare providers at the grassroots level are well-equipped to identify and manage kidney issues effectively.',
      'By the end of the workshop, the health workers expressed increased confidence in their ability to serve their communities. We believe that by investing in the skills of our medical workforce, we are making a long-term impact on the health of the nation.',
      'Our foundation plans to continue these training programs, with the next workshop scheduled for the northern region. We are committed to fostering a culture of continuous learning and excellence in the Nigerian healthcare sector.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mr. Ibrahim Bello',
    location: 'Abuja',
    program: 'Kidney Replacement Therapy',
    quote: 'The Foundation literally saved my life. When I was diagnosed with end-stage kidney disease, I lost all hope because I couldn\'t afford dialysis. Today, thanks to their support, I am receiving regular treatment and can still be there for my children.',
    avatar: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Mrs. Oluchi Nwosu',
    location: 'Lagos',
    program: 'Laboratory Investigation Support',
    quote: 'Getting the right tests done was our biggest hurdle. The Foundation covered all my laboratory investigations, allowing my doctors to start the right treatment plan early. I am forever grateful.',
    avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Patient Testimonial',
    location: 'Kano',
    program: 'Patient Support Programs',
    quote: 'The counseling and nutritional support I received helped me manage my condition better and improved my quality of life significantly.',
    avatar: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400',
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
  { id: '1', src: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Kidney health screening outreach', category: 'Healthcare' },
  { id: '2', src: 'https://images.pexels.com/photos/5407238/pexels-photo-5407238.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Medical consultation for indigent patients', category: 'Healthcare' },
  { id: '3', src: 'https://images.pexels.com/photos/4173247/pexels-photo-4173247.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Dialysis support center', category: 'Healthcare' },
  { id: '4', src: 'https://images.pexels.com/photos/5452255/pexels-photo-5452255.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Laboratory investigation services', category: 'Healthcare' },
  { id: '5', src: 'https://images.pexels.com/photos/7088848/pexels-photo-7088848.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Patient counseling session', category: 'Healthcare' },
  { id: '6', src: 'https://images.pexels.com/photos/4225921/pexels-photo-4225921.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Community awareness drive', category: 'Healthcare' },
  { id: '7', src: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Healthcare worker training', category: 'Healthcare' },
  { id: '8', src: 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Grantmaking committee meeting', category: 'Operations' },
  { id: '9', src: 'https://images.pexels.com/photos/5452204/pexels-photo-5452204.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Foundation head office activities', category: 'Operations' },
  { id: '10', src: 'https://images.pexels.com/photos/7579835/pexels-photo-7579835.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Stakeholder engagement session', category: 'Operations' },
  { id: '11', src: 'https://images.pexels.com/photos/4270365/pexels-photo-4270365.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Medical supplies distribution', category: 'Healthcare' },
  { id: '12', src: 'https://images.pexels.com/photos/5490280/pexels-photo-5490280.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Patient success story interview', category: 'Healthcare' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'African doctor with patient',
    title: 'When Kidneys Fail, We Show Up',
    subtitle: 'Thousands of Nigerians with end-stage kidney disease cannot afford the care that would save their lives. The Professor R.I.S Agbede Foundation exists to change that — through replacement therapy support, awareness, and compassionate patient care.'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Black medical professional in hospital',
    title: 'Fighting Kidney Disease Across Nigeria',
    subtitle: 'One patient at a time, we are bridging the gap in kidney healthcare access for the indigent through direct support and community awareness.'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/4270371/pexels-photo-4270371.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'African nurse caring for patient',
    title: 'Compassionate Patient Care',
    subtitle: 'Beyond medical therapy, we provide emotional and social welfare support to kidney patients and their caregivers throughout their treatment journey.'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Black doctor consulting with family',
    title: 'Early Detection Saves Lives',
    subtitle: 'Our community outreach programs focus on early screening and education to prevent the progression of kidney disease in underserved populations.'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'African community health outreach',
    title: 'Bridging the Healthcare Gap',
    subtitle: 'We collaborate with hospitals and health workers to bring specialized kidney care and laboratory services to those who need them most.'
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Black healthcare worker with elderly patient',
    title: 'A Legacy of Hope and Care',
    subtitle: 'Restoring dignity and health to indigent Nigerians through sustainable kidney health initiatives and replacement therapy assistance.'
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
  { name: 'X (Twitter)', url: 'https://x.com/AgbedeFoundation', icon: 'X' },
  { name: 'Instagram', url: 'https://instagram.com/AgbedeFoundation', icon: 'Instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/agbede-foundation', icon: 'Linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/@AgbedeFoundation', icon: 'Youtube' },
];
