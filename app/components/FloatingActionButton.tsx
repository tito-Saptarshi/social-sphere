import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PenIcon, PlusIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export function FloatingActionButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg"
          size="icon"
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40" align="end">
        <div className="flex flex-col space-y-2">
          <Link href={"/post/create"}>
            <Button variant="ghost" className="justify-start">
              <PenIcon className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </Link>
          <Link href={"/community/create"}>
            <Button variant="ghost" className="justify-start">
              <UsersIcon className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
