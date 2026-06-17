interface FlagProps { size?: number; }

export function FlagFR({ size = 20 }: FlagProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}>
      <defs><clipPath id="c-fr"><circle cx="14" cy="14" r="14" /></clipPath></defs>
      <g clipPath="url(#c-fr)">
        <rect x="0" y="0" width="9.34" height="28" fill="#002395" />
        <rect x="9.33" y="0" width="9.34" height="28" fill="#EDEDED" />
        <rect x="18.66" y="0" width="9.34" height="28" fill="#ED2939" />
      </g>
    </svg>
  );
}

export function FlagDZ({ size = 20 }: FlagProps) {
  const cx = 16.2, cy = 14, R = 3.7, r = 1.48;
  const pts = Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? R : r;
    return `${(cx + radius * Math.cos(angle)).toFixed(3)},${(cy + radius * Math.sin(angle)).toFixed(3)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}>
      <defs><clipPath id="c-dz"><circle cx="14" cy="14" r="14" /></clipPath></defs>
      <g clipPath="url(#c-dz)">
        <rect x="0" y="0" width="14" height="28" fill="#006233" />
        <rect x="14" y="0" width="14" height="28" fill="#FFFFFF" />
        <circle cx="15.0" cy="14" r="5.4" fill="#D21034" />
        <circle cx="16.7" cy="14" r="4.4" fill="#FFFFFF" />
        <polygon points={pts} fill="#D21034" />
      </g>
    </svg>
  );
}

export function FlagTZM({ size = 20 }: FlagProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}>
      <defs><clipPath id="c-tzm"><circle cx="14" cy="14" r="14" /></clipPath></defs>
      <g clipPath="url(#c-tzm)">
        <rect x="0" y="0" width="28" height="9.34" fill="#0099CC" />
        <rect x="0" y="9.33" width="28" height="9.34" fill="#99CC33" />
        <rect x="0" y="18.66" width="28" height="9.34" fill="#FFE513" />
        <text x="14" y="18" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#CC0033" fontFamily="serif">ⵣ</text>
      </g>
    </svg>
  );
}

export function FlagGB({ size = 20 }: FlagProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}>
      <defs><clipPath id="c-gb"><circle cx="14" cy="14" r="14" /></clipPath></defs>
      <g clipPath="url(#c-gb)">
        <rect width="28" height="28" fill="#012169" />
        <line x1="0" y1="0" x2="28" y2="28" stroke="#FFFFFF" strokeWidth="5.6" />
        <line x1="28" y1="0" x2="0" y2="28" stroke="#FFFFFF" strokeWidth="5.6" />
        <line x1="0" y1="0" x2="28" y2="28" stroke="#C8102E" strokeWidth="3.2" />
        <line x1="28" y1="0" x2="0" y2="28" stroke="#C8102E" strokeWidth="3.2" />
        <rect x="11.2" y="0" width="5.6" height="28" fill="#FFFFFF" />
        <rect x="0" y="11.2" width="28" height="5.6" fill="#FFFFFF" />
        <rect x="12.4" y="0" width="3.2" height="28" fill="#C8102E" />
        <rect x="0" y="12.4" width="28" height="3.2" fill="#C8102E" />
      </g>
    </svg>
  );
}

export function FlagIT({ size = 20 }: FlagProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}>
      <defs><clipPath id="c-it"><circle cx="14" cy="14" r="14" /></clipPath></defs>
      <g clipPath="url(#c-it)">
        <rect x="0" y="0" width="9.34" height="28" fill="#009246" />
        <rect x="9.33" y="0" width="9.34" height="28" fill="#F4F9FF" />
        <rect x="18.66" y="0" width="9.34" height="28" fill="#CE2B37" />
      </g>
    </svg>
  );
}

export function FlagES({ size = 20 }: FlagProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}>
      <defs><clipPath id="c-es"><circle cx="14" cy="14" r="14" /></clipPath></defs>
      <g clipPath="url(#c-es)">
        <rect x="0" y="0" width="28" height="7" fill="#AA151B" />
        <rect x="0" y="7" width="28" height="14" fill="#F1BF00" />
        <rect x="0" y="21" width="28" height="7" fill="#AA151B" />
      </g>
    </svg>
  );
}

export const FLAG_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  FR: FlagFR, AR: FlagDZ, TZM: FlagTZM, EN: FlagGB, IT: FlagIT, ES: FlagES,
};