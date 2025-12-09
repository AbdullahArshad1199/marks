'use client'

import { useState } from 'react'
import NewsCard from './NewsCard'

interface NewsListProps {
  articles: Array<{
    title: string
    description: string
    link: string
    source: string
    published_at: string
    image?: string
    is_trending?: boolean
    is_important?: boolean
  }>
}

export default function NewsList({ articles }: NewsListProps) {
  const [displayCount, setDisplayCount] = useState(12)

  const loadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  const displayedArticles = articles.slice(0, displayCount)
  const hasMore = displayCount < articles.length

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-8">
        {displayedArticles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
      
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="bg-[#4A6FF3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1F3F7F] transition shadow-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

