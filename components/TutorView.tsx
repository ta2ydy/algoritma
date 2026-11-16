'use client';

import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import {
  AlertCircle,
  Bot,
  Loader2,
  MessageSquarePlus,
  Send,
  Trash2,
  User,
} from 'lucide-react';
import type { CurriculumUnit } from '@/lib/curriculum';

export interface TutorChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface TutorViewProps {
  unit: CurriculumUnit;
  messages: TutorChatMessage[];
  onMessagesChange: (unitId: number, messages: TutorChatMessage[]) => void;
  onLastQuestionChange: (question: string) => void;
  onOpenPromptInspector: () => void;
}

let messageSequence = 0;
function createMessageId(prefix: 'user' | 'model'): string {
  messageSequence += 1;
  return `${prefix}-${messageSequence}`;
}

export default function TutorView({
  unit,
  messages,
  onMessagesChange,
  onLastQuestionChange,
  onOpenPromptInspector,
}: TutorViewProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  const sendMessage = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage(null);
    onLastQuestionChange(trimmed);

    const userMsg: TutorChatMessage = {
      id: createMessageId('user'),
      role: 'user',
      text: trimmed,
    };

    const updatedHistory = [...messages, userMsg];
    onMessagesChange(unit.id, updatedHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: unit.id,
          message: trimmed,
          history: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.error || 'Rehber şu anda yanıt veremedi. Tekrar deneyin.'
        );
      }

      const aiMsg: TutorChatMessage = {
        id: createMessageId('model'),
        role: 'model',
        text: data.reply,
      };

      onMessagesChange(unit.id, [...updatedHistory, aiMsg]);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Bağlantı sırasında bir hata oluştu.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleClear = () => {
    onMessagesChange(unit.id, []);
    setErrorMessage(null);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
      <aside className="space-y-5 lg:col-span-4">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">
                AI Bilişim Rehberi
              </h2>
              <p className="text-xs text-slate-500">
                {unit.code} · {unit.shortTitle}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Takıldığın donanım, internet güvenliği veya algoritma konularını sor; sana 5. sınıf düzeyinde günlük hayattan örneklerle adım adım açıklayayım.
          </p>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>İngilizce Sistem Promptu</span>
              <button
                type="button"
                onClick={onOpenPromptInspector}
                className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600"
              >
                Promptu İncele
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-display text-sm font-semibold text-slate-900">
            Örnek Başlangıç Soruları
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Tek tıkla sorarak sohbeti başlatabilirsin.
          </p>

          <div className="mt-4 space-y-2.5">
            {unit.tutorStarters.map((starter, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => void sendMessage(starter)}
                className="flex min-h-[44px] w-full items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-left text-xs font-medium leading-relaxed text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50/50 hover:text-slate-900 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-sky-600"
              >
                <MessageSquarePlus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" />
                <span>{starter}</span>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <section className="flex h-[560px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-8">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div className="min-w-0">
            <span className="text-xs font-medium text-slate-500">
              Aktif Ünite Bağlamı
            </span>
            <h3 className="truncate font-display text-base font-semibold text-slate-900">
              {unit.code}: {unit.title}
            </h3>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Sohbeti Temizle</span>
            </button>
          )}
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Bot className="h-6 w-6" />
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold text-slate-900">
                Merhaba! Ben Bilişim Rehberin.
              </h4>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">
                {unit.shortTitle} ünitesiyle ilgili aklına takılan her şeyi aşağıya yazabilir ya da soldaki hazır sorulardan birini seçebilirsin.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div className="prose prose-sm prose-slate max-w-none prose-p:my-1.5 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-slate-900 prose-code:rounded prose-code:bg-slate-200/70 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-xs">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <Bot className="h-4 w-4" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin text-sky-600" />
                <span>Bilişim Rehberi yanıt hazırlıyor...</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div ref={scrollEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-200 bg-slate-50/70 px-4 py-3.5 sm:px-6"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder={`${unit.shortTitle} hakkında bir soru sor...`}
              aria-label="Bilişim Rehberine soru sor"
              className="min-h-[44px] flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <Send className="h-4 w-4" />
              <span>Gönder</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
