"use client";
import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  width: number;
  color: string;
  phase: number; // stagger start offset
}

const COLORS = ["#3B6CF4", "#3B6CF4", "#E8354A", "#8B3FC8", "#3B6CF4", "#8B3FC8"];
const ANGLE = Math.PI / 11; // ~16° tilt like natural rain
const sinA = Math.sin(ANGLE);
const cosA = Math.cos(ANGLE);

function makeDrop(canvasW: number, canvasH: number, randomY = false): Drop {
  return {
    x: Math.random() * (canvasW + 200) - 100,
    y: randomY ? Math.random() * canvasH : -(Math.random() * canvasH),
    len: 12 + Math.random() * 28,
    speed: 7 + Math.random() * 16,
    opacity: 0.055 + Math.random() * 0.13,
    width: 0.6 + Math.random() * 1.1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    phase: 0,
  };
}

export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let drops: Drop[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      const count = Math.floor((W * H) / 8000);
      drops = Array.from({ length: Math.min(Math.max(count, 80), 160) }, () =>
        makeDrop(W, H, true)
      );
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (const d of drops) {
        const x2 = d.x + sinA * d.len;
        const y2 = d.y + cosA * d.len;

        const grad = ctx.createLinearGradient(d.x, d.y, x2, y2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.6, d.color + "55");
        grad.addColorStop(1, d.color);

        ctx.save();
        ctx.globalAlpha = d.opacity;
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // tiny teardrop head at the tip
        ctx.globalAlpha = d.opacity * 0.9;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.ellipse(x2, y2, d.width * 1.4, d.width * 2.2, ANGLE, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        d.x += sinA * d.speed;
        d.y += cosA * d.speed;

        if (d.y - d.len > H || d.x - d.len > W) {
          const nd = makeDrop(W, H, false);
          nd.x = Math.random() * (W + 100) - 100;
          Object.assign(d, nd);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
