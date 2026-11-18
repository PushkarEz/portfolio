import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PROJECTS, ProjectCategory } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './MotionPrimitives';

const CATEGORIES: ProjectCategory[] = ['All', 'AI & Security', 'Voice & RAG', 'Learning'];

export const ProjectGrid: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const visible =
    filter === 'All' && !showAll ? filtered.slice(0, 4) : filtered;

  return (
    <section id="projects" className="scroll-mt-16 border-b grid-line">
      {/* Consistent Section Header matching Skills / Journey / GitHub */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b grid-line px-5 py-4 sm:px-8">
        <h2 className="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
          Projects
        </h2>

        <div className="flex flex-wrap items-center gap-4" role="tablist" aria-label="Filter projects">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[11px] transition-colors ${
                filter === cat
                  ? 'text-ink underline underline-offset-4'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Compact 2-Column Project Cards */}
      <div className="p-4 sm:p-6">
        <div key={`${filter}-${showAll}`} className="animate-hero-in grid gap-4 md:grid-cols-2">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={index * 65}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* View More / Show Less Toggle for 5th Project (EV Parking System) */}
        {filter === 'All' && PROJECTS.length > 4 && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded border grid-line bg-surface px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-ink/40 hover:bg-subtle"
            >
              <span>{showAll ? 'Show Less' : `View More (${PROJECTS.length - 4})`}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-muted transition-transform duration-200 ${
                  showAll ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
