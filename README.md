# PostingApp - Instagram-like Social Media Platform 📸

A production-ready social media posting application built with Next.js, MongoDB, NextAuth, and Cloudinary.

## 🚀 Features

- ✅ **User Authentication**: Secure login/register with NextAuth & JWT
- ✅ **Post Creation**: Upload photos with captions to Cloudinary
- ✅ **Like System**: Like/unlike posts with optimistic UI updates
- ✅ **Feed**: Browse all posts sorted by newest first
- ✅ **Delete Posts**: Authors can delete their own posts
- ✅ **Responsive Design**: Beautiful UI with TailwindCSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS
- **Authentication**: NextAuth (JWT strategy)
- **Database**: MongoDB with Mongoose
- **Image Upload**: Cloudinary
- **Password Hashing**: bcryptjs

## 📦 Installation

**Install missing dependency**:
```bash
npm install date-fns
```

## ⚙️ Environment Setup

Update your `.env.local` file with real credentials:

```env
# MongoDB - Use your own database
MONGODB_URI=mongodb://localhost:27017/posting-website
# OR MongoDB Atlas: mongodb+srv://<user>:<pass>@cluster.mongodb.net/posting-website

# NextAuth - Generate secret with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key-here

# Cloudinary - Get from cloudinary.com dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 📁 Project Structure

```
posting-website/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js  # NextAuth
│   │   ├── register/route.js            # Registration
│   │   └── posts/                       # Post CRUD + Like
│   ├── feed/page.js                     # Main feed
│   ├── login/page.js                    # Login
│   ├── register/page.js                 # Register
│   └── page.js                          # Landing page
├── components/
│   ├── AuthProvider.js                  # NextAuth wrapper
│   ├── CreatePost.js                    # Create post modal
│   ├── Navbar.js                        # Navigation
│   └── PostCard.js                      # Post component
├── lib/
│   ├── db.js                            # MongoDB connection
│   └── cloudinary.js                    # Cloudinary config
└── models/
    ├── User.js                          # User schema
    └── Post.js                          # Post schema
```

## 🔐 API Routes

- `POST /api/register` - Register user
- `POST /api/auth/signin` - Login
- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create post (auth required)
- `DELETE /api/posts/[id]` - Delete post (author only)
- `PATCH /api/posts/[id]/like` - Toggle like

## 📝 Usage Flow

1. Visit `/register` to create account
2. Login at `/login`
3. Browse posts at `/feed`
4. Click "Create Post" to upload
5. Like/unlike posts with ❤️
6. Delete your own posts

---

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
