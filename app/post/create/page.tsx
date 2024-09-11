import { NewPost } from "@/app/components/NewPost";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

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

export default async function CreatePost() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await getData(user?.id);
  return <NewPost userId={user?.id} userName={data?.userName} />;
}
