'use client';

import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Loader2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { CurriculumUnit, QuizQuestion } from '@/lib/curriculum';

interface QuizViewProps {
  unit: CurriculumUnit;
  onScoreUpdate: (unitId: number, correct: number, total: number) => void;
  onOpenPromptInspector: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizView({
  unit,
  onScoreUpdate,
  onOpenPromptInspector,
}: QuizViewProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(unit.quiz);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.reduce((acc, q) => {
    return answers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    if (answers[currentQuestion.id] !== undefined) return;

    const nextAnswers = { ...answers, [currentQuestion.id]: optionIndex };
    setAnswers(nextAnswers);

    const nextCorrect = questions.reduce((acc, q) => {
      return nextAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);
    onScoreUpdate(unit.id, nextCorrect, questions.length);
  };

  const handleGenerateAiQuestions = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId: unit.id, count: 3 }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.error || 'Yeni sorular üretilirken bir hata oluştu.'
        );
      }

      const generated = (data?.questions || []) as QuizQuestion[];
      if (generated.length === 0) {
        throw new Error('Modelden geçerli soru alınamadı.');
      }

      const firstNewIndex = questions.length;
      setQuestions((prev) => [...prev, ...generated]);
      setCurrentIdx(firstNewIndex);
      setShowSummary(false);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'AI soru üretimi sırasında bir hata oluştu.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setQuestions(unit.quiz);
    setAnswers({});
    setCurrentIdx(0);
    setShowSummary(false);
    setErrorMessage(null);
  };

  if (!currentQuestion) return null;

  const selectedOption = answers[currentQuestion.id];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = isAnswered && selectedOption === currentQuestion.correctIndex;
  const accuracy =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            Bilişim Testi
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-mono tabular-nums">
              Soru {currentIdx + 1} / {questions.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              Doğru: {correctCount} / {answeredCount}
            </span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenPromptInspector}
              className="underline decoration-slate-300 underline-offset-2 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              İngilizce Promptu İncele
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Testi Sıfırla</span>
          </button>

          <button
            type="button"
            onClick={handleGenerateAiQuestions}
            disabled={isGenerating}
            className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Sorular Hazırlanıyor...</span>
              </>
            ) : (
              <>
                <Cpu className="h-3.5 w-3.5" />
                <span>AI ile 3 Yeni Soru Üret</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm text-rose-900"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
          <div className="flex-1">
            <p className="font-medium">Soru üretilemedi</p>
            <p className="mt-0.5 text-xs text-rose-800">{errorMessage}</p>
          </div>
        </div>
      )}

      {showSummary ? (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-slate-200 bg-white p-8 text-center"
        >
          <span className="text-xs font-medium text-sky-700">
            {unit.code} Değerlendirme Sonucu
          </span>
          <h3 className="mt-2 font-display text-3xl font-bold text-slate-900 tabular-nums">
            {correctCount} / {questions.length} Doğru (%{accuracy})
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
            {accuracy >= 80
              ? 'Harika iş çıkardın! Bu ünitenin temel bilişim kavramlarına çok iyi hâkimsin.'
              : accuracy >= 50
                ? 'Güzel ilerleme! Yanlış yaptığın soruların açıklamalarını inceleyerek bilgilerini pekiştirebilirsin.'
                : 'Konu Özeti ve Kavram Kartları bölümlerini tekrar gözden geçirip testi yeniden çözebilirsin.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowSummary(false)}
              className="min-h-[42px] whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              Soruları Gözden Geçir
            </button>
            <button
              type="button"
              onClick={handleGenerateAiQuestions}
              disabled={isGenerating}
              className="inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <Cpu className="h-4 w-4" />
              <span>AI ile 3 Yeni Soru Daha Üret</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[42px] whitespace-nowrap shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              Baştan Başla
            </button>
          </div>
        </motion.section>
      ) : (
        <motion.section
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-slate-700 tabular-nums">
                Soru {String(currentIdx + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{unit.shortTitle}</span>
              {currentQuestion.isAiGenerated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-sky-700">
                    Gemini AI Sorusu
                  </span>
                </>
              )}
            </div>
            <span className="font-mono tabular-nums">
              {answeredCount} / {questions.length} Cevaplandı
            </span>
          </div>

          <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
            {currentQuestion.question}
          </h3>

          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelectedOption = selectedOption === idx;
              const isCorrectOption = currentQuestion.correctIndex === idx;

              let stateClasses =
                'border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-slate-50';
              if (isAnswered) {
                if (isCorrectOption) {
                  stateClasses =
                    'border-emerald-300 bg-emerald-50 text-emerald-950';
                } else if (isSelectedOption && !isCorrectOption) {
                  stateClasses = 'border-rose-300 bg-rose-50 text-rose-950';
                } else {
                  stateClasses =
                    'border-slate-200 bg-slate-50/50 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex min-h-[50px] w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 disabled:cursor-default ${stateClasses}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold ${
                        isAnswered && isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : isAnswered && isSelectedOption && !isCorrectOption
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span className="text-sm font-medium leading-relaxed sm:text-base">
                      {option}
                    </span>
                  </div>

                  {isAnswered && isCorrectOption && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Doğru</span>
                    </span>
                  )}
                  {isAnswered && isSelectedOption && !isCorrectOption && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-rose-700">
                      <XCircle className="h-4 w-4" />
                      <span className="hidden sm:inline">Yanlış</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16 }}
              className={`mt-6 rounded-xl border p-4 ${
                isCorrect
                  ? 'border-emerald-200 bg-emerald-50/80 text-emerald-950'
                  : 'border-amber-200 bg-amber-50/80 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Doğru Cevap! Tebrikler</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-600" />
                    <span>
                      Doğru Seçenek: {OPTION_LETTERS[currentQuestion.correctIndex]}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              className="inline-flex min-h-[42px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Önceki Soru</span>
            </button>

            <div className="flex flex-wrap items-center gap-1.5">
              {questions.map((q, idx) => {
                const active = idx === currentIdx;
                const qAns = answers[q.id];
                const qRight = qAns !== undefined && qAns === q.correctIndex;
                const qWrong = qAns !== undefined && qAns !== q.correctIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    aria-label={`${idx + 1}. soruya git`}
                    className={`h-8 min-w-[32px] rounded-md px-2 font-mono text-xs font-medium tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                      active
                        ? 'bg-slate-900 text-white'
                        : qRight
                          ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                          : qWrong
                            ? 'border border-rose-200 bg-rose-50 text-rose-700'
                            : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))
                }
                className="inline-flex min-h-[42px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-sky-600"
              >
                <span>Sonraki Soru</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSummary(true)}
                className="inline-flex min-h-[42px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-sky-600"
              >
                <span>Sonucu Gör</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.section>
      )}
    </div>
  );
}
