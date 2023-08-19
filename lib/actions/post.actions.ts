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

export async function goodToPost({
  id,
  currentUserId,
}:{
  id: string,
  currentUserId: string,
}) {
  try{
    connectToDB();

    // Check if the user have gooded it, if not, add it to the good list, if so remove it from the list.
    const post = await Post.findById(id);
    const user = await User.findOne({ id: currentUserId }); // Use findOne with the id field
    // const user1 = await User.findById(currentUserId);

    // console.log(user);

    if(!post.good.includes(user?._id)) {
      console.log("add");
      await Post.findByIdAndUpdate(id, {
        $push: { good: user._id } // Use the _id field of the user document
      });
      await User.findByIdAndUpdate(user._id, {
        $push: { goods: post._id}
      });
    } else {
      console.log('remove')
      await Post.findByIdAndUpdate(id, {
        $pull: { good: user._id }
      })
      await User.findByIdAndUpdate(user._id, {
        $pull: { goods: post._id}
      });
    }
  } catch(error: any) {
    throw new Error(`Error gooding post: ${error.message}`);
  }
}

export async function deletePost(id: string) {
  try {
    connectToDB();

    await Post.findByIdAndDelete(id);

  } catch(error: any) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
}