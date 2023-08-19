"use client";

import { followButton, isFollow } from "@/lib/actions/user.actions";
import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import { MouseEvent } from "react";

interface Props {
  accountId: string,
  authUserId: string,
}

const FollowButton = ({
  accountId,
  authUserId,
}: Props) => {
  const [ isfollow, setIsfollow ] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const followStatus = await isFollow({
          userId: accountId,
          followId: authUserId,
        });
        setIsfollow(followStatus);
      } catch(error) {
        console.error("Error fetching follow status:", error);
      }
    }
    fetchData();
  }, [accountId, authUserId]);

  const handleClick = (
    e: MouseEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    try {
      followButton({ userId: accountId, followId: authUserId });
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