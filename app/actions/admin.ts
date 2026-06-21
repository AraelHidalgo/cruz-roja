'use server'

import { db } from '@/lib/db'
import { login, logout } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

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
  
  // Get active blood stock alerts
  const stock = await getBloodStock()
  const criticalCount = Object.values(stock).filter(status => status === 'Critico').length
  
  // Get donation progress
  const donation = await getDonationGoal()
  
  return { 
    eventsCount, 
    sectionsCount,
    criticalCount,
    donationGoal: donation.goal,
    donationCurrent: donation.current
  }
}

export async function getBloodStock() {
  const stockSection = await db.sectionContent.findUnique({
    where: { sectionId: 'blood-stock' }
  })
  
  if (!stockSection || !stockSection.content) {
    // Default blood stock values if none exist
    const defaultStock = {
      "O-": "Critico",
      "O+": "Estable",
      "A-": "Estable",
      "A+": "Estable",
      "B-": "Bajo",
      "B+": "Estable",
      "AB-": "Critico",
      "AB+": "Estable"
    }
    return defaultStock
  }

  try {
    return JSON.parse(stockSection.content) as Record<string, string>
  } catch (e) {
    return {}
  }
}

export async function saveBloodStock(stock: Record<string, string>) {
  const content = JSON.stringify(stock)
  
  await db.sectionContent.upsert({
    where: { sectionId: 'blood-stock' },
    update: { content },
    create: { sectionId: 'blood-stock', content }
  })
  
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/dashboard/sangre')
  revalidatePath('/banco-de-sangre')
  revalidatePath('/')
  
  return { success: true }
}

export async function getDonationGoal() {
  const goalSection = await db.sectionContent.findUnique({
    where: { sectionId: 'donation-goal' }
  })
  
  if (!goalSection) {
    return { goal: 50000, current: 24500 }
  }

  return {
    goal: Number(goalSection.title || 50000),
    current: Number(goalSection.content || 24500)
  }
}

export async function saveDonationGoal(goal: number, current: number) {
  await db.sectionContent.upsert({
    where: { sectionId: 'donation-goal' },
    update: { title: String(goal), content: String(current) },
    create: { sectionId: 'donation-goal', title: String(goal), content: String(current) }
  })
  
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/dashboard/donaciones')
  revalidatePath('/banco-de-sangre')
  revalidatePath('/')
  
  return { success: true }
}
