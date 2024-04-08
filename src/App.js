import './App.css';
import Nav from './components/Nav';
import Socials from './components/Socials';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import { BrowserRouter, Route, Routes, } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
            <Route path='/portfolio/' element={<About />} exact/>
            <Route path='/portfolio/projects' element={<Projects />} />
            <Route path='/portfolio/resume' element={<Resume />} />
          </Routes>
      </BrowserRouter>
      <Socials />
    </>
  );
}

export default App;
