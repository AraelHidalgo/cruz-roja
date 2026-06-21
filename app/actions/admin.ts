'use server'

import { db } from '@/lib/db'
import { login, logout } from '@/lib/auth'

export async function loginAction(username: string, password: string) {
  // Hardcoded secure login for the first user if there is no user in db
  // In a real app we would query the database to compare passwords using bcrypt.
  // We'll create a default admin user if none exists.
  let admin = await db.user.findUnique({ where: { username: 'admin' } })
  
  if (!admin) {
    // We are creating a simple plaintext admin to get started as requested by the user 
    // "usuario y contraseña únicos y sencillos"
    admin = await db.user.create({
      data: {
        username: 'admin',
        password: 'password123', // Very simple default password
      }
    })
  }

  if (username === admin.username && password === admin.password) {
    await login(username)
    return { success: true }
  } else {
    return { success: false, error: 'Credenciales incorrectas.' }
  }
}

export async function logoutAction() {
  await logout()
}

export async function getDashboardStats() {
  const eventsCount = await db.event.count()
  const sectionsCount = await db.sectionContent.count()
  return { eventsCount, sectionsCount }
}
