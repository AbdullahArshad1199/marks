import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getArticle(url: string) {
  try {
    const allRes = await fetch(`${apiUrl}/news/all`, { next: { revalidate: 300 } })
    const data = await allRes.json()
    const articles = data.articles || []
    return articles.find((a: any) => a.link === decodeURIComponent(url))
  } catch {
    return null
  }
}

async function getArticleContent(articleUrl: string) {
  try {
    const contentRes = await fetch(`${apiUrl}/news/content?url=${encodeURIComponent(articleUrl)}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    const contentData = await contentRes.json()
    return contentData.content || null
  } catch {
    return null
  }
}

async function getRelatedArticles(currentUrl: string) {
  try {
    const allRes = await fetch(`${apiUrl}/news/all`, { next: { revalidate: 300 } })
    const data = await allRes.json()
    const articles = data.articles || []
    // Get articles from same source or similar topics
    const current = articles.find((a: any) => a.link === decodeURIComponent(currentUrl))
    if (!current) return []
    
    return articles
      .filter((a: any) => a.link !== currentUrl && (a.source === current.source || 
        a.title.toLowerCase().split(' ').some((word: string) => 
          current.title.toLowerCase().includes(word) && word.length > 4
        )))
      .slice(0, 3)
  } catch {
    return []
  }
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(params.slug)
  const fullContent = await getArticleContent(article.link)

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Recent'
    }
  }

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
    
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    const index = Math.abs(hash) % aiImages.length
    return aiImages[index]
  }

  return (
    <div className="container mx-auto px-8 md:px-12 lg:px-16 py-8">
      <Link 
        href="/"
        className="inline-flex items-center text-[#4A6FF3] hover:text-[#1F3F7F] mb-6"
      >
        ← Back to Home
      </Link>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-[#4A6FF3] bg-[#EEF2FF] px-4 py-2 rounded-full">
              {article.source}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(article.published_at)}
            </span>
          </div>
          
          {(article.is_trending || article.is_important) && (
            <div className="flex gap-2 mb-4">
              {article.is_trending && (
                <span className="bg-[#4A6FF3] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  🔥 Trending
                </span>
              )}
              {article.is_important && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ⭐ Important
                </span>
              )}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1A3A] mb-6">
            {article.title}
          </h1>
        </div>

        {/* Image */}
        <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-[#0A1A3A] to-[#1F3F7F]">
          <Image
            src={article.image || getFallbackImage(article.title)}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {/* Summary/Description */}
          <div className="bg-[#EEF2FF] p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold text-[#0A1A3A] mb-4">Summary</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {article.description}
            </p>
          </div>

          {/* Full Article Content */}
          {fullContent ? (
            <div className="bg-white p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold text-[#0A1A3A] mb-6">Full Article</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {fullContent.split('\n\n').map((paragraph: string, index: number) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-base">
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-8">
              <p className="text-gray-700 mb-4">
                Full article content could not be loaded automatically.
              </p>
            </div>
          )}
          
          {/* Source Link */}
          <div className="bg-[#EEF2FF] p-6 rounded-xl mb-8">
            <p className="text-gray-700">
              <strong>Read the original article:</strong>{' '}
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#4A6FF3] hover:underline break-all"
              >
                {article.link}
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Source: <span className="font-semibold">{article.source}</span>
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-bold text-[#0A1A3A] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related: any, index: number) => (
                <Link
                  key={index}
                  href={`/news/${encodeURIComponent(related.link)}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
                >
                  <h3 className="font-bold text-[#0A1A3A] mb-2 hover:text-[#4A6FF3] transition line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {related.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{related.source}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}

