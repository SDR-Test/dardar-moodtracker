
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HealingContent } from "@/types";
import { Music } from "lucide-react";

interface HealingContentCardProps {
  content: HealingContent;
}

const HealingContentCard: React.FC<HealingContentCardProps> = ({ content }) => {
  const handleOpenContent = () => {
    window.open(content.url, "_blank");
  };

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={handleOpenContent}>
      <div className="relative h-32">
        {content.thumbnailUrl ? (
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-mindiary-softpurple flex items-center justify-center">
            <Music className="h-10 w-10 text-primary" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center rounded-full bg-black bg-opacity-50 px-2 py-1 text-xs font-medium text-white">
            {content.type === "video" ? "동영상" : content.type === "audio" ? "오디오" : "아티클"}
          </span>
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm mb-1 line-clamp-2">{content.title}</h3>
        {content.description && (
          <p className="text-xs text-gray-600 line-clamp-2">{content.description}</p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {content.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-mindiary-softblue text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealingContentCard;
