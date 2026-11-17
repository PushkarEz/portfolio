import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'top' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'stack' },
  { label: 'Journey', id: 'journey' },
  { label: 'GitHub', id: 'github' },
  { label: 'Contact', id: '/contact', isRoute: true },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('top');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/contact') {
      setActiveId('/contact');
      return;
    }
    if (location.pathname !== '/') {
      setActiveId(location.pathname.startsWith('/projects') ? 'projects' : '');
      return;
    }

    const sectionIds = ['projects', 'stack', 'journey', 'github'];
    const handleScroll = () => {
      const y = window.scrollY + 140;
      if (window.scrollY < 160) {
        setActiveId('top');
        return;
      }
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= y) {
          setActiveId(sectionIds[i]);
          return;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNav = (item: (typeof NAV_ITEMS)[number]) => {
    setMobileOpen(false);
    if (item.isRoute) {
      navigate(item.id);
      return;
    }
    if (location.pathname !== '/') {
      navigate(item.id === 'top' ? '/' : `/#${item.id}`);
      return;
    }
    if (item.id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(item.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-40 border-b grid-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between border-x grid-line px-4 py-3 sm:px-6">
        <Link
          to="/"
          onClick={() => handleNav(NAV_ITEMS[0])}
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-ink transition-opacity hover:opacity-75"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded border grid-line bg-surface font-serif text-sm">
            P
          </span>
          <span>{PROFILE.brandMark}</span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <nav className="flex items-center gap-4" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item)}
                  className={`link-underline py-0.5 text-xs transition-colors focus:outline-none ${
                    isActive ? 'font-medium text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-7 w-7 items-center justify-center rounded border grid-line bg-surface text-muted transition-colors hover:border-ink/40 hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-8 w-8 items-center justify-center rounded border grid-line bg-surface text-muted"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded border grid-line bg-surface text-ink"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t grid-line bg-canvas px-4 py-4 md:hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item)}
                className={`rounded border grid-line px-3 py-2 text-left text-xs transition-colors ${
                  activeId === item.id ? 'bg-surface font-medium text-ink' : 'text-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
