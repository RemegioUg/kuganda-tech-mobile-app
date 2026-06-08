import { MarketInputProduct, FarmingTip, WalletTransaction } from './types';

export const INITIAL_PRODUCTS: MarketInputProduct[] = [
  {
    id: 'prod-1',
    name: 'Hybrid Maize Seeds (High Yield 2kg)',
    category: 'Seeds',
    priceUGX: 12500,
    supplierName: 'Nile Valley Agrotech',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVrCHyoZEIUj7IH486aW2N7zeUFC-h3NUtHa-rxPrKyJsNMv1PSYWHx1SeOFq_OiQJ5VVfFdA1HVz5zBKwVdpBzrzlfPy8i25FkjIDe5F3tvxLHKgaYh7bgyk-AQYnpVLAdFKBysMHxCBLalsPko8qv2N1YSLZbeRWcQHq25tZRcqTZjtcMsbWSm4io7YfQiWI1Mkh9wL7IVqD5olQ5OgI3gD2NL2qEdm2kuOr0SP0-GuygVEhG-L3LqeqNmecs7fHZBTYzGdm4-UH',
    description: 'Drought-resistant, early-maturing hybrid maize seed suitable for smallholder cropping in variable moisture. High pest tolerance and optimal yield potential.',
    isVerified: true
  },
  {
    id: 'prod-2',
    name: 'Premium Nitrogen Fertilizer Booster (5kg)',
    category: 'Fertilizer',
    priceUGX: 15500,
    supplierName: 'Kibo Green Ltd',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6e-bwBe5VvyqiiAfk2bmQf_fX2zcqYeyOcWrB2uUWfoWnQWwlK-NO4-1cJt83SrmCmxn_pLpqpIPaGGWoMhDn4PEruJ6Vl_Jahzp11L5yxlqP_-Der5T5zkGR2bGZZuwG0Sv8Ml2Wwvwbhamr1cIAJVk1ZphX9zt6T1UvlTKqNE-joLSUZHhXL67oQWLm6P_N2rHjzVih_XL055HLkLxNF4KUnZUSkVytVM0tq4RhbDJqtLF9WVBp_mY7fp54OBvyKg-9wYgnT2Lv',
    description: 'Highly soluble nutrient complex designed to jumpstart root development and leaf vegetative cover within 7 to 10 days of application.',
    isVerified: true
  },
  {
    id: 'prod-3',
    name: 'Ergonomic Carbon Steel Hand Trowel',
    category: 'Tools',
    priceUGX: 8500,
    supplierName: 'Harvest Tools Co.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp1XR1v5fLCUqeHcQWqYWaa18-VQKCzmdrs_eQLYeMAgHjAGmXztLMKZQ8z619wZGJG_zemJjqDJq0pIg-Q2wrCY1nITHfUd10QnCza_FO_mBI4hhlqUgtJkV5faO5fWZ89_5CbiUYEHeDcgT0JZKeJfwN2jAinmo85pYgmZxFtpU3N08Gj3TaRzF7m0xeiCg_iu6zIC74mooIBtYyZBihQ4daTCyrtUq8Xx6OcHsfJjKZ_-DBxgkkewUXJdROjBybhZlgqsySYaBN',
    description: 'Constructed from heavy-duty tempered carbon steel with an ash wood ergonomic handle to limit hand fatigue during long weeding sessions.',
    isVerified: true
  },
  {
    id: 'prod-4',
    name: 'Gravity-Powered Smart Drip Kit (Small Farm)',
    category: 'Tools',
    priceUGX: 145000,
    supplierName: 'AquaFlow Uganda',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLO40XTSlr-jljfRBgiaxTprzot_dwCw19nIrSYg5W0SKdnajdM5fhn6q61dd2ocsCEzYihBGORpRcvgJguykH9Bjk9LvmE42ENUtyhfiQBP5d0ZENTFmO7sRkr7wz509XukyZUeCaDBfuwDiOubwdGyDB9id8kiQMvl9NzsUJ_BS0-xKcyKWcXxxFpdtSaGnoFxL9i-0CRHD1gjQwUDGK_e4nUDn_XM1HB11tNogmLTrx-Qaa8esnt7EpsRXSbdGVFbuNLG9wPPr',
    description: 'Efficient irrigation solution that distributes precise moisture directly to plant roots. Saves water and eliminates structural runoff.',
    isVerified: true
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    type: 'deposit',
    amount: 50000,
    provider: 'MTN Mobile Money',
    phone: '0772 *** 890',
    date: '2026-06-05',
    status: 'completed'
  },
  {
    id: 'tx-2',
    type: 'repayment',
    amount: 45000,
    provider: 'MTN Mobile Money',
    phone: '0772 *** 890',
    date: '2026-05-15',
    status: 'completed',
    loanPurpose: 'Seeds Credit'
  },
  {
    id: 'tx-3',
    type: 'disbursement',
    amount: 300000,
    provider: 'Airtel Money',
    phone: '0701 *** 456',
    date: '2026-04-01',
    status: 'completed',
    loanPurpose: 'Maize Fertilizer Season A'
  }
];

export const CACHED_FARMING_TIPS: FarmingTip[] = [
  {
    id: 'tip-1',
    title: 'Optimized Nitrogen Top-Dressing',
    category: 'Maize Expert',
    summary: 'Increase harvest yields by administering CAN fertilizer during active vegetative growth phase.',
    content: 'For maximum maize ear development, apply calcium ammonium nitrate (CAN) top dressing when your maize crops stand knee-high (typically 5-6 weeks after planting). Place fertilizer exactly 15cm away from the stem in a circular motion on moist soil to avoid burning plant root crowns.',
    seasonMonth: 'Planting & Thinning',
    weatherHint: 'Ensure soil is damp from the morning rainfall before applying nutrients.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiOvKT3uy0Qx-Gr3R7V84GS8NwaGQujRuj3U6LY0XGhGVASqr-TcWKJ405RWaLQ18t5AlijyszArcK-o0n15V8tAhy4N8uP5dT2Fm6Vw_ZslY8uC6K8zAopgJWJGPmOnnDPoPYcGEZGj6S9Yzi-pPOpgj8GckiMtKGXfj4ke5jL4FT59VRN-fP1DlFwhYxMF6SMg9NWIg31t1n2k2s3qG1ImcnZlfBkfBbkl-bYh5yi_TtxWGaWkV1El4o4O8e5SXKuMSGWCBPB5MO'
  },
  {
    id: 'tip-2',
    title: 'Fall Armyworm Suppression Guide',
    category: 'Pest Control',
    summary: 'Detect early and spray organic neem extracts directly into young whorls.',
    content: 'Fall Armyworm ruins young vegetative crops swiftly. Inspect your farm weekly. Look for tiny ragged pinholes or sawdust-like droppings in the plant leaf whorls. Spraying cold-pressed liquid neem seed extract mixed with soap water at sunset, when worms emerge to feed, will stop infestation without artificial pesticides.',
    seasonMonth: 'Active Growing Season',
    weatherHint: 'Avoid crop chemical application if the sky has heavy slate cloud indicators.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1gz-wRol3cbkVHF3tNba4D4NDm2FLDWhffvDTBqhOgZZfN9feDPuynJ-xg3KucKSp1eBOFbN1B3zOEebBsqdslQXNkRoRTdu4kIQYlexm6b5omBEBjhNISczTMq_u5jJkb2-avw_pI1i7DyWvE-p3yg0-hYhtRqXhu9E1M6wBuxSHNfPmCYnDHWYbgLWq05RjmPDfNKwFGbMwCJkrBxNx7RP-HGaYLsdtyWY-LazRaRdV0RFITGpwKuCiq-kEr0U0uSqFEseqspxD'
  },
  {
    id: 'tip-3',
    title: 'Post-Harvest Restorative Cover Cropping',
    category: 'Soil Health',
    summary: 'Restore valuable soil nitrogen levels by planting leguminous beans before dry period.',
    content: 'Continuous harvesting depletes soil nutrients. During the dry break, plant deep-root cover crops like Mucuna, Cowpeas, or Lablab beans. These crops absorb atmospheric nitrogen through root nodule microbes, securing moisture and enriching the soil structure for your next season.',
    seasonMonth: 'Post-Harvest Preparation',
    weatherHint: 'Best cultivated after large downpours to allow root node absorption.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGSZ_1a9puaKcVD6YAsBKys_QJ6mzX5ehXYV_fgZwz7CC8gGNX5AcFBdcGQ4kOT-107kUFz5QQB8iKPYBYnOH7ZNs_BNtN3rq0iWtIDFNtw9INFIBxYwF2g6ARgeAfSe7216vZs8piom8gDA9a3oiu7_BCu8dT9-xvkgNbGHJ_jvOHZBCLBWuY8U-dBDdjoT5x3tmhr3vCI84m9RdpKKPs4HFf5kdy3yxNcuGD_GDa_hg2RbH2WSFBn0hP7FoiMHfRNVUh0r6rNmed'
  }
];
