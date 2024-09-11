import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ModeToggle } from "./ThemeToggle";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";

function SphereIcon(props: any) {
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
      <circle cx="12" cy="12" r="8" />
      <path d="M4.2 15.5C5.5 18 8 20 12 20s6.5-2 7.8-4.5" />
      <path d="M4.2 8.5C5.5 6 8 4 12 4s6.5 2 7.8 4.5" />
      <path d="M2 12h20" />
    </svg>
  );
}
import styles from "./Navbar.module.css";
import { PencilIcon, User2Icon } from "lucide-react";

function SphereEnergyIcon(props: any) {
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
      className={styles.animateSphere} // Reference the class from CSS Module
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M4.2 15.5C5.5 18 8 20 12 20s6.5-2 7.8-4.5" />
      <path d="M4.2 8.5C5.5 6 8 4 12 4s6.5 2 7.8 4.5" />
      <path d="M2 12h20" />
    </svg>
  );
}

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="w-full bg-background border-b">
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
          prefetch={false}
        >
          <SphereEnergyIcon className="h-6 w-6" />
          <span className="sr-only">Social-Sphere</span>
        </Link>

        <nav className="hidden items-center gap-4 sm:flex">
          <ModeToggle />
          <Link
            href="/community/all"
            className="p-2 rounded-full hover:bg-muted transition"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Home</span>
          </Link>

          

          {user ? (
            <UserDropdown userImage={user.picture} />
          ) : (
            <div className="flex items-center gap-x-4">
              <Button variant="secondary" asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <Button asChild>
                <LoginLink>Log in</LoginLink>
              </Button>
            </div>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="sm:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:hidden">
            <div className="grid gap-4 p-4">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                prefetch={false}
              >
                <SphereEnergyIcon className="h-6 w-6" />
                <span>Social Sphere</span>
              </Link>
              <nav className="grid gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/community/all"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      <User2Icon className="h-5 w-5" />
                      <span>All communities</span>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
                <Link
                  href="/post/create"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <PencilIcon className="h-5 w-5" />
                  <span>Create Post</span>
                </Link>
                <div>
                  {user ? (
                    <UserDropdown userImage={user.picture} />
                  ) : (
                    <div className="flex flex-col gap-x-4 gap-y-3 mt-5">
                      <Button variant="secondary" asChild>
                        <RegisterLink>Sign up</RegisterLink>
                      </Button>
                      <Button asChild>
                        <LoginLink>Log in</LoginLink>
                      </Button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function BellIcon(props: any) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function FacebookIcon(props: any) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function HomeIcon(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
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

function MessageCircleIcon(props: any) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
