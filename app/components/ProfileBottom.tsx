import Link from "next/link";
import prisma from "../lib/db";
import { ProfileBottomPostCard } from "./ProfileBottomPostCard";

import { unstable_noStore as noStore } from "next/cache"
interface Props {
  userId: string;
}

async function getData(userId: string) {
  noStore();
  const data = await prisma.post.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      videoUrl: true,
      createdAt: true,
      User: {
        select: {
          userName: true,
          imageUrl: true,
        },
      },
      Like: {
        select: {
          id: true,
          liked: true,
          userId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

async function getTotalCommment(postId: string ) {
  noStore();
  const count = await prisma.comment.count({
    where: {
      postId: postId,
    },
  });

  return count;
}

export async function ProfileBottom({ userId }: Props) {
  const data = await getData(userId);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map( async (post) => {
        const isLiked = post.Like.some(
          (like) => like.userId === userId && like.liked
        );
        const totalComments = await getTotalCommment(post.id);
        return (
          <Link href={`/post/${post.id}`} key={post.id}>
          
          <ProfileBottomPostCard
            
            id={post.id}
            userName={post.User.userName}
            profilePic={post.User.imageUrl}
            title={post.title}
            description={post.description}
            imageUrl={post.imageUrl}
            videoUrl={post.videoUrl}
            likeType={isLiked}
            totalLikes={post.Like.reduce((acc, vote) => {
              if (vote.liked) return acc + 1;
              
              return acc;
            }, 0)}
            totalComments={totalComments}
            />
            </Link>
          // <div key={post.id}>
          //   <h1>hello</h1>
          // </div>
        );
      })}
    </div>
  );
}
