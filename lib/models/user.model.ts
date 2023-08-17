"use server"

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  image: String,
  bio: String,
  github: String,
  linkedin: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  follows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  goods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  onboarded: {
    type: Boolean,
    default: false
  },
  onsetting: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;