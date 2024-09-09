import { Button } from "@/components/ui/button";

import { PenIcon, User, UsersIcon } from "lucide-react";
import { DigitalClock } from "./DigitalClock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      bio: true,
      imageUrl: true,
    },
  });

  return data;
}

const CreateOptions = () => (
  <div className="flex justify-center space-x-4">
    <Button variant="outline" size="icon" className="w-12 h-12 rounded-full">
      <PenIcon className="h-6 w-6" />
      <span className="sr-only">Create Post</span>
    </Button>
    <Button variant="outline" size="icon" className="w-12 h-12 rounded-full">
      <UsersIcon className="h-6 w-6" />
      <span className="sr-only">Create Group</span>
    </Button>
  </div>
);

export async function RightSidebar() {

  let loading = false;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) loading = true;
  let data;
  if (user) {
    data = await getData(user.id);
  }
  return (
    <div className="space-y-6">
      {loading ? (
        <DigitalClock />
      ) : (
        <>
          <DigitalClock />
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={data?.imageUrl ?? "https://avatar.vercel.sh/helloworld"}
                alt="@shadcn"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{data?.userName}</h2>
            <Link href={`profile/${user?.id}/user`}>
              <p className="flex text-sm text-muted-foreground hover:cursor-pointer items-center justify-end">
                <User className="h-4 w-4 mx-1" />
                update profile
              </p>
            </Link>
            <p className="text-sm text-center">{data?.bio ?? ""}</p>
          </div>
          <CreateOptions />
        </>
      )}
    </div>
  );
}
