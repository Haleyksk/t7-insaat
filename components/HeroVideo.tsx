"use client";

import { useLayoutEffect, useRef } from "react";

const POSTER = "/hero-poster.jpg";
const VIDEO = "/hero.mp4?v=6";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    const baslat = () => {
      void video.play().catch(() => undefined);
    };
    baslat();
    video.addEventListener("canplay", baslat);
    return () => video.removeEventListener("canplay", baslat);
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
      <source src={VIDEO} type="video/mp4" />
    </video>
  );
}
