"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SunIcon, MoonIcon, MenuIcon } from 'lucide-react'

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} })

const BatSignalLike = ({ liked, onClick } : any) => {
  const { isDark } = useContext(ThemeContext)
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-12 rounded-full focus:outline-none transform transition-transform duration-300 ${liked ? 'scale-110' : 'scale-100'}`}
    >
      <div className={`absolute inset-0 ${isDark ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full transition-opacity duration-300 ${liked ? 'opacity-100' : 'opacity-30'}`}></div>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L9.09 8.18L2 9.27L7 14.14L5.82 21L12 17.77L18.18 21L17 14.14L22 9.27L14.91 8.18L12 2Z" fill={isDark ? "black" : "white"} />
      </svg>
    </button>
  )
}
interface Post {
    author: string;
    timestamp: string;
    title: string;
    image?: string;
    description: string;
  }
const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false)
  const { isDark } = useContext(ThemeContext)

  return (
    <Card className={`mb-8 relative overflow-hidden ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className={`absolute top-0 right-0 w-16 h-16 ${isDark ? 'bg-yellow-500' : 'bg-blue-500'} opacity-10 transform rotate-45 translate-x-8 -translate-y-8`}></div>
      <div className={`absolute bottom-0 left-0 w-16 h-16 ${isDark ? 'bg-yellow-500' : 'bg-blue-500'} opacity-10 transform rotate-45 -translate-x-8 translate-y-8`}></div>
      <CardHeader className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
        <div className="flex justify-between items-center">
          <h3 className={`font-bold ${isDark ? 'text-yellow-500' : 'text-blue-600'}`}>{post.author}</h3>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="py-4 space-y-4">
        <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{post.title}</h4>
        {post.image && (
          <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-800' : 'from-white'} to-transparent opacity-60`}></div>
          </div>
        )}
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{post.description}</p>
      </CardContent>
      <CardFooter className={`flex justify-between items-center border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
        <BatSignalLike liked={liked} onClick={() => setLiked(!liked)} />
        <Button variant="outline" size="sm" className={isDark ? 'bg-gray-700 text-yellow-500 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'}>Comment</Button>
        <Button variant="outline" size="sm" className={isDark ? 'bg-gray-700 text-yellow-500 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'}>Share</Button>
      </CardFooter>
      <div className={`absolute bottom-0 left-0 w-full h-1 ${isDark ? 'bg-yellow-500' : 'bg-blue-500'} opacity-30 animate-pulse`}></div>
    </Card>
  )
}

const Sidebar = () => {
  const { isDark } = useContext(ThemeContext)
  return (
    <Card className={isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-200'}>
      <CardContent className="p-4">
        <h2 className={`font-bold mb-4 ${isDark ? 'text-yellow-500' : 'text-blue-600'}`}>User Profile</h2>
        <p className="mb-4">Username: @{isDark ? 'dark_knight' : 'day_guardian'}</p>
        <Button className={`w-full ${isDark ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Create Post</Button>
      </CardContent>
    </Card>
  )
}

export default function Component() {
  const [posts, setPosts] = useState([])
  const [isDark, setIsDark] = useState(false)  // Default to light mode

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          author: 'Bruce Wayne',
          timestamp: '2 hours ago',
          title: 'Gotham\'s Watch',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fHww',
          description: 'Ensuring the safety of our city, day and night. We stand vigilant against any threats to our peace.',
        },
        {
          author: 'Alfred Pennyworth',
          timestamp: '5 hours ago',
          title: 'Behind the Scenes',
          image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww',
          description: 'The unsung heroes of our operation. Regular maintenance and preparation ensure we\'re always ready for action.',
        },
      ])
    }, 1000)
  }, [])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`container mx-auto p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-yellow-500' : 'text-blue-600'}`}>
              {isDark ? 'Night' : 'Day'}<span className={isDark ? 'text-white' : 'text-gray-800'}>Watch</span>
            </h1>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={toggleTheme} 
                variant="outline" 
                size="icon" 
                className={`${isDark ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700' : 'bg-white text-blue-600 hover:bg-gray-100'} border-2 ${isDark ? 'border-yellow-500' : 'border-blue-600'}`}
              >
                {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="md:hidden" variant="outline" size="icon">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className={isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}>
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">Loading updates...</p>
              ) : (
                posts.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))
              )}
            </div>
            <div className="hidden md:block">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}