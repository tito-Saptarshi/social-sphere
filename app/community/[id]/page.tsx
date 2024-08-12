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
      imageUrl: true
    }
  })
  return data;
}


export default async function Community({ params }: { params: { id: string } }) {
  function replacePercent20(str: string | "" | null | undefined): string {
    if (str === null || str === undefined) {
      return "s";
    }
    return str.replace(/%20/g, ' ');
  }
  const newName = replacePercent20(params.id ?? "");
  const data = await getData(newName);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return ( <div>
    <CommunityPosts communityId={data?.id} userId={data?.userId} name={data?.name} description={data?.description} createdAt={data?.createdAt} currUserId={user?.id} imageUrl={data?.imageUrl}/>
  </div>)
}
