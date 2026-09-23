"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  baslik: string;
};

export default function ProjeVideo({ src, poster, baslik }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [durdu, setDurdu] = useState(false);

  const degistir = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setDurdu(false);
      return;
    }
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
          preload="auto"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      </span>
    </button>
  );
}
