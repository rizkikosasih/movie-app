import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/presentation/pages/Home';
import Explore from '@/presentation/pages/Explore';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:category" element={<Explore />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
