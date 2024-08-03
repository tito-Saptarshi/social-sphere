/* eslint-disable @next/next/no-img-element */
import { CommunityPosts } from "@/app/components/CommunityPosts";

export default function Community({ params }: { params: { id: string } }) {
  return ( <div>
    <CommunityPosts />
  </div>)
}
