'use client'

import { Header } from '@/components/Header'
import { UserDashboard } from '@/components/UserDashboard'
import { VaultOverview } from '@/components/VaultOverview'
import { getProductBySlug } from '@/config/products'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use } from 'react'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Pour l'instant, seul BTC Mining est actif et utilise les composants existants
  const isBTCMining = product.slug === 'btc-mining'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/products" className="hover:text-gray-900 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold bg-[#8AFD81] text-gray-900">
                {product.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-base text-gray-500">{product.description}</p>
              </div>
            </div>
            <span className="px-5 py-2.5 text-base font-semibold rounded-full bg-[#8AFD81]/20 text-[#2d7a28]">
              {product.apr}% APR
            </span>
          </div>

          {/* Product Info Bar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Token</p>
                <p className="text-lg font-bold text-gray-900">{product.token}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Lock Period</p>
                <p className="text-lg font-bold text-gray-900">{product.lockPeriod} Years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Min Deposit</p>
                <p className="text-lg font-bold text-gray-900">${product.minDeposit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Deposit Token</p>
                <p className="text-lg font-bold text-gray-900">{product.depositToken}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                <p className="text-lg font-bold text-gray-900">
                  {product.riskLevel.charAt(0).toUpperCase() + product.riskLevel.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {isBTCMining && product.status === 'active' ? (
            // BTC Mining utilise les composants existants
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-4">
                <VaultOverview />
              </div>
              <div className="col-span-12 lg:col-span-8">
                <UserDashboard />
              </div>
            </div>
          ) : (
            // Autres produits - Coming Soon
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-bold mx-auto mb-6 bg-[#8AFD81]/20 text-gray-900">
                {product.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                The {product.name} is currently in development. Join our waitlist to be notified when
                it launches.
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <button className="px-8 py-3 bg-gray-100 text-gray-600 font-semibold rounded-full cursor-not-allowed">
                Notify Me
              </button>
            </div>
          )}

          {/* Features Section (for active products) */}
          {product.status === 'active' && (
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#8AFD81]/20">
                      <svg
                        className="w-4 h-4 text-[#2d7a28]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
