"use client";

import { followButton, isFollow } from "@/lib/actions/user.actions";
import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import { MouseEvent } from "react";

interface Props {
  currentUserId: string,
  accountId: string,
}

const FollowButton =({
  currentUserId,
  accountId,
}: Props) => {
  const [ isfollow, setIsfollow ] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const followStatus = await isFollow({
          userId: currentUserId,
          followId: accountId,
        });
        setIsfollow(followStatus);
      } catch(error) {
        console.error("Error fetching follow status:", error);
      }
    }
    fetchData();
  }, [currentUserId, accountId]);

  const handleClick = (
    e: MouseEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    try {
      followButton({ userId: currentUserId, followId: accountId });
      setIsfollow(!isfollow);
    } catch(error) {
      console.error("Error following/unfollowing:", error);
    }
  }

  return (
    <Button onClick={(e: any) => handleClick(e)}>
      { isfollow ? "follow" : "unfollow"}
    </Button>
  )
}

export default FollowButton