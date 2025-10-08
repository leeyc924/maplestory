"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

type Flake = {
  x: number;
  y: number;
  r: number;
  spd: number;
  dir: 1 | -1;
};

type Props = {
  density?: number;
  speed?: [number, number];
  radius?: [number, number];
};

function Snow({
  density = 200,
  speed = [0.4, 1.2],
  radius = [2.5, 6.5],
}: Props) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const flakesRef = useRef<Flake[]>([]);
  const sizeRef = useRef({ dpr: 1, h: 0, w: 0 });

  useEffect(() => setMounted(true), []);

  const rand = useCallback(
    (min: number, max: number) => min + Math.random() * (max - min),
    [],
  );

  const resize = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = window.innerWidth;
    const h = window.innerHeight;

    sizeRef.current = { dpr, h, w };
    cvs.style.width = `${w}px`;
    cvs.style.height = `${h}px`;
    cvs.width = Math.floor(w * dpr);
    cvs.height = Math.floor(h * dpr);

    const ctx = cvs.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(0, Math.min(density, 1000));
    const arr: Flake[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        dir: Math.random() < 0.5 ? -1 : 1,
        r: rand(radius[0], radius[1]),
        spd: rand(speed[0], speed[1]),
        x: Math.random() * w,
        y: Math.random() * h,
      });
    }
    flakesRef.current = arr;
  }, [density, radius, rand, speed]);

  const tick = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    const flakes = flakesRef.current;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0, len = flakes.length; i < len; i++) {
      const f = flakes[i];
      if (!f) continue;

      f.x += f.dir * f.spd * 0.7;
      f.y += f.spd;

      if (f.x < -f.r) f.dir = 1;
      else if (f.x > w + f.r) f.dir = -1;

      if (f.y - f.r > h) {
        f.y = -f.r;
        f.x = Math.random() * w;
        f.r = rand(radius[0], radius[1]);
        f.spd = rand(speed[0], speed[1]);
        f.dir = Math.random() < 0.5 ? -1 : 1;
      }

      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 0.6;
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }

    rafRef.current = window.requestAnimationFrame(tick);
  }, [rand, radius, speed]);

  useEffect(() => {
    if (!mounted) return;
    resize();
    rafRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [mounted, resize, tick]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default memo(Snow);
