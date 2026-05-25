import { useMemo, useState } from 'react'
import { publicationsSeed } from '../data/staticData'
import type { Publication, PublicationLanguage, PublicationType } from '../types'

export type PublicationFilterType = 'all' | PublicationType
export type PublicationFilterLanguage = 'all' | PublicationLanguage

interface PublicationsResponse {
  publications: Publication[]
  loading: boolean
  error: string | null
  refetch: () => void
  typeFilter: PublicationFilterType
  languageFilter: PublicationFilterLanguage
  keyword: string
  setTypeFilter: (value: PublicationFilterType) => void
  setLanguageFilter: (value: PublicationFilterLanguage) => void
  setKeyword: (value: string) => void
  usingFallback: boolean
}

export function usePublications(): PublicationsResponse {
  const [typeFilter, setTypeFilter] = useState<PublicationFilterType>('all')
  const [languageFilter, setLanguageFilter] = useState<PublicationFilterLanguage>('all')
  const [keyword, setKeyword] = useState('')

  const filteredPublications = useMemo(() => {
    return publicationsSeed.filter((pub) => {
      const matchesType = typeFilter === 'all' || pub.type === typeFilter
      const matchesLanguage = languageFilter === 'all' || pub.language === languageFilter
      const matchesKeyword =
        !keyword.trim() ||
        pub.title.toLowerCase().includes(keyword.toLowerCase()) ||
        pub.publishedIn.toLowerCase().includes(keyword.toLowerCase()) ||
        (pub.tags?.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase())) ?? false)

      return matchesType && matchesLanguage && matchesKeyword
    })
  }, [typeFilter, languageFilter, keyword])

  return {
    publications: filteredPublications,
    loading: false,
    error: null,
    refetch: () => {},
    typeFilter,
    languageFilter,
    keyword,
    setTypeFilter,
    setLanguageFilter,
    setKeyword,
    usingFallback: false,
  }
}
