import prisma from "../lib/db";
import { ProfileBottomPostCard } from "./ProfileBottomPostCard";

interface Props {
  userId: string;
}

async function getData(userId: string) {
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

export async function ProfileBottom({ userId }: Props) {
  const data = await getData(userId);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((post) => {
        const isLiked = post.Like.some(
          (like) => like.userId === userId && like.liked
        );
        return (
          <ProfileBottomPostCard
            key={post.id}
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
          />
          // <div key={post.id}>
          //   <h1>hello</h1>
          // </div>
        );
      })}
    </div>
  );
}
