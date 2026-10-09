import React from 'react';
import { PlantItem } from '../data/configuratorData';

interface TransparentPlantProps {
  plant: PlantItem;
  lightingPresetId: string;
}

export const TransparentPlant: React.FC<TransparentPlantProps> = ({ plant, lightingPresetId }) => {
  const isWarm = lightingPresetId === 'warm-sunrise';
  const isMoody = lightingPresetId === 'moody-architectural';

  return (
    <div className="relative w-full max-w-[380px] h-[360px] sm:h-[400px] flex items-end justify-center pointer-events-none select-none">
      <svg
        viewBox="0 0 400 420"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Leaf Gradients for Monstera */}
          <linearGradient id="monstera-leaf-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isWarm ? "#4A8F4D" : "#377E44"} />
            <stop offset="50%" stopColor={isWarm ? "#295D31" : "#205429"} />
            <stop offset="100%" stopColor="#14361A" />
          </linearGradient>

          <linearGradient id="monstera-leaf-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D6335" />
            <stop offset="50%" stopColor="#1A4222" />
            <stop offset="100%" stopColor="#0D2412" />
          </linearGradient>

          {/* Leaf Sheen / Specular Studio Strobe */}
          <linearGradient id="leaf-sheen" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={isMoody ? "0.35" : "0.22"} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Ficus Trunk Gradient */}
          <linearGradient id="ficus-trunk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6E53" />
            <stop offset="35%" stopColor="#A88B6E" />
            <stop offset="70%" stopColor="#755B42" />
            <stop offset="100%" stopColor="#543F2D" />
          </linearGradient>

          {/* Ficus Broad Leaf Gradient */}
          <radialGradient id="ficus-leaf" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor={isWarm ? "#4B8246" : "#3A7436"} />
            <stop offset="60%" stopColor="#255123" />
            <stop offset="100%" stopColor="#132E11" />
          </radialGradient>

          {/* Sansevieria Blade Gradients */}
          <linearGradient id="sansevieria-core" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#214227" />
            <stop offset="30%" stopColor="#31633A" />
            <stop offset="60%" stopColor="#24482B" />
            <stop offset="100%" stopColor="#152B19" />
          </linearGradient>

          {/* Olive Tree Gnarled Trunk */}
          <linearGradient id="olive-trunk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5E5345" />
            <stop offset="35%" stopColor="#827563" />
            <stop offset="70%" stopColor="#534737" />
            <stop offset="100%" stopColor="#352C21" />
          </linearGradient>

          {/* Stem gradient */}
          <linearGradient id="stem-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3F6641" />
            <stop offset="40%" stopColor="#598C5C" />
            <stop offset="100%" stopColor="#274229" />
          </linearGradient>
        </defs>

        {/* ---------------- 1. MONSTERA DELICIOSA ---------------- */}
        {plant.id === 'monstera' && (
          <g transform="translate(0, 10)">
            {/* Aerial Roots entering soil */}
            <path
              d="M 180 340 Q 185 370 190 395"
              stroke="#68553F"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 215 330 Q 225 365 210 395"
              stroke="#594632"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Main Central Stems */}
            <path d="M 200 400 Q 195 330 180 260" stroke="url(#stem-gradient)" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M 200 400 Q 215 320 250 240" stroke="url(#stem-gradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 200 400 Q 170 320 120 260" stroke="url(#stem-gradient)" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 180 260 Q 170 180 150 120" stroke="url(#stem-gradient)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 215 320 Q 220 180 210 80" stroke="url(#stem-gradient)" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 250 240 Q 290 190 310 160" stroke="url(#stem-gradient)" strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Back Shaded Leaves */}
            <g opacity="0.9">
              {/* Left Back Leaf */}
              <g transform="translate(70, 180) rotate(-28)">
                <path
                  d="M 0 0 C -45 -30 -60 -90 -20 -130 C 30 -160 80 -120 70 -60 C 60 -10 25 10 0 0 Z"
                  fill="url(#monstera-leaf-dark)"
                />
              </g>
              {/* Right Back Leaf */}
              <g transform="translate(300, 160) rotate(24)">
                <path
                  d="M 0 0 C 40 -25 65 -75 35 -125 C -15 -155 -70 -120 -60 -50 C -50 -10 -20 10 0 0 Z"
                  fill="url(#monstera-leaf-dark)"
                />
              </g>
            </g>

            {/* Mid Leaves with Fenestrations */}
            {/* Lower Center Leaf */}
            <g transform="translate(200, 240) rotate(5)">
              <path
                d="M 0 0 C -50 -20 -80 -70 -50 -120 C -20 -160 40 -160 70 -110 C 90 -65 60 -15 0 0 Z"
                fill="url(#monstera-leaf-light)"
              />
              {/* Cutout slits */}
              <ellipse cx="-35" cy="-80" rx="4" ry="16" transform="rotate(-30, -35, -80)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="40" cy="-75" rx="4" ry="16" transform="rotate(30, 40, -75)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="-20" cy="-115" rx="3.5" ry="14" transform="rotate(-15, -20, -115)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="25" cy="-110" rx="3.5" ry="14" transform="rotate(20, 25, -110)" fill="#F4F2EC" opacity="0.95" />
              {/* Central Vein */}
              <path d="M 0 0 Q 5 -70 5 -145" stroke="#71A875" strokeWidth="2.5" fill="none" opacity="0.6" />
              {/* Glossy Sheen */}
              <path
                d="M 0 0 C -50 -20 -80 -70 -50 -120 C -20 -160 0 -160 0 0 Z"
                fill="url(#leaf-sheen)"
              />
            </g>

            {/* Top Crown Large Fenestrated Leaf */}
            <g transform="translate(205, 110) rotate(-4)">
              <path
                d="M 0 0 C -65 -25 -105 -85 -75 -150 C -35 -205 50 -205 90 -140 C 115 -80 75 -20 0 0 Z"
                fill="url(#monstera-leaf-light)"
              />
              {/* Big Fenestration Holes */}
              <ellipse cx="-45" cy="-100" rx="5.5" ry="22" transform="rotate(-35, -45, -100)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="50" cy="-90" rx="5.5" ry="22" transform="rotate(35, 50, -90)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="-30" cy="-145" rx="5" ry="18" transform="rotate(-20, -30, -145)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="35" cy="-140" rx="5" ry="18" transform="rotate(25, 35, -140)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="-15" cy="-175" rx="4" ry="12" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="15" cy="-170" rx="4" ry="12" fill="#F4F2EC" opacity="0.95" />
              {/* Veins */}
              <path d="M 0 0 Q 3 -90 0 -190" stroke="#7CB581" strokeWidth="3" fill="none" opacity="0.7" />
              {/* Highlight */}
              <path
                d="M 0 0 C -65 -25 -105 -85 -75 -150 C -40 -200 0 -200 0 0 Z"
                fill="url(#leaf-sheen)"
              />
            </g>

            {/* Left Front Spreading Leaf */}
            <g transform="translate(130, 240) rotate(-35)">
              <path
                d="M 0 0 C -45 -20 -70 -65 -45 -110 C -15 -145 35 -145 60 -100 C 75 -55 50 -15 0 0 Z"
                fill="url(#monstera-leaf-light)"
              />
              <ellipse cx="-30" cy="-70" rx="3.5" ry="14" transform="rotate(-25, -30, -70)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="32" cy="-65" rx="3.5" ry="14" transform="rotate(25, 32, -65)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="-15" cy="-105" rx="3" ry="12" fill="#F4F2EC" opacity="0.95" />
            </g>

            {/* Right Front Spreading Leaf */}
            <g transform="translate(270, 225) rotate(32)">
              <path
                d="M 0 0 C 45 -20 70 -65 45 -110 C 15 -145 -35 -145 -60 -100 C -75 -55 -50 -15 0 0 Z"
                fill="url(#monstera-leaf-light)"
              />
              <ellipse cx="30" cy="-70" rx="3.5" ry="14" transform="rotate(25, 30, -70)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="-32" cy="-65" rx="3.5" ry="14" transform="rotate(-25, -32, -65)" fill="#F4F2EC" opacity="0.95" />
              <ellipse cx="15" cy="-105" rx="3" ry="12" fill="#F4F2EC" opacity="0.95" />
            </g>
          </g>
        )}

        {/* ---------------- 2. FICUS LYRATA (FIDDLE LEAF FIG) ---------------- */}
        {plant.id === 'ficus' && (
          <g transform="translate(0, -10)">
            {/* Upright Slender Woody Central Trunk */}
            <path
              d="M 200 410 Q 198 250 200 120"
              stroke="url(#ficus-trunk)"
              strokeWidth="15"
              fill="none"
              strokeLinecap="round"
            />
            {/* Trunk bark ridges */}
            <path d="M 197 400 L 197 150" stroke="#483624" strokeWidth="1.5" strokeDasharray="8 6" fill="none" opacity="0.4" />
            <path d="M 203 400 L 203 140" stroke="#BC9E80" strokeWidth="1.2" strokeDasharray="12 8" fill="none" opacity="0.5" />

            {/* Staggered Violin-Shaped Broad Leaves */}
            {/* Leaf 1: Lower Left */}
            <g transform="translate(195, 330) rotate(-40)">
              <path
                d="M 0 0 C -25 -10 -55 -25 -50 -55 C -45 -75 -25 -80 -35 -105 C -45 -125 -15 -145 15 -140 C 45 -135 55 -110 40 -85 C 30 -70 45 -55 35 -30 C 25 -10 10 5 0 0 Z"
                fill="url(#ficus-leaf)"
              />
              <path d="M 0 0 Q 0 -60 5 -135" stroke="#94C98E" strokeWidth="3" fill="none" opacity="0.65" />
            </g>

            {/* Leaf 2: Lower Right */}
            <g transform="translate(205, 310) rotate(38)">
              <path
                d="M 0 0 C 25 -10 55 -25 50 -55 C 45 -75 25 -80 35 -105 C 45 -125 15 -145 -15 -140 C -45 -135 -55 -110 -40 -85 C -30 -70 -45 -55 -35 -30 C -25 -10 -10 5 0 0 Z"
                fill="url(#ficus-leaf)"
              />
              <path d="M 0 0 Q 0 -60 -5 -135" stroke="#94C98E" strokeWidth="3" fill="none" opacity="0.65" />
            </g>

            {/* Leaf 3: Mid Left */}
            <g transform="translate(196, 230) rotate(-32)">
              <path
                d="M 0 0 C -30 -15 -65 -30 -60 -65 C -55 -90 -30 -95 -45 -125 C -55 -150 -15 -170 20 -165 C 55 -160 65 -130 50 -100 C 35 -80 55 -65 40 -35 C 30 -10 10 5 0 0 Z"
                fill="url(#ficus-leaf)"
              />
              <path d="M 0 0 Q 0 -80 0 -160" stroke="#94C98E" strokeWidth="3.5" fill="none" opacity="0.7" />
              <path d="M 0 0 C -30 -15 -65 -30 -60 -65 C -55 -90 -10 -160 0 0 Z" fill="url(#leaf-sheen)" />
            </g>

            {/* Leaf 4: Mid Right */}
            <g transform="translate(204, 210) rotate(35)">
              <path
                d="M 0 0 C 30 -15 65 -30 60 -65 C 55 -90 30 -95 45 -125 C 55 -150 15 -170 -20 -165 C -55 -160 -65 -130 -50 -100 C -35 -80 -55 -65 -40 -35 C -30 -10 -10 5 0 0 Z"
                fill="url(#ficus-leaf)"
              />
              <path d="M 0 0 Q 0 -80 0 -160" stroke="#94C98E" strokeWidth="3.5" fill="none" opacity="0.7" />
            </g>

            {/* Leaf 5: Upper Canopy Left */}
            <g transform="translate(197, 140) rotate(-22)">
              <path
                d="M 0 0 C -30 -15 -60 -30 -55 -65 C -50 -85 -25 -90 -40 -120 C -50 -145 -15 -160 20 -155 C 50 -150 60 -125 45 -95 C 35 -80 50 -60 35 -30 C 25 -10 10 5 0 0 Z"
                fill="url(#ficus-leaf)"
              />
              <path d="M 0 0 Q 0 -75 5 -150" stroke="#94C98E" strokeWidth="3" fill="none" opacity="0.7" />
            </g>

            {/* Leaf 6: Upper Canopy Right */}
            <g transform="translate(203, 130) rotate(26)">
              <path
                d="M 0 0 C 30 -15 60 -30 55 -65 C 50 -85 25 -90 40 -120 C 50 -145 15 -160 -20 -155 C -50 -150 -60 -125 -45 -95 C -35 -80 -50 -60 -35 -30 C -25 -10 -10 5 0 0 Z"
                fill="url(#ficus-leaf)"
              />
              <path d="M 0 0 Q 0 -75 -5 -150" stroke="#94C98E" strokeWidth="3" fill="none" opacity="0.7" />
            </g>

            {/* Top Terminal Crown Leaf */}
            <g transform="translate(200, 100) rotate(2)">
              <path
                d="M 0 0 C -25 -15 -45 -30 -40 -60 C -35 -80 -20 -85 -30 -110 C -35 -130 -10 -145 15 -140 C 40 -135 50 -115 35 -90 C 25 -75 40 -55 30 -25 C 20 -10 10 5 0 0 Z"
                fill="url(#ficus-leaf)"
              />
              <path d="M 0 0 Q 0 -70 0 -135" stroke="#94C98E" strokeWidth="2.5" fill="none" opacity="0.75" />
            </g>
          </g>
        )}

        {/* ---------------- 3. SANSEVIERIA LAURENTII (SNAKE PLANT) ---------------- */}
        {plant.id === 'snakeplant' && (
          <g transform="translate(0, 15)">
            {/* Upright architectural sword leaves at varying heights */}
            {[
              { x: 200, scaleY: 1.05, rot: -2, width: 34, z: 5 },
              { x: 182, scaleY: 0.92, rot: -7, width: 30, z: 4 },
              { x: 218, scaleY: 0.95, rot: 6, width: 32, z: 4 },
              { x: 165, scaleY: 0.78, rot: -14, width: 28, z: 3 },
              { x: 235, scaleY: 0.82, rot: 12, width: 29, z: 3 },
              { x: 148, scaleY: 0.62, rot: -22, width: 25, z: 2 },
              { x: 252, scaleY: 0.66, rot: 20, width: 26, z: 2 },
              { x: 192, scaleY: 0.72, rot: -4, width: 26, z: 6 },
              { x: 208, scaleY: 0.75, rot: 3, width: 27, z: 6 },
            ].map((blade, idx) => {
              const h = 330 * blade.scaleY;
              const w = blade.width;
              return (
                <g key={idx} transform={`translate(${blade.x}, 395) rotate(${blade.rot})`}>
                  {/* Outer Bright Gold Margin Border */}
                  <path
                    d={`M 0 0 C -${w * 0.4} -${h * 0.25} -${w * 0.55} -${h * 0.6} 0 -${h} C ${w * 0.55} -${h * 0.6} ${w * 0.4} -${h * 0.25} 0 0 Z`}
                    fill="#D4B038"
                  />

                  {/* Inner Dark Green Chevron Body */}
                  <path
                    d={`M 0 0 C -${w * 0.3} -${h * 0.25} -${w * 0.42} -${h * 0.6} 0 -${h * 0.98} C ${w * 0.42} -${h * 0.6} ${w * 0.3} -${h * 0.25} 0 0 Z`}
                    fill="url(#sansevieria-core)"
                  />

                  {/* Horizontal Marbled Zig-Zag Bands */}
                  {[0.2, 0.35, 0.5, 0.65, 0.8].map((prog, bi) => {
                    const y = -h * prog;
                    const bw = w * 0.32 * (1 - prog * 0.5);
                    return (
                      <path
                        key={bi}
                        d={`M -${bw} ${y} Q 0 ${y + 6} ${bw} ${y}`}
                        stroke="#4E8C59"
                        strokeWidth="2.5"
                        fill="none"
                        opacity="0.6"
                      />
                    );
                  })}

                  {/* Vertical Center Spine Fold */}
                  <path
                    d={`M 0 0 L 0 -${h * 0.98}`}
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="1.2"
                  />
                  {/* Specular Highlight along edge */}
                  <path
                    d={`M -${w * 0.25} -${h * 0.3} Q -${w * 0.35} -${h * 0.65} 0 -${h * 0.95}`}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </g>
              );
            })}
          </g>
        )}

        {/* ---------------- 4. DWARF MEDITERRANEAN OLIVE TREE ---------------- */}
        {plant.id === 'olive' && (
          <g transform="translate(0, 20)">
            {/* Gnarled, Sculptural Bonsai Trunk with Twisted Bark */}
            <path
              d="
                M 185 390
                C 175 350 165 310 180 270
                C 195 230 185 200 175 170
                L 195 170
                C 210 200 220 230 215 270
                C 210 310 225 350 215 390
                Z
              "
              fill="url(#olive-trunk)"
            />

            {/* Deep Wood Gnarled Bark Lines */}
            <path d="M 185 380 Q 175 310 190 260 Q 205 210 185 175" stroke="#32281D" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 205 385 Q 215 320 200 270 Q 185 220 195 180" stroke="#32281D" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M 195 360 Q 185 290 205 240" stroke="#A89882" strokeWidth="1.8" fill="none" opacity="0.45" />

            {/* Branch Structure */}
            {/* Left Branch */}
            <path d="M 175 220 Q 140 180 110 160" stroke="#5C4E3D" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 140 180 Q 120 140 90 130" stroke="#4D4133" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Right Branch */}
            <path d="M 210 210 Q 250 170 280 150" stroke="#5C4E3D" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 250 170 Q 270 130 300 120" stroke="#4D4133" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Center Crown Branch */}
            <path d="M 185 175 Q 190 120 200 90" stroke="#5C4E3D" strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Dense Canopy Foliage Clusters (Silvery-Sage & Emerald) */}
            {[
              // Left Cluster
              [110, 140, 60],
              [85, 120, 50],
              [130, 110, 55],
              // Right Cluster
              [275, 140, 60],
              [300, 115, 50],
              [255, 105, 55],
              // Center Top Crown Cluster
              [200, 80, 70],
              [165, 75, 55],
              [235, 75, 55],
              [200, 120, 60],
            ].map(([cx, cy, r], i) => (
              <g key={i}>
                {/* Cluster Mass Cloud */}
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={r}
                  ry={r * 0.72}
                  fill={i % 2 === 0 ? (isWarm ? "#4B6E52" : "#3F6346") : "#587C5E"}
                  opacity="0.9"
                />

                {/* Individual delicate lanceolate silvery leaves */}
                {[-25, -12, 0, 12, 25].map((offX, li) => (
                  <ellipse
                    key={li}
                    cx={cx + offX}
                    cy={cy + (li % 2 === 0 ? -8 : 6)}
                    rx="14"
                    ry="5"
                    transform={`rotate(${offX * 1.5}, ${cx + offX}, ${cy})`}
                    fill={li % 3 === 0 ? "#7D9C82" : "#8EAFA0"}
                  />
                ))}

                {/* Miniature Olive Fruit Accents */}
                {i % 3 === 0 && (
                  <ellipse
                    cx={cx - 10}
                    cy={cy + 18}
                    rx="4"
                    ry="6"
                    fill="#2B3224"
                    stroke="#1C2117"
                    strokeWidth="0.8"
                  />
                )}
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
