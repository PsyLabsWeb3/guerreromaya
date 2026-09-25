import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
const World = lazy(() => import('./World'));
const bottles = [
  { file: 'pintada_a_mano', label: 'Pintada a mano' },
  { file: 'reposado', label: 'Reposado' },
  { file: 'reposado_v2', label: 'Reposado · V2' },
  { file: 'resposado_v3', label: 'Reposado · V3' },
  { file: 'botella-resposado_v3', label: 'Botella Reposado · V3' },
];
class BottleBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="bottle-message" role="status">No se pudo cargar esta botella. Prueba otra con los botones.</p> : this.props.children; }
}
export default function BottleSlider() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bottle = bottles[index];
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '150px' });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  const select = (next: number) => { if (next !== index) { setReady(false); setIndex(next); } };
  const change = (direction: number) => select((index + direction + bottles.length) % bottles.length);
  return <div ref={ref} className="bottle-slider" role="region" aria-roledescription="carrusel" aria-label="Botellas Guerrero Maya" onKeyDown={event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); change(event.key === 'ArrowRight' ? 1 : -1); }
  }}>
    <div className="bottle-stage" role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${bottles.length}: ${bottle.label}`}>
      <BottleBoundary key={bottle.file}>
        {!ready && <p className="bottle-message" role="status">Cargando botella…</p>}
        {visible && <Suspense fallback={null}><World kind="bottle" bottleName={`botellas/${bottle.file}`} animate={!reduced} onReady={onReady} /></Suspense>}
      </BottleBoundary>
    </div>
    <div className="bottle-controls">
      <button type="button" className="bottle-arrow" onClick={() => change(-1)} aria-label="Botella anterior">←</button>
      <div className="bottle-caption" aria-live="polite" aria-atomic="true"><span>{String(index + 1).padStart(2, '0')} / {String(bottles.length).padStart(2, '0')}</span><strong>{bottle.label}</strong></div>
      <button type="button" className="bottle-arrow" onClick={() => change(1)} aria-label="Botella siguiente">→</button>
    </div>
    <div className="bottle-dots" aria-label="Seleccionar botella">{bottles.map((item, i) => <button type="button" key={item.file} onClick={() => select(i)} aria-label={`Mostrar ${item.label}`} aria-current={i === index ? 'true' : undefined}><span /></button>)}</div>
  </div>;
}
