"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";


function Bottombar() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
      {sidebarLinks.map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

            if(link.route === "/favorites") link.route = `${link.route}/${userId}`;
            if(link.route === "/follows") link.route = `${link.route}/${userId}`;
            if(link.route === "/profile") link.route = `${link.route}/${userId}`;
            
            return (
              <Link 
                href={link.route} 
                key={link.label} 
                className={`bottombar_link ${isActive && "bg-primary-500"}`}
              >
                <h3>{link.icon}</h3>
                <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                  {link.label.split(/\s+/)[0]}
                </p>
              </Link>
            )
          })}
      </div>
    </section>
  );
}

export default Bottombar;