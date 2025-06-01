'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function AnimatedFace({ mood }) {
  console.log("AnimatedFace function called");
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    console.log("AnimatedFace component mounted. Container ref:", containerRef.current);
    if (containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/animations/happy-sad-slider.json',
      });

      animationRef.current.addEventListener('DOMLoaded', () => {
        console.log("Lottie animation loaded successfully.");

        // 🚩 애니메이션 로드 후 현재 mood로 초기 위치 설정
        if (animationRef.current.totalFrames) {
          const totalFrames = animationRef.current.totalFrames;
          const frame = Math.floor(((10 - mood) / 9) * (totalFrames - 1));  // 👉 mood 반전 매핑 유지
          console.log(`Initial frame after load: ${frame} for mood: ${mood}`);
          animationRef.current.goToAndStop(frame, true);
        }
      });

      animationRef.current.addEventListener('error', (error) => {
        console.error("Lottie animation failed to load:", error);
      });

      return () => {
        console.log("AnimatedFace component unmounted.");
        if (animationRef.current) {
          animationRef.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    console.log("Mood prop changed:", mood);
    if (animationRef.current && animationRef.current.totalFrames) {
      const totalFrames = animationRef.current.totalFrames;
      const frame = Math.floor(((10 - mood) / 9) * (totalFrames - 1));  // mood 반전 매핑 유지
      console.log(`Updating animation to frame: ${frame} for mood: ${mood}`);

      animationRef.current.goToAndStop(frame, true);
    } else {
      console.warn("Animation not fully loaded or totalFrames undefined");
    }
  }, [mood]);

  return (
    <div
      ref={containerRef}
      className="w-24 h-24 sm:w-32 sm:h-32"
      aria-hidden="true"
    />
  );
}
