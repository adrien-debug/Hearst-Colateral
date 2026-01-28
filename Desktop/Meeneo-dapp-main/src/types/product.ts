// Types pour les produits DeFi

export type ProductStatus = 'active' | 'coming_soon' | 'paused' | 'closed'
export type ProductCategory = 'parqueting' | 'product'

export interface Product {
  category: ProductCategory
  slug: string
  name: string
  description: string
  token: string                    // Token de mining (BTC, KAS, ALPH, etc.)
  depositToken: string             // Token de dépôt (USDC, USDT, etc.)
  apr: number                      // APR en %
  lockPeriod: number               // Période de lock en années
  minDeposit: number               // Dépôt minimum en USD
  maxDeposit?: number              // Dépôt maximum (optionnel)
  contractAddress: `0x${string}`
  status: ProductStatus
  icon: string                     // Emoji ou caractère
  color: string                    // Couleur principale hex
  chainId: number                  // Chain ID (1 = Ethereum, 137 = Polygon, etc.)
  features: string[]               // Liste des features
  riskLevel: 'low' | 'medium' | 'high'
  launchDate?: string              // Date de lancement (ISO string)
  tvl?: number                     // TVL actuel (peut être fetch on-chain)
}

// Template pour créer un nouveau produit facilement
export const createProduct = (
  overrides: Partial<Product> & Pick<Product, 'slug' | 'name' | 'token' | 'contractAddress'>
): Product => ({
  category: 'product',
  description: '',
  depositToken: 'USDC',
  apr: 0,
  lockPeriod: 1,
  minDeposit: 100,
  status: 'coming_soon',
  icon: '💎',
  color: '#8AFD81',
  chainId: 1,
  features: [],
  riskLevel: 'medium',
  ...overrides,
})
