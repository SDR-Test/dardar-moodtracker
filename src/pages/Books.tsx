
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMediaLog } from "@/contexts/MediaLogContext";
import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const BooksPage: React.FC = () => {
  const { bookEntries } = useMediaLog();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">내 책 기록</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 새 책 기록
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>새 책 기록하기</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <AddBookForm onFormSubmit={() => setIsFormOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {bookEntries.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>아직 기록된 책이 없습니다.</p>
          <p className="text-sm mt-1">새 책 기록 버튼을 눌러 추가해보세요.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookEntries.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default BooksPage;

