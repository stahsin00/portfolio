import React from 'react';

function Disclaimer() {
    return (
        <div className="fixed bottom-0 left-0 w-full">
            <div
            className="w-[300px] md:w-[635px]"
            style={{
                display: 'flex',
                zIndex: 50,
                background: 'rgba(0,20,18,0.6)',
                borderTop: `1.5px solid #00e5d4`,
                clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)',
                height: '33px',
                margin: '0 auto',
                alignItems: 'center',
                justifyContent: 'center',
                filter: `drop-shadow(0 0 4px #00e5d488)`,
            }}
            >
                <div
                    style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: '#00e5d4',
                    letterSpacing: '2px',
                    opacity: 0.9,
                }}
                >
                - SITE UNDER CONSTRUCTION -
                </div>
                <svg className='hidden md:block' width='70' height="33" style={{ position: 'absolute', right: '0px', bottom: '0px' }}>
                    <line
                        x1="4"
                        y1="0"
                        x2="69"
                        y2="34"
                        stroke="#00e5d4"
                        strokeWidth="2"
                        filter="url(#hud-glow)"
                    />
                </svg>
                <svg className='hidden md:block' width='70' height="33" style={{ position: 'absolute', left: '0px', bottom: '0px' }}>
                    <line
                        x1="0"
                        y1="34"
                        x2="64"
                        y2="0"
                        stroke="#00e5d4"
                        strokeWidth="2"
                        filter="url(#hud-glow)"
                    />
                </svg>
            </div>
        </div>
    );
}

export default Disclaimer;