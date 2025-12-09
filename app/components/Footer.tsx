export default function Footer() {
  return (
    <footer className="bg-[#0A1A3A] text-white py-8 mt-16">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI News Hub</h3>
            <p className="text-gray-300">
              Your source for the latest AI news, research, and videos from top sources around the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-[#4A6FF3] transition">Home</a></li>
              <li><a href="/news" className="hover:text-[#4A6FF3] transition">All News</a></li>
              <li><a href="/videos" className="hover:text-[#4A6FF3] transition">Videos</a></li>
              <li><a href="/sources" className="hover:text-[#4A6FF3] transition">Sources</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Sources</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>OpenAI Blog</li>
              <li>DeepMind Blog</li>
              <li>Anthropic Blog</li>
              <li>TechCrunch AI</li>
              <li>Google News</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#112B54] mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AI News Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

