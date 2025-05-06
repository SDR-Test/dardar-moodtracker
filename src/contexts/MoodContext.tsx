
import React, { createContext, useState, useContext, useEffect } from "react";
import { MoodEntry, JournalEntry } from "@/types";
import { mockMoodEntries, mockJournalEntries } from "@/data/mockData";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

interface MoodContextProps {
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, "id">) => void;
  addJournalEntry: (entry: Omit<JournalEntry, "id">) => void;
  getMoodStats: () => {
    daily: Record<string, number>;
    weekly: Record<string, number>;
    monthly: Record<string, number>;
  };
}

const MoodContext = createContext<MoodContextProps | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const { toast } = useToast();

  // Load mock data on mount (in a real app, this would be from local storage or a database)
  useEffect(() => {
    setMoodEntries(mockMoodEntries);
    setJournalEntries(mockJournalEntries);
  }, []);

  const addMoodEntry = (entry: Omit<MoodEntry, "id">) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: uuidv4(),
    };
    setMoodEntries((prev) => [newEntry, ...prev]);
    toast({
      title: "기분이 기록되었습니다",
      description: "오늘의 기분이 성공적으로 저장되었습니다.",
    });
  };

  const addJournalEntry = (entry: Omit<JournalEntry, "id">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: uuidv4(),
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
    toast({
      title: "일기가 저장되었습니다",
      description: "일기가 성공적으로 저장되었습니다.",
    });
  };

  const getMoodStats = () => {
    // Simplified statistics calculations
    // In a real app, this would be more sophisticated
    return {
      daily: { happy: 3, calm: 2, neutral: 1, sad: 1, angry: 1 },
      weekly: { happy: 10, calm: 8, neutral: 5, sad: 3, angry: 2 },
      monthly: { happy: 42, calm: 35, neutral: 20, sad: 15, angry: 8 },
    };
  };

  return (
    <MoodContext.Provider
      value={{
        moodEntries,
        journalEntries,
        addMoodEntry,
        addJournalEntry,
        getMoodStats,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};
