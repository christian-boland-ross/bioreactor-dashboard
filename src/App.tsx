import { useState } from 'react'

import DashboardLayout from './components/layout/DashboardLayout'
import MetricPanel from './components/layout/MetricPanel'
import useSensorData from './hooks/useSensorData'

function App() {
  const { packets, latestPacket } = useSensorData()
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
          value={latestPacket.temperature}
          unit="°C"
          status="normal"
          confirmedSetpoint={37.0}
          requestedSetpoint={temperatureSetpoint}
          data={packets}
          metric="temperature"
          colour="#38bdf8"
          onSubmit={setTemperatureSetpoint}
        />

        <MetricPanel
          title="pH"
          value={latestPacket.ph}
          unit="pH"
          status="warning"
          confirmedSetpoint={7.0}
          requestedSetpoint={phSetpoint}
          data={packets}
          metric="ph"
          colour="#a78bfa"
          onSubmit={setPhSetpoint}
        />

        <MetricPanel
          title="Stirring Speed"
          value={latestPacket.stirringSpeed}
          unit="RPM"
          status="normal"
          confirmedSetpoint={150}
          requestedSetpoint={stirringSetpoint}
          data={packets}
          metric="stirringSpeed"
          colour="#34d399"
          onSubmit={setStirringSetpoint}
        />
      </div>
    </DashboardLayout>
  )
}

export default App