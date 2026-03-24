/**
 * Program card component
 */

import { Link } from 'react-router';
import { ArrowRight, HeartPulse, Megaphone, Users, FlaskConical, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProgramCardProps {
  icon: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
}

const iconMap: Record<string, any> = {
  HeartPulse,
  Megaphone,
  Users,
  FlaskConical,
  Heart,
};

export function ProgramCard({ icon, title, description, link = '/programs', image }: ProgramCardProps) {
  const Icon = iconMap[icon] || Heart;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[var(--gold)] flex flex-col h-full"
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--gold)] transition-colors duration-300">
          <Icon size={24} className="md:w-8 md:h-8 text-[var(--gold)] group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl md:text-2xl font-serif font-semibold text-[var(--navy)] mb-4">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed flex-1">
          {description}
        </p>
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold group-hover:gap-3 transition-all"
        >
          Explore <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}
