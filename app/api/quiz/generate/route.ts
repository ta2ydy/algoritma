import { NextRequest, NextResponse } from 'next/server';
import { Type, ThinkingLevel } from '@google/genai';
import { getGeminiClient } from '@/lib/gemini';
import { CURRICULUM_UNITS, type QuizQuestion } from '@/lib/curriculum';
import { getQuizPromptConfig } from '@/lib/prompts';

interface RawGeneratedQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const unitId = Number(body?.unitId);
    const count = Math.min(Math.max(Number(body?.count) || 3, 1), 5);

    const unit = CURRICULUM_UNITS.find((u) => u.id === unitId);
    if (!unit) {
      return NextResponse.json(
        { error: 'Geçersiz ünite numarası gönderildi.' },
        { status: 400 }
      );
    }

    const promptConfig = getQuizPromptConfig(unit, count);
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: promptConfig.model,
      contents: promptConfig.taskPrompt,
      config: {
        systemInstruction: promptConfig.systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: 'Multiple choice question text in Turkish.',
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Exactly 4 distinct answer choices in Turkish.',
              },
              correctIndex: {
                type: Type.INTEGER,
                description: 'Zero-based index (0 to 3) of the correct option.',
              },
              explanation: {
                type: Type.STRING,
                description:
                  'Concise 1-2 sentence explanation in Turkish explaining why the answer is correct.',
              },
            },
            required: ['question', 'options', 'correctIndex', 'explanation'],
          },
        },
      },
    });

    const rawText = (response.text ?? '[]').trim();
    const parsed = JSON.parse(rawText) as RawGeneratedQuestion[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return NextResponse.json(
        { error: 'Yapay zekâ soru üretemedi. Lütfen tekrar deneyin.' },
        { status: 502 }
      );
    }

    const timestamp = Date.now();
    const questions: QuizQuestion[] = parsed
      .filter(
        (q) =>
          typeof q.question === 'string' &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          typeof q.correctIndex === 'number' &&
          q.correctIndex >= 0 &&
          q.correctIndex <= 3 &&
          typeof q.explanation === 'string'
      )
      .map((q, idx) => ({
        id: `ai-u${unit.id}-${timestamp}-${idx}`,
        question: q.question.trim(),
        options: q.options.map((opt) => opt.trim()),
        correctIndex: q.correctIndex,
        explanation: q.explanation.trim(),
        isAiGenerated: true,
      }));

    if (questions.length === 0) {
      return NextResponse.json(
        { error: 'Üretilen sorular beklenen biçimde değildi. Tekrar deneyin.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ questions });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : 'Soru üretilirken beklenmeyen bir hata oluştu.';
    const status = message.includes('GEMINI_API_KEY') ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
