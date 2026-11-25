import useSetpoints from './hooks/useSetpoints'

import DashboardLayout from './components/layout/DashboardLayout'
import MetricPanel from './components/layout/MetricPanel'
import useSensorData from './hooks/useSensorData'

function App() {
  const { packets, latestPacket } = useSensorData()
  const {
    confirmedSetpoints,
    requests,
    submitSetpoint,
  } = useSetpoints()

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
          confirmedSetpoint={confirmedSetpoints.temperature}
          requestedSetpoint={
            requests.temperature?.status === 'pending'
              ? requests.temperature.request.value
              : null
          }
          data={packets}
          metric="temperature"
          colour="#38bdf8"
          onSubmit={(value) => submitSetpoint('temperature', value)}
        />

        <MetricPanel
          title="pH"
          value={latestPacket.ph}
          unit="pH"
          status="warning"
          confirmedSetpoint={confirmedSetpoints.ph}
          requestedSetpoint={
            requests.ph?.status === 'pending'
              ? requests.ph.request.value
              : null
          }
          data={packets}
          metric="ph"
          colour="#a78bfa"
          onSubmit={(value) => submitSetpoint('ph', value)}
        />

        <MetricPanel
          title="Stirring Speed"
          value={latestPacket.stirringSpeed}
          unit="RPM"
          status="normal"
          confirmedSetpoint={confirmedSetpoints.stirringSpeed}
          requestedSetpoint={
            requests.stirringSpeed?.status === 'pending'
              ? requests.stirringSpeed.request.value
              : null
          }
          data={packets}
          metric="stirringSpeed"
          colour="#34d399"
          onSubmit={(value) => submitSetpoint('stirringSpeed', value)}
        />
      </div>
    </DashboardLayout>
  )
}

export default App