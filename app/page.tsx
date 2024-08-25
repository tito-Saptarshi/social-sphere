import { PostCard } from "./components/PostCard";
import { RightSidebar } from "./components/RightSideBar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, PlusCircleIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingActionButton } from "./components/FloatingActionButton";
import prisma from "./lib/db";

async function getData() {
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        videoUrl: true,
        createdAt: true,
        User: {
          select: {
            userName: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { count, data };
}

export default async function Home() {
  const loading = false;
  const { count, data } = await getData();
  return (
    <div className="container mx-auto p-4 max-w-[1250px]">
      <h1 className="text-2xl font-bold mb-4 text-center">FunkyMedia</h1>
      <div className="md:hidden mb-4 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <RightSidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="md:col-span-2 lg:col-span-3 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                userName={post.User.userName}
                profilePic={post.User.imageUrl}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                videoUrl={post.videoUrl}
              />
            ))
          )}
        </div>
        <div className="hidden md:block">
          <Card className="sticky top-4">
            <CardContent>
              <RightSidebar />
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
}
