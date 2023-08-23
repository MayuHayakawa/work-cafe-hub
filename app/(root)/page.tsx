import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchPosts } from "@/lib/actions/post.actions";

import PostCard from "@/components/cards/postCard";

export default async function Home() {
  const result = await fetchPosts(1, 10);

  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No posts found</p>
        ):(
          <>
            {result.posts.map((post) => {
              console.log(post.author)
              return (
              <PostCard 
                key={post._id}
                id={post._id}
                currentUserId={userInfo._id}
                cafeName={post.cafeName}
                cafeUrl={post.cafeUrl}
                cafeLocation={post.cafeLocation}
                cafeImage={post.cafeImage}
                wifi={post.wifi}
                bathroom={post.bathroom}
                outlet={post.outlet}
                comment={post.comment}
                author={{
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id,
                  objectId: post.author._id
                }}
                good={post.good}
                createdAt={post.createdAt}
              />
            )})}
          </>
        )}
      </section>
    </>
  )
}
