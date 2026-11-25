// A packet containing all sensor readings at a particular time
export interface SensorPacket {
  timestamp: string
  ph: number
  temperature: number
  stirringSpeed: number
}

// A setpoint for a particular operating parameter
export interface Setpoint {
  value: number
  unit: string
  updatedAt: string
}

// Current connection and operating status of the bioreactor
export interface BioreactorStatus {
  connection: 'connected' | 'disconnected' | 'connecting'
  operatingState: 'running' | 'stopped' | 'paused' | 'error'
  lastUpdated: string
}

// All the current setpoints and status of the bioreactor
export interface BioreactorData {
  temperatureSetpoint: Setpoint
  phSetpoint: Setpoint
  stirringSpeedSetpoint: Setpoint

  status: BioreactorStatus
}

// A request to change a setpoint
export interface SetpointRequest {
  parameter: 'temperature' | 'ph' | 'stirringSpeed'
  value: number
}

// Possible states of a setpoint request
export type SetpointRequestStatus = 'pending' | 'accepted' | 'rejected'

// A setpoint request and its current status
export interface SetpointRequestState {
  request: SetpointRequest
  status: SetpointRequestStatus
}