import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-white">
        Overview
      </h2>

      <p className="mt-2 text-gray-400">
        Bioreactor monitoring and control.
      </p>
    </DashboardLayout>
  )
}

export default App