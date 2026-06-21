'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getEvents() {
  return await db.event.findMany({
    orderBy: { date: 'desc' }
  })
}

export async function createEvent(formData: FormData) {
  const title = formData.get('title') as string
  const dateStr = formData.get('date') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string

  if (!title || !dateStr) return { error: 'Faltan campos obligatorios' }

  await db.event.create({
    data: {
      title,
      date: new Date(dateStr),
      description,
      location,
    }
  })

  revalidatePath('/admin/dashboard/eventos')
  revalidatePath('/') // Revalidate home page too
  return { success: true }
}

export async function deleteEvent(id: string) {
  await db.event.delete({ where: { id } })
  revalidatePath('/admin/dashboard/eventos')
  revalidatePath('/')
  return { success: true }
}
