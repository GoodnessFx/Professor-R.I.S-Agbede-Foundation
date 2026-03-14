/**
 * News article card component
 */

import { Link } from 'react-router';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface NewsCardProps {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  image: string;
  featured?: boolean;
}

export function NewsCard({ id, slug, title, category, date, excerpt, author, image, featured = false }: NewsCardProps) {
  return (
    <Link to={`/news/${slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
      <div className="relative overflow-hidden">
        <div className="w-full aspect-[16/9]">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-[var(--gold)] text-[var(--navy)] text-xs font-semibold rounded-full">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col h-[260px]">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <User size={14} />
            {author}
          </span>
        </div>
        <h3 className="text-xl font-serif font-semibold text-[var(--navy)] mb-3 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
          {title}
        </h3>
        <p
          className="text-gray-600 text-sm mb-4"
          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 text-[var(--gold)] font-semibold text-sm group-hover:gap-3 transition-all">
          Read More <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
