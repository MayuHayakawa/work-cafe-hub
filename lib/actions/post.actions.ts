"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";

import Post from "../models/post.model";
import User from "../models/user.model";

interface Params {
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
}: Params) {
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

