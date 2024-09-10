import Link from "next/link";
import prisma from "../lib/db";
import { ProfileBottomPostCard } from "./ProfileBottomPostCard";
import { unstable_noStore as noStore } from "next/cache";
interface Props {
  userId: string;
}

async function getData(userId: string) {
  noStore();

  const data = await prisma.$transaction(async (prisma) => {
    const posts = await prisma.post.findMany({
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
        Comment: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Fetch total comments for each post in a batch query
    const commentsCounts = await prisma.comment.groupBy({
      by: ["postId"],
      _count: {
        id: true,
      },
      where: {
        postId: {
          in: posts.map((post) => post.id),
        },
      },
    });

    // Map the posts with total comments
    const postsWithDetails = posts.map((post) => {
      const totalComments =
        commentsCounts.find((comment) => comment.postId === post.id)?._count
          .id || 0;

      return {
        ...post,
        totalComments,
        totalLikes: post.Like.filter((like) => like.liked).length,
      };
    });

    return postsWithDetails;
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
              totalLikes={post.totalLikes}
              totalComments={post.totalComments}
            />
          </Link>
        );
      })}
    </div>
  );
}
