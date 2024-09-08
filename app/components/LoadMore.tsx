"use client"

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getCommunityDetailsAction, getDataActions, getTotalCommmentAction, getUserAction } from "../actions";
import { PostCard } from "./PostCard";

interface PostData {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  createdAt: Date;
  communityId: string | null;
  User: {
    id: string;
    userName: string;
    imageUrl: string;
  };
  Like: {
    id: string;
    liked: boolean;
    userId: string;
  }[];
}

let take = 5; // Number of posts to fetch per request
let skip = 0; // Start at the first post

export default function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<PostData[]>([]); // Set the type of data here
  const [loading, setLoading] = useState(false); // Loading state

  const fetchPosts = useCallback(async () => {
    setLoading(true); // Show loader
    try {
      const newPosts = await getDataActions(take, skip);
      setData((prevData) => [...prevData, ...newPosts]); // Append new posts to the existing ones
      skip += take; // Increment skip by take to get the next batch
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      fetchPosts(); // Fetch new posts when inView is true
    }
  }, [inView, fetchPosts, loading]);

  return (
    <>
      <div className="md:col-span-2 lg:col-span-3 space-y-4">
        {data.map((post) => {
          // Use synchronous rendering; no `async` in `.map()`
          return (
            <PostCard
              key={post.id}
              userId={post.User.id}
              id={post.id}
              userName={post.User.userName}
              profilePic={post.User.imageUrl}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              videoUrl={post.videoUrl}
              likeType={post.Like.some((like) => like.userId === post.User.id && like.liked)}
              totalLikes={post.Like.reduce((acc, like) => (like.liked ? acc + 1 : acc), 0)}
              totalComments={getTotalCommmentAction(post.id)}
              comName={( getCommunityDetailsAction(post.communityId ?? ""))?.name ?? "No Community"}
              commId={post.communityId ?? post.User.id}
            />
          );
        })}
      </div>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {loading && (
            <Image
              src="/spinner.svg"
              alt="Loading..."
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}
