import { db } from '@/lib/db'
import { HomePageClient } from './home-client'

export default async function HomePage() {
  // Fetch dynamic content from the database on the server
  const savedSections = await db.sectionContent.findMany()
  const events = await db.event.findMany({ orderBy: { date: 'desc' } })
  const galleryPosts = await db.galleryPost.findMany({ orderBy: { createdAt: 'desc' } })

  // Convert array to a record map for easy access in the client
  const sectionsData = savedSections.reduce((acc, sec) => {
    acc[sec.sectionId] = sec
    return acc
  }, {} as Record<string, any>)

  return <HomePageClient sectionsData={sectionsData} eventsData={events} galleryPosts={galleryPosts} />
}
