'use client'

import { AdminPanel } from '@/components/AdminPanel'
import { Header } from '@/components/Header'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <AdminPanel />
      </main>
    </div>
  )
}
