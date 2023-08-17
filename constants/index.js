import { BiHomeAlt, BiSearchAlt, BiUser } from 'react-icons/bi';
import { MdOutlineLocalCafe } from 'react-icons/md';
import { RiHeart3Line } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';

export const sidebarLinks = [
  {
    route: "/",
    label: "Home",
    icon: <BiHomeAlt />,
  },
  {
    route: "/search",
    label: "Search",
    icon: <BiSearchAlt />,
  },
  {
    route: "/favorites",
    label: "Favorites",
    icon: <RiHeart3Line />,
  },
  {
    route: "/create-post",
    label: "Create Post",
    icon: <MdOutlineLocalCafe />,
  },
  {
    route: "/follows",
    label: "Follows",
    icon: <BsPeople />,
  },
  {
    route: "/profile",
    label: "Profile",
    icon: <BiUser />,
  }
]

export const profileTabs = [
  { 
    value: "posts",
    label: "Posts",
    icon: <MdOutlineLocalCafe />,
  },
  {
    value: "likes",
    label: "Likes",
    icon: <RiHeart3Line />
  },
]