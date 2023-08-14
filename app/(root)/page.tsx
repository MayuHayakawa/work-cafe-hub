import PostCard from "@/components/cards/postCard";
import { fetchPosts } from "@/lib/actions/post.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 10);
  const user = await currentUser();

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
                currentUserId={user?.id || ''}
                cafeName={post.cafeName}
                wifi={post.wifi}
                bathroom={post.bathroom}
                outlet={post.outlet}
                comment={post.comment}
                author={{
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id
                }}
                // good={{
                //     name: post.author.name,
                //     image: post.author.image,
                //     id: post.author.id,
                // }}
                createdAt={post.createdAt}
              />
            )})}
          </>
        )}
      </section>
    </>
  )
}
