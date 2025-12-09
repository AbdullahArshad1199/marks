import Link from 'next/link'

export default function NewsNotFound() {
  return (
    <div className="container mx-auto px-8 md:px-12 lg:px-16 py-16 text-center">
      <h1 className="text-6xl font-bold text-[#0A1A3A] mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-[#1F3F7F] mb-6">Article Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The article you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#4A6FF3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1F3F7F] transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}

