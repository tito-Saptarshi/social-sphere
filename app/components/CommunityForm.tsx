"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { createCommunity, updateUserInfo } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButtons";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "./Uploadthing";
import Image from "next/image";
import { log } from "console";

interface iAppProps {
  userName: string | undefined | null | "";
}

const initialState = {
  message: "",
  status: "",
};

export function CommunityForm({ userName }: iAppProps) {
  const [state, formAction] = useFormState(createCommunity, initialState);
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<null | string>(null);

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Community</CardTitle>
          <CardDescription>Create your community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            {imageUrl === null ? (
              <>
                <UploadDropzone
                  className="ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert("Error");
                    console.log(error);
                  }}
                />
              </>
            ) : (
              <div className="flex flex-col items-end">
                <Image
                  src={imageUrl}
                  alt="uploaded image"
                  width={500}
                  height={400}
                  className="h-80 rounded-lg w-full object-contain -mb-5"
                />
                <Button
                  className="w-20"
                  type="button"
                  onClick={() => setImageUrl(null)}
                >
                  Remove
                </Button>
              </div>
            )}

            <input
              type="hidden"
              name="imageUrl"
              value={imageUrl ?? undefined}
            />
            {/* <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://avatar.vercel.sh/${userName}`}
                alt="@shadcn"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button
              variant="default"
              size="sm"
              asChild
              className="border-blue-800"
            >
              <>
                Upload
                <UploadButton
                  endpoint="imageUploader"
                  onBeforeUploadBegin={(files) => {
                    const imageFile = files[0];
                    handleImageUpload(imageFile);
                    return [imageFile];
                  }}
                />
              </>
            </Button> */}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Community Name</Label>
              <Input
                id="communityName"
                name="communityName"
                defaultValue="Community Name"
                className="text-muted-foreground"
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Community Description</Label>
              <Textarea
                id="bio"
                name="communityDescription"
                defaultValue="Enter community description here"
                className="min-h-[100px] text-muted-foreground"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="mx-3" variant="secondary" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <SubmitButton text="Create" />
        </CardFooter>
      </Card>
    </form>
  );
}

function UploadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
