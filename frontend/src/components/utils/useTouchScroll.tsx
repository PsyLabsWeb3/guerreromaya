import { useEffect } from "react";

const useTouchScroll = () => {
  useEffect(() => {
    let touchStartY = 0;
    let lastTouchY = 0;
    let lastScrollTime = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
      lastTouchY = touchStartY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const now = Date.now();
      // Limitar a 60 FPS (aproximadamente 16.67ms entre eventos)
      if (now - lastScrollTime < 16) return;

      const currentY = event.touches[0].clientY;
      const deltaY = lastTouchY - currentY;

      // Ajustamos los valores para compensar el throttle
      const sensitivity = 12.0;
      const acceleration = Math.abs(deltaY) > 20 ? 2.5 : 1.5;

      // Suavizamos el movimiento
      const smoothDeltaY = Math.sign(deltaY) * Math.min(Math.abs(deltaY), 30);

      window.dispatchEvent(
        new WheelEvent("wheel", {
          deltaY: smoothDeltaY * sensitivity * acceleration,
          deltaMode: 0,
        })
      );

      lastTouchY = currentY;
      lastScrollTime = now;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default useTouchScroll;
