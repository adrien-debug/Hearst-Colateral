'use client'

import { useAppKit } from '@reown/appkit/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { mainnet } from '@reown/appkit/networks'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()
  const pathname = usePathname()

  // Déterminer si on est sur l'app ou le site marketing
  const isAppPage = pathname?.startsWith('/app') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')

  const navigation = isAppPage 
    ? [
        { name: 'Vaults', href: '/app' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Admin', href: '/admin' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Defi', href: '/products' },
      ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/Logo1.png" 
              alt="Hearst" 
              width={200} 
              height={50} 
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isConnected && (
              <div className="hidden sm:flex items-center gap-2">
                {/* Network Badge */}
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                  chain?.id === mainnet.id 
                    ? 'bg-[#8AFD81]/20 text-[#2d7a28]' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${chain?.id === mainnet.id ? 'bg-[#8AFD81]' : 'bg-red-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${chain?.id === mainnet.id ? 'bg-[#8AFD81]' : 'bg-red-500'}`}></span>
                  </span>
                  {chain?.id === mainnet.id ? 'Mainnet' : 'Wrong'}
                </div>
                
                {/* Address */}
                <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-mono text-gray-600">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
              </div>
            )}

            {/* Connect / Disconnect Button */}
            {isAppPage ? (
              <button
                onClick={() => isConnected ? disconnect() : open()}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isConnected 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-[#8AFD81] text-gray-900 hover:bg-[#7aed71]'
                }`}
              >
                {isConnected ? 'Disconnect' : 'Connect Wallet'}
              </button>
            ) : (
              <Link
                href="/app"
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all bg-[#8AFD81] text-gray-900 hover:bg-[#7aed71] flex items-center gap-2"
              >
                Launch App
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAppPage && isConnected && (
                <>
                  <div className="border-t border-gray-100 my-2"></div>
                  <div className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                    chain?.id === mainnet.id 
                      ? 'bg-[#8AFD81]/20 text-[#2d7a28]' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${chain?.id === mainnet.id ? 'bg-[#8AFD81]' : 'bg-red-500'}`}></div>
                    {chain?.id === mainnet.id ? 'Ethereum Mainnet' : chain?.name || 'Wrong Network'}
                  </div>
                  <div className="px-4 py-3 bg-gray-100 rounded-xl text-sm font-mono text-gray-600 break-all">
                    {address}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
