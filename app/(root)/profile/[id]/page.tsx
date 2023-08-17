import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/profileHeader";
import { profileTabs } from "@/constants";
import PostsTab from "@/components/PostsTab";

import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

async function Page({ params }: { params: { id: string}}) {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(params.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
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
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full">
              {tab.label === 'Posts' && (
                <PostsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              )}
              {/* show likes post */}
              {/* {tab.label === 'Likes' && (
                <PostsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              )} */}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>

  )
}

export default Page;