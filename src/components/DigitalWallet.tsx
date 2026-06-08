import React, { useState } from 'react';
import { Wallet, Landmark, PhoneCall, RefreshCw, Send, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle } from 'lucide-react';
import { WalletTransaction, LoanApplication } from '../types';

interface DigitalWalletProps {
  walletBalance: number;
  transactions: WalletTransaction[];
  activeLoans: LoanApplication[];
  onPayLoan: (loanId: string, payAmount: number) => void;
  onMakeDeposit: (amount: number, provider: 'MTN Mobile Money' | 'Airtel Money', phone: string) => void;
  isOnline: boolean;
}

export default function DigitalWallet({
  walletBalance,
  transactions,
  activeLoans,
  onPayLoan,
  onMakeDeposit,
  isOnline,
}: DigitalWalletProps) {
  const [activeTab, setActiveTab] = useState<'transactions' | 'deposit' | 'repay'>('transactions');
  
  // Tab states
  const [depositAmount, setDepositAmount] = useState<string>('50000');
  const [provider, setProvider] = useState<'MTN Mobile Money' | 'Airtel Money'>('MTN Mobile Money');
  const [phoneNumber, setPhoneNumber] = useState<string>('0772123456');
  const [selectedLoanId, setSelectedLoanId] = useState<string>('');
  const [repayAmount, setRepayAmount] = useState<string>('');
  
  // Feedback states
  const [paymentFinishedMsg, setPaymentFinishedMsg] = useState<string>('');
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Auto-fill selected loan repayment
  React.useEffect(() => {
    const active = activeLoans.find(l => l.status === 'active');
    if (active) {
      setSelectedLoanId(active.id);
      setRepayAmount(active.repaymentTotal.toString());
    }
  }, [activeLoans]);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (!amt || amt <= 0) return;

    setIsLoading(true);
    setTimeout(() => {
      onMakeDeposit(amt, provider, phoneNumber);
      setIsLoading(false);
      setDepositSuccessMsg(`Top-up of ${amt.toLocaleString()} UGX initiated successfully via ${provider}.`);
      setDepositAmount('50000');
      setTimeout(() => setDepositSuccessMsg(''), 5000);
    }, 1500);
  };

  const handleRepaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(repayAmount);
    if (!selectedLoanId || !amt || amt <= 0) return;

    setIsLoading(true);
    setTimeout(() => {
      onPayLoan(selectedLoanId, amt);
      setIsLoading(false);
      setPaymentFinishedMsg(`Paid ${amt.toLocaleString()} UGX successfully! Your loan has been updated.`);
      setTimeout(() => setPaymentFinishedMsg(''), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Pass Balance Card */}
      <div className="bg-[#1E5E3A] text-white rounded-2xl p-6 shadow-lg border border-[#1b5334] relative overflow-hidden">
        {/* Absolute Design Accents */}
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#257347] rounded-full filter blur-xl opacity-60 pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-24 h-24 bg-forest-light/10 rounded-full filter blur-md pointer-events-none" />

        <div className="flex justify-between items-start z-10 relative">
          <div>
            <span className="text-xs text-forest-light/80 uppercase font-bold tracking-wider block">
              Digital Mobile Money Ledger
            </span>
            <span className="text-3xl font-bold font-mono tracking-tight mt-1.5 block">
              {walletBalance.toLocaleString()} UGX
            </span>
            <span className="text-[10px] text-green-200 mt-1 block">
              Linked Mobile Money: 0772 *** 890 (MTN)
            </span>
          </div>
          <div className="bg-[#247045] p-3 rounded-xl border border-white/10">
            <Wallet size={24} className="text-white" />
          </div>
        </div>

        {/* Dashboard micro quick features */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10 relative z-10">
          <button
            onClick={() => setActiveTab('deposit')}
            className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/20 active:scale-95 transition-all text-xs font-bold py-2.5 rounded-xl cursor-pointer"
          >
            <ArrowDownLeft size={16} />
            <span>Top-up Wallet</span>
          </button>
          <button
            onClick={() => setActiveTab('repay')}
            className="flex items-center justify-center gap-2 bg-white text-forest hover:bg-forest-light active:scale-95 transition-all text-xs font-bold py-2.5 rounded-xl cursor-pointer"
          >
            <ArrowUpRight size={16} />
            <span>Quick Repay</span>
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant">
        {[
          { id: 'transactions', label: 'Cash Log' },
          { id: 'deposit', label: 'Top-up Mobile Money' },
          { id: 'repay', label: 'Repayment Desk' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setPaymentFinishedMsg('');
              setDepositSuccessMsg('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
              activeTab === tab.id
                ? 'bg-forest text-white shadow-sm'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VIEW: Transactions List */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl border border-outline-variant p-4 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Recent Transactions
            </h3>
            <span className="text-[10px] text-forest font-semibold flex items-center gap-1">
              <RefreshCw size={10} className="animate-pulse" /> Verified Offline Cash Ledger
            </span>
          </div>

          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1 no-scrollbar">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-xs text-on-surface-variant">
                No transactions completed yet.
              </div>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center p-3 rounded-xl hover:bg-surface-container-lowest transition-colors border border-outline-variant/40"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        tx.type === 'disbursement' || tx.type === 'deposit'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {tx.type === 'disbursement' || tx.type === 'deposit' ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-on-surface block">
                        {tx.type === 'deposit' ? 'Cash Top-up' : tx.type === 'disbursement' ? 'Loan Issued' : 'Loan Repaid'}
                      </span>
                      <span className="text-[10px] text-on-surface-variant block font-medium">
                        {tx.date} • {tx.provider}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-bold font-mono block ${
                        tx.type === 'disbursement' || tx.type === 'deposit'
                          ? 'text-emerald-700'
                          : 'text-[#1E5E3A]'
                      }`}
                    >
                      {tx.type === 'disbursement' || tx.type === 'deposit' ? '+' : '-'}
                      {tx.amount.toLocaleString()} UGX
                    </span>
                    <span className="text-[9px] bg-green-50 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VIEW: Deposit Mobile Money */}
      {activeTab === 'deposit' && (
        <div className="bg-white rounded-2xl border border-outline-variant p-5 shadow-sm">
          <h3 className="font-headline-sm text-base text-on-surface font-bold mb-1">
            Recharge Wallet Ledger
          </h3>
          <p className="text-xs text-on-surface-variant mb-4">
            Authorize a secure push connection to transfer cash from your personal mobile money plan into Kuganda Tech.
          </p>

          {depositSuccessMsg && (
            <div className="bg-[#e8f5ed] border border-forest/20 text-[#1E5E3A] text-xs p-3 rounded-xl mb-4 flex gap-2 items-center">
              <CheckCircle size={16} />
              <span>{depositSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleDepositSubmit} className="space-y-4">
            {/* Amount */}
            <div className="space-y-1.5">
              <label htmlFor="depAmount" className="text-xs font-bold text-on-surface block">
                Top-up Amount (UGX)
              </label>
              <input
                id="depAmount"
                type="number"
                min="5000"
                max="5000000"
                step="5000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full text-sm rounded-lg border border-outline-variant px-3 py-2.5 outline-none focus:border-forest font-mono font-bold"
                required
              />
            </div>

            {/* Provider Selector */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'MTN Mobile Money', label: 'MTN MoMo', color: 'border-amber-400 text-amber-900 bg-amber-50' },
                { id: 'Airtel Money', label: 'Airtel Money', color: 'border-red-400 text-red-900 bg-red-50' },
              ].map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => setProvider(prov.id as any)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all h-[72px] cursor-pointer ${
                    provider === prov.id
                      ? `${prov.color} ring-2 ring-forest font-bold`
                      : 'border-outline-variant bg-white text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <PhoneCall size={18} />
                  <span className="text-xs font-bold">{prov.label}</span>
                </button>
              ))}
            </div>

            {/* Registered Phone */}
            <div className="space-y-1.5">
              <label htmlFor="depPhone" className="text-xs font-bold text-on-surface block">
                Authorize payment plan phone line
              </label>
              <input
                id="depPhone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full text-sm rounded-lg border border-outline-variant px-3 py-2.5 outline-none focus:border-forest tracking-wider font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-forest hover:bg-forest-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 disabled:bg-gray-300 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Processing secure push...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Push Mobile Money request</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* VIEW: Repay Loan */}
      {activeTab === 'repay' && (
        <div className="bg-white rounded-2xl border border-outline-variant p-5 shadow-sm">
          <h3 className="font-headline-sm text-base text-on-surface font-bold mb-1">
            Agronomist Credit Desk
          </h3>
          <p className="text-xs text-on-surface-variant mb-4">
            Clear or make custom repayments towards your open credit limits. You can pay using your current Kuganda ledger wallet balance.
          </p>

          {paymentFinishedMsg && (
            <div className="bg-[#e8f5ed] border border-forest/20 text-[#1E5E3A] text-xs p-3 rounded-xl mb-4 flex gap-2 items-center">
              <CheckCircle size={16} />
              <span>{paymentFinishedMsg}</span>
            </div>
          )}

          {activeLoans.filter((l) => l.status === 'active').length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-outline-variant rounded-xl">
              <span className="text-xs text-on-surface-variant block mb-1">
                No active outstanding loans discovered on your profile.
              </span>
              <span className="text-[10px] text-forest font-bold font-mono">
                Great job! Your farm is fully sovereign.
              </span>
            </div>
          ) : (
            <form onSubmit={handleRepaySubmit} className="space-y-4">
              {/* Select active loan */}
              <div className="space-y-1.5">
                <label htmlFor="activeLoanSelect" className="text-xs font-bold text-on-surface block">
                  Select Loan Account
                </label>
                <select
                  id="activeLoanSelect"
                  value={selectedLoanId}
                  onChange={(e) => {
                    setSelectedLoanId(e.target.value);
                    const sel = activeLoans.find((l) => l.id === e.target.value);
                    if (sel) setRepayAmount(sel.repaymentTotal.toString());
                  }}
                  className="w-full text-sm rounded-lg border border-outline-variant bg-white px-3 py-2.5 outline-none focus:border-forest"
                >
                  {activeLoans
                    .filter((l) => l.status === 'active')
                    .map((loan) => (
                      <option key={loan.id} value={loan.id}>
                        {loan.purpose} Crop Credit - {loan.amount.toLocaleString()} UGX (Total due: {loan.repaymentTotal.toLocaleString()} UGX)
                      </option>
                    ))}
                </select>
              </div>

              {/* Amount to repay */}
              <div className="space-y-1.5">
                <label htmlFor="repayAmountInput" className="text-xs font-bold text-on-surface block">
                  Amount to Repay (UGX)
                </label>
                <input
                  id="repayAmountInput"
                  type="number"
                  max={activeLoans.find((l) => l.id === selectedLoanId)?.repaymentTotal || 10000000}
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="w-full text-sm rounded-lg border border-outline-variant px-3 py-2.5 outline-none focus:border-forest font-mono font-bold"
                  required
                />
              </div>

              {/* Balance comparison info */}
              <div className="border border-[#1E5E3A]/20 bg-forest-light rounded-xl p-3 flex justify-between items-center text-xs text-[#1E5E3A]">
                <div>
                  <span className="block font-bold">Ledger Balance Available:</span>
                  <span className="font-mono">{walletBalance.toLocaleString()} UGX</span>
                </div>
                {walletBalance < parseFloat(repayAmount || '0') && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200 px-2 py-1 rounded font-bold">
                    Balance low! Charge MM wallet first
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || walletBalance < parseFloat(repayAmount || '0')}
                className="w-full h-12 bg-[#1E5E3A] hover:bg-[#123e25] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Confirming pre-harvest payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Deduct and repay from Kuganda Balance</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
