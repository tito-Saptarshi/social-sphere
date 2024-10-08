import { PostCard } from "./components/PostCard";
import { RightSidebar } from "./components/RightSideBar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, PlusCircleIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingActionButton } from "./components/FloatingActionButton";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Suspense } from "react";
import { SuspenseCard } from "./components/SuspenseCard";
import { unstable_noStore as noStore } from "next/cache";
import Pagination from "./components/Pagination";
// async function getData() {

//   const [count, data] = await prisma.$transaction([
//     prisma.post.count(),
//     prisma.post.findMany({
//       select: {
//         id: true,
//         title: true,
//         description: true,
//         imageUrl: true,
//         videoUrl: true,
//         createdAt: true,
//         communityId: true,
//         User: {
//           select: {
//             id: true,
//             userName: true,
//             imageUrl: true,
//           },
//         },
//         Like: {
//           select: {
//             id: true,
//             liked: true,
//             userId: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     }),
//   ]);

//   return { count, data };
// }
// async function getCommunityDetails(communityId: string) {

//   const data = await prisma.community.findUnique({
//     where: {
//       id: communityId,
//     },
//     select: {
//       name: true,
//       id: true,
//     },
//   });

//   return data;
// }

// async function getTotalCommment(postId: string) {

//   const count = await prisma.comment.count({
//     where: {
//       postId: postId,
//     },
//   });

//   return count;
// }

// async function getBoolean(postId: string, userId: string) {
//   noStore();
//   const like = await prisma.like.findFirst({
//     where: {
//       postId: postId,
//       userId: userId,
//     },
//     select: {
//       liked: true,
//       id: true,
//     },
//   });

//   return like;
// }

async function getData(searchParam: String) {
  noStore();
  const data = await prisma.$transaction([
    prisma.post.findMany({
      take: 5,
      skip: searchParam ? (Number(searchParam) - 1) * 5 : 0,
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        videoUrl: true,
        createdAt: true,
        communityId: true,
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
        Comment: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.post.count(),
    prisma.community.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  const posts = data[0];
  const postCount = data[1];
  const communities = data[2];

  const postsWithDetails = posts.map((post) => {
    const community = communities.find((comm) => comm.id === post.communityId);
    const totalComments = post.Comment.length;
    const totalLikes = post.Like.filter((like) => like.liked).length;

    return {
      ...post,
      totalComments,
      totalLikes,
      communityName: community?.name ?? "No Community",
    };
  });

  return { count: postCount, posts: postsWithDetails };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  // const { count, data } = await getData();

  // const { getUser } = getKindeServerSession();
  // const user = await getUser();

  return (
    <div className="container mx-auto p-4 max-w-[1250px]">
      <div className="md:hidden mb-4 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <UserIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <RightSidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="md:col-span-2 lg:col-span-3 space-y-4">
          <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
            <ShowItems searchParams={searchParams} />
          </Suspense>
        </div>

        <div className="hidden md:block">
          <Card className="sticky top-4">
            <CardContent>
              <RightSidebar />
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
}

// async function ShowItems() {
//   const { count, data } = await getData();
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   return (
//     <>
//       {data.map(async (post) => {
//         const isLiked = post.Like.some(
//           (like) => like.userId === user?.id && like.liked
//         );
//         const totalComments = await getTotalCommment(post.id);
//         const commDet = await getCommunityDetails(post.communityId ?? "");
//         return (
//           <PostCard
//             key={post.id}
//             userId={post.User.id}
//             id={post.id}
//             userName={post.User.userName}
//             profilePic={post.User.imageUrl}
//             title={post.title}
//             description={post.description}
//             imageUrl={post.imageUrl}
//             videoUrl={post.videoUrl}
//             likeType={isLiked}
//             totalLikes={post.Like.reduce((acc, vote) => {
//               if (vote.liked) return acc + 1;

//               return acc;
//             }, 0)}
//             totalComments={totalComments}
//             comName={commDet?.name ?? "No Community"}
//             commId={post.communityId ?? post.User.id}
//           />
//         );
//       })}
//     </>
//   );
// }

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { posts, count } = await getData(searchParams.page);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      {posts.map((post) => {
        const isLiked = post.Like.some(
          (like) => like.userId === user?.id && like.liked
        );

        return (
          <PostCard
            key={post.id}
            userId={post.User.id}
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
            comName={post.communityName}
            commId={post.communityId ?? post.User.id}
          />
        );
      })}

      <Pagination totalPages={Math.ceil(count / 5)} />
    </>
  );
}
