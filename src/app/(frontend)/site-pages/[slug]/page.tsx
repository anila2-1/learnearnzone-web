import { notFound } from 'next/navigation'
import { Metadata } from 'next'

async function getPageBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}`,
    {
      next: { revalidate: 60 },
    }
  )
  if (!res.ok) return null
  const json = await res.json()
  return json.docs?.[0] || null
}

type Props = {
  params: Promise<{ slug: string }> // ✅ Make params a Promise
}

// ✅ Await params before using
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params // ✅ Await here
  const page = await getPageBySlug(slug)

  if (!page) return { title: 'Page Not Found' }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  }
}

// ✅ Await params in component too
export default async function CustomPage({ params }: Props) {
  const { slug } = await params // ✅ Await here
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      <div className="prose prose-lg max-w-none">
        {page.content && <div>{JSON.stringify(page.content)}</div>}
      </div>
    </div>
  )
}
