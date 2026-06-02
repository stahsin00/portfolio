import { useState, useEffect, useRef } from 'react';
import projects from '../data/projects.json';
import { FaGithub, FaExternalLinkAlt, FaItchIo } from 'react-icons/fa';

const CYAN = '#00e5d4';

function PanelSVGFrame({ width, height }) {
  const cut = 24;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <defs>
        <filter id="hud-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main border */}
      <polygon
        points={`${cut},0 ${width - cut},0 ${width},${cut} ${width},${height - cut} ${width - cut},${height} ${cut},${height} 0,${height - cut} 0,${cut}`}
        fill="none"
        stroke={CYAN}
        strokeWidth="2"
      />

      {/* Corner accents */}
      {[
        [[0, 56], [0, cut], [cut, 0], [80, 0]],
        [[width, 56], [width, cut], [width - cut, 0], [width - 80, 0]],
        [[0, height - 56], [0, height - cut], [cut, height], [80, height]],
        [[width, height - 56], [width, height - cut], [width - cut, height], [width - 80, height]],
      ].map((corners, i) => (
        <polyline
          key={i}
          points={corners.map(p => p.join(',')).join(' ')}
          fill="none"
          stroke={CYAN}
          strokeWidth="3.5"
          filter="url(#hud-glow)"
        />
      ))}

      {/* Tick marks */}
      <line x1="0" y1="72" x2="0" y2="60" stroke={CYAN} strokeWidth="1.5" opacity="0.5" />
      <line x1="96" y1="0" x2="82" y2="0" stroke={CYAN} strokeWidth="1.5" opacity="0.5" />
      <line x1={width} y1="72" x2={width} y2="60" stroke={CYAN} strokeWidth="1.5" opacity="0.5" />
      <line x1={width - 96} y1="0" x2={width - 82} y2="0" stroke={CYAN} strokeWidth="1.5" opacity="0.5" />
      <line x1="96" y1={height} x2="82" y2={height} stroke={CYAN} strokeWidth="1.5" opacity="0.5" />
      <line x1={width - 96} y1={height} x2={width - 82} y2={height} stroke={CYAN} strokeWidth="1.5" opacity="0.5" />

      {/* Header bar background */}
      <polygon
        points={`${cut},0 ${width * 0.65},0 ${width * 0.65 + 26},26 ${width},26 ${width},0 ${width - cut},0`}
        fill="rgba(0, 229, 212, 0.08)"
        opacity="0.9"
      />
      <line x1="0" y1="42" x2={width} y2="42" stroke={CYAN} strokeWidth="0.75" opacity="0.4" />

      {/* Diagonal hash marks */}
      {[0, 12, 24].map((offset, i) => (
        <line
          key={i}
          x1={width * 0.65 + offset}
          y1="0"
          x2={width * 0.65 + offset + 18}
          y2="18"
          stroke={CYAN}
          strokeWidth="2.5"
          opacity="0.7"
          filter="url(#hud-glow)"
        />
      ))}

      {/* Header dot */}
      <rect x="36" y="8" width="10" height="10" fill={CYAN} opacity="0.9" />

      {/* Bottom divider */}
      <line x1="0" y1={height - 42} x2={width} y2={height - 42} stroke={CYAN} strokeWidth="0.75" opacity="0.2" />

      {/* Bottom corner circuits */}
      <polyline points={`${cut},${height} ${cut},${height - 14} ${cut + 20},${height - 14}`} fill="none" stroke={CYAN} strokeWidth="0.75" opacity="0.35" />
      <polyline points={`${width - cut},${height} ${width - cut},${height - 14} ${width - cut - 20},${height - 14}`} fill="none" stroke={CYAN} strokeWidth="0.75" opacity="0.35" />
    </svg>
  );
}

function HUDButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'rgba(0,229,212,0.08)',
        border: 'none',
        padding: '14px 36px',
        cursor: 'pointer',
        clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
        color: CYAN,
        fontFamily: 'monospace',
        fontSize: '16px',
        letterSpacing: '2px',
        transition: 'background 0.2s',
        outline: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.15)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.08)')}
    >
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 40" preserveAspectRatio="none">
        <polygon points="10,0 100,0 90,40 0,40" fill="none" stroke={CYAN} strokeWidth="1.5" filter="url(#hud-glow)" />
      </svg>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
}

function LinkButton({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 22px',
        background: 'rgba(0,229,212,0.08)',
        border: `1px solid ${CYAN}`,
        clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
        color: CYAN,
        fontFamily: 'monospace',
        fontSize: '13px',
        letterSpacing: '1.5px',
        textDecoration: 'none',
        transition: 'background 0.2s',
        filter: 'drop-shadow(0 0 4px #00e5d480)',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.18)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.08)')}
    >
      <Icon size={18} />
      {label}
    </a>
  );
}

// Breakpoints
const BREAKPOINTS = {
  sm: 480,
  md: 720,
  lg: 960,
};

function useContainerWidth(ref) {
  const [width, setWidth] = useState(1100);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(entries => {
      setWidth(Math.round(entries[0].contentRect.width));
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return width;
}

function Carousel() {
  const [curIndex, setCurIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [dims, setDims] = useState({ width: 1100, height: 560 });
  const containerRef = useRef(null);
  const outerRef = useRef(null);

  const containerWidth = useContainerWidth(outerRef);

  // Determine layout mode from container width
  const isMobile = containerWidth < BREAKPOINTS.sm;
  const isTablet = containerWidth >= BREAKPOINTS.sm && containerWidth < BREAKPOINTS.md;
  const isSmallDesktop = containerWidth >= BREAKPOINTS.md && containerWidth < BREAKPOINTS.lg;
  const isLargeDesktop = containerWidth >= BREAKPOINTS.lg;

  // Stack vertically on mobile + tablet; side-by-side on larger screens
  const isStacked = isMobile || isTablet;

  const featuredProjects = projects.filter(p => p.featured === 'true');
  const project = featuredProjects[curIndex];

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => onRightClick(), 5000);
      return () => clearInterval(interval);
    }
  }, [curIndex, isHovering]);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ width: Math.round(width), height: Math.round(height) });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const onRightClick = () => setCurIndex(prev => (prev + 1) % featuredProjects.length);
  const onLeftClick = () => setCurIndex(prev => (prev - 1 + featuredProjects.length) % featuredProjects.length);

  const hasLinks = project.github || project.link || project.itch;

  // Responsive font sizes
  const titleFontSize = isMobile ? '15px' : isTablet ? '17px' : '20px';
  const descFontSize = isMobile ? '13px' : '15px';
  const headerFontSize = isMobile ? '11px' : '14px';
  const headerLetterSpacing = isMobile ? '2px' : '4px';

  // Nav button padding
  const btnPadding = isMobile ? '10px 20px' : '14px 36px';
  const btnFontSize = isMobile ? '13px' : '16px';

  // Body padding
  const bodyPadding = isMobile
    ? '12px 14px 8px'
    : isTablet
    ? '14px 20px 10px'
    : '16px 28px 12px';

  // Image max height
  const imageMaxHeight = isMobile ? '200px' : isTablet ? '280px' : '420px';

  // Gap in side-by-side mode
  const sideBySideGap = isSmallDesktop ? 20 : 28;

  return (
    <div
      ref={outerRef}
      style={{ width: '92%', margin: '0 auto', padding: isMobile ? '0 8px' : '0 24px' }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          background: 'rgba(0, 20, 18, 0.45)',
          clipPath: 'polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0% calc(100% - 24px), 0% 24px)',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <PanelSVGFrame width={dims.width} height={dims.height} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '8px 36px' : '8px 56px',
          height: '42px',
        }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: headerFontSize,
            color: CYAN,
            letterSpacing: headerLetterSpacing,
            opacity: 0.9,
          }}>
            FEATURED PROJECTS
          </span>
          {!isMobile && (
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: CYAN,
              opacity: 0.45,
              letterSpacing: '2px',
            }}>
              SYS.PORT//4821
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{
          display: 'flex',
          flexDirection: isStacked ? 'column' : 'row',
          padding: bodyPadding,
          gap: isStacked ? '14px' : 0,
        }}>

          {/* Screenshot */}
          <div style={{
            flex: isStacked ? 'none' : '0 0 54%',
            position: 'relative',
          }}>
            <div style={{
              border: `1.5px solid ${CYAN}`,
              opacity: 0.85,
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              overflow: 'hidden',
              background: '#060d10',
            }}>
              <img
                src={`/assets/${project.image}`}
                alt={project.name}
                style={{
                  width: '100%',
                  display: 'block',
                  imageRendering: project.pixelated ? 'pixelated' : 'auto',
                  maxHeight: imageMaxHeight,
                  objectFit: 'cover',
                }}
              />
            </div>
            {/* Corner accents on image */}
            {[
              { top: 0, left: 0, borderTop: `3px solid ${CYAN}`, borderLeft: `3px solid ${CYAN}`, width: 20, height: 20 },
              { bottom: 0, right: 0, borderBottom: `3px solid ${CYAN}`, borderRight: `3px solid ${CYAN}`, width: 20, height: 20 },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', ...s, filter: `drop-shadow(0 0 4px ${CYAN})` }} />
            ))}
          </div>

          {/* Divider — horizontal line in stacked, vertical in side-by-side */}
          {isStacked ? (
            <div style={{ height: '1px', background: CYAN, opacity: 0.2, margin: '0 4px' }} />
          ) : (
            <div style={{ width: '1px', background: CYAN, opacity: 0.2, margin: `0 ${sideBySideGap}px`, flexShrink: 0 }} />
          )}

          {/* Info panel */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '10px' : '16px',
            minWidth: 0,
          }}>

            {/* Title block */}
            <div style={{
              background: 'rgba(0, 229, 212, 0.08)',
              border: `1px solid rgba(0,229,212,0.5)`,
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              padding: isMobile ? '10px 14px' : '14px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: CYAN,
                  boxShadow: `0 0 8px ${CYAN}`,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: titleFontSize,
                  fontWeight: 'bold',
                  color: CYAN,
                  letterSpacing: '2px',
                  filter: `drop-shadow(0 0 5px ${CYAN})`,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {project.name.toUpperCase()}
                </span>
              </div>
              <div style={{ height: '0.5px', background: CYAN, opacity: 0.4, marginBottom: '10px' }} />
              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.techStack.map(tech => (
                  <span key={tech} style={{
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '10px' : '11px',
                    color: CYAN,
                    background: 'rgba(0,229,212,0.12)',
                    border: `0.5px solid rgba(0,229,212,0.4)`,
                    padding: '3px 9px',
                    letterSpacing: '0.5px',
                  }}>
                    {tech.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: '#8ee8df',
                letterSpacing: '1px',
                marginBottom: '8px',
                opacity: 0.8,
              }}>
                // PROJECT DESCRIPTION
              </div>
              <p style={{
                fontFamily: 'sans-serif',
                fontSize: descFontSize,
                color: '#c8eae8',
                lineHeight: '1.7',
                margin: 0,
              }}>
                {project.description}
              </p>
            </div>

            {/* Links — dynamic */}
            {hasLinks && (
              <div>
                <div style={{ height: '0.5px', background: CYAN, opacity: 0.15, marginBottom: '10px' }} />
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#8ee8df',
                  letterSpacing: '1px',
                  marginBottom: '10px',
                  opacity: 0.8,
                }}>
                  // LINKS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {project.github && <LinkButton href={project.github} icon={FaGithub} label="SOURCE CODE" />}
                  {project.link && <LinkButton href={project.link} icon={FaExternalLinkAlt} label="LIVE DEMO" />}
                  {project.itch && <LinkButton href={project.itch} icon={FaItchIo} label="ITCH.IO" />}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '12px' : '24px',
          padding: isMobile ? '10px 14px 16px' : '14px 28px 22px',
        }}>
          <button
            onClick={onLeftClick}
            style={{
              position: 'relative',
              background: 'rgba(0,229,212,0.08)',
              border: 'none',
              padding: btnPadding,
              cursor: 'pointer',
              clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
              color: CYAN,
              fontFamily: 'monospace',
              fontSize: btnFontSize,
              letterSpacing: '2px',
              transition: 'background 0.2s',
              outline: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.08)')}
          >
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 40" preserveAspectRatio="none">
              <polygon points="10,0 100,0 90,40 0,40" fill="none" stroke={CYAN} strokeWidth="1.5" />
            </svg>
            <span style={{ position: 'relative', zIndex: 1 }}>‹ PREV</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurIndex(i)}
                  style={{ border: 'none', cursor: 'pointer', padding: 0, background: 'none' }}
                >
                  {i === curIndex ? (
                    <div style={{
                      width: isMobile ? '20px' : '28px',
                      height: isMobile ? '7px' : '9px',
                      background: CYAN,
                      borderRadius: '4.5px',
                      boxShadow: `0 0 8px ${CYAN}`,
                    }} />
                  ) : (
                    <div style={{
                      width: isMobile ? '7px' : '9px',
                      height: isMobile ? '5px' : '7px',
                      background: CYAN,
                      borderRadius: '3px',
                      opacity: 0.25,
                    }} />
                  )}
                </button>
              ))}
            </div>
            {!isMobile && (
              <span style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: CYAN,
                opacity: 0.4,
                letterSpacing: '2px',
              }}>
                {String(curIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
              </span>
            )}
          </div>

          <button
            onClick={onRightClick}
            style={{
              position: 'relative',
              background: 'rgba(0,229,212,0.08)',
              border: 'none',
              padding: btnPadding,
              cursor: 'pointer',
              clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
              color: CYAN,
              fontFamily: 'monospace',
              fontSize: btnFontSize,
              letterSpacing: '2px',
              transition: 'background 0.2s',
              outline: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,229,212,0.08)')}
          >
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 40" preserveAspectRatio="none">
              <polygon points="10,0 100,0 90,40 0,40" fill="none" stroke={CYAN} strokeWidth="1.5" />
            </svg>
            <span style={{ position: 'relative', zIndex: 1 }}>NEXT ›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;