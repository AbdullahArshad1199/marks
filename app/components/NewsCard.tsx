'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
  article: {
    title: string
    description: string
    link: string
    source: string
    published_at: string
    image?: string
    is_trending?: boolean
    is_important?: boolean
  }
  variant?: 'default' | 'large'
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
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

  const isLarge = variant === 'large'
  
  // Generate unique fallback image based on article title
  const getFallbackImage = (title: string) => {
    const aiImages = [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    ]
    
    // Simple hash function to get consistent index
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % aiImages.length
    return aiImages[index]
  }
  
  const imageUrl = article.image || getFallbackImage(article.title)

  return (
    <Link 
      href={`/news/${encodeURIComponent(article.link)}`}
      className={`block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-sm mx-auto ${
        isLarge ? 'h-full' : ''
      }`}
    >
      <div className={`relative ${isLarge ? 'h-64' : 'h-40'} w-full overflow-hidden bg-gradient-to-br from-[#0A1A3A] to-[#1F3F7F]`}>
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {(article.is_trending || article.is_important) && (
          <div className="absolute top-4 right-4 z-10">
            {article.is_trending && (
              <span className="bg-[#4A6FF3] text-white px-3 py-1 rounded-full text-xs font-semibold">
                🔥 Trending
              </span>
            )}
            {article.is_important && (
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold ml-2">
                ⭐ Important
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className={`${isLarge ? 'p-6 flex flex-col h-full' : 'p-4'} ${isLarge ? '' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`${isLarge ? 'text-sm' : 'text-xs'} font-semibold text-[#4A6FF3]`}>{article.source}</span>
          <span className="text-xs text-gray-500">{formatDate(article.published_at)}</span>
        </div>
        
        <h3 className={`font-bold text-[#0A1A3A] mb-2 group-hover:text-[#4A6FF3] transition ${
          isLarge ? 'text-2xl' : 'text-base'
        } line-clamp-2`}>
          {article.title}
        </h3>
        
        <p className={`text-gray-600 ${isLarge ? 'text-base mb-4 flex-grow' : 'text-xs'} line-clamp-2`}>
          {article.description}
        </p>
        
        <div className={`${isLarge ? 'mt-4' : 'mt-2'} text-[#4A6FF3] font-semibold ${isLarge ? 'text-sm' : 'text-xs'} group-hover:underline`}>
          Read more →
        </div>
      </div>
    </Link>
  )
}

