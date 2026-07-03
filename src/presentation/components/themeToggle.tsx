import { useTheme } from '@/core/providers/themeProvider';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-10 w-10 rounded-full overflow-hidden hover:bg-zinc-200 dark:hover:bg-zinc-800"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
          animate={{ clipPath: 'circle(100% at 50% 50%)', opacity: 1 }}
          exit={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-zinc-850" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};
