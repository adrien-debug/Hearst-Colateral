'use client'

import { Header } from '@/components/Header'
import { HARDCODED_ADDRESSES } from '@/config/contracts'
import { PRODUCTS } from '@/config/products'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import Image from 'next/image'

export default function AdminPage() {
  const { address } = useAccount()
  const [adminMode, setAdminMode] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'vaults' | 'users' | 'rewards'>('overview')
  const [selectedVault, setSelectedVault] = useState<string | null>(null)
  const [rewardAmount, setRewardAmount] = useState('')
  const [selectedTargetVault, setSelectedTargetVault] = useState('')

  const isRewardDepositor = address?.toLowerCase() === HARDCODED_ADDRESSES.REWARD_DEPOSITOR.toLowerCase()
  const isAuthorizedWithdrawal = address?.toLowerCase() === HARDCODED_ADDRESSES.AUTHORIZED_WITHDRAWAL.toLowerCase()
  const isAdminDepositor = address?.toLowerCase() === HARDCODED_ADDRESSES.ADMIN_DEPOSITOR.toLowerCase()
  const isAdmin = isRewardDepositor || isAuthorizedWithdrawal || isAdminDepositor || adminMode

  const transactions = [
    { type: 'deposit', amount: 50000, user: '0x1234...5678', time: '2 min ago', vault: 'BTC Mining Alpha' },
    { type: 'withdraw', amount: 25000, user: '0xabcd...efgh', time: '5 min ago', vault: 'Green Energy Fund' },
    { type: 'reward', amount: 1500, user: '0x9876...5432', time: '12 min ago', vault: 'BTC Mining Alpha' },
    { type: 'deposit', amount: 100000, user: '0xfedc...ba98', time: '18 min ago', vault: 'BTC Mining Alpha' },
    { type: 'compound', amount: 850, user: '0x5555...6666', time: '25 min ago', vault: 'Green Energy Fund' },
  ]

  const systemMetrics = [
    { label: 'Uptime', value: '99.99%', status: 'healthy' },
    { label: 'Avg Response', value: '45ms', status: 'healthy' },
    { label: 'Last Block', value: '#19,847,221', status: 'healthy' },
    { label: 'Gas Price', value: '12 gwei', status: 'normal' },
  ]

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAFBFC]">
        <Header />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center bg-white rounded-3xl border border-gray-200 p-16 shadow-xl max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Access Required</h2>
            <p className="text-gray-500 mb-10">You need administrator privileges to access the management console.</p>
            <button
              onClick={() => setAdminMode(true)}
              className="w-full py-4 bg-[#8AFD81] text-gray-900 font-bold rounded-xl hover:bg-[#7aed71] shadow-lg shadow-[#8AFD81]/25 transition-all"
            >
              Enable Test Mode
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="w-full px-6 lg:px-16 xl:px-24">
          
          {/* Hero Header */}
          <div className="relative h-48 mb-10 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/assets/cta/tech-header.png"
                alt="Admin Hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-white/70"></div>
            </div>
            <div className="relative p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">Admin</span>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#8AFD81] rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      <span className="text-gray-900 text-sm font-medium">All Systems Online</span>
                    </div>
                    {adminMode && (
                      <button 
                        onClick={() => setAdminMode(false)}
                        className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-300"
                      >
                        Exit Test
                      </button>
                    )}
                  </div>
                  <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Management Console</h1>
                </div>
                <button className="px-6 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Vault
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            
            {/* Main Stats */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-gray-200 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Protocol Overview</h2>
                <span className="text-sm text-gray-400">Last updated: Just now</span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-[#8AFD81]/15 to-[#8AFD81]/5 rounded-2xl p-6 border border-[#8AFD81]/20">
                  <div className="w-12 h-12 rounded-xl bg-[#8AFD81]/30 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#2d7a28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#2d7a28] uppercase tracking-wider mb-1">Total TVL</p>
                  <p className="text-3xl font-black text-gray-900">€50.2M</p>
                  <p className="text-sm text-[#8AFD81] font-medium mt-2">+12.4% this month</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">24h Volume</p>
                  <p className="text-3xl font-black text-gray-900">$1.25M</p>
                  <p className="text-sm text-blue-600 font-medium mt-2">+8.2% vs yesterday</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Active Users</p>
                  <p className="text-3xl font-black text-gray-900">1,682</p>
                  <p className="text-sm text-purple-600 font-medium mt-2">+24 today</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pending Rewards</p>
                  <p className="text-3xl font-black text-gray-900">$125k</p>
                  <p className="text-sm text-amber-600 font-medium mt-2">Next epoch in 6h</p>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl border border-gray-200 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-bold text-gray-900 mb-6">System Health</h2>
              
              <div className="space-y-4">
                {[
                  { name: 'Smart Contracts', status: 'operational', icon: '⚡' },
                  { name: 'Oracle Feed', status: 'operational', icon: '📡' },
                  { name: 'Fireblocks API', status: 'operational', icon: '🔐' },
                  { name: 'Database', status: 'operational', icon: '💾' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#8AFD81]/20 rounded-full">
                      <span className="w-2 h-2 bg-[#8AFD81] rounded-full"></span>
                      <span className="text-xs text-[#2d7a28] font-semibold">Online</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  {systemMetrics.slice(0, 2).map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{metric.label}</p>
                      <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-white rounded-2xl p-2 border border-gray-200 inline-flex">
            {(['overview', 'vaults', 'users', 'rewards'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all ${
                  activeTab === tab 
                    ? 'bg-[#8AFD81] text-gray-900 shadow-lg shadow-[#8AFD81]/25' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-12 gap-6">
              
              {/* Live Transactions */}
              <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between p-8 border-b border-gray-100">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Live Transactions</h3>
                    <p className="text-sm text-gray-500">Real-time protocol activity</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#8AFD81]/20 rounded-full">
                    <span className="w-2 h-2 bg-[#8AFD81] rounded-full animate-pulse"></span>
                    <span className="text-sm text-[#2d7a28] font-semibold">Streaming</span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          tx.type === 'deposit' ? 'bg-[#8AFD81]/20' :
                          tx.type === 'withdraw' ? 'bg-red-100' : 
                          tx.type === 'compound' ? 'bg-purple-100' : 'bg-amber-100'
                        }`}>
                          <svg className={`w-7 h-7 ${
                            tx.type === 'deposit' ? 'text-[#2d7a28]' :
                            tx.type === 'withdraw' ? 'text-red-600' : 
                            tx.type === 'compound' ? 'text-purple-600' : 'text-amber-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {tx.type === 'deposit' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />}
                            {tx.type === 'withdraw' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />}
                            {tx.type === 'reward' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                            {tx.type === 'compound' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-base font-bold text-gray-900 capitalize">{tx.type}</p>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{tx.vault}</span>
                          </div>
                          <p className="text-sm text-gray-400 font-mono">{tx.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${tx.type === 'withdraw' ? 'text-red-600' : 'text-gray-900'}`}>
                          {tx.type === 'withdraw' ? '-' : '+'}${tx.amount.toLocaleString('en-US')}
                        </p>
                        <p className="text-sm text-gray-400">{tx.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="col-span-12 xl:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-[#8AFD81] text-gray-900 font-bold rounded-xl hover:bg-[#7aed71] shadow-lg shadow-[#8AFD81]/25 transition-all flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Distribute Rewards
                    </button>
                    <button className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Advance Epoch
                    </button>
                    <button className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Manage Whitelist
                    </button>
                  </div>
                </div>

                {/* Recent Distributions */}
                <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Distributions</h3>
                    <button className="text-sm text-[#2d7a28] font-medium hover:underline">All</button>
                  </div>
                  <div className="space-y-3">
                    {[12, 11, 10, 9].map((epoch, idx) => (
                      <div key={epoch} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-gray-900">Epoch {epoch}</p>
                          <p className="text-xs text-gray-400">{idx + 1}d ago</p>
                        </div>
                        <p className="font-bold text-[#2d7a28]">${((idx + 1) * 25000).toLocaleString('en-US')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vaults' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.slug}
                  className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 ${
                    selectedVault === product.slug ? 'border-[#8AFD81] shadow-xl shadow-[#8AFD81]/10' : 'border-gray-200 hover:border-[#8AFD81]/50 hover:shadow-lg'
                  }`}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8AFD81] to-[#5fe854] flex items-center justify-center text-2xl font-bold text-gray-900 shadow-lg shadow-[#8AFD81]/30">
                          {product.icon || '₿'}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.token} Mining</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                        product.status === 'active' ? 'bg-[#8AFD81]/20 text-[#2d7a28]' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-400 mb-1">APR</p>
                        <p className="text-2xl font-black text-[#2d7a28]">{product.apr}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-400 mb-1">TVL</p>
                        <p className="text-2xl font-black text-gray-900">${(product.minDeposit * 50 / 1000).toFixed(0)}k</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-400 mb-1">Users</p>
                        <p className="text-2xl font-black text-gray-900">{Math.round(product.minDeposit / 1000 + 50)}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => setSelectedVault(selectedVault === product.slug ? null : product.slug)}
                        className="flex-1 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] transition-colors text-sm"
                      >
                        Manage
                      </button>
                      <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm">
                        Analytics
                      </button>
                    </div>
                  </div>

                  {selectedVault === product.slug && (
                    <div className="px-8 pb-8 pt-2 border-t border-gray-100 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-400">Lock Period</p>
                          <p className="text-lg font-bold text-gray-900">{product.lockPeriod < 1 ? `${Math.round(product.lockPeriod * 12)}mo` : `${product.lockPeriod}yr`}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-400">Min Deposit</p>
                          <p className="text-lg font-bold text-gray-900">${product.minDeposit.toLocaleString('en-US')}</p>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-red-100 text-red-700 font-semibold rounded-xl hover:bg-red-200 transition-colors text-sm">
                        Pause Vault
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between p-8 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-500">Manage whitelisted addresses and user permissions</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search address..."
                      className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8AFD81] w-72"
                    />
                  </div>
                  <button className="px-5 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] transition-all text-sm">
                    Add User
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="px-8 py-5 font-semibold">Address</th>
                      <th className="px-8 py-5 font-semibold">Total Deposits</th>
                      <th className="px-8 py-5 font-semibold">Rewards Earned</th>
                      <th className="px-8 py-5 font-semibold">Status</th>
                      <th className="px-8 py-5 font-semibold">Joined</th>
                      <th className="px-8 py-5 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[...Array(6)].map((_, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <p className="text-sm text-gray-900 font-mono">0x{(idx + 1).toString(16).padStart(4, '0')}...{(idx + 10).toString(16).padStart(4, '0')}</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-bold text-gray-900">${((idx + 1) * 18500).toLocaleString('en-US')}</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-bold text-[#2d7a28]">+${((idx + 1) * 850).toLocaleString('en-US')}</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8AFD81]/20 text-[#2d7a28] rounded-full text-xs font-semibold">
                            <span className="w-1.5 h-1.5 bg-[#8AFD81] rounded-full"></span>
                            Active
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm text-gray-500">Jan {15 + idx}, 2025</p>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200">View</button>
                            <button className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-medium rounded-lg hover:bg-red-200">Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="grid grid-cols-12 gap-6">
              
              {/* Distribution Form */}
              <div className="col-span-12 xl:col-span-5 bg-white rounded-3xl border border-gray-200 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Distribute Rewards</h3>
                <p className="text-sm text-gray-500 mb-8">Send rewards to vault depositors</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Amount (USDC)</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">$</span>
                      <input
                        type="number"
                        value={rewardAmount}
                        onChange={(e) => setRewardAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8AFD81] focus:border-transparent outline-none text-2xl font-bold"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Target Vault</label>
                    <select 
                      value={selectedTargetVault}
                      onChange={(e) => setSelectedTargetVault(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8AFD81] focus:border-transparent outline-none text-base font-medium"
                    >
                      <option value="">Select vault...</option>
                      {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
                    </select>
                  </div>

                  <div className="p-5 bg-[#8AFD81]/10 rounded-xl border border-[#8AFD81]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Recipients</span>
                      <span className="text-sm font-bold text-gray-900">~1,200 users</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Est. per user</span>
                      <span className="text-sm font-bold text-[#2d7a28]">~${rewardAmount ? (parseFloat(rewardAmount) / 1200).toFixed(2) : '0.00'}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-[#8AFD81] text-gray-900 font-bold rounded-xl hover:bg-[#7aed71] shadow-lg shadow-[#8AFD81]/25 transition-all text-lg">
                    Execute Distribution
                  </button>
                </div>
              </div>

              {/* Distribution History */}
              <div className="col-span-12 xl:col-span-7 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between p-8 border-b border-gray-100">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Distribution History</h3>
                    <p className="text-sm text-gray-500">Past reward distributions</p>
                  </div>
                  <button className="text-sm text-[#2d7a28] font-medium hover:underline">Export CSV</button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-[#8AFD81]/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#2d7a28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Epoch {12 - idx}</p>
                          <p className="text-sm text-gray-500">BTC Mining Alpha • {idx + 1} day{idx > 0 ? 's' : ''} ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#2d7a28]">${((idx + 1) * 25000).toLocaleString('en-US')}</p>
                        <p className="text-sm text-gray-400">{Math.round(1200 - idx * 50)} recipients</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
