import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchFollows, fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/profileHeader";

async function Page() {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  const follows = fetchFollows(userInfo.id);

  console.log(follows);

  return (
    <section>
      <h1 className="font-bold mb-10">Follows</h1>
      {/* <section>
        {follows.map((follow) => {

        })}
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={follows.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        github={userInfo.github}
        linkedin={userInfo.linkedin}
      />
      </section> */}
    </section>
  )
}

export default Page;