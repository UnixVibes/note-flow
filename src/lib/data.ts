import {
  FileText,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  User,
  Building,
} from "lucide-react";

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
    { key: "interviewType", label: "Interview Type", icon: Calendar },
    { key: "duration", label: "Duration", icon: Clock },
  ],
  meeting: [
    { key: "title", label: "Meeting Title", icon: Building },
    { key: "attendees", label: "Attendees", icon: User },
    { key: "date", label: "Date", icon: Calendar },
    { key: "duration", label: "Duration", icon: Clock },
  ],
};

export const sampleData = {
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
      title: "Q1 Planning Meeting",
      attendees: "Team leads, Product Manager",
      date: "2025-01-15",
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
};
