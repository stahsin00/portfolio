import Nav from './components/Nav';
import Socials from './components/Socials';
import About from './pages/About';
import Projects from './pages/Projects';
// import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Chat from './components/Chat';
import Contact from './pages/Contact';
import Home from './pages/Home';

function App() {

  return (
    <>
      
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Projects />} exact />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </HashRouter>
      <Socials />
      <Chat />
    </>
  )
}

export default App
