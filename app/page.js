import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4 text-gray-900">📸 PostingApp</h1>
        <p className="text-xl mb-8 text-gray-600">
          Share your moments with the world
        </p>
        
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-3">📷</div>
            <h3 className="font-semibold mb-2 text-gray-900">Share Photos</h3>
            <p className="text-sm text-gray-600">Upload and share your favorite moments</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="font-semibold mb-2 text-gray-900">Like & Engage</h3>
            <p className="text-sm text-gray-600">Connect with others through likes</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-semibold mb-2 text-gray-900">Discover</h3>
            <p className="text-sm text-gray-600">Explore posts from the community</p>
          </div>
        </div>
      </div>
    </div>
  );
}
