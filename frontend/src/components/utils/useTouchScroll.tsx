import { useEffect } from "react";

const useTouchScroll = () => {
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    let lastDeltaY = 0;
    let isScrolling = false;

    const threshold = 30; // Mínima distancia para activar el scroll
    const smoothFactor = 0.2; // Controla la suavidad del scroll

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      touchEndY = event.touches[0].clientY;
    };

    const smoothScroll = (deltaY: number) => {
      if (!isScrolling) {
        isScrolling = true;

        const animate = () => {
          lastDeltaY *= smoothFactor;
          if (Math.abs(lastDeltaY) > 0.5) {
            window.dispatchEvent(
              new WheelEvent("wheel", { deltaY: lastDeltaY })
            );
            requestAnimationFrame(animate);
          } else {
            isScrolling = false;
          }
        };

        lastDeltaY = deltaY;
        requestAnimationFrame(animate);
      }
    };

    const handleTouchEnd = () => {
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > threshold) {
        smoothScroll(deltaY * 2);
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
