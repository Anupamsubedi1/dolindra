import type {
  CareerItem,
  CountryChip,
  EducationItem,
  NavLink,
  PatronshipItem,
  Publication,
  SkillItem,
  SocialLink,
  StatCard,
  TrainingItem,
} from '../types'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Career', href: '#career' },
  { label: 'Education', href: '#education' },
  { label: 'Publications', href: '#publications' },
  { label: 'Training', href: '#training' },
  { label: 'Contact', href: '/contact' },
]

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/dolindra.sharma' },
  { label: 'Instagram', href: '/' },
  { label: 'Twitter/X', href: '/' },
  { label: 'LinkedIn', href: '/' },
]

export const contactInfo = {
  email: 'dolindrasharma@gmail.com',
  phone: '+977 985-1227052',
  location: 'Kathmandu, Nepal',
} as const

export const heroSummary =
  'I’m an organizational leader from Nepal who loves building businesses, growing teams, and turning bold ideas into real, working ventures.'

export const aboutStats: StatCard[] = [
  { value: '25+', label: 'Years of Experience' },
  { value: '10+', label: 'Organizations Led' },
  { value: '6+', label: 'Published Works' },
  { value: '11+', label: 'Countries Visited' },
]

export const aboutDetails = [
  { label: 'Full Name', value: 'Dolindra Prasad Sharma' },
  { label: 'Profession', value: 'Public Administrator, Author, Organizational Leader' },
  { label: 'Location', value: 'Kathmandu, Nepal' },
  { label: 'Languages', value: 'Nepali (Native), English (Intermediate)' },
]

export const patronships: PatronshipItem[] = [
  { title: 'Patron', detail: 'Shami Literary Academy (since inception)' },
  { title: 'Patron', detail: 'Nepal Studies and Research Center (since 15 Mangsir 2074 BS)' },
  { title: 'Managing Director', detail: 'Himalaya Nepal Krishi Company Limited (since 7 Baishakh 2083 BS)' },
]

export const careerData: CareerItem[] = [
  {
    role: 'Managing Director',
    org: 'Himalaya Nepal Krishi Company Limited',
    period: '7th Baishakh 2083 BS – Present',
    description: 'I lead agricultural development and set organizational strategy.',
  },
  {
    role: 'Chief Executive Officer',
    org: 'CYC Nepal',
    period: '2081 BS – 2083 BS',
    description: 'I managed organizational leadership, programs, and operations.',
  },
  {
    role: 'Managing Director',
    org: 'CYC Nepal',
    period: '2077 BS – 2080 BS',
    description: 'I provided strategic direction and managed the organization.',
  },
  {
    role: 'General Manager (2nd Term)',
    org: 'Sajha Prakashan, Pulchowk',
    period: '01 Magha 2073 BS – Onwards (4 Years)',
    description: 'I led publishing house operations and guided board-level decisions.',
  },
  {
    role: 'Chairperson',
    org: 'Sajha Prakashan, Pulchowk',
    period: '10 Shrawan 2072 BS (3 Years)',
    description: 'I chaired the board and steered institutional growth.',
  },
  {
    role: 'General Manager (1st Term)',
    org: 'Sajha Prakashan, Pulchowk',
    period: '2 Magha 2071 BS (2 Years)',
    description: "I oversaw operations of Nepal's leading public publisher.",
  },
  {
    role: 'Executive Chairperson',
    org: 'Nepal Studies and Research Center (NSRC)',
    period: '14 Asoj 2069 – 13 Poush 2071 BS',
    description: 'I led academic research initiatives and institutional governance.',
  },
  {
    role: 'Chief Executive Officer',
    org: 'Nepal Studies and Research Center (NSRC)',
    period: '16 Asoj 2064 – 15 Asoj 2068 BS',
    description: 'I provided executive leadership for a premier research institution.',
  },
  {
    role: 'Managing Director',
    org: 'Oxford International Publication Pvt. Ltd.',
    period: '28 Chaitra 2062 – 27 Chaitra 2070 BS',
    description: 'I directed publishing operations and business development.',
  },
  {
    role: 'Program Coordinator',
    org: 'CYC Nepal',
    period: '01 Mangsir 2057 – 30 Bhadra 2062 BS',
    description: 'I coordinated community development programs.',
  },
  {
    role: 'Community Mobilizer',
    org: 'Nepal Red Cross Society',
    period: '15 Jestha 2052 – 31 Jestha 2057 BS',
    description: 'I led community outreach and mobilization programs.',
  },
]

export const educationData: EducationItem[] = [
  {
    degree: 'Master in Public Administration (MPA)',
    field: 'Public Administration & Resource Management',
    institution: 'Tribhuvan University',
    year: '2023',
  },
  {
    degree: 'Master of Arts (MA)',
    field: 'Political Science – Policy, Diplomacy & Political Thoughts',
    institution: 'Tribhuvan University',
    year: '2018',
  },
  {
    degree: 'Bachelor of Arts (BA)',
    field: 'English & Sociology',
    institution: 'Tribhuvan University',
    year: '2006',
  },
  {
    degree: 'Proficiency Certificate Level (PCL)',
    field: 'Economics, History & English',
    institution: 'Higher Secondary Board of Nepal',
    year: '2001',
  },
  {
    degree: 'School Leaving Certificate (SLC)',
    field: 'Accounting, Management & Mathematics',
    institution: 'Higher Secondary Board of Nepal',
    year: '1995',
  },
]

export const skills: SkillItem[] = [
  { title: 'English', detail: 'Intermediate - British Council, Nepal' },
  { title: 'Diploma in Computer Application', detail: 'Digital productivity and office systems' },
]

export const trainingPrograms: TrainingItem[] = [
  { title: "Trainer's Training on Savings & Credit Management", detail: 'Hetauda, Nepal' },
  { title: 'Leadership in People-Centered Development', detail: 'Samuhik Abhiyan, Dhulikhel' },
  { title: 'Health & Sanitation Education & Community Action Plan Training', detail: 'Bharatpur, Chitwan' },
  { title: 'Financial Management for Micro Finance Institutions', detail: 'Dept. of Women Development & ADB, Dhulikhel' },
  { title: 'Animal Health Skill Training', detail: 'Baglung District' },
  { title: 'Resource Mobilization & Fundraising Training', detail: 'Baglung' },
  { title: 'Account Management Training', detail: 'December 2001' },
  { title: 'Bright Future Informal Education Program', detail: 'World Education' },
  { title: '5-Day Intensive Leadership Training', detail: 'Melbourne, Australia, 2022' },
]

export const visitedCountries: CountryChip[] = [
  { country: 'India', flag: '🇮🇳', code: 'in', continent: 'Asia' },
  { country: 'Dubai (UAE)', flag: '🇦🇪', code: 'ae', continent: 'Asia' },
  { country: 'South Korea', flag: '🇰🇷', code: 'kr', continent: 'Asia' },
  { country: 'Japan', flag: '🇯🇵', code: 'jp', continent: 'Asia' },
  { country: 'Russia', flag: '🇷🇺', code: 'ru', continent: 'Europe' },
  { country: 'Pakistan', flag: '🇵🇰', code: 'pk', continent: 'Asia' },
  { country: 'Malaysia', flag: '🇲🇾', code: 'my', continent: 'Asia' },
  { country: 'United Kingdom', flag: '🇬🇧', code: 'gb', continent: 'Europe' },
  { country: 'Australia', flag: '🇦🇺', code: 'au', continent: 'Oceania' },
  { country: 'Bangladesh', flag: '🇧🇩', code: 'bd', continent: 'Asia' },
  { country: 'Singapore', flag: '🇸🇬', code: 'sg', continent: 'Asia' },
]

export const publicationsSeed: Publication[] = [
  {
    id: '1',
    title: 'Badalbhitra Ko Gham',
    type: 'anthology',
    publisher: 'Sami Literary Academy',
    publishedIn: 'Sami Literary Academy',
    year: '2018',
    language: 'Nepali',
    tags: ['Socio-political', 'Poetry', 'Nepal'],
  },
  {
    id: '2',
    title: 'Political Instability in Nepal and Its Repercussions',
    type: 'essay',
    publisher: 'Vision and Horizon',
    publishedIn: 'Vision and Horizon',
    year: '2017',
    language: 'English',
    tags: ['Politics', 'Nepal', 'Governance'],
  },
  {
    id: '3',
    title: 'Democracy Boon or Burden?',
    type: 'essay',
    publisher: 'Cognition',
    publishedIn: 'Cognition',
    year: '2017',
    language: 'English',
    tags: ['Democracy', 'Nepal', 'Political Science'],
  },
  {
    id: '4',
    title: 'One Belt One Road and Nepal',
    type: 'essay',
    publisher: 'Vision and Horizon (Special Issue)',
    publishedIn: 'Vision and Horizon',
    year: 'July 2017',
    language: 'English',
    tags: ['International Relations', 'Geopolitics', 'Nepal'],
  },
  {
    id: '5',
    title: 'Sajhako Majherima',
    type: 'article',
    publisher: 'General Publication',
    publishedIn: 'General Publication',
    year: '2017',
    language: 'Nepali',
    tags: ['Society', 'Identity', 'Nepal'],
  },
  {
    id: '6',
    title: 'Badalbhitrako Ghaam: Prabhab ra Pratikriya',
    type: 'article',
    publisher: 'General Publication',
    publishedIn: 'General Publication',
    year: '2018',
    language: 'Nepali',
    tags: ['Literary', 'Social Dynamics'],
  },
  {
    id: '7',
    title: 'Sham ani Sajha',
    type: 'article',
    publisher: 'Gorkhapatra',
    publishedIn: 'Gorkhapatra',
    year: 'May 20, 2017',
    language: 'Nepali',
    tags: ['Commentary', 'Public Discourse'],
  },
  {
    id: '8',
    title: 'Sajha Prakashanko Bigat, Bartaman ra Bhavisya',
    type: 'article',
    publisher: 'General Publication',
    publishedIn: 'General Publication',
    year: 'March 31, 2018',
    language: 'Nepali',
    tags: ['Publishing', 'History', 'Nepal'],
  },
]