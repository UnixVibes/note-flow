import { Button } from "./ui/button";
import type { NoteType } from "../lib/data";
import { t } from "../lib/translations";

interface NoteTypeSelectorProps {
  noteType: NoteType;
  onNoteTypeChange: (type: NoteType) => void;
}

export function NoteTypeSelector({
  noteType,
  onNoteTypeChange,
}: NoteTypeSelectorProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-muted p-1 rounded-lg inline-flex w-full sm:w-auto">
        <Button
          variant={noteType === "interview" ? "default" : "ghost"}
          size="sm"
          onClick={() => onNoteTypeChange("interview")}
          className="flex-1 sm:flex-none"
        >
          {t("interviewNotes")}
        </Button>
        <Button
          variant={noteType === "meeting" ? "default" : "ghost"}
          size="sm"
          onClick={() => onNoteTypeChange("meeting")}
          className="flex-1 sm:flex-none"
        >
          {t("meetingNotes")}
        </Button>
      </div>
    </div>
  );
}
