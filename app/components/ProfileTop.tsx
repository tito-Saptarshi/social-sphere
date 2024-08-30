import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, UserPlus } from "lucide-react"


interface Props {
    id: string;
    profilePhoto: string | null | undefined;
    userName: string | null | undefined;
    bio: string | null | undefined;
}

export function ProfileTop({id, profilePhoto, userName, bio} : Props) {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <Avatar className="w-24 h-24 md:w-40 md:h-40 mb-4 md:mb-0 md:mr-8">
              <AvatarImage
                src={profilePhoto ?? "https://avatar.vercel.sh/helloworld"}
                alt="@shadcn"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-2">{userName}</h1>
          {/* <p className="text-gray-600 mb-4 max-w-md">
            Photography enthusiast | Travel lover | Food connoisseur
            Sharing my adventures one post at a time! 📸✈️🍔
          </p> */}
            <p className="text-gray-600 mb-4 max-w-md">
           {bio}
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Follow
            </Button>
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" /> Message
            </Button>
          </div>
          <div className="flex justify-center md:justify-start space-x-8">
            <div>
              <span className="font-bold">42</span> posts
            </div>
            <div>
              <span className="font-bold">1.5k</span> followers
            </div>
            <div>
              <span className="font-bold">300</span> following
            </div>
          </div>
        </div>
      </div>
    )
}