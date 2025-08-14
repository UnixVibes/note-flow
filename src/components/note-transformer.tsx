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
  const [output, setOutput] =
    useState(`**Candidate Evaluation - Senior Frontend Developer Position**

**Candidate Name:** John Smith
**Interview Date:** [Insert Date]
**Interview Type:** Technical
**Interview Duration:** 45 minutes
**Interviewer:** [Insert Interviewer Name]

**I. Technical Skills:**

* **React Experience:** Possesses strong React experience, totaling four years.  Demonstrated proficiency through discussion and a practical coding challenge.
* **Frameworks & Libraries:**  Experienced with TypeScript and Next.js.
* **State Management:**  Familiar with Redux and the Context API, indicating a broad understanding of state management approaches.
* **Coding Challenge:** Successfully completed a coding challenge involving the development of a to-do application.  The application exhibited a well-structured and organized codebase.

**II. Soft Skills & Communication:**

* **Communication:** Communicates effectively and articulately.
* **Problem-Solving:**  Asks thoughtful and insightful questions, demonstrating a proactive approach to problem-solving.
* **Teamwork:** Presents as a collaborative team member.

**III. Areas for Development:**

* **Backend Experience:**  Limited experience with backend technologies. This warrants further investigation depending on the specific requirements of the role.

**IV. Other Relevant Information:**

* **Salary Expectations:** $120,000 - $130,000
* **Notice Period:** Two weeks.

**V. Overall Assessment:**

John Smith demonstrates strong frontend development skills and possesses a positive and collaborative demeanor. His proficiency in React, TypeScript, and Next.js, coupled with his ability to effectively complete a technical challenge, makes him a strong candidate.  However, his limited backend experience should be considered in relation to the specific needs of the role.  Further assessment of his backend capabilities may be beneficial.


**VI. Recommendation:**

[Select one and provide justification]

* **Strong Recommendation:**  John Smith's skills and experience strongly align with the requirements of the Senior Frontend Developer position.
* **Conditional Recommendation:**  John Smith is a strong candidate, but further assessment of his backend skills is recommended before a final decision.
* **No Recommendation:** [Only select if the candidate is not suitable, and provide clear justification]


**Interviewer Signature:** _________________________
**Date:** _________________________`);
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
                  {t("context")}
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
