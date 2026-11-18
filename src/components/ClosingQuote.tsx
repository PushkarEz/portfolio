import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { QUOTES } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

export const ClosingQuote: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [paused]);

  const active = QUOTES[index];

  return (
    <section id="quotes" className="scroll-mt-16 border-b grid-line">
      <Reveal>
        <div className="flex flex-col items-center justify-center border-b grid-line px-5 py-12 text-center sm:px-8 sm:py-14">
          <p className="text-sm text-muted sm:text-base">
            If you&apos;ve read this far, you might be interested in what I build.
          </p>
          <Link
            to="/contact"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold text-canvas transition-all hover:-translate-y-0.5 hover:opacity-90 sm:text-sm"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="px-5 py-14 text-center sm:px-8 sm:py-16"
      >
        <div key={index} className="animate-quote-in mx-auto flex min-h-[175px] max-w-2xl flex-col justify-center">
          <span
            aria-hidden="true"
            className="block font-serif text-4xl leading-none text-muted/40"
          >
            &ldquo;&rdquo;
          </span>
          <blockquote className="mt-2 font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
            &ldquo;{active.text}&rdquo;
          </blockquote>
          <div className="mt-5 flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-line" />
              <cite className="font-mono text-[11px] not-italic uppercase tracking-[0.2em] text-ink">
                {active.author}
              </cite>
              <span className="h-px w-8 bg-line" />
            </div>
            {active.source && (
              <span className="font-mono text-[10px] text-muted">{active.source}</span>
            )}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2" aria-label="Quote switcher">
          {QUOTES.map((q, i) => (
            <button
              key={q.text}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show quote ${i + 1} by ${q.author}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-ink' : 'w-1.5 bg-line hover:bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
