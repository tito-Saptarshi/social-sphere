import { PostCard } from "@/app/components/testComponents/PostCard";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string | undefined) {
  const data = await prisma.testUpload.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      other: true,
      imageUrl: true,
    },
  });
  return data;
}

export default async function PlayVideo() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);
  if (!user) redirect("/");
  return (
    <div>
      <h1>play video</h1>
      <h1>{user.id}</h1>

      <div>
        {data.map((post) => (
          <div key={post.id}>
            <PostCard videoUrl={post.imageUrl} />
            {post.name}
          </div>
        ))}
      </div>
    </div>
  );
}
