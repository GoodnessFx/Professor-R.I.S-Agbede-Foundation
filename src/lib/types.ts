/**
 * TypeScript interfaces and types for the Foundation website
 */

export interface Program {
  id: string;
  title: string;
  icon: string;
  description: string;
  stats: string;
  status: string;
  subPrograms: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  image: string;
  featured?: boolean;
  content?: string[];
  pullQuote?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  program: string;
  quote: string;
  avatar?: string;
}

export interface Trustee {
  id: string;
  name: string;
  title: string;
  avatar?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
  category: string;
}
