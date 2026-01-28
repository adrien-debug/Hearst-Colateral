'use client'

import { Header } from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <Image 
              src="/assets/hero/hero-main.png"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-20">
            {/* Centered Hero Content */}
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AFD81] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8AFD81]"></span>
                </span>
                <span className="text-white/90 text-sm font-medium">Live on Ethereum Mainnet</span>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 w-full">
                <span className="block text-white">Institutional</span>
                <span className="block bg-gradient-to-r from-[#8AFD81] via-[#a8ff9f] to-[#8AFD81] bg-clip-text text-transparent">Bitcoin Mining</span>
                <span className="block text-white text-4xl md:text-5xl lg:text-6xl mt-4 font-medium">Yield Platform</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
                Access institutional-grade mining infrastructure. 
                <span className="text-white font-medium"> Real yields, real hardware, full transparency.</span>
              </p>
              
              {/* CTA Button */}
              <div className="mb-20">
                <Link 
                  href="/app"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8AFD81] text-gray-900 font-semibold rounded-full hover:bg-[#7aed71] hover:shadow-[0_0_40px_rgba(138,253,129,0.4)] transition-all text-base"
                >
                  <span>See Vaults</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <p className="text-4xl font-bold text-white mb-1">€7M+</p>
                  <p className="text-sm text-gray-400">Total Value Locked</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-[#8AFD81]/30 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <p className="text-4xl font-bold text-[#8AFD81] mb-1">12%</p>
                  <p className="text-sm text-gray-400">Target APR</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <p className="text-4xl font-bold text-white mb-1">1,682</p>
                  <p className="text-sm text-gray-400">Active Investors</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#8AFD81]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8AFD81]/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-24">
              <h2 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight mb-6">
                How It <span className="text-[#8AFD81]">Works</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Three steps to institutional-grade mining yield
              </p>
            </div>

            {/* 3 Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-b from-[#8AFD81] to-[#8AFD81]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-shadow duration-500">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src="/assets/steps/1.png"
                      alt="Vault"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 w-14 h-14 bg-[#8AFD81] rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-gray-900">01</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Vault</h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                      Deposit funds into tiered vaults. 4-year lock-up with 12% APR.
                    </p>
                    <div className="space-y-3">
                      {['Non-custodial contracts', 'Tiered structure', 'On-chain transparent'].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#8AFD81] rounded-full" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Elevated */}
              <div className="group relative md:-mt-8">
                <div className="absolute -inset-1 bg-gradient-to-b from-[#8AFD81] via-[#8AFD81]/50 to-transparent rounded-3xl opacity-50 group-hover:opacity-100 blur-xl transition-all duration-500" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8AFD81]/30 h-full hover:border-[#8AFD81] transition-all duration-500">
                  {/* Featured Badge */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8AFD81]" />
                  
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src="/assets/steps/2.png"
                      alt="Deployment"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 w-14 h-14 bg-[#8AFD81] rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-gray-900">02</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Deployment</h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                      Miners hosted in energy-efficient data centers worldwide.
                    </p>
                    <div className="space-y-3">
                      {['Energy-efficient ops', 'Pro facilities', 'Full maintenance'].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#8AFD81] rounded-full" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-b from-[#8AFD81] to-[#8AFD81]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-shadow duration-500">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src="/assets/steps/3.png"
                      alt="Daily Rewards"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 w-14 h-14 bg-[#8AFD81] rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-gray-900">03</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Rewards</h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                      Daily distribution in native tokens or stablecoins.
                    </p>
                    <div className="space-y-3">
                      {['Daily distribution', 'Real-time tracking', 'Flexible claims'].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#8AFD81] rounded-full" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-20">
              <Link 
                href="/dashboard"
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

        {/* Why Choose Hearst */}
        <section id="security" className="py-24 lg:py-32 relative overflow-hidden bg-gray-50">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#8AFD81]/10 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8AFD81]/5 rounded-full blur-[150px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8AFD81]/10 border border-[#8AFD81]/20 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AFD81] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8AFD81]"></span>
                </span>
                <span className="text-gray-700 text-sm font-medium">Institutional Infrastructure</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                <span className="text-gray-900">Why Choose</span>
                <br />
                <span className="bg-gradient-to-r from-[#8AFD81] via-[#6dd865] to-[#8AFD81] bg-clip-text text-transparent">Hearst</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Enterprise-grade Bitcoin mining infrastructure with complete transparency
              </p>
            </div>

            {/* Bento Grid - 2x2 Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Card 1 - Proof of Work */}
              <div className="group relative rounded-3xl overflow-hidden h-[400px] md:h-[450px] shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <Image 
                  src="/assets/why/pow.png"
                  alt="Proof of Work Mining"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <div className="absolute inset-0 bg-[#8AFD81]/0 group-hover:bg-[#8AFD81]/10 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#8AFD81]/20 backdrop-blur-sm border border-[#8AFD81]/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#8AFD81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <span className="text-[#8AFD81] text-sm font-medium uppercase tracking-wider">Mining Hardware</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Proof-of-Work</h3>
                  <p className="text-gray-200 text-lg max-w-md">Real PoW yield backed by physical ASIC mining hardware generating actual Bitcoin</p>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card 2 - Transparent */}
              <div className="group relative rounded-3xl overflow-hidden h-[400px] md:h-[450px] shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <Image 
                  src="/assets/why/transparent.png"
                  alt="Blockchain Transparency"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">On-Chain</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Transparent</h3>
                  <p className="text-gray-200 text-lg max-w-md">Real-time on-chain monitoring, reporting and full visibility on operations</p>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card 3 - Green Energy */}
              <div className="group relative rounded-3xl overflow-hidden h-[400px] md:h-[450px] shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <Image 
                  src="/assets/why/green-energy.png"
                  alt="Green Energy Data Center"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">Sustainable</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Green Energy</h3>
                  <p className="text-gray-200 text-lg max-w-md">100% renewable energy sources powering our data centers worldwide</p>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card 4 - Real Assets */}
              <div className="group relative rounded-3xl overflow-hidden h-[400px] md:h-[450px] shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <Image 
                  src="/assets/why/real-assets.png"
                  alt="Secure Vault"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <div className="absolute inset-0 bg-[#8AFD81]/0 group-hover:bg-[#8AFD81]/10 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#8AFD81]/20 backdrop-blur-sm border border-[#8AFD81]/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#8AFD81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-[#8AFD81] text-sm font-medium uppercase tracking-wider">RWA Backed</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Real Assets</h3>
                  <p className="text-gray-200 text-lg max-w-md">Tokens backed by real-world mining infrastructure with tangible value</p>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-[#8AFD81]/30 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-[#8AFD81] mb-2">99.9%</p>
                <p className="text-gray-500 text-sm">Uptime</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-[#8AFD81]/30 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">24/7</p>
                <p className="text-gray-500 text-sm">Monitoring</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-[#8AFD81]/30 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">100%</p>
                <p className="text-gray-500 text-sm">Green Energy</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-[#8AFD81]/30 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-[#8AFD81] mb-2">€7M+</p>
                <p className="text-gray-500 text-sm">TVL</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          {/* CTA Background Image */}
          <div className="absolute inset-0">
            <Image 
              src="/assets/cta/5.png"
              alt="CTA Background"
              fill
              className="object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gray-900/60" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
              Ready to <span className="text-[#8AFD81]">Start?</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Join 1,682 participants earning real Proof-of-Work yield. Secure, transparent, and professionally managed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8AFD81] text-gray-900 font-semibold rounded-full hover:bg-[#7aed71] transition-all text-base"
              >
                <span>Launch Dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a 
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all text-base"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center">
              <Image 
                src="/Logo1.png" 
                alt="Hearst" 
                width={140} 
                height={48} 
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/app" className="text-gray-500 hover:text-gray-900 transition-colors">Vaults</Link>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Docs</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">GitHub</a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-400 hover:text-[#8AFD81] transition-colors p-2.5 hover:bg-gray-50 rounded-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#8AFD81] transition-colors p-2.5 hover:bg-gray-50 rounded-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#8AFD81] transition-colors p-2.5 hover:bg-gray-50 rounded-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
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
