import { useState } from 'react'

import DashboardLayout from './components/layout/DashboardLayout'
import MetricPanel from './components/layout/MetricPanel'
import { sensorPackets } from './services/mockData'

function App() {
  const [temperatureSetpoint, setTemperatureSetpoint] = useState<number | null>(null)
  const [phSetpoint, setPhSetpoint] = useState<number | null>(null)
  const [stirringSetpoint, setStirringSetpoint] = useState<number | null>(null)

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-white">
        Bioreactor Overview
      </h2>

      <p className="mt-2 text-gray-400">
        Monitor and control bioreactor operating parameters.
      </p>

      <div className="mt-8 space-y-8">
        <MetricPanel
          title="Temperature"
          value={37.2}
          unit="°C"
          status="normal"
          confirmedSetpoint={37.0}
          requestedSetpoint={temperatureSetpoint}
          data={sensorPackets}
          metric="temperature"
          colour="#38bdf8"
          onSubmit={setTemperatureSetpoint}
        />

        <MetricPanel
          title="pH"
          value={7.1}
          unit="pH"
          status="warning"
          confirmedSetpoint={7.0}
          requestedSetpoint={phSetpoint}
          data={sensorPackets}
          metric="ph"
          colour="#a78bfa"
          onSubmit={setPhSetpoint}
        />

        <MetricPanel
          title="Stirring Speed"
          value={150}
          unit="RPM"
          status="normal"
          confirmedSetpoint={150}
          requestedSetpoint={stirringSetpoint}
          data={sensorPackets}
          metric="stirringSpeed"
          colour="#34d399"
          onSubmit={setStirringSetpoint}
        />
      </div>
    </DashboardLayout>
  )
}

export default App