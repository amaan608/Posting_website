# 🖼️ HOW TO GET CLOUDINARY CREDENTIALS

## Step 1: Sign Up

1. Go to: **https://cloudinary.com/**
2. Click "Sign Up" (top right)
3. Fill in your details OR sign up with Google
4. **Choose the FREE plan** (it's enough for your app)

## Step 2: Get Your Credentials

After signing up, you'll see your **Dashboard**

You'll see a box that says **"Account Details"** with:

```
Cloud Name: dxxxxxxxxxxx
API Key: 123456789012345
API Secret: AbCdEfGhIjKlMnOpQrStUvWxYz
```

## Step 3: Copy to .env.local

Replace these lines in your `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz
```

## Example (with fake values):

```env
CLOUDINARY_CLOUD_NAME=demo-cloud-123
CLOUDINARY_API_KEY=987654321098765
CLOUDINARY_API_SECRET=Xy9_abcDEF123ghiJKL456mnoPQR
```

## ⚠️ Important Notes:

- **Don't share** these credentials publicly
- Keep them in `.env.local` (already in .gitignore)
- Free plan includes:
  - 25 GB storage
  - 25 GB bandwidth/month
  - Perfect for development & small apps!

## 📍 Where to Find After Login:

1. Go to: https://cloudinary.com/console
2. Look at top left - you'll see:
   - **Cloud Name**
   - **API Key** 
   - **API Secret** (click eye icon to reveal)

---

**That's it!** Once you add these to `.env.local`, image uploads will work! 🎉
