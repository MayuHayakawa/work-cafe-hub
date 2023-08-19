"use client";

import Image from "next/image";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { BiLogoGithub, BiLogoLinkedinSquare } from 'react-icons/bi';
import { AiOutlineSetting } from 'react-icons/ai';
import { goSettingProfile } from "@/lib/actions/user.actions";
import FollowButton from "./followbutton";

interface Props {
  currentUserId: string,
  accountId: string,
  name: string,
  username: string,
  imgUrl: string,
  bio: string,
  github?: string,
  linkedin?: string,
}

const ProfileHeader = ({
  currentUserId,
  accountId,
  name,
  username,
  imgUrl,
  bio,
  github,
  linkedin
}: Props) => {
  const router = useRouter();

  const handleClick =(
    e: MouseEvent<HTMLInputElement>,
    ) => {
      e.preventDefault();

      goSettingProfile(accountId); // change onsetting value to true
      router.push('/onboarding');
  }

  console.log(accountId);

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-3">

          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left font-bold">{name}</h2>
            <p className="text-sm text-gray-500">@{username}</p>
            <div className="flex gap-3 mt-1">
              <a href={github} target="_blank">
                <BiLogoGithub />
              </a>
              <a href={linkedin} target="_blank">
                <BiLogoLinkedinSquare />
              </a>
            </div>
          </div>
          {currentUserId === accountId ? (
            <div className="absolute top-1 right-1">
              <AiOutlineSetting onClick={(e: any) => handleClick(e)} />
            </div>
          ):(
            <div>
              <FollowButton 
                currentUserId={currentUserId}
                accountId={accountId}
              />
            </div>
          )}
          
        </div>
      </div>

        <p className="mt-6 max-w-lg">{bio}</p>
        <div className="mt-12 h-0.5 w-full" />
    </div>
  )
}

export default ProfileHeader;