"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from '@/constants/index';
import { BiLogOut } from "react-icons/bi";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          if(link.route === "/profile") link.route = `${link.route}/${userId}`;
          
          return (
            <Link 
              href={link.route} 
              key={link.label} 
              className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
            >
              <h3>{link.icon}</h3>
              <h3 className="text-lg max-lg:hidden">{link.label}</h3>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4 text-2xl">
              <BiLogOut />
              <p className="text-lg max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>

    </section>
  );
}

export default Sidebar;