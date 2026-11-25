import { useState } from 'react'

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

  // Submit a new setpoint request
  function submitSetpoint(parameter: SetpointParameter, value: number) {
    if (!Number.isFinite(value)) return

    const existingRequest = requests[parameter]

    // Prevent another request while one is pending
    if (existingRequest?.status === 'pending') return

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

  // Simulate the backend accepting or rejecting a request
  function resolveRequest(parameter: SetpointParameter, accepted: boolean) {
    const existingRequest = requests[parameter]

    if (!existingRequest || existingRequest.status !== 'pending') return

    if (accepted) {
      setConfirmedSetpoints((previous) => ({
        ...previous,
        [parameter]: existingRequest.request.value,
      }))
    }

    setRequests((previous) => ({
      ...previous,
      [parameter]: {
        ...existingRequest,
        status: accepted ? 'accepted' : 'rejected',
      },
    }))
  }

  return {
    confirmedSetpoints,
    requests,
    submitSetpoint,
    resolveRequest,
  }
}

export default useSetpoints