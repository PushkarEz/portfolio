import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { TechStack } from './components/TechStack';
import { GitHubActivity } from './components/GitHubActivity';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ClosingQuote } from './components/ClosingQuote';
import { Footer } from './components/Footer';
import { ContactPage } from './components/ContactPage';
import { ProjectDetail } from './components/ProjectDetail';
import { NotFound } from './components/NotFound';

const INDEX_ITEMS = [
  { label: 'Overview', id: 'top' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'stack' },
  { label: 'Journey', id: 'journey' },
  { label: 'GitHub', id: 'github' },
  { label: 'Quotes', id: 'quotes' },
];

const SideIndexRail: React.FC = () => {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 180) {
        setActive('top');
        return;
      }
      const y = window.scrollY + 180;
      for (let i = INDEX_ITEMS.length - 1; i >= 1; i--) {
        const el = document.getElementById(INDEX_ITEMS[i].id);
        if (el && el.offsetTop <= y) {
          setActive(INDEX_ITEMS[i].id);
          return;
        }
      }
      setActive('top');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside aria-label="Page index" className="fixed right-6 top-28 hidden w-36 xl:block">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">INDEX</p>
      <ul className="mt-4 space-y-2.5 text-xs">
        {INDEX_ITEMS.map((item) => {
          const isCurrent = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => jump(item.id)}
                className={`flex items-center gap-2 transition-colors ${
                  isCurrent ? 'font-medium text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all ${
                    isCurrent ? 'w-3 bg-ink' : 'w-0 bg-transparent'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

const HashScrollHandler: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
};

interface PageControlsProps {
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const HomePage: React.FC<PageControlsProps> = ({ theme, onToggleTheme }) => (
  <>
    <SideIndexRail />
    <Hero theme={theme} onToggleTheme={onToggleTheme} />
    <ProjectGrid />
    <TechStack />
    <JourneyTimeline />
    <GitHubActivity />
    <ClosingQuote />
  </>
);

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const docWithVT = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!docWithVT.startViewTransition || prefersReduced) {
      setTheme(nextTheme);
      return;
    }

    const x = e ? e.clientX : window.innerWidth - 48;
    const y = e ? e.clientY : 48;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = docWithVT.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      const root = document.documentElement;
      if (nextTheme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 620,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <BrowserRouter>
      <HashScrollHandler />
      <div className="min-h-screen bg-canvas text-ink">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="mx-auto max-w-4xl border-x grid-line">
          <Routes>
            <Route
              path="/"
              element={<HomePage theme={theme} onToggleTheme={toggleTheme} />}
            />
            <Route
              path="/contact"
              element={<ContactPage theme={theme} onToggleTheme={toggleTheme} />}
            />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
