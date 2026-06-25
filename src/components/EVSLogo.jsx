// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare Ltd — Logo Mark (SVG Icon Component)
//
// Matches the circular emblem from the brand logo:
//   - Outer thick metallic ring (rose-gold / copper gradient)
//   - Inner thinner ring (lighter gold)
//   - Top arc bracket and bottom arc bracket (thick, between the two rings)
//   - 5-petal fan motif: dark centre petal, mid-gold inner pair, light-gold outer pair
//   - "EVS" serif lettering below the fan
//
// Props:
//   size      — pixel dimension (width = height). Default 48.
//   className — optional CSS class forwarded to the <svg> element.
//   dark      — when true, renders "EVS" text in gold (for use on dark backgrounds).
// ─────────────────────────────────────────────────────────────────────────────

export default function EVSLogo({ size = 48, className = "", dark = false }) {
  // Unique gradient IDs per instance so multiple logos on the same page
  // don't share/clobber each other's <defs> when the SVG is inlined.
  const uid = `evs-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EVS Healthcare Ltd"
    >
      <title>EVS Healthcare Ltd</title>

      <defs>
        {/* ── Metallic gold / rose-copper ring gradient ── */}
        <linearGradient id={`${uid}-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#c09060" />
          <stop offset="15%"  stopColor="#e8c060" />
          <stop offset="30%"  stopColor="#C4972A" />
          <stop offset="48%"  stopColor="#f2d87a" />
          <stop offset="60%"  stopColor="#9a7018" />
          <stop offset="78%"  stopColor="#d4a840" />
          <stop offset="100%" stopColor="#7a5810" />
        </linearGradient>

        {/* ── Lighter inner ring gradient ── */}
        <linearGradient id={`${uid}-ring-inner`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#e0b850" />
          <stop offset="50%"  stopColor="#f5df90" />
          <stop offset="100%" stopColor="#b08828" />
        </linearGradient>

        {/* ── Arc bracket gradient (same as outer ring but slightly darker) ── */}
        <linearGradient id={`${uid}-arc`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#8B6010" />
          <stop offset="20%"  stopColor="#c49030" />
          <stop offset="45%"  stopColor="#e8c060" />
          <stop offset="65%"  stopColor="#C4972A" />
          <stop offset="85%"  stopColor="#d4a840" />
          <stop offset="100%" stopColor="#9a7018" />
        </linearGradient>

        {/* ── Petal gradients: dark centre → warm gold → light outer ── */}
        <linearGradient id={`${uid}-pc`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#2a1400" />
          <stop offset="60%"  stopColor="#5a3010" />
          <stop offset="100%" stopColor="#3d2008" />
        </linearGradient>
        <linearGradient id={`${uid}-pm`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#4a3008" />
          <stop offset="50%"  stopColor="#9a7020" />
          <stop offset="100%" stopColor="#C4972A" />
        </linearGradient>
        <linearGradient id={`${uid}-po`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#8a6818" />
          <stop offset="50%"  stopColor="#C4972A" />
          <stop offset="100%" stopColor="#e0c060" />
        </linearGradient>
      </defs>

      {/* ══════════════════════════════════════════════════════════════════════
          RING STRUCTURE
          Outer ring  r=52, strokeWidth=6
          Inner ring  r=44, strokeWidth=1.6
          Arc brackets sit at r=48 (between the two rings)
          ══════════════════════════════════════════════════════════════════════ */}

      {/* Outer thick metallic ring */}
      <circle
        cx="60" cy="60" r="52"
        stroke={`url(#${uid}-ring)`}
        strokeWidth="6"
        fill="none"
      />

      {/* Inner thin ring */}
      <circle
        cx="60" cy="60" r="44"
        stroke={`url(#${uid}-ring-inner)`}
        strokeWidth="1.6"
        fill="white"
      />

      {/*
        ── TOP ARC BRACKET ──
        In the original, this is a very wide arc spanning from ~8 o'clock to ~4 o'clock
        (roughly 240° of the top half). It sits at radius ≈48, between the two rings.

        Arc path: start at left side (x=12.5, y=58) sweeping right to (x=107.5, y=58)
        with radius 48, large-arc=1, sweep=1 (clockwise top half).
        The y=58 means it starts/ends just below center, giving the wide span.
      */}
      <path
        d="M 12.5 62 A 48 48 0 1 1 107.5 62"
        stroke={`url(#${uid}-arc)`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/*
        ── BOTTOM ARC BRACKET ──
        Mirror: same span but in the lower half, opening upward.
        Start right, sweep counter-clockwise to left.
        Slightly tighter radius (46) to give visible gap from top bracket.
      */}
      <path
        d="M 14 66 A 46 46 0 0 0 106 66"
        stroke={`url(#${uid}-arc)`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          FAN / PEACOCK PETAL MOTIF
          Base point: (60, 60) — centre of circle
          Petals are ellipses rotated around the base point.
          Drawing order: outermost first (behind), innermost last (on top).
          ══════════════════════════════════════════════════════════════════════ */}

      {/* Outer left  — ~45° from vertical, lightest gold */}
      <ellipse
        cx="60" cy="40.5"
        rx="3.0" ry="10.5"
        fill={`url(#${uid}-po)`}
        opacity="0.9"
        transform="rotate(-46 60 60)"
      />
      {/* Outer right */}
      <ellipse
        cx="60" cy="40.5"
        rx="3.0" ry="10.5"
        fill={`url(#${uid}-po)`}
        opacity="0.9"
        transform="rotate(46 60 60)"
      />

      {/* Inner left  — ~23° from vertical, mid gold */}
      <ellipse
        cx="60" cy="39"
        rx="3.3" ry="11.5"
        fill={`url(#${uid}-pm)`}
        transform="rotate(-23 60 60)"
      />
      {/* Inner right */}
      <ellipse
        cx="60" cy="39"
        rx="3.3" ry="11.5"
        fill={`url(#${uid}-pm)`}
        transform="rotate(23 60 60)"
      />

      {/* Centre petal — straight up, darkest, tallest */}
      <ellipse
        cx="60" cy="38"
        rx="3.6" ry="12.5"
        fill={`url(#${uid}-pc)`}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          EVS LETTERING
          Serif, dark (or gold on dark backgrounds), centred below fan.
          y=73 places it in the lower portion of the circle interior.
          ══════════════════════════════════════════════════════════════════════ */}
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', 'Palatino Linotype', serif"
        fontSize="13"
        fontWeight="700"
        fill={dark ? "black" : "black"}
        letterSpacing="3"
      >
        EVS
      </text>
    </svg>
  );
}