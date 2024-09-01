import { IndividualPost } from "@/app/components/Post/IndivdualPost";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
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
          id: true,
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
  });

  return data;
}

export default async function PostPageSingle({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const post = await getData(params.id);
  if (!post) redirect("/");
  const isLiked = post.Like.some(
    (like) => like.userId === user?.id && like.liked
  );
  return (
    <div>
      <IndividualPost
        userId={post.User.id}
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
        currUserId={user?.id}
      />
    </div>
  );
}
