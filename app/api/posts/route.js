import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import { uploadImage } from '@/lib/cloudinary';

/**
 * GET /api/posts
 * Fetch all posts sorted by newest first
 */
export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name image email')
      .lean();

    // Transform data for clean JSON response
    const transformedPosts = posts.map((post) => ({
      id: post._id.toString(),
      caption: post.caption,
      imageUrl: post.imageUrl,
      likes: post.likes.map((id) => id.toString()),
      likesCount: post.likes.length,
      createdAt: post.createdAt,
      author: {
        id: post.author._id.toString(),
        name: post.author.name,
        image: post.author.image,
        email: post.author.email,
      },
    }));

    return NextResponse.json({ posts: transformedPosts }, { status: 200 });
  } catch (error) {
    console.error('Fetch posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * Create a new post with image upload
 * Requires authentication
 */
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const caption = formData.get('caption');
    const image = formData.get('image');

    // Validate input
    if (!caption || !image) {
      return NextResponse.json(
        { error: 'Caption and image are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Upload image to Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;
    
    const imageUrl = await uploadImage(base64Image);

    // Create post
    const post = await Post.create({
      author: session.user.id,
      caption,
      imageUrl,
    });

    // Populate author details
    await post.populate('author', 'name image email');

    // Return clean response
    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: {
          id: post._id.toString(),
          caption: post.caption,
          imageUrl: post.imageUrl,
          likes: [],
          likesCount: 0,
          createdAt: post.createdAt,
          author: {
            id: post.author._id.toString(),
            name: post.author.name,
            image: post.author.image,
            email: post.author.email,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
