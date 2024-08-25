"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HeartIcon, MessageCircleIcon, ShareIcon, ThumbsDownIcon, MenuIcon, PlusIcon, PenIcon, UsersIcon } from 'lucide-react'

const DigitalClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-2xl font-bold mb-4 mt-2 text-right">
      {time && time.toLocaleTimeString()}
    </div>
  );
};

const CreateOptions = () => (
  <div className="flex justify-center space-x-4">
    <Button variant="outline" size="icon" className="w-12 h-12 rounded-full">
      <PenIcon className="h-6 w-6" />
      <span className="sr-only">Create Post</span>
    </Button>
    <Button variant="outline" size="icon" className="w-12 h-12 rounded-full">
      <UsersIcon className="h-6 w-6" />
      <span className="sr-only">Create Group</span>
    </Button>
  </div>
)

const CombinedSidebar = () => (
  <div className="space-y-6">
    <DigitalClock />
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src="/placeholder.svg" alt="User" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-bold">User Name</h2>
      <p className="text-sm text-muted-foreground">@username</p>
      <p className="text-sm text-center">Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <CreateOptions />
  </div>
)

const PostCard = ({ post }: any) => {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.authorAvatar} alt={post.author} />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold">{post.author}</h3>
          <p className="text-sm text-muted-foreground">{post.timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <img src={post.image} alt={post.title} className="w-full rounded-lg" />
        <h4 className="font-bold text-lg">{post.title}</h4>
        <p>{post.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)}>
            <HeartIcon className={`w-5 h-5 mr-1 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDisliked(!disliked)}>
            <ThumbsDownIcon className={`w-5 h-5 mr-1 ${disliked ? 'text-blue-500 fill-blue-500' : ''}`} />
            {post.dislikes}
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <MessageCircleIcon className="w-5 h-5 mr-1" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <ShareIcon className="w-5 h-5 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const FloatingActionButton = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg" size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-40" align="end">
      <div className="flex flex-col space-y-2">
        <Button variant="ghost" className="justify-start">
          <PenIcon className="mr-2 h-4 w-4" />
          Create Post
        </Button>
        <Button variant="ghost" className="justify-start">
          <UsersIcon className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>
    </PopoverContent>
  </Popover>
)

export default function Component() {
  const [loading, setLoading] = useState(true)
  const posts = [
    {
      author: 'John Doe',
      authorAvatar: '/placeholder.svg',
      timestamp: '2 hours ago',
      image: '/placeholder.svg?height=300&width=400',
      title: 'My Amazing Adventure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 42,
      dislikes: 5,
      comments: 12,
    },
    {
      author: 'Jane Smith',
      authorAvatar: '/placeholder.svg',
      timestamp: '5 hours ago',
      image: '/placeholder.svg?height=300&width=400',
      title: 'Cooking Masterclass',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      likes: 89,
      dislikes: 2,
      comments: 24,
    },
  ]

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">FunkyMedia</h1>
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <CombinedSidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="md:col-span-2 lg:col-span-3 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          )}
        </div>
        <div className="hidden md:block">
          <Card className="sticky top-4">
            <CardContent>
              <CombinedSidebar />
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  )
}