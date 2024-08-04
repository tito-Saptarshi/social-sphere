import { CommunityPosts } from "@/app/components/CommunityPosts";
import prisma from "@/app/lib/db";

async function getData(name: string) {
  const data = await prisma.community.findUnique({
    where: {
      name: name,
    },
    select: {
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
  return ( <div>
    <CommunityPosts name={data?.name}/>
  </div>)
}
