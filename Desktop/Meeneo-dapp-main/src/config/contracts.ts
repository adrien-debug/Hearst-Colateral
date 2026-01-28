import { ENV_CONFIG } from './env'

// Contract configuration
export const CONTRACT_ADDRESSES = {
  // Update these addresses after deployment
  EPOCH_VAULT: ENV_CONFIG.EPOCH_VAULT_ADDRESS,
  USDC: ENV_CONFIG.USDC_ADDRESS,
} as const;

// Network configuration
export const NETWORKS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_PROJECT_ID",
    blockExplorer: "https://etherscan.io",
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_PROJECT_ID",
    blockExplorer: "https://sepolia.etherscan.io",
  },
  polygon: {
    chainId: 137,
    name: "Polygon",
    rpcUrl: "https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID",
    blockExplorer: "https://polygonscan.com",
  },
  bsc: {
    chainId: 56,
    name: "BSC",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorer: "https://bscscan.com",
  },
} as const;

// Hardcoded addresses from the contract
export const HARDCODED_ADDRESSES = {
  REWARD_DEPOSITOR: "0x3F73DF516a501835F3BB46AF3cA669945597988D",
  AUTHORIZED_WITHDRAWAL: "0x51a99B1C95269065a545a2A8E5aF68438804c88b",
  ADMIN_DEPOSITOR: "0x2d206F87528aed3a09f0F172d404DE7B5dC669C2",
} as const;

// Contract configuration
export const CONTRACT_CONFIG = {
  EPOCH_DURATION: 30 * 24 * 60 * 60, // 30 days in seconds
  WITHDRAWAL_LOCK_PERIOD: 4 * 365 * 24 * 60 * 60, // 4 years in seconds
  BASIS_POINTS: 10000,
} as const;
