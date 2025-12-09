const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface Article {
  title: string
  description: string
  link: string
  source: string
  published_at: string
  image?: string
  is_trending?: boolean
  is_important?: boolean
}

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  channel: string
  published_at: string
}

export async function fetchAllNews(): Promise<Article[]> {
  const response = await fetch(`${API_URL}/news/all`, { next: { revalidate: 300 } })
  const data = await response.json()
  return data.articles || []
}

export async function fetchTrendingNews(): Promise<Article[]> {
  const response = await fetch(`${API_URL}/news/trending`, { next: { revalidate: 300 } })
  const data = await response.json()
  return data.articles || []
}

export async function fetchImportantNews(): Promise<Article[]> {
  const response = await fetch(`${API_URL}/news/important`, { next: { revalidate: 300 } })
  const data = await response.json()
  return data.articles || []
}

export async function fetchVideos(category?: string): Promise<Video[]> {
  const url = category 
    ? `${API_URL}/videos?category=${category}`
    : `${API_URL}/videos`
  const response = await fetch(url, { next: { revalidate: 300 } })
  const data = await response.json()
  return data.videos || []
}

export async function search(query: string): Promise<{ news: Article[], videos: Video[] }> {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`)
  const data = await response.json()
  return {
    news: data.news || [],
    videos: data.videos || []
  }
}

