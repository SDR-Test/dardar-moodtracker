
import React from "react";
import { BookEntry } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, CalendarDays, User } from "lucide-react"; // User for author
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface BookCardProps {
  book: BookEntry;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card className="overflow-hidden">
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      )}
      <CardHeader>
        <CardTitle className="text-xl">{book.title}</CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground">
          <User className="mr-1 h-4 w-4" /> {book.author}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-1 h-4 w-4" />
          {format(book.date, "yyyy년 MM월 dd일", { locale: ko })}
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < book.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">({book.rating}점)</span>
        </div>
        {book.memo && <p className="text-sm text-gray-700 whitespace-pre-wrap">{book.memo}</p>}
      </CardContent>
    </Card>
  );
};

export default BookCard;

