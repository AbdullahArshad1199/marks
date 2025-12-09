'use client'

import { useState } from 'react'
import Image from 'next/image'

interface VideoCardProps {
  video: {
    id: string
    title: string
    description: string
    thumbnail: string
    channel: string
    published_at: string
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  const [showModal, setShowModal] = useState(false)

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    } catch {
      return 'Recent'
    }
  }

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition">
            <div className="w-16 h-16 rounded-full bg-[#4A6FF3] flex items-center justify-center">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#4A6FF3]">{video.channel}</span>
            <span className="text-xs text-gray-500">{formatDate(video.published_at)}</span>
          </div>
          
          <h3 className="font-bold text-[#0A1A3A] mb-2 group-hover:text-[#4A6FF3] transition line-clamp-2">
            {video.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#0A1A3A]">{video.title}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            <div className="mt-4">
              <p className="text-gray-600">{video.description}</p>
              <p className="text-sm text-gray-500 mt-2">Channel: {video.channel}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

