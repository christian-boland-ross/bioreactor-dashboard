import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface SensorReading {
  timestamp: string
  value: number
}

interface SensorChartProps {
  title: string
  data: SensorReading[]
  colour: string
  unit: string
}

function SensorChart({ title, data, colour, unit }: SensorChartProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h3 className="mb-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis
              dataKey="timestamp"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              domain={['auto', 'auto']}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff',
              }}
              formatter={(value) => [`${value} ${unit}`, title]}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke={colour}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SensorChart