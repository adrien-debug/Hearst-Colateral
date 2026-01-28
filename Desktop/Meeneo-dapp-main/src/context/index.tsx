'use client'

import { projectId, wagmiAdapter } from '@/config/wagmi'
import { bsc, mainnet, polygon, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'EpochVault',
  description: 'Decentralized vault with epoch-based rewards',
  url: 'https://epochvault.com', // origin must match your domain & subdomain
  icons: ['https://epochvault.com/icon.png']
}

// Create the modal (required for AppKit initialization)
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, sepolia, polygon, bsc],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
