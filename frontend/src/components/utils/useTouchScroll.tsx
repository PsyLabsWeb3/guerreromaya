import { useEffect } from "react";

const useTouchScroll = () => {
  useEffect(() => {
    let touchStartY = 0;
    let lastTouchY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
      lastTouchY = touchStartY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY;
      const deltaY = lastTouchY - currentY;

      // Configuración más agresiva
      const sensitivity = 15.0;
      const acceleration = Math.abs(deltaY) > 20 ? 3.5 : 2.0;

      window.dispatchEvent(
        new WheelEvent("wheel", {
          deltaY: deltaY * sensitivity * acceleration,
          deltaMode: 0,
        })
      );

      lastTouchY = currentY;
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
