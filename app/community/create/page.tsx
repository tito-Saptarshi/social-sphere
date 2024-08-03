import { CommunityForm } from "@/app/components/CommunityForm";
import { Separator } from "@/components/ui/separator";

export default function CommunityPage() {
  return (
    <div className="px-2"> 
      <div className="flex justify-between items-center mb-6 ml-5">
        <div>
          <h1 className="text-2xl font-bold py-2">Create Community</h1>
          <p className="text-muted-foreground">
            Tell us about your Community Page
          </p>
        </div>
      </div>
      <Separator className="mt-10 mb-2 mx-2" />
      <CommunityForm />
    </div>
  );
}
