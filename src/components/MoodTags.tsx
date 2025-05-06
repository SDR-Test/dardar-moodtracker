
import React from "react";
import { cn } from "@/lib/utils";

interface MoodTagsProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const MoodTags: React.FC<MoodTagsProps> = ({ selectedTags, onTagToggle }) => {
  const tags = [
    "가족", "친구", "사랑", "여행", "운동", 
    "휴식", "업무", "공부", "건강", "음식", 
    "예술", "자연", "감사", "성취", "스트레스"
  ];

  return (
    <div className="my-4">
      <h3 className="text-md font-medium mb-2">감정 태그 (선택)</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={cn(
              "px-3 py-1 rounded-full text-sm transition-colors",
              selectedTags.includes(tag)
                ? "bg-mindiary-lavender text-primary"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTags;
