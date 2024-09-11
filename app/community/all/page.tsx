import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Lock, Globe } from "lucide-react";
import Link from "next/link";

async function getData() {
  const names = await prisma.community.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      creator: {
        select: {
          userName: true,
          email: true,
        },
      },
      Followers: {
        select: {
          id: true,
          follow: true,
          userId: true,
        },
      },
    },
  });
  return names;
}

// Mock data for groups
const groups = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    description:
      "A group for sharing and discussing photography techniques and equipment.",
    creator: { name: "Alice Johnson", avatar: "/placeholder-user.jpg" },
    members: 1250,
    privacy: "public",
  },
  {
    id: 2,
    name: "Fitness Fanatics",
    description: "Join us for daily workout challenges and nutrition tips!",
    creator: { name: "Bob Smith", avatar: "/placeholder-user.jpg" },
    members: 3420,
    privacy: "public",
  },
  {
    id: 3,
    name: "Book Club",
    description:
      "Monthly book discussions and recommendations for avid readers.",
    creator: { name: "Carol Davis", avatar: "/placeholder-user.jpg" },
    members: 890,
    privacy: "private",
  },
  {
    id: 4,
    name: "Tech Innovators",
    description: "Discussing the latest in technology and innovation.",
    creator: { name: "David Wilson", avatar: "/placeholder-user.jpg" },
    members: 2100,
    privacy: "public",
  },
  {
    id: 5,
    name: "Foodies Unite",
    description: "Share recipes, restaurant reviews, and culinary adventures!",
    creator: { name: "Eva Martinez", avatar: "/placeholder-user.jpg" },
    members: 5600,
    privacy: "public",
  },
];

export default async function GroupList() {
  const data = await getData();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Discover Communities</h1>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    {group.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  {group.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={group.imageUrl ?? ""}
                      alt={group.imageUrl ?? ""}
                    />
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      Created by {group.creator?.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      <Users className="h-3 w-3 inline mr-1" />
                      {group?.Followers.reduce((acc, followers) => {
                        if (followers.follow === true) return acc + 1;
                        if (followers.follow === false) return acc;
                        return acc;
                      }, 0) ?? 0}{" "}
                      members
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/community/${group.name}`} className="w-full">
                  <Button className="w-full">Visit Community</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
