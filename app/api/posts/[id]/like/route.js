import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Post from '@/models/Post';

/**
 * PATCH /api/posts/[id]/like
 * Toggle like/unlike on a post
 * Prevents duplicate likes
 * Requires authentication
 */
export async function PATCH(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await params (Next.js 15+)
    const { id } = await params;
    const userId = session.user.id;

    await connectDB();

    // Find the post
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if user already liked the post
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike: remove user from likes array
      post.likes.splice(likeIndex, 1);
    } else {
      // Like: add user to likes array
      post.likes.push(userId);
    }

    await post.save();

    return NextResponse.json(
      {
        message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
        likes: post.likes.map((id) => id.toString()),
        likesCount: post.likes.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Like toggle error:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
