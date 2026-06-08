import React, { useState, useEffect } from 'react';
import { Home, Landmark, Sprout, Wallet, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import OfflineHeader from './components/OfflineHeader';
import DashboardView from './components/DashboardView';
import LoanWizard from './components/LoanWizard';
import DigitalWallet from './components/DigitalWallet';
import InfoHub from './components/InfoHub';
import Marketplace from './components/Marketplace';
import { LoanApplication, WalletTransaction, MarketInputProduct } from './types';
import { INITIAL_PRODUCTS, INITIAL_TRANSACTIONS, CACHED_FARMING_TIPS } from './data';

export default function App() {
  // Navigation Tabs state: 'home' | 'apply' | 'wallet' | 'inputs' | 'tips'
  const [activeTab, setActiveTab] = useState<'home' | 'apply' | 'wallet' | 'inputs' | 'tips'>('home');

  // Network offline simulator state
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    const saved = localStorage.getItem('kuganda_online_state');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Core wallet balance (Starts with 150,000 UGX so they have seed capital to try out purchases!)
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('kuganda_wallet_balance');
    return saved !== null ? Number(saved) : 150000;
  });

  // Loans state
  const [loans, setLoans] = useState<LoanApplication[]>(() => {
    const saved = localStorage.getItem('kuganda_loans');
    // Pre-seed an older repaid loan so they have credit history
    return saved !== null
      ? JSON.parse(saved)
      : [
          {
            id: 'loan-archived-1',
            amount: 150000,
            purpose: 'Seeds',
            farmSize: 1.5,
            primaryCrop: 'Beans',
            repaymentPeriodMonths: 4,
            repaymentTotal: 165000,
            status: 'repaid',
            requestDate: '2026-01-10',
            isSynced: true,
          },
        ];
  });

  // Wallet ledger state
  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('kuganda_transactions');
    return saved !== null ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Calculate outstanding offline items
  const offlineApplicationsCount = loans.filter((l) => !l.isSynced).length;

  // Persists states in LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kuganda_online_state', JSON.stringify(isOnline));
  }, [isOnline]);

  useEffect(() => {
    localStorage.setItem('kuganda_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('kuganda_loans', JSON.stringify(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem('kuganda_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Syncing Engine triggered when coming back Online
  useEffect(() => {
    if (isOnline && offlineApplicationsCount > 0 && !isSyncing) {
      setIsSyncing(true);

      // Simulate network request latencies (2 seconds) to reveal beautiful HMR/animation states
      const timer = setTimeout(() => {
        setLoans((prev) =>
          prev.map((l) => {
            if (!l.isSynced) {
              // If it was pending offline, once synced we automatically approve it!
              // Grant them the capital in the wallet ledger
              const newTx: WalletTransaction = {
                id: `tx-disburse-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                type: 'disbursement',
                amount: l.amount,
                provider: 'MTN Mobile Money',
                phone: '0772 *** 890',
                date: new Date().toISOString().split('T')[0],
                status: 'completed',
                loanPurpose: `${l.purpose} Credit Approved`,
              };
              setTransactions((t) => [newTx, ...t]);
              setWalletBalance((bal) => bal + l.amount);

              return { ...l, isSynced: true, status: 'active' };
            }
            return l;
          })
        );
        setIsSyncing(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOnline, offlineApplicationsCount]);

  // Toggle network setting handler
  const handleToggleNetwork = () => {
    setIsOnline((prev) => !prev);
  };

  // APPLY FOR LOAN
  const handleApplyLoan = (newLoanData: Omit<LoanApplication, 'id' | 'requestDate' | 'isSynced' | 'status'>) => {
    const freshLoan: LoanApplication = {
      ...newLoanData,
      id: `loan-${Date.now()}`,
      requestDate: new Date().toISOString().split('T')[0],
      isSynced: isOnline,
      // If online, it's immediately active & disbursed. If offline, it sits pending until synced.
      status: isOnline ? 'active' : 'pending',
    };

    setLoans((prev) => [freshLoan, ...prev]);

    if (isOnline) {
      // Direct instant mobile money disbursement!
      const disburseTx: WalletTransaction = {
        id: `tx-disburse-${Date.now()}`,
        type: 'disbursement',
        amount: freshLoan.amount,
        provider: 'MTN Mobile Money',
        phone: '0772 *** 890',
        date: freshLoan.requestDate,
        status: 'completed',
        loanPurpose: `${freshLoan.purpose} Season Credit`,
      };
      setTransactions((prev) => [disburseTx, ...prev]);
      setWalletBalance((prev) => prev + freshLoan.amount);
    }

    // Shift tab back to Home
    setActiveTab('home');
  };

  // REPAY ACTIVE LOAN
  const handlePayLoan = (loanId: string, payAmount: number) => {
    // 1. Deduct from wallet
    setWalletBalance((prev) => Math.max(0, prev - payAmount));

    // 2. Add transaction history
    const repayTx: WalletTransaction = {
      id: `tx-repay-${Date.now()}`,
      type: 'repayment',
      amount: payAmount,
      provider: 'MTN Mobile Money',
      phone: '0772 *** 890',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      loanPurpose: 'Crop Credit Repayment',
    };
    setTransactions((prev) => [repayTx, ...prev]);

    // 3. Complete loan if fully paid
    setLoans((prev) =>
      prev.map((l) => {
        if (l.id === loanId) {
          const newTotal = Math.max(0, l.repaymentTotal - payAmount);
          return {
            ...l,
            repaymentTotal: newTotal,
            status: newTotal <= 0 ? 'repaid' : l.status,
          };
        }
        return l;
      })
    );
  };

  // DEPOSIT wallet money manually
  const handleMakeDeposit = (
    amount: number,
    provider: 'MTN Mobile Money' | 'Airtel Money',
    phone: string
  ) => {
    setWalletBalance((prev) => prev + amount);

    const depTx: WalletTransaction = {
      id: `tx-deposit-${Date.now()}`,
      type: 'deposit',
      amount,
      provider,
      phone: phone.substring(0, 4) + ' *** ' + phone.substring(phone.length - 3),
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };
    setTransactions((prev) => [depTx, ...prev]);
  };

  // DIRECT PURCHASE FROM SHOP
  const handlePurchaseInput = (product: MarketInputProduct) => {
    // 1. Deduct price
    setWalletBalance((prev) => prev - product.priceUGX);

    // 2. Generate transaction receipts
    const purchaseTx: WalletTransaction = {
      id: `tx-purchase-${Date.now()}`,
      type: 'repayment',
      amount: product.priceUGX,
      provider: 'MTN Mobile Money',
      phone: '0772 *** 890',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      loanPurpose: `Bought ${product.name}`,
    };
    setTransactions((prev) => [purchaseTx, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center font-sans overflow-y-auto py-0 md:py-6">
      {/* Strictly mobile-first max-width viewport styled like the Design HTML mockup with thick border */}
      <div className="w-full max-w-md min-h-[100vh] md:min-h-[800px] md:max-h-[830px] md:rounded-[40px] md:border-[8px] md:border-slate-900 bg-white shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Top Header */}
        <OfflineHeader
          isOnline={isOnline}
          onToggleOnline={handleToggleNetwork}
          isSyncing={isSyncing}
          offlineCount={offlineApplicationsCount}
        />

        {/* Dynamic Core Screen Views */}
        <div className="flex-grow p-4 overflow-y-auto pb-24 no-scrollbar">
          {activeTab === 'home' && (
            <DashboardView
              activeLoans={loans}
              walletBalance={walletBalance}
              onNavigateTab={setActiveTab}
              isOnline={isOnline}
            />
          )}

          {activeTab === 'apply' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-headline-sm text-base text-on-surface font-bold uppercase tracking-wider text-forest mb-1">
                  Agricultural Credit Line
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Access micro-finance to purchase certified farm resources.
                </p>
              </div>
              <LoanWizard
                onApply={handleApplyLoan}
                onCancel={() => setActiveTab('home')}
                isOnline={isOnline}
              />
            </div>
          )}

          {activeTab === 'inputs' && (
            <Marketplace
              products={INITIAL_PRODUCTS}
              walletBalance={walletBalance}
              onPurchase={handlePurchaseInput}
              onGoToLoanWizard={() => setActiveTab('apply')}
            />
          )}

          {activeTab === 'wallet' && (
            <DigitalWallet
              walletBalance={walletBalance}
              transactions={transactions}
              activeLoans={loans}
              onPayLoan={handlePayLoan}
              onMakeDeposit={handleMakeDeposit}
              isOnline={isOnline}
            />
          )}

          {activeTab === 'tips' && (
            <InfoHub tips={CACHED_FARMING_TIPS} isOnline={isOnline} />
          )}
        </div>

        {/* Fixed App-like Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 h-[68px] bg-white border-t border-slate-200 flex items-center justify-around px-2 z-40">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'apply', label: 'Credit', icon: Landmark },
            { id: 'inputs', label: 'Inputs', icon: Sprout },
            { id: 'wallet', label: 'Money', icon: Wallet },
            { id: 'tips', label: 'Guide', icon: BookOpen },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center flex-1 h-full min-h-[48px] py-2 cursor-pointer transition-all ${
                  isSelected ? 'text-forest font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <IconComp size={20} className={isSelected ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
                <span className="text-[10px] mt-1">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
