import React, { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Ruler,
  Info,
} from 'lucide-react';
import {
  PlantItem,
  PotItem,
  StudioLightingPreset,
  LIGHTING_PRESETS,
  STUDIO_BACKGROUND,
} from '../data/configuratorData';

interface StudioStageProps {
  currentPlant: PlantItem;
  currentPot: PotItem;
  plantIndex: number;
  totalPlants: number;
  potIndex: number;
  totalPots: number;
  onPrevPlant: () => void;
  onNextPlant: () => void;
  onPrevPot: () => void;
  onNextPot: () => void;
  onSelectPlantIndex: (idx: number) => void;
  onSelectPotIndex: (idx: number) => void;
  allPlants: PlantItem[];
  allPots: PotItem[];
  plantDirection: number;
  potDirection: number;
}

export const StudioStage: React.FC<StudioStageProps> = ({
  currentPlant,
  currentPot,
  plantIndex,
  totalPlants,
  potIndex,
  totalPots,
  onPrevPlant,
  onNextPlant,
  onPrevPot,
  onNextPot,
  onSelectPlantIndex,
  onSelectPotIndex,
  allPlants,
  allPots,
  plantDirection,
  potDirection,
}) => {
  const [activeLighting, setActiveLighting] = useState<StudioLightingPreset>(LIGHTING_PRESETS[0]);
  const [showRatios, setShowRatios] = useState<boolean>(true);
  const [showDebugOffsets, setShowDebugOffsets] = useState<boolean>(false);

  // Slow, elegant curved cross-fade animation variants (longer movement with a curve-in effect)
  const plantMotionVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 110 : -110,
      y: 14,
      rotate: dir > 0 ? 2.2 : -2.2,
      opacity: 0,
      scale: currentPlant.calibration.scaleRatio * 0.96,
    }),
    center: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: currentPlant.calibration.scaleRatio,
      transition: {
        x: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.85, ease: 'easeInOut' },
        scale: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -110 : 110,
      y: -10,
      rotate: dir > 0 ? -1.8 : 1.8,
      opacity: 0,
      scale: currentPlant.calibration.scaleRatio * 0.96,
      transition: {
        x: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.75, ease: 'easeInOut' },
      },
    }),
  };

  const potMotionVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      y: 8,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.8, ease: 'easeInOut' },
        scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      y: -6,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.7, ease: 'easeInOut' },
      },
    }),
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#E3DFD5] bg-[#F4F2EC] overflow-hidden shadow-sm">
      {/* Studio Header: Studio Lighting & Calipers */}
      <div className="px-5 py-3 border-b border-[#E3DFD5] bg-[#ECE9E0]/80 flex flex-wrap items-center justify-between gap-3 text-xs text-[#525E56]">
        {/* Lighting Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-[#222B25]">
            <Sun className="w-3.5 h-3.5 text-[#5C6E61]" />
            <span>Studio Lighting:</span>
          </div>
          <div className="flex items-center gap-1">
            {LIGHTING_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setActiveLighting(preset)}
                className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer font-medium ${
                  activeLighting.id === preset.id
                    ? 'bg-white text-[#1C2420] shadow-xs border border-[#D5D0C3]'
                    : 'text-[#6C766F] hover:text-[#1C2420]'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Calipers & Alignment Data Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRatios(!showRatios)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
              showRatios
                ? 'bg-[#2C3830] text-white border-[#2C3830]'
                : 'bg-white text-[#4A554E] border-[#D5D0C3] hover:text-[#1C2420]'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>{showRatios ? 'Hide Calipers' : 'Show Calipers'}</span>
          </button>
          <button
            onClick={() => setShowDebugOffsets(!showDebugOffsets)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
              showDebugOffsets
                ? 'bg-[#405445] text-white border-[#405445]'
                : 'bg-white text-[#4A554E] border-[#D5D0C3] hover:text-[#1C2420]'
            }`}
            title="Inspect Model Offsets & Fitment"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Model Offsets</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN STUDIO VIEWPORT: FIXED BACKGROUND WITH TRAVERTINE STONE */}
      {/* ============================================================ */}
      <div className="relative w-full aspect-[3/4] max-w-[620px] mx-auto select-none overflow-hidden my-4 rounded-xl shadow-lg border border-white/60">
        {/* Fixed Background Image with Travertine Stone Block */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${STUDIO_BACKGROUND})`,
            filter: activeLighting.colorFilter,
          }}
        />

        {/* Ambient Studio Lighting Filter Overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-700"
          style={{
            backgroundColor:
              activeLighting.id === 'warm-sunrise'
                ? 'rgba(240, 200, 150, 0.08)'
                : activeLighting.id === 'moody-architectural'
                ? 'rgba(30, 40, 50, 0.08)'
                : 'transparent',
          }}
        />

        {/* ----------------- TOP ZONE: PLANT SWITCHER ARROWS ----------------- */}
        <div className="absolute top-4 inset-x-4 z-40 flex items-center justify-between">
          <button
            onClick={onPrevPlant}
            aria-label="Previous Plant"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5D0C5] hover:border-[#1E2621] hover:bg-white text-[#2C3830] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Switch plant canopy left"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-[11px] font-mono font-medium hidden sm:inline">Plant</span>
          </button>

          {/* Plant Pill Tag */}
          <div className="bg-white/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-xs text-center">
            <span className="text-xs font-serif font-semibold text-[#1B231F]">
              {currentPlant.name}
            </span>
            <span className="text-[10px] font-mono text-[#738077] ml-2">
              {plantIndex + 1}/{totalPlants}
            </span>
          </div>

          <button
            onClick={onNextPlant}
            aria-label="Next Plant"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5D0C5] hover:border-[#1E2621] hover:bg-white text-[#2C3830] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Switch plant canopy right"
          >
            <span className="text-[11px] font-mono font-medium hidden sm:inline">Plant</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Large Floating Side Arrows for Plant Canopy */}
        <button
          onClick={onPrevPlant}
          aria-label="Previous plant"
          className="absolute left-3 top-1/3 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#2C3830] shadow-lg border border-white/80 cursor-pointer hover:scale-110 active:scale-95 transition-all z-35"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNextPlant}
          aria-label="Next plant"
          className="absolute right-3 top-1/3 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#2C3830] shadow-lg border border-white/80 cursor-pointer hover:scale-110 active:scale-95 transition-all z-35"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* ----------------- ARCHITECTURAL CALIPERS (TOP) ----------------- */}
        {showRatios && (
          <div className="absolute top-14 inset-x-4 z-30 flex items-center justify-between border border-emerald-900/20 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-md text-[11px] font-mono text-emerald-950 shadow-2xs">
            <span>Foliage Spread: {currentPlant.spreadCm} cm</span>
            <span className="font-semibold">Plant Height: {currentPlant.heightCm} cm</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* REALISTIC 100% TRANSPARENT LAYERS (SLOW CURVED CROSS-FADE)   */}
        {/* ============================================================ */}

        {/* 1. PLANT LAYER: Enters cleanly into the pot soil opening */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <AnimatePresence custom={plantDirection} initial={false}>
            <motion.div
              key={currentPlant.id}
              custom={plantDirection}
              variants={plantMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute left-1/2 -translate-x-1/2 flex items-end justify-center origin-bottom"
              style={{
                bottom: `${currentPlant.calibration.stemDockBottomPercent}%`, // stem enters inside pot opening
                width: '84%',
                filter: activeLighting.colorFilter,
              }}
            >
              <img
                src={currentPlant.image}
                alt={currentPlant.name}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[460px] drop-shadow-md select-none pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. POT LAYER: Clean transparent pot with dark soil, zero trace of plant */}
        {/* Sits firmly on the stone pedestal */}
        <div className="absolute inset-0 z-25 pointer-events-none flex items-center justify-center">
          <AnimatePresence custom={potDirection} initial={false}>
            <motion.div
              key={currentPot.id}
              custom={potDirection}
              variants={potMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute left-1/2 -translate-x-1/2 flex items-end justify-center origin-bottom"
              style={{
                bottom: `${currentPot.calibration.stoneSeatBottomPercent}%`, // Sits on top of the stone
                width: `${currentPot.calibration.displayWidthPercent}%`,
                filter: activeLighting.colorFilter,
              }}
            >
              {/* Soft Ambient Contact Shadow on Stone Surface */}
              <div className="absolute -bottom-1.5 w-[82%] h-4 bg-black/45 rounded-full blur-xs pointer-events-none" />

              <img
                src={currentPot.image}
                alt={currentPot.name}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[220px] select-none pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ----------------- ARCHITECTURAL CALIPERS (BOTTOM) ----------------- */}
        {showRatios && (
          <div className="absolute bottom-16 inset-x-4 z-30 flex items-center justify-between border border-emerald-900/20 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-md text-[11px] font-mono text-emerald-950 shadow-2xs">
            <span>Pot Ø: {currentPot.diameterCm} cm</span>
            <span className="font-semibold">
              Golden Ratio: {currentPlant.plantToPotRatio} (Height:Pot)
            </span>
          </div>
        )}

        {/* ----------------- LOWER ZONE: POT SWITCHER ARROWS ----------------- */}
        <div className="absolute bottom-4 inset-x-4 z-40 flex items-center justify-between">
          <button
            onClick={onPrevPot}
            aria-label="Previous Planter"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5D0C5] hover:border-[#1E2621] hover:bg-white text-[#2C3830] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Switch planter left"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-[11px] font-mono font-medium hidden sm:inline">Pot</span>
          </button>

          {/* Pot Pill Tag */}
          <div className="bg-white/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-xs flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
              style={{ backgroundColor: currentPot.colorHex }}
            />
            <span className="text-xs font-serif font-semibold text-[#1B231F]">
              {currentPot.name}
            </span>
            <span className="text-[10px] font-mono text-[#738077]">
              {potIndex + 1}/{totalPots}
            </span>
          </div>

          <button
            onClick={onNextPot}
            aria-label="Next Planter"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5D0C5] hover:border-[#1E2621] hover:bg-white text-[#2C3830] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Switch planter right"
          >
            <span className="text-[11px] font-mono font-medium hidden sm:inline">Pot</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Optional Model Calibration Debug Box */}
        {showDebugOffsets && (
          <div className="absolute inset-x-6 top-24 z-50 bg-[#1A221E]/95 text-white p-4 rounded-xl text-xs font-mono space-y-1.5 shadow-xl backdrop-blur-md border border-white/20">
            <div className="flex justify-between text-emerald-400 font-semibold border-b border-white/10 pb-1">
              <span>MODEL FITMENT & CALIBRATION DATA</span>
              <button
                onClick={() => setShowDebugOffsets(false)}
                className="text-white hover:text-red-300"
              >
                ✕
              </button>
            </div>
            <div>
              <strong>Plant:</strong> {currentPlant.name} ({currentPlant.calibration.realHeightCm}cm H × {currentPlant.calibration.realSpreadCm}cm W)
            </div>
            <div>
              <strong>Scale Factor:</strong> {currentPlant.calibration.scaleRatio}× (Auto-scaled to fit pot opening)
            </div>
            <div>
              <strong>Base Width:</strong> {currentPlant.calibration.baseStemWidthPercent}% of pot rim (fits cleanly inside soil cavity)
            </div>
            <div>
              <strong>Pot:</strong> {currentPot.name} (Ø {currentPot.calibration.realDiameterCm}cm × {currentPot.calibration.realHeightCm}cm H)
            </div>
            <div>
              <strong>Stone Seat:</strong> {currentPot.calibration.stoneSeatBottomPercent}% from bottom (sits on travertine top surface)
            </div>
            <div>
              <strong>Animation:</strong> 0.95s slow curved cross-fade with bezier easing
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
