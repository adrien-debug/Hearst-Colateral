'use client'

import { useClaimRewards, useDeposit, useRedepositRewards, useUSDCAllowance, useUSDCApproval, useUserInfo, useWithdraw } from '@/hooks/useEpochVault'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'

export function UserDashboard() {
  const { isConnected } = useAccount()
  const { open } = useAppKit()
  const { userInfo, pendingRewards, canWithdraw, withdrawalLockInfo } = useUserInfo()
  const { allowance } = useUSDCAllowance()
  
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'rewards'>('deposit')

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
  const displayCanWithdraw = isConnected ? canWithdraw : false

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full">
      {/* Connect Banner */}
      {!isConnected && (
        <div className="bg-[#8AFD81]/10 border-b border-gray-200 px-8 py-5 flex items-center justify-between">
          <span className="text-base text-gray-600">Connect wallet to start</span>
          <button
            onClick={() => open()}
            className="px-6 py-2.5 bg-[#8AFD81] text-gray-900 text-base font-semibold rounded-full hover:bg-[#7aed71]"
          >
            Connect
          </button>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="px-8 py-6 border-r border-gray-200">
          <p className="text-base font-semibold text-gray-900 mb-2">Deposits</p>
          <p className={`text-2xl font-bold ${isConnected ? 'text-gray-900' : 'text-gray-300'}`}>
            ${displayDeposits.toLocaleString()}
          </p>
        </div>
        <div className="px-8 py-6 border-r border-gray-200">
          <p className="text-base font-semibold text-gray-900 mb-2">Rewards</p>
          <p className={`text-2xl font-bold ${isConnected ? 'text-[#2d7a28]' : 'text-gray-300'}`}>
            ${displayRewards.toLocaleString()}
          </p>
        </div>
        <div className="px-8 py-6">
          <p className="text-base font-semibold text-gray-900 mb-2">Status</p>
          <p className={`text-2xl font-bold ${!isConnected ? 'text-gray-300' : displayCanWithdraw ? 'text-[#2d7a28]' : 'text-amber-500'}`}>
            {!isConnected ? '—' : displayCanWithdraw ? 'Open' : 'Locked'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 border-b border-gray-200">
        {(['deposit', 'withdraw', 'rewards'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-5 text-base font-medium transition-all ${
              activeTab === tab 
                ? 'text-gray-900 border-b-2 border-[#8AFD81] bg-gray-50' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'deposit' && (
          <div className="space-y-5">
            <div>
              <label className="block text-base text-gray-600 mb-3">Amount (USDC)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8AFD81]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => isConnected ? approve(depositAmount) : open()}
                disabled={isConnected && (!depositAmount || isApproving)}
                className="py-4 bg-gray-100 text-gray-700 text-base font-medium rounded-full hover:bg-gray-200 disabled:opacity-50"
              >
                {isApproving ? 'Approving...' : 'Approve'}
              </button>
              <button
                onClick={() => isConnected ? deposit(depositAmount) : open()}
                disabled={isConnected && (!depositAmount || isDepositing)}
                className="py-4 bg-[#8AFD81] text-gray-900 text-base font-semibold rounded-full hover:bg-[#7aed71] disabled:opacity-50"
              >
                {isDepositing ? 'Depositing...' : 'Deposit'}
              </button>
            </div>
            {(isDepositConfirmed || isApproveConfirmed) && (
              <p className="text-base text-[#2d7a28] text-center">Transaction confirmed</p>
            )}
            <p className="text-sm text-gray-400 text-center">Allowance: {displayAllowance.toLocaleString()} USDC</p>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="space-y-5">
            {isConnected && !canWithdraw && (
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-center">
                <p className="text-base text-amber-700">
                  Locked · {withdrawalLockInfo ? formatTimeRemaining(withdrawalLockInfo.timeRemaining) : '4 years'}
                </p>
              </div>
            )}
            <div>
              <label className="block text-base text-gray-600 mb-3">Amount (USDC)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                disabled={!canWithdraw}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8AFD81] disabled:opacity-50"
              />
            </div>
            <button
              onClick={() => isConnected ? withdraw(withdrawAmount || '0') : open()}
              disabled={isConnected && (!canWithdraw || isWithdrawing)}
              className="w-full py-4 bg-[#8AFD81] text-gray-900 text-base font-semibold rounded-full hover:bg-[#7aed71] disabled:opacity-50"
            >
              {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
            </button>
            {isWithdrawConfirmed && (
              <p className="text-base text-[#2d7a28] text-center">Withdrawal successful</p>
            )}
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-5">
            <div className="text-center py-6">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">Available</p>
              <p className={`text-4xl font-bold ${isConnected ? 'text-gray-900' : 'text-gray-300'}`}>
                ${displayRewards.toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => isConnected ? claimRewards() : open()}
                disabled={isConnected && (isClaiming || displayRewards <= 0)}
                className="py-4 bg-[#8AFD81] text-gray-900 text-base font-semibold rounded-full hover:bg-[#7aed71] disabled:opacity-50"
              >
                {isClaiming ? 'Claiming...' : 'Claim'}
              </button>
              <button
                onClick={() => isConnected ? redepositRewards() : open()}
                disabled={isConnected && (isRedepositing || displayRewards <= 0)}
                className="py-4 bg-gray-100 text-gray-700 text-base font-semibold rounded-full hover:bg-gray-200 disabled:opacity-50"
              >
                {isRedepositing ? 'Compounding...' : 'Compound'}
              </button>
            </div>
            {(isClaimConfirmed || isRedepositConfirmed) && (
              <p className="text-base text-[#2d7a28] text-center">
                {isClaimConfirmed ? 'Claimed' : 'Compounded'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
