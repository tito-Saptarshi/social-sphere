import { CommunityPosts } from "@/app/components/CommunityPosts";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(name: string) {
  const data = await prisma.community.findUnique({
    where: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      userId: true,
    }
  })
  return data;
}


export default async function Community({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return ( <div>
    <CommunityPosts communityId={data?.id} userId={data?.userId} name={data?.name} description={data?.description} createdAt={data?.createdAt} currUserId={user?.id} />
  </div>)
}
