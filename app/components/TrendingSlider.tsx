'use client'

import { useRef } from 'react'
import NewsCard from './NewsCard'

interface TrendingSliderProps {
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

export default function TrendingSlider({ articles }: TrendingSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles.slice(0, 10).map((article, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <NewsCard article={article} variant="large" />
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#4A6FF3] text-white p-3 rounded-full shadow-lg hover:bg-[#1F3F7F] transition z-10"
        aria-label="Scroll left"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#4A6FF3] text-white p-3 rounded-full shadow-lg hover:bg-[#1F3F7F] transition z-10"
        aria-label="Scroll right"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

