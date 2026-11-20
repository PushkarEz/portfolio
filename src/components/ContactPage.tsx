import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Moon,
  Send,
  Sun,
} from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { HeroBanner } from './HeroBanner';
import { XLogo } from './TechIcons';

// Get your free Access Key at https://web3forms.com/ using pushkarshinde08@gmail.com
const WEB3FORMS_ACCESS_KEY = '19abc039-492a-465d-aec5-d0eac7561460';

interface ContactPageProps {
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ theme, onToggleTheme }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Portfolio message from ${name.trim()}`,
          from_name: 'Pushkar Portfolio',
          botcheck: false,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error('Failed');

      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="animate-hero-in border-b grid-line">
      <HeroBanner />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b grid-line px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3.5">
          <Link
            to="/"
            aria-label="Back to home"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border grid-line bg-surface text-muted transition-colors hover:border-ink/40 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-normal tracking-tight text-ink sm:text-3xl">
              Contact
            </h1>
            <p className="text-xs text-muted">
              Open for AI engineering collaborations, hackathons &amp; interesting builds.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border grid-line bg-surface text-muted transition-colors hover:border-ink/40 hover:text-ink"
        >
          {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="divide-y divide-grid-line">
        <div className="px-5 py-5 sm:px-8">
          <label
            htmlFor="contact-name"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 w-full bg-transparent text-sm text-ink placeholder:text-muted/50 focus:outline-none"
          />
        </div>

        <div className="px-5 py-5 sm:px-8">
          <label
            htmlFor="contact-email"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full bg-transparent text-sm text-ink placeholder:text-muted/50 focus:outline-none"
          />
        </div>

        <div className="px-5 py-5 sm:px-8">
          <label
            htmlFor="contact-message"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about the idea or project..."
            className="mt-2 w-full resize-none bg-transparent text-sm text-ink placeholder:text-muted/50 focus:outline-none"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-3 px-5 py-8 text-center sm:px-8">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-md border grid-line bg-surface px-5 py-2.5 text-xs font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink/40 hover:bg-subtle disabled:opacity-50"
          >
            {status === 'sent' ? (
              <>
                <Check className="h-3.5 w-3.5 text-accent" />
                <span>Message Sent!</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
              </>
            )}
          </button>

          {status === 'sent' && (
            <p className="text-xs text-muted">
              Thanks for reaching out—your note is on its way to{' '}
              <span className="font-mono text-ink">{PROFILE.email}</span>.
            </p>
          )}

          {status === 'error' && (
            <p className="text-xs text-muted">
              Could not submit via form right now.{' '}
              <a
                href={`mailto:${PROFILE.email}`}
                className="underline underline-offset-4 hover:text-ink"
              >
                Click here to open your email app directly
              </a>
              .
            </p>
          )}
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t grid-line px-5 py-6 sm:px-8">
        <div>
          <p className="text-xs text-muted">
            Find me on my <strong className="font-medium text-ink">socials</strong>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border grid-line bg-surface px-3 py-1.5 text-xs text-ink/90 hover:border-ink/40"
            >
              <Github className="h-3.5 w-3.5 text-muted" />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border grid-line bg-surface px-3 py-1.5 text-xs text-ink/90 hover:border-ink/40"
            >
              <XLogo className="h-3 w-3 text-muted" />
              <span>Twitter</span>
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border grid-line bg-surface px-3 py-1.5 text-xs text-ink/90 hover:border-ink/40"
            >
              <Linkedin className="h-3.5 w-3.5 text-muted" />
              <span>LinkedIn</span>
            </a>
            {PROFILE.socials.instagramEnabled ? (
              <a
                href={PROFILE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border grid-line bg-surface px-3 py-1.5 text-xs text-ink/90 hover:border-ink/40"
              >
                <Instagram className="h-3.5 w-3.5 text-muted" />
                <span>Instagram</span>
              </a>
            ) : (
              <span
                title="Instagram coming soon"
                className="inline-flex items-center gap-1.5 rounded-md border grid-line bg-surface px-3 py-1.5 text-xs text-muted opacity-75"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram (Soon)</span>
              </span>
            )}
          </div>
        </div>

        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>{PROFILE.email}</span>
        </a>
      </div>
    </section>
  );
};