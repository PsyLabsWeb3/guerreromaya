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

      // Aumentamos la sensibilidad y agregamos aceleración
      const sensitivity = 3.5;
      const acceleration = Math.abs(deltaY) > 50 ? 1.5 : 1;

      if (Math.abs(deltaY) > 10) {
        // Reducimos el umbral para detectar movimientos más pequeños
        window.dispatchEvent(
          new WheelEvent("wheel", {
            deltaY: deltaY * sensitivity * acceleration,
            deltaMode: 0, // Asegura que el desplazamiento sea en píxeles
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
