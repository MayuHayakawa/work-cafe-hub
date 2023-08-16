"use client"

import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import WifiIcon from '@mui/icons-material/Wifi';
import WcIcon from '@mui/icons-material/Wc';
import PowerIcon from '@mui/icons-material/Power';

import { goodToPost } from "@/lib/actions/post.actions";

interface Props {
  id: string;
  currentUserId: string;
  cafeName: string;
  cafeUrl: string;
  cafeLocation: string;
  cafeImage: string;
  wifi: string;
  bathroom: string;
  outlet: string;
  comment: string;
  author: {
    name: string;
    image: string;
    id: string;
  }
  good: []
  createdAt: string;
}

const PostCard = ({
  id,
  currentUserId,
  cafeName,
  cafeUrl,
  cafeLocation,
  cafeImage,
  wifi,
  bathroom,
  outlet,
  comment,
  author,
  good,
  createdAt
}: Props) => {
  const postDate = formatWithoutTimezone(createdAt);
  const fallbackImage = "/assets/cafe-stand.svg"

  console.log(good);

  function formatWithoutTimezone(date: string) {
    const createdAt = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
  
    return createdAt.toLocaleDateString('en-US', options);
  }

  const handleClick =(
    e: MouseEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    console.log(id);
    console.log(currentUserId);

    goodToPost({id:id, currentUserId: currentUserId});
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image 
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
          </Avatar>
        }
        title={author.name}
        subheader={postDate}
      />
      <CardMedia
        component="img"
        height="194"
        src={cafeImage !== '' ? cafeImage : fallbackImage}
        alt={cafeName}
      />
      <CardContent>
        <h2>{cafeName}</h2>
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="flex justify-between justify-items-center">
        <div>
          {cafeUrl != '' ? (
            <IconButton>
              <Link href={cafeUrl}>
                <HomeIcon color="primary" />
              </Link>    
            </IconButton>
          ):(
            <IconButton>
              <HomeIcon />
            </IconButton>
          )}
          {cafeLocation != '' ? (
            <IconButton>
              <Link href={cafeLocation}>
                <MapIcon color="primary" />
              </Link>
            </IconButton>
          ):(
            <IconButton>
              <MapIcon />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton>
            {wifi === 'available' ? <WifiIcon color="primary" /> : <WifiIcon />}
          </IconButton>
          <IconButton>
            {bathroom === 'available' ? <WcIcon color="primary" /> : <WcIcon />}
          </IconButton>
          <IconButton>
            {outlet === 'available' ? <PowerIcon color="primary" /> : <PowerIcon />}
          </IconButton>
        </div>
        <div>
          <IconButton
            aria-label="add to favorites"
            onClick={(e: any) => handleClick(e)}
          >
            <FavoriteIcon />
            <p>{good.length != 0 ? `${good.length}` : ''}</p>
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};
export default PostCard;