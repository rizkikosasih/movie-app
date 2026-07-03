import { Link } from 'react-router-dom';
import { Search, Film } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './themeToggle';
import { useUiStore } from '@/domain/store/useUiStore';

export const Header = () => {
  const { setIsSearchOpen } = useUiStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/40 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800/40 dark:bg-[#050505]/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo Branding */}
        <Link to="/" className="flex items-center gap-2 group">
          <Film className="h-6 w-6 text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cine<span className="text-amber-600 dark:text-amber-400">Gallery</span>
          </span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Open Search"
          >
            <Search className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
