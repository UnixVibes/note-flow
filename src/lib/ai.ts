import { generateText, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { NoteContext, NoteType } from "./data";
import i18n from "./i18n";

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

function getSystemPrompt(language: string): string {
  const isEnglish = language === "en";

  if (isEnglish) {
    return `You are a professional note transformation assistant. Your expertise includes:
- Converting raw, unstructured notes into polished, professional documents
- Understanding context and intent from abbreviated text
- Maintaining accuracy while enhancing clarity and structure
- Adapting tone and format for different professional contexts
- Organizing information logically with proper headings and sections

Your output should be:
1. Well-structured with clear sections and headings
2. Professional yet accessible in tone
3. Comprehensive without being verbose
4. Formatted using proper markdown syntax
5. Accurate to the original content while enhancing readability
6. Always respond in English language`;
  } else {
    return `شما یک دستیار حرفه‌ای تبدیل یادداشت هستید. تخصص‌های شما شامل:
- تبدیل یادداشت‌های خام و غیرساختارمند به اسناد حرفه‌ای و منظم
- درک زمینه و هدف از متن‌های مخفف
- حفظ دقت در عین بهبود وضوح و ساختار
- تطبیق لحن و فرمت برای زمینه‌های حرفه‌ای مختلف
- سازماندهی منطقی اطلاعات با عناوین و بخش‌های مناسب

خروجی شما باید:
1. ساختار مناسب با بخش‌ها و عناوین واضح داشته باشد
2. لحن حرفه‌ای و در عین حال قابل فهم باشد
3. جامع بدون پرگویی باشد
4. با استفاده از syntax مناسب markdown فرمت شود
5. دقیق نسبت به محتوای اصلی و در عین حال خوانایی را بهبود دهد
6. همیشه به زبان فارسی پاسخ دهید`;
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
    .filter(([_, value]) => value) // Only include non-empty values
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const currentLang = i18n.language || "en";
  const isEnglish = currentLang === "en";

  if (isEnglish) {
    return `Transform the following raw notes into a professional ${finalUseCase} format.

Context: ${contextString}

Raw Notes:
${rawNotes}

Requirements:
- Expand all abbreviations naturally (q → questions, w/ → with, exp → experience, etc.)
- Maintain the original meaning and factual content
- Structure appropriately for ${finalUseCase} format
- Use professional language while preserving all key details
- Keep the tone appropriate for the intended use case
- Include all relevant information from the raw notes
- Format using proper markdown with headers, lists, and emphasis where appropriate
- Respond in English language

Generate a complete, professional ${finalUseCase} that would be suitable for immediate use in a business setting.`;
  } else {
    return `یادداشت‌های خام زیر را به فرمت حرفه‌ای ${finalUseCase} تبدیل کنید.

زمینه: ${contextString}

یادداشت‌های خام:
${rawNotes}

الزامات:
- تمام مخفف‌ها را به طور طبیعی کامل کنید
- معنا و محتوای واقعی اصلی را حفظ کنید
- ساختار مناسب برای فرمت ${finalUseCase} ایجاد کنید
- از زبان حرفه‌ای استفاده کنید و تمام جزئیات کلیدی را حفظ کنید
- لحن را متناسب با موردکاربرد در نظر بگیرید
- تمام اطلاعات مرتبط از یادداشت‌های خام را شامل کنید
- با استفاده از markdown مناسب با عناوین، فهرست‌ها و تأکیدات فرمت کنید
- به زبان فارسی پاسخ دهید

یک ${finalUseCase} کامل و حرفه‌ای تولید کنید که برای استفاده فوری در محیط کاری مناسب باشد.`;
  }
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

    const currentLang = i18n.language || "en";
    const systemPrompt = getSystemPrompt(currentLang);

    const { text } = await generateText({
      model: google(settings.model),
      system: systemPrompt,
      prompt,
      temperature: 0.7, // Balanced creativity and consistency
      topK: 40, // Good diversity without randomness
      maxOutputTokens: 2048, // Reasonable length for professional documents
    });

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      "Failed to get AI response. Please check your API key and try again.",
    );
  }
}

export async function getAIStreamResponse(
  prompt: string,
  onUpdate: (text: string) => void,
): Promise<void> {
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

    const currentLang = i18n.language || "en";
    const systemPrompt = getSystemPrompt(currentLang);

    const result = streamText({
      model: google(settings.model),
      system: systemPrompt,
      prompt,
      temperature: 0.7, // Balanced creativity and consistency
      topK: 40, // Good diversity without randomness
      maxOutputTokens: 2048, // Reasonable length for professional documents
    });

    let fullText = "";
    for await (const textPart of result.textStream) {
      fullText += textPart;
      onUpdate(fullText);
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      "Failed to get AI response. Please check your API key and try again.",
    );
  }
}
