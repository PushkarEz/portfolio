import React, { useState } from 'react';
import { TECH_STACK } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';
import { TechBrandIcon } from './TechIcons';

export const TechStack: React.FC = () => {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <section id="stack" className="scroll-mt-16 border-b grid-line">
      <div className="border-b grid-line px-5 py-4 sm:px-8">
        <h2 className="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
          Skills
        </h2>
      </div>

      <Reveal>
        <div className="flex flex-wrap gap-3 p-5 sm:p-8">
          {TECH_STACK.map((item) => {
            const isHovered = hoveredName === item.name;
            return (
              <div key={item.name} className="relative">
                <button
                  type="button"
                  title={item.name}
                  aria-label={item.name}
                  onMouseEnter={() => setHoveredName(item.name)}
                  onMouseLeave={() => setHoveredName(null)}
                  onFocus={() => setHoveredName(item.name)}
                  onBlur={() => setHoveredName(null)}
                  onClick={() => setHoveredName(isHovered ? null : item.name)}
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border grid-line bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/40 hover:bg-subtle focus:outline-none"
                >
                  <span style={{ color: item.brandColor }} className="transition-transform group-hover:scale-110">
                    <TechBrandIcon name={item.name} className="h-5 w-5" />
                  </span>
                </button>

                {isHovered && (
                  <span className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded border grid-line bg-canvas px-2 py-0.5 font-mono text-[10px] text-ink shadow-md">
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};
