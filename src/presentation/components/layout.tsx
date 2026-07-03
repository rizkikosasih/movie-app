import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-zinc-900 dark:bg-[#050505] dark:text-zinc-100 font-sans transition-colors duration-300">
      <Header />
      <main className="flex-1 pb-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
