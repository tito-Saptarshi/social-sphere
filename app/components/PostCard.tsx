/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  HeartIcon,
  ImageIcon,
  MessageCircleIcon,
  PlayCircleIcon,
  ShareIcon,
  ThumbsDownIcon,
} from "lucide-react";
import Image from "next/image";

interface Props {
  id: string;
  userName: string | null;
  profilePic: string | null;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
}

const posts = [
  {
    author: "John Doe",
    authorAvatar: "/placeholder.svg",
    timestamp: "2 hours ago",
    image: "/placeholder.svg?height=300&width=400",
    title: "My Amazing Adventure",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 42,
    dislikes: 5,
    comments: 12,
  },
  {
    author: "Jane Smith",
    authorAvatar: "/placeholder.svg",
    timestamp: "5 hours ago",
    image: "/placeholder.svg?height=300&width=400",
    title: "Cooking Masterclass",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 89,
    dislikes: 2,
    comments: 24,
  },
];

export function PostCard({
  id,
  userName,
  title,
  description,
  imageUrl,
  profilePic,
  videoUrl,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const toggleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleToggleMedia = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  // Use Intersection Observer to play/pause video
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 } // Adjust this threshold as needed
    );

    observer.observe(videoRef.current);

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [isVideoVisible]);
  return (
    <Card className="mb-4 lg:mr-5 mx-auto w-full lg:w-4/5">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={profilePic ?? "/placeholder.svg"}
            alt="profile pic"
          />
          <AvatarFallback>{userName}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold">{userName}</h3>
          <p className="text-sm text-muted-foreground">Date</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="font-bold text-lg">{title}</h4>

        {/* Media container */}
        {(videoUrl || imageUrl) && (
          <div className="relative w-full h-[300px] lg:h-[400px] bg-black overflow-hidden">
            {videoUrl && isVideoVisible ? (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain"
                controls
                src={`https://jgpzentnejvbbjcrtjnu.supabase.co/storage/v1/object/public/images/${videoUrl}`}
                onError={(e) => console.error("Error playing video:", e)}
              />
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-contain"
                layout="fill"
              />
            ) : null}

            {/* Toggle button overlay for switching media */}
            {imageUrl && videoUrl && (
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                onClick={handleToggleMedia}
              >
                {isVideoVisible ? (
                  <ImageIcon className="w-5 h-5" />
                ) : (
                  <PlayCircleIcon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        )}

        <p>
          {expanded ? description : `${description?.slice(0, 100)}...`}
          {description !== null &&
            description !== undefined &&
            description.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-primary font-semibold ml-2"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleLike}>
            <HeartIcon
              className={`w-5 h-5 mr-1 ${
                liked ? "text-red-500 fill-red-500" : ""
              }`}
            />
            {posts[0].likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleDislike}>
            <ThumbsDownIcon
              className={`w-5 h-5 mr-1 ${
                disliked ? "text-blue-500 fill-blue-500" : ""
              }`}
            />
            {posts[0].dislikes}
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <MessageCircleIcon className="w-5 h-5 mr-1" />
            {posts[0].comments}
          </Button>
          <Button variant="ghost" size="sm">
            <ShareIcon className="w-5 h-5 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
