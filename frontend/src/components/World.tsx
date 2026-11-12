import { Suspense, useEffect, useMemo, useRef, type PointerEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import { Box3, Group, Vector3, MathUtils, Mesh, MeshStandardMaterial, MeshPhysicalMaterial, Color, FrontSide, ACESFilmicToneMapping, SRGBColorSpace } from 'three';

function Model({ name, position, size, rotation = 0, onReady }: { onReady?: () => void; name: string; position: [number, number, number]; size: number; rotation?: number }) {
  const { scene } = useGLTF(`/assets/${name}.glb`);
  useEffect(() => { onReady?.(); }, [onReady, scene]);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const dimensions = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const modelSize = Math.max(dimensions.x, dimensions.y, dimensions.z);
    const scale = size / modelSize;
    if (name.startsWith('botellas/') || name === 'botella') {
      clone.traverse(child => {
        if (!(child instanceof Mesh)) return;
        const convert = (source: MeshStandardMaterial) => {
          const materialName = source.name.toLowerCase();
          if (materialName === 'glass' || materialName === 'cristal claro') {
            return new MeshPhysicalMaterial({
              name: 'studio-glass', color: '#ffffff', metalness: 0,
              transmission: 0.96, opacity: 1, transparent: false,
              roughness: 0.025, ior: 1.5,
              // The scans use meters. Match the Reposado thickness of about 2% of bottle height.
              thickness: materialName === 'cristal claro' ? modelSize * 0.02 : 0.16,
              attenuationColor: new Color('#f4d5a2'), attenuationDistance: 2.5,
              clearcoat: 0.25, clearcoatRoughness: 0.03, envMapIntensity: 1.2,
              side: FrontSide,
            });
          }
          const material = source.clone();
          const colorMap = material.map;
          if (colorMap && colorMap.anisotropy < 8) {
            // Keep paint and print sharp where the curved surface faces away from the camera.
            colorMap.anisotropy = 8;
            colorMap.needsUpdate = true;
          }
          if (materialName.includes('etiqueta')) {
            material.metalness = 0;
            material.roughness = 0.85;
          }
          return material;
        };
        child.material = Array.isArray(child.material)
          ? child.material.map(convert) : convert(child.material);
      });
    }
    clone.scale.setScalar(scale);
    clone.position.copy(center.multiplyScalar(-scale));
    return clone;
  }, [scene, size, name]);
  useEffect(() => () => {
    if (name.startsWith('botellas/') || name === 'botella') object.traverse(child => {
      if (child instanceof Mesh) (Array.isArray(child.material) ? child.material : [child.material]).forEach(material => material.dispose());
    });
  }, [object, name]);
  return <group position={position} rotation={[0, rotation, 0]}><primitive object={object} dispose={null} /></group>;
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
type BottleDrag = { pointerId: number | null; lastX: number; angle: number };

function Bottle({ progress, drag, name, animate, onReady }: { progress: React.RefObject<number>; drag: React.RefObject<BottleDrag>; name: string; animate: boolean; onReady?: () => void }) {
  const ref = useRef<Group>(null);
  const scrollAngle = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const scrollTarget = animate ? (progress.current - 0.5) * Math.PI : 0;
    scrollAngle.current = MathUtils.damp(scrollAngle.current, scrollTarget, 5, delta);
    const gesture = drag.current;
    if (gesture.pointerId === null) {
      gesture.angle = animate ? MathUtils.damp(gesture.angle, 0, 8, delta) : 0;
    }
    ref.current.rotation.y = scrollAngle.current + gesture.angle;
  });
  return <group ref={ref}><Model key={name} name={name} onReady={onReady} position={[0, 0, 0]} size={4.6} /></group>;
}
export default function World({ kind, bottleName = 'botella', animate = true, onReady }: { kind: 'temple' | 'bottle'; bottleName?: string; animate?: boolean; onReady?: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const drag = useRef<BottleDrag>({ pointerId: null, lastX: 0, angle: 0 });

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = drag.current;
    if (!event.isPrimary || event.button !== 0 || gesture.pointerId !== null) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.pointerId = event.pointerId;
    gesture.lastX = event.clientX;
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = drag.current;
    if (gesture.pointerId !== event.pointerId) return;
    gesture.angle += (event.clientX - gesture.lastX) * 0.015;
    gesture.lastX = event.clientX;
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = drag.current;
    if (gesture.pointerId !== event.pointerId) return;
    gesture.pointerId = null;
    // Use the shortest return even after one or more complete turns.
    gesture.angle = Math.atan2(Math.sin(gesture.angle), Math.cos(gesture.angle));
  };

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const update = () => { const rect = el.getBoundingClientRect(); progress.current = MathUtils.clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1); };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); };
  }, []);
  return <div
    ref={container}
    className={kind === 'bottle' ? 'world world-bottle' : 'world'}
    aria-hidden="true"
    onPointerDown={kind === 'bottle' ? startDrag : undefined}
    onPointerMove={kind === 'bottle' ? moveDrag : undefined}
    onPointerUp={kind === 'bottle' ? endDrag : undefined}
    onPointerCancel={kind === 'bottle' ? endDrag : undefined}
    onLostPointerCapture={kind === 'bottle' ? endDrag : undefined}
  ><Canvas camera={{ position: [0, 1.2, kind === 'temple' ? 12.5 : 7.5], fov: 38 }} dpr={[1, kind === 'bottle' ? 2 : 1.5]} gl={{ alpha: true, antialias: true }} onCreated={({ gl }) => { gl.toneMapping = ACESFilmicToneMapping; gl.toneMappingExposure = kind === 'bottle' ? 1.2 : 1; gl.outputColorSpace = SRGBColorSpace; gl.domElement.addEventListener('webglcontextlost', (event) => { event.preventDefault(); gl.domElement.style.display = 'none'; gl.domElement.closest('.scene')?.setAttribute('data-failed', 'true'); }); }}>
    {kind === 'bottle' && <color attach="background" args={['#151711']} />}
    {kind === 'bottle' && <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={4} color="#fff7e8" position={[-3, 1, 3]} rotation={[0, 3 * Math.PI / 4, 0]} scale={[0.6, 7, 1]} />
      <Lightformer form="rect" intensity={3} color="#ffffff" position={[3, 0, 2]} rotation={[0, -3 * Math.PI / 4, 0]} scale={[0.4, 6, 1]} />
      <Lightformer form="rect" intensity={2} color="#fff1d6" position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 5, 1]} />
      <Lightformer form="rect" intensity={0.35} color="#f4e4c8" position={[0, 1, -4]} rotation={[0, 0, 0]} scale={[3, 7, 1]} />
    </Environment>}
    <ambientLight intensity={kind === 'bottle' ? 0.5 : 1.7} /><directionalLight position={[3, 5, 5]} intensity={4} color="#ffe3ae" /><directionalLight position={[-4, 2, 2]} intensity={2} color="#e7e5df" />
    <Suspense fallback={null}>{kind === 'temple' ? <Temple progress={progress} /> : <Bottle progress={progress} drag={drag} name={bottleName} animate={animate} onReady={onReady} />}</Suspense>
  </Canvas></div>;
}
