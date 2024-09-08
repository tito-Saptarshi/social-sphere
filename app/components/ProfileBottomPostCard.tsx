"use client";

import { useState } from "react";
import { HeartIcon, MessageCircleIcon, ThumbsDownIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { postLikes } from "../actions";

interface Props {
  id: string;
  userName: string | null;
  profilePic: string | null;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  totalLikes: number;
  likeType: boolean;
  totalComments: number;
}

const truncateTitle = (title: string, maxWords: number = 20): string => {
  const words = title.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return title;
};

export function ProfileBottomPostCard({
  id,
  userName,
  title,
  description,
  imageUrl,
  profilePic,
  videoUrl,
  totalLikes,
  likeType,
  totalComments
}: Props) {
  const [liked, setLiked] = useState(likeType);
  const [disliked, setDisliked] = useState(false);
  const [newLikes, setNewLikes] = useState(totalLikes);
  const [boolLikes, setBoolLikes] = useState(likeType);
  const handleLike = async () => {
    try {
      const formData = new FormData();
      formData.append("postId", id);
      formData.append("isLiked", liked.toString());

      setLiked(!liked);
      setNewLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));

      if (disliked) {
        setDisliked(false);
        setNewLikes((prevLikes) => prevLikes + 1);
      }

      // await postLikes(formData, !liked, id, userName || "", title);
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
      setNewLikes((prevLikes) => prevLikes - 1);
    }
  };

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

  return (
    <div className="relative aspect-square group">
      <div className="w-full h-full relative rounded-lg overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            layout="fill"
          />
        ) : videoUrl ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <video
              className="absolute inset-0 w-full h-full object-contain"
              src={`https://jgpzentnejvbbjcrtjnu.supabase.co/storage/v1/object/public/images/${videoUrl}`}
              controls
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg p-4">
            <p className="font-medium text-center text-black">
              {truncateTitle(title)}
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
          <div className="flex justify-between text-white">
            <div className="flex items-center">
              {/* <HeartIcon
                className={`w-4 h-4 mr-1 ${
                  liked ? "text-red-500 fill-red-500" : ""
                }`}
                onClick={handleLike}
              /> */}
              <form onSubmit={likePost}>
                <input type="hidden" name="userName" value={userName || ""} />
                <input type="hidden" name="postTitle" value={title || ""} />
                <Button variant="ghost" size="sm" type="submit">
                  <HeartIcon
                    className={`w-5 h-5 mr-1 ${
                      boolLikes ? "text-red-500 fill-red-500" : ""
                    }`}
                  />
                </Button>
              </form>
              <span className="text-sm">{newLikes}</span>
            </div>
            <div className="flex items-center">
              <MessageCircleIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">{totalComments}</span>{" "}
              {/* Replace with actual comment count */}
            </div>
            {/* <button
              className="bg-transparent border-none p-0"
              onClick={handleDislike}
            >
              <ThumbsDownIcon
                className={`w-4 h-4 mr-1 ${
                  disliked ? "text-blue-500 fill-blue-500" : ""
                }`}
              />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
