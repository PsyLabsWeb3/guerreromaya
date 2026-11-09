import { useRef, useState } from 'react';

const warriors = [
  { id: '4', rarity: 'Uncommon' },
  { id: '30', rarity: 'Rare' },
  { id: '300078', rarity: 'Rare' },
  { id: '400247', rarity: 'Rare' },
  { id: '193', rarity: 'Rare' },
];

export default function NftCarousel() {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const change = (direction: number) => setIndex(current => (current + direction + warriors.length) % warriors.length);

  return <div className="warrior-art nft-carousel" role="region" aria-roledescription="carrusel" aria-label="Colección de NFTs Guerrero Maya" onKeyDown={event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); change(event.key === 'ArrowRight' ? 1 : -1);
    }
  }}>
    <div className="nft-viewport" onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => {
      if (!touch.current) return;
      const dx = event.changedTouches[0].clientX - touch.current.x;
      const dy = event.changedTouches[0].clientY - touch.current.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) change(dx < 0 ? 1 : -1);
      touch.current = null;
    }}>
      <div className="nft-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {warriors.map((warrior, i) => <article className="warrior-frame nft-slide" key={warrior.id} aria-hidden={i !== index} role="group" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${warriors.length}: NFT ${warrior.id}, ${warrior.rarity}`}>
          <div className="nft-card-heading"><span className="eyebrow">GUERRERO MAYA COLLECTION</span><span className="nft-rarity">{warrior.rarity}</span></div>
          <img src={`/assets/nfts/${warrior.id}.jpg`} alt={`NFT ${warrior.id} de Guerrero Maya — ${warrior.rarity}`} loading="lazy" decoding="async" width="2304" height="1792" draggable={false} />
          <div className="warrior-caption"><strong>GUERRERO MAYA</strong><span>GM COLLECTION · {warrior.rarity.toUpperCase()} · {warrior.id}</span></div>
        </article>)}
      </div>
    </div>
    <div className="nft-controls">
      <button className="bottle-arrow" type="button" aria-label="NFT anterior" onClick={() => change(-1)}>←</button>
      <span className="nft-counter" aria-live="polite" aria-atomic="true">{String(index + 1).padStart(2, '0')} / 05<span className="sr-only"> · NFT {warriors[index].id}, {warriors[index].rarity}</span></span>
      <button className="bottle-arrow" type="button" aria-label="NFT siguiente" onClick={() => change(1)}>→</button>
    </div>
    <div className="bottle-dots" aria-label="Seleccionar NFT">{warriors.map((warrior, i) => <button key={warrior.id} type="button" aria-label={`Mostrar NFT ${warrior.id}`} aria-current={index === i ? 'true' : undefined} onClick={() => setIndex(i)}><span /></button>)}</div>
  </div>;
}
