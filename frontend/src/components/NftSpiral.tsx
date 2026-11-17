import InfiniteSpiral from './reactbits/InfiniteSpiral';

const warriors = [
  { id: '4', rarity: 'Uncommon' },
  { id: '30', rarity: 'Rare' },
  { id: '300078', rarity: 'Rare' },
  { id: '400247', rarity: 'Rare' },
  { id: '193', rarity: 'Rare' },
];

const items = warriors.map(({ id, rarity }) => ({
  id,
  src: `/assets/nfts/${id}.jpg`,
  alt: `NFT ${id} de Guerrero Maya — ${rarity}`,
  caption: (
    <div className="nft-spiral-caption">
      <span className="eyebrow">GUERRERO MAYA COLLECTION</span>
      <strong>GUERRERO MAYA</strong>
      <span>GM COLLECTION · {rarity.toUpperCase()} · {id}</span>
    </div>
  ),
}));

export default function NftSpiral() {
  return (
    <div className="warrior-art">
      <InfiniteSpiral
        items={items}
        label="Colección de NFTs Guerrero Maya"
        cardWidth={206}
        cardHeight={160}
        radius={160}
        verticalSpacing={96}
        cardsPerTurn={5}
        speed={0.32}
      />
    </div>
  );
}
