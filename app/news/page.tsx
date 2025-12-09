'use client'

import { useState, useEffect } from 'react'
import NewsCard from '../components/NewsCard'
import LoadingSpinner from '../components/LoadingSpinner'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type SortOption = 'latest' | 'oldest' | 'trending' | 'important'

export default function AllNewsPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [filteredArticles, setFilteredArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const [displayCount, setDisplayCount] = useState(20)

  useEffect(() => {
    fetchAllNews()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
  }, [articles, sortBy, searchQuery])

  const fetchAllNews = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${apiUrl}/news/all`)
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = () => {
    let filtered = [...articles]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article => 
        article.title?.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.source?.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => {
          const dateA = new Date(a.published_at || 0).getTime()
          const dateB = new Date(b.published_at || 0).getTime()
          return dateB - dateA
        })
        break
      case 'oldest':
        filtered.sort((a, b) => {
          const dateA = new Date(a.published_at || 0).getTime()
          const dateB = new Date(b.published_at || 0).getTime()
          return dateA - dateB
        })
        break
      case 'trending':
        filtered = filtered.filter(a => a.is_trending)
        filtered.sort((a, b) => {
          const dateA = new Date(a.published_at || 0).getTime()
          const dateB = new Date(b.published_at || 0).getTime()
          return dateB - dateA
        })
        break
      case 'important':
        filtered = filtered.filter(a => a.is_important)
        filtered.sort((a, b) => {
          const dateA = new Date(a.published_at || 0).getTime()
          const dateB = new Date(b.published_at || 0).getTime()
          return dateB - dateA
        })
        break
    }

    setFilteredArticles(filtered)
    setDisplayCount(20) // Reset display count when filters change
  }

  const loadMore = () => {
    setDisplayCount(prev => prev + 20)
  }

  const displayedArticles = filteredArticles.slice(0, displayCount)
  const hasMore = displayCount < filteredArticles.length

  if (loading) {
    return (
      <div className="container mx-auto px-8 md:px-12 lg:px-16 py-8">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-8 md:px-12 lg:px-16 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0A1A3A] mb-4">All News</h1>
        <p className="text-lg text-[#1F3F7F]">
          Browse all AI news articles from all sources
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-[#1F3F7F] rounded-lg focus:border-[#4A6FF3] focus:outline-none"
            />
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSortBy('latest')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                sortBy === 'latest'
                  ? 'bg-[#4A6FF3] text-white'
                  : 'bg-[#EEF2FF] text-[#0A1A3A] hover:bg-[#1F3F7F] hover:text-white'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy('oldest')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                sortBy === 'oldest'
                  ? 'bg-[#4A6FF3] text-white'
                  : 'bg-[#EEF2FF] text-[#0A1A3A] hover:bg-[#1F3F7F] hover:text-white'
              }`}
            >
              Oldest
            </button>
            <button
              onClick={() => setSortBy('trending')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                sortBy === 'trending'
                  ? 'bg-[#4A6FF3] text-white'
                  : 'bg-[#EEF2FF] text-[#0A1A3A] hover:bg-[#1F3F7F] hover:text-white'
              }`}
            >
              🔥 Trending
            </button>
            <button
              onClick={() => setSortBy('important')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                sortBy === 'important'
                  ? 'bg-[#4A6FF3] text-white'
                  : 'bg-[#EEF2FF] text-[#0A1A3A] hover:bg-[#1F3F7F] hover:text-white'
              }`}
            >
              ⭐ Important
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {displayedArticles.length} of {filteredArticles.length} articles
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </div>

      {/* Articles Grid */}
      {displayedArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-8">
            {displayedArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={loadMore}
                className="bg-[#4A6FF3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1F3F7F] transition shadow-md"
              >
                Load More ({filteredArticles.length - displayCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-600 text-lg">No articles found</p>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Try a different search term or clear the search
            </p>
          )}
        </div>
      )}
    </div>
  )
}

