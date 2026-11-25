import { useState } from 'react'

import type {
  SetpointRequest,
  SetpointRequestState,
} from '../types/bioreactor'

import { submitSetpointRequest } from '../services/bioreactorApi'

type SetpointParameter = SetpointRequest['parameter']

function useSetpoints() {
  const [confirmedSetpoints, setConfirmedSetpoints] = useState<
    Record<SetpointParameter, number>
  >({
    temperature: 37.0,
    ph: 7.0,
    stirringSpeed: 150,
  })

  const [requests, setRequests] = useState<
    Record<SetpointParameter, SetpointRequestState | null>
  >({
    temperature: null,
    ph: null,
    stirringSpeed: null,
  })

  async function submitSetpoint(parameter: SetpointParameter, value: number) {
    if (!Number.isFinite(value)) return

    if (requests[parameter]?.status === 'pending') return

    const newRequest: SetpointRequestState = {
      request: { parameter, value },
      status: 'pending',
    }

    setRequests((previous) => ({
      ...previous,
      [parameter]: newRequest,
    }))

    try {
      const response = await submitSetpointRequest(newRequest.request)

      if (response.accepted) {
        setConfirmedSetpoints((previous) => ({
          ...previous,
          [parameter]: value,
        }))
      }

      setRequests((previous) => {
        const currentRequest = previous[parameter]

        if (
          !currentRequest ||
          currentRequest.status !== 'pending' ||
          currentRequest.request.value !== value
        ) {
          return previous
        }

        return {
          ...previous,
          [parameter]: {
            ...currentRequest,
            status: response.accepted ? 'accepted' : 'rejected',
          },
        }
      })
    } catch (error) {
      console.error('Setpoint request failed:', error)

      setRequests((previous) => ({
        ...previous,
        [parameter]: {
          ...newRequest,
          status: 'rejected',
        },
      }))
    }
  }

  return {
    confirmedSetpoints,
    requests,
    submitSetpoint,
  }
}

export default useSetpoints