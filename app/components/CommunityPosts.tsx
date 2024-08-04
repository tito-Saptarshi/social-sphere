/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { useState } from "react";
import { CommunityDescription } from "./CommunityDescription";

interface iAppProps {
  communityId: string | undefined | null | "";
  userId: string | undefined | null | "";
  currUserId: string | undefined | null | "";
  name: string | undefined | null | "";
  description: string | undefined | null | "";
  createdAt: Date | undefined;
}

export function CommunityPosts({
  communityId,
  userId,
  name,
  description,
  createdAt,
  currUserId,
}: iAppProps) {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10 ">
      <div className="w-[65%] flex flex-col gap-y-5"></div>
      <div className="w-[35%]">
        <Card>
          <div className="bg-muted p-4 font-semibold flex justify-between gap-x-5">
            <div className="flex items-center">{name}</div>
            <Button className="text-sm font-bold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white">+ Follow</Button>
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-y-5 items-center justify-center gap-x-3">
              <Avatar className="h-30 w-30">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${name}`}
                  alt="@shadcn"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {userId === currUserId ? (
                <Button variant="outline" size="sm">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              ) : (
                <Button variant="outline" disabled size="sm">
                  <UploadIcon className="mr-2 h-4 w-4 " />
                  Upload Photo
                </Button>
              )}
            </div>

            {userId === currUserId ? (
              <CommunityDescription
                communityId={communityId}
                name={name}
                description={description}
                creator={true}
              />
            ) : (
              <CommunityDescription
                communityId={communityId}
                name={name}
                description={description}
                creator={false}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
