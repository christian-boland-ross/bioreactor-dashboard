import Header from './Header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <main className="mx-auto max-w-7xl p-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout