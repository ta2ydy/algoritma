'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  BookOpen,
  Bot,
  CheckSquare,
  Code2,
  Layers,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CURRICULUM_UNITS,
  type LearningMode,
} from '@/lib/curriculum';
import SummaryView from './SummaryView';
import FlashcardsView from './FlashcardsView';
import QuizView from './QuizView';
import TutorView, { type TutorChatMessage } from './TutorView';
import PromptInspectorModal from './PromptInspectorModal';

interface ProgressState {
  learnedCards: string[];
  completedOutcomes: string[];
  quizScores: Record<number, { correct: number; total: number }>;
}

const STORAGE_KEY = 'bilisim-lab-5-progress-v1';
const STORAGE_EVENT = 'bilisim-lab-5-progress-change';

const DEFAULT_PROGRESS: ProgressState = {
  learnedCards: [],
  completedOutcomes: [],
  quizScores: {},
};

let cachedRawProgress: string | null = null;
let cachedParsedProgress: ProgressState = DEFAULT_PROGRESS;

function subscribeProgress(callback: () => void) {
  const handleChange = () => callback();
  window.addEventListener('storage', handleChange);
  window.addEventListener(STORAGE_EVENT, handleChange);
  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
}

function getProgressSnapshot(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRawProgress) {
      return cachedParsedProgress;
    }
    cachedRawProgress = raw;
    if (!raw) {
      cachedParsedProgress = DEFAULT_PROGRESS;
      return cachedParsedProgress;
    }
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    cachedParsedProgress = {
      learnedCards: Array.isArray(parsed.learnedCards)
        ? parsed.learnedCards
        : [],
      completedOutcomes: Array.isArray(parsed.completedOutcomes)
        ? parsed.completedOutcomes
        : [],
      quizScores:
        parsed.quizScores && typeof parsed.quizScores === 'object'
          ? parsed.quizScores
          : {},
    };
    return cachedParsedProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function getServerProgressSnapshot(): ProgressState {
  return DEFAULT_PROGRESS;
}

const NAV_MODES: Array<{
  id: LearningMode;
  label: string;
  icon: typeof BookOpen;
}> = [
  { id: 'summary', label: 'Konu Özeti', icon: BookOpen },
  { id: 'flashcards', label: 'Kavram Kartları', icon: Layers },
  { id: 'quiz', label: 'Bilişim Testi', icon: CheckSquare },
  { id: 'tutor', label: 'AI Rehberi', icon: Bot },
];

export default function BilisimWorkspace() {
  const [activeUnitId, setActiveUnitId] = useState<number>(1);
  const [activeMode, setActiveMode] = useState<LearningMode>('summary');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [lastTutorQuestion, setLastTutorQuestion] = useState<string>('');
  const [tutorMessagesByUnit, setTutorMessagesByUnit] = useState<
    Record<number, TutorChatMessage[]>
  >({});

  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgressSnapshot
  );

  const persistProgress = (next: ProgressState) => {
    try {
      const raw = JSON.stringify(next);
      cachedRawProgress = raw;
      cachedParsedProgress = next;
      window.localStorage.setItem(STORAGE_KEY, raw);
      window.dispatchEvent(new Event(STORAGE_EVENT));
    } catch {
      // Ignore storage write errors
    }
  };

  const activeUnit =
    CURRICULUM_UNITS.find((u) => u.id === activeUnitId) ?? CURRICULUM_UNITS[0];

  const handleToggleOutcome = (outcome: string) => {
    const exists = progress.completedOutcomes.includes(outcome);
    const completedOutcomes = exists
      ? progress.completedOutcomes.filter((o) => o !== outcome)
      : [...progress.completedOutcomes, outcome];
    persistProgress({ ...progress, completedOutcomes });
  };

  const handleToggleLearnedCard = (cardId: string) => {
    const exists = progress.learnedCards.includes(cardId);
    const learnedCards = exists
      ? progress.learnedCards.filter((id) => id !== cardId)
      : [...progress.learnedCards, cardId];
    persistProgress({ ...progress, learnedCards });
  };

  const handleScoreUpdate = (unitId: number, correct: number, total: number) => {
    persistProgress({
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [unitId]: { correct, total },
      },
    });
  };

  const handleTutorMessagesChange = (
    unitId: number,
    nextMessages: TutorChatMessage[]
  ) => {
    setTutorMessagesByUnit((prev) => ({
      ...prev,
      [unitId]: nextMessages,
    }));
  };

  const unitLearnedCards = activeUnit.flashcards.filter((c) =>
    progress.learnedCards.includes(c.id)
  ).length;
  const unitCompletedOutcomes = activeUnit.learningOutcomes.filter((o) =>
    progress.completedOutcomes.includes(o)
  ).length;
  const unitQuizScore = progress.quizScores[activeUnit.id];

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Zone 1: Single-element wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Bilişim Lab 5
          </a>

          {/* Zone 2: 4 concise single-line text nav links */}
          <nav
            aria-label="Öğrenme modları"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {NAV_MODES.map((mode) => {
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveMode(mode.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isActive
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[15px] h-0.5 bg-sky-600"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsPromptModalOpen(true)}
              className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>AI Studio Prompt</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Curriculum Unit Hero & Switcher */}
        <section className="border-b border-slate-200 pb-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span>MEB 5. Sınıf Bilişim Teknolojileri ve Yazılım</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {activeUnit.code} / 5
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {unitLearnedCards}/{activeUnit.flashcards.length} Kavram
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {unitCompletedOutcomes}/{activeUnit.learningOutcomes.length} Kazanım
            </span>
            {unitQuizScore && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-sky-700 tabular-nums">
                  Test: {unitQuizScore.correct}/{unitQuizScore.total}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-2.5 max-w-3xl text-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {activeUnit.code}: {activeUnit.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600">
            {activeUnit.description}
          </p>

          {/* 5 Official MEB Units Switcher */}
          <div
            className="mt-6 flex items-center gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="MEB 5. Sınıf Üniteleri"
          >
            {CURRICULUM_UNITS.map((unit) => {
              const isSelected = unit.id === activeUnit.id;
              return (
                <button
                  key={unit.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveUnitId(unit.id)}
                  className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isSelected ? 'text-sky-100' : 'text-slate-400'
                    }`}
                  >
                    {unit.id}.
                  </span>
                  <span>{unit.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Mode Switcher (for < md screens) */}
          <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
            {NAV_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveMode(mode.id)}
                  className={`inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active Learning Mode Stage */}
        <div className="pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeUnit.id}-${activeMode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeMode === 'summary' && (
                <SummaryView
                  unit={activeUnit}
                  completedOutcomes={progress.completedOutcomes}
                  onToggleOutcome={handleToggleOutcome}
                  onNavigateMode={setActiveMode}
                />
              )}

              {activeMode === 'flashcards' && (
                <FlashcardsView
                  unit={activeUnit}
                  learnedCardIds={progress.learnedCards}
                  onToggleLearned={handleToggleLearnedCard}
                />
              )}

              {activeMode === 'quiz' && (
                <QuizView
                  unit={activeUnit}
                  onScoreUpdate={handleScoreUpdate}
                  onOpenPromptInspector={() => setIsPromptModalOpen(true)}
                />
              )}

              {activeMode === 'tutor' && (
                <TutorView
                  unit={activeUnit}
                  messages={tutorMessagesByUnit[activeUnit.id] ?? []}
                  onMessagesChange={handleTutorMessagesChange}
                  onLastQuestionChange={setLastTutorQuestion}
                  onOpenPromptInspector={() => setIsPromptModalOpen(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-8">
          <span>
            Bilişim Lab 5 · MEB 5. Sınıf Bilişim Teknolojileri ve Yazılım Öğrenme Atölyesi
          </span>
          <button
            type="button"
            onClick={() => setIsPromptModalOpen(true)}
            className="font-medium text-slate-600 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
          >
            Aktif İngilizce AI Studio Promptunu Görüntüle
          </button>
        </div>
      </footer>

      <PromptInspectorModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        activeUnit={activeUnit}
        activeMode={activeMode}
        lastTutorQuestion={lastTutorQuestion}
      />
    </div>
  );
}
