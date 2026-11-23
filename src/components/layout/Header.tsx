function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-700 px-8 py-4">
      <h1 className="text-xl font-semibold text-white">
        Bioreactor Dashboard
      </h1>

      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-sm text-gray-400">
          Connected
        </span>
      </div>
    </header>
  )
}

export default Header