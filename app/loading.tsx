export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Animated pulse matching Cruz Roja brand */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-red-200 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-red-600 animate-ping opacity-75" />
          </div>
        </div>
        <p className="font-inter text-sm text-gray-500 animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  )
}
