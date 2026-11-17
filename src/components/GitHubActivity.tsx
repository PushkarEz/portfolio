import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-subtle border border-line/60',
  1: 'bg-[#9be9a8] dark:bg-[#0e4429]',
  2: 'bg-[#40c463] dark:bg-[#006d32]',
  3: 'bg-[#30a14e] dark:bg-[#26a641]',
  4: 'bg-[#216e39] dark:bg-[#39d353]',
};

function formatDateLabel(dateStr: string): string {
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const GitHubActivity: React.FC = () => {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [calStatus, setCalStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let active = true;

    async function loadContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${PROFILE.githubUsername}?y=last`
        );
        if (!res.ok) throw new Error('Contribution fetch failed');
        const json = await res.json();

        if (!active) return;

        if (Array.isArray(json.contributions) && json.contributions.length > 0) {
          setDays(json.contributions);
          const total =
            typeof json.total?.lastYear === 'number'
              ? json.total.lastYear
              : json.contributions.reduce((acc: number, d: ContributionDay) => acc + d.count, 0);
          setTotalContributions(total);
          setCalStatus('ready');
        } else {
          setCalStatus('error');
        }
      } catch {
        if (active) setCalStatus('error');
      }
    }

    loadContributions();
    return () => {
      active = false;
    };
  }, []);

  const { weeks, monthLabels } = useMemo(() => {
    if (days.length === 0) return { weeks: [], monthLabels: [] as { col: number; label: string }[] };

    const firstDate = new Date(`${days[0].date}T00:00:00`);
    const leadingNulls = Number.isNaN(firstDate.getTime()) ? 0 : firstDate.getDay();

    const padded: Array<ContributionDay | null> = [
      ...Array.from({ length: leadingNulls }, () => null),
      ...days,
    ];

    const groupedWeeks: Array<Array<ContributionDay | null>> = [];
    for (let i = 0; i < padded.length; i += 7) {
      const slice = padded.slice(i, i + 7);
      while (slice.length < 7) slice.push(null);
      groupedWeeks.push(slice);
    }

    const labels: { col: number; label: string }[] = [];
    let lastMonth = -1;

    groupedWeeks.forEach((week, colIndex) => {
      const validDay = week.find((d) => d !== null);
      if (!validDay) return;
      const monthIdx = new Date(`${validDay.date}T00:00:00`).getMonth();
      if (monthIdx !== lastMonth) {
        if (labels.length === 0 || colIndex - labels[labels.length - 1].col >= 3) {
          labels.push({ col: colIndex, label: MONTHS[monthIdx] });
        }
        lastMonth = monthIdx;
      }
    });

    return { weeks: groupedWeeks, monthLabels: labels };
  }, [days]);

  return (
    <section id="github" className="scroll-mt-16 border-b grid-line">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b grid-line px-5 py-4 sm:px-8">
        <h2 className="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
          GitHub Activity
        </h2>

        <a
          href={PROFILE.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-ink"
        >
          <span>@{PROFILE.githubUsername}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="p-5 sm:p-8">
        <Reveal>
          <div className="rounded border grid-line bg-surface p-4 sm:p-5">
            {calStatus === 'loading' && (
              <div className="space-y-3 py-4">
                <div className="h-3 w-48 animate-pulse rounded bg-subtle" />
                <div className="h-24 w-full animate-pulse rounded bg-subtle" />
              </div>
            )}

            {calStatus === 'error' && (
              <div className="flex flex-col items-start justify-between gap-3 py-3 sm:flex-row sm:items-center">
                <p className="text-xs leading-relaxed text-muted sm:text-sm">
                  Live GitHub contribution data could not be retrieved right now. View live activity
                  directly on GitHub.
                </p>
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded border grid-line bg-canvas px-3 py-1.5 font-mono text-xs text-ink hover:border-ink/40"
                >
                  <span>github.com/{PROFILE.githubUsername}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            {calStatus === 'ready' && (
              <div>
                <div className="overflow-x-auto pb-2">
                  <div className="inline-block min-w-full">
                    <div className="mb-1.5 flex pl-7 font-mono text-[10px] text-muted">
                      {weeks.map((_, colIdx) => {
                        const found = monthLabels.find((m) => m.col === colIdx);
                        return (
                          <div key={colIdx} className="w-[13px] shrink-0">
                            {found ? found.label : ''}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-1.5">
                      <div className="flex w-5 shrink-0 flex-col justify-between py-0.5 font-mono text-[9px] text-muted">
                        <span className="h-[10px]" />
                        <span className="leading-[10px]">Mon</span>
                        <span className="h-[10px]" />
                        <span className="leading-[10px]">Wed</span>
                        <span className="h-[10px]" />
                        <span className="leading-[10px]">Fri</span>
                        <span className="h-[10px]" />
                      </div>

                      <div className="flex gap-[3px]">
                        {weeks.map((week, wIdx) => (
                          <div key={wIdx} className="flex flex-col gap-[3px]">
                            {week.map((day, dIdx) =>
                              day ? (
                                <button
                                  key={day.date}
                                  type="button"
                                  onMouseEnter={() => setHoveredDay(day)}
                                  onFocus={() => setHoveredDay(day)}
                                  onClick={() => setHoveredDay(day)}
                                  aria-label={`${day.count} contributions on ${formatDateLabel(day.date)}`}
                                  className={`h-[10px] w-[10px] rounded-[2px] transition-transform hover:scale-125 focus:outline-none focus:ring-1 focus:ring-ink ${
                                    LEVEL_CLASSES[day.level]
                                  }`}
                                />
                              ) : (
                                <span key={`empty-${wIdx}-${dIdx}`} className="h-[10px] w-[10px]" />
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t grid-line pt-3 font-mono text-[11px] text-muted">
                  <span>
                    {hoveredDay ? (
                      <>
                        <strong className="font-medium text-ink">
                          {hoveredDay.count}{' '}
                          {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
                        </strong>{' '}
                        on {formatDateLabel(hoveredDay.date)}
                      </>
                    ) : (
                      <>
                        <strong className="font-medium text-ink">{totalContributions}</strong>{' '}
                        contributions in the last year
                      </>
                    )}
                  </span>

                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span>Less</span>
                    {([0, 1, 2, 3, 4] as const).map((lvl) => (
                      <span
                        key={lvl}
                        className={`inline-block h-[10px] w-[10px] rounded-[2px] ${LEVEL_CLASSES[lvl]}`}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
