import { Quote, User } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TestimonialCardProps {
  name: string;
  location: string;
  program: string;
  quote: string;
  avatar?: string;
}

export function TestimonialCard({ name, location, program, quote, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 relative">
      <div className="absolute top-8 right-8 text-[var(--gold)]/20">
        <Quote size={48} />
      </div>
      <div className="relative">
        <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
          "{quote}"
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
            {avatar ? (
              <ImageWithFallback
                src={avatar}
                alt={`${name}'s portrait`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[var(--gold)]/20 flex items-center justify-center">
                <User size={24} className="text-[var(--gold)]" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-[var(--navy)]">{name}</h4>
            <p className="text-sm text-gray-600">{location} · {program}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
