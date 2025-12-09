'use client'

import { useState, useEffect, useMemo } from 'react'
import NewsCard from '../components/NewsCard'
import LoadingSpinner from '../components/LoadingSpinner'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function SourcesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSource, setSelectedSource] = useState<string>('all')
  const [displayCount, setDisplayCount] = useState(20)

  useEffect(() => {
    fetchAllNews()
  }, [])

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

  // Get unique sources from articles
  const sources = useMemo(() => {
    const sourceSet = new Set<string>()
    articles.forEach(article => {
      if (article.source) {
        sourceSet.add(article.source)
      }
    })
    return Array.from(sourceSet).sort()
  }, [articles])

  // Filter articles by selected source
  const filteredArticles = useMemo(() => {
    if (selectedSource === 'all') {
      return articles
    }
    return articles.filter(article => article.source === selectedSource)
  }, [articles, selectedSource])

  // Sort filtered articles by date
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort((a, b) => {
      const dateA = new Date(a.published_at || 0).getTime()
      const dateB = new Date(b.published_at || 0).getTime()
      return dateB - dateA
    })
  }, [filteredArticles])

  const displayedArticles = sortedArticles.slice(0, displayCount)
  const hasMore = displayCount < sortedArticles.length

  const loadMore = () => {
    setDisplayCount(prev => prev + 20)
  }

  // Count articles per source
  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    articles.forEach(article => {
      const source = article.source || 'Unknown'
      counts[source] = (counts[source] || 0) + 1
    })
    return counts
  }, [articles])

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
        <h1 className="text-4xl font-bold text-[#0A1A3A] mb-4">News Sources</h1>
        <p className="text-lg text-[#1F3F7F]">
          Filter news articles by source. Browse articles from your favorite AI news sources.
        </p>
      </div>

      {/* Source Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#0A1A3A] mb-4">Filter by Source</h2>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSelectedSource('all')
              setDisplayCount(20)
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              selectedSource === 'all'
                ? 'bg-[#4A6FF3] text-white'
                : 'bg-[#EEF2FF] text-[#0A1A3A] hover:bg-[#1F3F7F] hover:text-white'
            }`}
          >
            All Sources ({articles.length})
          </button>
          
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => {
                setSelectedSource(source)
                setDisplayCount(20)
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedSource === source
                  ? 'bg-[#4A6FF3] text-white'
                  : 'bg-[#EEF2FF] text-[#0A1A3A] hover:bg-[#1F3F7F] hover:text-white'
              }`}
            >
              {source} ({sourceCounts[source] || 0})
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-sm text-gray-600">
          Showing {displayedArticles.length} of {sortedArticles.length} articles
          {selectedSource !== 'all' && ` from ${selectedSource}`}
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
                Load More ({sortedArticles.length - displayCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-600 text-lg">No articles found for this source.</p>
        </div>
      )}

      {/* Source Statistics */}
      <div className="mt-16 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-[#0A1A3A] mb-6">Source Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((source) => (
            <div
              key={source}
              className="bg-[#EEF2FF] p-4 rounded-lg hover:bg-[#1F3F7F] hover:text-white transition cursor-pointer"
              onClick={() => {
                setSelectedSource(source)
                setDisplayCount(20)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <h3 className="font-bold text-lg mb-2">{source}</h3>
              <p className="text-sm">
                {sourceCounts[source] || 0} {sourceCounts[source] === 1 ? 'article' : 'articles'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

