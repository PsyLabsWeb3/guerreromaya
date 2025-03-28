import { useEffect } from "react";

const useTouchScroll = () => {
  useEffect(() => {
    let lastTouchY = 0;
    let lastDeltaY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0].clientY;
      lastDeltaY = 0;
      event.preventDefault();
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const currentY = event.touches[0].clientY;
      const rawDeltaY = lastTouchY - currentY;

      // Suavizado del movimiento
      lastDeltaY = (rawDeltaY + lastDeltaY) / 2;

      // Aplicamos una curva de respuesta no lineal para movimientos más suaves
      const direction = Math.sign(lastDeltaY);
      const magnitude = Math.min(Math.abs(lastDeltaY), 25);
      const smoothDeltaY = direction * Math.pow(magnitude, 1.5);

      const sensitivity = 5.0;

      window.scrollBy({
        top: smoothDeltaY * sensitivity,
        behavior: "auto",
      });

      lastTouchY = currentY;
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default useTouchScroll;
