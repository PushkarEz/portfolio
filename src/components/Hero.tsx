import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUpRight,
  Eye,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Sun,
} from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { HeroBanner } from './HeroBanner';
import { TechBrandIcon, XLogo } from './TechIcons';

interface HeroProps {
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface SocialCardItem {
  id: string;
  label: string;
  handle: string;
  bio: string;
  meta: string;
  footerLeft: string;
  footerRight: string;
  href: string;
  accentGradient: string;
  icon: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ theme, onToggleTheme }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [istClock, setIstClock] = useState('');
  const [views, setViews] = useState<number | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
          .format(new Date())
          .toUpperCase();
        setIstClock(`${formatted} IST`);
      } catch {
        setIstClock('');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live visitor counter using Abacus (primary) + CounterAPI (fallback)
  useEffect(() => {
    let active = true;
    const countedKey = 'pushkar_portfolio_live_counted';

    async function fetchCount(): Promise<number | null> {
      const alreadyCounted = sessionStorage.getItem(countedKey) === '1';

      // 1. Try Abacus public counter
      try {
        const abacusUrl = alreadyCounted
          ? 'https://abacus.jasoncameron.dev/get/pushkar-shinde-portfolio/visits'
          : 'https://abacus.jasoncameron.dev/hit/pushkar-shinde-portfolio/visits';
        let res = await fetch(abacusUrl);
        if (!res.ok && alreadyCounted) {
          res = await fetch('https://abacus.jasoncameron.dev/hit/pushkar-shinde-portfolio/visits');
        }
        if (res.ok) {
          const data = await res.json();
          if (typeof data.value === 'number') return data.value;
        }
      } catch {
        // try fallback
      }

      // 2. Fallback to CounterAPI
      try {
        const counterUrl = alreadyCounted
          ? 'https://api.counterapi.dev/v1/pushkarez-portfolio-2026/views'
          : 'https://api.counterapi.dev/v1/pushkarez-portfolio-2026/views/up';
        let res = await fetch(counterUrl);
        if (!res.ok && alreadyCounted) {
          res = await fetch('https://api.counterapi.dev/v1/pushkarez-portfolio-2026/views/up');
        }
        if (res.ok) {
          const data = await res.json();
          if (typeof data.count === 'number') return data.count;
        }
      } catch {
        // unreachable
      }

      return null;
    }

    fetchCount().then((count) => {
      if (active && count !== null) {
        setViews(count);
        sessionStorage.setItem(countedKey, '1');
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const socialItems: SocialCardItem[] = [
    {
      id: 'github',
      label: 'GitHub',
      handle: `@${PROFILE.githubUsername}`,
      bio: 'Automating things so I can be lazy later... · Python & AI experiments',
      meta: 'Pune, India (UTC +05:30)',
      footerLeft: '4 Showcase Builds',
      footerRight: 'github.com/PushkarEz',
      href: PROFILE.socials.github,
      accentGradient: 'from-[#0D1117] via-[#161B22] to-[#0B1F16]',
      icon: <Github className="h-3.5 w-3.5 text-muted" />,
    },
    {
      id: 'twitter',
      label: 'Twitter',
      handle: '@PushkarEz16',
      bio: 'Sharing Python builds, local LLM tests, and hackathon notes.',
      meta: 'Pune, India (UTC +05:30)',
      footerLeft: 'Aspiring AI Engineer',
      footerRight: 'x.com/PushkarEz16',
      href: PROFILE.socials.x,
      accentGradient: 'from-[#0B132B] via-[#1C2541] to-[#0F172A]',
      icon: <XLogo className="h-3 w-3 text-muted" />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'in/pushkar-shinde1608',
      bio: 'Final-year B.E. E&TC @ SPPU (2027) · Python, Flask, Voice AI & RAG.',
      meta: 'Pune, Maharashtra, India',
      footerLeft: 'SPPU Class of 2027',
      footerRight: 'Connect',
      href: PROFILE.socials.linkedin,
      accentGradient: 'from-[#0A192F] via-[#112240] to-[#0B1320]',
      icon: <Linkedin className="h-3.5 w-3.5 text-muted" />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@pushkar.ez',
      bio: 'College life, hackathons, and behind-the-scenes experiments.',
      meta: 'Pune, India',
      footerLeft: 'Builder Journal',
      footerRight: 'instagram.com/pushkar.ez',
      href: PROFILE.socials.instagram,
      accentGradient: 'from-[#1B1026] via-[#261433] to-[#120D1D]',
      icon: <Instagram className="h-3.5 w-3.5 text-muted" />,
    },
    {
      id: 'resume',
      label: 'Resume',
      handle: 'Pushkar_Shinde.pdf',
      bio: 'B.E. E&TC (2027) · Python, Ollama, FAISS, RAG, Flask & Hackathon milestones.',
      meta: 'PDF Document',
      footerLeft: 'Updated Résumé',
      footerRight: 'Open PDF',
      href: PROFILE.resumeUrl,
      accentGradient: 'from-[#14171A] via-[#1E2229] to-[#0F1115]',
      icon: <FileText className="h-3.5 w-3.5 text-muted" />,
    },
  ];

  return (
    <section className="border-b grid-line">
      <HeroBanner />

      <div className="flex flex-wrap items-start justify-between gap-4 px-5 pt-6 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 shrink-0 rounded-xl border grid-line bg-surface p-1 shadow-sm sm:h-24 sm:w-24">
            <div className="h-full w-full overflow-hidden rounded-lg border grid-line bg-canvas">
              {!imgFailed ? (
                <img
                  src={PROFILE.avatarPath}
                  alt={PROFILE.fullName}
                  onError={() => setImgFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-ink">
                  P
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
              Hi, I&apos;m {PROFILE.fullName}
            </h1>
            <p className="mt-1 font-mono text-xs text-muted">{PROFILE.shortMeta}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted">
              <span>{PROFILE.location}</span>
              {istClock && (
                <>
                  <span>·</span>
                  <span>{istClock}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            title="Live visitor views"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border grid-line bg-surface px-2.5 font-mono text-[11px] text-muted"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{views !== null ? views.toLocaleString() : '...'}</span>
          </span>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border grid-line bg-surface text-muted transition-colors hover:border-ink/40 hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <div className="animate-hero-in px-5 pb-8 pt-6 sm:px-8 sm:pb-10">
        <p className="max-w-2xl text-[15px] leading-[1.9] text-muted">
          I&apos;m an{' '}
          <span className="relative inline-block font-medium text-ink">
            Aspiring AI Engineer
            <svg
              viewBox="0 0 180 10"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-muted/80"
            >
              <path
                d="M2 7 C 55 2, 125 2, 178 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          &amp; final-year <strong className="font-medium text-ink">B.E. E&amp;TC</strong> student
          at SPPU (<strong className="font-medium text-ink">2027</strong>). I use{' '}
          <span className="inline-flex items-center gap-1 align-baseline font-medium text-ink">
            <TechBrandIcon name="Python" className="inline h-3.5 w-3.5 text-[#3776AB]" />
            <span>Python</span>
          </span>{' '}
          and{' '}
          <span className="inline-flex items-center gap-1 align-baseline font-medium text-ink">
            <TechBrandIcon name="Flask" className="inline h-3.5 w-3.5 text-ink/80" />
            <span>Flask</span>
          </span>{' '}
          to ship web tools like <strong className="font-medium text-ink">ByteX</strong>,
          explore{' '}
          <span className="inline-flex items-center gap-1 align-baseline font-medium text-ink">
            <TechBrandIcon name="Ollama" className="inline h-3.5 w-3.5 text-[#A78BFA]" />
            <span>Ollama</span>
          </span>{' '}
          and{' '}
          <span className="inline-flex items-center gap-1 align-baseline font-medium text-ink">
            <TechBrandIcon name="FAISS" className="inline h-3.5 w-3.5 text-[#38BDF8]" />
            <span>RAG</span>
          </span>{' '}
          for local AI apps, and experiment with{' '}
          <strong className="font-medium text-ink">Voice AI</strong> and automation.
        </p>

        <div className="mt-4 space-y-1.5 text-sm text-muted">
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="text-ink">
              ✦
            </span>
            <span>
              Shortlisted at <strong className="font-medium text-ink">Quantum Arena</strong> (24h
              Hackathon) &amp; <strong className="font-medium text-ink">25% Scholarship</strong> at
              Code4EdTech
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="text-ink">
              ✦
            </span>
            <span>
              Presented <strong className="font-medium text-ink">EV Parking System</strong> at COEP
              Project Competition
            </span>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-xs font-semibold text-canvas transition-all hover:-translate-y-0.5 hover:opacity-90 sm:text-sm"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Send an email</span>
          </Link>

          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2 rounded-md border grid-line bg-surface px-4 py-2 text-xs font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink/40 sm:text-sm"
          >
            <ArrowDown className="h-3.5 w-3.5 text-muted" />
            <span>Explore Projects</span>
          </button>
        </div>

        <div className="mt-7">
          <p className="text-xs text-muted">
            Here are my <strong className="font-medium text-ink">socials</strong>
          </p>

          <div className="mt-2.5 flex flex-wrap gap-2">
            {socialItems.map((item, idx) => {
              const isHovered = hoveredSocial === item.id;
              const alignRight = idx >= 3;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredSocial(item.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onFocus={() => setHoveredSocial(item.id)}
                    onBlur={() => setHoveredSocial(null)}
                    className="inline-flex items-center gap-1.5 rounded-md border grid-line bg-surface px-3 py-1.5 text-xs text-ink/90 transition-colors hover:border-ink/40 hover:bg-subtle"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>

                  {isHovered && (
                    <div
                      className={`animate-hero-in pointer-events-none absolute bottom-full z-30 mb-3 hidden w-72 overflow-hidden rounded-2xl border grid-line bg-surface shadow-2xl sm:block ${
                        alignRight ? 'right-0' : 'left-0'
                      }`}
                    >
                      <div className={`h-14 w-full bg-gradient-to-r ${item.accentGradient}`} />
                      <div className="px-4 pb-4">
                        <div className="-mt-7 flex items-end justify-between">
                          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-surface bg-canvas">
                            {!imgFailed ? (
                              <img
                                src={PROFILE.avatarPath}
                                alt={PROFILE.fullName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-serif text-lg text-ink">
                                P
                              </div>
                            )}
                          </div>
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted">
                            <span>{item.label}</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </div>

                        <div className="mt-2">
                          <div className="text-sm font-semibold text-ink">{PROFILE.fullName}</div>
                          <div className="font-mono text-[11px] text-muted">{item.handle}</div>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-ink/85">{item.bio}</p>

                        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
                          <MapPin className="h-3 w-3" />
                          <span>{item.meta}</span>
                        </p>

                        <div className="mt-3 flex items-center justify-between border-t grid-line pt-2.5 font-mono text-[10px] text-muted">
                          <span className="text-ink">{item.footerLeft}</span>
                          <span>{item.footerRight}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
