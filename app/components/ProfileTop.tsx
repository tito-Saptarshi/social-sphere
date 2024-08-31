import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, UserPlus } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { followUser, unfollowUser } from "../actions";
import { FollowUserFun } from "./UserFollow";

interface Props {
  id: string;
  currUserId: string | undefined;
  profilePhoto: string | null | undefined;
  userName: string | null | undefined;
  bio: string | null | undefined;
}

// follower -> curr userId
// following -> props userid

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

export async function ProfileTop({
  id,
  currUserId,
  profilePhoto,
  userName,
  bio,
}: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  const currentlyFollowing = await isFollowing(currUserId ?? "", id);

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
        <div className="flex justify-center md:justify-start space-x-4 mb-4">
          <FollowUserFun followerId={currUserId} followingId={id} currentlyFollowing={currentlyFollowing}/>
          <Button variant="outline" disabled>
            <MessageCircle className="mr-2 h-4 w-4" /> Message
          </Button>
        </div>
        <div className="flex justify-center md:justify-start space-x-8">
          <div>
            <span className="font-bold">42</span> posts
          </div>
          <div>
            <span className="font-bold">1.5k</span> followers
          </div>
          <div>
            <span className="font-bold">300</span> following
          </div>
        </div>
      </div>
    </div>
  );
}
