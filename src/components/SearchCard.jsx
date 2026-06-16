import React, { useState, useRef, useEffect } from 'react';

const CYAN = '#00e5d4';

const projectType = ['Web', 'Game'];
const projectStatus = ['Complete', 'In Progress', 'Inactive'];
const skills = ['React', 'CSS', 'Tailwind', 'MUI', 'Ant Design', 'Node.js', 'Express', 'GraphQL', 'ASP.Net Core', 'PHP', 'MongoDB', 'MySQL', 'Redis', 'Websocket', 'Unity'];

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

// Draws the octagon border SVG using real observed dims — same pattern as PanelFrame
function OctagonSVG({ width, height, cut, strokeWidth, opacity, glowId }) {
  if (!width || !height) return null;
  const s = strokeWidth / 2; // inset by half stroke so outer edge = clip edge
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
      {glowId && (
        <defs>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      )}
      <polygon points={pts} fill="none" stroke={CYAN} strokeWidth={strokeWidth} opacity={opacity} filter={glowId ? `url(#${glowId})` : undefined}/>
    </svg>
  );
}

function HUDButton({ onClick, children, primary = false }) {
  const [ref, dims] = useResizeDims();
  const [hovered, setHovered] = useState(false);
  const cut = 8;

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        flex: primary ? 1 : undefined,
        padding: '14px 24px',
        background: primary
          ? hovered ? 'rgba(0,125,115,0.6)' : 'rgba(0,125,115,0.35)'
          : hovered ? 'rgba(0,125,115,0.2)' : 'rgba(0,229,212,0.04)',
        border: 'none',
        // clipPath cuts the actual element shape, matching the SVG border cut value
        clipPath: `polygon(${cut}px 0%, calc(100% - ${cut}px) 0%, 100% ${cut}px, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, ${cut}px 100%, 0% calc(100% - ${cut}px), 0% ${cut}px)`,
        color: primary ? CYAN : hovered ? 'rgba(0,229,212,0.7)' : 'rgba(0,229,212,0.4)',
        fontFamily: 'monospace',
        fontSize: primary ? '13px' : '12px',
        letterSpacing: '2px',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
        outline: 'none',
        overflow: 'visible',
      }}
    >
      <OctagonSVG
        width={dims.width}
        height={dims.height}
        cut={cut}
        strokeWidth={primary ? 1.2 : 0.8}
        opacity={primary ? 1 : 0.4}
        glowId={primary ? 'btn-glow' : undefined}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
}

function FilterChip({ label, active, onChange }) {
  const [ref, dims] = useResizeDims();
  const [hovered, setHovered] = useState(false);
  const cut = 6;

  return (
    <button
      ref={ref}
      onClick={onChange}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '9px 20px',
        background: active
          ? 'rgba(0,125,115,0.45)'
          : hovered ? 'rgba(0,125,115,0.3)' : 'rgba(0,125,115,0.15)',
        border: 'none',
        clipPath: `polygon(${cut}px 0%, calc(100% - ${cut}px) 0%, 100% ${cut}px, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, ${cut}px 100%, 0% calc(100% - ${cut}px), 0% ${cut}px)`,
        color: active ? CYAN : hovered ? 'rgba(0,229,212,0.65)' : 'rgba(0,229,212,0.4)',
        fontFamily: 'monospace',
        fontSize: '13px',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s',
        outline: 'none',
        whiteSpace: 'nowrap',
        overflow: 'visible',
      }}
    >
      <OctagonSVG
        width={dims.width}
        height={dims.height}
        cut={cut}
        strokeWidth={active ? 1.5 : 0.8}
        opacity={active ? 1 : 0.4}
        glowId={active ? 'chip-glow' : undefined}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{label.toUpperCase()}</span>
    </button>
  );
}

function PanelFrame({ width, height }) {
  if (!width || !height) return null;
  const cut = 16;
  const accent = 44;
  const tick = 70;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <defs>
        <filter id="frame-glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <polygon
        points={`${cut},0 ${width-cut},0 ${width},${cut} ${width},${height-cut} ${width-cut},${height} ${cut},${height} 0,${height-cut} 0,${cut}`}
        fill="none" stroke={CYAN} strokeWidth="1.5"
      />
      <polyline points={`0,${accent} 0,${cut} ${cut},0 ${tick},0`} fill="none" stroke={CYAN} strokeWidth="3" filter="url(#frame-glow)"/>
      <polyline points={`${width},${accent} ${width},${cut} ${width-cut},0 ${width-tick},0`} fill="none" stroke={CYAN} strokeWidth="3" filter="url(#frame-glow)"/>
      <polyline points={`0,${height-accent} 0,${height-cut} ${cut},${height} ${tick},${height}`} fill="none" stroke={CYAN} strokeWidth="3" filter="url(#frame-glow)"/>
      <polyline points={`${width},${height-accent} ${width},${height-cut} ${width-cut},${height} ${width-tick},${height}`} fill="none" stroke={CYAN} strokeWidth="3" filter="url(#frame-glow)"/>
      <line x1={tick+14} y1="0" x2={tick+4} y2="0" stroke={CYAN} strokeWidth="1.5" opacity="0.5"/>
      <line x1={width-tick-14} y1="0" x2={width-tick-4} y2="0" stroke={CYAN} strokeWidth="1.5" opacity="0.5"/>
      <line x1={tick+14} y1={height} x2={tick+4} y2={height} stroke={CYAN} strokeWidth="1.5" opacity="0.5"/>
      <polygon points={`${cut},0 ${width*0.62},0 ${width*0.62+18},18 ${width},18 ${width},0 ${width-cut},0`} fill={CYAN} fillOpacity="0.08"/>
      <line x1="0" y1="30" x2={width} y2="30" stroke={CYAN} strokeWidth="0.75" opacity="0.4"/>
      <rect x="22" y="7" width="8" height="8" fill={CYAN} opacity="0.9"/>
      <line x1={width*0.62} y1="0" x2={width*0.62+10} y2="10" stroke={CYAN} strokeWidth="2" opacity="0.7" filter="url(#frame-glow)"/>
      <line x1={width*0.62+10} y1="0" x2={width*0.62+21} y2="11" stroke={CYAN} strokeWidth="2" opacity="0.7" filter="url(#frame-glow)"/>
      <line x1="0" y1={height-80} x2={width} y2={height-80} stroke={CYAN} strokeWidth="0.5" opacity="0.2"/>
      <line x1="0" y1={height-22} x2={width} y2={height-22} stroke={CYAN} strokeWidth="0.5" opacity="0.15"/>
      <polyline points={`${cut},${height} ${cut},${height-10} ${cut+16},${height-10}`} fill="none" stroke={CYAN} strokeWidth="0.5" opacity="0.35"/>
      <polyline points={`${width-cut},${height} ${width-cut},${height-10} ${width-cut-16},${height-10}`} fill="none" stroke={CYAN} strokeWidth="0.5" opacity="0.35"/>
    </svg>
  );
}

function SectionLabel({ children }) {
  return (
    <>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: CYAN, letterSpacing: '2px', opacity: 0.85, marginBottom: '6px' }}>
        {children}
      </div>
      <div style={{ height: '0.5px', background: CYAN, opacity: 0.2, marginBottom: '10px' }} />
    </>
  );
}

function SearchCard({ selectedTypes, setSelectedTypes, targetRef }) {
  const [panelRef, dims] = useResizeDims();
  const activeCount = selectedTypes.length;

  const handleSelectionChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSearch = () => {
    if (targetRef.current) targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClear = () => setSelectedTypes([]);

  return (
    <div
      ref={panelRef}
      className="hidden md:flex"
      style={{
        width: '33%',
        position: 'relative',
        background: 'rgba(0,20,18,0.45)',
        clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <PanelFrame width={dims.width} height={dims.height} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ padding: '6px 36px', height: '30px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: CYAN, letterSpacing: '3px', opacity: 0.9 }}>
            PROJECT TERMINAL
          </span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 8px', scrollbarWidth: 'thin', scrollbarColor: `${CYAN}44 transparent` }}>

          {/* ── Search bar (uncomment when search is implemented) ──
          <div style={{
            position: 'relative', marginBottom: '16px',
            background: 'rgba(0,229,212,0.05)',
            clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
            padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <FaSearch size={12} color={CYAN} style={{ opacity: 0.5, flexShrink: 0 }} />
            <input
              type="text" placeholder="SEARCH..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'none', border: 'none', outline: 'none', fontFamily: 'monospace', fontSize: '11px', color: CYAN, letterSpacing: '1px', width: '100%' }}
            />
          </div>
          To enable: add const [searchQuery, setSearchQuery] = useState(''); and import FaSearch from 'react-icons/fa'
          */}

          <div style={{ marginBottom: '16px' }}>
            <SectionLabel>// TYPE</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {projectType.map(type => (
                <FilterChip key={type} label={type} active={selectedTypes.includes(type)} onChange={() => handleSelectionChange(type)} />
              ))}
            </div>
          </div>

          <div style={{ height: '0.5px', background: CYAN, opacity: 0.1, marginBottom: '16px' }} />

          <div style={{ marginBottom: '16px' }}>
            <SectionLabel>// STATUS</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {projectStatus.map(type => (
                <FilterChip key={type} label={type} active={selectedTypes.includes(type)} onChange={() => handleSelectionChange(type)} />
              ))}
            </div>
          </div>

          <div style={{ height: '0.5px', background: CYAN, opacity: 0.1, marginBottom: '16px' }} />

          <div style={{ marginBottom: '14px' }}>
            <SectionLabel>// SKILLS</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map(type => (
                <FilterChip key={type} label={type} active={selectedTypes.includes(type)} onChange={() => handleSelectionChange(type)} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ flexShrink: 0, padding: '12px 16px 10px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            <HUDButton onClick={handleSearch} primary>EXECUTE</HUDButton>
            <HUDButton onClick={handleClear}>CLEAR</HUDButton>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '8px', color: CYAN, opacity: 0.35, letterSpacing: '1px' }}>
              FILTERS ACTIVE: {String(activeCount).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '8px', color: CYAN, opacity: 0.35, letterSpacing: '1px' }}>
              STATUS: READY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;