type Props = { className?: string; variant?: 'light' | 'dark' };

export function Logo({ className = "w-10 h-10", variant = 'dark' }: Props) {
  return (
    <svg viewBox="0 0 220 110" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="R.I.S Logo">
      <defs>
        <linearGradient id="risGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8832A" />
          <stop offset="100%" stopColor="#E2A855" />
        </linearGradient>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0"/>
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <rect x="2" y="2" width="216" height="106" rx="12" fill="transparent" />
      {/* Top small label with extra spacing */}
      <text
        x="50%"
        y="18"
        textAnchor="middle"
        fontFamily="Nunito Sans, system-ui, sans-serif"
        fontWeight="600"
        fontSize="12"
        letterSpacing="0.2em"
        fill="#C8832A"
      >
        PROF.
      </text>
      {/* Dominant wordmark */}
      <text
        x="50%"
        y="54"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="700"
        fontSize="52"
        letterSpacing="6"
        fill="url(#risGrad)"
        filter="url(#softShadow)"
      >
        R.I.S
      </text>
      {/* Bottom small label */}
      <text
        x="50%"
        y="78"
        textAnchor="middle"
        fontFamily="Nunito Sans, system-ui, sans-serif"
        fontWeight="700"
        fontSize="10"
        letterSpacing="0.18em"
        fill={variant === 'light' ? '#ffffff' : 'var(--navy)'}
      >
        AGBEDE FOUNDATION
      </text>
    </svg>
  );
}
