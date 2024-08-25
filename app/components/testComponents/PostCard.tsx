"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Props {
    videoUrl: String | null | undefined;
}

export function PostCard({ videoUrl }:Props) {
  return (
    <Card>
      <CardContent>
        <Label htmlFor="name">Name</Label>
        {videoUrl && (
          <video
            width="60%"
            height="40%"
            controls
            src={`https://jgpzentnejvbbjcrtjnu.supabase.co/storage/v1/object/public/images/${videoUrl}`}
            onError={(e) => console.error("Error playing video:", e)}
            onLoadStart={(e) => console.log("Video load started")}
            onLoadedData={(e) => console.log("Video loaded data")}
            onCanPlay={(e) => console.log("Video can play")}
            onPlay={(e) => console.log("Video playing")}
          />
        )}
          <Image
          src={`https://nvklcnxjewiqlubfmtab.supabase.co/storage/v1/object/public/images/${videoUrl}`}
          alt="Image of House"
          fill
          className="rounded-lg h-full object-cover"
        />
      </CardContent>
    </Card>
  );
}
