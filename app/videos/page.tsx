'use client'

import { useState, useEffect } from 'react'
import VideoCard from '../components/VideoCard'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [filteredVideos, setFilteredVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    if (category) {
      fetchVideosByCategory(category)
    } else {
      setFilteredVideos(videos)
    }
  }, [category, videos])

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${apiUrl}/videos`)
      const data = await response.json()
      setVideos(data.videos || [])
      setFilteredVideos(data.videos || [])
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchVideosByCategory = async (cat: string) => {
    try {
      const response = await fetch(`${apiUrl}/videos?category=${cat}`)
      const data = await response.json()
      setFilteredVideos(data.videos || [])
    } catch (error) {
      console.error('Error fetching videos by category:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 md:px-12 lg:px-16 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6FF3]"></div>
          <p className="mt-4 text-gray-600">Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-8 md:px-12 lg:px-16 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#0A1A3A] mb-4">
          AI Videos
        </h1>
        <p className="text-xl text-[#1F3F7F] max-w-2xl mx-auto">
          Watch the latest AI research, talks, demos, and announcements
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setCategory(null)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            category === null
              ? 'bg-[#4A6FF3] text-white'
              : 'bg-white text-[#0A1A3A] hover:bg-[#EEF2FF]'
          }`}
        >
          All Videos
        </button>
        <button
          onClick={() => setCategory('talks')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            category === 'talks'
              ? 'bg-[#4A6FF3] text-white'
              : 'bg-white text-[#0A1A3A] hover:bg-[#EEF2FF]'
          }`}
        >
          Talks
        </button>
        <button
          onClick={() => setCategory('demos')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            category === 'demos'
              ? 'bg-[#4A6FF3] text-white'
              : 'bg-white text-[#0A1A3A] hover:bg-[#EEF2FF]'
          }`}
        >
          Demos
        </button>
        <button
          onClick={() => setCategory('research')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            category === 'research'
              ? 'bg-[#4A6FF3] text-white'
              : 'bg-white text-[#0A1A3A] hover:bg-[#EEF2FF]'
          }`}
        >
          Research
        </button>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <VideoCard key={video.id || index} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No videos found in this category.</p>
        </div>
      )}
    </div>
  )
}

