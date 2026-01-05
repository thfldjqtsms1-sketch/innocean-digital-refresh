import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Planning from './pages/Planning';
import Brand from './pages/Brand';
import Location from './pages/Location';
import Contact from './pages/Contact';
import View from './pages/View';
import Interior from './pages/Interior';
import Amenity from './pages/Amenity';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <CustomCursor />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/view" element={<View />} />
          <Route path="/interior" element={<Interior />} />
          <Route path="/amenity" element={<Amenity />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
