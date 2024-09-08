import prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Copy, User } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
              name: true,
              description: true,
            },
          },
        },
      },
      _count: {
        select: {
          FollowingUsers: true,
          Followers: true,
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
  const totalFollowingUsers = user.FollowingUsers.length;
  const totalFollowingCommunities = user.Following.length;
  const totalFollowing = totalFollowingUsers + totalFollowingCommunities;
  const totalFollowers = user.Followers.length;
  return (
    <div>
      <h1>View Followers</h1>
      <Separator className="p-1" />
      {/* Display the number of following users and followers */}
      <div>
        <h2>Following Count:</h2>
        <p>{user._count.FollowingUsers ?? 0} users</p>

        <h2>Followers Count:</h2>
        <p>{user._count.Followers ?? 0} users</p>
      </div>
      <Separator className="p-1" />
      {/* Display Users the Current User is Following */}
      <h2>Following Users:</h2>
      {user.FollowingUsers.length > 0 ? (
        user.FollowingUsers.map((followingUser, index) => (
          <div key={index}>
            <p>
              User Name:{" "}
              {followingUser.following.userName ?? "No name available"}
            </p>

            <Separator className="p-1" />
          </div>
        ))
      ) : (
        <p>No users followed.</p>
      )}
      {/* Display Users Following the Current User */}
      <h2>Followers:</h2>
      {user.Followers.length > 0 ? (
        user.Followers.map((followerUser, index) => (
          <div key={index}>
            <p>
              User Name: {followerUser.follower.userName ?? "No name available"}
            </p>

            <Separator className="p-1" />
          </div>
        ))
      ) : (
        <p>No followers.</p>
      )}
      {/* Display Communities the Current User is Following */}
      <h2>Following Communities:</h2>
      {user.Following.length > 0 ? (
        user.Following.map((community, index) => (
          <div key={index}>
            <p>
              Community Name: {community.Community?.name ?? "No name available"}
            </p>
            <p>
              Description:{" "}
              {community.Community?.description ?? "No description available"}
            </p>
          </div>
        ))
      ) : (
        <p>No communities followed.</p>
      )}
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Share</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Following</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">users 1 users 2</div>
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
      return (
      <div>
        <h1>View Followers</h1>

        {/* Button to trigger the dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Following</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Following</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>

            {/* Render the list of following users inside the dialog */}
            <div className="flex flex-col space-y-2">
              {user.FollowingUsers.length > 0 ? (
                user.FollowingUsers.map((followingUser, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <p>
                      User Name:{" "}
                      {followingUser.following.userName ?? "No name available"}
                    </p>
                  </div>
                ))
              ) : (
                <p>No users followed.</p>
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
      );
      <div>
        <h1>View Followers</h1>

        {/* Button to trigger the dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Following</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Following</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>

            {/* Render the list of following users inside the dialog */}
            <div className="flex flex-col space-y-2">
              {user.FollowingUsers.length > 0 ? (
                user.FollowingUsers.map((followingUser, index) => (
                  <div key={index} className="flex items-center space-x-2">
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
                ))
              ) : (
                <p>No users followed.</p>
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
        <h1>View Followers</h1>

        {/* Button to trigger the dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Following</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Following</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>

            {/* Render the list of following users inside the dialog */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold">Following Users</h2>
              {user.FollowingUsers.length > 0 ? (
                user.FollowingUsers.map((followingUser, index) => (
                  <div key={index} className="flex items-center space-x-2">
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
                ))
              ) : (
                <p>No users followed.</p>
              )}

              <h2 className="text-lg font-semibold">Following Communities</h2>
              {user.Following.length > 0 ? (
                user.Following.map((followingCommunity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {/* Lucide React icon next to the community name */}
                    <User className="w-5 h-5 text-blue-500" />
                    <p>
                      {followingCommunity.Community?.name ??
                        "No name available"}
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
      </div>
      <div>
        <h1>View Followers and Following</h1>

        {/* Button to trigger the "Following" dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Following</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Following</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>

            {/* Render the list of following users inside the dialog */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold">Following Users</h2>
              {user.FollowingUsers.length > 0 ? (
                user.FollowingUsers.map((followingUser, index) => (
                  <div key={index} className="flex items-center space-x-2">
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
                ))
              ) : (
                <p>No users followed.</p>
              )}

              <h2 className="text-lg font-semibold">Following Communities</h2>
              {user.Following.length > 0 ? (
                user.Following.map((followingCommunity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {/* Lucide React icon next to the community name */}
                    <User className="w-5 h-5 text-blue-500" />
                    <p>
                      {followingCommunity.Community?.name ??
                        "No name available"}
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
            <Button variant="outline">View Followers</Button>
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
              {user.Followers.length > 0 ? (
                user.Followers.map((follower, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <img
                      src={
                        follower.follower.imageUrl ?? "/default-profile-pic.png"
                      }
                      alt={`${follower.follower.userName}'s profile picture`}
                      className="w-8 h-8 rounded-full" // Small circle for profile picture
                    />
                    <p>{follower.follower.userName ?? "No name available"}</p>
                  </div>
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
        <h1>View Followers and Following</h1>

        {/* Button to trigger the "Following" dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Following</Button>
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
                  <div key={index} className="flex items-center space-x-2">
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
                      {followingCommunity.Community?.name ??
                        "No name available"}
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
            <Button variant="outline">View Followers</Button>
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
              {user.Followers.length > 0 ? (
                user.Followers.map((follower, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <img
                      src={
                        follower.follower.imageUrl ?? "/default-profile-pic.png"
                      }
                      alt={`${follower.follower.userName}'s profile picture`}
                      className="w-8 h-8 rounded-full" // Small circle for profile picture
                    />
                    <p>{follower.follower.userName ?? "No name available"}</p>
                  </div>
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
        <h1>View Followers and Following</h1>

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
                  <div key={index} className="flex items-center space-x-2">
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
                      {followingCommunity.Community?.name ??
                        "No name available"}
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
              <DialogDescription>
                Users who are following you.
              </DialogDescription>
            </DialogHeader>

            {/* Render the list of followers inside the dialog */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold">Followers</h2>
              {totalFollowers > 0 ? (
                user.Followers.map((follower, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <img
                      src={
                        follower.follower.imageUrl ?? "/default-profile-pic.png"
                      }
                      alt={`${follower.follower.userName}'s profile picture`}
                      className="w-8 h-8 rounded-full" // Small circle for profile picture
                    />
                    <p>{follower.follower.userName ?? "No name available"}</p>
                  </div>
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
    </div>
  );
}
