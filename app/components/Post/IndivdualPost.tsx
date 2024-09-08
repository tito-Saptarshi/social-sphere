"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoveRight,
  Settings,
  Edit,
} from "lucide-react";
import { likesCount, postLikes } from "@/app/actions";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CommunityDescription } from "../CommunityDescription";
import { PostUpdate } from "./PostUpdate";
import { CommentForm } from "../Comments/CommentForm";
import { RenderComments } from "../Comments/CommentRender";

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
  currUserId: string | undefined;
  comments: any;
  totalComments: number;
}

const images = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600&text=Image+2",
  "/placeholder.svg?height=400&width=600&text=Image+3",
];

export function IndividualPost({
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
  currUserId,
  comments,
  totalComments
}: Props) {
  const [commentText, setCommentText] = useState("");

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
    <Card className="w-full max-w-3xl mx-auto mt-3">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={profilePic ?? "/placeholder.svg"}
              alt="profile pic"
            />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">@{userName}</p>
              <p className="text-sm text-muted-foreground">
                Posted 2 hours ago
              </p>
            </div>
            {currUserId === userId ? (
              <Dialog>
                <DialogTrigger asChild className="mt-10">
                  <div className="flex items-center gap-x-1 hover:cursor-pointer hover:font-bold">
                    {" "}
                    <Settings className="h-4 w-4" /> edit
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Post</DialogTitle>
                    <Separator />
                    <DialogDescription>
                      Update Title and Description :
                    </DialogDescription>
                    <PostUpdate
                      title={title}
                      description={description}
                      postId={id}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ) : (
              <></>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {/* <div className="relative">
          <img
            src={images[currentImage]}
            alt={`Image ${currentImage + 1}`}
            className="w-full h-[400px] object-cover rounded-md"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={prevImage}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImage ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div> */}
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
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex justify-between items-center w-full">
          {/* <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-1 ${
              liked ? "text-red-500" : ""
            }`}
            onClick={() => setLiked(!liked)}
          >
            <HeartIcon className="h-5 w-5" />
            <span>{liked ? "Liked" : "Like"}</span>
          </Button> */}
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
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <MessageCircleIcon className="h-5 w-5" />
            <span>{totalComments} Comments</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <ShareIcon className="h-5 w-5" />
            <span>Share</span>
          </Button>
        </div>
        {/* <div className="w-full">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div> */}
        <CommentForm postId={id} />
        {comments.map((comment: any) => {
        return (
          <RenderComments key={comment.id}
          userName={comment.User?.userName}
          comment={comment.text}
          imageUrl={comment.User?.imageUrl}
          userId={comment.User?.id}/>
          
        )
      })}
        {/* <div className="w-full space-y-2">
          <div className="flex items-start space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">@johndoe</p>
              <p className="text-sm text-muted-foreground">
                Wow, what a beautiful view! 😍
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" alt="@janedoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">@janedoe</p>
              <p className="text-sm text-muted-foreground">
                I wish I was there! Looks amazing 🌊🌅
              </p>
            </div>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  );
}
