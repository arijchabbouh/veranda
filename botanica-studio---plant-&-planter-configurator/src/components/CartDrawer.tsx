import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../data/configuratorData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const freeShippingThreshold = 180;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 15;
  const orderTotal = subtotal + shippingCost;

  const handleMockCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
    }, 1200);
  };

  const handleDismissOrder = () => {
    setOrderConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E2DDD2] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EAE5D9] flex items-center justify-between bg-white">
            <div>
              <h2 className="text-lg font-serif font-semibold text-[#1B241E]">
                Botanica Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <p className="text-xs text-[#717E75] font-mono">
                Studio configured botanicals
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-[#566359] hover:text-[#1B241E] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Confirmed Screen */}
          {orderConfirmed ? (
            <div className="p-8 text-center my-auto">
              <CheckCircle2 className="w-16 h-16 text-emerald-700 mx-auto mb-4" />
              <span className="text-xs font-mono uppercase text-emerald-800 tracking-wider">
                Order #BS-8094 Confirmed
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1B241E] mt-1 mb-2">
                Your botanical is on its way
              </h3>
              <p className="text-sm text-[#4E5C52] leading-relaxed mb-6">
                Our master horticulturists are inspecting your foliage, testing root aeration in the
                handcrafted planter, and preparing white-glove climate-controlled delivery.
              </p>
              <button
                onClick={handleDismissOrder}
                className="w-full py-3 bg-[#1C2520] hover:bg-[#2B3830] text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Return to Configurator
              </button>
            </div>
          ) : (
            <>
              {/* Shipping Meter */}
              <div className="px-6 py-3 bg-[#F3EFE7] border-b border-[#E5DFD2]">
                <div className="flex items-center justify-between text-xs text-[#4E5C52] mb-1.5 font-medium">
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-800 font-semibold">
                      ✓ Free insured studio delivery unlocked
                    </span>
                  ) : (
                    <span>
                      Add ${(freeShippingThreshold - subtotal).toFixed(2)} for free delivery
                    </span>
                  )}
                  <span className="font-mono text-[11px]">
                    ${subtotal.toFixed(0)} / ${freeShippingThreshold}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#DED7C8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#35463A] transition-all duration-300 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 text-[#758177]">
                    <p className="font-serif italic text-lg mb-1">Your bag is empty</p>
                    <p className="text-xs">
                      Switch plants and planters in the 3D studio configurator to create your mockup.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-xl border border-[#E9E4D8] flex gap-3.5 shadow-2xs"
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={item.plant.editorialImage || item.plant.image}
                        alt={item.plant.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-24 object-cover rounded-lg border border-[#EDE8DC] shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold font-serif text-[#1C2520] leading-snug">
                              {item.plant.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              aria-label="Remove item"
                              className="text-[#98A39A] hover:text-[#8D3838] transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-[#5D6B61] mt-0.5">
                            Planter: {item.pot.name}
                          </p>
                          <span className="text-[10px] font-mono text-[#849086] block mt-0.5">
                            Ratio: {item.plant.plantToPotRatio} · {item.plant.heightCm}cm
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F2EEE4]">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#DDD6C7] rounded bg-[#FAF9F6]">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#39453C] hover:text-black cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#39453C] hover:text-black cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="font-mono text-sm font-semibold text-[#1C2520] tabular-nums">
                            ${item.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-[#EAE4D7] space-y-3">
                  <div className="space-y-1.5 text-xs text-[#546257]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>White-glove Delivery</span>
                      <span className="font-mono tabular-nums">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#1B241E] pt-2 border-t border-[#ECE7DC]">
                      <span>Estimated Total</span>
                      <span className="font-mono tabular-nums text-base">
                        ${orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleMockCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 px-4 bg-[#1C2520] hover:bg-[#2B3930] disabled:bg-[#727D75] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    {isCheckingOut ? (
                      <span>Securing Botanical Order...</span>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#717E75] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>30-Day Plant Health Guarantee · Carbon-neutral delivery</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
