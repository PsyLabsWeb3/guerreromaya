import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import './InfiniteSpiral.css';

// Adapted from React Bits InfiniteSpiral. See REACT-BITS-LICENSE.md.
interface SpiralItem {
  id: string;
  src: string;
  alt: string;
  caption: ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const modulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;
const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
};

interface SpiralProps {
  items: readonly SpiralItem[];
  label: string;
  cardWidth: number;
  cardHeight: number;
  radius: number;
  verticalSpacing: number;
  cardsPerTurn: number;
  speed: number;
}

export default function InfiniteSpiral({
  items, label, cardWidth, cardHeight, radius, verticalSpacing, cardsPerTurn, speed,
}: SpiralProps) {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const progress = useRef(0);
  const target = useRef(0);
  const drag = useRef<{ id: number; x: number } | null>(null);
  const hovered = useRef(false);
  const paused = useRef(false);
  const wake = useRef<(() => void) | null>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = items.length;

  useEffect(() => {
    const element = stage.current;
    if (!element || !count) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previousTime = 0;
    let activeIndex = -1;
    let visible = false;
    let fit = 1;
    let responsiveRadius = radius;

    const draw = () => {
      const half = count / 2;
      cards.current.forEach((card, index) => {
        if (!card) return;
        const offset = modulo(index - progress.current + half, count) - half;
        const edge = Math.abs(offset) / half;
        const angle = offset * (2 * Math.PI / cardsPerTurn);
        const x = Math.sin(angle) * responsiveRadius;
        const y = offset * verticalSpacing * fit;
        const z = Math.cos(angle) * responsiveRadius;
        const focus = 1 - Math.min(Math.abs(offset) / (cardsPerTurn * 0.65), 1);
        const scale = (1 + 0.14 * focus) * fit * (1000 / (1000 - z));
        card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        card.style.opacity = String(1 - smoothstep(0.60, 1, edge));
        card.style.filter = `blur(${2 * smoothstep(0.35, 1, edge)}px)`;
        card.style.zIndex = String(Math.round(z * 100) + index);
      });
      const next = modulo(Math.round(progress.current), count);
      if (activeIndex !== next) {
        activeIndex = next;
        setActive(next);
      }
    };

    const animate = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const delta = previousTime ? Math.min((now - previousTime) / 1000, 0.05) : 1 / 60;
      previousTime = now;
      const shouldSpin = !motion.matches && !paused.current && !hovered.current && !drag.current;
      if (shouldSpin) target.current += speed * delta;

      const remaining = target.current - progress.current;
      const settle = motion.matches || Math.abs(remaining) < 0.003;
      progress.current += settle ? remaining : remaining * (1 - Math.exp(-delta * (drag.current ? 22 : 11)));
      draw();

      if (shouldSpin || !settle) schedule();
      else previousTime = 0;
    };

    function schedule() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(animate);
    }

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = element;
      fit = Math.min(1, width / (cardWidth * 2.5), height / (cardHeight * 2.35));
      responsiveRadius = Math.min(radius, width * 0.36) * fit;
      draw();
    };

    const onMotion = () => {
      setReduced(motion.matches);
      if (motion.matches) target.current = Math.round(progress.current);
      schedule();
    };
    const onVisibility = () => {
      previousTime = 0;
      schedule();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      onVisibility();
    }, { threshold: 0.02 });
    intersection.observe(element);
    motion.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    wake.current = schedule;
    resize();
    onMotion();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      motion.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      wake.current = null;
    };
  }, [cardHeight, cardWidth, cardsPerTurn, count, radius, speed, verticalSpacing]);

  const select = (index: number) => {
    const offset = modulo(index - target.current + count / 2, count) - count / 2;
    target.current += offset;
    wake.current?.();
  };
  const step = (direction: number) => select(Math.round(target.current) + direction);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    target.current = progress.current;
    drag.current = { id: event.pointerId, x: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
    wake.current?.();
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = drag.current;
    if (pointer?.id !== event.pointerId) return;
    target.current -= (event.clientX - pointer.x) / verticalSpacing;
    pointer.x = event.clientX;
    wake.current?.();
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    target.current = Math.round(target.current);
    event.currentTarget.classList.remove('is-dragging');
    wake.current?.();
  };

  if (!count) return null;

  return (
    <div
      className="infinite-spiral"
      role="region"
      aria-label={label}
      onKeyDown={event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        step(event.key === 'ArrowRight' ? 1 : -1);
      }}
    >
      <div
        ref={stage}
        className="infinite-spiral__stage"
        onPointerEnter={event => { hovered.current = event.pointerType === 'mouse'; }}
        onPointerLeave={() => { hovered.current = false; wake.current?.(); }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <ul className="infinite-spiral__items" aria-label="Guerreros NFT">
          {items.map((item, index) => (
            <li
              className="infinite-spiral__item"
              key={item.id}
              ref={node => { cards.current[index] = node; }}
              style={{ width: cardWidth, height: cardHeight }}
            >
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
            </li>
          ))}
        </ul>
      </div>
      <div aria-live={isPaused || reduced ? 'polite' : 'off'} aria-atomic="true">
        {items[active % count].caption}
      </div>
      <div className="infinite-spiral__controls">
        <button className="bottle-arrow" type="button" aria-label="NFT anterior" onClick={() => step(-1)}>←</button>
        <span className="infinite-spiral__counter">
          {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
        {!reduced && (
          <button
            className="bottle-arrow infinite-spiral__pause"
            type="button"
            aria-label={isPaused ? 'Reanudar animación' : 'Pausar animación'}
            onClick={() => {
              paused.current = !paused.current;
              if (paused.current) target.current = Math.round(progress.current);
              setIsPaused(paused.current);
              wake.current?.();
            }}
          ><span aria-hidden="true">{isPaused ? '▶' : 'Ⅱ'}</span></button>
        )}
        <button className="bottle-arrow" type="button" aria-label="NFT siguiente" onClick={() => step(1)}>→</button>
      </div>
      <div className="bottle-dots" aria-label="Seleccionar NFT">
        {items.map((item, index) => (
          <button key={item.id} type="button" aria-label={`Mostrar NFT ${item.id}`} aria-current={index === active ? 'true' : undefined} onClick={() => select(index)}><span /></button>
        ))}
      </div>
    </div>
  );
}
