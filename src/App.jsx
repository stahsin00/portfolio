import Nav from './components/Nav';
import Socials from './components/Socials';
import About from './pages/About';
import Projects from './pages/Projects';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import './App.css'
import Contact from './pages/Contact';
import Home from './pages/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/portfolio/' element={<Projects />} exact/>
          <Route path='/portfolio/home' element={<Home />} />
          <Route path='/portfolio/about' element={<About />} />
          <Route path='/portfolio/projects' element={<Projects />} />
          <Route path='/portfolio/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
      <Socials />
    </>
  )
}

export default App
