import { NextRequest, NextResponse } from 'next/server'
import { publicationsSeed } from '../../../data/staticData'
import type { Publication } from '../../../types'

const publications: Publication[] = [...publicationsSeed]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const language = searchParams.get('language')
  const query = searchParams.get('q')

  let result = [...publications]

  if (type && type !== 'all') {
    result = result.filter((publication) => publication.type === type)
  }

  if (language && language !== 'all') {
    result = result.filter((publication) => publication.language === language)
  }

  if (query) {
    const normalized = query.toLowerCase()
    result = result.filter(
      (publication) =>
        publication.title.toLowerCase().includes(normalized) ||
        publication.publishedIn.toLowerCase().includes(normalized) ||
        publication.tags.some((tag) => tag.toLowerCase().includes(normalized))
    )
  }

  return NextResponse.json({ publications: result, total: result.length })
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Omit<Publication, 'id'>
  const publication: Publication = { ...body, id: Date.now().toString() }
  publications.unshift(publication)
  return NextResponse.json({ publication }, { status: 201 })
}
