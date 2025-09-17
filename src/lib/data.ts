import {
  FileText,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  User,
  Building,
  MousePointerClick,
  MessageCircle,
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
    { value: "discord", label: "Discord Message", icon: MessageCircle },
  ],
  meeting: [
    { value: "googledoc", label: "Google Doc", icon: FileText },
    { value: "slack", label: "Slack Update", icon: MessageSquare },
    { value: "email", label: "Email Summary", icon: Mail },
    { value: "discord", label: "Discord Message", icon: MessageCircle },
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
  th: {
    interview: {
      context: {
        position: "นักพัฒนาเว็บไซต์อาวุโส",
        candidate: "สมชาย ใจดี",
        interviewType: "เทคนิค",
        duration: "45 นาที",
      },
      notes: `ผู้สมัคร: สมชาย ใจดี
- ประสบการณ์ React แข็งแกร่ง (4 ปี)
- ทำงานกับ TypeScript, Next.js
- ถามเรื่อง state management → กล่าวถึง Redux, Context API
- ความท้าทายเทคนิค: สร้าง todo app ที่มีโครงสร้างดี
- ทักษะ soft skill: สื่อสารดี ถามคำถามที่ดี
- ข้อกังวล: ประสบการณ์ backend จำกัด
- คาดหวังเงินเดือน: 120-130k
- พร้อมเริ่มงาน: แจ้งล่วงหน้า 2 สัปดาห์
- เข้ากับทีม: ดูเหมือนจะร่วมมือกันได้ดี`,
    },
    meeting: {
      context: {
        subject: "ประชุมวางแผน Q1",
        attendees: "หัวหน้าทีม, ผู้จัดการผลิตภัณฑ์",
        date: "2025-06-15",
        duration: "60 นาที",
      },
      notes: `วาระการประชุม: วางแผนแผนงาน Q1
- เป้าหมายรายได้: 2M (เพิ่มขึ้น 15% จาก Q4)
- ฟีเจอร์ใหม่: เปิดตัวแอปมือถือ
- ไทม์ไลน์: ออกแบบเสร็จภายใน 15 ก.พ., พัฒนาภายใน 30 มี.ค.
- ทรัพยากร: ต้องการนักพัฒนาเพิ่ม 2 คน
- งบประมาณ: จัดสรร 500k
- ความเสี่ยง: ไทม์ไลน์กดดัน, ข้อจำกัดทรัพยากร
- ขั้นตอนถัดไป: แผนการจ้างงาน, เริ่มออกแบบ
- ติดตาม: ตรวจสอบรายสัปดาห์เริ่มจันทร์หน้า`,
    },
  },
};

// Helper function to get sample data based on current language
export const getSampleData = (noteType: NoteType) => {
  const currentLang = i18n.language || "en";
  const lang = currentLang === "th" ? "th" : "en";
  return sampleData[lang][noteType];
};
