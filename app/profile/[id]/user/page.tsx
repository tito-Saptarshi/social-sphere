 
import { Separator } from "@/components/ui/separator";
import prisma from "@/app/lib/db";
import { ProfileTop } from "@/app/components/ProfileTop";
import { ProfileBottom } from "@/app/components/ProfileBottom";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
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

export default async function MyProfile({
  params,
}: {
  params: { id: string };
}) {
  const posts = [
    {
      type: "image",
      content: "/placeholder.svg?height=300&width=300",
      caption: "Beautiful sunset",
      likes: 120,
      comments: 15,
    },
    {
      type: "video",
      content: "/placeholder.svg?height=300&width=300",
      caption: "My new dance routine",
      likes: 89,
      comments: 32,
    },
    {
      type: "text",
      content: "Just had an amazing day!",
      caption: "",
      likes: 56,
      comments: 8,
    },
    {
      type: "image",
      content: "/placeholder.svg?height=300&width=300",
      caption: "Delicious meal",
      likes: 203,
      comments: 28,
    },
    {
      type: "text",
      content: "Excited for the weekend!",
      caption: "",
      likes: 45,
      comments: 5,
    },
    {
      type: "video",
      content: "/placeholder.svg?height=300&width=300",
      caption: "Live concert footage",
      likes: 178,
      comments: 42,
    },
  ];

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(params.id);
  noStore();
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileTop
        id={params.id}
        currUserId={user?.id}
        userName={data?.userName}
        bio={data?.bio}
        profilePhoto={data?.imageUrl}
      />
      
      <Separator className="mt-3 mb-5 p-0.5 rounded-full" />

      <ProfileBottom userId={params.id} />
{/* 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="relative aspect-square group">
            {post.type === "image" && (
              <img
                src={post.content}
                alt={post.caption}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {post.type === "video" && (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
            )}
            {post.type === "text" && (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center p-4 rounded-lg">
                <p className="text-center font-medium">{post.content}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
              {post.caption && (
                <p className="text-white text-sm mb-2">{post.caption}</p>
              )}
              <div className="flex justify-between text-white">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>  
        ))}
      </div> */}
    </div>
  );
}
