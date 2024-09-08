import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaPaperPlane } from "react-icons/fa"; // Import the arrow icon from react-icons
import { createComment } from "../../actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  postId: string;
}

const initialState = {
  message: "",
  status: "",
};

export function CommentForm({ postId }: Props) {
  const [state, formAction] = useFormState(createComment, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        <form action={formAction} className="relative flex w-full">
          <input type="hidden" name="postId" value={postId} />
          <Input
            placeholder="Add a comment..."
            className="w-full pr-10 md:pr-4"
            name="comment" // Ensure input takes full width
            //   value={commentText}
            //   onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 md:hidden"
            variant="ghost"
          >
            <FaPaperPlane className="h-5 w-5" />
          </Button>
          <Button type="submit" className="hidden md:inline-block ml-2 w-24">
            Comment
          </Button>
        </form>
      </div>

      <Separator className="my-4" />
    </>
  );
}
