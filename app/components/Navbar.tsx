'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, userEmail, logout } = useUser()

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0A1A3A] shadow-lg">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white hover:text-[#4A6FF3] transition">
            AI News Hub
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/')
                  ? 'bg-[#4A6FF3] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#112B54]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/news"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/news')
                  ? 'bg-[#4A6FF3] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#112B54]'
              }`}
            >
              All News
            </Link>
            <Link
              href="/videos"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/videos')
                  ? 'bg-[#4A6FF3] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#112B54]'
              }`}
            >
              Videos
            </Link>
            <Link
              href="/sources"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/sources')
                  ? 'bg-[#4A6FF3] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#112B54]'
              }`}
            >
              Sources
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg transition text-gray-300 hover:text-white hover:bg-[#112B54]"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={`px-4 py-2 rounded-lg transition ${
                  isActive('/login')
                    ? 'bg-[#4A6FF3] text-white'
                    : 'text-gray-300 hover:text-white hover:bg-[#112B54]'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

