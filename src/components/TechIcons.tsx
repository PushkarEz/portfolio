import React from 'react';

interface IconProps {
  className?: string;
}

export const XLogo: React.FC<IconProps> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const TechBrandIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'h-4 w-4',
}) => {
  switch (name) {
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M12 2c-3.2 0-3 1.4-3 1.4V6h6v1H7.5C5 7 4 8.7 4 11.5S5 16 7.5 16H9v-2.5c0-1.6 1.3-2.5 3-2.5h4c1.5 0 2.5-1 2.5-2.5V5c0-1.8-1.5-3-6.5-3Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22c3.2 0 3-1.4 3-1.4V18H9v-1h7.5c2.5 0 3.5-1.7 3.5-4.5S19 8 16.5 8H15v2.5c0 1.6-1.3 2.5-3 2.5H8c-1.5 0-2.5 1-2.5 2.5V19c0 1.8 1.5 3 6.5 3Z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10.5" cy="4.5" r="0.7" fill="currentColor" />
          <circle cx="13.5" cy="19.5" r="0.7" fill="currentColor" />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <path d="M10.5 10.5v5.2c0 1.1-.6 1.8-1.7 1.8-.6 0-1.1-.2-1.5-.6" strokeLinecap="round" />
          <path d="M14 16.3c.4.7 1.1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.4 0-.9-.7-1.2-1.8-1.6l-.5-.2c-.9-.3-1.4-.8-1.4-1.6 0-.9.8-1.6 1.8-1.6.8 0 1.4.3 1.7.9" strokeLinecap="round" />
        </svg>
      );

    case 'HTML':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3Z" strokeLinejoin="round" />
          <path d="M16 7.5H8l.3 4h7.3l-.4 4.2-3.2 1-3.2-1-.2-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'CSS':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3Z" strokeLinejoin="round" />
          <path d="M8 8h8l-.5 4H9m6.3 0-.3 3.7-3 1-3-1-.2-1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'NumPy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" strokeLinejoin="round" />
          <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" strokeLinejoin="round" />
        </svg>
      );

    case 'Pandas':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M7 4v16M12 6v5m0 4v3M17 4v16" strokeLinecap="round" />
        </svg>
      );

    case 'Ollama':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M8 8V4.5a1.5 1.5 0 0 1 2.7-.9L12 5.5l1.3-1.9A1.5 1.5 0 0 1 16 4.5V8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="6" y="8" width="12" height="12" rx="5" />
          <circle cx="9.8" cy="13" r="0.9" fill="currentColor" />
          <circle cx="14.2" cy="13" r="0.9" fill="currentColor" />
          <path d="M10.5 16c.5.5 2.5.5 3 0" strokeLinecap="round" />
        </svg>
      );

    case 'RAG':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M4 6h7v12H4zM13 6h7v5h-7zM13 13h7v5h-7z" strokeLinejoin="round" />
          <path d="M11 9h2m-2 6h2" strokeLinecap="round" />
        </svg>
      );

    case 'FAISS':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M7.6 7.6 10.4 10.4M16.4 7.6 13.6 10.4M7.6 16.4l2.8-2.8M16.4 16.4l-2.8-2.8" />
        </svg>
      );

    case 'Sentence Transformers':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M4 7h6m-6 5h10m-10 5h6" strokeLinecap="round" />
          <circle cx="17.5" cy="12" r="3.5" />
          <path d="M17.5 10.5v3m-1.5-1.5h3" strokeLinecap="round" />
        </svg>
      );

    case 'Groq API':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" strokeLinejoin="round" />
        </svg>
      );

    case 'Flask':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M9 3h6m-5 0v5.2L5.2 17.5A2 2 0 0 0 7 20.5h10a2 2 0 0 0 1.8-3L14 8.2V3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.2 14.5h9.6" strokeLinecap="round" />
        </svg>
      );

    case 'FastAPI':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12.8 6.5 8.5 13h3.3l-.6 4.5 4.3-6.5h-3.3l.6-4.5Z" strokeLinejoin="round" />
        </svg>
      );

    case 'REST APIs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M8 7 4 12l4 5M16 7l4 5-4 5M13.5 5.5l-3 13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'Supabase':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M13.2 21.1c-.5.6-1.5.2-1.5-.6V13H5.2c-.9 0-1.4-1-.9-1.7L12.8 2.9c.5-.6 1.5-.2 1.5.6V11h6.5c.9 0 1.4 1 .9 1.7l-8.5 8.4Z" strokeLinejoin="round" />
        </svg>
      );

    case 'Git':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="6" cy="18" r="2.2" />
          <circle cx="18" cy="9" r="2.2" />
          <path d="M6 8.2v7.6M8.2 6h5.3a2.5 2.5 0 0 1 2.5 2.5v.5" strokeLinecap="round" />
        </svg>
      );

    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'VS Code':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <path d="m17 3 4 2v14l-4 2-9-8.5L4.5 16 3 14.8 7 12 3 9.2 4.5 8 8 11.5 17 3Z" strokeLinejoin="round" />
        </svg>
      );

    case 'Postman':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-5 2-2 5 5-2 2-5Z" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
};
