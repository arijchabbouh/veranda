import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToConfigurator: () => void;
  onScrollToCare: () => void;
  onScrollToMaterials: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onScrollToConfigurator,
  onScrollToCare,
  onScrollToMaterials,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#E7E4DC] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-lg font-serif font-semibold tracking-wider text-[#1A221E] hover:opacity-80 transition-opacity"
        >
          BOTANICA STUDIO
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4D5750]">
          <button
            onClick={onScrollToConfigurator}
            className="hover:text-[#1A221E] transition-colors cursor-pointer"
          >
            3D Studio Configurator
          </button>
          <button
            onClick={onScrollToCare}
            className="hover:text-[#1A221E] transition-colors cursor-pointer"
          >
            Botanical Care & Ratios
          </button>
          <button
            onClick={onScrollToMaterials}
            className="hover:text-[#1A221E] transition-colors cursor-pointer"
          >
            Planter Materials
          </button>
          <span className="text-xs text-[#7B857D] font-mono tracking-tight hidden lg:inline">
            STUDIO LIGHTING EDITION
          </span>
        </nav>

        {/* Zone 3: Primary action (Cart drawer button) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            aria-label="Open cart drawer"
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#1A221E] bg-white border border-[#DED9CD] rounded-lg hover:border-[#1A221E] hover:bg-[#F2EFE9] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#2C3830]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums text-xs px-1.5 py-0.2 bg-[#2C3830] text-white rounded">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
