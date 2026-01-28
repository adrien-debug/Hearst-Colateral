'use client'

import { useVaultsList } from '@/hooks/useMultiVault'

interface AdminSidebarProps {
  activeView: 'cockpit' | 'vault'
  selectedVaultSlug: string | null
  onSelectCockpit: () => void
  onSelectVault: (slug: string) => void
}

export function AdminSidebar({ 
  activeView, 
  selectedVaultSlug, 
  onSelectCockpit, 
  onSelectVault 
}: AdminSidebarProps) {
  const { vaults } = useVaultsList()

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</p>
      </div>

      {/* Menu */}
      <div className="flex-1 py-2">
        {/* Cockpit */}
        <button
          onClick={onSelectCockpit}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
            activeView === 'cockpit'
              ? 'bg-[#8AFD81]/10 border-l-3 border-[#8AFD81] text-gray-900'
              : 'hover:bg-gray-50 text-gray-500 border-l-3 border-transparent'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="font-medium">Terminal</span>
        </button>

        {/* Vaults Section */}
        <div className="mt-4 px-4 py-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Vaults ({vaults.length})
          </p>
        </div>
        
        {vaults.map((vault) => (
          <button
            key={vault.slug}
            onClick={() => onSelectVault(vault.slug)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
              activeView === 'vault' && selectedVaultSlug === vault.slug
                ? 'bg-[#8AFD81]/10 border-l-3 border-[#8AFD81] text-gray-900'
                : 'hover:bg-gray-50 text-gray-500 border-l-3 border-transparent'
            }`}
          >
            <span className="text-lg">{vault.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{vault.name}</p>
              <p className="text-xs text-gray-400">{vault.token}</p>
            </div>
          </button>
        ))}

        {vaults.length === 0 && (
          <p className="px-4 py-3 text-sm text-gray-400">Aucun vault actif</p>
        )}
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => onSelectVault('create')}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            selectedVaultSlug === 'create'
              ? 'bg-[#8AFD81] text-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nouveau Vault
        </button>
      </div>
    </aside>
  )
}
