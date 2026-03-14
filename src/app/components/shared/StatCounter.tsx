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
      <div className="text-4xl md:text-5xl font-bold text-[var(--gold)] mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-white/90 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
