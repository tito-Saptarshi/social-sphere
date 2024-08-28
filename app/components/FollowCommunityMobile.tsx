"use client";

import { Button } from "@/components/ui/button";
import { followCommunity } from "../actions";

interface Props {
  communityId: string | undefined | null | "";
  userId: string | undefined | null | "";
  isFollowing: boolean;
  totalFollowers: number;
  oldName: string;
}

export function FollowCommunityMobile({
  communityId,
  userId,
  isFollowing,
  totalFollowers,
  oldName
}: Props) {
  return (
    <div >
      {/* <p>props - {isFollowing ? <>true</>: <>false</>}</p>
      <p>usestate - {boolFollow? <>true</>: <>false</>}</p> */}
      <Button
        onClick={() => {
          followCommunity(communityId ?? "", oldName);
        }}
        className="text-sm font-bold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white"
      >
        {isFollowing ? <>following...</> : <>+ Follow</>}
        
      </Button>
    </div>
  );
}
