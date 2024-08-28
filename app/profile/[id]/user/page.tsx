import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, UserPlus, Video } from "lucide-react"

export default function MyProfile({ params }: { params: { id: string } }) {

  const posts = [
    {
      type: "image",
      content: "/placeholder.svg?height=300&width=300",
      caption: "Beautiful sunset",
      likes: 120,
      comments: 15,
    },
    {
      type: "video",
      content: "/placeholder.svg?height=300&width=300",
      caption: "My new dance routine",
      likes: 89,
      comments: 32,
    },
    {
      type: "text",
      content: "Just had an amazing day!",
      caption: "",
      likes: 56,
      comments: 8,
    },
    {
      type: "image",
      content: "/placeholder.svg?height=300&width=300",
      caption: "Delicious meal",
      likes: 203,
      comments: 28,
    },
    {
      type: "text",
      content: "Excited for the weekend!",
      caption: "",
      likes: 45,
      comments: 5,
    },
    {
      type: "video",
      content: "/placeholder.svg?height=300&width=300",
      caption: "Live concert footage",
      likes: 178,
      comments: 42,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <Avatar className="w-24 h-24 md:w-40 md:h-40 mb-4 md:mb-0 md:mr-8">
          <AvatarImage alt="User's avatar" src="/placeholder.svg?height=160&width=160" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-2">johndoe</h1>
          <p className="text-gray-600 mb-4 max-w-md">
            Photography enthusiast | Travel lover | Food connoisseur
            Sharing my adventures one post at a time! 📸✈️🍔
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="relative aspect-square group">
            {post.type === 'image' && (
              <img
                src={post.content}
                alt={post.caption}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {post.type === 'video' && (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
            )}
            {post.type === 'text' && (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center p-4 rounded-lg">
                <p className="text-center font-medium">{post.content}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
              {post.caption && (
                <p className="text-white text-sm mb-2">{post.caption}</p>
              )}
              <div className="flex justify-between text-white">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

}
