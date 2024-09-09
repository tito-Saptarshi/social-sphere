import { CommunityForm } from "@/app/components/CommunityForm";
import prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
    },
  });

  return data;
}

export default async function CommunityPage() {

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  const data = await getData(user.id);
  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6 ml-5">
        <div>
          <h1 className="text-2xl font-bold py-2">Create Community</h1>
          <p className="text-muted-foreground">
            Tell us about your Community Page
          </p>
        </div>
      </div>
      <Separator className="mt-10 mb-2 mx-2" />
      <CommunityForm userName={data?.userName}/>
    </div>
  );
}
