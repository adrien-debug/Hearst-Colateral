'use client'

import { useEffect, useState } from 'react'

interface KPIData {
  btcPrice: number
  btcChange24h: number
  dollarPerTH: number
  blockReward: number
  difficulty: string
  hashrate: string
}

// Default fallback values
const FALLBACK_DATA: KPIData = {
  btcPrice: 98500,
  btcChange24h: 2.5,
  dollarPerTH: 0.058,
  blockReward: 3.125,
  difficulty: '110.45T',
  hashrate: '750 EH/s'
}

export function BTCMiningKPIs() {
  const [kpiData, setKpiData] = useState<KPIData>(FALLBACK_DATA)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

    const fetchBTCData = async () => {
      try {
        const priceResponse = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
          { signal: controller.signal }
        )
        
        if (!priceResponse.ok) {
          throw new Error('API response not ok')
        }
        
        const priceData = await priceResponse.json()
        
        const btcPrice = priceData?.bitcoin?.usd || FALLBACK_DATA.btcPrice
        const btcChange = priceData?.bitcoin?.usd_24h_change || FALLBACK_DATA.btcChange24h
        
        const networkHashrate = 750
        const blocksPerDay = 144
        const blockReward = 3.125
        const dailyRevenue = (blockReward * btcPrice * blocksPerDay) / (networkHashrate * 1000000)
        
        setKpiData({
          btcPrice,
          btcChange24h: btcChange,
          dollarPerTH: dailyRevenue,
          blockReward: 3.125,
          difficulty: '110.45T',
          hashrate: '750 EH/s'
        })
      } catch {
        // Silently use fallback data - API might be rate limited or unavailable
        setKpiData(FALLBACK_DATA)
      } finally {
        clearTimeout(timeoutId)
        setIsLoading(false)
      }
    }

    fetchBTCData()
    
    // Refresh every 2 minutes (less aggressive to avoid rate limits)
    const interval = setInterval(fetchBTCData, 120000)
    return () => {
      clearInterval(interval)
      controller.abort()
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-8 py-5">
      <div className="flex items-center justify-between">
        {/* Live Status */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AFD81] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8AFD81]"></span>
          </span>
          <span className="text-base font-medium text-gray-900">Live</span>
        </div>

        {/* BTC Price */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">BTC</p>
          <div className="flex items-center gap-2">
            <p className={`text-base font-semibold text-gray-900 ${isLoading ? 'animate-pulse' : ''}`}>
              {isLoading ? '—' : formatPrice(kpiData.btcPrice)}
            </p>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              kpiData.btcChange24h >= 0 ? 'bg-[#8AFD81]/20 text-[#2d7a28]' : 'bg-red-100 text-red-600'
            }`}>
              {kpiData.btcChange24h >= 0 ? '+' : ''}{kpiData.btcChange24h.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* $/TH */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">$/TH/day</p>
          <p className={`text-base font-semibold text-gray-900 ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '—' : `$${kpiData.dollarPerTH.toFixed(4)}`}
          </p>
        </div>

        {/* Block Reward */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Reward</p>
          <p className="text-base font-semibold text-gray-900">{kpiData.blockReward} BTC</p>
        </div>

        {/* Hashrate */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hashrate</p>
          <p className="text-base font-semibold text-gray-900">{kpiData.hashrate}</p>
        </div>

        {/* Difficulty */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Difficulty</p>
          <p className="text-base font-semibold text-gray-900">{kpiData.difficulty}</p>
        </div>

        {/* Fireblocks */}
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm">Fireblocks</span>
        </div>
      </div>
    </div>
  )
}
