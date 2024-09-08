import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { comment } from "postcss";

interface Props {
  userName: string | null | undefined;
  comment: string;
  imageUrl: string | null | undefined;
  userId: string | undefined;
}

export async function RenderComments({
  userName,
  comment,
  imageUrl,
  userId,
}: Props) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-start space-x-2">
        <Link href={`/profile/${userId}/user`}>
          <Avatar className="w-8 h-8">
            {/* <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" /> */}
            <AvatarImage src={imageUrl ?? ""} alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <Link href={`/profile/${userId}/user`}>
            <p className="font-semibold">@{userName}</p>
          </Link>
          <p className="text-sm text-muted-foreground">{comment}</p>
        </div>
      </div>
    </div>
  );
}
