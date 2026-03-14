/**
 * Partners and supporters marquee strip (polished redesign)
 */

export function PartnersStrip() {
  const partners = [
    { name: 'USAID', flag: '🇺🇸' },
    { name: 'DFID UK', flag: '🇬🇧' },
    { name: 'UNICEF Nigeria', flag: '🇺🇳' },
    { name: 'Gates Foundation', flag: '🌍' },
    { name: 'Ford Foundation', flag: '🌍' },
    { name: 'African Development Bank', flag: '🌍' },
    { name: 'Federal Ministry of Education', flag: '🇳🇬' },
    { name: 'Lagos State Health Ministry', flag: '🇳🇬' },
    { name: 'Access Bank Nigeria', flag: '🇳🇬' },
    { name: 'University of Lagos', flag: '🎓' },
  ];

  const track = [...partners, ...partners]; // duplicate for seamless loop

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      'linear-gradient(to right, transparent 0, black 120px, black calc(100% - 120px), transparent 100%)',
    maskImage:
      'linear-gradient(to right, transparent 0, black 120px, black calc(100% - 120px), transparent 100%)',
  };

  return (
    <section className="py-16 bg-[#FAFAF9] border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p
            className="uppercase text-[11px] tracking-[0.25em] text-gray-400 font-semibold"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Proud to Work With
          </p>
          <div className="mx-auto mt-2 w-10 h-0.5 bg-[var(--gold)]" />
        </div>

        <div className="relative overflow-hidden group" style={maskStyle}>
          <div
            className="flex items-center gap-6 will-change-transform"
            style={{
              animation: 'partnersMarquee 38s linear infinite',
              animationPlayState: 'running',
            }}
          >
            {track.map((partner, idx) => (
              <div key={`${idx}-${partner.name}`} className="py-2">
                <div
                  className="bg-white border border-gray-200 rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)] transition-all ease-out duration-200 hover:border-[var(--gold)] hover:scale-[1.03] flex items-center gap-3 px-6 py-3"
                  style={{ minWidth: 'fit-content' }}
                >
                  <span style={{ fontSize: 20 }} aria-hidden="true">{partner.flag}</span>
                  <span
                    className="text-[14px] font-semibold whitespace-nowrap"
                    style={{ color: 'var(--navy)', fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes partnersMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .group:hover > div { animation-play-state: paused; }
          `}</style>
        </div>
      </div>
    </section>
  );
}
