import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchGoodPosts, fetchUser, fetchUserById } from "@/lib/actions/user.actions";
import PostCard from "@/components/cards/postCard";

async function Page({ params }: {params: { id: string }}) {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(params.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  const goodPosts = await fetchGoodPosts(userInfo._id);
  
  return (
    <section>
      { goodPosts.length !== 0 ? (
        <>
          {goodPosts.map(async (post: any) => {
            const postAuthor = await fetchUserById(post.author._id);
            return (
            <PostCard
              key={post._id}
              id={post._id}
              currentUserId={userInfo._id}
              // currentUserId={user.id}
              cafeName={post.cafeName}
              cafeUrl={post.cafeUrl}
              cafeLocation={post.cafeLocation}
              cafeImage={post.cafeImage}
              wifi={post.wifi}
              bathroom={post.bathroom}
              outlet={post.outlet}
              comment={post.comment}
              author={{
                name: postAuthor.name,
                image: postAuthor.image,
                id: postAuthor.id,
                objectId: postAuthor._id,
              }}
              good={post.good}
              createdAt={post.createdAt}
            />
          )})}
        </>
      ):(
        <h1>No post</h1>
      )}
    </section>
  )
}

export default Page;