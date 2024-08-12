"use client";

import { Textarea } from "@/components/ui/textarea";
import { SaveButton, SubmitButton } from "./SubmitButtons";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { updateCommunity } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface iAppProps {
  communityId: string | null | undefined | "";
  name: string | null | undefined;
  description: string | null | undefined;
  imageUrl: string | null | undefined;
  creator: boolean;
}
const initalState = {
  message: "",
  status: "",
};
export function CommunityDescription({
  description,
  name,
  communityId,
  creator,
  imageUrl
}: iAppProps) {
  const [state, formAction] = useFormState(updateCommunity, initalState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "green") {
      toast({
        title: "Success",
        description: state.message,
      });
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]); 

  return (
    <>
      {creator ? (
        <form className="mt-5" action={formAction}>
          
          <input type="hidden" name="communityId" value={communityId ?? ""} />
          <input type="hidden" name="communityName" value={name ?? ""} />
          <input type="hidden" name="imageUrl" value={communityId ?? ""} />
          <Textarea
            placeholder="Update description"
            maxLength={100}
            name="description"
            defaultValue={description || undefined}
            className="mb-3 "
          />
          <SaveButton />
        </form>
      ) : (
        <form className="mt-5" action={formAction}>
          <input type="hidden" name="communityId" value={communityId ?? ""} />
          <Textarea
            placeholder="Update description"
            maxLength={100}
            name="communityDescription"
            defaultValue={description || undefined}
            className="mb-3"
            disabled
          />
        </form>
      )}
    </>
  );
}
