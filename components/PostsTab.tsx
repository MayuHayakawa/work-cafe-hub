import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import PostCard from "./cards/postCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const PostsTab = async ({ currentUserId, accountId, accountType }:
  Props) => {
  let result = await fetchUserPosts(accountId);
  console.log(result);
  if(!result) redirect('/')

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.posts.map((post: any) => (
        <PostCard 
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          cafeName={post.cafeName}
          cafeUrl={post.cafeUrl}
          cafeLocation={post.cafeLocation}
          cafeImage={post.cafeImage}
          wifi={post.wifi}
          bathroom={post.bathroom}
          outlet={post.outlet}
          comment={post.comment}
          author={
            accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id }
              : { name: post.author.name, image: post.author.image, id: post.author.id }
          }
          good={post.good}
          createdAt={post.createdAt}
        />
      ))}
    </section>
  )
}

export default PostsTab;