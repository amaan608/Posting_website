import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  caption: {
    type: String,
    required: [true, 'Caption is required'],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image is required'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
PostSchema.index({ createdAt: -1 });
PostSchema.index({ author: 1 });

// Prevent model recompilation in development
export default mongoose.models.Post || mongoose.model('Post', PostSchema);
