import { NextRequest, NextResponse } from 'next/server';
import { ThinkingLevel } from '@google/genai';
import { getGeminiClient } from '@/lib/gemini';
import { CURRICULUM_UNITS } from '@/lib/curriculum';
import { getTutorPromptConfig } from '@/lib/prompts';

interface HistoryItem {
  role: 'user' | 'model';
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const unitId = Number(body?.unitId);
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const history = Array.isArray(body?.history)
      ? (body.history as HistoryItem[])
      : [];

    if (!message) {
      return NextResponse.json(
        { error: 'Lütfen sormak istediğin soruyu yaz.' },
        { status: 400 }
      );
    }

    const unit = CURRICULUM_UNITS.find((u) => u.id === unitId);
    if (!unit) {
      return NextResponse.json(
        { error: 'Geçersiz ünite seçimi.' },
        { status: 400 }
      );
    }

    const promptConfig = getTutorPromptConfig(unit, message);
    const ai = getGeminiClient();

    const formattedHistory = history
      .filter(
        (h) =>
          (h.role === 'user' || h.role === 'model') &&
          typeof h.text === 'string' &&
          h.text.trim().length > 0
      )
      .slice(-8)
      .map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      }));

    const chat = ai.chats.create({
      model: promptConfig.model,
      config: {
        systemInstruction: promptConfig.systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({
      message: promptConfig.taskPrompt,
    });

    const reply = (response.text ?? '').trim();
    if (!reply) {
      return NextResponse.json(
        { error: 'Rehber yanıt oluşturamadı. Lütfen soruyu tekrar gönder.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : 'AI Bilişim Rehberi ile iletişim kurulurken bir hata oluştu.';
    const status = message.includes('GEMINI_API_KEY') ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
