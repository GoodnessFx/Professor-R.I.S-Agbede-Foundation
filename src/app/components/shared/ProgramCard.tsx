/**
 * Program card component
 */

import { Link } from 'react-router';
import { ArrowRight, GraduationCap, Heart, Building2, Laptop } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgramCardProps {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

const iconMap: Record<string, any> = {
  GraduationCap,
  Heart,
  Building2,
  Laptop,
};

export function ProgramCard({ icon, title, description, link = '/programs' }: ProgramCardProps) {
  const Icon = iconMap[icon] || GraduationCap;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[var(--gold)]"
    >
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--gold)] transition-colors duration-300">
        <Icon size={24} className="md:w-8 md:h-8 text-[var(--gold)] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl md:text-2xl font-serif font-semibold text-[var(--navy)] mb-4">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      <Link
        to={link}
        className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold group-hover:gap-3 transition-all"
      >
        Explore <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
}
