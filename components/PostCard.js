'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ post, currentUserId, onDelete, onLikeToggle }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const isLiked = post.likes.includes(currentUserId);
  const isAuthor = post.author.id === currentUserId;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDelete(post.id);
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLike = async () => {
    // Optimistic UI update
    const newLikes = isLiked
      ? post.likes.filter((id) => id !== currentUserId)
      : [...post.likes, currentUserId];
    
    onLikeToggle(post.id, newLikes, newLikes.length);

    setIsLiking(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/like`, {
        method: 'PATCH',
      });

      if (!res.ok) {
        // Revert on error
        onLikeToggle(post.id, post.likes, post.likesCount);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
      // Revert on error
      onLikeToggle(post.id, post.likes, post.likesCount);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href={`/user/${post.author.id}`} className="flex items-center space-x-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{post.author.name}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </Link>

        {isAuthor && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>

      {/* Image */}
      <div className="relative w-full h-96">
        <Image
          src={post.imageUrl}
          alt={post.caption}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center space-x-2 disabled:opacity-50"
        >
          <span className="text-2xl">
            {isLiked ? '❤️' : '🤍'}
          </span>
          <span className="font-semibold text-gray-900">
            {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
          </span>
        </button>

        <div className="mt-3">
          <p className="text-gray-900">
            <span className="font-semibold mr-2">{post.author.name}</span>
            {post.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
