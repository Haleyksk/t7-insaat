"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

/** Sessiz video. Ekrana gelince oynar, çıkınca durur. Sayfa açılışını yormaz. */
export default function GorunenVideo({ src, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gozlemci = new IntersectionObserver(
      ([kayit]) => {
        if (kayit.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { rootMargin: "160px" },
    );
    gozlemci.observe(video);
    return () => gozlemci.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
