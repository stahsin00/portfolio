import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 50,
          background: open ? 'rgba(0,229,212,0.2)' : 'rgba(0,20,18,0.6)',
          border: `1.5px solid ${CYAN}`,
          clipPath: 'polygon(0 0, 75% 0, 100% 100%, 25% 100%)',
          width: '52px',
          height: '44px',
          cursor: 'pointer',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          filter: `drop-shadow(0 0 4px ${CYAN}88)`,
        }}
        className="md-hidden-toggle"
      >
        {/* Hamburger lines styled as HUD tick marks */}
        <svg width="22" height="16" viewBox="0 0 22 16">
          <line x1="0" y1="2" x2="22" y2="2" stroke={CYAN} strokeWidth="2" />
          <line x1="4" y1="8" x2="22" y2="8" stroke={CYAN} strokeWidth="2" opacity="0.7" />
          <line x1="8" y1="14" x2="22" y2="14" stroke={CYAN} strokeWidth="2" opacity="0.4" />
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
          marginLeft: '-28px',
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

        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-20px' }}>
          <NavLink to="/home" onClick={() => setOpen(false)}>Home</NavLink>
          <div style={{ marginLeft: '-28px' }}>
            <NavLink to="/projects" onClick={() => setOpen(false)}>Projects</NavLink>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .md-hidden-toggle { display: flex !important; }
          nav { display: ${open ? 'flex' : 'none'} !important; flex-direction: column !important; top: 68px !important; gap: 8px !important; }
          nav > div { margin-left: 0 !important; }
          nav > div > div { margin-left: 0 !important; }
        }
      `}</style>
    </>
  );
}

export default Nav;