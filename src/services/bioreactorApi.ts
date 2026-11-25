import type { SetpointRequest } from '../types/bioreactor'

// Simulate sending a setpoint request to the backend
export async function submitSetpointRequest(
  request: SetpointRequest
): Promise<{ accepted: boolean }> {

  console.log('Sending setpoint request:', request)

  // Simulate backend processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate an 80% acceptance rate
  return {
    accepted: Math.random() < 0.8,
  }
}