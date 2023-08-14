import Link from 'next/link';
import { SignOutButton, SignedIn } from '@clerk/nextjs';
import { BiLogOut } from 'react-icons/bi';

// export const revalidate = 0

const Topbar = async () => {

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <p>WORK CAFE HUB</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <BiLogOut />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;