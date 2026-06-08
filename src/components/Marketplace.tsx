import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Store, Tag, Sprout, ShieldAlert, ArrowRight } from 'lucide-react';
import { MarketInputProduct } from '../types';

interface MarketplaceProps {
  products: MarketInputProduct[];
  walletBalance: number;
  onPurchase: (product: MarketInputProduct) => void;
  onGoToLoanWizard: () => void;
}

export default function Marketplace({
  products,
  walletBalance,
  onPurchase,
  onGoToLoanWizard,
}: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [purchaseErrorMsg, setPurchaseErrorMsg] = useState<string>('');

  const handlePurchaseClick = (prod: MarketInputProduct) => {
    if (walletBalance < prod.priceUGX) {
      setPurchaseErrorMsg(
        `Insufficient funds. This ${prod.name} costs ${prod.priceUGX.toLocaleString()} UGX, but you only have ${walletBalance.toLocaleString()} UGX. Utilize our micro-loan wizard to secure credit.`
      );
      setTimeout(() => setPurchaseErrorMsg(''), 8000);
      return;
    }

    onPurchase(prod);
    setSuccessMsg(`Successfully acquired ${prod.name}! Check your wallet transaction history.`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const categories = ['All', 'Seeds', 'Fertilizer', 'Tools'];
  const filteredProducts = products.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#1E5E3A] to-[#123e25] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        {/* Subtle decorative visual elements */}
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-500/10 rounded-full" />
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-xs text-emerald-200 capitalize font-bold tracking-wider uppercase">
              COOPERATIVE FARM DEPOT
            </span>
            <h3 className="font-headline-md text-base font-bold mt-1">
              Quality Inputs, Subsidized Rates
            </h3>
            <p className="text-[11px] text-emerald-100/90 leading-relaxed mt-2 max-w-[85%]">
              Verify inputs stamped by Nile Valley and Harvest Co. Pay straight from your wallet balance or micro-finance line.
            </p>
          </div>
          <Store size={28} className="text-emerald-300" />
        </div>
      </div>

      {/* Dynamic Feedback Popups */}
      {successMsg && (
        <div className="bg-[#e8f5ed] border border-forest/30 text-[#1E5E3A] text-xs p-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {purchaseErrorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-4 rounded-xl space-y-3">
          <div className="flex items-start gap-2">
            <ShieldAlert size={16} className="text-rose-700 mt-0.5 flex-shrink-0" />
            <p className="font-medium text-xs leading-relaxed">{purchaseErrorMsg}</p>
          </div>
          <button
            onClick={onGoToLoanWizard}
            className="w-full h-10 bg-[#1E5E3A] text-white hover:bg-forest text-xs font-bold rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>Apply for Micro-Credit Line</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Categories slider */}
      <div className="flex gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-forest text-white'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catalog items */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-outline-variant p-4 flex flex-col [@media(min-width:380px)]:flex-row gap-4 hover:border-forest transition-colors shadow-xs"
          >
            <img
              src={prod.imageUrl}
              alt={prod.name}
              className="w-full [@media(min-width:380px)]:w-24 h-28 object-cover rounded-xl bg-surface-container-high flex-shrink-0 border border-outline-variant/50"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col justify-between flex-grow space-y-2">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-forest-light text-forest font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">
                    {prod.category}
                  </span>
                  {prod.isVerified && (
                    <span className="text-[9px] text-[#1E5E3A] font-bold flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-forest/10">
                      <Sprout size={10} /> Certified
                    </span>
                  )}
                </div>
                <h4 className="font-headline-sm text-sm text-on-surface font-bold mt-1.5 leading-snug">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-1 leading-normal">
                  {prod.description}
                </p>
                <span className="text-[9px] text-on-surface-variant font-medium block mt-1">
                  Supplier: {prod.supplierName}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/60">
                <div className="text-left">
                  <span className="text-[10px] text-on-surface-variant font-bold block">Cash Price</span>
                  <span className="text-sm font-bold font-mono text-forest">
                    {prod.priceUGX.toLocaleString()} UGX
                  </span>
                </div>

                <button
                  onClick={() => handlePurchaseClick(prod)}
                  className="h-10 px-4 bg-forest hover:bg-forest-dark text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
                >
                  <ShoppingCart size={14} />
                  <span>Buy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
