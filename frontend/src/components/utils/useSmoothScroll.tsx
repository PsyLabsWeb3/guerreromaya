import { useEffect } from "react";

const useSmoothScroll = () => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Detectar si el evento proviene de un trackpad o un mouse
      const isTrackpad = event.deltaMode === 0;
      const speedFactor = isTrackpad ? 0.3 : 1; // Ajustar la velocidad del trackpad

      window.scrollBy({
        top: event.deltaY * speedFactor,
        behavior: "auto", // Evita que sea brusco
      });

      event.preventDefault(); // Evita el comportamiento predeterminado
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
};

export default useSmoothScroll;
