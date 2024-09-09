import { CreateComNewPost } from "@/app/components/CreateComNewPost";
import { NewPost } from "@/app/components/NewPost";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string | undefined) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      email: true,
      userName: true,
    },
  });
  return data;
}

export default async function CreateCommunityPostNew({params} : {params: {_id: string}}) {
 
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);
  return <CreateComNewPost userId={user?.id} userName={data?.userName} communityId={params._id}/>;
}
