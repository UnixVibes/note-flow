import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { t } from "../lib/translations";
import { sampleData } from "../lib/data";
import type { NoteType } from "../lib/data";
import { Lightbulb } from "lucide-react";

interface NotesInputProps {
  rawNotes: string;
  onNotesChange: (notes: string) => void;
  noteType: NoteType;
  onContextChange: (field: string, value: string) => void;
}

export function NotesInput({
  rawNotes,
  onNotesChange,
  noteType,
  onContextChange,
}: NotesInputProps) {
  const handleLoadSample = () => {
    const sample = sampleData[noteType];
    onNotesChange(sample.notes);

    // Update context fields
    Object.entries(sample.context).forEach(([key, value]) => {
      onContextChange(key, value);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">{t("rawNotes")}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadSample}
          className="flex items-center gap-2 text-sm"
        >
          <Lightbulb className="h-4 w-4" />
          Load Sample
        </Button>
      </div>
      <Textarea
        value={rawNotes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder={t("rawNotesPlaceholder")}
        rows={8}
        className="resize-none"
      />
    </div>
  );
}
