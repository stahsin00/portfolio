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
      <BrowserRouter basename='portfolio'>
        <Nav />
        <Routes>
            <Route path='/' element={<About />} exact/>
            <Route path='/projects' element={<Projects />} />
            <Route path='/resume' element={<Resume />} />
          </Routes>
      </BrowserRouter>
      <Socials />
    </>
  );
}

export default App;
