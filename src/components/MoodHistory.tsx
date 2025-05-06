
import React from "react";
import { MoodEntry } from "@/types";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ entries }) => {
  const recentEntries = [...entries]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const getMoodEmoji = (mood: string): string => {
    switch (mood) {
      case "happy":
        return "😊";
      case "calm":
        return "😌";
      case "neutral":
        return "😐";
      case "sad":
        return "😢";
      case "angry":
        return "😠";
      default:
        return "😐";
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>아직 기록된 감정이 없습니다</p>
        <p className="text-sm">기분을 기록하면 여기에 표시됩니다</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-3">최근 기록</h2>
      <div className="space-y-3">
        {recentEntries.map((entry) => (
          <Card key={entry.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{getMoodEmoji(entry.mood)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {format(entry.date, "yyyy년 MM월 dd일 HH:mm")}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-gray-700 mt-1 line-clamp-1">
                      {entry.note}
                    </p>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap mt-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-mindiary-softblue px-2 py-0.5 rounded-full mr-1 mb-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {entry.imageUrl && (
                <img
                  src={entry.imageUrl}
                  alt="Mood entry"
                  className="w-full h-32 object-cover rounded-md mt-3"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoodHistory;
