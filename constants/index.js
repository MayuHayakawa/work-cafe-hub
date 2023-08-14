import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { MdOutlineLocalCafe } from 'react-icons/md';
import { RiUserFollowLine, RiHeart3Line } from 'react-icons/ri';

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
    icon: <RiUserFollowLine />,
  },
]