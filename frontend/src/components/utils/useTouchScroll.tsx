import { useEffect } from "react";

const useTouchScroll = () => {
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    let velocity = 0;
    let isScrolling = false;

    const threshold = 20; // Mínima distancia para activar el scroll
    const friction = 0.75; // Cuanto menor, más lento desacelera (0.9 es más lento, 0.98 más rápido)

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      touchEndY = event.touches[0].clientY;
    };

    const animateScroll = () => {
      if (Math.abs(velocity) > 0.5) {
        window.dispatchEvent(new WheelEvent("wheel", { deltaY: velocity }));
        velocity *= friction; // Reduce la velocidad progresivamente
        requestAnimationFrame(animateScroll);
      } else {
        isScrolling = false;
      }
    };

    const handleTouchEnd = () => {
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > threshold) {
        velocity = deltaY * 2; // Multiplicamos para intensificar el efecto
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(animateScroll);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
};

export default useTouchScroll;
