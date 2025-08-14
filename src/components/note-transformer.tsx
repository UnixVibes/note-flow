import { useState } from "react";
import type { NoteType, NoteContext } from "../lib/data";
import { t } from "../lib/translations";
import { getAIResponse, getTransformationPrompt } from "../lib/ai";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Header } from "./header";
import { NoteTypeSelector } from "./note-type-selector";
import { ContextForm } from "./context-form";
import { NotesInput } from "./notes-input";
import { OutputFormatSelector } from "./output-format-selector";
import { OutputDisplay } from "./output-display";

export function NoteTransformer() {
  const [noteType, setNoteType] = useState<NoteType>("interview");
  const [context, setContext] = useState<NoteContext>({
    interview: {
      position: "",
      candidate: "",
      interviewType: "",
      duration: "",
    },
    meeting: {
      title: "",
      attendees: "",
      date: "",
      duration: "",
    },
  });
  const [rawNotes, setRawNotes] = useState("");
  const [finalUseCase, setFinalUseCase] = useState("");
  const [output, setOutput] = useState("");
  const [isTransforming, setIsTransforming] = useState(false);

  const handleContextChange = (field: string, value: string) => {
    setContext((prev) => ({
      ...prev,
      [noteType]: {
        ...prev[noteType],
        [field]: value,
      },
    }));
  };

  const transformNotes = async () => {
    if (!rawNotes.trim()) return;

    setIsTransforming(true);
    try {
      const prompt = getTransformationPrompt(
        noteType,
        context,
        finalUseCase,
        rawNotes,
      );
      const result = await getAIResponse(prompt);
      setOutput(result);
    } catch (error) {
      console.error("Error transforming notes:", error);
      setOutput(
        `Error: ${error instanceof Error ? error.message : "Unable to transform notes. Please try again."}`,
      );
    } finally {
      setIsTransforming(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <NoteTypeSelector noteType={noteType} onNoteTypeChange={setNoteType} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Column */}
          <div className="space-y-6">
            <Card className="p-4 sm:p-6">
              <CardHeader className="p-0 pb-4 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  {t("input")}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                <ContextForm
                  noteType={noteType}
                  context={context}
                  onContextChange={handleContextChange}
                />

                <NotesInput
                  rawNotes={rawNotes}
                  onNotesChange={setRawNotes}
                  noteType={noteType}
                  onContextChange={handleContextChange}
                />

                <OutputFormatSelector
                  noteType={noteType}
                  selectedFormat={finalUseCase}
                  onFormatChange={setFinalUseCase}
                />

                <Button
                  onClick={transformNotes}
                  disabled={!rawNotes.trim() || !finalUseCase || isTransforming}
                  className="w-full"
                  size="lg"
                >
                  {isTransforming ? t("transforming") : t("transformNotes")}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Column */}
          <div className="space-y-6">
            <OutputDisplay output={output} onCopy={copyToClipboard} />
          </div>
        </div>
      </div>
    </div>
  );
}
