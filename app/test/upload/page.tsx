import { UploadComponent } from "@/app/components/testComponents/UploadComponent";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { useState } from "react";


export default async function UploadTesterPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  
  return (
    <div className="flex py-20 justify-center w-full">
      <UploadComponent 
          userId={user.id}
      />
    </div>
  );
}
