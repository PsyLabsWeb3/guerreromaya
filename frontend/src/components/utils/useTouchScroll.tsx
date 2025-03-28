import { useEffect } from "react";

const useTouchScroll = () => {
  useEffect(() => {
    let touchStartY = 0;
    let lastTouchY = 0;
    let scrollVelocity = 0;
    let animationFrameId: number | null = null;

    const updateScroll = () => {
      if (Math.abs(scrollVelocity) > 0.1) {
        window.dispatchEvent(
          new WheelEvent("wheel", {
            deltaY: scrollVelocity,
            deltaMode: 0,
          })
        );

        // Reducir gradualmente la velocidad
        scrollVelocity *= 0.95;
        animationFrameId = requestAnimationFrame(updateScroll);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
      lastTouchY = touchStartY;
      scrollVelocity = 0;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY;
      const deltaY = lastTouchY - currentY;

      // Calculamos la velocidad del scroll
      const sensitivity = 8.0;
      const acceleration = Math.abs(deltaY) > 15 ? 2.0 : 1.0;

      scrollVelocity = deltaY * sensitivity * acceleration;

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateScroll);
      }

      lastTouchY = currentY;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
};

export default useTouchScroll;
