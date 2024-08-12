"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createCommunity, updateCommunity } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { SubmitButton } from "./SubmitButtons";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "./Uploadthing";
import { ArrowBigDown, ArrowBigLeftDash, HomeIcon } from "lucide-react";

interface iAppProps {
  communityId: string | undefined | null | "";
  communityName: string | undefined | null | "";
  description: string | undefined | null | "";
  imageUrl: string | undefined | null | "";
  updatedAt: Date | undefined;
}

const initialState = {
  message: "",
  status: "",
  comName: "",
};

export function CommunityUpdate({
  communityId,
  communityName,
  description,
  imageUrl,
  updatedAt,
}: iAppProps) {
  function replaceSpaces(str: string | "" | null | undefined): string {
    if (str === null || str === undefined) {
      return "";
    }
    return str.replace(/ /g, "%20");
  }

  const [date, setDate] = useState("");
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateCommunity, initialState);
  const [newImage, setNewImage] = useState<string>("");
  const [currComName, setCurrComName] = useState<string>("");
  const [linkName, setLinkName] = useState<string>("");
 
  useEffect(() => {
    if (updatedAt) {
      setDate(updatedAt.toLocaleDateString());
    }
  }, [updatedAt]);
  useEffect(() => {
    setNewImage(imageUrl ?? "");
  }, [imageUrl]);
  useEffect(() => {
    if (state?.status === "green") {
      setCurrComName(state.comName ?? communityName ?? "");
      const linkName = replaceSpaces(state.comName ?? communityName ?? "");
      setLinkName(linkName);
      toast({
        title: "Succesfull",
        description: state.message,
      });
    } else if (state?.status === "error") {
      setCurrComName(communityName ?? "");
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, communityName, linkName]);
  return (
    <div>
      <form action={formAction}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex justify-between ">
              <CardTitle>Update Community</CardTitle>
              <Link href={`/community/${linkName}`} className="flex items-center" > <ArrowBigLeftDash className="mr-1 w-4 h-4  "/>back</Link>
            </div>
            <CardDescription>Update your community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-56 w-56">
                <AvatarImage
                  src={newImage ?? `https://avatar.vercel.sh/${communityName}`}
                  alt="@shadcn"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex justify-between w-full">
                <UploadButton
                  className="ut-button:w-28"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setNewImage(res[0].url);
                  }}
                />
                <Button
                  onClick={() => {
                    setNewImage(imageUrl ?? "");
                  }}
                >
                  Cancel
                </Button>
                <input type="hidden" value={newImage} name="imageUrl" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-center text-xl font-semibold ">
                {communityName}
              </p>
              <div className="space-y-2">
                <Label htmlFor="username">Update community Name</Label>
                <Input
                  id="communityName"
                  name="communityName"
                  defaultValue={communityName ?? "Community Name"}
                  className="text-muted-foreground"
                />
                {/* <input type="hidden" value={communityName ?? ""} name="currentCommunityName"/>
                <input type="hidden" value={communityName ?? ""} name="currentCommunityName"/> */}

                {state?.status === "error" && (
                  <p className="text-destructive mt-1">{state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Update Community Description</Label>
                <input
                  type="hidden"
                  value={communityId ?? ""}
                  name="communityId"
                />
                <Textarea
                  id="bio"
                  name="communityDescription"
                  defaultValue={
                    description ?? "Enter community description here"
                  }
                  className="min-h-[100px] text-muted-foreground"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="mx-3" variant="secondary" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <SubmitButton text="Update" />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
