export const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-200/40 bg-zinc-50 dark:border-zinc-800/40 dark:bg-[#050505] py-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center text-center md:flex-row md:text-left md:justify-between gap-6">
        {/* Attribution TMDB */}
        <div className="flex flex-col items-center md:flex-row gap-4">
          <img
            src="/tmdb-logo.svg"
            alt="The Movie Database Logo"
            className="h-6 w-auto"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} CineGallery. Developed by Rizki Kosasih. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
