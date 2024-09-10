/* eslint-disable @next/next/no-img-element */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Settings, SettingsIcon, UploadIcon } from "lucide-react";

import Link from "next/link";
import { CommunityDescription } from "./CommunityDescription";
import { Separator } from "@/components/ui/separator";
import { FollowCommunity } from "./FollowCommunity";
import { FollowCommunityMobile } from "./FollowCommunityMobile";
import prisma from "../lib/db";
import { PostCard } from "./PostCard";
import { CommunityFollowingDialog } from "./communityComponents/UserFollowCom";

import { unstable_noStore as noStore } from "next/cache"

// Consolidated function for fetching all required data
async function getData(communityId: string | null | undefined, currUserId: string | null | undefined) {
  noStore();
  
  // Running all Prisma queries in parallel using Promise.all for efficiency
  const [posts, totalPosts, communityDetails] = await Promise.all([
    prisma.post.findMany({
      where: { communityId },
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
        _count: {
          select: { Comment: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    
    // Count total posts
    prisma.post.count({
      where: { communityId },
    }),

    // Fetch community details
    prisma.community.findUnique({
      where: { id: communityId ?? "" },
      select: { name: true, id: true },
    })
  ]);

  return { posts, totalPosts, communityDetails };
}

interface iAppProps {
  communityId: string | undefined | null | "";
  userId: string | undefined | null | "";
  currUserId: string | undefined | null | "";
  name: string | undefined | null | "";
  description: string | undefined | null | "";
  createdAt: Date | undefined;
  imageUrl: string | null | undefined;
  totalFollowers: number;
  isFollowing: boolean;
  oldName: string;
}

export async function CommunityPosts({
  communityId,
  userId,
  name,
  description,
  createdAt,
  currUserId,
  imageUrl,
  totalFollowers,
  isFollowing,
  oldName,
}: iAppProps) {
  const loading = false;
  const { posts, totalPosts, communityDetails } = await getData(communityId, currUserId);

  return (
    <div className="max-w-[1300px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-full lg:w-[65%] flex flex-col gap-y-5">
        <div className="flex justify-between px-4 items-center">
          <Dialog>
            <DialogTrigger><span className="text-xl">{name}</span></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="p-4">
                  <div className="flex flex-col gap-y-5 items-center justify-center gap-x-3">
                    <Avatar className="my-8 h-56 w-56">
                      <AvatarImage
                        src={imageUrl ?? `https://avatar.vercel.sh/${name}`}
                        alt={name ?? "community-avatar"}
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-extrabold">
                      <span className="text-muted-foreground">Posts: </span> {totalPosts}
                    </p>
                    <span className="text-muted-foreground">
                      <CommunityFollowingDialog communityId={communityId ?? ""} />
                    </span>
                  </div>
                  <div className="flex flex-col py-5 gap-y-3">
                    <Link href={`/community/${oldName}/post/create/${communityId}`}>
                      <Button> Create Post</Button>
                    </Link>
                    <Separator className="my-1" />
                    <p className="mb-2">{description}</p>
                    {userId === currUserId ? (
                      <Dialog>
                        <DialogTrigger asChild className="mt-10">
                          <Button className="py-1 px-1 rounded-full">
                            <Edit className="w-4 h-4 mx-2" /> Edit Description
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Description</DialogTitle>
                            <Separator />
                            <DialogDescription>
                              Update Description of Community: {name}
                            </DialogDescription>
                            <CommunityDescription
                              communityId={communityId}
                              name={name}
                              description={description}
                              imageUrl={imageUrl}
                              creator={true}
                            />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button disabled className="py-1 px-1 rounded-full">
                        <Edit className="w-4 h-4 mx-2" /> Edit
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-row justify-end">
                    {userId === currUserId ? (
                      <Link href={`/community/${communityId}/settings`} className="flex items-center">
                        <p className="mr-1">settings</p>
                        <SettingsIcon className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="flex items-center">
            <span className="mr-2">
              <CommunityFollowingDialog communityId={communityId ?? ""} />
            </span>
            <FollowCommunity
              userId={currUserId}
              communityId={communityId}
              isFollowing={isFollowing}
              totalFollowers={totalFollowers}
              oldName={oldName}
            />
          </div>
        </div>

        <Separator className="mx-2" />

        <div className="md:col-span-2 lg:col-span-3 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => {
              const isLiked = post.Like.some(
                (like) => like.userId === currUserId && like.liked
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
                  totalLikes={post.Like.reduce((acc, vote) => (vote.liked ? acc + 1 : acc), 0)}
                  totalComments={post._count.Comment}
                  comName={communityDetails?.name ?? ""}
                  commId={communityDetails?.id ?? post.User.id}
                />
              );
            })
          )}
        </div>
      </div>
      {/* community side bar */}
      <div className="w-[35%] hidden lg:block">
        <Card className="min-h-96">
          <div className="bg-muted p-4 font-semibold flex justify-between gap-x-5">
            <div className="flex items-center">{name}</div>
            <FollowCommunityMobile
              userId={currUserId}
              communityId={communityId}
              isFollowing={isFollowing}
              totalFollowers={totalFollowers}
              oldName={oldName}
            />
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-y-5 items-center justify-center gap-x-3">
              <Avatar className="my-8 h-56 w-56">
                <AvatarImage
                  src={imageUrl ?? `https://avatar.vercel.sh/${name}`}
                  alt="@shadcn"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-between">
              <p className="font-extrabold">
                <span className="text-muted-foreground">Posts: </span> {totalPosts}
              </p>
              <span className="text-muted-foreground">
                <CommunityFollowingDialog communityId={communityId ?? ""} />
              </span>
            </div>
            <div className="flex flex-col py-5 gap-y-3">
              <Link href={`/community/${oldName}/post/create/${communityId}`}>
                <Button> Create Post</Button>
              </Link>
              <Separator className="my-1" />
              <p className="mb-2">{description}</p>
              {userId === currUserId ? (
                <Dialog>
                  <DialogTrigger asChild className="mt-10">
                    <Button className="py-1 px-1 rounded-full">
                      <Edit className="w-4 h-4 mx-2" /> Edit Description
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Description</DialogTitle>
                      <Separator />
                      <DialogDescription>
                        Update Description of Community: {name}
                      </DialogDescription>
                      <CommunityDescription
                        communityId={communityId}
                        name={name}
                        description={description}
                        imageUrl={imageUrl}
                        creator={true}
                      />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button disabled className="py-1 px-1 rounded-full">
                  <Edit className="w-4 h-4 mx-2" /> Edit
                </Button>
              )}
            </div>
            <div className="flex flex-row justify-end ">
              {userId === currUserId ? (
                <Link
                  href={`/community/${communityId}/settings`}
                  className="flex items-center"
                >
                  <p className="mr-1">settings</p>
                  <SettingsIcon className="h-4 w-4" />
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
