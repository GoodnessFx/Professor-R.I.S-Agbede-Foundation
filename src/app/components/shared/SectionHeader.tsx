/**
 * Reusable section header with decorative underline
 */

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-3 ${
        light ? 'text-white' : 'text-[var(--navy)]'
      }`}>
        {title}
      </h2>
      <div className={`w-24 h-1 bg-[var(--gold)] ${centered ? 'mx-auto' : ''} mb-4`} />
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-2xl ${
          centered ? 'mx-auto' : ''
        } ${light ? 'text-white/90' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
