import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/presentation/pages/Home';
import Explore from '@/presentation/pages/Explore';
import MovieDetail from '@/presentation/pages/MovieDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:category" element={<Explore />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
