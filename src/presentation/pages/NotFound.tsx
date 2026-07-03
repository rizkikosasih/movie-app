import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, AlertCircle } from 'lucide-react';
import Layout from '../components/layout';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md space-y-6"
        >
          {/* Animated 404 Icon / Artwork */}
          <div className="flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 shadow-xl border border-amber-500/20">
              <AlertCircle className="h-12 w-12" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            </div>
          </div>

          <h1 className="font-serif text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            404
          </h1>
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Halaman yang Anda cari mungkin telah dihapus, berganti nama, atau sedang tidak
            tersedia saat ini. Silakan periksa kembali tautan Anda atau kembali ke halaman
            beranda.
          </p>

          <div className="pt-4 flex justify-center">
            <Button
              onClick={() => navigate('/')}
              className="bg-amber-500 dark:bg-amber-400 text-black hover:bg-amber-600 dark:hover:bg-amber-500 font-semibold gap-2 px-6 py-2.5 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <HomeIcon className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
