import { useEffect, useState } from 'react'
import type { SensorPacket } from '../../types/bioreactor'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface MetricPanelProps {
  title: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
  confirmedSetpoint: number
  requestedSetpoint: number | null
  data: SensorPacket[]
  metric: 'temperature' | 'ph' | 'stirringSpeed'
  colour: string
  onSubmit: (value: number) => void
}

function MetricPanel({
  title,
  value,
  unit,
  status,
  confirmedSetpoint,
  requestedSetpoint,
  data,
  metric,
  colour,
  onSubmit,
}: MetricPanelProps) {
  const [inputValue, setInputValue] = useState(String(confirmedSetpoint))

  useEffect(() => {
    setInputValue(String(confirmedSetpoint))
  }, [confirmedSetpoint])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (inputValue.trim() === '') return

    const newValue = Number(inputValue)

    if (!Number.isFinite(newValue)) return

    onSubmit(newValue)
  }

  const statusStyles = {
    normal: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
  }

  return (
    <section className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${statusStyles[status]}`} />
          <span className="text-sm capitalize text-gray-400">
            {status}
          </span>
        </div>
      </div>

      {/* Readings and setpoint control */}
    <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">

    {/* Current reading */}
    <div>
        <p className="text-sm text-gray-400">Current reading</p>

        <div className="mt-1 flex items-baseline gap-3">
        <p className="text-3xl font-semibold text-white">
            {value}
            <span className="ml-2 text-base text-gray-400">{unit}</span>
        </p>

        <span className="text-sm text-gray-400">
            Target: {confirmedSetpoint} {unit}
        </span>
        </div>
    </div>

    {/* Setpoint control */}
    <div>
        <p className="mb-2 text-sm text-gray-400">
        Setpoint Control
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
        <input
            type="number"
            step="any"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none focus:border-sky-500"
        />

        <button
            type="submit"
            className="rounded-lg bg-sky-600 px-5 py-2 font-medium text-white hover:bg-sky-500"
        >
            Submit
        </button>
        </form>

        {requestedSetpoint !== null && (
        <p className="mt-2 text-sm text-yellow-400">
            Requested: {requestedSetpoint} {unit} — awaiting confirmation
        </p>
        )}
    </div>

    </div>

      {/* Graph */}
      <div className="mt-8">
        <h3 className="mb-4 text-sm font-medium text-gray-400">
          Historical readings
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

              <XAxis
                dataKey="timestamp"
                stroke="#9ca3af"
                tickFormatter={(timestamp: string) =>
                    new Date(timestamp).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC',
                    })
                }
                />

              <YAxis
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                domain={['auto', 'auto']}
              />

              <Tooltip
                labelFormatter={(timestamp) =>
                    new Date(String(timestamp)).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC',
                    })
                }
                />

              <Line
                type="monotone"
                dataKey={metric}
                stroke={colour}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default MetricPanel