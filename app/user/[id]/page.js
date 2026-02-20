'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';
import Navbar from '@/components/Navbar';

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = params.id;
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch user and their posts
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      // Fetch all posts and filter by user
      const res = await fetch('/api/posts');
      const data = await res.json();
      
      if (data.posts && data.posts.length > 0) {
        // Find posts by this user
        const userPosts = data.posts.filter(post => post.author.id === userId);
        
        if (userPosts.length > 0) {
          // Get user info from the first post
          setUser({
            id: userPosts[0].author.id,
            name: userPosts[0].author.name,
            email: userPosts[0].author.email || 'user@example.com'
          });
          setPosts(userPosts);
        } else {
          // User has no posts, we need to find user info another way
          // For now, show a not found message
          setUser(null);
          setPosts([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleLikeToggle = (postId, updatedLikes, likesCount) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: updatedLikes, likesCount }
          : post
      )
    );
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">User not found</p>
            <button
              onClick={() => router.push('/feed')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Feed
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="mb-8">
          <ProfileCard user={user} posts={posts} />
        </div>

        {/* User's Posts */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Posts</h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={session.user.id}
                onDelete={handlePostDeleted}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
