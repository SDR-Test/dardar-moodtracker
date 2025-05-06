
import { MoodEntry, JournalEntry, HealingContent } from "@/types";
import { subDays, subHours } from "date-fns";

// Helper to create random past dates
const randomPastDate = (maxDaysAgo: number) => {
  const daysAgo = Math.floor(Math.random() * maxDaysAgo);
  return subDays(new Date(), daysAgo);
};

// Generate mock mood entries
export const mockMoodEntries: MoodEntry[] = [
  {
    id: "1",
    date: subHours(new Date(), 2),
    mood: "happy",
    note: "오늘은 정말 좋은 하루였어요. 오랜만에 친구를 만났습니다.",
    tags: ["친구", "여행", "행복"],
    imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "2",
    date: subDays(new Date(), 1),
    mood: "calm",
    note: "평온한 하루를 보냈어요. 책을 읽고 명상을 했습니다.",
    tags: ["휴식", "명상", "독서"]
  },
  {
    id: "3",
    date: subDays(new Date(), 2),
    mood: "neutral",
    note: "일상적인 하루였습니다."
  },
  {
    id: "4",
    date: subDays(new Date(), 3),
    mood: "sad",
    note: "오늘은 조금 우울했어요. 비가 많이 왔습니다.",
    tags: ["비", "우울", "휴식"],
    imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "5",
    date: subDays(new Date(), 4),
    mood: "angry",
    note: "일이 잘 안 풀려서 짜증이 났어요.",
    tags: ["업무", "스트레스"]
  },
  {
    id: "6",
    date: subDays(new Date(), 5),
    mood: "happy",
    note: "좋은 소식을 들었어요!",
    tags: ["행복", "성취", "감사"]
  },
  {
    id: "7",
    date: subDays(new Date(), 6),
    mood: "calm",
    note: "좋은 하루였어요.",
    tags: ["평온", "자연", "감사"],
    imageUrl: "https://images.unsplash.com/photo-1615887339926-7475a0fdd7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

// Generate mock journal entries
export const mockJournalEntries: JournalEntry[] = [
  {
    id: "j1",
    date: subDays(new Date(), 1),
    title: "행복한 하루",
    mood: "happy",
    content: "오늘은 정말 좋은 하루였어요. 오랜만에 친구를 만났고 맛있는 음식도 먹었습니다. 날씨도 화창해서 공원에서 산책도 했어요. 이런 날이 더 많았으면 좋겠습니다.",
    tags: ["친구", "음식", "산책", "행복"],
    imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "j2",
    date: subDays(new Date(), 3),
    title: "우울한 비 오는 날",
    mood: "sad",
    content: "오늘은 하루종일 비가 내려서 기분이 우울했어요. 집에만 있어서 답답했지만, 오랜만에 책을 읽을 수 있어서 위안이 되었습니다. 내일은 날씨가 좋아지면 좋겠어요.",
    tags: ["비", "우울", "독서", "휴식"],
    imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "j3",
    date: subDays(new Date(), 5),
    title: "좋은 소식",
    mood: "happy",
    content: "오늘 기다리던 좋은 소식을 들었어요! 오래 준비했던 프로젝트가 마침내 승인되었습니다. 정말 기뻤어요. 저녁에는 가족과 함께 축하 식사를 했습니다.",
    tags: ["성취", "가족", "기쁨", "축하"],
  },
  {
    id: "j4",
    date: subDays(new Date(), 7),
    title: "힘든 하루",
    mood: "angry",
    content: "오늘은 일이 너무 많아서 힘들었어요. 마감 기한도 촉박하고 해결해야 할 문제도 많았습니다. 퇴근 후에 집에 와서 명상을 하며 마음을 진정시켰습니다. 내일은 더 나아질 거예요.",
    tags: ["업무", "스트레스", "명상"],
  }
];

// Generate mock healing content
export const mockHealingContent: HealingContent[] = [
  {
    id: "h1",
    title: "3분 명상 - 스트레스 해소하기",
    type: "video",
    url: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
    thumbnailUrl: "https://img.youtube.com/vi/O-6f5wQXSu8/hqdefault.jpg",
    description: "바쁜 일상 속에서 3분만 투자해서 마음의 평화를 찾아보세요.",
    tags: ["명상", "스트레스 해소", "짧은 영상"]
  },
  {
    id: "h2",
    title: "수면에 도움이 되는 자연 소리 - 빗소리 ASMR",
    type: "audio",
    url: "https://www.youtube.com/watch?v=mPZkdNFkNps",
    thumbnailUrl: "https://img.youtube.com/vi/mPZkdNFkNps/hqdefault.jpg",
    description: "빗소리를 들으며 편안하게 잠들 수 있습니다.",
    tags: ["ASMR", "수면", "자연"]
  },
  {
    id: "h3",
    title: "긍정적인 하루를 위한 아침 명상",
    type: "video",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    thumbnailUrl: "https://img.youtube.com/vi/inpok4MKVLM/hqdefault.jpg",
    description: "하루를 긍정적으로 시작하기 위한 10분 명상입니다.",
    tags: ["아침", "긍정", "명상"]
  },
  {
    id: "h4",
    title: "잠들기 전 듣는 편안한 피아노 음악",
    type: "audio",
    url: "https://www.youtube.com/watch?v=XULUBg_ZcAU",
    thumbnailUrl: "https://img.youtube.com/vi/XULUBg_ZcAU/hqdefault.jpg",
    description: "잠들기 전 듣기 좋은 부드러운 피아노 음악입니다.",
    tags: ["음악", "피아노", "수면"]
  },
  {
    id: "h5",
    title: "스트레칭으로 시작하는 하루",
    type: "video",
    url: "https://www.youtube.com/watch?v=3pSJTLC8e6A",
    thumbnailUrl: "https://img.youtube.com/vi/3pSJTLC8e6A/hqdefault.jpg",
    description: "아침에 일어나서 할 수 있는 간단한 스트레칭입니다.",
    tags: ["운동", "스트레칭", "건강"]
  },
  {
    id: "h6",
    title: "마음을 편안하게 하는 바다 소리",
    type: "audio",
    url: "https://www.youtube.com/watch?v=WHPEKLQID4U",
    thumbnailUrl: "https://img.youtube.com/vi/WHPEKLQID4U/hqdefault.jpg",
    description: "파도 소리를 들으며 마음의 안정을 찾아보세요.",
    tags: ["바다", "자연", "힐링"]
  }
];
