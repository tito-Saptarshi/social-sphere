"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Share, ShareIcon } from "lucide-react";

export function CopyLink({ id }: { id: string }) {
  const { toast } = useToast();
  async function copytoClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`); // location.origin --> currently it's localhost3000
    toast({
      title: "Success",
      description: "Link Copied",
    });
  }
  // js api OR navigator api (should be marked async)
  //   on click --> event handler, component should be marked client

  return (
    <>
      <Button variant="ghost" size="sm" onClick={copytoClipboard}>
        <ShareIcon className="w-5 h-5 mr-1" />
        Share
      </Button>
    </>
  );
}
