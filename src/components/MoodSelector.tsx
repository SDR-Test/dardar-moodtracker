
import React from "react";
import { MoodType } from "@/types";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelectMood,
}) => {
  const moods: { type: MoodType; emoji: string; label: string }[] = [
    { type: "happy", emoji: "😊", label: "행복" },
    { type: "calm", emoji: "😌", label: "평온" },
    { type: "neutral", emoji: "😐", label: "보통" },
    { type: "sad", emoji: "😢", label: "슬픔" },
    { type: "angry", emoji: "😠", label: "화남" },
  ];

  return (
    <div className="py-4">
      <h2 className="text-lg font-medium mb-4 text-center">
        오늘의 기분은 어떠신가요?
      </h2>
      <div className="flex justify-center space-x-4">
        {moods.map((mood) => (
          <div
            key={mood.type}
            className="flex flex-col items-center"
            onClick={() => onSelectMood(mood.type)}
          >
            <div
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200",
                selectedMood === mood.type
                  ? "bg-mindiary-lavender scale-110 shadow-md"
                  : "hover:bg-mindiary-softblue hover:scale-105"
              )}
            >
              <span className="text-2xl">{mood.emoji}</span>
            </div>
            <span className="text-xs mt-1">{mood.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
