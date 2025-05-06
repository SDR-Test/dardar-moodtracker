
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface MoodNoteProps {
  note: string;
  onNoteChange: (note: string) => void;
}

const MoodNote: React.FC<MoodNoteProps> = ({ note, onNoteChange }) => {
  return (
    <div className="my-4">
      <h3 className="text-md font-medium mb-2">짧은 메모 (선택)</h3>
      <Textarea
        placeholder="오늘 어떤 일이 있었나요? 간단히 적어보세요."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        className="min-h-[100px] bg-gray-50"
      />
    </div>
  );
};

export default MoodNote;
