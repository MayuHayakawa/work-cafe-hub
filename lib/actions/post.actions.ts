"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";

import Post from "../models/post.model";
import User from "../models/user.model";

interface CreatePostParams {
  cafeName: string,
  cafeUrl: string | undefined,
  cafeLocation: string | undefined,
  cafeImage: string | undefined,
  wifi: string,
  bathroom: string,
  outlet: string,
  comment: string | null,
  author: string,
  path: string
}

interface GoodToPostParams {
  id: string,
  currentUserId: string,
}

export async function fetchPosts(pageNumber = 1, pageSize = 6) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = Post.find()
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: User })

  const totalPostCount = await Post.countDocuments()

  const posts = await postsQuery.exec();

  const isNext = totalPostCount > skipAmount + posts.length;

  return { posts, isNext }
}

export async function createPost({
  cafeName,
  cafeUrl,
  cafeLocation,
  cafeImage,
  wifi,
  bathroom,
  outlet,
  comment,
  author,
  path
}: CreatePostParams) {
  try{
    connectToDB();

    const createdPost = await Post.create({
      cafeName,
      cafeUrl,
      cafeLocation,
      cafeImage,
      wifi,
      bathroom,
      outlet,
      comment,
      author,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id}
    });
  
    revalidatePath(path);
  } catch(error: any) {
    throw new Error(`Error creating post: ${error.message}`);
  }
}

export async function goodToPost({
  id,
  currentUserId,
}: GoodToPostParams) {
  try{
    connectToDB();

    // Check if the user have gooded it, if not, add it to the good list, if so remove it from the list.
    const post = await Post.findById(id);
    const user = await User.findById(currentUserId);

    if(!post.good.includes(currentUserId)) {
      await Post.findByIdAndUpdate(id, {
        $push: { good: user._id }
      });
      await User.findByIdAndUpdate(currentUserId, {
        $push: { goods: post._id}
      });
    } else {
      await Post.findByIdAndUpdate(id, {
        $pull: { good: user._id }
      })
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { goods: post._id}
      });
    }
  } catch(error: any) {
    throw new Error(`Error gooding post: ${error.message}`);
  }
}

