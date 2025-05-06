
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import MoodSelector from "@/components/MoodSelector";
import ImageUploader from "@/components/ImageUploader";
import MoodTags from "@/components/MoodTags";
import { MoodType } from "@/types";
import { useMood } from "@/contexts/MoodContext";
import { Image, Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Journal: React.FC = () => {
  const { journalEntries, addJournalEntry } = useMood();
  const [isWriting, setIsWriting] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = () => {
    if (!title || !content || !selectedMood) return;

    addJournalEntry({
      title,
      content,
      date: new Date(),
      mood: selectedMood,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      imageUrl,
    });

    // Reset form
    setTitle("");
    setContent("");
    setSelectedMood(null);
    setSelectedTags([]);
    setImageUrl(undefined);
    setIsWriting(false);
  };

  const startWriting = () => {
    setIsWriting(true);
  };

  const cancelWriting = () => {
    setIsWriting(false);
    setTitle("");
    setContent("");
    setSelectedMood(null);
    setSelectedTags([]);
    setImageUrl(undefined);
  };

  if (isWriting) {
    return (
      <Layout>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary">새 일기 작성</h1>
            <Button variant="outline" onClick={cancelWriting}>
              취소
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium"
              />
            </div>

            <MoodSelector
              selectedMood={selectedMood}
              onSelectMood={handleMoodSelect}
            />

            <div>
              <Textarea
                placeholder="무슨 일이 있었나요? 자유롭게 작성해보세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <MoodTags
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
            
            <ImageUploader
              imageUrl={imageUrl}
              onImageChange={setImageUrl}
            />

            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={!title || !content || !selectedMood}
              >
                일기 저장하기
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-primary">일기장</h1>
          <Button onClick={startWriting} className="flex items-center gap-1">
            <Plus size={16} /> 새 일기
          </Button>
        </div>

        {journalEntries.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">아직 작성한 일기가 없습니다.</p>
            <Button onClick={startWriting}>첫 일기 작성하기</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {entry.imageUrl && (
                    <img
                      src={entry.imageUrl}
                      alt={entry.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-medium">{entry.title}</h2>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {format(new Date(entry.date), "yyyy.MM.dd")}
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-3">
                      {entry.content}
                    </p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-mindiary-softblue text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Journal;
