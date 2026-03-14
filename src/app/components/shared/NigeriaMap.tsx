import { useState } from 'react';

type Marker = { name: string; x: number; y: number };

const markers: Marker[] = [
  { name: 'Lagos', x: 110, y: 220 },
  { name: 'Abuja (FCT)', x: 200, y: 160 },
  { name: 'Kogi', x: 210, y: 190 },
  { name: 'Enugu', x: 260, y: 210 },
  { name: 'Kano', x: 200, y: 100 },
  { name: 'Rivers', x: 170, y: 260 },
];

export function NigeriaMap() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="w-full flex items-center justify-center">
      <svg viewBox="0 0 360 360" className="max-w-[500px] w-full h-auto">
        {/* Stylised Nigeria silhouette (approximate artistic shape) */}
        <path
          d="M60 120 C80 80, 120 70, 150 90 C180 60, 220 70, 240 100 C270 110, 290 140, 300 180 C290 210, 260 240, 230 250 C220 280, 180 290, 150 270 C120 280, 90 260, 80 230 C60 210, 50 170, 60 120 Z"
          fill="var(--muted)"
          stroke="var(--navy)"
          strokeWidth="2"
        />
        {markers.map((m) => (
          <g key={m.name} onMouseEnter={() => setHover(m.name)} onMouseLeave={() => setHover(null)}>
            <circle cx={m.x} cy={m.y} r="6" fill="var(--gold)" />
            {hover === m.name && (
              <g>
                <rect x={m.x + 8} y={m.y - 18} rx="4" ry="4" width="110" height="22" fill="white" stroke="var(--navy)" />
                <text x={m.x + 14} y={m.y - 3} fontSize="12" fill="var(--navy)">{m.name}</text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

