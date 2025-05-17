
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import StarRatingInput from "@/components/StarRatingInput";
import ImageUploader from "@/components/ImageUploader"; // Existing component
import DatePicker from "@/components/DatePicker";
import { useMediaLog } from "@/contexts/MediaLogContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const bookFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  author: z.string().min(1, "저자를 입력해주세요."),
  date: z.date({ required_error: "날짜를 선택해주세요." }),
  rating: z.number().min(1, "별점을 선택해주세요.").max(5),
  memo: z.string().optional(),
  imageUrl: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

interface AddBookFormProps {
  onFormSubmit: () => void; // To close the form or modal after submission
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onFormSubmit }) => {
  const { addBookEntry } = useMediaLog();
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      date: new Date(),
      rating: 0,
      memo: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: BookFormValues) => {
    // Ensure all required fields exist (TypeScript validation)
    const bookData = {
      title: data.title,
      author: data.author,
      date: data.date,
      rating: data.rating,
      memo: data.memo || "",
      imageUrl: data.imageUrl || "",
    };
    
    addBookEntry(bookData);
    form.reset();
    onFormSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="책 제목" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>저자</FormLabel>
              <FormControl>
                <Input placeholder="저자명" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>읽은 날짜</FormLabel>
              <DatePicker date={field.value} onDateChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>별점</FormLabel>
              <FormControl>
                <StarRatingInput rating={field.value} onRatingChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모 (선택)</FormLabel>
              <FormControl>
                <Textarea placeholder="책에 대한 생각을 적어보세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지 (선택)</FormLabel>
              <ImageUploader imageUrl={field.value} onImageChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">책 기록 저장</Button>
      </form>
    </Form>
  );
};

export default AddBookForm;
