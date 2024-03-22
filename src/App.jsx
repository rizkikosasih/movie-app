import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';

const App = () => {
  return (
    <main className="bg-blue-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
