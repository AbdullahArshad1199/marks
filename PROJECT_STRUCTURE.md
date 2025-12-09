# AI News Hub - Project Structure

## 📁 Complete File Tree

```
ai-news-hub/
├── backend/                          # FastAPI Backend
│   ├── main.py                      # FastAPI app entry point
│   ├── requirements.txt             # Python dependencies
│   ├── README.md                    # Backend documentation
│   ├── routers/                     # API route handlers
│   │   ├── __init__.py
│   │   ├── news.py                  # News endpoints (/news/all, /news/trending, /news/important)
│   │   ├── videos.py                # Video endpoints (/videos)
│   │   └── search.py                # Search endpoint (/search?q=)
│   └── utils/                       # Utility modules
│       ├── __init__.py
│       ├── cache.py                 # In-memory caching (12 min TTL)
│       ├── clean_data.py            # Data cleaning & categorization
│       ├── fetch_rss.py             # RSS feed fetching
│       ├── fetch_newsapi.py         # NewsAPI & Bing News integration
│       └── fetch_youtube.py         # YouTube API integration
│
├── app/                             # Next.js 14 Frontend (App Router)
│   ├── layout.tsx                   # Root layout with Navbar & Footer
│   ├── page.tsx                     # Home page
│   ├── globals.css                  # Global styles (navy-blue theme)
│   ├── not-found.tsx                # 404 page
│   ├── components/                  # React components
│   │   ├── Navbar.tsx               # Sticky navigation bar
│   │   ├── Footer.tsx               # Footer component
│   │   ├── NewsCard.tsx             # News article card
│   │   ├── NewsGrid.tsx             # News grid layout
│   │   ├── NewsList.tsx             # Infinite scroll news list
│   │   ├── TrendingSlider.tsx       # Horizontal trending slider
│   │   ├── VideoCard.tsx            # Video card with modal
│   │   └── LoadingSpinner.tsx       # Loading indicator
│   ├── videos/                      # Videos page
│   │   └── page.tsx                 # Videos page with filters
│   ├── search/                      # Search page
│   │   └── page.tsx                 # Search interface
│   ├── news/                        # News detail pages
│   │   └── [slug]/
│   │       ├── page.tsx             # Article detail page
│   │       └── not-found.tsx        # Article not found
│   └── lib/                         # Utilities
│       └── api.ts                   # API client functions
│
├── package.json                     # Frontend dependencies
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── next.config.js                   # Next.js configuration
├── .gitignore                       # Git ignore rules
├── README.md                        # Main project documentation
└── QUICKSTART.md                    # Quick start guide
```

## 🎯 Key Features Implemented

### Backend (FastAPI)
✅ RSS feed aggregation (Google News, TechCrunch, OpenAI, DeepMind, Anthropic)
✅ Optional NewsAPI & Bing News integration
✅ YouTube video fetching with fallback mock data
✅ Smart news categorization (Trending, Important)
✅ In-memory caching (12-minute TTL)
✅ Data deduplication
✅ Clean, modular architecture

### Frontend (Next.js 14)
✅ Home page with trending slider, important grid, all news list
✅ Videos page with category filters (Talks, Demos, Research)
✅ Search page with real-time search
✅ Article detail pages with related articles
✅ Navy-blue color scheme (#0A1A3A, #4A6FF3, etc.)
✅ Responsive design
✅ Loading states and error handling
✅ SEO-friendly pages

## 🚀 API Endpoints

- `GET /news/all` - All news articles
- `GET /news/trending` - Trending news (last 12 hours, multiple sources, viral keywords)
- `GET /news/important` - Important news (keywords, major labs)
- `GET /videos` - All videos
- `GET /videos?category=talks` - Filtered videos
- `GET /search?q=query` - Search news and videos

## 🎨 Design System

**Colors:**
- Primary Navy: `#0A1A3A`
- Secondary Navy: `#112B54`
- Tertiary Navy: `#1F3F7F`
- Accent Blue: `#4A6FF3`
- Light Background: `#EEF2FF`

**Typography:** Inter font family

**Components:**
- Rounded cards with shadows
- Smooth hover transitions
- Sticky navbar
- Modal video player

## 📦 Dependencies

### Backend
- fastapi
- uvicorn
- httpx
- feedparser

### Frontend
- next.js 14
- react 18
- tailwindcss
- typescript

## 🔧 Configuration

**Backend:** Works without API keys (RSS feeds by default)
**Frontend:** Connects to `http://localhost:8000` by default

Set `NEXT_PUBLIC_API_URL` for production deployment.

