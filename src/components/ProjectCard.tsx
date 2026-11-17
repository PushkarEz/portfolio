import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Globe } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';
import { ProjectPreviewGraphic } from './ProjectPreviews';

const STATUS_DOT_COLOR: Record<ProjectItem['status'], string> = {
  Live: 'bg-emerald-500',
  Experimental: 'bg-violet-400',
  'In Progress': 'bg-sky-400',
  Learning: 'bg-amber-400',
};

export const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  return (
    <article className="group flex flex-col justify-between rounded-none border grid-line bg-canvas p-4 transition-colors duration-200 hover:bg-surface/60">
      <div>
        <Link
          to={`/projects/${project.slug}`}
          className="block overflow-hidden rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <ProjectPreviewGraphic project={project} />
          </div>
        </Link>

        {/* Title & Status Dot matching samworks.vercel.app */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            to={`/projects/${project.slug}`}
            className="text-lg font-semibold tracking-tight text-ink transition-opacity hover:opacity-80"
          >
            {project.shortTitle}
          </Link>

          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_COLOR[project.status]}`} />
            <span>{project.status}</span>
          </span>
        </div>

        <p className="mt-0.5 text-xs text-muted">{project.subtitle}</p>

        <p className="mt-2.5 text-[13px] leading-relaxed text-ink/80">{project.description}</p>
      </div>

      {/* Bottom Row: Compact Tech Pills (left) + Globe & GitHub icons (right) */}
      <div className="mt-5 flex items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded border grid-line bg-surface px-2 py-0.5 text-[11px] text-ink/85"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.shortTitle} live demo`}
              title="Live Demo"
              className="text-muted transition-colors hover:text-ink"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.shortTitle} GitHub repository`}
              title="GitHub Repository"
              className="text-muted transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
