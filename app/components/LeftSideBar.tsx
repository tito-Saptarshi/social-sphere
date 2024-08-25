import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface Props {
  userId: string | undefined | null | "";
  userName: string | undefined | null | "";
  bio: string | undefined | null | "";
  imageUrl: string | undefined | null | "";
}
export function UserProfile({ userId, bio, userName, imageUrl }: Props) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24">
        <AvatarImage
          src={imageUrl ?? `https://avatar.vercel.sh/${userName}`}
          alt="@shadcn"
        />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>

      <h2 className="text-xl font-bold">{userName}</h2>
      <p className="text-sm text-muted-foreground">@{userName}</p>
      <p className="text-sm text-center">{bio}</p>
      <div className="flex space-x-4">
        <div className="text-center">
          <p className="font-bold">250</p>
          <p className="text-sm text-muted-foreground">Posts</p>
        </div>
        <div className="text-center">
          <p className="font-bold">10k</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold">1k</p>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      </div>
    </div>
  );
}
