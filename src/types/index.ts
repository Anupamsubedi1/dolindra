export type PublicationType = 'book' | 'essay' | 'article' | 'anthology'
export type PublicationLanguage = 'English' | 'Nepali'

export interface Publication {
  id: string
  title: string
  type: PublicationType
  publisher: string
  publishedIn: string
  year: string
  language: PublicationLanguage
  tags: string[]
  url?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface CareerItem {
  role: string
  org: string
  period: string
  description: string
}

export interface EducationItem {
  degree: string
  field: string
  institution: string
  year: string
}

export interface TrainingItem {
  title: string
  detail: string
}

export interface CountryChip {
  country: string
  flag: string
  code: string
  continent: string
}

export interface StatCard {
  value: string
  label: string
}

export interface PatronshipItem {
  title: string
  detail: string
}

export interface SkillItem {
  title: string
  detail: string
}