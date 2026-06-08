export interface LoanApplication {
  id: string;
  amount: number;         // in UGX
  purpose: string;        // Seeds, Fertilizer, Tools, Livestock
  farmSize: number;       // in acres
  primaryCrop: string;    // Maize, Coffee, Beans, Bananas, Cassava
  repaymentPeriodMonths: number; // e.g., 4, 6, 9, 12 months
  repaymentTotal: number; // Principal + simulated interest
  status: 'pending' | 'active' | 'repaid' | 'rejected';
  requestDate: string;
  isSynced: boolean;      // For offline tracking
}

export interface MarketInputProduct {
  id: string;
  name: string;
  category: 'Seeds' | 'Fertilizer' | 'Tools' | 'Livestock';
  priceUGX: number;
  supplierName: string;
  imageUrl: string;
  description: string;
  isVerified: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'disbursement' | 'repayment' | 'deposit';
  amount: number;         // in UGX
  provider: 'MTN Mobile Money' | 'Airtel Money';
  phone: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  loanPurpose?: string;
}

export interface FarmingTip {
  id: string;
  title: string;
  category: 'Maize Expert' | 'Soil Health' | 'Pest Control' | 'General Crop';
  summary: string;
  content: string;
  seasonMonth: string;    // e.g. 'October', 'All Seasons'
  weatherHint: string;    // expected rain suggestion
  imageUrl: string;
}
