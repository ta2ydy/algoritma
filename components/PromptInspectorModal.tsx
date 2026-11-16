'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Terminal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { CurriculumUnit, LearningMode } from '@/lib/curriculum';
import { getActivePromptForMode } from '@/lib/prompts';

interface PromptInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUnit: CurriculumUnit;
  activeMode: LearningMode;
  lastTutorQuestion?: string;
}

const MODE_OPTIONS: Array<{ id: LearningMode; label: string }> = [
  { id: 'quiz', label: 'Bilişim Testi' },
  { id: 'tutor', label: 'AI Bilişim Rehberi' },
  { id: 'summary', label: 'Konu Özeti' },
  { id: 'flashcards', label: 'Kavram Kartları' },
];

function PromptInspectorDialog({
  onClose,
  activeUnit,
  activeMode,
  lastTutorQuestion,
}: Omit<PromptInspectorModalProps, 'isOpen'>) {
  const [inspectedMode, setInspectedMode] = useState<LearningMode>(activeMode);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const promptConfig = getActivePromptForMode(
    inspectedMode,
    activeUnit,
    lastTutorQuestion
  );

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(null);
    }
  };

  const fullPromptText = `Model: ${promptConfig.model}\n\n[systemInstruction]\n${promptConfig.systemInstruction}\n\n[Task Prompt]\n${promptConfig.taskPrompt}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Terminal className="h-3.5 w-3.5 text-sky-600" />
              <span>Google AI Studio Prompt Müfettişi</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{promptConfig.model}</span>
            </div>
            <h2
              id="prompt-modal-title"
              className="mt-1 font-display text-xl font-semibold tracking-tight text-slate-900"
            >
              {activeUnit.code}: {activeUnit.shortTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Sistem talimatları ve görev promptları İngilizce çalışır; öğrenci çıktıları Türkçe üretilir.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Prompt penceresini kapat"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {MODE_OPTIONS.map((opt) => {
              const isActive = inspectedMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setInspectedMode(opt.id)}
                  className={`min-h-[36px] whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span>systemInstruction (English)</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span className="font-normal text-slate-500">
                  {promptConfig.modeTitleEn}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopy('system', promptConfig.systemInstruction)
                }
                className="inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
              >
                {copiedKey === 'system' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
              {promptConfig.systemInstruction}
            </pre>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-700">
                Task Prompt (English)
              </span>
              <button
                type="button"
                onClick={() => handleCopy('task', promptConfig.taskPrompt)}
                className="inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
              >
                {copiedKey === 'task' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-800">
              {promptConfig.taskPrompt}
            </pre>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <span className="text-xs text-slate-500">
            Aktif Mod: {promptConfig.modeLabelTr}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleCopy('full', fullPromptText)}
              className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              {copiedKey === 'full' ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tüm Prompt Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Tüm Promptu Kopyala</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              Kapat
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PromptInspectorModal({
  isOpen,
  ...props
}: PromptInspectorModalProps) {
  return (
    <AnimatePresence>
      {isOpen && <PromptInspectorDialog {...props} />}
    </AnimatePresence>
  );
}
