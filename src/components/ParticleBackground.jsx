import { useEffect, useRef } from 'react';

const PARTICLE_COLORS  = ['#00e5d4', '#00c8b4', '#7fffd4', '#00a896', '#4dffd2'];
const GLOW_COLORS      = ['#00e5d4', '#7fffd4'];
const NOISE_COUNT      = 8000;
const SCANLINE_SPACING = 2;
const SCANLINE_OPACITY = 0.07;
const GRID_SPACING     = 80;
const GRID_OPACITY     = 0.018;
const HAZE_COLORS      = ['rgba(0,229,212,1)', 'rgba(0,168,150,1)', 'rgba(0,200,180,1)'];
const MICRO_DOT_OPACITY = 0.09;

const BLOB_COUNT       = 7;
const HAZE_BAND_COUNT  = 10;
const MICRO_DOT_COUNT  = 200;
const WISP_COUNT       = 25;

// ── Factories ─────────────────────────────────────────────────────────────────

function makeBlob(w, h, index) {
    const lighter = index < 4;
    return {
        x:            w * 0.5 + (Math.random() - 0.5) * w * 0.75,
        y:            h * 0.5 + (Math.random() - 0.5) * h * 0.65,
        r:            180 + Math.random() * 240,
        aspect:       0.5 + Math.random() * 0.9,
        vx:           (Math.random() - 0.5) * 0.035,
        vy:           (Math.random() - 0.5) * 0.035,
        lighter,
        opacityPhase: Math.random() * Math.PI * 2,
        pulseAmp:     0.12 + Math.random() * 0.12,
        pulseFreq:    0.004 + Math.random() * 0.004,
    };
}

function makeParticle(w, h, type) {
    const base = {
        x: Math.random() * w,
        y: Math.random() * h,
        opacity: 0,
        targetOpacity: 0,
        opacitySpeed: 0,
        vx: 0,
        vy: 0,
        size: 1,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        type,
        glowRadius: 0,
    };

    if (type === 'A') {
        base.size = 0.8 + Math.random() * 1.0;
        base.opacity = Math.random() * 0.14 + 0.04;
        base.targetOpacity = Math.random() * 0.18 + 0.04;
        base.opacitySpeed = 0.0003 + Math.random() * 0.0006;
        base.vx = (Math.random() - 0.5) * 0.18;
        base.vy = (Math.random() - 0.5) * 0.18;
    } else if (type === 'B') {
        base.size = 1.5 + Math.random() * 2.0;
        base.opacity = Math.random() * 0.22 + 0.12;
        base.targetOpacity = Math.random() * 0.26 + 0.12;
        base.opacitySpeed = 0.0004 + Math.random() * 0.0008;
        base.vx = (Math.random() - 0.5) * 0.35;
        base.vy = (Math.random() - 0.5) * 0.35;
    } else {
        base.size = 2 + Math.random() * 2;
        base.opacity = Math.random() * 0.20 + 0.25;
        base.targetOpacity = Math.random() * 0.25 + 0.25;
        base.opacitySpeed = 0.0005 + Math.random() * 0.0007;
        base.vx = (Math.random() - 0.5) * 0.18;
        base.vy = (Math.random() - 0.5) * 0.18;
        base.color = GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
        base.glowRadius = 4 + Math.random() * 4;
    }

    return base;
}

function buildParticles(w, h) {
    const particles = [];
    for (let i = 0; i < 200; i++) particles.push(makeParticle(w, h, 'A'));
    for (let i = 0; i < 80;  i++) particles.push(makeParticle(w, h, 'B'));
    for (let i = 0; i < 14;  i++) particles.push(makeParticle(w, h, 'C'));
    return particles;
}

function makeMicroDot(w, h) {
    return {
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
    };
}

function makeHazeBand(w, h) {
    return {
        y:       Math.random() * h,
        vy:      (Math.random() - 0.5) * 0.03,
        height:  120 + Math.random() * 180,
        opacity: 0.04 + Math.random() * 0.06,
        color:   HAZE_COLORS[Math.floor(Math.random() * HAZE_COLORS.length)],
    };
}

function makeWisp(w, h) {
    const speed = 0.8 + Math.random() * 1.7;
    const angle = Math.random() * Math.PI * 2;
    return {
        x:             Math.random() * w,
        y:             Math.random() * h,
        vx:            Math.cos(angle) * speed,
        vy:            Math.sin(angle) * speed,
        tailFrames:    5 + Math.random() * 5,
        opacity:       0,
        targetOpacity: Math.random() * 0.08 + 0.04,
        opacitySpeed:  0.001 + Math.random() * 0.001,
        color:         PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    };
}

// ── Offscreen canvas builders ─────────────────────────────────────────────────

function buildNoiseCanvas(w, h) {
    const nc = document.createElement('canvas');
    nc.width = w; nc.height = h;
    const nx = nc.getContext('2d');
    for (let i = 0; i < NOISE_COUNT; i++) {
        const r = Math.random();
        let color;
        if (r < 0.5)       color = `rgba(0,35,20,${(Math.random() * 0.06 + 0.01).toFixed(3)})`;
        else if (r < 0.8)  color = `rgba(0,8,5,${(Math.random() * 0.06 + 0.01).toFixed(3)})`;
        else               color = `rgba(0,180,150,${(Math.random() * 0.05 + 0.01).toFixed(3)})`;
        nx.fillStyle = color;
        nx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 1);
    }
    return nc;
}

function buildScanlineCanvas(w, h) {
    const sc = document.createElement('canvas');
    sc.width = w; sc.height = h;
    const sx = sc.getContext('2d');
    sx.fillStyle = `rgba(0,20,14,${SCANLINE_OPACITY})`;
    for (let y = 0; y < h; y += SCANLINE_SPACING) sx.fillRect(0, y, w, 1);
    return sc;
}

function buildGridCanvas(w, h) {
    const gc = document.createElement('canvas');
    gc.width = w; gc.height = h;
    const gx = gc.getContext('2d');
    gx.fillStyle = `rgba(0,180,150,${GRID_OPACITY})`;
    for (let x = 0; x < w; x += GRID_SPACING) gx.fillRect(x, 0, 1, h);
    for (let y = 0; y < h; y += GRID_SPACING) gx.fillRect(0, y, w, 1);
    return gc;
}

// ── Draw / step helpers ───────────────────────────────────────────────────────

function drawBlob(ctx, blob) {
    const mult = 1 - blob.pulseAmp * (0.5 + 0.5 * Math.sin(blob.opacityPhase));
    ctx.save();
    ctx.translate(blob.x, blob.y);
    ctx.scale(1, blob.aspect);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, blob.r);
    if (blob.lighter) {
        grad.addColorStop(0, `rgba(0,38,24,${(0.38 * mult).toFixed(3)})`);
    } else {
        grad.addColorStop(0, `rgba(0,5,3,${(0.45 * mult).toFixed(3)})`);
    }
    grad.addColorStop(1, 'rgba(0,17,14,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, blob.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function stepBlob(blob, w, h) {
    blob.x += blob.vx;
    blob.y += blob.vy;
    blob.opacityPhase += blob.pulseFreq;
    const m = blob.r;
    if (blob.x < -m)         blob.x = w + m;
    else if (blob.x > w + m) blob.x = -m;
    if (blob.y < -m)         blob.y = h + m;
    else if (blob.y > h + m) blob.y = -m;
}

function stepParticle(p, w, h) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0)       p.x = w;
    else if (p.x > w)  p.x = 0;
    if (p.y < 0)       p.y = h;
    else if (p.y > h)  p.y = 0;

    if (p.opacity < p.targetOpacity) {
        p.opacity += p.opacitySpeed;
    } else {
        p.opacity -= p.opacitySpeed;
        if (p.opacity <= 0.03) {
            if (p.type === 'A')      p.targetOpacity = Math.random() * 0.18 + 0.04;
            else if (p.type === 'B') p.targetOpacity = Math.random() * 0.26 + 0.12;
            else                     p.targetOpacity = Math.random() * 0.25 + 0.25;
        }
    }
}

function drawParticle(ctx, p) {
    if (p.type === 'C') {
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = p.glowRadius;
    }
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle   = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    if (p.type === 'C') ctx.shadowBlur = 0;
}

function drawLines(ctx, particles) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#00e5d4';
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            if (Math.random() > 0.004) continue;
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.globalAlpha = 0.08 * (1 - dist / 100);
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }
}

function stepHazeBand(band, h) {
    band.y += band.vy;
    const m = band.height / 2;
    if (band.y < -m)         band.y = h + m;
    else if (band.y > h + m) band.y = -m;
}

function drawHazeBand(ctx, band, w) {
    const top  = band.y - band.height / 2;
    const grad = ctx.createLinearGradient(0, top, 0, top + band.height);
    const c    = band.color.replace('1)', `${band.opacity})`);
    grad.addColorStop(0,   band.color.replace('1)', '0)'));
    grad.addColorStop(0.5, c);
    grad.addColorStop(1,   band.color.replace('1)', '0)'));
    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.fillRect(0, top, w, band.height);
}

function stepWisp(wisp, w, h) {
    wisp.x += wisp.vx;
    wisp.y += wisp.vy;
    if (wisp.x < 0)       wisp.x = w;
    else if (wisp.x > w)  wisp.x = 0;
    if (wisp.y < 0)       wisp.y = h;
    else if (wisp.y > h)  wisp.y = 0;

    if (wisp.opacity < wisp.targetOpacity) {
        wisp.opacity += wisp.opacitySpeed;
    } else {
        wisp.opacity -= wisp.opacitySpeed;
        if (wisp.opacity <= 0) {
            wisp.opacity = 0;
            wisp.targetOpacity = Math.random() * 0.08 + 0.04;
            wisp.x = Math.random() * w;
            wisp.y = Math.random() * h;
            const s = 0.8 + Math.random() * 1.7;
            const a = Math.random() * Math.PI * 2;
            wisp.vx = Math.cos(a) * s;
            wisp.vy = Math.sin(a) * s;
        }
    }
}

function drawWisp(ctx, wisp) {
    if (wisp.opacity <= 0) return;
    ctx.globalAlpha = wisp.opacity;
    ctx.strokeStyle = wisp.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(wisp.x, wisp.y);
    ctx.lineTo(wisp.x - wisp.vx * wisp.tailFrames, wisp.y - wisp.vy * wisp.tailFrames);
    ctx.stroke();
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');

        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width  = w;
        canvas.height = h;

        const buildAll = () => ({
            noiseCanvas:    buildNoiseCanvas(w, h),
            scanlineCanvas: buildScanlineCanvas(w, h),
            gridCanvas:     buildGridCanvas(w, h),
            blobs:          Array.from({ length: BLOB_COUNT },      (_, i) => makeBlob(w, h, i)),
            hazeBands:      Array.from({ length: HAZE_BAND_COUNT }, ()     => makeHazeBand(w, h)),
            microDots:      Array.from({ length: MICRO_DOT_COUNT }, ()     => makeMicroDot(w, h)),
            wisps:          Array.from({ length: WISP_COUNT },      ()     => makeWisp(w, h)),
            particles:      buildParticles(w, h),
            scan:           { y: -2, active: false, cooldown: 480, vy: 0.8 },
        });

        let state = buildAll();

        const onResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width  = w;
            canvas.height = h;
            state = buildAll();
        };
        window.addEventListener('resize', onResize);

        const renderFrame = () => {
            const { noiseCanvas, scanlineCanvas, gridCanvas,
                    blobs, hazeBands, microDots, wisps, particles } = state;
            const scan = state.scan;

            // 1. Base fill
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#001512';
            ctx.fillRect(0, 0, w, h);

            // 2–4. Offscreen texture layers
            ctx.globalAlpha = 1;
            ctx.drawImage(scanlineCanvas, 0, 0);
            ctx.drawImage(gridCanvas,     0, 0);
            ctx.drawImage(noiseCanvas,    0, 0);

            // 5. Blobs — pulsing radial gradients
            ctx.globalAlpha = 1;
            for (const blob of blobs) {
                stepBlob(blob, w, h);
                drawBlob(ctx, blob);
            }

            // 6. Haze bands — horizontal atmospheric drifts
            for (const band of hazeBands) {
                stepHazeBand(band, h);
                drawHazeBand(ctx, band, w);
            }

            // 7. Micro-dots — fine moving field
            ctx.globalAlpha = MICRO_DOT_OPACITY;
            ctx.fillStyle   = '#00a896';
            for (const dot of microDots) {
                dot.x += dot.vx;
                dot.y += dot.vy;
                if (dot.x < 0)       dot.x = w;
                else if (dot.x > w)  dot.x = 0;
                if (dot.y < 0)       dot.y = h;
                else if (dot.y > h)  dot.y = 0;
                ctx.fillRect(dot.x, dot.y, 1, 1);
            }

            // 8. Wisps — directional energy streaks
            for (const wisp of wisps) {
                stepWisp(wisp, w, h);
                drawWisp(ctx, wisp);
            }

            // 9. Particles
            for (const p of particles) {
                stepParticle(p, w, h);
                drawParticle(ctx, p);
            }

            // 10. Line fragments
            drawLines(ctx, particles);

            // 11. Scan sweep line
            if (!scan.active) {
                scan.cooldown--;
                if (scan.cooldown <= 0) { scan.active = true; scan.y = -2; }
            } else {
                const sg = ctx.createLinearGradient(0, scan.y - 1, 0, scan.y + 2);
                sg.addColorStop(0,   'rgba(0,229,212,0)');
                sg.addColorStop(0.5, 'rgba(0,229,212,0.05)');
                sg.addColorStop(1,   'rgba(0,229,212,0)');
                ctx.fillStyle = sg;
                ctx.fillRect(0, scan.y - 1, w, 3);
                scan.y += scan.vy;
                if (scan.y > h + 2) {
                    scan.active = false;
                    scan.cooldown = 720 + Math.floor(Math.random() * 480);
                }
            }

            ctx.globalAlpha = 1;
        };

        if (prefersReducedMotion) {
            const { noiseCanvas, scanlineCanvas, gridCanvas,
                    blobs, hazeBands, microDots, particles } = state;
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#001512';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(scanlineCanvas, 0, 0);
            ctx.drawImage(gridCanvas,     0, 0);
            ctx.drawImage(noiseCanvas,    0, 0);
            ctx.globalAlpha = 1;
            for (const blob of blobs)   drawBlob(ctx, blob);
            for (const band of hazeBands) drawHazeBand(ctx, band, w);
            ctx.globalAlpha = MICRO_DOT_OPACITY;
            ctx.fillStyle   = '#00a896';
            for (const dot of microDots) ctx.fillRect(dot.x, dot.y, 1, 1);
            for (const p of particles) {
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle   = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
            ctx.globalAlpha = 1;
            return () => window.removeEventListener('resize', onResize);
        }

        let animId;
        const loop = () => {
            renderFrame();
            animId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
