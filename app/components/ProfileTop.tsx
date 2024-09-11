import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, SettingsIcon, User, UserPlus } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { followUser, unfollowUser } from "../actions";
import { FollowUserFun } from "./UserFollow";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  id: string;
  currUserId: string | undefined;
  profilePhoto: string | null | undefined;
  userName: string | null | undefined;
  bio: string | null | undefined;
}

// follower -> curr userId
// following -> props userid

async function getData(userId: string) {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      email: true,
      FollowingUsers: {
        select: {
          following: {
            select: {
              userName: true,
              imageUrl: true,
              id: true, // Fetch the image URL for the profile picture
            },
          },
        },
      },
      Followers: {
        select: {
          follower: {
            select: {
              userName: true,
              imageUrl: true,
              id: true,
              // Fetch the image URL for the profile picture
            },
          },
        },
      },
      Following: {
        select: {
          Community: {
            select: {
              name: true,
              description: true,
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          FollowingUsers: true,
          Followers: true,
          Post: true,
        },
      },
    },
  });

  return user; // Return the user data including the image URLs
}

async function isFollowing(
  followerId: string,
  followingId: string
): Promise<boolean> {
  noStore();
  const followRecord = await prisma.userFollower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  return followRecord !== null;
}

export async function ProfileTop({
  id,
  currUserId,
  profilePhoto,
  userName,
  bio,
}: Props) {
  const { getUser } = getKindeServerSession();
  const data = await getUser();
  const user = await getData(id);
  const currentlyFollowing = await isFollowing(currUserId ?? "", id);
  if (!user) {
    return <div>No user data found.</div>;
  }
  const totalFollowingUsers = user.FollowingUsers.length;
  const totalFollowingCommunities = user.Following.length;
  const totalFollowing = totalFollowingUsers + totalFollowingCommunities;
  const totalFollowers = user.Followers.length;

  function replaceSpaceWithPercent20(
    str: string | "" | null | undefined
  ): string {
    if (str === null || str === undefined) {
      return "s";
    }
    return str.replace(/ /g, "%20");
  }

  async function toggleFollow(followerId: string, followingId: string) {
    if (currentlyFollowing) {
      await unfollowUser(followerId, followingId);
      console.log(`User ${followerId} unfollowed user ${followingId}`);
    } else {
      await followUser(followerId, followingId);
      console.log(`User ${followerId} followed user ${followingId}`);
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
      <Avatar className="w-24 h-24 md:w-40 md:h-40 mb-4 md:mb-0 md:mr-8">
        <AvatarImage
          src={profilePhoto ?? "https://avatar.vercel.sh/helloworld"}
          alt="@shadcn"
        />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold mb-2">{userName}</h1>
        {/* <p className="text-gray-600 mb-4 max-w-md">
            Photography enthusiast | Travel lover | Food connoisseur
            Sharing my adventures one post at a time! 📸✈️🍔
          </p> */}
        <p className="text-gray-600 mb-4 max-w-md">{bio}</p>
        <div className="flex justify-center md:justify-start space-x-4 mb-4 items-center">
          <FollowUserFun
            followerId={currUserId}
            followingId={id}
            currentlyFollowing={currentlyFollowing}
          />
          <Link href={`/profile`}>
            <SettingsIcon />
          </Link>
        </div>
        <div className="flex justify-center md:justify-start space-x-8">
          <div>
            <span className="font-bold">{user._count.Post}</span> posts
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <button>{totalFollowers} Followers</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Followers</DialogTitle>
                  <DialogDescription>
                    Users who are following you.
                  </DialogDescription>
                </DialogHeader>

                {/* Render the list of followers inside the dialog */}
                <div className="flex flex-col space-y-2">
                  <h2 className="text-lg font-semibold">Followers</h2>
                  {totalFollowers > 0 ? (
                    user.Followers.map((follower, index) => (
                      <Link
                        key={index}
                        href={`/profile/${follower.follower.id}/user`}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={
                              follower.follower.imageUrl ??
                              "/default-profile-pic.png"
                            }
                            alt={`${follower.follower.userName}'s profile picture`}
                            className="w-8 h-8 rounded-full" // Small circle for profile picture
                          />
                          <p>
                            {follower.follower.userName ?? "No name available"}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p>No followers found.</p>
                  )}
                </div>

                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <Dialog>
              <DialogTrigger asChild>
                <button>{totalFollowing} Following</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Following</DialogTitle>
                  <DialogDescription>
                    You are following {totalFollowing}{" "}
                    {totalFollowing === 1 ? "item" : "items"}.
                  </DialogDescription>
                </DialogHeader>

                {/* Render the list of following users inside the dialog */}
                <div className="flex flex-col space-y-2">
                  <h2 className="text-lg font-semibold">Following Users</h2>
                  {totalFollowingUsers > 0 ? (
                    user.FollowingUsers.map((followingUser, index) => (
                      <Link
                        key={index}
                        href={`/profile/${followingUser.following.id}/user`}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={
                              followingUser.following.imageUrl ??
                              "/default-profile-pic.png"
                            }
                            alt={`${followingUser.following.userName}'s profile picture`}
                            className="w-8 h-8 rounded-full" // Small circle for profile picture
                          />
                          <p>
                            {followingUser.following.userName ??
                              "No name available"}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p>No users followed.</p>
                  )}

                  <h2 className="text-lg font-semibold">
                    Following Communities
                  </h2>
                  {totalFollowingCommunities > 0 ? (
                    user.Following.map((followingCommunity, index) => {
                      const communityNameLink = replaceSpaceWithPercent20(
                        followingCommunity.Community?.name
                      );

                      return (
                        <Link
                          key={index}
                          href={`/community/${communityNameLink}`}
                        >
                          <div className="flex items-center space-x-2">
                            {/* Lucide React icon next to the community name */}
                            <User className="w-5 h-5 text-blue-500" />
                            <p>
                              {followingCommunity.Community?.name ??
                                "No name available"}
                            </p>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p>No communities followed.</p>
                  )}
                </div>

                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
