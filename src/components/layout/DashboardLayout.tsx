import type { ReactNode } from 'react'

import Header from './Header'

interface DashboardLayoutProps {
  children: ReactNode
  connection: 'connected' | 'disconnected' | 'connecting'
}

function DashboardLayout({ children, connection }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header connection={connection} />

      <main className="px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout