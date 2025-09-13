"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Flake = {
  x: number;
  y: number;
  r: number; // radius(px)
  spd: number; // speed(px/frame-ish)
  dir: 1 | -1; // horizontal direction
};

type Props = {
  density?: number; // 눈송이 개수 (기본 200)
  speed?: [number, number]; // 속도 범위(px/frame): [min, max]
  radius?: [number, number]; // 반지름 범위(px): [min, max]
};

export default function Snow({
  density = 200,
  speed = [0.4, 1.2],
  radius = [2.5, 6.5], // ⬅ 크기 크게 (px 단위)
}: Props) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const flakesRef = useRef<Flake[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => setMounted(true), []);

  // 난수 헬퍼
  const rand = useCallback(
    (min: number, max: number) => min + Math.random() * (max - min),
    [],
  );

  // 캔버스 크기 & DPR 설정
  const resize = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // 품질/성능 절충
    const w = window.innerWidth;
    const h = window.innerHeight;

    sizeRef.current = { w, h, dpr };
    cvs.style.width = `${w}px`;
    cvs.style.height = `${h}px`;
    cvs.width = Math.floor(w * dpr);
    cvs.height = Math.floor(h * dpr);
    const ctx = cvs.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 리사이즈 시 밀도 유지하면서 화면을 다시 채움
    const count = Math.max(0, Math.min(density, 1000));
    const arr: Flake[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(radius[0], radius[1]),
        spd: rand(speed[0], speed[1]),
        dir: Math.random() < 0.5 ? -1 : 1,
      });
    }
    flakesRef.current = arr;
  }, [density, radius, rand, speed]);

  // 애니메이션 루프
  const tick = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const { w, h } = sizeRef.current;
    const flakes = flakesRef.current; // 타입: Flake[]

    // 배경을 투명으로 유지 → UI 위에 얹히도록 함
    ctx.clearRect(0, 0, w, h);

    // 눈 업데이트 + 렌더
    for (let i = 0, len = flakes.length; i < len; i++) {
      const f = flakes[i];
      if (!f) continue; // <-- 안전 가드 (noUncheckedIndexedAccess 대응)

      // 이동
      f.x += f.dir * f.spd * 0.7; // 살짝 대각 이동
      f.y += f.spd;

      // 좌우 경계 → 방향 반전 (경계 바깥에서 반전)
      if (f.x < -f.r) f.dir = 1;
      else if (f.x > w + f.r) f.dir = -1;

      // 하단 지나가면 맨 위에서 재스폰 (좌표/속도/반지름 약간 랜덤)
      if (f.y - f.r > h) {
        f.y = -f.r;
        f.x = Math.random() * w;
        f.r = rand(radius[0], radius[1]);
        f.spd = rand(speed[0], speed[1]);
        f.dir = Math.random() < 0.5 ? -1 : 1;
      }

      // 렌더 (흰 배경에서도 보이도록 윤곽선+그림자)
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 0.6;
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }

    rafRef.current = window.requestAnimationFrame(tick);
  }, [rand, radius, speed]);

  // mount/unmount
  useEffect(() => {
    if (!mounted) return;
    resize();
    rafRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, resize, tick]);

  const overlay = (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2147483647]" // 최상위 오버레이
      // style={{ outline: "2px dashed rgba(255,0,0,.35)" }} // 디버그용: 필요 시 주석 해제
    >
      <canvas ref={canvasRef} />
    </div>
  );

  if (mounted && typeof document !== "undefined") {
    return createPortal(overlay, document.body);
  }
  return null;
}
