'use client'

import { Header } from '@/components/Header'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { useState } from 'react'
import { useUserInfo, useVaultInfo, useDeposit, useWithdraw, useClaimRewards, useRedepositRewards, useUSDCAllowance, useUSDCApproval } from '@/hooks/useEpochVault'
import Image from 'next/image'

export default function DashboardPage() {
  const { isConnected, address } = useAccount()
  const { open } = useAppKit()
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'rewards'>('deposit')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const { totalDeposits, currentEpoch } = useVaultInfo()
  const { userInfo, pendingRewards, canWithdraw, withdrawalLockInfo } = useUserInfo()
  const { allowance } = useUSDCAllowance()
  const { deposit, isPending: isDepositing, isConfirmed: isDepositConfirmed } = useDeposit()
  const { withdraw, isPending: isWithdrawing, isConfirmed: isWithdrawConfirmed } = useWithdraw()
  const { claimRewards, isPending: isClaiming, isConfirmed: isClaimConfirmed } = useClaimRewards()
  const { redepositRewards, isPending: isRedepositing, isConfirmed: isRedepositConfirmed } = useRedepositRewards()
  const { approve, isPending: isApproving, isConfirmed: isApproveConfirmed } = useUSDCApproval()

  const formatTimeRemaining = (seconds: string) => {
    const sec = parseInt(seconds)
    if (sec === 0) return 'Unlocked'
    const days = Math.floor(sec / (24 * 60 * 60))
    const hours = Math.floor((sec % (24 * 60 * 60)) / (60 * 60))
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  const displayDeposits = isConnected && userInfo ? parseFloat(userInfo.depositAmount) : 0
  const displayRewards = isConnected ? parseFloat(pendingRewards) : 0
  const displayAllowance = isConnected ? parseFloat(allowance) : 0
  const totalValue = displayDeposits + displayRewards

  const userVaults = [
    { name: 'BTC Mining Alpha', token: 'BTC', apr: 12, deposited: 25000, rewards: 245, progress: 68, status: 'active' },
    { name: 'Green Energy Fund', token: 'ETH', apr: 9, deposited: 15000, rewards: 112, progress: 42, status: 'active' },
  ]

  const recentActivity = [
    { type: 'reward', amount: 125, date: 'Today, 14:32', vault: 'BTC Mining Alpha' },
    { type: 'deposit', amount: 10000, date: 'Jan 28, 09:15', vault: 'BTC Mining Alpha' },
    { type: 'reward', amount: 98, date: 'Jan 25, 14:00', vault: 'Green Energy Fund' },
    { type: 'compound', amount: 200, date: 'Jan 20, 10:45', vault: 'BTC Mining Alpha' },
  ]

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
                alt="Dashboard Hero"
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
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#8AFD81] rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      <span className="text-gray-900 text-sm font-medium">Live</span>
                    </div>
                    <span className="text-gray-600 text-sm font-medium">Epoch {currentEpoch}</span>
                  </div>
                  <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-2">My Portfolio</h1>
                  {isConnected && (
                    <p className="text-gray-600 font-mono text-sm">{address}</p>
                  )}
                </div>
                {!isConnected && (
                  <button
                    onClick={() => open()}
                    className="px-6 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] transition-all"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            
            {/* Main Value Card */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-8 relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8AFD81]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-500 font-medium">Total Portfolio Value</p>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8AFD81]/15 rounded-full">
                    <svg className="w-4 h-4 text-[#2d7a28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-sm font-bold text-[#8AFD81]">+12.4%</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-gray-900 tracking-tight">${totalValue.toLocaleString('en-US').split('.')[0]}</span>
                    <span className="text-2xl font-bold text-gray-400">.{(totalValue % 1).toFixed(2).substring(2) || '00'}</span>
                  </div>
                </div>

                {/* Value Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                      <span className="text-xs text-gray-500 font-medium">Principal Invested</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">${displayDeposits.toLocaleString('en-US')}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#8AFD81]/15 to-[#8AFD81]/5 rounded-2xl p-5 border border-[#8AFD81]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#8AFD81]"></div>
                      <span className="text-xs text-[#2d7a28] font-medium">Total Rewards</span>
                    </div>
                    <p className="text-2xl font-bold text-[#2d7a28]">${displayRewards.toLocaleString('en-US')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* APR Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-[#8AFD81]/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2d7a28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current APR</p>
                  <p className="text-3xl font-black text-gray-900">12<span className="text-xl text-[#8AFD81]">%</span></p>
                </div>
              </div>

              {/* Lock Status */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Lock Status</p>
                  <p className="text-xl font-bold text-gray-900">
                    {canWithdraw ? 'Unlocked' : withdrawalLockInfo ? formatTimeRemaining(withdrawalLockInfo.timeRemaining) : '4 years'}
                  </p>
                </div>
              </div>

              {/* Active Vaults */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Active Vaults</p>
                  <p className="text-3xl font-black text-gray-900">{userVaults.length}</p>
                </div>
              </div>

              {/* Protocol TVL */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Protocol TVL</p>
                  <p className="text-xl font-bold text-gray-900">${parseFloat(totalDeposits).toLocaleString('en-US')}</p>
                </div>
              </div>

              {/* Next Reward */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-[#8AFD81]/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2d7a28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Next Reward</p>
                  <p className="text-xl font-bold text-gray-900">~$42</p>
                </div>
              </div>

              {/* Avg Monthly */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Avg Monthly</p>
                  <p className="text-xl font-bold text-[#2d7a28]">+$312</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Positions */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Active Positions</h2>
                <p className="text-gray-500">Your current vault investments</p>
              </div>
              <button className="px-5 py-2.5 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] transition-all text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Investment
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {userVaults.map((vault, i) => (
                <div key={i} className="p-8 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    
                    {/* Vault Info */}
                    <div className="flex items-center gap-5 flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8AFD81] to-[#5fe854] flex items-center justify-center text-2xl font-bold text-gray-900 shadow-lg shadow-[#8AFD81]/30">
                        {vault.token === 'BTC' ? '₿' : 'Ξ'}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{vault.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">{vault.token} Mining</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-sm font-medium text-[#2d7a28]">{vault.apr}% APR</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 flex-1">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Deposited</p>
                        <p className="text-xl font-bold text-gray-900">${vault.deposited.toLocaleString('en-US')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Earned</p>
                        <p className="text-xl font-bold text-[#2d7a28]">+${vault.rewards}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</p>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#8AFD81]/15 text-[#2d7a28] text-sm font-medium rounded-full">
                          <span className="w-1.5 h-1.5 bg-[#8AFD81] rounded-full"></span>
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Progress & Actions */}
                    <div className="flex items-center gap-6">
                      <div className="w-48">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-gray-400">Yield Progress</span>
                          <span className="font-semibold text-gray-900">{vault.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#8AFD81] to-[#5fe854] rounded-full transition-all"
                            style={{ width: `${vault.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#8AFD81] text-gray-900 text-sm font-semibold rounded-lg hover:bg-[#7aed71] transition-colors">
                          Add
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Performance Chart */}
            <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between p-8 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Performance</h2>
                  <p className="text-sm text-gray-500">Your earnings over time</p>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                  {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
                    <button 
                      key={period}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        period === '1Y' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-8">
                <div className="relative h-64">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 180">
                    <defs>
                      <linearGradient id="perfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8AFD81" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8AFD81" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4">
                      <line x1="0" y1="45" x2="500" y2="45" />
                      <line x1="0" y1="90" x2="500" y2="90" />
                      <line x1="0" y1="135" x2="500" y2="135" />
                    </g>
                    <polygon
                      fill="url(#perfGradient)"
                      points="0,180 0,140 50,135 100,130 150,120 200,110 250,95 300,85 350,70 400,55 450,40 500,30 500,180"
                    />
                    <polyline
                      fill="none"
                      stroke="#8AFD81"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,140 50,135 100,130 150,120 200,110 250,95 300,85 350,70 400,55 450,40 500,30"
                    />
                    <circle cx="500" cy="30" r="6" fill="#8AFD81" />
                    <circle cx="500" cy="30" r="12" fill="#8AFD81" opacity="0.2" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-4 border-t border-gray-100">
                {[
                  { label: 'Total Earned', value: '$' + displayRewards.toLocaleString('en-US'), color: 'text-[#2d7a28]' },
                  { label: 'Best Month', value: '$412', color: 'text-gray-900' },
                  { label: 'Consistency', value: '94%', color: 'text-gray-900' },
                  { label: 'Sharpe Ratio', value: '1.82', color: 'text-gray-900' },
                ].map((stat, i) => (
                  <div key={stat.label} className={`p-6 text-center ${i < 3 ? 'border-r border-gray-100' : ''}`}>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions + Activity */}
            <div className="col-span-12 xl:col-span-4 space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h3>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {(['deposit', 'withdraw', 'rewards'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 text-sm font-semibold rounded-xl transition-all ${
                        activeTab === tab 
                          ? 'bg-[#8AFD81] text-gray-900' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {activeTab === 'deposit' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8AFD81] focus:border-transparent outline-none text-lg font-semibold"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => isConnected ? approve(depositAmount) : open()}
                        disabled={isConnected && (!depositAmount || isApproving)}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-50 text-sm"
                      >
                        {isApproving ? '...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => isConnected ? deposit(depositAmount) : open()}
                        disabled={isConnected && (!depositAmount || isDepositing)}
                        className="flex-1 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] disabled:opacity-50 text-sm"
                      >
                        {isDepositing ? '...' : 'Deposit'}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'withdraw' && (
                  <div className="space-y-4">
                    {!canWithdraw && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                        <p className="text-sm text-amber-700 font-medium">🔒 Funds locked</p>
                      </div>
                    )}
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0.00"
                        disabled={!canWithdraw}
                        className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8AFD81] outline-none text-lg font-semibold disabled:opacity-50"
                      />
                    </div>
                    <button
                      onClick={() => isConnected ? withdraw(withdrawAmount || '0') : open()}
                      disabled={isConnected && (!canWithdraw || isWithdrawing)}
                      className="w-full py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] disabled:opacity-50 text-sm"
                    >
                      {isWithdrawing ? '...' : 'Withdraw'}
                    </button>
                  </div>
                )}

                {activeTab === 'rewards' && (
                  <div className="space-y-4">
                    <div className="text-center py-5 bg-gradient-to-br from-[#8AFD81]/15 to-[#8AFD81]/5 rounded-xl border border-[#8AFD81]/20">
                      <p className="text-xs text-gray-500 mb-1">Available</p>
                      <p className="text-3xl font-bold text-gray-900">${displayRewards.toLocaleString('en-US')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => isConnected ? claimRewards() : open()}
                        disabled={isConnected && (isClaiming || displayRewards <= 0)}
                        className="flex-1 py-3 bg-[#8AFD81] text-gray-900 font-semibold rounded-xl hover:bg-[#7aed71] disabled:opacity-50 text-sm"
                      >
                        Claim
                      </button>
                      <button
                        onClick={() => isConnected ? redepositRewards() : open()}
                        disabled={isConnected && (isRedepositing || displayRewards <= 0)}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-50 text-sm"
                      >
                        Compound
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Activity</h3>
                  <button className="text-sm text-[#2d7a28] font-medium hover:underline">All</button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {recentActivity.slice(0, 4).map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          activity.type === 'deposit' ? 'bg-blue-100' :
                          activity.type === 'reward' ? 'bg-[#8AFD81]/20' : 'bg-purple-100'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            activity.type === 'deposit' ? 'text-blue-600' :
                            activity.type === 'reward' ? 'text-[#2d7a28]' : 'text-purple-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {activity.type === 'deposit' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />}
                            {activity.type === 'reward' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />}
                            {activity.type === 'compound' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 capitalize">{activity.type}</p>
                          <p className="text-xs text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-bold ${activity.type === 'deposit' ? 'text-gray-900' : 'text-[#2d7a28]'}`}>
                        {activity.type !== 'deposit' ? '+' : ''}${activity.amount.toLocaleString('en-US')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
