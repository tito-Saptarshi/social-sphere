"use client";

import { useState } from "react";
import {
  HeartIcon,
  MessageCircleIcon,
  ThumbsDownIcon,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import Image from "next/image";

import { likesCount, postLikes } from "../actions";

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
}: Props) {
  const [liked, setLiked] = useState(likeType);
  const [disliked, setDisliked] = useState(false);
  const [newLikes, setNewLikes] = useState(totalLikes);

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
  return (
    <div className="relative aspect-square group">
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
        // Directly render the title when neither image nor video is provided
        <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg p-4">
          <p className="font-medium text-center text-black">{truncateTitle(title)}</p>
        </div>
      )}

      {(imageUrl || videoUrl) && (
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
          <div className="flex justify-between text-white">
            <div className="flex items-center">
              <HeartIcon className={`w-4 h-4 mr-1 ${liked ? "text-red-500 fill-red-500" : ""}`} onClick={handleLike} />
              <span className="text-sm">{newLikes}</span>
            </div>
            <div className="flex items-center">
              <MessageCircleIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">0</span> {/* Replace with actual comment count */}
            </div>
            <button className="bg-transparent border-none p-0" onClick={handleDislike}>
              <ThumbsDownIcon
                className={`w-4 h-4 mr-1 ${disliked ? "text-blue-500 fill-blue-500" : ""}`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}