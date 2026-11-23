import { useEffect, useState } from 'react'

interface SetpointControlProps {
  title: string
  unit: string
  confirmedValue: number
  requestedValue: number | null
  onSubmit: (value: number) => void
}

function SetpointControl({
  title,
  unit,
  confirmedValue,
  requestedValue,
  onSubmit,
}: SetpointControlProps) {
  const [inputValue, setInputValue] = useState(String(confirmedValue))

  useEffect(() => {
    setInputValue(String(confirmedValue))
  }, [confirmedValue])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const value = Number(inputValue)

    if (inputValue.trim() === '' || !Number.isFinite(value)) {
      return
    }

    onSubmit(value)
  }

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="mt-4">
        <p className="text-sm text-gray-400">
          Confirmed setpoint
        </p>

        <p className="mt-1 text-2xl font-semibold text-white">
          {confirmedValue} <span className="text-sm text-gray-400">{unit}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5">
        <label className="mb-2 block text-sm text-gray-400">
          New setpoint ({unit})
        </label>

        <div className="flex gap-3">
          <input
            type="number"
            step="any"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none focus:border-sky-500"
          />

          <button
            type="submit"
            className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500"
          >
            Submit
          </button>
        </div>
      </form>

      {requestedValue !== null && (
        <div className="mt-4 rounded-lg bg-yellow-500/10 p-3">
          <p className="text-sm text-yellow-400">
            Requested: {requestedValue} {unit}
          </p>
          <p className="mt-1 text-xs text-yellow-500">
            Awaiting backend confirmation
          </p>
        </div>
      )}
    </div>
  )
}

export default SetpointControl