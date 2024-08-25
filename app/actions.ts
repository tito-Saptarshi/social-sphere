"use server";

// +dev01
// not defined = as null | undefined

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { supabase } from "./lib/supabase";

export async function testUpload(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  const name = formData.get("name") as string;
  const other = formData.get("other") as string;
  const imageUrl = formData.get("imageUrl") as string;
  try {
    const data = await prisma.testUpload.create({
      data: {
        name: name,
        other: other,
        userId: user.id,
        imageUrl: imageUrl ?? undefined,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUserInfo(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  const imageUrl = formData.get("imageUrl") as string;

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
        bio: bio,
        imageUrl: imageUrl,
      },
    });

    return {
      message: "Succesfully Updated",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is already used",
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
    const imageUrl = formData.get("imageUrl") as string | null;
    const data = await prisma.community.create({
      data: {
        name: name,
        description: description,
        userId: user.id,
        imageUrl: imageUrl ?? undefined,
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

export async function updateCommunity(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  try {
    const communityId = formData.get("communityId") as string;
    const communityName = formData.get("communityName") as string;
    const description = formData.get("communityDescription") as string;
    const imageUrl = formData.get("imageUrl") as string;

    // const currentCommunityName = formData.get("currentCommunityName") as string;
    // if (currentCommunityName === communityId)

    await prisma.community.update({
      where: {
        id: communityId,
      },
      data: {
        name: communityName,
        description: description,
        imageUrl: imageUrl,
      },
    });
    return {
      status: "green",
      message: "Succesfully updated !",
      comName: communityName,
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

export async function createPost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const userId = user.id as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const videoUrl = formData.get("videoFile") as File | null;
    let videoData;
    if (videoUrl) {
      const { data } = await supabase.storage
        .from("images")
        .upload(`${videoUrl.name}-${new Date()}`, videoUrl, {
          cacheControl: "2592000",
          contentType: "image/png",
        });

        videoData = data;
    } else {
      console.log("No file uploaded");
    }

    await prisma.post.create({
      data: {
        userId: userId,
        title: title,
        description: description,
        imageUrl: imageUrl ?? undefined,
        videoUrl: videoData?.path,
      },
    });

    redirect("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
