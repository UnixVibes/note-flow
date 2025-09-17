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
  if (language === "th") {
    return `คุณเป็นผู้ช่วยแปลงโน้ตเอกสารมืออาชีพ ความเชี่ยวชาญของคุณรวมถึง:
- แปลงโน้ตดิบและไม่มีโครงสร้างให้เป็นเอกสารที่เป็นมืออาชีพและเรียบร้อย
- เข้าใจบริบทและความตั้งใจจากข้อความที่เป็นตัวย่อ
- รักษาความถูกต้องในขณะที่เพิ่มความชัดเจนและโครงสร้าง
- ปรับโทนและรูปแบบให้เหมาะสมกับบริบททางอาชีพที่แตกต่างกัน
- จัดระเบียบข้อมูลอย่างมีเหตุผลด้วยหัวข้อและส่วนที่เหมาะสม

ผลลัพธ์ของคุณควรจะ:
1. มีโครงสร้างที่ดีด้วยส่วนและหัวข้อที่ชัดเจน
2. มีโทนที่เป็นมืออาชีพแต่เข้าถึงได้
3. ครอบคลุมโดยไม่ใช้คำมากเกินไป
4. จัดรูปแบบโดยใช้ไวยากรณ์ markdown ที่เหมาะสม
5. ถูกต้องตามเนื้อหาต้นฉบับในขณะที่เพิ่มความสามารถในการอ่าน
6. ตอบกลับเป็นภาษาไทยเสมอ`;
  } else {
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

  if (currentLang === "th") {
    return `แปลงโน้ตดิบต่อไปนี้เป็นรูปแบบ ${finalUseCase} ที่เป็นมืออาชีพ

บริบท: ${contextString}

โน้ตดิบ:
${rawNotes}

ข้อกำหนด:
- ขยายตัวย่อทั้งหมดอย่างเป็นธรรมชาติ (เช่น ปร. → ประชุม, สก. → สัมภาษณ์, ฯลฯ)
- รักษาความหมายและเนื้อหาที่เป็นข้อเท็จจริงเดิม
- จัดโครงสร้างให้เหมาะสมกับรูปแบบ ${finalUseCase}
- ใช้ภาษาที่เป็นมืออาชีพในขณะที่รักษารายละเอียดสำคัญทั้งหมด
- รักษาโทนให้เหมาะสมกับกรณีการใช้งานที่ตั้งใจ
- รวมข้อมูลที่เกี่ยวข้องทั้งหมดจากโน้ตดิบ
- จัดรูปแบบโดยใช้ markdown ที่เหมาะสมด้วยหัวข้อ รายการ และการเน้นตามความเหมาะสม
- ตอบกลับเป็นภาษาไทย

สร้าง ${finalUseCase} ที่สมบูรณ์และเป็นมืออาชีพที่เหมาะสมสำหรับการใช้งานทันทีในสภาพแวดล้อมทางธุรกิจ`;
  } else {
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
