import TrendingSlider from './components/TrendingSlider'
import NewsGrid from './components/NewsGrid'
import NewsList from './components/NewsList'

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  let trending = { articles: [] }
  let important = { articles: [] }
  let all = { articles: [] }

  try {
    // Fetch data with better error handling
    const [trendingRes, importantRes, allRes] = await Promise.allSettled([
      fetch(`${apiUrl}/news/trending`, { 
        next: { revalidate: 300 }
      }),
      fetch(`${apiUrl}/news/important`, { 
        next: { revalidate: 300 }
      }),
      fetch(`${apiUrl}/news/all`, { 
        next: { revalidate: 300 }
      }),
    ])

    if (trendingRes.status === 'fulfilled' && trendingRes.value.ok) {
      trending = await trendingRes.value.json().catch(() => ({ articles: [] }))
    }
    if (importantRes.status === 'fulfilled' && importantRes.value.ok) {
      important = await importantRes.value.json().catch(() => ({ articles: [] }))
    }
    if (allRes.status === 'fulfilled' && allRes.value.ok) {
      all = await allRes.value.json().catch(() => ({ articles: [] }))
    }
  } catch (error) {
    console.error('Error fetching news:', error)
  }

  return (
    <div className="container mx-auto px-8 md:px-12 lg:px-16 py-8">
      {/* Hero Section - Always visible */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#0A1A3A] mb-4">
          AI News Hub
        </h1>
        <p className="text-xl text-[#1F3F7F] max-w-2xl mx-auto">
          Stay updated with the latest AI news, breakthroughs, and research from top sources
        </p>
      </div>

      {/* Trending Slider */}
      {trending.articles && trending.articles.length > 0 ? (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A3A] mb-6">🔥 Trending Now</h2>
          <TrendingSlider articles={trending.articles.slice(0, 15)} />
        </section>
      ) : (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A3A] mb-6">🔥 Trending Now</h2>
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600">Loading trending news...</p>
            {trending.error && (
              <p className="text-sm text-red-500 mt-2">Error: {trending.error}</p>
            )}
          </div>
        </section>
      )}

      {/* Important News Grid */}
      {important.articles && important.articles.length > 0 ? (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A3A] mb-6">⭐ Important News</h2>
          <NewsGrid articles={important.articles.slice(0, 6)} />
        </section>
      ) : (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A3A] mb-6">⭐ Important News</h2>
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600">Loading important news...</p>
          </div>
        </section>
      )}

      {/* All News List */}
      {all.articles && all.articles.length > 0 ? (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A3A] mb-6">📰 All News</h2>
          <NewsList articles={all.articles} />
        </section>
      ) : (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A3A] mb-6">📰 All News</h2>
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600">Loading news articles...</p>
            <p className="text-sm text-gray-500 mt-2">Make sure the backend server is running on port 8000</p>
          </div>
        </section>
      )}
    </div>
  )
}

