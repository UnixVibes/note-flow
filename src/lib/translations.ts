export const TRANSLATIONS = {
  appTitle: "Professional Note Transformer",
  appDescription: "Transform raw notes into polished, professional formats",
  interviewNotes: "Interview Notes",
  meetingNotes: "Meeting Notes",
  input: "Input",
  context: "Context",
  position: "Position",
  candidateName: "Candidate Name",
  interviewType: "Interview Type",
  duration: "Duration",
  meetingTitle: "Meeting Title",
  attendees: "Attendees",
  date: "Date",
  rawNotes: "Raw Notes",
  rawNotesPlaceholder: "Enter your raw notes here...",
  outputFormat: "Output Format",
  evaluationScorecard: "Evaluation Scorecard",
  slackUpdate: "Slack Update",
  emailSummary: "Email Summary",
  googleDoc: "Google Doc",
  transforming: "Transforming...",
  transformNotes: "Transform Notes",
  output: "Output",
  copy: "Copy",
  transformedNotesPlaceholder: "Transformed notes will appear here",
  githubRepo: "View on GitHub",
  builtBy: "Built by",
  aiSettings: "AI Settings",
};

export const t = (key: keyof typeof TRANSLATIONS): string => {
  return TRANSLATIONS[key] || key;
};
