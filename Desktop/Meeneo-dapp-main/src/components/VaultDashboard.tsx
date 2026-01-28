'use client'

import { AdminPanel } from '@/components/AdminPanel'
import { UserDashboard } from '@/components/UserDashboard'
import { VaultOverview } from '@/components/VaultOverview'

export function VaultDashboard() {
  return (
    <section className="py-20 lg:py-32 bg-[#F7F2E9]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1E2023] mb-6 font-title">
              Vault Management
            </h2>
            <p className="text-xl text-[#1E2023] max-w-3xl mx-auto font-text">
              Access your decentralized vault with epoch-based rewards and secure withdrawal management.
            </p>
          </div>

          <div className="space-y-12">
            {/* Vault Overview */}
            <div id="vault-overview">
              <VaultOverview />
            </div>
            
            {/* User Dashboard */}
            <div id="user-dashboard">
              <UserDashboard />
            </div>
            
            {/* Admin Panel */}
            <div id="admin-panel">
              <AdminPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
