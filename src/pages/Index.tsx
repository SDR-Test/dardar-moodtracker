
import React, { useState } from "react";
import Layout from "@/components/Layout";
import MoodSelector from "@/components/MoodSelector";
import MoodTags from "@/components/MoodTags";
import MoodNote from "@/components/MoodNote";
import ImageUploader from "@/components/ImageUploader";
import MoodHistory from "@/components/MoodHistory";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types";
import { useMood } from "@/contexts/MoodContext";
import { format } from "date-fns";

const Index: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { moodEntries, addMoodEntry } = useMood();

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

  const handleNoteChange = (newNote: string) => {
    setNote(newNote);
  };

  const handleImageChange = (url: string | undefined) => {
    setImageUrl(url);
  };

  const handleSubmit = () => {
    if (!selectedMood) return;

    addMoodEntry({
      date: new Date(),
      mood: selectedMood,
      note: note.trim() !== "" ? note : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      imageUrl,
    });

    // Reset form
    setSelectedMood(null);
    setSelectedTags([]);
    setNote("");
    setImageUrl(undefined);
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="text-center">
          <p className="text-lg text-gray-600">
            {format(new Date(), "yyyy년 MM월 dd일")}
          </p>
          <h1 className="text-3xl font-bold text-primary mb-4">오늘의 기분</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <MoodSelector
            selectedMood={selectedMood}
            onSelectMood={handleMoodSelect}
          />
          
          {selectedMood && (
            <>
              <MoodTags
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />
              <MoodNote note={note} onNoteChange={handleNoteChange} />
              <ImageUploader
                imageUrl={imageUrl}
                onImageChange={handleImageChange}
              />
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleSubmit}
                  className="w-full max-w-xs bg-primary hover:bg-primary/90"
                >
                  기록하기
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <MoodHistory entries={moodEntries} />
    </Layout>
  );
};

export default Index;
