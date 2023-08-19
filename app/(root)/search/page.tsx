import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/profileHeader";
import { profileTabs } from "@/constants";
import PostsTab from "@/components/PostsTab";

async function Page() {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded || !userInfo?.onsetting) redirect('/onboarding');

  

  return (
    <section>
      <h1 className="font-bold mb-10">Search</h1>
    </section>
  )
}

export default Page;