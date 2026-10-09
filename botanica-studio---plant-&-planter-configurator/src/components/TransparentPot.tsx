import React from 'react';
import { PotItem } from '../data/configuratorData';

interface TransparentPotProps {
  pot: PotItem;
  lightingPresetId: string;
}

export const TransparentPot: React.FC<TransparentPotProps> = ({ pot, lightingPresetId }) => {
  // Height and diameter in SVG viewbox coordinates (width: 320, height: 260)
  // Pot sits on the pedestal at the bottom (y=210)
  const potWidth = Math.round((pot.diameterCm / 32) * 220); // 190 - 220px
  const potHeight = Math.round((pot.heightCm / 30) * 150);  // 140 - 160px
  const centerX = 160;
  const bottomY = 220;
  const topY = bottomY - potHeight;
  const topRadiusX = potWidth / 2;
  const topRadiusY = 22; // 3D perspective ellipse depth
  const bottomRadiusX = pot.id === 'sandstone-taper' ? (potWidth * 0.72) / 2 : (potWidth * 0.88) / 2;
  const bottomRadiusY = 16;

  // Lighting adjustments
  const isWarm = lightingPresetId === 'warm-sunrise';
  const isMoody = lightingPresetId === 'moody-architectural';

  return (
    <div className="relative w-full max-w-[320px] h-[260px] flex items-end justify-center pointer-events-none select-none">
      <svg
        viewBox="0 0 320 260"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Contact shadow on pedestal */}
          <radialGradient id={`pot-shadow-${pot.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#181512" stopOpacity={isMoody ? "0.6" : "0.45"} />
            <stop offset="60%" stopColor="#25211D" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#25211D" stopOpacity="0" />
          </radialGradient>

          {/* Soil cavity gradient */}
          <radialGradient id="soil-gradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#3A3026" />
            <stop offset="60%" stopColor="#231B14" />
            <stop offset="100%" stopColor="#140E0A" />
          </radialGradient>

          {/* Pot body lighting gradients according to pot type */}
          {pot.id === 'basalt-ceramic' && (
            <linearGradient id="basalt-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2D3033" />
              <stop offset="25%" stopColor="#3C4044" />
              <stop offset="50%" stopColor="#2E3135" />
              <stop offset="85%" stopColor="#1D1F21" />
              <stop offset="100%" stopColor="#121314" />
            </linearGradient>
          )}

          {pot.id === 'terracotta-cylinder' && (
            <linearGradient id="terracotta-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isWarm ? "#D98862" : "#CB7C56"} />
              <stop offset="28%" stopColor={isWarm ? "#EE9E78" : "#E28E67"} />
              <stop offset="65%" stopColor={isWarm ? "#BF6C45" : "#B2633C"} />
              <stop offset="90%" stopColor="#8C4624" />
              <stop offset="100%" stopColor="#6E3316" />
            </linearGradient>
          )}

          {pot.id === 'sandstone-taper' && (
            <linearGradient id="sandstone-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DECDB4" />
              <stop offset="26%" stopColor="#EFE0CA" />
              <stop offset="55%" stopColor="#D8C4A7" />
              <stop offset="88%" stopColor="#B39F82" />
              <stop offset="100%" stopColor="#8E7A60" />
            </linearGradient>
          )}

          {pot.id === 'ribbed-alabaster' && (
            <linearGradient id="alabaster-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E9E6E1" />
              <stop offset="28%" stopColor="#FAF8F5" />
              <stop offset="60%" stopColor="#DDD8D0" />
              <stop offset="88%" stopColor="#C4BEB4" />
              <stop offset="100%" stopColor="#A8A196" />
            </linearGradient>
          )}

          {/* Top rim inner shadow */}
          <linearGradient id="rim-inner-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Contact Drop Shadow on Plinth */}
        <ellipse
          cx={centerX}
          cy={bottomY + 8}
          rx={bottomRadiusX * 1.25}
          ry={bottomRadiusY * 0.9}
          fill={`url(#pot-shadow-${pot.id})`}
        />

        {/* 2. Pot Body Shell */}
        {/* Basalt Fluted Ceramic */}
        {pot.id === 'basalt-ceramic' && (
          <g>
            <path
              d={`
                M ${centerX - topRadiusX} ${topY}
                Q ${centerX - topRadiusX} ${bottomY - 4} ${centerX - bottomRadiusX} ${bottomY}
                C ${centerX} ${bottomY + bottomRadiusY} ${centerX + bottomRadiusX} ${bottomY} ${centerX + bottomRadiusX} ${bottomY}
                Q ${centerX + topRadiusX} ${bottomY - 4} ${centerX + topRadiusX} ${topY}
                Z
              `}
              fill="url(#basalt-body)"
            />

            {/* Vertical Fluted Texture Ribs */}
            {[-0.8, -0.65, -0.5, -0.35, -0.2, -0.05, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((factor, i) => {
              const ribTopX = centerX + topRadiusX * factor;
              const ribBotX = centerX + bottomRadiusX * factor;
              const isHighlight = factor < 0.2;
              return (
                <path
                  key={i}
                  d={`M ${ribTopX} ${topY + 6} L ${ribBotX} ${bottomY - 2}`}
                  stroke={isHighlight ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.35)'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* Tuscan Terracotta Cylinder */}
        {pot.id === 'terracotta-cylinder' && (
          <g>
            <path
              d={`
                M ${centerX - topRadiusX} ${topY}
                L ${centerX - bottomRadiusX} ${bottomY}
                C ${centerX} ${bottomY + bottomRadiusY} ${centerX + bottomRadiusX} ${bottomY} ${centerX + bottomRadiusX} ${bottomY}
                L ${centerX + topRadiusX} ${topY}
                Z
              `}
              fill="url(#terracotta-body)"
            />

            {/* Subtle handcrafted horizontal throwing ridges */}
            {[0.25, 0.45, 0.65, 0.85].map((pos, idx) => {
              const y = topY + potHeight * pos;
              const rx = topRadiusX - (topRadiusX - bottomRadiusX) * pos;
              return (
                <path
                  key={idx}
                  d={`M ${centerX - rx + 4} ${y} Q ${centerX} ${y + 12} ${centerX + rx - 4} ${y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Base Saucer Tray */}
            <ellipse
              cx={centerX}
              cy={bottomY + 4}
              rx={bottomRadiusX + 6}
              ry={bottomRadiusY + 1}
              fill="#A75A36"
              stroke="#804121"
              strokeWidth="1"
            />
          </g>
        )}

        {/* Cast Sandstone Taper */}
        {pot.id === 'sandstone-taper' && (
          <g>
            <path
              d={`
                M ${centerX - topRadiusX} ${topY}
                L ${centerX - bottomRadiusX} ${bottomY}
                C ${centerX} ${bottomY + bottomRadiusY} ${centerX + bottomRadiusX} ${bottomY} ${centerX + bottomRadiusX} ${bottomY}
                L ${centerX + topRadiusX} ${topY}
                Z
              `}
              fill="url(#sandstone-body)"
            />

            {/* Fine Mineral Specks Texture Simulation */}
            <g opacity="0.25">
              {[
                [centerX - 35, topY + 40],
                [centerX + 20, topY + 30],
                [centerX - 15, topY + 70],
                [centerX + 40, topY + 80],
                [centerX - 40, topY + 95],
                [centerX + 10, topY + 110],
                [centerX - 20, topY + 125],
              ].map(([sx, sy], i) => (
                <circle key={i} cx={sx} cy={sy} r={i % 2 === 0 ? "1.5" : "2"} fill="#6E5D46" />
              ))}
            </g>
          </g>
        )}

        {/* Ribbed Alabaster Glaze */}
        {pot.id === 'ribbed-alabaster' && (
          <g>
            <path
              d={`
                M ${centerX - topRadiusX} ${topY}
                Q ${centerX - topRadiusX - 4} ${topY + potHeight * 0.5} ${centerX - bottomRadiusX} ${bottomY}
                C ${centerX} ${bottomY + bottomRadiusY} ${centerX + bottomRadiusX} ${bottomY} ${centerX + bottomRadiusX} ${bottomY}
                Q ${centerX + topRadiusX + 4} ${topY + potHeight * 0.5} ${centerX + topRadiusX} ${topY}
                Z
              `}
              fill="url(#alabaster-body)"
            />

            {/* Subtle soft white fluting waves */}
            {[-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map((factor, i) => {
              const x1 = centerX + topRadiusX * factor;
              const x2 = centerX + bottomRadiusX * factor;
              return (
                <path
                  key={i}
                  d={`M ${x1} ${topY + 4} Q ${x1 + 3} ${topY + potHeight * 0.5} ${x2} ${bottomY - 2}`}
                  stroke={factor < 0.1 ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.08)'}
                  strokeWidth="2"
                  fill="none"
                />
              );
            })}
          </g>
        )}

        {/* 3. Top Rim Opening (Dark Potting Soil Bed) */}
        {/* Exterior rim lip thickness */}
        <ellipse
          cx={centerX}
          cy={topY}
          rx={topRadiusX}
          ry={topRadiusY}
          fill="none"
          stroke={
            pot.id === 'basalt-ceramic'
              ? '#44484D'
              : pot.id === 'terracotta-cylinder'
              ? '#D8845E'
              : pot.id === 'sandstone-taper'
              ? '#E5D4BE'
              : '#F2EFEB'
          }
          strokeWidth="3.5"
        />

        {/* Interior Soil Cavity where plant sits */}
        <ellipse
          cx={centerX}
          cy={topY}
          rx={topRadiusX - 4}
          ry={topRadiusY - 2}
          fill="url(#soil-gradient)"
        />

        {/* Organic soil surface texture granules */}
        <g opacity="0.35">
          <ellipse cx={centerX - 20} cy={topY - 3} rx="6" ry="3" fill="#4B3F32" />
          <ellipse cx={centerX + 25} cy={topY + 2} rx="8" ry="4" fill="#3D3227" />
          <ellipse cx={centerX - 5} cy={topY + 5} rx="10" ry="4" fill="#4A3E31" />
          <ellipse cx={centerX + 15} cy={topY - 6} rx="5" ry="2.5" fill="#5A4B3A" />
        </g>

        {/* Rim inner depth shadow */}
        <path
          d={`
            M ${centerX - topRadiusX + 4} ${topY}
            A ${topRadiusX - 4} ${topRadiusY - 2} 0 0 1 ${centerX + topRadiusX - 4} ${topY}
            L ${centerX + topRadiusX - 4} ${topY + 6}
            A ${topRadiusX - 4} ${topRadiusY - 2} 0 0 0 ${centerX - topRadiusX + 4} ${topY + 6}
            Z
          `}
          fill="url(#rim-inner-shadow)"
        />
      </svg>
    </div>
  );
};
