import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
const World = lazy(() => import('./World'));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function Scene({ kind }: { kind: 'temple' | 'bottle' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => setEnabled(entry.isIntersecting && !media.matches), { rootMargin: '150px' });
    if (ref.current) observer.observe(ref.current);
    const update = () => { if (media.matches) setEnabled(false); else if (ref.current) { const r = ref.current.getBoundingClientRect(); setEnabled(r.bottom > -150 && r.top < innerHeight + 150); } };
    media.addEventListener('change', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  return <div ref={ref} className={`scene scene-${kind}`}><img className="scene-poster" src={kind === 'temple' ? '/assets/icon.webp' : '/assets/botella-poster.png'} alt="" />{enabled && <SceneBoundary><Suspense fallback={null}><World kind={kind} /></Suspense></SceneBoundary>}</div>;
}
