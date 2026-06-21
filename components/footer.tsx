export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-400 py-10 border-t border-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center text-sm">
        <p className="mb-3 font-medium text-gray-300">
          &copy; {currentYear} Cruz Roja Mexicana Delegación Tapachula. Todos los derechos reservados.
        </p>
        <p className="flex items-center gap-1.5 flex-wrap justify-center">
          <span>Diseño y Desarrollo por</span>
          <span className="text-white font-semibold tracking-wide">Carlos Rafael Reyes Jiménez</span>
          <span className="text-gray-500">&amp;</span>
          <span className="text-white font-semibold tracking-wide">Arael Hidalgo Juárez</span>
        </p>
      </div>
    </footer>
  )
}
