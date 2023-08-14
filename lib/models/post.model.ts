"use server"

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postId: {
    type: String
  },
  cafeName: { 
    type: String, 
    required: true 
  },
  cafeUrl: String,
  cafeImage: String,
  cafeLocation: String,
  wifi: { 
    type: String, 
    required: true 
  },
  bathroom: { 
    type: String, 
    required: true 
  },
  outlet: { 
    type: String, 
    required: true 
  },
  comment:{ 
    type: String, 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  good: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;