import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import SectionDivider from './components/SectionDivider';
import Footer from './components/Footer';
import Events from './pages/Events';
import JoinTeam from './pages/JoinTeam';
import MeetTheGirls from './pages/MeetTheGirls';
import Merch from './pages/Merch';
import About from './pages/About';
import './App.css';

function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider color="teal" />
      <About />
      <SectionDivider color="pink" />
      <MeetTheGirls />
      <SectionDivider color="purple" />
      <Events />
      <SectionDivider color="teal" />
      <Merch />
      <SectionDivider color="pink" />
      <JoinTeam />
      <Footer />
    </>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Router>
      <div className="app">
        <CustomCursor />
        <AnimatePresence mode="wait">
          {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
        </AnimatePresence>
        {loaded && (
          <>
            <ScrollProgress />
            <Nav />
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
