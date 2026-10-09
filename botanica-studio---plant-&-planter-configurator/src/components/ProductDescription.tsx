import React, { useState } from 'react';
import {
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Sun,
  Droplets,
  Heart,
  Shield,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { PlantItem, PotItem } from '../data/configuratorData';

interface ProductDescriptionProps {
  plant: PlantItem;
  pot: PotItem;
  onAddToCart: (quantity: number) => void;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  plant,
  pot,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'care' | 'dimensions'>('overview');
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  const totalPrice = (plant.price + pot.price) * quantity;

  const handleAdd = () => {
    setIsAddedFeedback(true);
    onAddToCart(quantity);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1800);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E4DFD3] p-6 sm:p-8 shadow-xs">
      {/* Top Header & Price Row */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#ECE7DC]">
        <div>
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-[#707C74] font-mono mb-2">
            <span>BOTANICAL ARCHITECTURE</span>
            <span aria-hidden="true">·</span>
            <span>RATIO CERTIFIED</span>
            <span aria-hidden="true">·</span>
            <span>READY TO PLACE</span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#19221C] tracking-tight">
            {plant.name} <span className="font-normal italic text-[#4F5B53]">in</span> {pot.name}
          </h1>

          <p className="text-sm italic font-serif text-[#637067] mt-1">
            {plant.botanicalName} ({plant.family}) · Planter: {pot.material}
          </p>
        </div>

        {/* Pricing Block with Breakdown */}
        <div className="lg:text-right shrink-0 bg-[#F9F8F5] p-4 rounded-xl border border-[#ECE7DC]">
          <div className="text-xs text-[#6F7A72] flex items-center justify-end gap-1 mb-1">
            <span>Plant ${plant.price}</span>
            <span>+</span>
            <span>Pot ${pot.price}</span>
          </div>
          <div className="text-3xl font-serif font-bold text-[#18211B] tabular-nums">
            ${totalPrice.toFixed(2)}
          </div>
          <div className="text-[11px] text-[#69746D] font-mono mt-0.5">
            Includes custom organic aroid blend & catch tray
          </div>
        </div>
      </div>

      {/* Interactive Tabs for Specifications */}
      <div className="flex items-center gap-2 my-6 p-1 bg-[#F4F1EA] rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-white text-[#19221D] shadow-xs'
              : 'text-[#647067] hover:text-[#19221D]'
          }`}
        >
          Description & Composition
        </button>
        <button
          onClick={() => setActiveTab('care')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
            activeTab === 'care'
              ? 'bg-white text-[#19221D] shadow-xs'
              : 'text-[#647067] hover:text-[#19221D]'
          }`}
        >
          Care Guide & Light
        </button>
        <button
          onClick={() => setActiveTab('dimensions')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
            activeTab === 'dimensions'
              ? 'bg-white text-[#19221D] shadow-xs'
              : 'text-[#647067] hover:text-[#19221D]'
          }`}
        >
          Ratio & Dimensions
        </button>
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-[#38443D] leading-relaxed">
            {plant.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EBE6DC]">
              <span className="text-[11px] font-mono text-[#78857B] block mb-1 uppercase">
                Plant-to-Pot Ratio
              </span>
              <span className="text-sm font-semibold text-[#1F2722]">
                {plant.plantToPotRatio} Proportional Scale
              </span>
              <p className="text-xs text-[#5D6B61] mt-1">
                Engineered root zone depth protects against root rot.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EBE6DC]">
              <span className="text-[11px] font-mono text-[#78857B] block mb-1 uppercase">
                Pot Craftsmanship
              </span>
              <span className="text-sm font-semibold text-[#1F2722]">
                {pot.origin}
              </span>
              <p className="text-xs text-[#5D6B61] mt-1">
                {pot.description}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EBE6DC]">
              <span className="text-[11px] font-mono text-[#78857B] block mb-1 uppercase">
                Assembly & Soil
              </span>
              <span className="text-sm font-semibold text-[#1F2722]">
                Pre-Potted with Nutrients
              </span>
              <p className="text-xs text-[#5D6B61] mt-1">
                Worm castings, perlite, and pine bark substrate included.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'care' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#F8F7F3] border border-[#EBE7DC]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#252F28] mb-1">
                <Sun className="w-4 h-4 text-[#C48C38]" />
                <span>Sunlight</span>
              </div>
              <p className="text-xs text-[#546258]">{plant.lightRequirement}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#F8F7F3] border border-[#EBE7DC]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#252F28] mb-1">
                <Droplets className="w-4 h-4 text-[#3C7E96]" />
                <span>Watering</span>
              </div>
              <p className="text-xs text-[#546258]">{plant.waterFrequency}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#F8F7F3] border border-[#EBE7DC]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#252F28] mb-1">
                <Heart className="w-4 h-4 text-[#8A5666]" />
                <span>Pet Safety</span>
              </div>
              <p className="text-xs text-[#546258]">
                {plant.petSafe ? 'Safe for cats & dogs' : 'Keep elevated out of reach'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F8F7F3] border border-[#EBE7DC]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#252F28] mb-1">
                <Shield className="w-4 h-4 text-[#497A52]" />
                <span>Difficulty</span>
              </div>
              <p className="text-xs text-[#546258]">{plant.difficulty} level</p>
            </div>
          </div>

          <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#EBE7DC]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#69756C] mb-2">
              Studio Botanical Care Notes:
            </h4>
            <ul className="text-xs text-[#3C4A41] space-y-1.5 list-disc pl-4">
              {plant.careTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'dimensions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DC]">
              <span className="text-[11px] font-mono text-[#78857C] block">Total Height</span>
              <span className="text-base font-semibold text-[#1E2721] font-mono tabular-nums">
                {plant.heightCm} cm
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DC]">
              <span className="text-[11px] font-mono text-[#78857C] block">Canopy Spread</span>
              <span className="text-base font-semibold text-[#1E2721] font-mono tabular-nums">
                {plant.spreadCm} cm
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DC]">
              <span className="text-[11px] font-mono text-[#78857C] block">Pot Diameter</span>
              <span className="text-base font-semibold text-[#1E2721] font-mono tabular-nums">
                Ø {pot.diameterCm} cm
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DC]">
              <span className="text-[11px] font-mono text-[#78857C] block">Pot Height</span>
              <span className="text-base font-semibold text-[#1E2721] font-mono tabular-nums">
                {pot.heightCm} cm
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#F5F8F5] rounded-xl border border-[#DCE4DD] text-xs text-[#2B4232] flex items-start gap-3">
            <Info className="w-4 h-4 shrink-0 text-[#3B6645] mt-0.5" />
            <p>
              <strong>The Botanical Ratio:</strong> This plant-to-pot combination has a verified{' '}
              {plant.plantToPotRatio} proportion. In botanical architecture, the ideal ratio between
              visible foliar mass and root container is between 1.8:1 and 2.5:1. This ensures adequate soil
              volume without waterlogging, keeping roots vibrant while maintaining sculptural stability.
            </p>
          </div>
        </div>
      )}

      {/* ----------------- CONTIGUOUS ADD TO CART MODULE ----------------- */}
      <div className="mt-8 pt-6 border-t border-[#ECE7DC] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Quantity Stepper */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs font-mono uppercase text-[#737F76]">Quantity:</span>
          <div className="flex items-center border border-[#D6D0C3] rounded-lg bg-[#FAF9F6]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="p-2.5 text-[#37433B] hover:text-[#18211B] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-mono font-medium text-[#1E2721] tabular-nums select-none min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="p-2.5 text-[#37433B] hover:text-[#18211B] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Add to Cart Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleAdd}
            className={`w-full sm:w-auto min-w-[260px] flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer shadow-md active:scale-[0.98] ${
              isAddedFeedback
                ? 'bg-emerald-800 text-white'
                : 'bg-[#1C2520] hover:bg-[#2A3730] text-white'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added to Studio Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add Configured Plant to Bag · ${totalPrice.toFixed(2)}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Trust Badges Footer */}
      <div className="mt-4 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#707C74] border-t border-[#F2EFE9]">
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-700" />
          <span>30-Day Healthy Plant Guarantee</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-700" />
          <span>Pre-potted in premium aeration soil</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-700" />
          <span>White-glove thermal transit packaging</span>
        </div>
      </div>
    </div>
  );
};
