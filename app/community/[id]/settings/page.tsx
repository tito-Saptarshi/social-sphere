
import { CommunityUpdate } from "@/app/components/CommunityUpdate";

import prisma from "@/app/lib/db";

import { unstable_noStore as noStore } from "next/cache";

async function getData(communityId: string) {
  noStore();
  const data = await prisma.community.findUnique({
    where: {
      id: communityId,
    },
    select: {
      name: true,
      description: true,
      createdAt: true,
      userId: true,
      imageUrl: true,
    },
  });
  return data;
}
const initialState = {
  message: "",
  status: "",
};

export default async function CommunitySettings({
  params,
}: {
  params: { id: string };
}) {
 
  const data = await getData(params.id);

  return (
    <div className="mt-10">
      
      <CommunityUpdate
        communityId={params.id}
        communityName={data?.name}
        description={data?.description}
        imageUrl={data?.imageUrl}
        updatedAt={data?.createdAt} 
      />
    </div>
  );
}
