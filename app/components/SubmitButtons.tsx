import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">{text}</Button>
      )}
    </>
  );
}

export function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="mt-2 w-full" disabled size="sm">
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button size="sm" className="mt-2 w-full" type="submit">
          Save
        </Button>
      )}
    </>
  );
}

export function FollowButton(isFollowing: boolean) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <>
          {isFollowing ? (
            <Button variant="outline" size="sm" type="submit">
              <Heart className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" size="sm" type="submit">
              <Heart className="h-4 w-4" />
            </Button>
          )}
        </>
      )}
    </>
  );
}
