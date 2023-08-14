"use client"

import Image from "next/image";
import Link from "next/link";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Props {
  id: string;
  currentUserId: string;
  cafeName: string;
  wifi: string;
  bathroom: string;
  outlet: string;
  comment: string;
  author: {
    name: string;
    image: string;
    id: string;
  }
  // good: {
  //   author: {
  //     name: string;
  //     image: string;
  //     id: string;
  //   }
  // }[]
  createdAt: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({
  id,
  currentUserId,
  cafeName,
  wifi,
  bathroom,
  outlet,
  comment,
  author,
  // good,
  createdAt
}: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postDate = createdAt.toString();

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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={cafeName}
        subheader={postDate}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt={cafeName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  // return (
    // <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
    //   <div className="flex items-start justify-between">
    //     <div className="flex w-full flex-1 flex-row gap-4">
    //       <div className="flex flex-col items-center">
            // <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
            //   <Image 
            //     src={author.image}
            //     alt="Profile image"
            //     fill
            //     className="cursor-pointer rounded-full"
            //   />
            // </Link>
    //       </div>
    //     </div>

    //   </div>
    //   <h2 className="text-small-regular test-dark-1">
    //     {cafeName}
    //   </h2>
    // </article>
};
export default PostCard;