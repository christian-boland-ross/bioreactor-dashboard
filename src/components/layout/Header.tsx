interface HeaderProps {
  connection: 'connected' | 'disconnected' | 'connecting'
}

function Header({ connection }: HeaderProps) {
  const connectionStyles = {
    connected: {
      dot: 'bg-green-500',
      text: 'text-green-400',
      label: 'Connected',
    },
    disconnected: {
      dot: 'bg-red-500',
      text: 'text-red-400',
      label: 'Disconnected',
    },
    connecting: {
      dot: 'bg-yellow-500',
      text: 'text-yellow-400',
      label: 'Connecting...',
    },
  }

  const currentStyle = connectionStyles[connection]

  return (
    <header className="flex items-center justify-between border-b border-gray-700 px-8 py-4">
      <h1 className="text-xl font-semibold text-white">
        Bioreactor Dashboard
      </h1>

      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${currentStyle.dot}`} />

        <span className={`text-sm ${currentStyle.text}`}>
          {currentStyle.label}
        </span>
      </div>
    </header>
  )
}

export default Header