import React from 'react';
import { PROFILE } from '../data/portfolio';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="px-5 py-8 text-center sm:px-8">
        <p className="text-xs text-muted">
          Designed &amp; Developed by{' '}
          <strong className="font-medium text-ink">{PROFILE.fullName}</strong>
        </p>
        <p className="mt-1 font-mono text-[11px] text-muted/80">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
      <div aria-hidden="true" className="h-14 w-full border-t grid-line bg-footer-dots opacity-70" />
    </footer>
  );
};
