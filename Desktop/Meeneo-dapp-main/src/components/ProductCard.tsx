'use client'

import { Product } from '@/types/product'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

const statusConfig = {
  active: {
    label: 'Active',
    bg: 'bg-[#8AFD81]/20',
    text: 'text-[#2d7a28]',
  },
  coming_soon: {
    label: 'Coming Soon',
    bg: 'bg-gray-100',
    text: 'text-gray-500',
  },
  paused: {
    label: 'Paused',
    bg: 'bg-gray-100',
    text: 'text-gray-500',
  },
  closed: {
    label: 'Closed',
    bg: 'bg-gray-100',
    text: 'text-gray-500',
  },
}

const riskConfig = {
  low: { label: 'Low Risk', color: 'text-[#2d7a28]' },
  medium: { label: 'Medium Risk', color: 'text-gray-500' },
  high: { label: 'High Risk', color: 'text-gray-500' },
}

// Icônes SVG par slug de vault
const vaultIcons: Record<string, JSX.Element> = {
  'btc-core': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  'btc-growth': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  'btc-alpha': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'eth-staking': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  'usdc-yield': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'multi-chain': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  'green-energy': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
}

// Icône par défaut
const defaultIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

export function ProductCard({ product }: ProductCardProps) {
  const status = statusConfig[product.status]
  const risk = riskConfig[product.riskLevel]
  const isClickable = product.status === 'active'
  const icon = vaultIcons[product.slug] || defaultIcon

  const CardContent = (
    <div
      className={`bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 ${
        isClickable ? 'hover:shadow-xl hover:border-[#8AFD81] cursor-pointer group' : 'opacity-80'
      }`}
    >
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#8AFD81]/15 to-[#e8f5e9] p-6 border-b border-[#8AFD81]/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#8AFD81] text-[#2d7a28] group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2d7a28]">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">
                  {product.token}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#2d7a28]">{product.apr}%</p>
            <p className="text-xs text-gray-400">APR</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.text}`}>
            {status.label}
          </span>
          <span className={`text-xs font-medium ${risk.color}`}>{risk.label}</span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-5 flex-grow">{product.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-[#8AFD81]/10 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-[#2d7a28]">{product.lockPeriod}Y</p>
            <p className="text-xs text-gray-500">Lock Period</p>
          </div>
          <div className="bg-[#8AFD81]/10 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-[#2d7a28]">${product.minDeposit.toLocaleString('en-US')}</p>
            <p className="text-xs text-gray-500">Min Deposit</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-5">
          {product.features.slice(0, 2).map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-[#8AFD81]">
                <svg className="w-2.5 h-2.5 text-[#2d7a28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {feature}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#8AFD81]/20">
          {isClickable ? (
            <div className="flex items-center justify-center gap-2 py-3 bg-[#8AFD81] text-[#2d7a28] font-semibold rounded-xl group-hover:bg-[#7aed71] transition-all">
              Enter Vault
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center py-3 bg-gray-100 text-gray-400 font-semibold rounded-xl">
              Coming Soon
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (isClickable) {
    return <Link href={`/products/${product.slug}`}>{CardContent}</Link>
  }

  return CardContent
}
