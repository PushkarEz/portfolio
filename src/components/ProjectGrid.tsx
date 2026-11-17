import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, ProjectCategory } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectPreviewGraphic } from './ProjectPreviews';
import { Reveal } from './MotionPrimitives';

const CATEGORIES: ProjectCategory[] = ['All', 'AI & Security', 'Voice & RAG', 'Learning'];

export const ProjectGrid: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory>('All');

  const mainProjects = PROJECTS.filter((p) => p.showInMainGrid);
  const evParking = PROJECTS.find((p) => p.slug === 'ev-parking');
  const visible =
    filter === 'All' ? mainProjects : mainProjects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="scroll-mt-16 border-b grid-line">
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

      <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-2">
        {visible.map((project, index) => (
          <Reveal key={project.slug} delay={index * 75}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* Random-palette COEP EV Parking System Banner Card */}
      {evParking && (
        <div className="border-t grid-line p-4 sm:p-6">
          <Reveal delay={100}>
            <Link
              to={`/projects/${evParking.slug}`}
              className="group block border grid-line bg-canvas p-4 transition-colors hover:bg-surface/60"
            >
              <div className="overflow-hidden rounded-lg">
                <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                  <ProjectPreviewGraphic project={evParking} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold text-ink">
                    COEP Project Competition: {evParking.shortTitle}
                  </span>
                  <p className="mt-0.5 text-xs text-muted">{evParking.description}</p>
                </div>

                <span className="inline-flex items-center gap-1 font-mono text-xs text-ink">
                  <span>View Details</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      )}
    </section>
  );
};
