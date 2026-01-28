'use client'

import { useAccount, useSwitchChain } from 'wagmi'
import { mainnet } from '@reown/appkit/networks'
import { useState, useEffect } from 'react'

export function NetworkValidator() {
  const { chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const [showNetworkPrompt, setShowNetworkPrompt] = useState(false)

  useEffect(() => {
    // Check if user is connected and on the wrong network
    if (chain && chain.id !== mainnet.id) {
      setShowNetworkPrompt(true)
    } else {
      setShowNetworkPrompt(false)
    }
  }, [chain])

  const handleSwitchToMainnet = async () => {
    try {
      await switchChain({ chainId: mainnet.id })
      setShowNetworkPrompt(false)
    } catch (error) {
      console.error('Failed to switch network:', error)
    }
  }

  if (!showNetworkPrompt) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-semibold text-[#1E2023] mb-2 font-title">
          Wrong Network
        </h3>
        
        <p className="text-[#1E2023] mb-6 font-text">
          You&apos;re currently connected to <strong>{chain?.name}</strong>. 
          Please switch to <strong>Ethereum Mainnet</strong> to use this application.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleSwitchToMainnet}
            className="w-full px-6 py-3 bg-[#FF8555] hover:bg-[#e55a2a] text-white font-medium rounded-full transition-colors font-text"
          >
            Switch to Ethereum Mainnet
          </button>
          
          <button
            onClick={() => setShowNetworkPrompt(false)}
            className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-full transition-colors font-text"
          >
            Cancel
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-600 font-text">
          <p>This application requires Ethereum Mainnet for security and functionality.</p>
        </div>
      </div>
    </div>
  )
}
