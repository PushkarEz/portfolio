import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC<{ message?: string }> = ({
  message = "The page you're looking for doesn't exist.",
}) => {
  return (
    <section className="py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">404</p>
      <h1 className="mt-2 font-serif text-4xl font-normal text-ink">Page not found.</h1>
      <p className="mt-3 text-sm text-muted">{message}</p>
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-ink/40"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Portfolio</span>
      </Link>
    </section>
  );
};
