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
  MoveRight,
  PlayCircleIcon,
  ShareIcon,
  ThumbsDownIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { likesCount, postLikes } from "../actions";
import Link from "next/link";

interface Props {
  id: string;
  userId: string | undefined;
  userName: string | null;
  profilePic: string | null;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  totalLikes: number;
  likeType: boolean;
  totalComments: number;
  comName: string | null;
  commId: string;
}

export function PostCard({
  id,
  userId,
  userName,
  title,
  description,
  imageUrl,
  profilePic,
  videoUrl,
  totalLikes,
  likeType,
  totalComments,
  comName,
  commId,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(!!videoUrl); // Initialize based on videoUrl presence
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [newLikes, setNewLikes] = useState(totalLikes);
  const [boolLikes, setBoolLikes] = useState(likeType);

  const likePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("postId", id);

    try {
      await postLikes(formData, !boolLikes, id, userName || "", title);
      setBoolLikes(!boolLikes);
      setNewLikes((prevLikes) => (boolLikes ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  const handleToggleMedia = () => {
    if (videoUrl && imageUrl) {
      setIsVideoVisible(!isVideoVisible);
    }
  };

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
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVideoVisible]);

  return (
    <Card className="mb-4 lg:mr-5 mx-auto w-full lg:w-4/5">
      <Link href={`/profile/${userId}/user`}>
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
            {/* <p className="text-sm text-muted-foreground">
              {boolLikes ? "true" : "false"}
            </p>
            <p className="text-sm text-muted-foreground">
              {likeType ? "true fetch" : "false fetch"}
            </p> */}

            <p className="flex text-sm text-muted-foreground items-center">
              {comName !== "No Community" ? (
                <>
                  <UsersIcon className="w-4 h-4 mr-1" />
                  {comName}
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
        </CardHeader>
      </Link>
      <Link href={`/post/${id}`}>
        <CardContent className="space-y-4">
          <h4 className="font-bold text-lg">{title}</h4>

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

              {imageUrl && videoUrl && (
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                  onClick={handleToggleMedia}
                >
                  {isVideoVisible ? (
                    <MoveRight className="w-5 h-5 bg-slate-500 rounded-full p-1" />
                  ) : (
                    <MoveRight className="w-5 h-5 bg-slate-500 rounded-full p-1" />
                  )}
                </button>
              )}
            </div>
          )}

          <p>
            {expanded ? description : `${description?.slice(0, 100)}...`}
            {description && description.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-primary font-semibold ml-2"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <form onSubmit={likePost}>
            <input type="hidden" name="userName" value={userName || ""} />
            <input type="hidden" name="postTitle" value={title || ""} />
            <Button variant="ghost" size="sm" type="submit">
              <HeartIcon
                className={`w-5 h-5 mr-1 ${
                  boolLikes ? "text-red-500 fill-red-500" : ""
                }`}
              />
              {newLikes}
            </Button>
          </form>
        </div>
        <div className="flex space-x-2">
          <Link href={`/post/${id}`}>
            <Button variant="ghost" size="sm">
              <MessageCircleIcon className="w-5 h-5 mr-1" />
              {/* Replace with actual comment count */} {totalComments}
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <ShareIcon className="w-5 h-5 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
