"use client";

import { Button } from "@/components/ui/button";
import { followUser, unfollowUser } from "../actions";
import prisma from "../lib/db";
import { FollowUserButton } from "./SubmitButtons";
import { UserPlus } from "lucide-react";

async function isFollowing(
  followerId: string,
  followingId: string
): Promise<boolean> {
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

async function toggleFollow(
  followerId: string,
  followingId: string,
  currentlyFollowing: boolean
) {
  if (currentlyFollowing) {
    await unfollowUser(followerId, followingId);
    console.log(`User ${followerId} unfollowed user ${followingId}`);
  } else {
    await followUser(followerId, followingId);
    console.log(`User ${followerId} followed user ${followingId}`);
  }
}

interface Props {
  followerId: string | undefined;
  followingId: string;
  currentlyFollowing: boolean;
}

export function FollowUserFun({
  followerId,
  followingId,
  currentlyFollowing,
}: Props) {
  return (
    <div>
      {currentlyFollowing ? (
        <Button
          onClick={() => {
            toggleFollow(followerId ?? "", followingId, currentlyFollowing);
          }}
          variant="outline"
          size="sm"
        >
          Unfollow
        </Button>
      ) : (
        <Button
          onClick={() => {
            toggleFollow(followerId ?? "", followingId, currentlyFollowing);
          }}
        >
          <UserPlus className="mr-2 h-4 w-4" /> Follow
        </Button>
      )}
    </div>
  );
}
