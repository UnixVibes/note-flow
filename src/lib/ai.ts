import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { NoteContext, NoteType } from "./data";

export interface GeminiSettings {
  model: string;
  apiKey: string;
}

export const GEMINI_MODELS = [
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-pro",
];

const STORAGE_KEY = "gemini-settings";

export function getGeminiSettings(): GeminiSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading Gemini settings:", error);
  }

  return {
    model: "gemini-1.5-flash",
    apiKey: "",
  };
}

export function saveGeminiSettings(settings: GeminiSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving Gemini settings:", error);
  }
}

export function getTransformationPrompt(
  noteType: NoteType,
  context: NoteContext,
  finalUseCase: string,
  rawNotes: string,
): string {
  const currentContext = context[noteType];
  const contextString = Object.entries(currentContext)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  return `Transform the following raw notes into a professional ${finalUseCase} format.

Context: ${contextString}

Raw Notes:
${rawNotes}

Instructions:
- Expand abbreviations naturally (q → questions, w/ → with, exp → experience, etc.)
- Maintain the original meaning and content
- Structure appropriately for ${finalUseCase}
- Use professional language while preserving key details
- Keep the tone appropriate for the intended use case

Format the output as a ${finalUseCase} would appear in a professional setting.`;
}

export async function getAIResponse(prompt: string): Promise<string> {
  const settings = getGeminiSettings();

  if (!settings.apiKey) {
    throw new Error(
      "Google API key is required. Please configure your Gemini settings.",
    );
  }

  try {
    const google = createGoogleGenerativeAI({
      apiKey: settings.apiKey,
    });

    const { text } = await generateText({
      model: google(settings.model),
      prompt,
    });

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      "Failed to get AI response. Please check your API key and try again.",
    );
  }
}
