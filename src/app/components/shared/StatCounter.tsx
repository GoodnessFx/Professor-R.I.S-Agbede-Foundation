/**
 * Animated statistic counter component
 */

import { useInView } from 'react-intersection-observer';
import { useCountUp } from '../../../hooks/useCountUp';

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatCounter({ value, label, prefix = '', suffix = '' }: StatCounterProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const count = useCountUp(value, 2000, inView);

  return (
    <div ref={ref} className="text-center">
      <div 
        className="font-bold text-[var(--gold)] mb-2"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div 
        className="text-white/90 uppercase tracking-wider font-medium"
        style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}
      >
        {label}
      </div>
    </div>
  );
}
