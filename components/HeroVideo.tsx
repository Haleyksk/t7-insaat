"use client";

import { useLayoutEffect, useRef } from "react";

/** ?v= sürümü tarayıcının eski videoyu önbellekten açmasını engeller. */
const POSTER = "/hero-poster.jpg?v=8";
const MASAUSTU = "/hero.mp4?v=8";
const MOBIL = "/hero-mobil.mp4?v=1";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const baslat = () => {
      void video.play().catch(() => undefined);
    };
    baslat();
    video.addEventListener("loadeddata", baslat);
    video.addEventListener("canplay", baslat);
    window.addEventListener("touchstart", baslat, { once: true, passive: true });

    return () => {
      video.removeEventListener("loadeddata", baslat);
      video.removeEventListener("canplay", baslat);
      window.removeEventListener("touchstart", baslat);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={POSTER}
      aria-hidden
    >
      <source src={MOBIL} type="video/mp4" media="(max-width: 767px)" />
      <source src={MASAUSTU} type="video/mp4" />
    </video>
  );
}
