# Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Step 1: Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The backend will run on `http://localhost:8000`

### Step 2: Frontend Setup

```bash
# From project root
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### Step 3: Optional API Keys

Create `backend/.env`:
```
NEWSAPI_KEY=your_key_here
BING_API_KEY=your_key_here
YOUTUBE_API_KEY=your_key_here
```

**Note**: The app works without API keys! RSS feeds are used by default.

## 📝 Features

✅ News aggregation from multiple RSS feeds
✅ Smart categorization (Trending, Important)
✅ YouTube video integration
✅ Search functionality
✅ Beautiful navy-blue UI
✅ Responsive design
✅ In-memory caching

## 🎯 Usage

1. **Home Page**: View trending, important, and all news
2. **Videos Page**: Browse AI videos with category filters
3. **Search Page**: Search across all content
4. **Article Detail**: Click any news card to view full article

## 🔧 Troubleshooting

**Backend not starting?**
- Check Python version: `python --version`
- Install dependencies: `pip install -r requirements.txt`

**Frontend not starting?**
- Check Node version: `node --version`
- Install dependencies: `npm install`

**No data showing?**
- Ensure backend is running on port 8000
- Check browser console for errors
- Verify RSS feeds are accessible

## 📚 API Documentation

Once backend is running, visit:
- `http://localhost:8000/docs` - Swagger UI
- `http://localhost:8000/redoc` - ReDoc

