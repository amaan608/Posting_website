'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch current user's posts
  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserPosts();
    }
  }, [status]);

  const fetchUserPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      const myPosts = (data.posts || []).filter(
        (post) => post.author.id === session.user.id
      );
      setPosts(myPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
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

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <ProfileCard user={session.user} posts={posts} />

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posts</h2>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts yet</p>
              <p className="text-gray-400 mt-2">Head to the feed to create your first post!</p>
            </div>
          ) : (
            <div className="space-y-6">
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
        </div>
      </main>
    </div>
  );
}