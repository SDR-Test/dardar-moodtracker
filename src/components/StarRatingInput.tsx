
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxStars?: number;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  rating,
  onRatingChange,
  maxStars = 5,
}) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            className={cn(
              "h-6 w-6 cursor-pointer",
              starValue <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
            onClick={() => onRatingChange(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRatingInput;

