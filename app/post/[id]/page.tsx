
import { IndividualPost } from "@/app/components/Post/IndivdualPost";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getPostAndComments(postId: string) {
  noStore();
  
  // Prisma transaction to fetch post, comments, and total comment count in one go
  const [post, comments, totalComments] = await prisma.$transaction([
    prisma.post.findUnique({
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
    }),
    prisma.comment.findMany({
      where: {
        postId: postId,
      },
      select: {
        id: true,
        text: true,
        User: {
          select: {
            id: true,
            userName: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.comment.count({
      where: {
        postId: postId,
      },
    }),
  ]);

  return { post, comments, totalComments };
}

export default async function PostPageSingle({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Get the post, comments, and total comments in one go
  const { post, comments, totalComments } = await getPostAndComments(params.id);
  
  if (!post) redirect("/");

  // Check if the current user has liked the post
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
        totalLikes={post.Like.reduce((acc, like) => like.liked ? acc + 1 : acc, 0)}
        currUserId={user?.id}
        comments={comments}
        totalComments={totalComments}
      />
    </div>
  );
}
