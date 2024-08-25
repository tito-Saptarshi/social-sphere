import prisma from "@/app/lib/db";
import { supabase } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function videoUpload(formData: FormData) {
  "use server";
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const userId = user.id as string;
    const title = formData.get("name") as string;
    const description = formData.get("other") as string;
    const imageFile = formData.get("imageUrl") as File;
    const videoUrl = formData.get("imageUrl") as File;
    
    const { data: imageData } = await supabase.storage
      .from("images")
      .upload(`${imageFile.name}-${new Date()}`, imageFile, {
        cacheControl: "2592000",
        contentType: "image/png",
      });

    await prisma.testUpload.create({
      data: {
        userId: userId,
        name: title,
        other: description,
        imageUrl: imageData?.path,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export default async function FetchVideo() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  return (
    <div className="flex flex-col items-center">
      <h1>fetch video</h1>
      <form action={videoUpload} className="p-3">
        <Card className="p-3 pt-5 max-w-[1000px]">
          <CardContent className="flex flex-col gap-y-4">
            <Label htmlFor="username">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue="Name"
              className="text-muted-foreground"
            />
            <Separator />
            <Label htmlFor="other">Other</Label>
            <Input
              id="other"
              name="other"
              defaultValue="Other"
              className="text-muted-foreground"
            />
            <Separator />
            <Input name="imageUrl" type="file"></Input>
          </CardContent>
          <Button type="submit" >Submit</Button>
        </Card>
      </form>
    </div>
  );
}
