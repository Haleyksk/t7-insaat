"use client";

import { useLayoutEffect, useRef } from "react";

const POSTER = "/hero-poster.jpg";
const MASAUSTU = "/hero.mp4?v=4";
const MOBIL = "/hero-mobile.mp4?v=1";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const mobil = window.matchMedia("(max-width: 767px)").matches;
    const hedef = mobil ? MOBIL : MASAUSTU;
    if (!video.currentSrc.includes(hedef.split("?")[0] ?? "")) {
      video.src = hedef;
    }
    void video.play().catch(() => undefined);
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      aria-hidden
    >
      <source src={MOBIL} type="video/mp4" media="(max-width: 767px)" />
      <source src={MASAUSTU} type="video/mp4" media="(min-width: 768px)" />
    </video>
  );
}
