import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Copy, Search, X } from 'lucide-react';
import { PROFILE, PROJECTS } from '../data/portfolio';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const items = useMemo(() => {
    const pages = [
      { id: 'pg-home', label: 'Home', group: 'Page', action: () => navigate('/') },
      { id: 'pg-contact', label: 'Contact & Message Form', group: 'Page', action: () => navigate('/contact') },
      { id: 'sec-projects', label: 'Projects', group: 'Section', action: () => navigate('/#projects') },
      { id: 'sec-stack', label: 'Tech Stack', group: 'Section', action: () => navigate('/#stack') },
      { id: 'sec-journey', label: 'Journey & Milestones', group: 'Section', action: () => navigate('/#journey') },
      { id: 'sec-github', label: 'GitHub Activity', group: 'Section', action: () => navigate('/#github') },
    ];

    const projectLinks = PROJECTS.map((p) => ({
      id: `proj-${p.slug}`,
      label: p.shortTitle,
      group: 'Project',
      action: () => navigate(`/projects/${p.slug}`),
    }));

    const external = [
      {
        id: 'ext-resume',
        label: 'Open Resume PDF',
        group: 'Link',
        external: true,
        action: () => window.open(PROFILE.resumeUrl, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'ext-github',
        label: 'GitHub (@PushkarEz)',
        group: 'Link',
        external: true,
        action: () => window.open(PROFILE.socials.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'act-copy-email',
        label: copied ? 'Email copied' : `Copy email (${PROFILE.email})`,
        group: 'Action',
        isCopy: true,
        action: () => {
          navigator.clipboard.writeText(PROFILE.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        },
      },
    ];

    const all = [...pages, ...projectLinks, ...external];
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      (item) => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    );
  }, [query, navigate, copied]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-lg border grid-line bg-canvas shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b grid-line px-4 py-3">
          <Search className="h-4 w-4 text-muted" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a project, page, or link..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-1.5">
          {items.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-muted">No matches.</p>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  item.action();
                  if (!('isCopy' in item)) onClose();
                }}
                className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-surface focus:bg-surface focus:outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {item.group}
                  </span>
                  <span>{item.label}</span>
                </div>
                {'isCopy' in item ? (
                  copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-muted" />
                ) : 'external' in item ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5 text-muted" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
