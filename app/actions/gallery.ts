'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function getGalleryPosts() {
  return await db.galleryPost.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function createGalleryPost(formData: FormData) {
  const text = formData.get('text') as string | null
  const files = formData.getAll('images') as File[]

  if (!files || files.length === 0) {
    return { error: 'Debes subir al menos una imagen' }
  }

  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  const imageUrls: string[] = []

  for (const image of files) {
    if (image.size === 0) continue

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = `${uniqueSuffix}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const path = join(uploadsDir, filename)

    await writeFile(path, buffer)
    imageUrls.push(`/uploads/${filename}`)
  }

  if (imageUrls.length === 0) {
    return { error: 'No se procesaron las imágenes' }
  }

  await db.galleryPost.create({
    data: {
      text,
      imageUrls: JSON.stringify(imageUrls)
    }
  })

  revalidatePath('/admin/dashboard/fotos')
  revalidatePath('/')
  return { success: true }
}

export async function deleteGalleryPost(id: string) {
  await db.galleryPost.delete({ where: { id } })
  revalidatePath('/admin/dashboard/fotos')
  revalidatePath('/')
  return { success: true }
}
