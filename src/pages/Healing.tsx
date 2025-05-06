
import React from "react";
import Layout from "@/components/Layout";
import HealingContentCard from "@/components/HealingContentCard";
import { useHealing } from "@/contexts/HealingContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const Healing: React.FC = () => {
  const { filteredContents, filterByType, filterByTag, currentFilter } = useHealing();

  const uniqueTags = Array.from(
    new Set(
      filteredContents.flatMap((content) => content.tags)
    )
  ).sort();

  const handleTypeFilter = (type: string | null) => {
    filterByType(type);
  };

  const handleTagFilter = (tag: string) => {
    if (currentFilter.tag === tag) {
      filterByTag(null);
    } else {
      filterByTag(tag);
    }
  };

  const clearFilters = () => {
    filterByType(null);
    filterByTag(null);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4">힐링 콘텐츠</h1>

        <Tabs defaultValue="all" onValueChange={(v) => handleTypeFilter(v === "all" ? null : v)}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">
              전체
            </TabsTrigger>
            <TabsTrigger value="video" className="flex-1">
              동영상
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex-1">
              오디오
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {(currentFilter.type || currentFilter.tag) && (
          <div className="flex justify-between items-center mb-3">
            <div className="flex flex-wrap gap-2">
              {currentFilter.type && (
                <Badge variant="secondary" className="px-3 py-1">
                  {currentFilter.type === "video" ? "동영상" : "오디오"}
                </Badge>
              )}
              {currentFilter.tag && (
                <Badge variant="outline" className="px-3 py-1">
                  {currentFilter.tag}
                </Badge>
              )}
            </div>
            <button 
              onClick={clearFilters} 
              className="text-sm text-gray-500 flex items-center hover:text-gray-700"
            >
              필터 초기화 <X className="ml-1" size={14} />
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {uniqueTags.slice(0, 10).map((tag) => (
            <Badge
              key={tag}
              variant={currentFilter.tag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {filteredContents.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">선택한 필터에 맞는 콘텐츠가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredContents.map((content) => (
              <HealingContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Healing;
