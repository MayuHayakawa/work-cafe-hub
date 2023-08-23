import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchGoodPosts, fetchUser, fetchUserById } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/profileHeader";
import { profileTabs } from "@/constants";
import PostsTab from "@/components/PostsTab";

import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import PostCard from "@/components/cards/postCard";

async function Page({ params }: { params: { id: string }}) {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(params.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  const goodPosts = await fetchGoodPosts(userInfo._id);

  return (
    <section>
      <ProfileHeader
        currentUserId={user.id} // the user
        accountId={userInfo.id} // maybe others
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        github={userInfo.github}
        linkedin={userInfo.linkedin}
      />
      <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <div>{tab.icon}</div>
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === 'Posts' && (
                  <p className="ml-1 rounded-sm bg-primary-500 px-2 py-1 ">{userInfo?.posts?.length}</p>
                )}
                {tab.label === 'Likes' && (
                  <p className="ml-1 rounded-sm bg-primary-500 px-2 py-1 ">{goodPosts?.length}</p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full">
              {tab.label === 'Posts' && (
                <PostsTab
                  currentUserId={userInfo._id}
                  // currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              )}
              {tab.label === 'Likes' && (
                <>
                  { goodPosts.length != 0 ? (
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
                        )})
                      }
                    </>
                  ):(
                    <h1>No Post</h1>
                  )}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>

  )
}

export default Page;