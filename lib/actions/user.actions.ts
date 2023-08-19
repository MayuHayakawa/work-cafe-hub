"use server"

import { connectToDB } from "../mongoose";
import { revalidatePath } from 'next/cache';

import User from '../models/user.model';
import Post from "../models/post.model";

interface Params {
  userId: string,
  username: string,
  name: string,
  image: string,
  bio: string,
  github?: string,
  linkedin?: string,
  path: string
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId })

  } catch(error: any) {
    throw new Error(`Faild to fetch user: ${error.message}`);
  }
}

// update profile at the first login
export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  github,
  linkedin,
  path
}: Params):  Promise<void> {
  
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId},
      { 
        username: username.toLowerCase(),
        name,
        image,
        bio,
        github,
        linkedin,
        onboarded: true,
      },
      { upsert: true },
    );
  
    if(path === '/profile/edit') {
      revalidatePath(path)
    }
  } catch(error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

// change onsetting status to update profile
export async function goSettingProfile(userId: string){
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId},
      { 
        onsetting: true,
      },
      { upsert: true },
    );

  } catch(error: any) {
    throw new Error(`Failed to change setting mode user: ${error.message}`)
  }
}

// update profile
export async function updateUserFromProfile({
  userId,
  username,
  name,
  image,
  bio,
  github,
  linkedin,
  path
}: Params):  Promise<void> {
  
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId},
      { 
        username: username.toLowerCase(),
        name,
        image,
        bio,
        github,
        linkedin,
        onsetting: false,
      },
      { upsert: true },
    );
  
    if(path === '/profile/edit') {
      revalidatePath(path)
    }
  } catch(error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

// get user's post
export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    const posts = await User.findOne({id: userId})
      .populate({
        path: 'posts',
        model: Post,
      })

      return posts;
  } catch (error: any) {
    throw new Error(`Faild to fetch user posts: ${error.message}`)
  }
}

// get user's follows
export async function fetchFollows(userId: string) {
  try {
    connectToDB();

    const user = await User.findOne({id: userId});
    const followsArray = user.follows;

    const followsPromises = followsArray.map(async(followId: any) => {
      const follow = await User.findById(followId);
      return follow;
    });

    const follows = await Promise.all(followsPromises);

    return follows;

  } catch(error: any) {
    throw new Error(`Faild to fetch user follows: ${error.message}`)
  }
}

// check if user follow the other user
export async function isFollow({
  userId,
  followId,
}:{
  userId: string;
  followId: string;
}) {
  try {
    connectToDB();

    const user = await User.findOne({id: userId});
    const follow = await User.findOne({id: followId});

    return !user.follows.includes(follow._id);

  } catch(error: any) {
    throw new Error(`Error on isfollow : ${error.message}`)
  }
}

// update follow status
export async function followButton({
  userId,
  followId,
}:{
  userId: string;
  followId: string;
}) {
  try {
    connectToDB();

    const user = await User.findOne({id: userId});
    const follow = await User.findOne({id: followId});

    if(!user.follows.includes(follow._id)) {
      await User.findByIdAndUpdate(user._id, {
        $push: { follows: follow._id }
      });
      // await User.findByIdAndUpdate(follow._id, {
      //   $push: { follows: user._id }
      // });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: { follows: follow._id }
      });
      // await User.findByIdAndUpdate(follow._id, {
      //   $pull: { follows: user._id }
      // });
    }
  } catch(error: any) {
    throw new Error(`Error on follow button: ${error.message}`)
  }
}