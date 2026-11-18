import React, { useEffect, useState } from 'react';

interface IstSnapshot {
  hour24: number;
  minute: number;
  clock12: string;
}

function getIstSnapshot(): IstSnapshot {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);

    const hPart = parts.find((p) => p.type === 'hour')?.value ?? '12';
    const mPart = parts.find((p) => p.type === 'minute')?.value ?? '00';
    const hour24 = parseInt(hPart, 10) % 24;
    const minute = parseInt(mPart, 10) || 0;

    const clock12 = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
      .format(now)
      .toUpperCase();

    return { hour24, minute, clock12 };
  } catch {
    return { hour24: 12, minute: 0, clock12: '' };
  }
}

export const HeroBanner: React.FC = () => {
  const [ist, setIst] = useState<IstSnapshot>(() => getIstSnapshot());

  useEffect(() => {
    const timer = setInterval(() => {
      setIst(getIstSnapshot());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { hour24, minute, clock12 } = ist;
  const isDaytime = hour24 >= 5 && hour24 < 20;

  const theme =
    hour24 >= 5 && hour24 < 12
      ? {
          phase: 'MORNING',
          skyTop: '#172554',
          skyBot: '#38BDF8',
          cityA: '#1E3A5F',
          cityB: '#254B7A',
          starsOpacity: 0,
          cityLit: 0.15,
          accent: '#FBBF24',
          sunColor: '#FDE047',
          sunGlow: '#FEF08A',
          roomLight: 'rgba(56, 189, 248, 0.08)',
          clouds: false,
        }
      : hour24 >= 12 && hour24 < 17
        ? {
            phase: 'AFTERNOON',
            skyTop: '#0369A1',
            skyBot: '#7DD3FC',
            cityA: '#1E3A5F',
            cityB: '#294D7A',
            starsOpacity: 0,
            cityLit: 0.05,
            accent: '#38BDF8',
            sunColor: '#FEF08A',
            sunGlow: '#FFFFFF',
            roomLight: 'rgba(125, 211, 252, 0.11)',
            clouds: true,
          }
        : hour24 >= 17 && hour24 < 20
          ? {
              phase: 'EVENING',
              skyTop: '#3B0764',
              skyBot: '#F97316',
              cityA: '#1E1B3A',
              cityB: '#2B224A',
              starsOpacity: 0.35,
              cityLit: 0.65,
              accent: '#FB923C',
              sunColor: '#FB923C',
              sunGlow: '#FDBA74',
              roomLight: 'rgba(251, 146, 60, 0.09)',
              clouds: false,
            }
          : {
              phase: 'NIGHT',
              skyTop: '#060914',
              skyBot: '#0B1328',
              cityA: '#0F172A',
              cityB: '#15223D',
              starsOpacity: 1,
              cityLit: 0.85,
              accent: '#A3E635',
              sunColor: '#FDE68A',
              sunGlow: '#FDE68A',
              roomLight: 'rgba(163, 230, 53, 0.03)',
              clouds: false,
            };

  // Smooth real-time sun arc across the window (5:00 AM -> 8:00 PM IST)
  const dayProgress = Math.min(1, Math.max(0, ((hour24 - 5) * 60 + minute) / (15 * 60)));
  const sunX = Math.round(70 + dayProgress * 172);
  const sunY = Math.round(86 - Math.sin(dayProgress * Math.PI) * 46);

  return (
    <div className="relative h-44 w-full overflow-hidden border-b grid-line bg-[#090A0E] sm:h-56">
      <svg
        viewBox="0 0 900 240"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
        className="block h-full w-full"
      >
        <defs>
          <linearGradient id="portfolioSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.skyTop} />
            <stop offset="100%" stopColor={theme.skyBot} />
          </linearGradient>
        </defs>
        <style>{`
          @keyframes pbBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.15; } }
          @keyframes pbTwinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.95; } }
          @keyframes pbSteam1 { 0% { transform: translateY(0px); opacity: 0.85; } 100% { transform: translateY(-14px); opacity: 0; } }
          @keyframes pbSteam2 { 0% { transform: translateY(0px); opacity: 0.65; } 100% { transform: translateY(-18px); opacity: 0; } }
          @keyframes pbBob { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(2px); } }
          @keyframes pbWave { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
          .pb-cursor { animation: pbBlink 1s steps(1) infinite; }
          .pb-star-a { animation: pbTwinkle 2.8s ease-in-out infinite; }
          .pb-star-b { animation: pbTwinkle 3.6s ease-in-out 1.1s infinite; }
          .pb-star-c { animation: pbTwinkle 4.2s ease-in-out 0.5s infinite; }
          .pb-steam-a { animation: pbSteam1 2.4s ease-out infinite; }
          .pb-steam-b { animation: pbSteam2 2.4s ease-out 1.1s infinite; }
          .pb-hands { animation: pbBob 0.55s steps(2) infinite; }
          .pb-head { animation: pbBob 2.2s steps(2) infinite; }
          .pb-led1 { animation: pbBlink 1.6s steps(1) infinite; }
          .pb-led2 { animation: pbBlink 2.3s steps(1) 0.7s infinite; }
          .pb-wave { animation: pbWave 2s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .pb-cursor, .pb-star-a, .pb-star-b, .pb-star-c,
            .pb-steam-a, .pb-steam-b, .pb-hands, .pb-head,
            .pb-led1, .pb-led2, .pb-wave { animation: none !important; }
          }
        `}</style>

        {/* Room Backdrop + Real-Time Window Ambient Light */}
        <rect width="900" height="240" fill="#090A0E" />
        <rect width="900" height="240" fill={theme.roomLight} />
        <rect x="0" y="180" width="900" height="60" fill="#0D0F14" />
        <rect x="0" y="178" width="900" height="4" fill="#181B24" />

        {/* Window Frame */}
        <rect x="44" y="24" width="236" height="132" fill="#1A1E2B" />
        <rect x="52" y="32" width="220" height="116" fill="url(#portfolioSkyGrad)" />

        {/* Stars (Evening & Night) */}
        <g opacity={theme.starsOpacity}>
          <rect x="74" y="48" width="4" height="4" fill="#E2E8F0" className="pb-star-a" />
          <rect x="116" y="64" width="4" height="4" fill="#93C5FD" className="pb-star-b" />
          <rect x="152" y="42" width="4" height="4" fill="#E2E8F0" className="pb-star-c" />
          <rect x="198" y="72" width="4" height="4" fill="#A3E635" className="pb-star-a" />
          <rect x="242" y="50" width="4" height="4" fill="#E2E8F0" className="pb-star-b" />
          <rect x="92" y="92" width="4" height="4" fill="#CBD5E1" className="pb-star-c" />
        </g>

        {/* Live Moving Sun (Day) or Crescent Moon (Night) */}
        {isDaytime ? (
          <g>
            <rect x={sunX - 4} y={sunY - 4} width="28" height="28" fill={theme.sunGlow} opacity="0.35" />
            <rect x={sunX} y={sunY} width="20" height="20" fill={theme.sunColor} />
            <rect x={sunX - 4} y={sunY + 4} width="28" height="12" fill={theme.sunColor} />
            {theme.clouds && (
              <>
                <rect x="74" y="56" width="38" height="10" fill="#E0F2FE" opacity="0.85" />
                <rect x="82" y="50" width="22" height="6" fill="#F0F9FF" opacity="0.9" />
                <rect x="176" y="68" width="34" height="8" fill="#E0F2FE" opacity="0.75" />
              </>
            )}
          </g>
        ) : (
          <g>
            <rect x="220" y="44" width="16" height="16" fill="#FDE68A" />
            <rect x="226" y="44" width="12" height="12" fill="#060914" />
          </g>
        )}

        {/* Pune Skyline */}
        <rect x="52" y="114" width="28" height="34" fill={theme.cityA} />
        <rect x="80" y="102" width="32" height="46" fill={theme.cityB} />
        <rect x="112" y="120" width="24" height="28" fill={theme.cityA} />
        <rect x="136" y="96" width="38" height="52" fill={theme.cityB} />
        <rect x="174" y="112" width="34" height="36" fill={theme.cityA} />
        <rect x="208" y="106" width="32" height="42" fill={theme.cityB} />
        <rect x="240" y="118" width="32" height="30" fill={theme.cityA} />

        {/* City Lights */}
        <g opacity={theme.cityLit}>
          <rect x="88" y="110" width="4" height="4" fill="#FACC15" />
          <rect x="148" y="106" width="4" height="4" fill="#60A5FA" />
          <rect x="156" y="118" width="4" height="4" fill="#FACC15" />
          <rect x="218" y="114" width="4" height="4" fill="#60A5FA" />
        </g>

        {/* Window Crossbar */}
        <rect x="160" y="32" width="4" height="116" fill="#1A1E2B" />
        <rect x="52" y="92" width="220" height="4" fill="#1A1E2B" />

        {/* Top-Right Pixel Lab Card with Real-Time Phase + Live IST Clock */}
        <rect x="656" y="20" width="208" height="60" fill="#10131A" />
        <rect x="656" y="20" width="208" height="2" fill="#27272A" />
        <rect x="656" y="78" width="208" height="2" fill="#27272A" />
        <rect x="656" y="20" width="2" height="60" fill="#27272A" />
        <rect x="862" y="20" width="2" height="60" fill="#27272A" />
        <rect x="668" y="32" width="6" height="6" fill={theme.accent} className="pb-led1" />
        <text x="682" y="39" fill="#F2F2F2" fontFamily="monospace" fontSize="12" fontWeight="bold">
          PUSHKAR_AI_LAB
        </text>
        <text x="668" y="55" fill="#A1A1AA" fontFamily="monospace" fontSize="10">
          21Y · AI / ML
        </text>
        <text x="668" y="71" fill={theme.accent} fontFamily="monospace" fontSize="10">
          {theme.phase} · {clock12 || 'PUNE, IN'}
        </text>

        {/* Desk Surface */}
        <rect x="290" y="176" width="560" height="10" fill="#222633" />
        <rect x="304" y="186" width="532" height="54" fill="#141720" />
        <rect x="318" y="186" width="10" height="54" fill="#0B0D12" />
        <rect x="812" y="186" width="10" height="54" fill="#0B0D12" />

        {/* Local LLM Tower */}
        <rect x="752" y="112" width="54" height="64" fill="#1A1D26" />
        <rect x="756" y="116" width="46" height="56" fill="#101218" />
        <rect x="764" y="124" width="6" height="4" fill={theme.accent} className="pb-led1" />
        <rect x="774" y="124" width="6" height="4" fill="#60A5FA" className="pb-led2" />
        <rect x="784" y="124" width="6" height="4" fill="#A78BFA" className="pb-led1" />
        <rect x="764" y="138" width="30" height="4" fill="#1F2430" />
        <rect x="764" y="146" width="30" height="4" fill="#1F2430" />
        <rect x="764" y="154" width="30" height="4" fill="#1F2430" />
        <rect x="764" y="162" width="30" height="4" fill="#1F2430" />

        {/* Main Monitor */}
        <rect x="468" y="76" width="176" height="84" fill="#242938" />
        <rect x="474" y="82" width="164" height="72" fill="#070B12" />
        <rect x="546" y="160" width="20" height="12" fill="#242938" />
        <rect x="530" y="170" width="52" height="6" fill="#2D3345" />
        <rect x="480" y="174" width="152" height="2" fill={theme.accent} opacity="0.35" />

        {/* Monitor Screen Content */}
        <rect x="482" y="90" width="68" height="4" fill={theme.accent} />
        <rect x="482" y="100" width="52" height="4" fill="#60A5FA" />
        <rect x="482" y="108" width="60" height="4" fill="#94A3B8" />
        <rect x="482" y="116" width="44" height="4" fill="#A78BFA" />
        <rect x="482" y="124" width="58" height="4" fill="#64748B" />
        <rect x="482" y="134" width="32" height="4" fill={theme.accent} />
        <rect x="518" y="134" width="6" height="6" fill={theme.accent} className="pb-cursor" />

        <rect x="560" y="88" width="2" height="60" fill="#1E293B" />

        <rect x="570" y="92" width="58" height="4" fill="#38BDF8" opacity="0.7" />
        <rect x="572" y="122" width="6" height="16" fill="#60A5FA" className="pb-wave" />
        <rect x="582" y="110" width="6" height="28" fill={theme.accent} className="pb-wave" />
        <rect x="592" y="116" width="6" height="22" fill="#A78BFA" className="pb-wave" />
        <rect x="602" y="104" width="6" height="34" fill={theme.accent} className="pb-wave" />
        <rect x="612" y="118" width="6" height="20" fill="#60A5FA" className="pb-wave" />
        <rect x="622" y="126" width="6" height="12" fill="#38BDF8" className="pb-wave" />

        {/* Side Laptop */}
        <rect x="372" y="126" width="64" height="42" fill="#202431" />
        <rect x="376" y="130" width="56" height="34" fill="#0A0E17" />
        <rect x="366" y="168" width="76" height="8" fill="#2D3345" />
        <rect x="382" y="136" width="36" height="4" fill="#60A5FA" />
        <rect x="382" y="144" width="44" height="4" fill="#475569" />
        <rect x="382" y="152" width="28" height="4" fill={theme.accent} />

        {/* Steaming Coffee Mug */}
        <rect x="684" y="156" width="18" height="20" fill="#E5E7EB" />
        <rect x="702" y="160" width="6" height="10" fill="#CBD5E1" />
        <rect x="686" y="156" width="14" height="4" fill="#78350F" />
        <rect x="688" y="144" width="4" height="6" fill="#94A3B8" className="pb-steam-a" />
        <rect x="694" y="140" width="4" height="6" fill="#CBD5E1" className="pb-steam-b" />

        {/* Developer Seated & Coding */}
        <rect x="524" y="146" width="60" height="58" fill="#181A22" />
        <rect x="548" y="204" width="12" height="36" fill="#252834" />
        <rect x="528" y="132" width="52" height="44" fill="#111318" />
        <rect x="534" y="136" width="40" height="36" fill="#171920" />
        <g className="pb-hands">
          <rect x="520" y="164" width="16" height="10" fill="#C68B59" />
          <rect x="572" y="164" width="16" height="10" fill="#C68B59" />
        </g>
        <g className="pb-head">
          <rect x="536" y="96" width="36" height="36" fill="#18161B" />
          <rect x="534" y="102" width="40" height="24" fill="#18161B" />
          <rect x="544" y="128" width="20" height="6" fill="#C68B59" />
          <rect x="540" y="94" width="28" height="4" fill="#27252C" />
        </g>

        <rect x="0" y="236" width="900" height="4" fill={theme.accent} opacity="0.35" />
      </svg>
    </div>
  );
};
