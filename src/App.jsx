import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
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
      <About />
      <MeetTheGirls />
      <Events />
      <Merch />
      <JoinTeam />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
