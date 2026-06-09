import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import SocialButton from './SocialButton';

const CYAN = '#00e5d4';

function NavLink({ to, children, onClick }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link to={to} onClick={onClick} style={{ textDecoration: 'none' }}>
      <div
        style={{
          position: 'relative',
          padding: '10px 32px 10px 24px',
          background: active ? 'rgba(0,125,115,0.55)' : 'rgba(0,20,18,0.55)',
          clipPath: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)',
          cursor: 'pointer',
          transition: 'background 0.2s',
          minWidth: '140px',
          textAlign: 'center',
        }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(0,125,115,0.55)'; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'rgba(0,20,18,0.55)'; }}
      >
        {/* Border SVG */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="nav-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <polygon
            points="0,0 80,0 100,40 20,40"
            fill="none"
            stroke={CYAN}
            strokeWidth={active ? '2' : '1'}
            opacity={active ? '1' : '0.6'}
            filter={active ? 'url(#nav-glow)' : undefined}
          />
          {/* Active indicator bar at bottom */}
          {active && (
            <line x1="20" y1="39" x2="100" y2="39" stroke={CYAN} strokeWidth="2.5" filter="url(#nav-glow)" />
          )}
        </svg>

        <span style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'monospace',
          fontSize: '15px',
          fontWeight: active ? 'bold' : 'normal',
          color: active ? CYAN : `rgba(0,229,212,0.75)`,
          letterSpacing: '3px',
          filter: active ? `drop-shadow(0 0 5px ${CYAN})` : 'none',
        }}>
          {children.toUpperCase()}
        </span>
      </div>
    </Link>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div 
        id="mobile-nav-overlay"
        className="fixed md:hidden"
        style={{
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100dvh',
          background: 'rgba(0,20,18,0.55)',
          zIndex: 49,
        }}>
      </div>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: 50,
          background: open ? 'rgba(0,229,212,0.2)' : 'rgba(0,20,18,0.6)',
          borderBottom: `1.5px solid #00e5d4`,
          clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0% 100%)',
          width: '100px',
          height: '33px',
          cursor: 'pointer',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          filter: `drop-shadow(0 0 4px #00e5d488)`,
        }}
        className="md-hidden-toggle"
      >
        {/* Hamburger lines styled as HUD tick marks */}
        <div
          style={{
            position: 'absolute',
            left: '22px',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#00e5d4',
            letterSpacing: '2px',
            opacity: 0.9,
          }}
        >
          MENU
        </div>
        <svg width="100" height="33" style={{ position: 'absolute', right: '0px' }}>
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="122"
            stroke="#00e5d4"
            strokeWidth="3.5"
            filter="url(#hud-glow)"
          />
        </svg>
      </button>

      {/* Nav */}
      <nav
        style={{
          position: 'fixed',
          top: '16px',
          left: '50px',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'row',
          gap: '-28px',
        }}
      >
        {/* Corner accent */}
        {/* <div style={{
          position: 'absolute',
          top: '-4px',
          left: '0px',
          pointerEvents: 'none',
          zIndex: 51,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <polyline points="0,12 0,0 12,0" fill="none" stroke={CYAN} strokeWidth="2" style={{ filter: `drop-shadow(0 0 3px ${CYAN})` }} />
          </svg>
        </div> */}

        <div className="flex-col md:flex-row" style={{ display: 'flex', marginLeft: '-20px' }}>
          <NavLink to="/home" onClick={() => setOpen(false)}>Home</NavLink>
          <div className="ml-0 md:ml-{-28px} mt-3 md:mt-0">
            <NavLink to="/projects" onClick={() => setOpen(false)}>Projects</NavLink>
          </div>
        </div>
      </nav>

      <div 
        id="socials"
        className="fixed bottom-[16px] left-[16px] block md:hidden"
        style={{ zIndex: 51, }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px', }}>
            <SocialButton href="https://www.linkedin.com/in/shushama-tahsin-2b8124255/"><FaLinkedin size={22} /></SocialButton>
            <SocialButton href="https://github.com/stahsin00"><FaGithub size={22} /></SocialButton>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .md-hidden-toggle { display: flex !important; }
          nav { display: ${open ? 'flex' : 'none'} !important; flex-direction: column !important; top: 68px !important; gap: 8px !important; }
          #socials { display: ${open ? 'block' : 'none'} !important; }
          nav > div { margin-left: 0 !important; }
          nav > div > div { margin-left: 0 !important; }
          #mobile-nav-overlay { display: ${open ? 'block' : 'none'} !important;
        }
      `}</style>
    </>
  );
}

export default Nav;