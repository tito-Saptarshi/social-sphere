import React from "react";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { User } from "lucide-react";
import prisma from "@/app/lib/db";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

async function getData(userId: string) {
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
              id: true,
              userName: true,
              imageUrl: true, // Fetch the image URL for the profile picture
            },
          },
        },
      },
      Followers: {
        select: {
          follower: {
            select: {
              id: true,
              userName: true,
              imageUrl: true, // Fetch the image URL for the profile picture
            },
          },
        },
      },
      Following: {
        select: {
          Community: {
            select: {
              id: true,
              name: true,
              description: true,
              Followers: {
                select: {
                  User: {
                    select: {
                      id: true,
                      userName: true,
                      imageUrl: true,
                    },
                  },
                },
              },
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

export default async function ViewFollowers() {
  const { getUser } = getKindeServerSession();
  const data = await getUser();
  const user = await getData(data?.id ?? "");

  if (!user) {
    return <div>No user data found.</div>;
  }

  // Calculate the total number of users and communities the user is following
  const totalFollowingUsers = user.FollowingUsers.length;
  const totalFollowingCommunities = user.Following.length;
  const totalFollowing = totalFollowingUsers + totalFollowingCommunities;

  // Calculate the total number of followers the user has
  const totalFollowers = user.Followers.length;

  // Get the total number of posts created by the user
  const totalPosts = user._count.Post;

  return (
    <div>
      <h1>View Followers and Following</h1>

      {/* Display the total number of posts created by the user */}
      <p>Total Posts: {totalPosts}</p>

      {/* Button to trigger the "Following" dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{totalFollowing} Following</Button>
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
                  href={`profile/${followingUser.following?.id}/user`}
                  passHref
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <img
                      src={
                        followingUser.following.imageUrl ??
                        "/default-profile-pic.png"
                      }
                      alt={`${followingUser.following.userName}'s profile picture`}
                      className="w-8 h-8 rounded-full" // Small circle for profile picture
                    />
                    <p>
                      {followingUser.following.userName ?? "No name available"}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No users followed.</p>
            )}

            <h2 className="text-lg font-semibold">Following Communities</h2>
            {totalFollowingCommunities > 0 ? (
              user.Following.map((followingCommunity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {/* Lucide React icon next to the community name */}
                  <User className="w-5 h-5 text-blue-500" />
                  <p>
                    {followingCommunity.Community?.name ?? "No name available"}
                  </p>
                </div>
              ))
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

      {/* Button to trigger the "Followers" dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{totalFollowers} Followers</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
            <DialogDescription>Users who are following you.</DialogDescription>
          </DialogHeader>

          {/* Render the list of followers inside the dialog */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">Followers</h2>
            {totalFollowers > 0 ? (
              user.Followers.map((follower, index) => (
                <Link
                  key={index}
                  href={`profile/${follower.follower?.id}/user`}
                  passHref
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <img
                      src={
                        follower.follower.imageUrl ?? "/default-profile-pic.png"
                      }
                      alt={`${follower.follower.userName}'s profile picture`}
                      className="w-8 h-8 rounded-full" // Small circle for profile picture
                    />
                    <p>{follower.follower.userName ?? "No name available"}</p>
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

      {/* Button to trigger the "Community Followers" dialog */}
      {user.Following.map((followingCommunity, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Button variant="outline">
              {followingCommunity.Community?.name} Followers
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {followingCommunity.Community?.name} Followers
              </DialogTitle>
              <DialogDescription>
                Users who are following this community.
              </DialogDescription>
            </DialogHeader>

            {/* Render the list of community followers inside the dialog */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold">Community Followers</h2>
              {followingCommunity.Community?.Followers.length ?? 0 > 0 ? (
                followingCommunity.Community?.Followers.map(
                  (communityFollower, index) => (
                    <Link
                      key={index}
                      href={`profile/${communityFollower.User?.id}/user`}
                      passHref
                    >
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <img
                          src={
                            communityFollower.User?.imageUrl ??
                            "/default-profile-pic.png"
                          }
                          alt={`${communityFollower.User?.userName}'s profile picture`}
                          className="w-8 h-8 rounded-full" // Small circle for profile picture
                        />
                        <p>
                          {communityFollower.User?.userName ??
                            "No name available"}
                        </p>
                      </div>
                    </Link>
                  )
                )
              ) : (
                <p>No followers for this community.</p>
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
      ))}
    </div>
  );
}
