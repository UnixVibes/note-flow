import {
  FileText,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  User,
  Building,
  MousePointerClick,
} from "lucide-react";
import i18n from "./i18n";

export type NoteType = "interview" | "meeting";

export interface ContextField {
  key: string;
  label: string;
  icon: any;
}

export interface UseCaseOption {
  value: string;
  label: string;
  icon: any;
}

export interface NoteContext {
  interview: {
    position: string;
    candidate: string;
    interviewType: string;
    duration: string;
  };
  meeting: {
    title: string;
    attendees: string;
    date: string;
    duration: string;
  };
}

export const useCaseOptions: Record<NoteType, UseCaseOption[]> = {
  interview: [
    { value: "evaluation", label: "Evaluation Scorecard", icon: FileText },
    { value: "slack", label: "Slack Update", icon: MessageSquare },
    { value: "email", label: "Email Summary", icon: Mail },
  ],
  meeting: [
    { value: "googledoc", label: "Google Doc", icon: FileText },
    { value: "slack", label: "Slack Update", icon: MessageSquare },
    { value: "email", label: "Email Summary", icon: Mail },
  ],
};

export const contextFields: Record<NoteType, ContextField[]> = {
  interview: [
    { key: "position", label: "Position", icon: Building },
    { key: "candidate", label: "Candidate Name", icon: User },
    { key: "interviewType", label: "Interview Type", icon: MousePointerClick },
    { key: "duration", label: "Duration", icon: Clock },
  ],
  meeting: [
    { key: "subject", label: "Meeting Subject", icon: Building },
    { key: "attendees", label: "Attendees", icon: User },
    { key: "date", label: "Date", icon: Calendar },
    { key: "duration", label: "Duration", icon: Clock },
  ],
};

export const sampleData = {
  en: {
    interview: {
      context: {
        position: "Senior Frontend Developer",
        candidate: "John Smith",
        interviewType: "Technical",
        duration: "45 mins",
      },
      notes: `Candidate: John Smith
- Strong React exp (4 yrs)
- Worked w/ TypeScript, Next.js
- q about state mgmt → mentioned Redux, Context API
- Tech challenge: built todo app w/ good structure
- Soft skills: communicates well, asks good qs
- Concerns: limited backend exp
- Salary expectation: 120-130k
- Available: 2 weeks notice
- Team fit: seems collaborative`,
    },
    meeting: {
      context: {
        subject: "Q1 Planning Meeting",
        attendees: "Team leads, Product Manager",
        date: "2025-06-15",
        duration: "60 mins",
      },
      notes: `Agenda: Q1 roadmap planning
- Revenue target: 2M (up 15% from Q4)
- New feature: mobile app launch
- Timeline: design complete by Feb 15, dev by Mar 30
- Resources: need 2 more devs
- Budget: 500k allocated
- Risks: tight timeline, resource constraints
- Next steps: hiring plan, design kickoff
- Follow-up: weekly check-ins starting next Mon`,
    },
  },
  fa: {
    interview: {
      context: {
        position: "توسعه‌دهنده ارشد فرانت‌اند",
        candidate: "علی احمدی",
        interviewType: "فنی",
        duration: "45 دقیقه",
      },
      notes: `نامزد: علی احمدی
- تجربه قوی React (4 سال)
- کار با TypeScript، Next.js
- سوال درباره مدیریت state → ذکر Redux، Context API
- چالش فنی: ساخت todo app با ساختار خوب
- مهارت‌های نرم: ارتباط خوب، سوالات مناسب
- نگرانی‌ها: تجربه محدود backend
- انتظار حقوق: 120-130 هزار دلار
- در دسترس: اطلاع 2 هفته‌ای
- تناسب تیمی: به نظر مشارکت‌جو`,
    },
    meeting: {
      context: {
        subject: "جلسه برنامه‌ریزی Q1",
        attendees: "سرپرستان تیم، مدیر محصول",
        date: "1404-5-23",
        duration: "60 دقیقه",
      },
      notes: `دستور کار: برنامه‌ریزی نقشه راه Q1
- هدف درآمد: 2 میلیون (افزایش 15% از Q4)
- ویژگی جدید: راه‌اندازی اپ موبایل
- زمان‌بندی: تکمیل طراحی تا 26 بهمن، توسعه تا 9 فروردین
- منابع: نیاز به 2 توسعه‌دهنده بیشتر
- بودجه: 500 هزار دلار اختصاص یافته
- ریسک‌ها: زمان‌بندی فشرده، محدودیت منابع
- مراحل بعدی: برنامه استخدام، شروع طراحی
- پیگیری: بررسی هفتگی از دوشنبه آینده`,
    },
  },
};

// Helper function to get sample data based on current language
export const getSampleData = (noteType: NoteType) => {
  const currentLang = i18n.language || "en";
  const lang = currentLang === "fa" ? "fa" : "en";
  return sampleData[lang][noteType];
};
