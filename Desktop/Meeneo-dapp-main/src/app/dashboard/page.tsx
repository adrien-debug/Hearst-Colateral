'use client'

import { BTCMiningKPIs } from '@/components/BTCMiningKPIs'
import { Header } from '@/components/Header'
import { UserDashboard } from '@/components/UserDashboard'
import { VaultOverview } from '@/components/VaultOverview'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#8AFD81] rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mining Dashboard</h1>
                <p className="text-base text-gray-500">Track performance and manage deposits</p>
              </div>
            </div>
            <span className="px-5 py-2.5 bg-[#8AFD81]/20 text-[#2d7a28] text-base font-semibold rounded-full">
              12% APR
            </span>
          </div>

          {/* KPIs Bar */}
          <div className="mb-8">
            <BTCMiningKPIs />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left - 4 columns */}
            <div className="col-span-12 lg:col-span-4">
              <VaultOverview />
            </div>
            
            {/* Right - 8 columns */}
            <div className="col-span-12 lg:col-span-8">
              <UserDashboard />
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-gray-900">Mining Performance</p>
                <div className="flex items-center gap-1 px-3 py-1.5 bg-[#8AFD81]/20 rounded">
                  <span className="text-sm font-semibold text-[#2d7a28]">+12.4%</span>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-[#8AFD81]"></span>
                  <span className="text-gray-500">Vault Yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-gray-300"></span>
                  <span className="text-gray-500">BTC/USD</span>
                </div>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="relative h-72 px-8 py-6">
              <div className="absolute inset-0 flex px-8">
                {/* Main Chart */}
                <div className="flex-1 relative">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 180">
                    <defs>
                      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8AFD81" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8AFD81" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid Lines */}
                    <g stroke="#f3f4f6" strokeWidth="1">
                      <line x1="0" y1="36" x2="400" y2="36" />
                      <line x1="0" y1="72" x2="400" y2="72" />
                      <line x1="0" y1="108" x2="400" y2="108" />
                      <line x1="0" y1="144" x2="400" y2="144" />
                    </g>
                    
                    {/* BTC Price Line (gray) */}
                    <polyline
                      fill="none"
                      stroke="#d1d5db"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,130 20,125 40,120 60,110 80,105 100,115 120,110 140,100 160,90 180,85 200,95 220,80 240,75 260,65 280,60 300,55 320,45 340,40 360,35 380,30 400,25"
                    />
                    
                    {/* Yield Area Fill */}
                    <polygon
                      fill="url(#greenGradient)"
                      points="0,180 0,140 20,135 40,132 60,128 80,120 100,115 120,110 140,105 160,98 180,90 200,85 220,78 240,72 260,65 280,58 300,50 320,45 340,38 360,32 380,28 400,22 400,180"
                    />
                    
                    {/* Yield Line (green) */}
                    <polyline
                      fill="none"
                      stroke="#8AFD81"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,140 20,135 40,132 60,128 80,120 100,115 120,110 140,105 160,98 180,90 200,85 220,78 240,72 260,65 280,58 300,50 320,45 340,38 360,32 380,28 400,22"
                    />
                    
                    {/* Current Point */}
                    <circle cx="400" cy="22" r="6" fill="#8AFD81" />
                    <circle cx="400" cy="22" r="2.5" fill="#fff" />
                  </svg>
                </div>
                
                {/* Y Axis */}
                <div className="w-14 flex flex-col justify-between py-2 text-right">
                  <span className="text-xs text-gray-400">+15%</span>
                  <span className="text-xs text-gray-400">+10%</span>
                  <span className="text-xs text-gray-400">+5%</span>
                  <span className="text-xs text-gray-400">0%</span>
                  <span className="text-xs text-gray-400">-5%</span>
                </div>
              </div>
            </div>
            
            {/* X Axis */}
            <div className="flex justify-between px-8 py-4 border-t border-gray-100 text-xs text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
