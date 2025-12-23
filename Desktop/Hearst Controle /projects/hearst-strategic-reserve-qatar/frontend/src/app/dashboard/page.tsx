'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { containersAPI, minersAPI, metricsAPI } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
      return;
    }

    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    loadDashboardData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const loadDashboardData = async () => {
    try {
      const [statsRes] = await Promise.all([
        metricsAPI.getStats(),
      ]);
      
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Qatar Project</h1>
              <p className="text-sm text-gray-600">Hearst Mining Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Containers */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Containers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.containers?.total || 0}
                </p>
                <p className="text-sm text-green-600 mt-2">
                  {stats?.containers?.operational || 0} operational
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          {/* Miners */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Miners</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.miners?.total?.toLocaleString() || 0}
                </p>
                <p className="text-sm text-green-600 mt-2">
                  {stats?.miners?.online || 0} online
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>

          {/* Hashrate */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hashrate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {((stats?.miners?.totalHashrate || 0) / 1000000).toFixed(2)} EH/s
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {(stats?.miners?.totalHashrate || 0).toLocaleString()} TH/s
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          {/* Power */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Power</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {((stats?.miners?.totalPower || 0) / 1000000).toFixed(2)} MW
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {(stats?.miners?.totalPower || 0).toLocaleString()} W
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Project Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Containers</p>
              <p className="text-lg font-semibold">58 × ANTSPACE HD5</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Capacity per Container</p>
              <p className="text-lg font-semibold">308 miners</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Miner Model</p>
              <p className="text-lg font-semibold">S21XP Hydro</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Hashrate per Miner</p>
              <p className="text-lg font-semibold">473 TH/s</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Power per Miner</p>
              <p className="text-lg font-semibold">5,676 W</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Max Power per Container</p>
              <p className="text-lg font-semibold">1,765 kW</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Design Capacity</p>
              <p className="text-lg font-semibold">17,864 miners</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Design Hashrate</p>
              <p className="text-lg font-semibold">8.45 EH/s</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Max Power</p>
              <p className="text-lg font-semibold">102.37 MW</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              View Containers
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              View Miners
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              View Metrics
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Qatar Project © 2025 Hearst Mining | Dashboard v1.0.0</p>
        </div>
      </main>
    </div>
  );
}

