
export type MoodType = 'happy' | 'calm' | 'neutral' | 'sad' | 'angry';

export interface MoodEntry {
  id: string;
  date: Date;
  mood: MoodType;
  note?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface JournalEntry extends MoodEntry {
  title: string;
  content: string;
}

export interface HealingContent {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'article';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  tags: string[];
}

export interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:MM format
}

export interface UserPreferences {
  notificationSettings: NotificationSettings;
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
}

// New types for Book and Movie logging app
export interface BookEntry {
  id: string;
  type: 'book';
  title: string;
  author: string;
  date: Date; // Date recorded/read
  rating: number; // 1-5
  memo?: string;
  imageUrl?: string;
}

export interface MovieEntry {
  id: string;
  type: 'movie';
  title: string;
  director: string;
  date: Date; // Date recorded/watched
  rating: number; // 1-5
  memo?: string;
  imageUrl?: string;
}

