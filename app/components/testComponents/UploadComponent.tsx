"use client";

import { Card } from "@/components/ui/card";
import { UploadDropzone } from "../Uploadthing";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { useState } from "react";
import { testUpload } from "@/app/actions";
const initialState = {
  message: "",
  status: "",
};

interface props {
  userId: string | undefined | null;
}
export function UploadComponent({ userId }: props) {
  
  const [state, formAction] = useFormState(testUpload, initialState);

  const [newImage, setNewImage] = useState<string>(""); // State for preview image URL
  const [imageUrl, setImageUrl] = useState<string>(""); // State for uploaded image URL

  const handleImageUpload = (imageFile: File) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setNewImage(imageUrl); // Set the preview image URL
  };
  return (
    <>
      <form action={formAction}>
        <Card className="flex flex-col p-5 gap-y-8">
        {newImage && (
        <div>
          <h3>Image Preview:</h3>
          <img
            src={newImage}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
          />
        </div>
      )}
        <UploadDropzone
        className="ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Handle upload completion
          setImageUrl(res[0].url); // Store the uploaded image URL
        }}
        onBeforeUploadBegin={(files) => {
          const imageFile = files[0];
          handleImageUpload(imageFile); // Preview image immediately
          return [imageFile]; // Proceed with upload
        }}
        onUploadError={(error: Error) => {
          alert("Error");
          console.log(error);
        }}
      />
          <div className="flex flex-col gap-y-1">
            <p>name</p>
            <Input name="name" placeholder="name" />
          </div>
          <div className="flex flex-col gap-y-1">
            <p>other</p>
            <Input name="other" placeholder="Description" />
          </div>
        </Card>
      </form>
    </>
  );
}
