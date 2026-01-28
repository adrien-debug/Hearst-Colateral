'use client'

import { Product } from '@/types/product'
import { useState } from 'react'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

type FilterStatus = 'all' | 'active' | 'coming_soon'
type SortBy = 'apr' | 'lock' | 'name'

export function ProductGrid({ products }: ProductGridProps) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [sortBy, setSortBy] = useState<SortBy>('apr')

  // Filtrage
  const filteredProducts = products.filter((p) => {
    if (filterStatus === 'all') return true
    return p.status === filterStatus
  })

  // Tri
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'apr':
        return b.apr - a.apr
      case 'lock':
        return a.lockPeriod - b.lockPeriod
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const activeCount = products.filter((p) => p.status === 'active').length
  const comingSoonCount = products.filter((p) => p.status === 'coming_soon').length

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              filterStatus === 'all'
                ? 'bg-[#2d7a28] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              filterStatus === 'active'
                ? 'bg-[#8AFD81] text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilterStatus('coming_soon')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              filterStatus === 'coming_soon'
                ? 'bg-gray-300 text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Coming Soon ({comingSoonCount})
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#8AFD81]"
          >
            <option value="apr">Highest APR</option>
            <option value="lock">Shortest Lock</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No products match your filters</p>
        </div>
      )}
    </div>
  )
}
