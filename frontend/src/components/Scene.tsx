import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
const World = lazy(() => import('./World'));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function Scene({ kind }: { kind: 'temple' | 'bottle' | 'token' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setReady(false);
    }, { rootMargin: '150px' });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener('change', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  const token = kind === 'token';
  const enabled = visible && (token || !reduced);
  return <div ref={ref} className={`scene scene-${kind}`} data-ready={token && ready}>
    <img className="scene-poster" src={kind === 'bottle' ? '/assets/botella-poster.png' : '/assets/icon.webp'} alt="" />
    {enabled && <SceneBoundary><Suspense fallback={null}>
      <World kind={kind} animate={!reduced} onReady={token ? onReady : undefined} />
    </Suspense></SceneBoundary>}
  </div>;
}
