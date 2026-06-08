import React, { useState } from 'react';
import { Sprout, Beaker, Wrench, ShieldCheck, ArrowRight, ArrowLeft, Leaf, Tractor, Info } from 'lucide-react';
import { LoanApplication } from '../types';

interface LoanWizardProps {
  onApply: (loan: Omit<LoanApplication, 'id' | 'requestDate' | 'isSynced' | 'status'>) => void;
  onCancel: () => void;
  isOnline: boolean;
}

export default function LoanWizard({ onApply, onCancel, isOnline }: LoanWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number>(300000);
  const [purpose, setPurpose] = useState<string>('Seeds');
  const [farmSize, setFarmSize] = useState<number>(2);
  const [primaryCrop, setPrimaryCrop] = useState<string>('Maize');
  const [repaymentPeriodMonths, setRepaymentPeriodMonths] = useState<number>(6);

  // Suggested values
  const SUGGESTED_AMOUNTS = [100000, 300000, 500000, 1000000];
  const CROPS = ['Maize', 'Coffee', 'Beans', 'Bananas', 'Cassava'];

  // Calculate simulated interest (roughly 2.5% simple interest per month aligned with cycle)
  const calculateRepaymentTotal = (principal: number, months: number): number => {
    const monthlyRate = 0.025;
    return Math.round(principal * (1 + monthlyRate * months));
  };

  const repaymentTotal = calculateRepaymentTotal(amount, repaymentPeriodMonths);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({
      amount,
      purpose,
      farmSize,
      primaryCrop,
      repaymentPeriodMonths,
      repaymentTotal,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-outline-variant p-5 shadow-md relative overflow-hidden">
      {/* Background Subtle Wave */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-forest-light rounded-full opacity-30 -mr-16 -mt-16 pointer-events-none" />

      {/* Progress Indicators */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-forest">
            Step {step} of 3: {step === 1 ? 'Loan Details' : step === 2 ? 'Farm Information' : 'Review Plan'}
          </span>
          <span className="text-xs font-semibold text-on-surface-variant">
            {step === 1 ? '33%' : step === 2 ? '66%' : '100%'} Complete
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
          <div
            className="bg-forest h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: Amount & Purpose */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-headline-md text-xl text-on-surface font-bold">
                How much do you need for your farm?
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Select your loan amount in UGX. Higher amounts require verified harvest history.
              </p>
            </div>

            {/* Price display and slider */}
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs text-on-surface-variant font-medium">Loan Principal</span>
                <span className="text-2xl font-bold font-mono text-forest">
                  {amount.toLocaleString()} UGX
                </span>
              </div>

              <input
                type="range"
                min="50000"
                max="2000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-forest"
                style={{
                  background: `linear-gradient(to right, #1E5E3A 0%, #1E5E3A ${
                    ((amount - 50000) / (2000000 - 50000)) * 100
                  }%, #bfc9bd ${((amount - 50000) / (2000000 - 50000)) * 100}%, #bfc9bd 100%)`,
                }}
              />

              <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-medium">
                <span>50,000 UGX</span>
                <span>2,000,000 UGX Limit</span>
              </div>
            </div>

            {/* Suggested Amounts */}
            <div className="space-y-2">
              <span className="text-xs text-on-surface-variant font-bold block">
                Quick Select amount:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {SUGGESTED_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all min-h-[44px] border ${
                      amount === val
                        ? 'bg-forest text-white border-forest shadow-sm'
                        : 'bg-white text-on-surface border-outline-variant hover:bg-forest-light'
                    }`}
                  >
                    {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Category */}
            <div className="space-y-3">
              <span className="text-xs text-on-surface-variant font-bold block">
                What farm inputs will you purchase?
              </span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Seeds', label: 'Improved Seeds', icon: Sprout },
                  { id: 'Fertilizer', label: 'Crop Fertilizer', icon: Beaker },
                  { id: 'Tools', label: 'Ecomotive Tools', icon: Wrench },
                  { id: 'Livestock', label: 'Livestock Feed', icon: Leaf },
                ].map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPurpose(cat.id)}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all min-h-[96px] ${
                        purpose === cat.id
                          ? 'border-forest bg-forest-light text-forest shadow-sm'
                          : 'border-outline-variant bg-white text-on-surface hover:border-forest'
                      }`}
                    >
                      <IconComp size={24} className={purpose === cat.id ? 'text-forest' : 'text-on-surface-variant'} />
                      <span className="text-xs font-bold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Farm Info & Crop Selection */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-headline-md text-xl text-on-surface font-bold">
                Agricultural Profile
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Tell us about your garden layout. This calculates seed density and correct harvest schedules.
              </p>
            </div>

            {/* Farm Size */}
            <div className="space-y-2">
              <label htmlFor="farmSize" className="text-xs font-bold text-on-surface block">
                Total Cultivated Lands (Acreage)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="farmSize"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={farmSize}
                  onChange={(e) => setFarmSize(Math.max(0.5, Number(e.target.value)))}
                  className="w-full text-sm rounded-lg border border-outline-variant bg-white px-3 py-2.5 outline-none focus:border-forest tracking-wide"
                />
                <span className="absolute right-3 top-3 text-xs font-semibold text-on-surface-variant">
                  Acres
                </span>
              </div>
            </div>

            {/* Crop Types */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface block">
                Primary Harvest Crop For This Cycle
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CROPS.map((crop) => (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => setPrimaryCrop(crop)}
                    className={`py-2 px-1 text-xs font-semibold rounded-lg transition-colors min-h-[44px] border ${
                      primaryCrop === crop
                        ? 'bg-forest text-white border-forest'
                        : 'bg-white text-on-surface border-outline-variant'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Repayment Period / Crop Cycle Selection */}
            <div className="space-y-2">
              <label htmlFor="repaymentMonths" className="text-xs font-bold text-on-surface block">
                Repayment Schedule (Aligned to Crop harvest)
              </label>
              <select
                id="repaymentMonths"
                value={repaymentPeriodMonths}
                onChange={(e) => setRepaymentPeriodMonths(Number(e.target.value))}
                className="w-full text-sm rounded-lg border border-outline-variant bg-white px-3 py-2.5 outline-none focus:border-forest cursor-pointer"
              >
                <option value={4}>4 Months Cycle (Quick Vegetable/Beans)</option>
                <option value={6}>6 Months Cycle (Maize/Grains - Recommended)</option>
                <option value={9}>9 Months Cycle (Coffee/Root Tubers)</option>
                <option value={12}>12 Months Cycle (Perennial / Forestry)</option>
              </select>
            </div>

            {/* Safety Guarantee Info */}
            <div className="bg-amber-50 text-amber-900 border border-amber-200 p-3 rounded-lg flex gap-3 text-xs leading-relaxed">
              <Info size={16} className="text-amber-800 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Flexible Rain Extensions:</span> Under Kuganda's climate protocol, should localized rain datasets reveal dry spells, your date automatically defers by 30 days without penalty.
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Confirm */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-headline-md text-xl text-on-surface font-bold text-forest">
                Confirm Financial Terms
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Please review your agricultural credit breakdown carefully before authorizing the loan request.
              </p>
            </div>

            {/* Terms breakdown block */}
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant space-y-4">
              <div className="flex justify-between text-xs pb-2 border-b border-dashed border-outline-variant">
                <span className="text-on-surface-variant">Principal Input Amount</span>
                <span className="font-bold font-mono text-on-surface">{amount.toLocaleString()} UGX</span>
              </div>

              <div className="flex justify-between text-xs pb-2 border-b border-dashed border-outline-variant">
                <span className="text-on-surface-variant">Farming Input Category</span>
                <span className="font-bold text-on-surface">{purpose} Supply Bundle</span>
              </div>

              <div className="flex justify-between text-xs pb-2 border-b border-dashed border-outline-variant">
                <span className="text-on-surface-variant">Farm Cultivations</span>
                <span className="font-bold text-on-surface">{farmSize} Acres ({primaryCrop})</span>
              </div>

              <div className="flex justify-between text-xs pb-2 border-b border-dashed border-outline-variant">
                <span className="text-on-surface-variant">Harvest Repayment Cycle</span>
                <span className="font-bold text-on-surface">{repaymentPeriodMonths} Months</span>
              </div>

              <div className="flex justify-between text-xs pb-2 border-b border-dashed border-outline-variant">
                <span className="text-on-surface-variant">Simulated Monthly Interest</span>
                <span className="font-bold text-forest">2.5% simple monthly</span>
              </div>

              <div className="flex justify-between items-end pt-2">
                <div>
                  <span className="text-xs text-on-surface-variant block font-bold">Total Maturity Repayment</span>
                  <span className="text-[10px] text-[red]">Zero fees pre-harvest</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-forest">
                    {repaymentTotal.toLocaleString()} UGX
                  </span>
                </div>
              </div>
            </div>

            {/* Environmental pledge block */}
            <div className="bg-forest-light border border-forest/20 p-3 rounded-lg flex gap-3 items-start text-xs text-forest">
              <ShieldCheck size={20} className="flex-shrink-0 text-forest" />
              <div>
                <span className="font-bold block">Secure Direct-Disbursement:</span>
                Approved funds go instantly to your Mobile Money wallet. Crop audits occur using modern satellite telemetry.
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-outline-variant">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 h-12 rounded-xl text-xs font-bold border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1 active:scale-95"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 h-12 bg-forest text-white rounded-xl text-xs font-bold hover:bg-forest-dark transition-colors flex items-center justify-center gap-1 active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex-grow h-12 bg-forest text-white rounded-xl text-xs font-bold hover:bg-forest-dark transition-colors flex items-center justify-center gap-1 active:scale-95"
            >
              <span>Confirm & Request Loan</span>
              <ShieldCheck size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="px-4 h-12 rounded-xl text-xs font-bold border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors active:scale-95"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
