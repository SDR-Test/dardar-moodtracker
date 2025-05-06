
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";

interface ImageUploaderProps {
  imageUrl: string | undefined;
  onImageChange: (url: string | undefined) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onImageChange,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate upload loading
    setIsUploading(true);
    
    // We'll use FileReader to create a base64 image preview
    // In a real app, you'd upload the image to a server and get a URL back
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        onImageChange(e.target?.result as string);
        setIsUploading(false);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onImageChange(undefined);
  };

  return (
    <div className="my-4">
      <h3 className="text-md font-medium mb-2">이미지 첨부 (선택)</h3>
      {imageUrl ? (
        <div className="relative mt-2">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-auto rounded-lg"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div>
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-600">
                {isUploading ? "업로드 중..." : "사진을 추가하려면 클릭하세요"}
              </span>
            </div>
            <input
              id="image-upload"
              name="image-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
