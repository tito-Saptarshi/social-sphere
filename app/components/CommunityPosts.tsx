"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export function CommunityPosts() {
  return (
    <div className="grid grid-cols-[70%_30%] gap-8 max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View post</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Post image"
            width={500}
            height={300}
            className="object-cover w-full h-48"
            style={{ aspectRatio: "500/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-bold">
              Exploring the Wonders of Nature
            </h3>
            <p className="text-sm text-muted-foreground">
              Discover the beauty of the great outdoors.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>John Doe</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <CalendarIcon className="w-4 h-4" />
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View post</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Post image"
            width={500}
            height={300}
            className="object-cover w-full h-48"
            style={{ aspectRatio: "500/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-bold">Mastering the Art of Baking</h3>
            <p className="text-sm text-muted-foreground">
              Delicious recipes and baking tips.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Jane Smith</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <CalendarIcon className="w-4 h-4" />
                <span>5 days ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View post</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Post image"
            width={500}
            height={300}
            className="object-cover w-full h-48"
            style={{ aspectRatio: "500/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-bold">
              Sustainable Living: Tips and Tricks
            </h3>
            <p className="text-sm text-muted-foreground">
              Reduce your carbon footprint and live more eco-friendly.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Sarah Lee</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <CalendarIcon className="w-4 h-4" />
                <span>1 week ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View post</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Post image"
            width={500}
            height={300}
            className="object-cover w-full h-48"
            style={{ aspectRatio: "500/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-bold">
              Unleash Your Creativity: DIY Projects
            </h3>
            <p className="text-sm text-muted-foreground">
              Craft your way to a more personalized home.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Michael Johnson</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <CalendarIcon className="w-4 h-4" />
                <span>2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View post</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Post image"
            width={500}
            height={300}
            className="object-cover w-full h-48"
            style={{ aspectRatio: "500/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-bold">
              Traveling the World: A Beginner&apos;s Guide
            </h3>
            <p className="text-sm text-muted-foreground">
              Tips and tricks for your next adventure.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Emily Davis</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <CalendarIcon className="w-4 h-4" />
                <span>3 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View post</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Post image"
            width={500}
            height={300}
            className="object-cover w-full h-48"
            style={{ aspectRatio: "500/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-bold">
              Mindfulness Practices for a Balanced Life
            </h3>
            <p className="text-sm text-muted-foreground">
              Cultivate inner peace and well-being.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>David Lee</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <CalendarIcon className="w-4 h-4" />
                <span>1 month ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center hidden">
        <div className="bg-muted rounded-lg p-6 space-y-6 w-full max-w-md">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Community Page</h2>
            <p className="text-muted-foreground">
              Welcome to our vibrant community! Here you\&apos;ll find a wealth
              of resources, discussions, and like-minded individuals who share
              your passions.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <UsersIcon className="w-8 h-8 text-muted-foreground" />
            <div>
              <div className="font-semibold">1,234 Members</div>
              <div className="text-muted-foreground">and growing</div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Explore Our Community</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-primary"
                  prefetch={false}
                >
                  <CompassIcon className="w-4 h-4" />
                  <span>Discover Discussions</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-primary"
                  prefetch={false}
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Upcoming Events</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-primary"
                  prefetch={false}
                >
                  <BookIcon className="w-4 h-4" />
                  <span>Resource Library</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-primary"
                  prefetch={false}
                >
                  <UsersIcon className="w-4 h-4" />
                  <span>Member Directory</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full md:hidden"
          onClick={() => {
            document
              .querySelector(".fixed.inset-0")
              ?.classList.toggle("hidden");
          }}
        >
          <MenuIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-6 md:block sm:hidden ">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Community Page</h2>
          <p className="text-muted-foreground">
            Welcome to our vibrant community! Here you&lsquo;`ll find a wealth
            of resources, discussions, and like-minded individuals who share
            your passions.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <UsersIcon className="w-8 h-8 text-muted-foreground" />
          <div>
            <div className="font-semibold">1,234 Members</div>
            <div className="text-muted-foreground">and growing</div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Explore Our Community</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-primary"
                prefetch={false}
              >
                <CompassIcon className="w-4 h-4" />
                <span>Discover Discussions</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-primary"
                prefetch={false}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Upcoming Events</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-primary"
                prefetch={false}
              >
                <BookIcon className="w-4 h-4" />
                <span>Resource Library</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-primary"
                prefetch={false}
              >
                <UsersIcon className="w-4 h-4" />
                <span>Member Directory</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CompassIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
