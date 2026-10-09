/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StudioStage } from './components/StudioStage';
import { ProductDescription } from './components/ProductDescription';
import { RatioGuideSection } from './components/RatioGuideSection';
import { CartDrawer } from './components/CartDrawer';
import { PLANTS, POTS, CartItem } from './data/configuratorData';

export default function App() {
  const [plantIndex, setPlantIndex] = useState<number>(0);
  const [potIndex, setPotIndex] = useState<number>(0);
  const [plantDirection, setPlantDirection] = useState<number>(1);
  const [potDirection, setPotDirection] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const currentPlant = PLANTS[plantIndex];
  const currentPot = POTS[potIndex];

  // Switch Plant Handlers (Top Arrows)
  const handlePrevPlant = () => {
    setPlantDirection(-1);
    setPlantIndex((prev) => (prev === 0 ? PLANTS.length - 1 : prev - 1));
  };

  const handleNextPlant = () => {
    setPlantDirection(1);
    setPlantIndex((prev) => (prev === PLANTS.length - 1 ? 0 : prev + 1));
  };

  const handleSelectPlantIndex = (newIdx: number) => {
    setPlantDirection(newIdx >= plantIndex ? 1 : -1);
    setPlantIndex(newIdx);
  };

  // Switch Pot Handlers (Lower Arrows)
  const handlePrevPot = () => {
    setPotDirection(-1);
    setPotIndex((prev) => (prev === 0 ? POTS.length - 1 : prev - 1));
  };

  const handleNextPot = () => {
    setPotDirection(1);
    setPotIndex((prev) => (prev === POTS.length - 1 ? 0 : prev + 1));
  };

  const handleSelectPotIndex = (newIdx: number) => {
    setPotDirection(newIdx >= potIndex ? 1 : -1);
    setPotIndex(newIdx);
  };

  const handleAddToCart = (quantity: number) => {
    const newItemId = `${currentPlant.id}-${currentPot.id}-${Date.now()}`;
    const unitPrice = currentPlant.price + currentPot.price;
    const newItem: CartItem = {
      id: newItemId,
      plant: currentPlant,
      pot: currentPot,
      quantity,
      includeSaucer: true,
      organicSubstrateIncluded: true,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToConfigurator = () => {
    document.getElementById('configurator-stage')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCare = () => {
    document.getElementById('ratio-guide')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMaterials = () => {
    document.getElementById('materials')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectMockup = (pIdx: number, ptIdx: number) => {
    setPlantDirection(pIdx >= plantIndex ? 1 : -1);
    setPotDirection(ptIdx >= potIndex ? 1 : -1);
    setPlantIndex(pIdx);
    setPotIndex(ptIdx);
    scrollToConfigurator();
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1E2520] flex flex-col font-sans selection:bg-[#2C3830] selection:text-white">
      {/* 3-Zone Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToConfigurator={scrollToConfigurator}
        onScrollToCare={scrollToCare}
        onScrollToMaterials={scrollToMaterials}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Editorial Subheader & Context */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#68756C] uppercase">
            <span>Studio Lighting</span>
            <span aria-hidden="true">·</span>
            <span>Independent 3D Layers</span>
            <span aria-hidden="true">·</span>
            <span>Dynamic Model Auto-Zoom</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#19221C] tracking-tight text-balance">
            Interactive Plant & Planter Configurator
          </h2>

          <p className="text-sm sm:text-base text-[#526056] leading-relaxed max-w-2xl mx-auto">
            The studio background remains constant. Switch transparent plants with the top arrows and transparent planters with the bottom arrows. Each plant sits centered directly into the pot, with smooth directional slide-and-fade animations and automatic camera zoom scaling.
          </p>
        </section>

        {/* The Configurator Stage Anchor */}
        <section id="configurator-stage" className="space-y-8">
          {/* Main 2D/3D Studio Stage */}
          <StudioStage
            currentPlant={currentPlant}
            currentPot={currentPot}
            plantIndex={plantIndex}
            totalPlants={PLANTS.length}
            potIndex={potIndex}
            totalPots={POTS.length}
            onPrevPlant={handlePrevPlant}
            onNextPlant={handleNextPlant}
            onPrevPot={handlePrevPot}
            onNextPot={handleNextPot}
            onSelectPlantIndex={handleSelectPlantIndex}
            onSelectPotIndex={handleSelectPotIndex}
            allPlants={PLANTS}
            allPots={POTS}
            plantDirection={plantDirection}
            potDirection={potDirection}
          />

          {/* Bottom Component: Description & Add to Cart */}
          <ProductDescription
            plant={currentPlant}
            pot={currentPot}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Additional Guides, Curated Mockups, and Botanical Ratio Science */}
        <RatioGuideSection
          allPlants={PLANTS}
          allPots={POTS}
          onSelectMockup={handleSelectMockup}
        />
      </main>

      {/* Slide-over Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Editorial Footer */}
      <footer className="mt-20 border-t border-[#E5E0D5] bg-[#F2EFE8] py-12 text-xs text-[#647267]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif font-semibold text-sm text-[#1B241E]">
              BOTANICA STUDIO
            </span>
            <span>·</span>
            <span>Architectural Plants & Handcrafted Planters</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToConfigurator}
              className="hover:text-[#1B241E] transition-colors cursor-pointer"
            >
              Configurator
            </button>
            <button
              onClick={scrollToCare}
              className="hover:text-[#1B241E] transition-colors cursor-pointer"
            >
              Proportion Standards
            </button>
            <button
              onClick={scrollToMaterials}
              className="hover:text-[#1B241E] transition-colors cursor-pointer"
            >
              Materials
            </button>
          </div>

          <div className="font-mono text-[11px] text-[#7C887F]">
            © {new Date().getFullYear()} Botanica Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
