import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Group, Vector3, MathUtils } from 'three';

function Model({ name, position, size, rotation = 0 }: { name: string; position: [number, number, number]; size: number; rotation?: number }) {
  const { scene } = useGLTF(`/assets/${name}.glb`);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const dimensions = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = size / Math.max(dimensions.x, dimensions.y, dimensions.z);
    clone.scale.setScalar(scale);
    clone.position.copy(center.multiplyScalar(-scale));
    return clone;
  }, [scene, size]);
  return <group position={position} rotation={[0, rotation, 0]}><primitive object={object} /></group>;
}
function Temple({ progress }: { progress: React.RefObject<number> }) {
  const temple = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!temple.current) return;
    temple.current.rotation.y = MathUtils.damp(temple.current.rotation.y, progress.current * .42 - .12, 4, delta);
    state.camera.position.z = MathUtils.damp(state.camera.position.z, 12.5 - progress.current * 1.2, 4, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, 1.2 + progress.current * 1.1, 4, delta);
    state.camera.lookAt(0, .1, 0);
  });
  return <group ref={temple}>
    <Suspense fallback={null}><Model name="icono" position={[0, .8, 0]} size={2.8} /></Suspense>
    <Suspense fallback={null}><Model name="pilar" position={[-3.1, -.1, -.8]} size={5} /><Model name="pilar" position={[3.1, -.1, -.8]} size={5} /></Suspense>
    <Suspense fallback={null}><Model name="escaleras" position={[0, -2.2, 0]} size={6} /></Suspense>
    <Suspense fallback={null}><Model name="antorcha" position={[-2.1, -.7, 1.2]} size={1.5} /><Model name="antorcha" position={[2.1, -.7, 1.2]} size={1.5} /></Suspense>
    <Suspense fallback={null}><Model name="maceta" position={[3.3, -1.9, 1.3]} size={1} /></Suspense>
    <pointLight position={[-2, 0, 1.5]} color="#ff962f" intensity={12} /><pointLight position={[2, 0, 1.5]} color="#ff962f" intensity={12} />
  </group>;
}
function Bottle({ progress }: { progress: React.RefObject<number> }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, progress.current * Math.PI * 1.5, 5, delta); });
  return <group ref={ref}><Model name="botella" position={[0, 0, 0]} size={4.6} /></group>;
}
export default function World({ kind }: { kind: 'temple' | 'bottle' }) {
  const container = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const update = () => { const rect = el.getBoundingClientRect(); progress.current = MathUtils.clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1); };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); };
  }, []);
  return <div ref={container} className="world" aria-hidden="true"><Canvas camera={{ position: [0, 1.2, kind === 'temple' ? 12.5 : 7.5], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', (event) => { event.preventDefault(); gl.domElement.style.display = 'none'; gl.domElement.closest('.scene')?.setAttribute('data-failed', 'true'); }); }}>
    <ambientLight intensity={1.7} /><directionalLight position={[3, 5, 5]} intensity={4} color="#ffe3ae" /><directionalLight position={[-4, 2, 2]} intensity={2} color="#e7e5df" />
    <Suspense fallback={null}>{kind === 'temple' ? <Temple progress={progress} /> : <Bottle progress={progress} />}</Suspense>
  </Canvas></div>;
}
