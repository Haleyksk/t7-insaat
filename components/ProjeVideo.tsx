"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  baslik: string;
};

export default function ProjeVideo({ src, poster, baslik }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const elleDurdu = useRef(false);
  const [durdu, setDurdu] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gozlemci = new IntersectionObserver(([kayit]) => {
      if (!kayit.isIntersecting) {
        video.pause();
        return;
      }
      if (!elleDurdu.current) void video.play().catch(() => undefined);
    });
    gozlemci.observe(video);
    return () => gozlemci.disconnect();
  }, []);

  const degistir = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      elleDurdu.current = false;
      void video.play();
      setDurdu(false);
      return;
    }
    elleDurdu.current = true;
    video.pause();
    setDurdu(true);
  };

  return (
    <button
      type="button"
      onClick={degistir}
      className="relative mt-12 block w-full overflow-hidden border border-white/10"
      aria-label={durdu ? `${baslik} videosunu oynat` : `${baslik} videosunu durdur`}
    >
      <span className="relative block aspect-[16/10] lg:aspect-[21/9]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      </span>
    </button>
  );
}
