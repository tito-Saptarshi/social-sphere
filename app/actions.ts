"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";

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
    redirect(`/community/${data.name}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Community already exist",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function updateCommunity(prevState: any,formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  try {
    const communityId = formData.get("communityId") as string;
    const description = formData.get("description") as string;
    await prisma.community.update({
      where: {
        id: communityId,
      },
      data: {
        description: description,
      },
    });
    await revalidatePath("/");
    return {
      status: "green",
      message: "Succesfully updated !",
    };

   
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Community already exist",
          status: "error",
        };
      }
    }
    throw e;
  }
  
}
