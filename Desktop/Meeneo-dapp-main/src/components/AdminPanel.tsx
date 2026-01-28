'use client'

import { HARDCODED_ADDRESSES } from '@/config/contracts'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { AdminSidebar } from './admin/AdminSidebar'
import { AdminCockpit } from './admin/AdminCockpit'
import { VaultManagement, CreateVault } from './admin/VaultManagement'

export function AdminPanel() {
  const { address } = useAccount()
  const [adminMode, setAdminMode] = useState(true)
  const [activeView, setActiveView] = useState<'cockpit' | 'vault'>('cockpit')
  const [selectedVaultSlug, setSelectedVaultSlug] = useState<string | null>(null)

  // Check if current user is any of the admin addresses
  const isRewardDepositor = address?.toLowerCase() === HARDCODED_ADDRESSES.REWARD_DEPOSITOR.toLowerCase()
  const isAuthorizedWithdrawal = address?.toLowerCase() === HARDCODED_ADDRESSES.AUTHORIZED_WITHDRAWAL.toLowerCase()
  const isAdminDepositor = address?.toLowerCase() === HARDCODED_ADDRESSES.ADMIN_DEPOSITOR.toLowerCase()
  const isAdmin = isRewardDepositor || isAuthorizedWithdrawal || isAdminDepositor || adminMode

  const handleSelectCockpit = () => {
    setActiveView('cockpit')
    setSelectedVaultSlug(null)
  }

  const handleSelectVault = (slug: string) => {
    setActiveView('vault')
    setSelectedVaultSlug(slug)
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm mb-8">
            Accès réservé aux administrateurs
          </p>
          <button
            onClick={() => setAdminMode(true)}
            className="px-6 py-3 bg-[#8AFD81] text-gray-900 font-semibold text-sm rounded-xl hover:bg-[#7aed71] transition-all"
          >
            Activer Mode Test
          </button>
          {address && (
            <p className="mt-6 text-xs text-gray-400">
              {address.slice(0, 8)}...{address.slice(-6)}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        activeView={activeView}
        selectedVaultSlug={selectedVaultSlug}
        onSelectCockpit={handleSelectCockpit}
        onSelectVault={handleSelectVault}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-gray-900">
              {activeView === 'cockpit' ? 'Terminal' : selectedVaultSlug === 'create' ? 'Nouveau Vault' : 'Vault Manager'}
            </h1>
            <span className="text-[#2d7a28] text-xs font-medium flex items-center gap-1.5 px-2 py-1 bg-[#8AFD81]/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#8AFD81] rounded-full animate-pulse"></span>
              LIVE
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            {/* Create Vault Button */}
            <button
              onClick={() => handleSelectVault('create')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedVaultSlug === 'create'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Vault
            </button>
            
            <div className="w-px h-6 bg-gray-200"></div>
            
            {isRewardDepositor && (
              <span className="px-3 py-1.5 bg-[#8AFD81]/20 text-[#2d7a28] rounded-full font-medium">Reward</span>
            )}
            {isAuthorizedWithdrawal && (
              <span className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-full font-medium">Withdrawal</span>
            )}
            {isAdminDepositor && (
              <span className="px-3 py-1.5 bg-amber-100 text-amber-600 rounded-full font-medium">Deposit</span>
            )}
            {adminMode && (
              <button
                onClick={() => setAdminMode(false)}
                className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Mode Test
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeView === 'cockpit' && <AdminCockpit />}
          
          {activeView === 'vault' && selectedVaultSlug === 'create' && <CreateVault />}
          
          {activeView === 'vault' && selectedVaultSlug && selectedVaultSlug !== 'create' && (
            <VaultManagement vaultSlug={selectedVaultSlug} />
          )}
        </div>
      </main>
    </div>
  )
}
