interface SensorCardProps {
  title: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
}

function SensorCard({ title, value, unit, status }: SensorCardProps) {
  const statusStyles = {
    normal: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
  }

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400">
          {title}
        </h3>

        <span className={`h-2.5 w-2.5 rounded-full ${statusStyles[status]}`} />
      </div>

      <div className="mt-4">
        <span className="text-3xl font-semibold text-white">
          {value}
        </span>

        <span className="ml-2 text-sm text-gray-400">
          {unit}
        </span>
      </div>

      <p className="mt-3 text-xs capitalize text-gray-500">
        {status}
      </p>
    </div>
  )
}

export default SensorCard