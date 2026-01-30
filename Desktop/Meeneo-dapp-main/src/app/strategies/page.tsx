'use client'

import { Header } from '@/components/Header'
import { PRODUCTS } from '@/config/products'
import { useAppKit } from '@reown/appkit/react'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import Image from 'next/image'

export default function StrategiesPage() {
  const { isConnected } = useAccount()
  const { open } = useAppKit()
  const [selectedVault, setSelectedVault] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState('')
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  const filteredProducts = PRODUCTS
    .filter(p => p.status === 'active')
    .filter(p => filterRisk === 'all' || p.riskLevel === filterRisk)
    .sort((a, b) => b.apr - a.apr)

  const handleSubscribe = (slug: string) => {
    if (!isConnected) {
      open()
      return
    }
    setSelectedVault(slug)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="w-full px-6 lg:px-16 xl:px-24">
          
          {/* Hero Section with CTA Image */}
          <div className="relative h-48 mb-10 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/assets/cta/tech-header.png"
                alt="Vault Hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-white/70"></div>
            </div>
            <div className="relative p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8AFD81] rounded-full mb-4">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span className="text-gray-900 text-sm font-medium">Live Protocol</span>
                  </div>
                  <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-2">Investment Vaults</h1>
                  <p className="text-gray-600">Institutional-grade Bitcoin mining strategies</p>
                </div>
                <div className="flex gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">€50.2M</p>
                    <p className="text-xs text-gray-500">TVL</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#8AFD81]">10.5%</p>
                    <p className="text-xs text-gray-500">APR</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">1,682</p>
                    <p className="text-xs text-gray-500">Investors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-sm text-gray-500 font-medium">Filter:</span>
            {(['all', 'low', 'medium', 'high'] as const).map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filterRisk === risk
                    ? 'bg-[#8AFD81] text-gray-900 shadow-lg shadow-[#8AFD81]/25'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {risk === 'all' ? 'All Vaults' : risk.charAt(0).toUpperCase() + risk.slice(1) + ' Risk'}
              </button>
            ))}
          </div>

          {/* Vaults Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.slug}
                className="group relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_80px_rgba(138,253,129,0.25)] transition-all duration-500 border border-gray-200 hover:border-[#8AFD81]/50"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src="/assets/cta/hex-texture.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-white/60"></div>
                </div>
                
                {/* Premium APR Display */}
                <div className="relative px-8 pt-8 pb-6">
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-[#8AFD81] rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#2d7a28] font-medium">Live</span>
                  </div>
                  
                  {/* Header Row */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.token} Mining Vault</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      product.riskLevel === 'low' ? 'bg-[#8AFD81]/20 text-[#8AFD81] border border-[#8AFD81]/30' :
                      product.riskLevel === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {product.riskLevel}
                    </div>
                  </div>

                  {/* APR Hero */}
                  <div className="relative mb-8">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Expected Annual Return</p>
                    <div className="flex items-end gap-2">
                      <span className="text-7xl font-black text-gray-900 tracking-tighter leading-none">{product.apr}</span>
                      <div className="pb-3">
                        <span className="text-4xl font-bold text-[#8AFD81]">%</span>
                      </div>
                    </div>
                    {/* Performance Indicator */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8AFD81]/15 rounded-full border border-[#8AFD81]/20">
                        <svg className="w-4 h-4 text-[#8AFD81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="text-sm font-semibold text-[#8AFD81]">+2.4%</span>
                      </div>
                      <span className="text-sm text-gray-400">vs last month</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base text-gray-500 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-4 text-center border border-gray-100">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-white shadow-sm flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {product.lockPeriod < 1 ? `${Math.round(product.lockPeriod * 12)}mo` : `${product.lockPeriod}yr`}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Lock period</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-4 text-center border border-gray-100">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-white shadow-sm flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-xl font-bold text-gray-900">${(product.minDeposit / 1000)}k</p>
                      <p className="text-xs text-gray-400 mt-0.5">Minimum</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#8AFD81]/10 to-[#8AFD81]/5 rounded-2xl p-4 text-center border border-[#8AFD81]/20">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-[#8AFD81]/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#2d7a28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-xl font-bold text-[#2d7a28]">${(product.minDeposit * 50 / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-[#2d7a28]/70 mt-0.5">TVL</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 group/feature">
                        <div className="w-6 h-6 rounded-full bg-[#8AFD81]/20 flex items-center justify-center flex-shrink-0 group-hover/feature:bg-[#8AFD81]/30 transition-colors">
                          <svg className="w-3.5 h-3.5 text-[#2d7a28]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-8 pb-8">
                  {selectedVault === product.slug ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder={`${product.minDeposit.toLocaleString('en-US')} min`}
                          className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#8AFD81] focus:border-[#8AFD81] outline-none transition-all"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedVault(null)} 
                          className="flex-1 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                        <button className="flex-1 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] shadow-lg shadow-[#8AFD81]/25 transition-all text-sm">
                          Confirm
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSubscribe(product.slug)}
                        className="flex-1 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] shadow-lg shadow-[#8AFD81]/25 transition-all text-sm"
                      >
                        Deposit
                      </button>
                      <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm">
                        Details
                      </button>
                    </div>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[#8AFD81]/20 via-transparent to-transparent"></div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No vaults match your criteria</p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
