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
import { updateUserInfo } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { SubmitButton } from "./SubmitButtons";

interface iAppProps {
  userName: string | undefined | null | "";
  bio: string | undefined | null | "";
  imageUrl: string | undefined | null | "";
}

const initialState = {
  message: "",
  status: "",
};

export function ProfileForm({ userName, bio, imageUrl }: iAppProps) {
  const [state, formAction] = useFormState(updateUserInfo, initialState);
  const { toast } = useToast();
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
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={imageUrl ?? "/placeholder-user.jpg"}
                alt="@shadcn"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={userName ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={bio ?? "Lorem ipsum dolor sit amet."}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton text="Save" />
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
