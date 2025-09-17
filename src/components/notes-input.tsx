"use client"

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { getSampleData } from "../lib/data";
import type { NoteType } from "../lib/data";
import { Lightbulb } from "lucide-react";
import { useTransition } from "react";

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
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();

  const handleLoadSample = () => {
    startTransition(() => {
      const sample = getSampleData(noteType);
      onNotesChange(sample.notes);

      // Update context fields
      Object.entries(sample.context).forEach(([key, value]) => {
        onContextChange(key, value);
      });
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">
          {t("input.rawNotes")}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadSample}
          disabled={isPending}
          className={`flex items-center gap-2 text-sm ${isPending ? 'animate-pulse' : ''}`}
        >
          <Lightbulb className="h-4 w-4" />
          {t("input.loadSample")}
        </Button>
      </div>
      <Textarea
        value={rawNotes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder={t("input.rawNotesPlaceholder")}
        rows={8}
        className="resize-none"
      />
    </div>
  );
}
