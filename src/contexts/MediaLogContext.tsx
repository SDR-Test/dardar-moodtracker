
import React, { createContext, useState, useContext, ReactNode } from "react";
import { BookEntry, MovieEntry } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast"; // Updated import path

interface MediaLogContextProps {
  bookEntries: BookEntry[];
  movieEntries: MovieEntry[];
  addBookEntry: (entry: Omit<BookEntry, "id" | "type">) => void;
  addMovieEntry: (entry: Omit<MovieEntry, "id" | "type">) => void;
  // Future methods: updateBookEntry, deleteBookEntry, etc.
}

const MediaLogContext = createContext<MediaLogContextProps | undefined>(undefined);

export const MediaLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookEntries, setBookEntries] = useState<BookEntry[]>([]);
  const [movieEntries, setMovieEntries] = useState<MovieEntry[]>([]);
  const { toast } = useToast();

  const addBookEntry = (entry: Omit<BookEntry, "id" | "type">) => {
    const newEntry: BookEntry = {
      ...entry,
      id: uuidv4(),
      type: 'book',
    };
    setBookEntries((prev) => [newEntry, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
    toast({
      title: "책이 기록되었습니다",
      description: "새로운 책 정보가 성공적으로 저장되었습니다.",
    });
  };

  const addMovieEntry = (entry: Omit<MovieEntry, "id" | "type">) => {
    const newEntry: MovieEntry = {
      ...entry,
      id: uuidv4(),
      type: 'movie',
    };
    setMovieEntries((prev) => [newEntry, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
    toast({
      title: "영화가 기록되었습니다",
      description: "새로운 영화 정보가 성공적으로 저장되었습니다.",
    });
  };

  return (
    <MediaLogContext.Provider
      value={{
        bookEntries,
        movieEntries,
        addBookEntry,
        addMovieEntry,
      }}
    >
      {children}
    </MediaLogContext.Provider>
  );
};

export const useMediaLog = () => {
  const context = useContext(MediaLogContext);
  if (context === undefined) {
    throw new Error("useMediaLog must be used within a MediaLogProvider");
  }
  return context;
};

