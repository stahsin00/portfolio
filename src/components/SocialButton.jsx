import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const CYAN = '#00e5d4';

function SocialButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        position: 'relative',
        background: 'rgba(0,20,18,0.55)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)',
        color: `rgba(0,229,212,0.75)`,
        textDecoration: 'none',
        transition: 'background 0.2s, color 0.2s',
        filter: `drop-shadow(0 0 4px ${CYAN}66)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(0,125,115,0.55)';
        e.currentTarget.style.color = CYAN;
        e.currentTarget.style.filter = `drop-shadow(0 0 6px ${CYAN}aa)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(0,20,18,0.55)';
        e.currentTarget.style.color = `rgba(0,229,212,0.75)`;
        e.currentTarget.style.filter = `drop-shadow(0 0 4px ${CYAN}66)`;
      }}
    >
      {/* Border SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 48 48"
      >
        <defs>
          <filter id="social-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <polygon
          points="0,0 48,0 48,36 36,48 0,48"
          fill="none"
          stroke={CYAN}
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Corner accent */}
        <polyline
          points="48,36 36,48"
          fill="none"
          stroke={CYAN}
          strokeWidth="2"
          opacity="0.9"
          filter="url(#social-glow)"
        />
      </svg>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </a>
  );
}

export default SocialButton;