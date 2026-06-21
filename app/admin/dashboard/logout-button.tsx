'use client'

import { useRouter } from 'next/navigation'
import { logoutAction } from '@/app/actions/admin'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()
    router.push('/admin')
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Cerrar Sesión
    </button>
  )
}
