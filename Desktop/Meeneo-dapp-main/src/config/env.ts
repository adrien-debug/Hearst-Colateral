// Environment configuration
export const ENV_CONFIG = {
  // WalletConnect Project ID - Get from https://cloud.walletconnect.com/
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'fdb33d78570f498381df30ca0cf2f2c8',
  
  // Contract Addresses - Ethereum Mainnet deployment
  EPOCH_VAULT_ADDRESS: process.env.NEXT_PUBLIC_EPOCH_VAULT_ADDRESS || '0x561ed827725f889b1cf651485e723d99e5ddd6b4',
  USDC_ADDRESS: process.env.NEXT_PUBLIC_USDC_ADDRESS || '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Mainnet USDC
  
  // Network Configuration - Ethereum Mainnet
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || '1',
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
} as const

// Validation
export function validateEnvConfig() {
  const errors: string[] = []
  
  if (!ENV_CONFIG.WALLETCONNECT_PROJECT_ID || ENV_CONFIG.WALLETCONNECT_PROJECT_ID.length < 10) {
    errors.push('WalletConnect Project ID is not configured - using fallback mode')
  }
  
  if (ENV_CONFIG.EPOCH_VAULT_ADDRESS === '0x0000000000000000000000000000000000000000') {
    errors.push('EpochVault contract address is not configured')
  }
  
  if (ENV_CONFIG.USDC_ADDRESS === '0x0000000000000000000000000000000000000000') {
    errors.push('USDC contract address is not configured')
  }
  
  return errors
}
