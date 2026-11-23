import { useEffect, useState } from 'react'

import type { SensorPacket } from '../types/bioreactor'
import { sensorPackets } from '../services/mockData'

function useSensorData() {
  const [packets, setPackets] = useState<SensorPacket[]>(sensorPackets)

  const latestPacket = packets[packets.length - 1]

  useEffect(() => {
    const interval = setInterval(() => {
      setPackets((previousPackets) => {
        const latest = previousPackets[previousPackets.length - 1]

        const newPacket: SensorPacket = {
          timestamp: new Date().toISOString(),
          temperature: Number(
            (latest.temperature + (Math.random() - 0.5) * 0.2).toFixed(2)
          ),
          ph: Number(
            (latest.ph + (Math.random() - 0.5) * 0.05).toFixed(2)
          ),
          stirringSpeed: Math.round(
            latest.stirringSpeed + (Math.random() - 0.5) * 4
          ),
        }

        return [...previousPackets, newPacket].slice(-50)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return {
    packets,
    latestPacket,
  }
}

export default useSensorData