'use client'

import { CONTRACT_ADDRESSES } from '@/config/contracts'
import { useVaultInfo } from '@/hooks/useEpochVault'

export function VaultOverview() {
  const { totalDeposits, currentEpoch, whitelistEnabled } = useVaultInfo()

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full flex flex-col">
      {/* TVL - Section 1 */}
      <div className="pb-8 border-b border-gray-100">
        <p className="text-base font-semibold text-gray-900 mb-2">Total Value Locked</p>
        <p className="text-4xl font-bold text-gray-900">
          ${parseFloat(totalDeposits).toLocaleString()}
        </p>
      </div>

      {/* Stats - Section 2 */}
      <div className="py-8 border-b border-gray-100 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-500">Epoch</span>
          <span className="text-base font-semibold text-gray-900">{currentEpoch}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-500">APR</span>
          <span className="text-base font-semibold text-[#2d7a28]">12%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-500">Access</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            whitelistEnabled 
              ? 'bg-red-100 text-red-600' 
              : 'bg-[#8AFD81]/20 text-[#2d7a28]'
          }`}>
            {whitelistEnabled ? 'Restricted' : 'Open'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-500">Contract</span>
          <a
            href={`https://etherscan.io/address/${CONTRACT_ADDRESSES.EPOCH_VAULT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-gray-400 hover:text-[#8AFD81]"
          >
            {CONTRACT_ADDRESSES.EPOCH_VAULT.slice(0, 6)}...{CONTRACT_ADDRESSES.EPOCH_VAULT.slice(-4)}
          </a>
        </div>
      </div>

      {/* Yield - Section 3 */}
      <div className="pt-8">
        <p className="text-base font-semibold text-gray-900 mb-5">Projected Yield</p>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">1M</p>
            <p className="text-base font-bold text-gray-900">+1%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">6M</p>
            <p className="text-base font-bold text-gray-900">+6%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">1Y</p>
            <p className="text-base font-bold text-gray-900">+12%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#2d7a28] mb-1">4Y</p>
            <p className="text-base font-bold text-[#2d7a28]">+48%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
