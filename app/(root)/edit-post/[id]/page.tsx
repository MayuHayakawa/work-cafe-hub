import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import PostComment from "@/components/forms/postcomment";
import { fetchPost } from "@/lib/actions/post.actions";

async function Page({ params }: {params: { id: string }}) {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  const postInfo = await fetchPost(params.id);

  return (
    <>
      <h1 className="head-text">Edit Post</h1>
      <PostComment userId={userInfo._id} isEdit={true} postInfo={postInfo}/>
    </>
  )
}

export default Page;