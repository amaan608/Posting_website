# 🚀 SETUP GUIDE

Follow these steps to get your PostingApp running:

## Step 1: Install Dependencies

```bash
npm install date-fns
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB (Recommended for development)
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Your connection string is: `mongodb://localhost:27017/posting-website`

### Option B: MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

## Step 3: Setup Cloudinary

1. Go to https://cloudinary.com/
2. Sign up for a free account
3. Go to your Dashboard
4. Copy these values:
   - Cloud Name
   - API Key
   - API Secret

## Step 4: Configure Environment Variables

Open `.env.local` and update with your real credentials:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/posting-website
# Or: mongodb+srv://username:password@cluster.mongodb.net/posting-website

# NextAuth (Generate with: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paste-your-generated-secret-here

# Cloudinary (from your dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Generate NEXTAUTH_SECRET:

**Windows PowerShell**:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Mac/Linux**:
```bash
openssl rand -base64 32
```

## Step 5: Run the Application

```bash
npm run dev
```

Visit: http://localhost:3000

## 🎯 Quick Test

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Create an account
4. Login
5. Create your first post!

## ⚠️ Common Issues

### MongoDB Connection Failed
- Make sure MongoDB is running
- Check your connection string in `.env.local`

### Cloudinary Upload Error
- Verify your Cloudinary credentials
- Check if file is under 5MB
- Ensure file is an image type

### NextAuth Error
- Make sure `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your localhost

## 📚 Next Steps

- Customize the UI in `components/`
- Add more features (comments, followers, etc.)
- Deploy to Vercel
- Add email verification
- Implement password reset

## 🎨 Customization

### Change Colors
Edit `app/page.js` - Change gradient colors:
```javascript
className="bg-gradient-to-br from-blue-500 to-purple-600"
// Try: from-pink-500 to-orange-500
```

### Change App Name
1. Edit `components/Navbar.js` - Update "PostingApp"
2. Edit `app/layout.js` - Update metadata title

---

Need help? Check the README.md for full documentation!
