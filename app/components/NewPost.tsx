"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { createPost } from "@/app/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadDropzone } from "./Uploadthing";
import Image from "next/image";
import { SubmitPostButton } from "./SubmitButtons";
interface Props {
  userId: string | undefined;
  userName: string | null | undefined;
}

export function NewPost({ userId, userName }: Props) {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [videoUrl, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    
    if (videoUrl) {
      formData.append('videoFile', videoUrl);
    }
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    
    await createPost(formData);
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-background border-b px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>

          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Messages
          </Link>
          <Link
            href="/profile"
            className="flex justify-center text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            <p className="pr-1">{userName}</p>
            <User className="justify-center h-5 w-5" />
          </Link>
        </nav>
      </header>
      {/* ----------- main form -----------------*/}
      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create a new post</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
               
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Enter a title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a description"
                    className="min-h-[120px]"
                  />
                </div>
                <Tabs defaultValue="photo" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="photo">Photo</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                  </TabsList>
                  <TabsContent value="photo">
                    <Card>
                      <CardHeader>
                        {imageUrl === null ? (
                          <UploadDropzone
                            className="ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary "
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setImageUrl(res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                              alert("Error");
                              console.log(error);
                            }}
                          />
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
                        
                      </CardHeader>
                    </Card>
                  </TabsContent>
                  <TabsContent value="video">
                    <Card>
                      <CardContent className="flex flex-col">
                        <Label className="px-2 py-4">Choose Video</Label>
                        <Input type="file" onChange={handleFileChange} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                {/* <Button type="submit" className="w-full">
                  Post
                </Button> */}
                <SubmitPostButton text="Post" />
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="/"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
