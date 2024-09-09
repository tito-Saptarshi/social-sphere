"use server";

// +dev01
// not defined = as null | undefined

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { supabase } from "./lib/supabase";
import { rule } from "postcss";
import { log } from "console";

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

// export async function likePost(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/api/auth/login");
//   }

//   const postId = formData.get("postId") as string;
//   const voteDirection = formData.get("voteDirection") as string;
//   const vote = await prisma.vote.findFirst({
//     where: {
//       postId: postId,
//       userId: user.id,
//     },
//   });
//   let likes = await prisma.vote.findFirst({
//     where: {
//       postId: postId,
//     },
//     select : {
//       totalLikes: true,
//     }
//   });

//   const totalLikes = likes?.totalLikes ?? 0;

//   if (vote) {
//     if (vote.liked === true) {

//     }
//     else {

//     }
//   } else {
//     await prisma.vote.create({
//       data: {
//         totalLikes: totalLikes + 1,

//         userId: user.id,
//         postId: postId,
//       },
//     });
//   }

// }

// export async function likesCount(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/api/auth/login");
//   }

//   try {
//     const postId = formData.get("postId") as string;
//     const totalLikesStr  = formData.get("totalLikes");

//     if (typeof totalLikesStr === "string") {
//       let totalLikes = Number(totalLikesStr);

//        await prisma.post.update({
//         where: {
//           id: postId
//         },
//         data: {
//           likes: totalLikes,
//         }
//       });

//       return revalidatePath("/")
//     } else {
//       console.log("Invalid title format");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function likesCount(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/api/auth/login");
//   }

//   try {
//     const postId = formData.get("postId") as string;
//     const isLikedStr = formData.get("isLiked");

//     // Ensure we have all required data
//     if (!postId || typeof isLikedStr !== "string") {
//       console.log("Invalid data received");
//       return;
//     }

//     const isLiked = isLikedStr === "true";

//     // Fetch the current likes from the database
//     const post = await prisma.post.findUnique({
//       where: {
//         id: postId,
//       },
//     });

//     if (!post) {
//       console.log("Post not found");
//       return;
//     }

//     const updatedLikes = isLiked ? post.likes + 1 : post.likes - 1;

//     // Update the post with the new likes count
//     await prisma.post.update({
//       where: {
//         id: postId,
//       },
//       data: {
//         likes: updatedLikes,
//       },
//     });

//     // Optionally, revalidate any paths or cache as needed
//     return revalidatePath("/");
//   } catch (error) {
//     console.error("Error updating likes:", error);
//   }
// }

export async function likesCount(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const postId = formData.get("postId") as string;
    const isLikedStr = formData.get("isLiked");

    if (!postId || typeof isLikedStr !== "string") {
      console.log("Invalid data received");
      return;
    }

    const isLiked = isLikedStr === "true";

    // Fetch the current post data
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      console.log("Post not found");
      return;
    }

    // Toggle like: increment if not liked, decrement if liked

    // main --- const updatedLikes = isLiked ? post.likes - 1 : post.likes + 1;

    // Update the post with the new likes count
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        // main --- likes: updatedLikes,
      },
    });

    // Revalidate the path or update any relevant caches
    return revalidatePath("/");
  } catch (error) {
    console.error("Error updating likes:", error);
  }
}

// export async function postLikes(formData: FormData, boolLike: boolean, id: string, userName: string, title: string) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/api/auth/login");
//   }

//   try {
//     const userId = user.id as string;
//     const postId = formData.get("postId") as string;
//     const isLikedStr = boolLike;

//     console.log("user id = " + user.id);
//     console.log("userName = " + userName);
//     console.log("title = " + title);
//     console.log("boolean = " + boolLike);

//     const like = await prisma.like.findFirst({
//       where: {
//         userId: user.id,
//         postId: id,
//       },
//     });

//     if (like) {
//       if (boolLike) {
//         await prisma.like.update({
//           where: {
//             id: like.id,
//           },
//           data: {
//             liked: false,
//           },
//         });
//         return revalidatePath("/");
//       } else {
//         await prisma.like.update({
//           where: {
//             id: like.id,
//           },
//           data: {
//             liked: true,
//           },
//         });
//         return revalidatePath("/");
//       }
//       return revalidatePath("/");
//     } else {
//       await prisma.like.create({
//         data: {
//           userId: user.id,
//           postId: id,
//           liked: true,
//         },
//       });
//       return revalidatePath("/");
//     }

//     return revalidatePath("/");
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function postLikes(
  formData: FormData,
  boolLike: boolean,
  id: string,
  userName: string,
  title: string
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const userId = user.id as string;
    const postId = formData.get("postId") as string;

    console.log("user id = " + user.id);
    console.log("userName = " + userName);
    console.log("title = " + title);
    console.log("boolean = " + boolLike);

    const like = await prisma.like.findFirst({
      where: {
        userId: user.id,
        postId: id,
      },
    });

    if (like) {
      // Toggle like status
      await prisma.like.update({
        where: {
          id: like.id,
        },
        data: {
          liked: !like.liked, // Toggle based on current status
        },
      });
    } else {
      // Create a new like
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: id,
          liked: true,
        },
      });
    }

    return revalidatePath("/"); // Single call to revalidatePath
  } catch (error) {
    console.log(error);
  }
}

export async function followCommunity(communityId: string, oldName: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const member = await prisma.communityFollower.findFirst({
      where: {
        userId: user.id,
        communityId: communityId,
      },
    });

    if (member) {
      // Toggle like status
      await prisma.communityFollower.update({
        where: {
          id: member.id,
        },
        data: {
          follow: !member.follow, // Toggle based on current status
        },
      });
    } else {
      // Create a new like
      await prisma.communityFollower.create({
        data: {
          userId: user.id,
          communityId: communityId,
          follow: true,
        },
      });
    }
    return revalidatePath("/");
    // return revalidatePath(`/community/${oldName}`);
  } catch (error) {
    console.log(error);
  }
}

// Function to follow a user
export async function followUser(followerId: string, followingId: string) {
  await prisma.userFollower.create({
    data: {
      followerId,
      followingId,
    },
  });
  revalidatePath("/");
}

// Function to unfollow a user
export async function unfollowUser(followerId: string, followingId: string) {
  await prisma.userFollower.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });
  revalidatePath("/");
}

export async function createCommunityPost(
  formData: FormData,
  communityId: string | null | undefined
) {
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
        communityId: communityId,
      },
    });

    redirect("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updatePost(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  try {
    const postId = formData.get("postId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        description: description,
      },
    });

    revalidatePath("/");
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

export async function deletePost(postId: string | undefined) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return redirect("/");
  } catch (error) {
    console.log(error);
  }
}

export async function createComment(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const comment = formData.get("comment") as string;
    const postId = formData.get("postId") as string;

    const data = await prisma.comment.create({
      data: {
        text: comment,
        userId: user.id,
        postId: postId,
      },
    });

    revalidatePath(`/post/${postId}`);
    return {
      status: "green",
      message: "Comment Posted !",
    };
  } catch (error) {
    return {
      message: "Retry",
      status: "error",
    };
  }
}

// export async function getDataActions(take: number, skip: number) {
//   const data = await prisma.post.findMany({
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       imageUrl: true,
//       videoUrl: true,
//       createdAt: true,
//       communityId: true,
//       User: {
//         select: {
//           id: true,
//           userName: true,
//           imageUrl: true,
//         },
//       },
//       Like: {
//         select: {
//           id: true,
//           liked: true,
//           userId: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//     take: take,
//     skip: skip,
//   });

//   return data;
// }

// export async function getTotalCommmentAction(postId: string) {
//   const count = await prisma.comment.count({
//     where: {
//       postId: postId,
//     },
//   });

//   return count;
// }

// export async function getCommunityDetailsAction(communityId: string) {
//   const data = await prisma.community.findUnique({
//     where: {
//       id: communityId,
//     },
//     select: {
//       name: true,
//       id: true,
//     },
//   });

//   return data;
// }

// export async function getUserAction() {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   return user;
// }
