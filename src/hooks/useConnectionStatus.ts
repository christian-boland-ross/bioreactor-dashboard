import { useEffect, useState } from 'react'

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting'

function useConnectionStatus(lastUpdated: string | null) {
  const [connection, setConnection] = useState<ConnectionStatus>('connecting')

  useEffect(() => {
    if (!lastUpdated) {
      setConnection('connecting')
      return
    }

    const checkConnection = () => {
      const lastUpdateTime = new Date(lastUpdated).getTime()
      const currentTime = Date.now()

      // Consider the connection lost if no data arrives for 5 seconds
      const isConnected = currentTime - lastUpdateTime < 5000

      setConnection(isConnected ? 'connected' : 'disconnected')
    }

    checkConnection()

    const interval = setInterval(checkConnection, 1000)

    return () => clearInterval(interval)
  }, [lastUpdated])

  return connection
}

export default useConnectionStatus