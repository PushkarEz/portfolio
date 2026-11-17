import React, { useEffect, useRef, useState } from 'react';

export const HeroBanner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const tick = () => {
      try {
        const now = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
          .format(new Date())
          .toUpperCase();
        setIstTime(now);
      } catch {
        setIstTime('');
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let width = 0;
    let height = 0;

    interface Star {
      x: number;
      y: number;
      r: number;
      alpha: number;
      speed: number;
    }

    let stars: Star[] = [];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(36, Math.floor(width / 15));
      stars = Array.from({ length: count }, (_, i) => ({
        x: ((i * 73) % 100) * (width / 100),
        y: ((i * 41) % 80) * (height / 100),
        r: i % 4 === 0 ? 1.5 : 0.9,
        alpha: 0.25 + ((i * 19) % 55) / 100,
        speed: 0.08 + ((i * 7) % 10) / 80,
      }));
    };

    const drawFrame = (time: number) => {
      const t = time * 0.0005;

      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#070B14');
      grad.addColorStop(0.6, '#0E1629');
      grad.addColorStop(1, '#16223B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.72,
        height * 0.8,
        10,
        width * 0.72,
        height * 0.8,
        width * 0.55
      );
      glow.addColorStop(0, 'rgba(96, 165, 250, 0.22)');
      glow.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
      glow.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const x = (s.x + t * 14 * s.speed) % width;
        const y = s.y + Math.sin(t * 2 + i) * 1.4;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${s.alpha})`;
        ctx.fill();
      }

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const baseY = height * (0.68 + wave * 0.1);
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 10) {
          const y =
            baseY +
            Math.sin(x * 0.008 + t * (1.1 + wave * 0.3) + wave) * (7 - wave * 1.5) +
            Math.cos(x * 0.004 - t) * 4;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle =
          wave === 0
            ? 'rgba(15, 23, 42, 0.45)'
            : wave === 1
              ? 'rgba(17, 24, 39, 0.55)'
              : 'rgba(10, 10, 14, 0.75)';
        ctx.fill();

        ctx.strokeStyle =
          wave === 0 ? 'rgba(147, 197, 253, 0.22)' : 'rgba(148, 163, 184, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    setup();
    window.addEventListener('resize', setup);

    if (reducedMotion) {
      drawFrame(0);
    } else {
      const loop = (now: number) => {
        drawFrame(now);
        animationId = requestAnimationFrame(loop);
      };
      animationId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', setup);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative h-40 w-full overflow-hidden border-b grid-line bg-[#070B14] sm:h-52">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
      />
      {istTime && (
        <div className="pointer-events-none absolute bottom-3 right-4 font-mono text-xs tracking-wider text-white/75">
          {istTime}
        </div>
      )}
    </div>
  );
};
