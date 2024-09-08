import prisma from "@/app/lib/db";

async function getData(communityId:string) {

    const newCommunity = await prisma.post.count({
      where: {
        communityId: communityId
      }
    })

    const newMembers = await prisma.community.findMany({
      where : {
          id: communityId
      },
       select : {
        Followers: {
          where: {
            follow: true
          },
          select : { 
            id: true,
            User : {
              select : {
                id: true,
                imageUrl: true,
                userName: true,
              }
            }
           }
        }
       }
    })

    const followers = await prisma.communityFollower.findMany({
        where: {
          communityId: communityId,
          follow: true,
        },
        select: {
          User: {
            select: {
              id: true,
              userName: true,
              imageUrl: true,  // Include the profile image URL
            },
          },
        },
      });
    
      // Map followers to a list of objects containing user names and image URLs
      const followerDetails = followers.map((follower) => ({
        userName: follower.User?.userName,
        imageUrl: follower.User?.imageUrl,
      }));
      return  followerDetails ;
}

export function ShowCommunityFollowers() {
    return (
        <div>
            <button>followers: 0</button>
        </div>
    )
}