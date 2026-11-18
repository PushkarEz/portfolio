import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  Trophy,
} from 'lucide-react';
import { JOURNEY_ENTRIES, TimelineEntry } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

const KIND_ICON: Record<TimelineEntry['kind'], React.ReactNode> = {
  education: <GraduationCap className="h-4 w-4" />,
  exploration: <Code2 className="h-4 w-4" />,
  hackathon: <Trophy className="h-4 w-4" />,
  ai: <Cpu className="h-4 w-4" />,
  future: <Compass className="h-4 w-4" />,
};

export const JourneyTimeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="journey" className="scroll-mt-16 border-b grid-line">
      <div className="flex items-center justify-between border-b grid-line px-5 py-4 sm:px-8">
        <h2 className="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
          Journey &amp; Milestones
        </h2>
        <span className="font-mono text-[11px] text-muted">2023 — 2027</span>
      </div>

      <div className="divide-y divide-grid-line">
        {JOURNEY_ENTRIES.map((entry, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <Reveal key={entry.title} delay={idx * 50}>
              <div className="px-5 py-5 transition-colors hover:bg-surface/40 sm:px-8">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  className="flex w-full items-start justify-between gap-4 text-left focus:outline-none"
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border grid-line bg-surface transition-colors ${
                        isOpen ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {KIND_ICON[entry.kind]}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-ink sm:text-base">
                          {entry.title}
                        </h3>
                      </div>
                      <p className="mt-0.5 text-xs text-muted">{entry.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 text-right">
                    <span className="font-mono text-xs text-ink/90">{entry.period}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-ink' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 space-y-3 pl-12">
                    <p className="text-xs leading-relaxed text-muted sm:text-sm">{entry.summary}</p>
                    <ul className="space-y-1.5 text-xs leading-relaxed text-ink/85 sm:text-sm">
                      {entry.details.map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/60" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border grid-line bg-surface px-2 py-0.5 font-mono text-[10.5px] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {entry.projectSlug && (
                        <Link
                          to={`/projects/${entry.projectSlug}`}
                          className="link-underline inline-flex items-center gap-1 font-mono text-[11px] text-ink"
                        >
                          <span>View Project</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
