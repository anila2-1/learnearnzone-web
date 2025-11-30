// src/app/(frontend)/page.tsx
import { generateMeta } from './../../utilities/generateMeta'
import HomePageClient2 from './homepage/HomePageClient2'
import HomePageClient from './homepage/HomePageClient'
import HomePageClient3 from './homepage/HomePageClient3'

// ✅ Allowed: top-level export in Server Component
export async function generateMetadata() {
  return generateMeta({ doc: null })
}

export default function HomePage() {
  return <HomePageClient />
}
