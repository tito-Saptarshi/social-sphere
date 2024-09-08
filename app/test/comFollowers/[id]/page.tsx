import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
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
import { UserIcon } from "lucide-react";
import Link from "next/link";

async function getData(communityId: string) {
  const communityData = await prisma.community.findUnique({
    where: {
      id: communityId,
    },
    select: {
      Followers: {
        where: {
          follow: true,
        },
        select: {
          id: true,
          User: {
            select: {
              id: true,
              imageUrl: true,
              userName: true,
            },
          },
        },
      },
    },
  });

  return communityData?.Followers || [];
}

// interface CommunityFollowingDialogProps {
//   communityId: string;
// }

export default async function CommunityFollowingDialog({
  params,
}: {
  params: { id: string };
}) {
  const followingData = await getData(params.id);

  const totalFollowingUsers = followingData.length;
  const totalFollowingCommunities = followingData.filter(
    (follower) => follower.User
  ).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{totalFollowingUsers} Following</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Following</DialogTitle>
          <DialogDescription>
            You are following {totalFollowingUsers}{" "}
            {totalFollowingUsers === 1 ? "user" : "users"}.
          </DialogDescription>
        </DialogHeader>

        {/* Render the list of following users inside the dialog */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">Following Users</h2>
          {totalFollowingUsers > 0 ? (
            followingData.map((following, index) => (
              <Link key={index} href={`/profile/${following.User?.id}/user`}>
                <div className="flex items-center space-x-2">
                  <img
                    src={following.User?.imageUrl ?? "/default-profile-pic.png"}
                    alt={`${following.User?.userName}'s profile picture`}
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{following.User?.userName ?? "No name available"}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No users followed.</p>
          )}

          {/* Assuming you also want to list communities following */}
          <h2 className="text-lg font-semibold">Following Communities</h2>
          {totalFollowingCommunities > 0 ? (
            followingData.map((following, index) => {
              if (!following.User) return null; // Skip if not a community follow

              return (
                <Link
                  key={index}
                  href={`/community/${encodeURIComponent(
                    following.User.userName ?? ""
                  )}`}
                >
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-blue-500" />
                    <p>{following.User.userName ?? "No name available"}</p>
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
  );
}
