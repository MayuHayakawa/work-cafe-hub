"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";

import Post from "../models/post.model";
import User from "../models/user.model";

interface Params {
  id?: string,
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

export async function fetchPost(id: string) {
  try {
    connectToDB();

    return await Post.findById(id);

  } catch(error: any) {
    throw new Error(`Error fetching post: ${error.message}`);
  }
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

export async function deletePost({
  id,
  currentUserId
}:{
  id: string,
  currentUserId: string
}) {
  try {
    connectToDB();

    await Post.findByIdAndDelete(id);

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { posts: id }
    });

  } catch(error: any) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
}

export async function updatePost({
  id,
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
  try {
    connectToDB();

    await Post.findByIdAndUpdate(
      id,
      {
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
      },
      { upsert: true }
    );

  } catch(error: any) {
    throw new Error(`Failed to update post: ${error.message}`)
  }
}

export async function goodToPost({
  id,
  currentUserId,
}:{
  id: string,
  currentUserId: string,
}) {
  try{
    connectToDB();

    const post = await Post.findById(id);
    // const user = await User.findById(currentUserId);

    if(!post.good.includes(currentUserId)) {
      console.log("add");
      await Post.findByIdAndUpdate(id, {
        $push: { good: currentUserId } // Use the _id field of the user document
      });
      await User.findByIdAndUpdate(currentUserId, {
        $push: { goods: id}
      });
    } else {
      console.log('remove')
      await Post.findByIdAndUpdate(id, {
        $pull: { good: currentUserId }
      })
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { goods: id}
      });
    }
  } catch(error: any) {
    throw new Error(`Error gooding post: ${error.message}`);
  }
}