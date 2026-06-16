import React, { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaItchIo } from 'react-icons/fa';

const CYAN = '#00e5d4';

function useResizeDims() {
  const ref = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const entry = entries[0];
      let width, height;
      if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
        width = Math.round(entry.borderBoxSize[0].inlineSize);
        height = Math.round(entry.borderBoxSize[0].blockSize);
      } else {
        width = Math.round(entry.contentRect.width);
        height = Math.round(entry.contentRect.height);
      }
      setDims({ width, height });
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, dims];
}

function OctagonSVG({ width, height, cut, strokeWidth, strokeColor }) {
  if (!width || !height) return null;
  const s = strokeWidth / 2;
  const pts = [
    `${cut},${s}`,
    `${width - cut},${s}`,
    `${width - s},${cut}`,
    `${width - s},${height - cut}`,
    `${width - cut},${height - s}`,
    `${cut},${height - s}`,
    `${s},${height - cut}`,
    `${s},${cut}`,
  ].join(' ');
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} viewBox={`0 0 ${width} ${height}`}>
      <polygon points={pts} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
    </svg>
  );
}

function PanelFrame({ width, height, imageSectionHeight }) {
  if (!width || !height) return null;
  const cut = 14;
  const accent = 36;
  const tick = 52;
  const barH = 18;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
      <defs>
        <filter id="card-glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Main border */}
      <polygon
        points={`${cut},0 ${width-cut},0 ${width},${cut} ${width},${height-cut} ${width-cut},${height} ${cut},${height} 0,${height-cut} 0,${cut}`}
        fill="none" stroke={CYAN} strokeWidth="1.5"
      />

      {/* Corner accents */}
      <polyline points={`0,${accent} 0,${cut} ${cut},0 ${tick},0`} fill="none" stroke={CYAN} strokeWidth="2.5" filter="url(#card-glow)"/>
      <polyline points={`${width},${accent} ${width},${cut} ${width-cut},0 ${width-tick},0`} fill="none" stroke={CYAN} strokeWidth="2.5" filter="url(#card-glow)"/>
      <polyline points={`0,${height-accent} 0,${height-cut} ${cut},${height} ${tick},${height}`} fill="none" stroke={CYAN} strokeWidth="2.5" filter="url(#card-glow)"/>
      <polyline points={`${width},${height-accent} ${width},${height-cut} ${width-cut},${height} ${width-tick},${height}`} fill="none" stroke={CYAN} strokeWidth="2.5" filter="url(#card-glow)"/>

      {/* Tick marks */}
      <line x1={tick+12} y1="0" x2={tick+4} y2="0" stroke={CYAN} strokeWidth="1.5" opacity="0.5"/>
      <line x1={width-tick-12} y1="0" x2={width-tick-4} y2="0" stroke={CYAN} strokeWidth="1.5" opacity="0.5"/>
      <line x1={tick+12} y1={height} x2={tick+4} y2={height} stroke={CYAN} strokeWidth="1.5" opacity="0.5"/>
      <line x1={width-tick-12} y1={height} x2={width-tick-4} y2={height} stroke={CYAN} strokeWidth="1.5" opacity="0.5"/>

      {/* Divider between image and info */}
      {imageSectionHeight > 0 && (
        <line x1="0" y1={imageSectionHeight} x2={width} y2={imageSectionHeight} stroke={CYAN} strokeWidth="0.75" opacity="0.4"/>
      )}

      {/* Bottom diagonal bar */}
      <polygon
        points={`0,${height-cut} 0,${height} ${cut},${height} ${width*0.72},${height} ${width*0.72+barH},${height-barH} 0,${height-barH}`}
        fill={CYAN}
        fillOpacity="0.08"
      />
      <line x1="0" y1={height-barH} x2={width} y2={height-barH} stroke={CYAN} strokeWidth="0.75" opacity="0.4"/>

      {/* Hash marks — stop 4px above the horizontal line */}
      <line x1={width*0.72}    y1={height}    x2={width*0.72+barH-4}    y2={height-barH+4} stroke={CYAN} strokeWidth="2" opacity="0.7" filter="url(#card-glow)"/>
      <line x1={width*0.72+10} y1={height}    x2={width*0.72+barH+6}    y2={height-barH+4} stroke={CYAN} strokeWidth="2" opacity="0.7" filter="url(#card-glow)"/>
      <line x1={width*0.72+20} y1={height}    x2={width*0.72+barH+16}   y2={height-barH+4} stroke={CYAN} strokeWidth="2" opacity="0.7" filter="url(#card-glow)"/>

      {/* Corner circuits */}
      <polyline points={`${cut},${height} ${cut},${height-8} ${cut+12},${height-8}`} fill="none" stroke={CYAN} strokeWidth="0.5" opacity="0.35"/>
      <polyline points={`${width-cut},${height} ${width-cut},${height-8} ${width-cut-12},${height-8}`} fill="none" stroke={CYAN} strokeWidth="0.5" opacity="0.35"/>
    </svg>
  );
}

function LinkButton({ href, icon: Icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? CYAN : `rgba(0,229,212,0.5)`,
        filter: hovered ? `drop-shadow(0 0 4px ${CYAN})` : 'none',
        transition: 'color 0.2s, filter 0.2s',
        textDecoration: 'none',
      }}
    >
      <Icon size={26} />
    </a>
  );
}

function StatusChip({ status }) {
  const [ref, dims] = useResizeDims();
  const color = status === 'Complete'
    ? 'rgba(0,200,120,0.2)'
    : status === 'In Progress'
    ? 'rgba(200,160,0,0.2)'
    : 'rgba(180,180,180,0)';
  const textColor = status === 'Complete'
    ? '#00c878'
    : status === 'In Progress'
    ? '#c8a000'
    : '#9aa';

  return (
    <span
      ref={ref}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily: 'monospace',
        fontSize: '10px',
        letterSpacing: '1px',
        color: textColor,
        background: color,
        padding: '2px 10px',
        clipPath: 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <OctagonSVG width={dims.width} height={dims.height} cut={6} strokeWidth={0.8} strokeColor={textColor} />
      <span style={{ position: 'relative', zIndex: 1 }}>{status.toUpperCase()}</span>
    </span>
  );
}

function ProjectCard({ project, selectImage }) {
  const [cardRef, dims] = useResizeDims();
  const [imgRef, imgDims] = useResizeDims();
  const [hovered, setHovered] = useState(false);
  const hasLinks = project.github || project.link || project.itch;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-11/12 md:w-120"
      style={{
        position: 'relative',
        background: 'rgba(0,20,18,0.45)',
        clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.3s ease, filter 0.3s ease',
        filter: hovered ? `drop-shadow(0 0 8px ${CYAN}66)` : 'none',
      }}
    >
      <PanelFrame width={dims.width} height={dims.height} imageSectionHeight={imgDims.height} />

      {/* Image */}
      <div
        ref={imgRef}
        style={{ display: 'flex', justifyContent: 'center', background: '#060d10', cursor: 'pointer', position: 'relative' }}
        onClick={() => selectImage()}
      >
        <img
          src={`/assets/${project.image}`}
          alt={project.name}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '256px',
            objectFit: 'contain',
            display: 'block',
            imageRendering: project.pixelated ? 'pixelated' : 'auto',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 14, borderTop: `2px solid ${CYAN}`, borderLeft: `2px solid ${CYAN}`, filter: `drop-shadow(0 0 3px ${CYAN})`, zIndex: 3 }}/>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, borderTop: `2px solid ${CYAN}`, borderRight: `2px solid ${CYAN}`, filter: `drop-shadow(0 0 3px ${CYAN})`, zIndex: 3 }}/>
      </div>

      {/* Info */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '256px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: `${CYAN}44 transparent`,
        padding: '12px 16px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {/* Title + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: CYAN, boxShadow: `0 0 6px ${CYAN}`, flexShrink: 0 }}/>
            <span style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              color: CYAN,
              letterSpacing: '1px',
              filter: `drop-shadow(0 0 4px ${CYAN}88)`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {project.name.toUpperCase()}
            </span>
          </div>
          <StatusChip status={project.status} />
        </div>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.techStack.map(tech => (
            <span key={tech} style={{
              fontFamily: 'monospace',
              fontSize: '9px',
              color: CYAN,
              background: 'rgba(0,229,212,0.1)',
              border: `0.5px solid rgba(0,229,212,0.35)`,
              padding: '2px 7px',
              letterSpacing: '0.5px',
            }}>
              {tech.toUpperCase()}
            </span>
          ))}
        </div>

        <div style={{ height: '0.5px', background: CYAN, opacity: 0.2 }} />

        {/* Description */}
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8ee8df', letterSpacing: '1px', marginBottom: '5px', opacity: 0.8 }}>
            // PROJECT DESCRIPTION
          </div>
          <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#c8eae8', lineHeight: '1.6', margin: 0 }}>
            {project.description}
          </p>
        </div>

        {/* Links */}
        {hasLinks && (
          <>
            <div style={{ height: '0.5px', background: CYAN, opacity: 0.15 }} />
            <div style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8ee8df', letterSpacing: '1px', opacity: 0.8 }}>
              // LINKS
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              {project.github && <LinkButton href={project.github} icon={FaGithub} />}
              {project.link && <LinkButton href={project.link} icon={FaExternalLinkAlt} />}
              {project.itch && <LinkButton href={project.itch} icon={FaItchIo} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;