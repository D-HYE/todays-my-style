import rawData from "../data/data.json";

interface TypeItem {
  src: string;
  alt: string;
  defaultColor: string;
}

interface DataType {
  type: Record<string, TypeItem>;
}

const data: DataType = rawData as DataType;

interface ClothesIconProps {
  name: string;
  color?: string;
}

export default function Clothes({ name, color }: ClothesIconProps) {
  const t = data.type[name];
  if (!t) return null;

  return (
    <div style={{ position: 'relative' }}>
      <img src={t.src} alt={t.alt} style={{ opacity: 0 }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: color || t.defaultColor,
          WebkitMask: `url(${t.src}) no-repeat center / contain`,
          mask: `url(${t.src}) no-repeat center / contain`,
        }}
      />
    </div>
  );
}
