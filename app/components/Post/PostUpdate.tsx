"use state";

import { deletePost, updatePost } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../SubmitButtons";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

interface Props {
  postId: string | null | undefined | "";
  title: string | null | undefined;
  description: string | null | undefined;
}
const initalState = {
  message: "",
  status: "",
};
export function PostUpdate({ postId, title, description }: Props) {
  const [state, formAction] = useFormState(updatePost, initalState);
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
    <div className="flex flex-col min-h-[300px]">
      <form action={formAction}>
        <input type="hidden" name="postId" value={postId ?? ""} />
        <Label>Title</Label>
        <Input
          placeholder="Update title"
          name="title"
          defaultValue={title || undefined}
          className="m-1 mb-2"
        ></Input>
        <Label>Description</Label>
        <Textarea
          placeholder="Update description"
          name="description"
          defaultValue={description || undefined}
          className="mb-3 mt-2 min-h-[150px]"
        />
        <SubmitButton text="Update Post" />
      </form>
      {/* <button
        onClick={() => {
          deletePost(postId ?? "");
        }}
      > */}
      <Dialog>
        <DialogTrigger asChild className="mt-10">
          <div className="flex items-center gap-x-1 hover:cursor-pointer hover:font-bold">
            {" "}
            <div className="flex items-center justify-end">
              <p>
                <Trash className="h-4 w-4 text-red-500" />{" "}
              </p>
              <p className="text-red-500">Delete</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Post</DialogTitle>
            <Separator />
            <DialogDescription>
              Update Title and Description :
            </DialogDescription>
          </DialogHeader>
          <p className="text-center mt-4">Delete this Post?</p>
          <button
            onClick={() => {
              deletePost(postId ?? "");
              return redirect("/");
            }}
          >
            <div className="flex items-center gap-x-1 hover:cursor-pointer hover:font-bold justify-center">
              {" "}
              <div className="flex items-center justify-center">
                <p>
                  <Trash className="h-4 w-4 text-red-500" />{" "}
                </p>
                <p className="text-red-500">Delete</p>
              </div>
            </div>
          </button>
        </DialogContent>
      </Dialog>
      {/* </button> */}
    </div>
  );
}
