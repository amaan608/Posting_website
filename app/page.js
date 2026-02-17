import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4">📸 PostingApp</h1>
        <p className="text-xl mb-8 text-blue-100">
          Share your moments with the world
        </p>
        
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-4xl mb-3">📷</div>
            <h3 className="font-semibold mb-2">Share Photos</h3>
            <p className="text-sm text-blue-100">Upload and share your favorite moments</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="font-semibold mb-2">Like & Engage</h3>
            <p className="text-sm text-blue-100">Connect with others through likes</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-semibold mb-2">Discover</h3>
            <p className="text-sm text-blue-100">Explore posts from the community</p>
          </div>
        </div>
      </div>
    </div>
  );
}
