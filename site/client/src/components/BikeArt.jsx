// Inline-SVG side-profile illustrations of every model line, drawn in code so
// each model card, model row, detail hero and variant has a picture before a
// real photo is uploaded. One shared 400×240 canvas; `type` picks the
// silhouette and the remaining props pick paint and fitments, driven from
// the `art` entries in data/models.js.
const TYRE = '#1c1b1b';
const DARK = '#2d2b2b';
const ENGINE = '#3c3a39';
const FIN = '#5f5c5b';
const METAL = '#8f8b89';
const CHROME = '#cfccca';
const LAMP = '#fff6c7';
const TAIL = '#e0301a';

function Wheel({ cx, cy, r, alloy = true, disc = false, knobby = false, wide = false }) {
  const spokes = alloy ? 5 : 18;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={TYRE} strokeWidth={wide ? 14 : 10} />
      {knobby && (
        <circle cx={cx} cy={cy} r={r + (wide ? 7 : 5)} fill="none" stroke={TYRE} strokeWidth="4" strokeDasharray="4 4" />
      )}
      <circle cx={cx} cy={cy} r={r - 7} fill="none" stroke={METAL} strokeWidth="2.5" />
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i / spokes) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(a) * (r - 8)}
            y2={cy + Math.sin(a) * (r - 8)}
            stroke={alloy ? DARK : METAL}
            strokeWidth={alloy ? 4 : 1}
            strokeLinecap="round"
          />
        );
      })}
      {disc && (
        <>
          <circle cx={cx} cy={cy} r={r * 0.45} fill="none" stroke={CHROME} strokeWidth="5" />
          <rect x={cx + r * 0.3} y={cy - r * 0.55} width="9" height="14" rx="3" fill={TAIL} />
        </>
      )}
      <circle cx={cx} cy={cy} r="5" fill={CHROME} stroke={DARK} strokeWidth="1.5" />
    </g>
  );
}

function Engine({ x = 0, y = 0, fins = 4 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M165 132 L198 106 L238 112 L236 168 L170 172 Z" fill={ENGINE} />
      {Array.from({ length: fins }, (_, i) => (
        <line key={i} x1={204 + i * 2} y1={114 + i * 7} x2={234} y2={118 + i * 7} stroke={FIN} strokeWidth="3" />
      ))}
      <circle cx="188" cy="152" r="13" fill="#4b4847" stroke={FIN} strokeWidth="2" />
      <circle cx="188" cy="152" r="4" fill={METAL} />
    </g>
  );
}

function Sport({ color, accent, frame, exhaust, disc, alloy }) {
  return (
    <g>
      <Wheel cx={100} cy={160} r={38} alloy={alloy} disc={disc} wide />
      <Wheel cx={305} cy={160} r={38} alloy={alloy} disc={disc} />
      <path d="M100 155 L186 146 L188 158 L100 166 Z" fill={DARK} />
      <path d="M72 128 Q98 106 128 118 L124 124 Q98 116 78 132 Z" fill={DARK} />
      <Engine />
      {exhaust === 'under' ? (
        <path d="M168 172 L240 170 L246 182 Q205 190 172 184 Z" fill={DARK} />
      ) : (
        <>
          <path d="M208 168 Q170 176 150 160" fill="none" stroke={METAL} strokeWidth="6" />
          <path d="M104 140 L162 148 L164 162 L108 156 Z" fill={DARK} />
          <path d="M104 140 L112 141 L114 157 L108 156 Z" fill={CHROME} />
        </>
      )}
      <g stroke={frame} strokeWidth="5" strokeLinecap="round" fill="none">
        <polyline points="262,88 208,110 176,148" />
        <polyline points="262,100 240,160" />
        <polyline points="208,110 240,160" />
      </g>
      <path d="M90 80 L152 96 L152 110 L120 112 Z" fill={color} />
      <path d="M86 78 L96 80 L98 88 L88 87 Z" fill={TAIL} />
      <path d="M108 88 L152 96 L152 102 L112 96 Z" fill="#3a3837" />
      <path d="M150 98 L206 100 Q213 102 212 110 L150 112 Z" fill={DARK} />
      <path d="M200 102 C206 80 240 74 266 82 L268 92 C262 108 240 116 212 113 Z" fill={color} />
      <path d="M214 92 C228 82 246 80 262 84" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
      <path d="M236 110 L268 93 L284 104 L264 134 L234 138 Z" fill={accent} />
      <line x1="266" y1="82" x2="305" y2="160" stroke={CHROME} strokeWidth="8" strokeLinecap="round" />
      <line x1="268" y1="84" x2="303" y2="152" stroke={METAL} strokeWidth="2" />
      <path d="M280 130 Q305 110 334 126 L330 134 Q305 120 285 138 Z" fill={color} />
      <path d="M270 72 L294 80 L292 106 L276 102 Z" fill={DARK} />
      <path d="M282 84 L292 87 L291 98 L282 96 Z" fill={LAMP} />
      <line x1="262" y1="76" x2="242" y2="68" stroke={DARK} strokeWidth="5" strokeLinecap="round" />
      <line x1="256" y1="72" x2="252" y2="58" stroke={DARK} strokeWidth="2" />
      <ellipse cx="250" cy="56" rx="7" ry="4" fill={DARK} />
    </g>
  );
}

function Commuter({ color, accent, disc, alloy, rugged }) {
  return (
    <g>
      <Wheel cx={100} cy={160} r={36} alloy={alloy} disc={false} knobby={rugged} />
      <Wheel cx={300} cy={160} r={36} alloy={alloy} disc={disc} knobby={rugged} />
      <path d="M100 155 L186 148 L188 158 L100 166 Z" fill={DARK} />
      <line x1="126" y1="100" x2="106" y2="154" stroke={CHROME} strokeWidth="7" strokeLinecap="round" />
      <line x1="126" y1="100" x2="106" y2="154" stroke={DARK} strokeWidth="7" strokeDasharray="2 3" />
      <Engine x={2} y={0} fins={3} />
      <path d="M200 168 Q160 170 150 156" fill="none" stroke={METAL} strokeWidth="6" />
      <path d="M86 146 Q90 140 100 141 L168 148 Q174 154 168 160 L98 158 Q86 156 86 146 Z" fill={CHROME} />
      <path d="M118 145 L158 149 L158 157 L118 154 Z" fill={DARK} />
      {rugged && <path d="M168 176 L236 174 L242 160 L240 182 Q205 190 168 184 Z" fill={METAL} />}
      <line x1="256" y1="88" x2="206" y2="130" stroke={DARK} strokeWidth="7" strokeLinecap="round" />
      <path d="M58 152 Q66 112 110 110 L122 118 Q80 118 68 154 Z" fill={color} />
      <path d="M56 116 L70 112 L72 122 L60 126 Z" fill={TAIL} />
      <path d="M142 100 L194 104 L190 134 L150 130 Z" fill={color} />
      <path d="M150 112 L188 115" stroke={accent} strokeWidth="4" />
      {rugged && (
        <g stroke={METAL} strokeWidth="3" fill="none">
          <polyline points="74,88 128,88 128,96" />
          <line x1="84" y1="88" x2="84" y2="96" />
          <line x1="98" y1="88" x2="98" y2="96" />
          <line x1="112" y1="88" x2="112" y2="96" />
          <line x1="74" y1="88" x2="74" y2="110" />
        </g>
      )}
      <path d="M90 96 Q94 88 130 88 L206 94 Q214 96 212 104 L94 104 Z" fill={DARK} />
      {!rugged && <path d="M100 96 L200 98" stroke="#4a4746" strokeWidth="1.5" strokeDasharray="6 4" />}
      <path d="M198 100 C202 80 236 72 262 82 L260 98 C244 110 214 110 198 106 Z" fill={color} />
      <path d="M212 90 C226 82 242 80 256 84" fill="none" stroke={accent} strokeWidth="4" />
      {rugged && <path d="M214 96 L236 94 L236 104 L216 105 Z" fill={DARK} />}
      <line x1="258" y1="80" x2="300" y2="160" stroke={CHROME} strokeWidth="7" strokeLinecap="round" />
      {rugged && <line x1="270" y1="102" x2="286" y2="132" stroke={DARK} strokeWidth="11" />}
      <path d="M276 132 Q300 114 328 128 L324 136 Q300 122 281 140 Z" fill={rugged ? DARK : color} />
      <path d="M262 64 L286 68 L288 92 L266 94 Z" fill={rugged ? DARK : color} />
      <ellipse cx="282" cy="80" rx="5" ry="9" fill={LAMP} />
      <path d="M258 66 Q248 52 230 58" fill="none" stroke={DARK} strokeWidth="5" strokeLinecap="round" />
      <line x1="252" y1="58" x2="248" y2="44" stroke={DARK} strokeWidth="2" />
      <ellipse cx="246" cy="42" rx="7" ry="4" fill={DARK} />
    </g>
  );
}

function Cruiser({ color, accent }) {
  return (
    <g>
      <Wheel cx={95} cy={162} r={35} alloy wide />
      <Wheel cx={318} cy={160} r={38} alloy disc />
      <path d="M95 157 L184 150 L186 160 L95 168 Z" fill={DARK} />
      <line x1="120" y1="108" x2="102" y2="156" stroke={CHROME} strokeWidth="7" strokeLinecap="round" />
      <Engine x={0} y={4} fins={5} />
      <path d="M212 172 L120 166" stroke={CHROME} strokeWidth="7" strokeLinecap="round" />
      <path d="M66 138 L136 148 Q142 156 134 162 L68 152 Q60 146 66 138 Z" fill={CHROME} />
      <path d="M54 156 Q58 116 104 112 L126 120 Q78 120 66 158 Z" fill={color} />
      <path d="M52 124 L64 120 L66 130 L56 132 Z" fill={TAIL} />
      <line x1="262" y1="92" x2="208" y2="132" stroke={DARK} strokeWidth="8" strokeLinecap="round" />
      <path d="M78 66 L90 64 L96 104 L84 106 Z" fill={DARK} />
      <path d="M84 98 L126 106 L126 116 L88 110 Z" fill="#3a3837" />
      <path d="M124 110 Q164 128 204 116 L210 124 Q164 140 124 122 Z" fill={DARK} />
      <path d="M198 116 C200 92 240 80 272 90 L268 104 C246 118 216 122 198 120 Z" fill={color} />
      <path d="M214 104 C232 94 250 92 266 96" fill="none" stroke={CHROME} strokeWidth="3" />
      <path d="M208 112 L262 102" stroke={accent} strokeWidth="2" />
      <line x1="272" y1="76" x2="318" y2="160" stroke={CHROME} strokeWidth="8" strokeLinecap="round" />
      <path d="M292 132 Q318 112 346 126 L342 134 Q318 120 297 140 Z" fill={color} />
      <circle cx="290" cy="84" r="13" fill={CHROME} />
      <circle cx="292" cy="84" r="9" fill={LAMP} />
      <path d="M270 72 Q262 46 236 52" fill="none" stroke={DARK} strokeWidth="5" strokeLinecap="round" />
      <line x1="260" y1="56" x2="256" y2="40" stroke={CHROME} strokeWidth="2" />
      <circle cx="255" cy="38" r="5" fill={CHROME} />
    </g>
  );
}

function Cng({ color, accent, disc, led }) {
  return (
    <g>
      <Wheel cx={100} cy={160} r={36} alloy disc={false} />
      <Wheel cx={302} cy={160} r={36} alloy disc={disc} />
      <path d="M100 155 L186 148 L188 158 L100 166 Z" fill={DARK} />
      <line x1="128" y1="100" x2="106" y2="154" stroke={CHROME} strokeWidth="7" strokeLinecap="round" />
      <Engine x={4} y={2} fins={3} />
      <path d="M90 144 L160 150 L162 160 L92 156 Z" fill={DARK} />
      <g stroke={DARK} strokeWidth="4" fill="none" strokeLinecap="round">
        <polyline points="258,90 214,112 186,148" />
        <polyline points="214,112 150,110 120,96" />
        <line x1="180" y1="111" x2="200" y2="140" />
      </g>
      <rect x="132" y="104" width="76" height="24" rx="12" fill="#e8e3df" stroke={METAL} strokeWidth="2" />
      <rect x="160" y="110" width="22" height="12" rx="2" fill={accent} />
      <text x="171" y="119.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Archivo, sans-serif">CNG</text>
      <path d="M60 150 Q68 112 112 110 L122 116 Q82 118 70 152 Z" fill={color} />
      <path d="M58 116 L72 112 L74 122 L62 126 Z" fill={TAIL} />
      <path d="M88 92 Q92 84 126 84 L232 88 Q240 90 238 98 L92 100 Z" fill={DARK} />
      <path d="M210 98 L236 90 C246 80 258 78 266 84 L264 104 C248 112 226 114 210 110 Z" fill={color} />
      <path d="M216 104 L260 92" stroke={accent} strokeWidth="4" />
      <line x1="260" y1="80" x2="302" y2="160" stroke={CHROME} strokeWidth="7" strokeLinecap="round" />
      <path d="M278 132 Q302 114 330 128 L326 136 Q302 122 283 140 Z" fill={color} />
      <circle cx="276" cy="78" r="13" fill={DARK} />
      <circle cx="278" cy="78" r="9" fill={led ? '#ffffff' : LAMP} stroke={led ? '#bfe3ff' : 'none'} strokeWidth="2" />
      <path d="M262 66 Q252 52 234 58" fill="none" stroke={DARK} strokeWidth="5" strokeLinecap="round" />
      <line x1="254" y1="58" x2="250" y2="44" stroke={DARK} strokeWidth="2" />
      <ellipse cx="248" cy="42" rx="7" ry="4" fill={DARK} />
    </g>
  );
}

function Scooter({ color, accent, disc }) {
  return (
    <g>
      <Wheel cx={112} cy={170} r={28} alloy />
      <Wheel cx={300} cy={170} r={28} alloy disc={disc} />
      <path d="M150 166 L112 170" stroke={DARK} strokeWidth="8" />
      <path
        d="M64 152 C58 118 94 98 140 98 L202 102 C208 122 206 140 200 156 L150 156 A40 40 0 0 0 74 156 Z"
        fill={color}
      />
      <path d="M78 128 C100 116 150 114 196 118" fill="none" stroke={accent} strokeWidth="3" />
      <path d="M60 120 L72 116 L74 128 L62 132 Z" fill={TAIL} />
      <path d="M98 94 Q104 82 140 84 L202 88 Q210 90 207 100 L100 100 Z" fill={DARK} />
      <path d="M196 152 L252 152 L254 164 L194 166 Z" fill={DARK} />
      <line x1="280" y1="140" x2="300" y2="170" stroke={DARK} strokeWidth="7" strokeLinecap="round" />
      <path d="M248 164 L264 70 L284 66 C294 102 292 140 282 162 Z" fill={color} />
      <path d="M262 98 L286 96" stroke={accent} strokeWidth="3" />
      <path d="M276 142 Q300 126 324 138 L320 146 Q300 134 281 150 Z" fill={color} />
      <rect x="262" y="48" width="32" height="18" rx="6" fill={color} />
      <path d="M296 50 A9 9 0 1 1 296 64" fill="none" stroke="#ffffff" strokeWidth="3" />
      <path d="M296 50 A9 9 0 1 1 296 64" fill="none" stroke="#bfe3ff" strokeWidth="1" />
      <line x1="264" y1="50" x2="244" y2="46" stroke={DARK} strokeWidth="5" strokeLinecap="round" />
      <line x1="270" y1="48" x2="262" y2="30" stroke={DARK} strokeWidth="2" />
      <circle cx="261" cy="28" r="5" fill={DARK} />
    </g>
  );
}

const SHAPES = { sport: Sport, commuter: Commuter, cruiser: Cruiser, cng: Cng, scooter: Scooter };

export default function BikeArt({
  type = 'commuter',
  color = '#ec3013',
  accent = '#2d2b2b',
  frame = '#3c3a39',
  exhaust = 'side',
  disc = true,
  alloy = true,
  led = false,
  rugged = false,
  label,
}) {
  const Shape = SHAPES[type] || Commuter;
  return (
    <div className="bike-art">
      <svg viewBox="0 0 400 230" role="img" aria-label={label ? `Illustration of the ${label}` : 'Motorcycle illustration'}>
        <ellipse cx="200" cy="202" rx="160" ry="7" fill="#000" opacity="0.12" />
        <Shape
          color={color}
          accent={accent}
          frame={frame}
          exhaust={exhaust}
          disc={disc}
          alloy={alloy}
          led={led}
          rugged={rugged}
        />
      </svg>
      {label && <div className="bike-art-label">{label}</div>}
    </div>
  );
}
