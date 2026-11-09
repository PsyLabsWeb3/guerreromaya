# Guerrero Maya — New Landing Design

Landing editorial en español, React 19 + TypeScript + Vite. Reemplaza Spline por escenas locales de Three.js / React Three Fiber / Drei y animaciones ligadas al scroll.

## Desarrollo

```sh
npm ci
npm run dev
npm run build
npm run lint
npm run preview
```

Copia `.env.example` a `.env.local` para configurar `VITE_DAPP_URL`. Por defecto conserva el destino beta de la landing original: `https://gm-dapp-beta.vercel.app`. Los CTA apuntan a `/mzcal`, `/mint` y `/rewards`. No conecta wallets ni realiza operaciones desde la landing.

## Diseño y contenido

- Entrada 3D con icono, pilares, escaleras, antorchas y maceta de la carpeta GLB original.
- Botella pintada a mano del proyecto MezcalGM-3D-Site.
- Paleta ámbar, negro y crema; Cinzel Decorative e Inter.
- Secciones de origen, ecosistema, $MZCAL, NFTs, beneficios Mythic, primeros pasos y FAQ.
- La ilustración Kukulcán se identifica como arte del universo GM; no se presenta como un NFT disponible. El inventario real se consulta en la dApp.
- No se publican la fecha provisional de claim, precios no verificados ni el marketplace sin implementar.
- Rutas heredadas redirigidas a secciones: `/mzcal`, `/elegibility`, `/barrels`, `/kukulcan`, `/mini-games`.
- Verificación de edad existente conservada con diálogo nativo, foco modal y persistencia tolerante a errores de almacenamiento.

## Renderizado

El código 3D se carga en un módulo diferido. Las dos escenas se montan cerca del viewport y se desmontan al salir, con caché de GLB, clones de geometría compartida y DPR máximo de 1.5. No hay un bucle global de scroll artificial. Los modelos se normalizan por bounding box y se animan por posición del scroll. El contenido HTML está disponible independientemente de WebGL.

`prefers-reduced-motion` evita cargar escenas y muestra imágenes estáticas. Un error de WebGL o de carga conserva el contenido y el poster. Los GLB originales se mantienen sin compresión destructiva; suman aproximadamente 12 MB con la botella. El chunk 3D es deliberadamente diferido y Vite puede emitir el aviso de tamaño >500 kB.

## React Bits

`src/components/reactbits/SpotlightCard` y `ScrollReveal` proceden de https://github.com/DavidHDev/react-bits (variantes TypeScript/CSS). Se incluye `REACT-BITS-LICENSE.md`. Adaptaciones: se eliminó un tipo sin uso; ScrollReveal respeta movimiento reducido, usa HTML válido y limpia exclusivamente su propio contexto GSAP en lugar de destruir todos los ScrollTriggers.

## Verificación

Build y lint; revisión de escritorio 1440 px y móvil 390 px en Chrome; ausencia de desbordamiento horizontal; menú móvil; navegación a NFT; redirección de elegibilidad; modo de movimiento reducido sin canvas; errores de ejecución del navegador. No se ejecutan transacciones ni se afirma disponibilidad en producción de los beneficios descritos.
