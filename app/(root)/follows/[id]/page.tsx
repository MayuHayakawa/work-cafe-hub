import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchFollows, fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/profileHeader";

async function Page({ params }: {params: { id: string }}) {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(params.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  const follows = await fetchFollows(userInfo.id);

  console.log('followssss: ' + follows);

  return (
    <section>
      {follows.map((follow: any) => {
        return (
        <ProfileHeader
          currentUserId={user.id}
          accountId={follow.id}
          name={follow.name}
          username={follow.username}
          imgUrl={follow.image}
          bio={follow.bio}
          github={follow.github}
          linkedin={follow.linkedin}
        />
      )})}
    </section>
  )
}

export default Page;