'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function getSection(sectionId: string) {
  return await db.sectionContent.findUnique({
    where: { sectionId }
  })
}

export async function getAllSections() {
  return await db.sectionContent.findMany()
}

export async function saveSection(formData: FormData) {
  const sectionId = formData.get('sectionId') as string
  const title = formData.get('title') as string | null
  const content = formData.get('content') as string | null
  const image = formData.get('image') as File | null

  if (!sectionId) return { error: 'Falta el ID de la sección' }

  let imageUrl: string | undefined = undefined

  // Handle file upload
  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = `${uniqueSuffix}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const path = join(uploadsDir, filename)

    await writeFile(path, buffer)
    imageUrl = `/uploads/${filename}`
  }

  // Save to DB
  await db.sectionContent.upsert({
    where: { sectionId },
    update: {
      title: title || null,
      content: content || null,
      ...(imageUrl ? { imageUrl } : {})
    },
    create: {
      sectionId,
      title: title || null,
      content: content || null,
      imageUrl
    }
  })

  revalidatePath('/')
  revalidatePath('/admin/dashboard/secciones')
  return { success: true }
}
