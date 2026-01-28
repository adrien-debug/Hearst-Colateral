import { ENV_CONFIG } from './env'
import { createProduct, Product, ProductCategory } from '@/types/product'

// ============================================
// PRODUITS ACTIFS
// ============================================

export const PRODUCTS: Product[] = [
  // ─────────────────────────────────────────
  // PARQUETING - ETH STAKING VAULT
  // ─────────────────────────────────────────
  {
    category: 'parqueting',
    slug: 'eth-staking',
    name: 'ETH Staking Vault',
    description: 'Secure Ethereum staking with validator node infrastructure. Consistent rewards from Proof-of-Stake.',
    token: 'ETH',
    depositToken: 'ETH',
    apr: 5,
    lockPeriod: 1,
    minDeposit: 500,
    contractAddress: ENV_CONFIG.EPOCH_VAULT_ADDRESS as `0x${string}`,
    status: 'active',
    icon: '',
    color: '#8AFD81',
    chainId: 1,
    features: [
      'Non-custodial staking',
      'Auto-compounding rewards',
      'Slashing protection',
      'Liquid staking tokens',
    ],
    riskLevel: 'low',
    launchDate: '2025-03-01',
  },

  // ─────────────────────────────────────────
  // PARQUETING - USDC YIELD VAULT
  // ─────────────────────────────────────────
  {
    category: 'parqueting',
    slug: 'usdc-yield',
    name: 'USDC Yield Vault',
    description: 'Stable yield on USDC deposits. Low-risk strategy with institutional lending protocols.',
    token: 'USDC',
    depositToken: 'USDC',
    apr: 6,
    lockPeriod: 0.5,
    minDeposit: 100,
    contractAddress: ENV_CONFIG.EPOCH_VAULT_ADDRESS as `0x${string}`,
    status: 'active',
    icon: '',
    color: '#8AFD81',
    chainId: 1,
    features: [
      'No lock period',
      'Daily yield accrual',
      'Instant withdrawals',
      'USDC denominated returns',
    ],
    riskLevel: 'low',
    launchDate: '2025-02-01',
  },

  // ─────────────────────────────────────────
  // PARQUETING - MULTI-CHAIN VAULT
  // ─────────────────────────────────────────
  {
    category: 'parqueting',
    slug: 'multi-chain',
    name: 'Multi-Chain Vault',
    description: 'Diversified staking across multiple chains. Automatic rebalancing for optimal risk-adjusted returns.',
    token: 'MULTI',
    depositToken: 'USDC',
    apr: 8,
    lockPeriod: 1,
    minDeposit: 1000,
    contractAddress: ENV_CONFIG.EPOCH_VAULT_ADDRESS as `0x${string}`,
    status: 'active',
    icon: '',
    color: '#8AFD81',
    chainId: 1,
    features: [
      'Multi-chain exposure',
      'Auto-rebalancing',
      'Risk diversification',
      'Weekly yield distribution',
    ],
    riskLevel: 'medium',
    launchDate: '2025-02-01',
  },

  // ─────────────────────────────────────────
  // PRODUCT - BTC CORE VAULT
  // ─────────────────────────────────────────
  {
    category: 'product',
    slug: 'btc-core',
    name: 'BTC Core Vault',
    description: 'Conservative long-term strategy with stable, predictable returns. Ideal for institutional capital preservation.',
    token: 'BTC',
    depositToken: 'USDC',
    apr: 8,
    lockPeriod: 4,
    minDeposit: 10000,
    contractAddress: ENV_CONFIG.EPOCH_VAULT_ADDRESS as `0x${string}`,
    status: 'active',
    icon: '',
    color: '#8AFD81',
    chainId: 1,
    features: [
      'Institutional-grade custody',
      'Quarterly yield distribution',
      'Capital preservation focus',
      'Full insurance coverage',
    ],
    riskLevel: 'low',
    launchDate: '2024-01-01',
  },

  // ─────────────────────────────────────────
  // PRODUCT - BTC GROWTH VAULT
  // ─────────────────────────────────────────
  {
    category: 'product',
    slug: 'btc-growth',
    name: 'BTC Growth Vault',
    description: 'Optimized balance between yield and security. Next-gen ASIC fleet with strategic energy partnerships.',
    token: 'BTC',
    depositToken: 'USDC',
    apr: 12,
    lockPeriod: 2,
    minDeposit: 5000,
    contractAddress: ENV_CONFIG.EPOCH_VAULT_ADDRESS as `0x${string}`,
    status: 'active',
    icon: '',
    color: '#8AFD81',
    chainId: 1,
    features: [
      'Monthly yield distribution',
      'Dynamic hashrate allocation',
      'Green energy certified',
      'Real-time performance dashboard',
    ],
    riskLevel: 'medium',
    launchDate: '2024-06-01',
  },

  // ─────────────────────────────────────────
  // PRODUCT - BTC ALPHA VAULT
  // ─────────────────────────────────────────
  {
    category: 'product',
    slug: 'btc-alpha',
    name: 'BTC Alpha Vault',
    description: 'Maximum yield strategy leveraging premium infrastructure and strategic mining pool partnerships.',
    token: 'BTC',
    depositToken: 'USDC',
    apr: 18,
    lockPeriod: 1,
    minDeposit: 1000,
    contractAddress: ENV_CONFIG.EPOCH_VAULT_ADDRESS as `0x${string}`,
    status: 'active',
    icon: '',
    color: '#8AFD81',
    chainId: 1,
    features: [
      'Daily yield distribution',
      'Premium ASIC hardware',
      'Priority pool access',
      'Performance bonuses',
    ],
    riskLevel: 'high',
    launchDate: '2025-01-01',
  },

  // ─────────────────────────────────────────
  // PRODUCT - GREEN ENERGY VAULT
  // ─────────────────────────────────────────
  {
    category: 'product',
    slug: 'green-energy',
    name: 'Green Energy Vault',
    description: '100% renewable energy powered mining. Carbon-neutral operations with solar and hydro infrastructure.',
    token: 'BTC',
    depositToken: 'USDC',
    apr: 10,
    lockPeriod: 3,
    minDeposit: 3000,
    contractAddress: ENV_CONFIG.EPOCH_VAULT_ADDRESS as `0x${string}`,
    status: 'active',
    icon: '',
    color: '#8AFD81',
    chainId: 1,
    features: [
      '100% renewable energy',
      'Carbon credits included',
      'ESG compliant',
      'Monthly yield distribution',
    ],
    riskLevel: 'low',
    launchDate: '2025-01-15',
  },
]

// ============================================
// HELPERS
// ============================================

// Récupérer un produit par slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find((p) => p.slug === slug)
}

// Récupérer les produits actifs uniquement
export const getActiveProducts = (): Product[] => {
  return PRODUCTS.filter((p) => p.status === 'active')
}

// Récupérer les produits par status
export const getProductsByStatus = (status: Product['status']): Product[] => {
  return PRODUCTS.filter((p) => p.status === status)
}

// Récupérer les produits par chain
export const getProductsByChain = (chainId: number): Product[] => {
  return PRODUCTS.filter((p) => p.chainId === chainId)
}

// Récupérer les produits par catégorie
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return PRODUCTS.filter((p) => p.category === category)
}

// Récupérer les produits parqueting
export const getParquetingProducts = (): Product[] => {
  return PRODUCTS.filter((p) => p.category === 'parqueting')
}

// Récupérer les produits mining
export const getMiningProducts = (): Product[] => {
  return PRODUCTS.filter((p) => p.category === 'product')
}
