'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar({ onCreatePost }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/feed" className="text-xl font-bold text-gray-900">
            📸 PostingApp
          </Link>

          <div className="flex items-center space-x-4">
            {session && (
              <>
                <button
                  onClick={onCreatePost}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  + Create
                </button>

                <div className="flex items-center space-x-3">
                  <div className="text-sm cursor-pointer hover:opacity-50 transition-opacity" onClick={() => router.push('/profile')}>
                    <p className="font-medium text-gray-900">{session.user.name}</p>
                    <p className="text-gray-500">{session.user.email}</p>
                  </div>

                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
