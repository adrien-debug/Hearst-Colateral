'use client'

import { Header } from '@/components/Header'
import { PRODUCTS } from '@/config/products'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductsPage() {
  const activeCount = PRODUCTS.filter((p) => p.status === 'active').length
  const bestAPR = Math.max(...PRODUCTS.map((p) => p.apr))

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/assets/why/green-energy.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AFD81] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8AFD81]"></span>
              </span>
              <span className="text-white/90 text-sm font-medium">{activeCount} Active Vaults</span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 w-full">
              <span className="block text-white">DeFi</span>
              <span className="block bg-gradient-to-r from-[#8AFD81] via-[#a8ff9f] to-[#8AFD81] bg-clip-text text-transparent">Vaults</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
              Institutional-grade yield strategies. 
              <span className="text-white font-medium"> Deposit and earn consistent returns backed by real infrastructure.</span>
            </p>
            
            {/* CTA Button */}
            <div className="mb-20">
              <a 
                href="#vaults"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8AFD81] text-gray-900 font-semibold rounded-full hover:bg-[#7aed71] hover:shadow-[0_0_40px_rgba(138,253,129,0.4)] transition-all text-base"
              >
                <span>Explore Vaults</span>
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <p className="text-4xl font-bold text-[#8AFD81] mb-1">{bestAPR}%</p>
                <p className="text-sm text-gray-400">Best APR</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <p className="text-4xl font-bold text-white mb-1">€7M+</p>
                <p className="text-sm text-gray-400">Total Value Locked</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <p className="text-4xl font-bold text-white mb-1">1,682</p>
                <p className="text-sm text-gray-400">Active Investors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vaults Section */}
      <section id="vaults" className="py-32 bg-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#8AFD81]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8AFD81]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight mb-6">
              Available <span className="text-[#8AFD81]">Vaults</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Select a strategy that matches your investment goals
            </p>
          </div>

          {/* Vaults Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.slug}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-b from-[#8AFD81] to-[#8AFD81]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-shadow duration-500">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={`/assets/steps/${(index % 3) + 1}.png`}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    
                    {/* APR Badge */}
                    <div className="absolute top-4 left-4 bg-[#8AFD81] rounded-xl px-3 py-1.5 shadow-lg">
                      <span className="text-lg font-bold text-gray-900">{product.apr}%</span>
                      <span className="text-sm text-gray-900 ml-1">APR</span>
                    </div>
                    
                    {/* Risk Badge */}
                    <div className={`absolute top-4 right-4 rounded-xl px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${
                      product.riskLevel === 'low' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : product.riskLevel === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {product.riskLevel}
                    </div>
                    
                    {/* Name */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-500 mb-6 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">Lock</p>
                        <p className="text-sm font-bold text-gray-900">
                          {product.lockPeriod < 1 ? `${product.lockPeriod * 12}mo` : `${product.lockPeriod}yr`}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">Min</p>
                        <p className="text-sm font-bold text-gray-900">
                          ${product.minDeposit >= 1000 ? `${(product.minDeposit/1000)}k` : product.minDeposit}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">Token</p>
                        <p className="text-sm font-bold text-gray-900">{product.depositToken}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#8AFD81] rounded-full" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <Link
                      href="/app"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors text-sm"
                    >
                      View Vault
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <Link 
              href="/app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8AFD81] text-gray-900 font-semibold rounded-full hover:bg-[#7aed71] transition-all text-base"
            >
              <span>Launch App</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/cta/5.png"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Ready to <span className="text-[#8AFD81]">Start?</span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Connect your wallet and start earning real yield today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8AFD81] text-gray-900 font-semibold rounded-full hover:bg-[#7aed71] transition-all text-base"
            >
              <span>Launch App</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all text-base"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center">
              <Image 
                src="/Logo1.png" 
                alt="Hearst" 
                width={140} 
                height={48} 
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/app" className="text-gray-500 hover:text-gray-900 transition-colors">Vaults</Link>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-400 hover:text-[#8AFD81] transition-colors p-2.5 hover:bg-gray-50 rounded-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#8AFD81] transition-colors p-2.5 hover:bg-gray-50 rounded-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">© 2026 Hearst. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
