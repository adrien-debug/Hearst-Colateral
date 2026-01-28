# Hearst - Institutional Mining-as-a-Service

A Next.js application powered by Hearst Connect for institutional Mining-as-a-Service. Secure access to real Proof-of-Work yield through tailor-made mining infrastructure with transparent, scalable, and profitable DeFi-powered solutions.

## About Hearst Connect

Hearst is built on [Hearst Connect](https://www.hearstcorporation.io/hearst-connect) infrastructure, providing:
- Customized mining setups for Bitcoin, Kaspa, and Alephium
- Energy-efficient, professionally managed data centers
- Real-time monitoring and performance optimization
- Daily reward distribution in native tokens or stablecoin equivalents

## Features

- 🔗 **WalletConnect Integration**: Connect with 300+ wallets
- 💰 **Tiered Vaults**: Aligned to yield, duration, and performance targets
- 🎯 **Daily Rewards**: Cloud mining rewards distributed daily
- 🔒 **4-Year Lock**: 12% APR with secure withdrawal control
- 📊 **Real-time Dashboard**: Track position, rewards, and vault performance
- ⚡ **Proof-of-Work Yield**: Real mining operations, not synthetic yield
- 🌱 **Sustainable Mining**: Energy-efficient data centers
- 🏢 **Institutional Grade**: Professional infrastructure management
- 📱 **Responsive Design**: Optimized for all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- WalletConnect Project ID
- Deployed EpochVault contract addresses

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # WalletConnect Project ID (required)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
   
   # Contract Addresses (Sepolia testnet)
   NEXT_PUBLIC_EPOCH_VAULT_ADDRESS=0x20b5f7EC98ac1ee823e516Fb0d5Cace6229D37aF
   NEXT_PUBLIC_USDC_ADDRESS=0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
   
   # Network Configuration (Sepolia)
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
   ```

3. **Get WalletConnect Project ID:**
   - Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy your Project ID

4. **Get Sepolia USDC:**
   - Visit [Sepolia Faucet](https://sepoliafaucet.com/) to get Sepolia ETH
   - Get Sepolia USDC from [Circle's Sepolia Faucet](https://faucet.circle.com/)
   - Or use the contract at `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The application will be available at `http://localhost:3000`.

## Vault Results

**PoW Yield Vaults (USDC)**
- **Total Raised**: €7M+ (€2M Vault 1 + €5M Vault 2)
- **Participants**: 1,682 total (573 in Vault 1, 1,109 in Vault 2)
- **APR**: 12%
- **Lock Period**: 4 years
- **Infrastructure**: Energy-efficient, professionally managed mining facilities

Vault 1 raised €2.0M within just 7 hours, demonstrating strong institutional demand.

## Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hearst-vault-frontend)

### Manual Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   npx vercel
   ```

3. **Set environment variables** in your deployment platform

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Usage

### For Users

1. **Connect Wallet**: Click "Connect Wallet" to connect your Web3 wallet
2. **Approve USDC**: Approve the vault to spend your USDC tokens
3. **Deposit**: Deposit USDC into the vault to start earning rewards
4. **Claim Rewards**: Claim your pending rewards when available
5. **Withdraw**: Withdraw your funds after the 4-year lock period

### For Admins

The application includes special admin panels for:

- **Reward Depositor** (`0x3F73DF516a501835F3BB46AF3cA669945597988D`):
  - Distribute rewards to the vault
  
- **Authorized Withdrawal** (`0x51a99B1C95269065a545a2A8E5aF68438804c88b`):
  - Withdraw funds without the 4-year lock period
  
- **Admin Depositor** (`0x2d206F87528aed3a09f0F172d404DE7B5dC669C2`):
  - Deposit non-reward funds into the vault

### Create Vault (Admin)

Le panneau admin inclut une fonctionnalité **Create Vault** permettant de déployer de nouveaux smart contracts EpochVault directement depuis l'interface:

1. **Accès**: Admin → Actions Rapides → "Create Vault" ou via la sidebar "Nouveau Vault"
2. **Paramètres ABI du constructeur**:
   - `_asset` (address): Adresse du token ERC20 pour les dépôts (ex: USDC)
   - `_owner` (address): Adresse admin du vault
3. **Mode Custom ABI**: Toggle pour charger un ABI/bytecode personnalisé
   - Upload fichier JSON (artifact Hardhat/Foundry)
   - Parsing automatique des paramètres du constructeur
   - Support de types: address, uint, int, bool, string
4. **Déploiement**: Transaction de déploiement signée via wallet connecté

## Architecture

### Pages

- **/**: Landing page with hero, features and CTA
- **/products**: Multi-product grid with filters and sorting
- **/products/[slug]**: Individual product detail and dashboard
- **/dashboard**: Quick access to BTC Mining vault
- **/admin**: Admin-only functions

### Components

- **Header**: Wallet connection and navigation
- **ProductCard**: Product display card for grid
- **ProductGrid**: Filterable/sortable products grid
- **VaultOverview**: General vault information and statistics
- **UserDashboard**: User-specific actions (deposit, withdraw, claim)
- **AdminPanel**: Admin-only functions and information

### Hooks

- **useEpochVault**: Smart contract interaction hooks
- **useVaultInfo**: Vault statistics and information
- **useUserInfo**: User-specific data and status
- **useDeposit/useWithdraw/useClaimRewards**: Transaction hooks
- **useUSDCAllowance/useUSDCApproval**: USDC token management

### Configuration

- **products.ts**: Multi-product configuration with helper functions
- **contracts.ts**: Contract addresses and configuration
- **wagmi.ts**: WalletConnect and Wagmi setup
- **env.ts**: Environment variable management

### Adding a New Product

To add a new product, edit `src/config/products.ts`:

```typescript
import { createProduct } from '@/types/product'

// Add to PRODUCTS array:
createProduct({
  slug: 'my-new-vault',           // URL: /products/my-new-vault
  name: 'My New Vault',
  description: 'Description',
  token: 'TOKEN',                 // Token miné
  contractAddress: '0x...',       // Smart contract address
  apr: 10,                        // APR en %
  lockPeriod: 2,                  // Lock en années
  minDeposit: 100,                // Min en USD
  status: 'coming_soon',          // active | coming_soon | paused | closed
  icon: '💎',                     // Emoji
  color: '#HEXCOLOR',             // Couleur principale
  features: ['Feature 1', 'Feature 2'],
  riskLevel: 'medium',            // low | medium | high
}),
```

## Supported Networks

- **Sepolia Testnet** (Primary - Contract deployed here)
- Ethereum Mainnet
- Polygon Mainnet
- BSC Mainnet

## Supported Wallets

The application supports 300+ wallets through WalletConnect, including:

- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- Rainbow
- And many more...

## Security Considerations

- Private keys are never stored or transmitted
- All transactions are signed locally in your wallet
- Contract addresses are verified before interactions
- Admin functions are restricted to authorized addresses

## Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined (reading 'map')"**
   - This error occurs when WalletConnect is not properly configured
   - The application now includes fallback handling for this issue
   - Set up your WalletConnect project ID in `.env.local` to resolve

2. **"WalletConnect Project ID not configured"**
   - Set up your WalletConnect project ID in `.env.local`
   - The app will work with demo functionality if not configured

3. **"Contract address not configured"**
   - Deploy the contract and update the address in `.env.local`
   - Vault functionality will be limited without proper contract addresses

4. **"Transaction failed"**
   - Check your wallet balance for gas fees
   - Ensure you have sufficient USDC allowance
   - Verify the contract is deployed and accessible

5. **"Wallet connection failed"**
   - Try refreshing the page
   - Clear browser cache
   - Try a different wallet

### Getting Help

- Check the browser console for error messages
- Verify your environment configuration
- Ensure the smart contract is properly deployed
- Check network connectivity and gas prices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.