'use client'

import { Header } from '@/components/Header'
import { ProductGrid } from '@/components/ProductGrid'
import { PRODUCTS } from '@/config/products'
import { useAppKit } from '@reown/appkit/react'
import Image from 'next/image'
import { useAccount } from 'wagmi'

export default function AppPage() {
  const { isConnected } = useAccount()
  const { open } = useAppKit()

  const activeCount = PRODUCTS.filter((p) => p.status === 'active').length
  const bestAPR = Math.max(...PRODUCTS.map((p) => p.apr))

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/hero/vault-hero.png"
            alt="Vaults"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8AFD81]/20 backdrop-blur-sm border border-[#8AFD81]/30 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AFD81] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8AFD81]"></span>
              </span>
              <span className="text-[#8AFD81] text-sm font-medium">{activeCount} Active Vaults</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Select Your <span className="text-[#8AFD81]">Vault</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              {isConnected 
                ? 'Choose a vault to start earning institutional-grade yield'
                : 'Connect your wallet to access the vaults'
              }
            </p>

            {/* Connect CTA (if not connected) */}
            {!isConnected && (
              <button
                onClick={() => open()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8AFD81] text-gray-900 font-semibold rounded-full hover:bg-[#7aed71] transition-all mb-8"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Connect Wallet
              </button>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 sm:gap-16">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#8AFD81]">{bestAPR}%</p>
                <p className="text-xs sm:text-sm text-gray-400">Best APR</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{activeCount}</p>
                <p className="text-xs sm:text-sm text-gray-400">Vaults</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">€7M+</p>
                <p className="text-xs sm:text-sm text-gray-400">TVL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vaults Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Available <span className="text-[#8AFD81]">Vaults</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Select a vault that matches your investment strategy
            </p>
          </div>

          {/* Products Grid with filters */}
          <ProductGrid products={PRODUCTS} />
        </div>
      </section>
    </div>
  )
}
