import React from 'react';
import { Sprout, DollarSign, Wallet, Compass, Landmark, PlusCircle, BookOpen, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { LoanApplication } from '../types';

interface DashboardViewProps {
  activeLoans: LoanApplication[];
  walletBalance: number;
  onNavigateTab: (tab: 'home' | 'apply' | 'wallet' | 'inputs' | 'tips') => void;
  isOnline: boolean;
}

export default function DashboardView({
  activeLoans,
  walletBalance,
  onNavigateTab,
  isOnline,
}: DashboardViewProps) {
  const currentActiveLoan = activeLoans.find((l) => l.status === 'active');
  const currentPendingLoan = activeLoans.find((l) => l.status === 'pending');

  return (
    <div className="space-y-6">
      {/* 1. Welcoming Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-md bg-[#1B432C] text-white">
        {/* Cover Image of Lush Ugandan Maize Farm with proud woman farmer */}
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-JZ0RC4M2DFVLDfkBjEGzpYfJllzepNZvrQgYX3POLnrlU6O_PJrqrypK0ciE1KcsJ7yQPlsUPReFTf262NQ_sVKwI1BGw5jlBDsbVaZyqsVz0e0mn1nl-It5aaTs6dUbAfnSUaa2V46GTU98bqk4FbIqKmHPrd2DGc18--aDb0K2qqIdvWGacB45kH44fSiCA_jMGqAo4QioWhyQ6Bz6Nj_ulu7QpfuQ13m21pq2_1XEB92YTWPQNccwkTv6ptlyepDO5f_mVhiZ"
            alt="East African Woman Farmer in Maize field"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123e25]/90 via-[#1B432C]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative p-6 space-y-3 pt-20">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
            <Sprout size={12} className="text-emerald-300" />
            <span>Cooperative Member verified</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-2xl font-bold tracking-tight">
              Amani Farms, Masaka
            </h1>
            <p className="text-xs text-green-100/80 font-medium">
              Registered Farmer ID: #KUG-3490-UG
            </p>
          </div>
        </div>
      </div>

      {/* 2. Primary Financial Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Wallet Balance Widget */}
        <button
          onClick={() => onNavigateTab('wallet')}
          className="bg-white rounded-2xl p-4 border border-outline-variant text-left hover:border-forest transition-colors shadow-xs hover:shadow-sm"
        >
          <div className="bg-forest-light text-forest p-2 rounded-xl inline-block">
            <Wallet size={18} />
          </div>
          <span className="text-[10px] text-on-surface-variant font-bold block mt-3 uppercase tracking-wider">
            My Mobile Money Wallet
          </span>
          <span className="text-base font-bold font-mono text-on-surface block mt-1">
            {walletBalance.toLocaleString()} UGX
          </span>
          <span className="text-[9px] text-[#1E5E3A] font-bold mt-1 inline-block">
            Tap to transact &rarr;
          </span>
        </button>

        {/* Active Credit Health Widget */}
        <button
          onClick={() => onNavigateTab('apply')}
          className="bg-white rounded-2xl p-4 border border-outline-variant text-left hover:border-forest transition-colors shadow-xs hover:shadow-sm"
        >
          <div className="bg-amber-50 text-amber-800 p-2 rounded-xl inline-block">
            <DollarSign size={18} />
          </div>
          <span className="text-[10px] text-on-surface-variant font-bold block mt-3 uppercase tracking-wider">
            Active Credit Line
          </span>
          <span className="text-base font-bold font-mono text-on-surface block mt-1">
            {currentActiveLoan ? `${currentActiveLoan.amount.toLocaleString()} UGX` : 'No Active Loan'}
          </span>
          <span className="text-[9px] text-amber-800 font-bold mt-1 inline-block">
            {currentActiveLoan ? 'View repayment plan' : 'Apply for credit &rarr;'}
          </span>
        </button>
      </div>

      {/* 3. Dynamic Loan Status Display */}
      {currentActiveLoan && (
        <div className="bg-[#1E5E3A] text-white rounded-2xl p-5 shadow-sm border border-emerald-950 relative overflow-hidden">
          {/* Abs circles */}
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-400/10 rounded-full" />
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-emerald-250 uppercase tracking-wider">
                Active Crop Loan: {currentActiveLoan.purpose} Series
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Repayment Due
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-green-200 block">Drawn Amount</span>
                <span className="font-bold font-mono text-base block mt-0.5">
                  {currentActiveLoan.amount.toLocaleString()} UGX
                </span>
              </div>
              <div>
                <span className="text-[10px] text-green-200 block">Total Due (with interest)</span>
                <span className="font-bold font-mono text-base block mt-0.5">
                  {currentActiveLoan.repaymentTotal.toLocaleString()} UGX
                </span>
              </div>
            </div>

            {/* Repayment Timeline progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-green-150">
                <span>Planted Season A</span>
                <span>Harvest Repay in {currentActiveLoan.repaymentPeriodMonths} Months</span>
              </div>
              <div className="w-full bg-emerald-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[45%]" />
              </div>
            </div>

            {/* Repay Action Button */}
            <button
              onClick={() => onNavigateTab('wallet')}
              className="w-full h-10 bg-white hover:bg-forest-light text-[#1E5E3A] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
            >
              <span>Repay using Digital Wallet balance</span>
            </button>
          </div>
        </div>
      )}

      {currentPendingLoan && (
        <div className="bg-amber-50/70 border border-amber-200 text-amber-900 rounded-2xl p-4 flex gap-3 items-start md:items-center">
          <Clock size={20} className="text-amber-800 flex-shrink-0 animate-pulse mt-0.5" />
          <div className="flex-grow">
            <span className="text-xs font-bold block text-amber-900">
              Your loan application of {currentPendingLoan.amount.toLocaleString()} UGX is Pending Verification.
            </span>
            <span className="text-[10px] text-amber-700 block">
              Our automated satellite audit is evaluating soil indexes.
            </span>
          </div>
          {isOnline && (
            <div className="bg-amber-600 text-white font-bold text-[9px] px-2 py-1 rounded">
              Awaiting Sync
            </div>
          )}
        </div>
      )}

      {/* 4. Farmers Quick Action Hub */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          Farming Services Grid
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { id: 'apply', label: 'Cash Credit', icon: PlusCircle, bg: 'bg-emerald-50 text-[#1E5E3A] border border-emerald-100' },
            { id: 'inputs', label: 'Inputs Shop', icon: Sprout, bg: 'bg-indigo-50 text-indigo-800 border border-indigo-100' },
            { id: 'tips', label: 'Agronomist', icon: BookOpen, bg: 'bg-amber-50 text-amber-850 border border-amber-100' },
            { id: 'wallet', label: 'Balance MM', icon: Wallet, bg: 'bg-rose-50 text-rose-800 border border-rose-100' },
          ].map((act) => {
            const IconComp = act.icon;
            return (
              <button
                key={act.id}
                onClick={() => onNavigateTab(act.id as any)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl hover:scale-105 active:scale-95 transition-transform aspect-square text-center space-y-2 cursor-pointer"
              >
                <div className={`p-3 rounded-xl ${act.bg}`}>
                  <IconComp size={20} />
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant break-words leading-tight">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Offline Resiliency Pledge Badge (Trust builder) */}
      <div className="bg-neutral-50 rounded-2xl border border-outline-variant p-4 flex gap-3 items-start text-xs leading-relaxed text-on-surface">
        <ShieldCheck size={20} className="text-forest flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-forest">Offline-First Trust Guaranty:</span>
          Kuganda Tech runs entirely on device. You can issue loan drafts, write down transactions, or check farming manuals deep in forest villages without signal. The moment network is recovered, details sync cleanly.
        </div>
      </div>

      {/* 6. Local Testimonials (Google AIDA asset showcase) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          Stories of Growth (Masaka District)
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {[
            {
              name: 'Samuel Okello',
              locality: 'Gulu Region, Maize Cooperative',
              quote: 'Kuganda credits let me buy seeds instantly. Even in offline mode, my draft stayed safe in the ledger, and got synced when I went into town.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw1QAS8vVz4W39zW9KKGvgsxw0o_N9thE4GsDFxiZDr-dv1XZWIh23vl2YVAS6kbOKxPQM4-BYSnqp5i1lOKfn3yqGY4r5iGWJjm45gM5JKDaKTd-5iYxKX87eH_GXWXOeo1QGUSSidNaxuHWAjfcqYWHyUdMSYVsegGGw8uRRn6t5J3GwmBHKcHb-Xc3QrA_td2MSWD7crmWpq_Qhq4a8uEMhR6jcBayGdxxNYhoAO4CpiJcxA0K2mwIV4lEchqqAv2PQ-pMEqgjs',
            },
            {
              name: 'David Kitasi',
              locality: 'Mbale Province, Arabica Coffee',
              quote: 'The CAN fertilizer booster doubled my harvest output. The repayment calendar aligned with my crop yield cycle perfectly, giving absolute peace of mind.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJaIxqOL4sCs9dLGmqMqJcFgu5BYqBp6a88tQbiFHRTB8RPQObIievUj-YjD75n9gOKO4U--fStgSnyfBrE_OB-biAm4l-vZquBcUzRI3XFs9WUJpYOtlts6nCLdwHDzXz81RR8VsOxVGEVKhjthKwFxbhTnWrF1tqxs33eABM89MBv6v2NzvrY33hC9HIj7Ge3-8WaJ-iaLlyPG30Fwp2jRs-s4zLmVjFlOaJhz2G-PzhXCQxtRDmSCDB1suurUdHnyO49ejl9D_V',
            },
          ].map((farmer) => (
            <div
              key={farmer.name}
              className="bg-white rounded-2xl border border-outline-variant p-4 flex gap-4 items-start"
            >
              <img
                src={farmer.img}
                alt={farmer.name}
                className="w-12 h-12 rounded-full object-cover bg-surface-container border border-outline-variant flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-on-surface block">
                  {farmer.name}
                </span>
                <span className="text-[9px] text-[#1E5E3A] block font-medium">
                  {farmer.locality}
                </span>
                <p className="text-xs text-on-surface-variant italic leading-relaxed py-1">
                  "{farmer.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
