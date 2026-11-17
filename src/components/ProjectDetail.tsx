import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { ProjectPreviewGraphic } from './ProjectPreviews';
import { ProjectInteractiveWalkthrough } from './ProjectDemos';
import { NotFound } from './NotFound';
import { TechBrandIcon } from './TechIcons';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!project) {
    return <NotFound message="That project route does not exist." />;
  }

  return (
    <article className="animate-hero-in border-b grid-line px-5 py-10 sm:px-8 sm:py-14">
      <Link
        to="/#projects"
        className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>Back to Projects</span>
      </Link>

      <header className="mt-8 border-b grid-line pb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span>{project.status}</span>
          <span>·</span>
          <span>{project.category}</span>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {project.description}
        </p>

        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-xs font-medium text-canvas transition-opacity hover:opacity-85"
              >
                <span>Open Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border grid-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-ink/40"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </header>

      <div className="mt-8 overflow-hidden rounded-lg border grid-line">
        <ProjectPreviewGraphic project={project} />
      </div>

      <div className="mt-6">
        <ProjectInteractiveWalkthrough project={project} />
      </div>

      <div className="mt-10 grid gap-8 border-b grid-line pb-10 md:grid-cols-2">
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Problem Addressed
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.problem}</p>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Proposed Solution
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.solution}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 border-b grid-line pb-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Features &amp; Explored Capabilities
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink/85">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Technology Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded border grid-line bg-surface px-2.5 py-1 font-mono text-xs text-ink"
              >
                <TechBrandIcon name={tech} className="h-3.5 w-3.5 text-muted" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-b grid-line pb-10">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Development Approach
        </h2>
        <ol className="mt-4 space-y-2.5 text-sm text-ink/85">
          {project.approach.map((step, i) => (
            <li key={step} className="flex items-start gap-3">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            What I Learned
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/85">
            {project.learned.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Challenges &amp; Limitations
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {project.limitations.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
