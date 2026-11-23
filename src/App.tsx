import DashboardLayout from './components/layout/DashboardLayout'
import SensorCard from './components/sensors/SensorCard'
import SensorChart from './components/charts/SensorChart'

import {
  temperatureData,
  phData,
  stirringData,
} from './services/mockData.ts'

function App() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-white">
        Overview
      </h2>

      <p className="mt-2 text-gray-400">
        Bioreactor monitoring and control.
      </p>

      {/* Current sensor readings */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SensorCard
          title="Temperature"
          value={37.2}
          unit="°C"
          status="normal"
        />

        <SensorCard
          title="pH"
          value={7.1}
          unit="pH"
          status="warning"
        />

        <SensorCard
          title="Stirring Speed"
          value={150}
          unit="RPM"
          status="normal"
        />
      </div>

      {/* Sensor history */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SensorChart
          title="Temperature Over Time"
          data={temperatureData}
          colour="#38bdf8"
          unit="°C"
        />

        <SensorChart
          title="pH Over Time"
          data={phData}
          colour="#a78bfa"
          unit="pH"
        />

        <SensorChart
          title="Stirring Speed Over Time"
          data={stirringData}
          colour="#34d399"
          unit="RPM"
        />
      </div>
    </DashboardLayout>
  )
}

export default App