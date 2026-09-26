import { Project } from "@/lib/data";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const BG = "#0b0a0f";

function Defs({ id, accent }: { id: string; accent: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#121017" />
        <stop offset="1" stopColor={BG} />
      </linearGradient>
      <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ff6b86" />
        <stop offset="0.55" stopColor={accent} />
        <stop offset="1" stopColor="#5e0018" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={accent} stopOpacity="0.55" />
        <stop offset="1" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-noise`}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  );
}

type Ctx = { id: string; accent: string; rnd: () => number };

/* ---------------- Renderers ---------------- */

function grid({ id, accent, rnd }: Ctx) {
  const lines = [];
  for (let i = 0; i <= 14; i++) {
    const x = 40 + i * 23;
    lines.push(
      <line
        key={`v${i}`}
        x1={x}
        y1={30 + rnd() * 20}
        x2={x - 60}
        y2={270}
        stroke="rgba(244,241,234,0.07)"
        strokeWidth="1"
      />,
    );
  }
  return (
    <>
      {lines}
      <rect x="60" y="60" width="180" height="180" fill={`url(#${id}-glow)`} />
      <rect
        x="110"
        y="95"
        width="120"
        height="120"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="140"
        y="125"
        width="120"
        height="120"
        stroke="rgba(244,241,234,0.45)"
        strokeWidth="1"
        fill="none"
      />
    </>
  );
}

function orbit({ id, accent, rnd }: Ctx) {
  const rings = [40, 72, 105, 140].map((r, i) => (
    <circle
      key={r}
      cx="200"
      cy="150"
      r={r}
      fill="none"
      stroke={i === 1 ? accent : "rgba(244,241,234,0.14)"}
      strokeWidth={i === 1 ? 1.6 : 1}
    />
  ));
  const dots = Array.from({ length: 16 }, (_, i) => {
    const a = rnd() * Math.PI * 2;
    const r = 20 + rnd() * 125;
    return (
      <circle
        key={i}
        cx={200 + Math.cos(a) * r}
        cy={150 + Math.sin(a) * r * 0.62}
        r={rnd() < 0.25 ? 2.4 : 1.2}
        fill={rnd() < 0.3 ? accent : "rgba(244,241,234,0.5)"}
      />
    );
  });
  return (
    <>
      <circle cx="200" cy="150" r="150" fill={`url(#${id}-glow)`} />
      {rings}
      {dots}
      <circle cx="200" cy="150" r="16" fill={accent} />
    </>
  );
}

function matrix({ id, accent, rnd }: Ctx) {
  const cells = [];
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 14; x++) {
      const on = rnd();
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={36 + x * 24}
          y={24 + y * 28}
          width={on > 0.82 ? 14 : 6}
          height={on > 0.82 ? 14 : 6}
          rx="1"
          fill={on > 0.88 ? accent : "rgba(244,241,234,0.16)"}
        />,
      );
    }
  }
  return (
    <>
      <rect x="0" y="0" width="400" height="300" fill={`url(#${id}-glow)`} opacity="0.5" />
      {cells}
    </>
  );
}

function flow({ accent, rnd }: Ctx) {
  const paths = Array.from({ length: 9 }, (_, i) => {
    const y = 30 + i * 32;
    const a = rnd() * 40;
    return (
      <path
        key={i}
        d={`M0 ${y} C 100 ${y - a}, 220 ${y + a}, 400 ${y - a * 0.4}`}
        fill="none"
        stroke={i % 4 === 1 ? accent : "rgba(244,241,234,0.16)"}
        strokeWidth={i % 4 === 1 ? 1.8 : 1}
      />
    );
  });
  return <>{paths}</>;
}

function mark({ id, accent }: Ctx) {
  return (
    <>
      <circle cx="200" cy="150" r="110" fill={`url(#${id}-glow)`} />
      <circle
        cx="200"
        cy="150"
        r="96"
        fill="none"
        stroke={accent}
        strokeWidth="2"
      />
      <rect
        x="128"
        y="78"
        width="144"
        height="144"
        fill="none"
        stroke="rgba(244,241,234,0.55)"
        strokeWidth="1.5"
      />
      <path d="M128 78 L272 222 M272 78 L128 222" stroke="rgba(244,241,234,0.2)" strokeWidth="1" />
      <text
        x="200"
        y="158"
        textAnchor="middle"
        fill="var(--ink)"
        style={{ font: "800 64px var(--font-display)" }}
      >
        BC
      </text>
    </>
  );
}

function weave({ accent }: Ctx) {
  const bands = [];
  for (let i = -6; i < 12; i++) {
    bands.push(
      <path
        key={i}
        d={`M${i * 44} 300 L${i * 44 + 120} 0 L${i * 44 + 134} 0 L${i * 44 + 14} 300 Z`}
        fill={i % 3 === 0 ? accent : "rgba(244,241,234,0.07)"}
        opacity={i % 3 === 0 ? 0.85 : 1}
      />,
    );
  }
  return (
    <>
      <g clipPath="inset(0 round 0)">{bands}</g>
      <rect x="0" y="0" width="400" height="300" fill={accent} opacity="0.08" />
    </>
  );
}

function pulse({ id, accent, rnd }: Ctx) {
  const pts = Array.from({ length: 80 }, (_, i) => {
    const x = 20 + i * 4.6;
    const y =
      150 +
      Math.sin(i * 0.35) * (38 + rnd() * 10) +
      Math.sin(i * 0.08) * 12;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <>
      <circle cx="200" cy="150" r="140" fill={`url(#${id}-glow)`} />
      {[60, 110, 160, 210].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke="rgba(244,241,234,0.08)"
        />
      ))}
      <polyline
        points={pts}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="350" cy="150" r="4" fill={accent} />
    </>
  );
}

function neural({ id, accent, rnd }: Ctx) {
  const nodes = Array.from({ length: 14 }, () => ({
    x: 50 + rnd() * 300,
    y: 40 + rnd() * 220,
    r: 3 + rnd() * 4,
  }));
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 110) {
        edges.push(
          <line
            key={`${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={d < 70 ? accent : "rgba(244,241,234,0.14)"}
            strokeWidth={d < 70 ? 1.4 : 1}
            opacity={d < 70 ? 0.9 : 0.6}
          />,
        );
      }
    }
  }
  return (
    <>
      <circle cx="200" cy="150" r="150" fill={`url(#${id}-glow)`} />
      {edges}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={i % 4 === 0 ? accent : "rgba(244,241,234,0.65)"}
        />
      ))}
    </>
  );
}

function prism({ id, accent }: Ctx) {
  return (
    <>
      <circle cx="200" cy="150" r="140" fill={`url(#${id}-glow)`} />
      <path d="M200 30 L320 250 L80 250 Z" fill="none" stroke="rgba(244,241,234,0.5)" strokeWidth="1.5" />
      <path d="M200 62 L286 234 L114 234 Z" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M200 94 L252 218 L148 218 Z" fill={accent} opacity="0.16" />
      {["#ff6b86", accent, "#8e0028"].map((c, i) => (
        <line
          key={i}
          x1={200}
          y1={150}
          x2={40 + i * 50}
          y2={280}
          stroke={c}
          strokeWidth="2"
          opacity="0.8"
        />
      ))}
    </>
  );
}

function nocturne({ id, accent, rnd }: Ctx) {
  const lines = Array.from({ length: 34 }, (_, i) => (
    <line
      key={i}
      x1="0"
      y1={i * 9 + rnd() * 3}
      x2="400"
      y2={i * 9 + rnd() * 3}
      stroke="rgba(244,241,234,0.05)"
    />
  ));
  return (
    <>
      <rect x="0" y="0" width="400" height="300" fill={`url(#${id}-bg)`} />
      <circle cx="200" cy="190" r="120" fill={`url(#${id}-glow)`} />
      <path d="M60 190 A140 140 0 0 1 340 190 Z" fill={accent} opacity="0.9" />
      <path d="M60 190 A140 140 0 0 1 340 190" fill="none" stroke="rgba(244,241,234,0.4)" strokeWidth="1" />
      {lines}
    </>
  );
}

function commerce({ accent, rnd }: Ctx) {
  const cards = [
    [60, 60, 0],
    [150, 90, 1],
    [240, 60, 2],
  ];
  return (
    <>
      {cards.map(([x, y, i]) => (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width="110"
            height="140"
            rx="3"
            fill={i === 1 ? accent : "rgba(244,241,234,0.06)"}
            opacity={i === 1 ? 0.92 : 1}
          />
          <rect
            x={x + 14}
            y={y + 16}
            width={i === 1 ? 40 : 60}
            height="8"
            rx="2"
            fill={i === 1 ? "rgba(255,255,255,0.75)" : "rgba(244,241,234,0.3)"}
          />
          <rect
            x={x + 14}
            y={y + 36}
            width="70"
            height="6"
            rx="2"
            fill={i === 1 ? "rgba(255,255,255,0.45)" : "rgba(244,241,234,0.16)"}
          />
        </g>
      ))}
      <circle cx="300" cy="215" r="46" fill="none" stroke={accent} strokeWidth="2" />
      <text
        x="300"
        y="222"
        textAnchor="middle"
        fill={accent}
        style={{ font: "700 22px var(--font-display)" }}
      >
        +
      </text>
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={i}
          cx={rnd() * 400}
          cy={rnd() * 300}
          r={1.5}
          fill="rgba(244,241,234,0.3)"
        />
      ))}
    </>
  );
}

function atlas({ accent }: Ctx) {
  const frames = [0, 26, 52, 78];
  return (
    <>
      {frames.map((o, i) => (
        <rect
          key={o}
          x={80 + o}
          y={60 + o * 0.6}
          width={240 - o * 1.6}
          height={180 - o * 1.2}
          fill="none"
          stroke={i === 1 ? accent : "rgba(244,241,234,0.18)"}
          strokeWidth={i === 1 ? 2 : 1}
        />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line
          key={i}
          x1={100}
          y1={90 + i * 30}
          x2={300}
          y2={90 + i * 30}
          stroke="rgba(244,241,234,0.12)"
        />
      ))}
    </>
  );
}

const RENDERERS: Record<string, (ctx: Ctx) => React.ReactNode> = {
  grid,
  orbit,
  matrix,
  flow,
  mark,
  weave,
  pulse,
  neural,
  prism,
  nocturne,
  commerce,
  atlas,
};

export function ProjectVisual({
  variant,
  accent = "#e8214b",
  className = "",
  seed = 0,
}: {
  variant: string;
  accent?: string;
  className?: string;
  seed?: number;
}) {
  const id = `pv-${variant}-${seed}`;
  const rnd = mulberry32(hashString(variant) + seed * 7919);
  const render = RENDERERS[variant] ?? grid;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <Defs id={id} accent={accent} />
      <rect x="0" y="0" width="400" height="300" fill={`url(#${id}-bg)`} />
      {render({ id, accent, rnd })}
      <rect
        x="0"
        y="0"
        width="400"
        height="300"
        filter={`url(#${id}-noise)`}
        opacity="0.06"
      />
    </svg>
  );
}

export function ServiceVisual({
  variant,
  className = "",
}: {
  variant: string;
  className?: string;
}) {
  return (
    <ProjectVisual
      variant={variant}
      accent="#e8214b"
      className={className}
      seed={2}
    />
  );
}

export function ProjectThumb({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <ProjectVisual
      variant={project.visual}
      accent={project.accent}
      className={className}
      seed={1}
    />
  );
}
