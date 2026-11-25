import { useEffect, useRef, useState } from 'react'

import type {
  SetpointRequest,
  SetpointRequestState,
} from '../types/bioreactor'

type SetpointParameter = SetpointRequest['parameter']

function useSetpoints() {
  // The setpoints currently confirmed by the bioreactor
  const [confirmedSetpoints, setConfirmedSetpoints] = useState<
    Record<SetpointParameter, number>
  >({
    temperature: 37.0,
    ph: 7.0,
    stirringSpeed: 150,
  })

  // The latest request for each parameter
  const [requests, setRequests] = useState<
    Record<SetpointParameter, SetpointRequestState | null>
  >({
    temperature: null,
    ph: null,
    stirringSpeed: null,
  })

  // Keep track of active response timers
  const timers = useRef<
    Partial<Record<SetpointParameter, ReturnType<typeof setTimeout>>>
  >({})

  // Submit a new setpoint request
  function submitSetpoint(parameter: SetpointParameter, value: number) {
    if (!Number.isFinite(value)) return

    if (requests[parameter]?.status === 'pending') return

    const newRequest: SetpointRequestState = {
      request: {
        parameter,
        value,
      },
      status: 'pending',
    }

    setRequests((previous) => ({
      ...previous,
      [parameter]: newRequest,
    }))
  }

  // Simulate backend responses
  useEffect(() => {
    const parameters: SetpointParameter[] = [
      'temperature',
      'ph',
      'stirringSpeed',
    ]

    parameters.forEach((parameter) => {
      const request = requests[parameter]

      if (request?.status === 'pending' && !timers.current[parameter]) {
        const requestedValue = request.request.value

        timers.current[parameter] = setTimeout(() => {
          const accepted = Math.random() < 0.8

          if (accepted) {
            setConfirmedSetpoints((previous) => ({
              ...previous,
              [parameter]: requestedValue,
            }))
          }

          setRequests((previous) => {
            const currentRequest = previous[parameter]

            if (
              !currentRequest ||
              currentRequest.status !== 'pending' ||
              currentRequest.request.value !== requestedValue
            ) {
              return previous
            }

            return {
              ...previous,
              [parameter]: {
                ...currentRequest,
                status: accepted ? 'accepted' : 'rejected',
              },
            }
          })

          delete timers.current[parameter]
        }, 1500)
      }
    })
  }, [requests])

  // Clean up timers if the hook is unmounted
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((timer) => {
        if (timer) clearTimeout(timer)
      })
    }
  }, [])

  return {
    confirmedSetpoints,
    requests,
    submitSetpoint,
  }
}

export default useSetpoints