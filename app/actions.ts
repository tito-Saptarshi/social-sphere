"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "./lib/db";

export async function updateUserInfo(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
        bio: bio,
      },
    });

    return {
      message: "Succesfully Updated name",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is alredy used",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function createCommunity(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const name = formData.get("communityName") as string;
    const description = formData.get("communityDescription") as string;

    const data = await prisma.community.create({
      data: {
        name: name,
        description: description,
        userId: user.id,
      },
    });

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Subreddit alredy exist",
          status: "error",
        };
      }
    }
    throw e;
  }
}
