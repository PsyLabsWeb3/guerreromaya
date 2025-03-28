import { useEffect } from "react";

const useTouchScroll = () => {
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      touchEndY = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaY = touchStartY - touchEndY;

      // Aumentamos significativamente la sensibilidad y la aceleración
      const sensitivity = 8.0;
      const acceleration = Math.abs(deltaY) > 30 ? 2.5 : 1.5;

      if (Math.abs(deltaY) > 5) {
        // Umbral más bajo para mayor respuesta
        window.dispatchEvent(
          new WheelEvent("wheel", {
            deltaY: deltaY * sensitivity * acceleration,
            deltaMode: 0,
          })
        );
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
