import prisma from "@/app/lib/db";
import Link from "next/link";

async function getData() {
  const names = await prisma.community.findMany({
    select: {
      name: true,
      creator: {
        select: {
          userName: true,
          email: true,   
        },
      },
    },
  });
  return names;
}

export default async function TestNameCommunity() {
  const names = await getData();
  return (
    <div className="p-20">
      <div>
        {names.map((name) => {
          return (
            <div key={name.name} className="py-2">
              <Link href={`/community/${name.name}`} className="flex gap-x-10"><span>
                {name.name}</span> - <span>{name.creator?.userName}</span> - <span>{name.creator?.email}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
