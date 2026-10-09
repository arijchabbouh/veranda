import React from 'react';
import { Ruler, Sparkles, Droplets, Sun, Compass } from 'lucide-react';
import { PlantItem, PotItem } from '../data/configuratorData';

interface RatioGuideSectionProps {
  allPlants: PlantItem[];
  allPots: PotItem[];
  onSelectMockup: (plantIdx: number, potIdx: number) => void;
}

export const RatioGuideSection: React.FC<RatioGuideSectionProps> = ({
  allPlants,
  allPots,
  onSelectMockup,
}) => {
  return (
    <div className="space-y-16 py-12">
      {/* Quick Mockup Showcase Preset Strip */}
      <section className="bg-white rounded-2xl border border-[#E3DED2] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#727F75] block mb-1">
              Curated Architectural Pairings
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#19221C]">
              Featured Studio Mockups
            </h2>
          </div>
          <p className="text-xs text-[#5D6B61] max-w-md">
            Click any curated studio pairing to instantly load the plant, pot, and studio lighting preset in the 3D configurator above.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allPlants.map((plant, idx) => (
            <div
              key={plant.id}
              onClick={() => onSelectMockup(idx, idx)}
              className="group p-3 rounded-xl border border-[#ECE7DC] hover:border-[#1F2722] bg-[#FAF9F6] hover:bg-white transition-all cursor-pointer shadow-2xs hover:shadow-md"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-[#EAE7DE]">
                <img
                  src={plant.editorialImage || plant.image}
                  alt={plant.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                  {plant.plantToPotRatio}
                </div>
              </div>
              <h3 className="text-sm font-semibold font-serif text-[#1C2520] group-hover:text-emerald-950">
                {plant.name}
              </h3>
              <p className="text-xs text-[#637166] mt-0.5">
                with {allPots[idx]?.name}
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFECE3] text-xs">
                <span className="text-[#818E84] font-mono">Mockup 0{idx + 1}</span>
                <span className="font-mono font-medium text-[#1C2520] tabular-nums">
                  ${(plant.price + allPots[idx]?.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Science of the Realistic Ratio & Studio Lighting */}
      <section id="ratio-guide" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="bg-[#242F28] text-[#F3F1EC] rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3 tracking-wider uppercase">
              <Ruler className="w-4 h-4" />
              <span>The Botanical Proportion Formula</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
              Why Plant & Pot Ratios Matter
            </h3>
            <p className="text-sm text-[#B4C2B8] leading-relaxed mb-4">
              Aesthetically, a plant that is 1.8× to 2.8× the height of its planter achieves the golden ratio of botanical interior design — grounding the eye while celebrating upward natural movement.
            </p>
            <p className="text-sm text-[#B4C2B8] leading-relaxed">
              Biologically, improper pot ratios are the #1 cause of indoor plant decline. Too large, and excess soil holds water, causing root rot. Too small, and roots become bound and dehydrated. Every combination in Botanica Studio is calibrated by horticulturists.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10 text-center">
            <div>
              <span className="text-2xl font-serif font-bold text-white block">2.2 : 1</span>
              <span className="text-[11px] font-mono text-[#A4B5A8]">Ideal Ratio</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-white block">100%</span>
              <span className="text-[11px] font-mono text-[#A4B5A8]">Drainage Fit</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-white block">30 Days</span>
              <span className="text-[11px] font-mono text-[#A4B5A8]">Health Guarantee</span>
            </div>
          </div>
        </div>

        <div id="materials" className="bg-white rounded-2xl border border-[#E3DED2] p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#6A786E] mb-3 tracking-wider uppercase">
              <Compass className="w-4 h-4" />
              <span>Architectural Materials</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#19221C] mb-4">
              Studio Lighting & Material Textures
            </h3>
            <p className="text-sm text-[#4E5C52] leading-relaxed mb-6">
              Our 2D configurator replicates the micro-textures of raw earthenware, ribbed stoneware, and honed sandstone under directional studio strobes.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F4] border border-[#EFECE4]">
                <span className="w-4 h-4 rounded-full bg-[#252628] shrink-0" />
                <div className="text-xs">
                  <strong className="text-[#1C2520] block">Vitrified Basalt Stoneware:</strong>
                  <span className="text-[#5F6D63]">Non-porous, sharp vertical flutes reflect directional rim light.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F4] border border-[#EFECE4]">
                <span className="w-4 h-4 rounded-full bg-[#C07D5A] shrink-0" />
                <div className="text-xs">
                  <strong className="text-[#1C2520] block">Tuscan Raw Terracotta:</strong>
                  <span className="text-[#5F6D63]">Microporous natural clay that breathes, developing soft patina.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F4] border border-[#EFECE4]">
                <span className="w-4 h-4 rounded-full bg-[#D6C5A9] shrink-0" />
                <div className="text-xs">
                  <strong className="text-[#1C2520] block">Cast Sandstone Taper:</strong>
                  <span className="text-[#5F6D63]">Subtle mineral grit with weighted base for architectural presence.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
