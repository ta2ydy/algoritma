'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Shuffle,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { CurriculumUnit, FlashcardItem } from '@/lib/curriculum';

interface FlashcardsViewProps {
  unit: CurriculumUnit;
  learnedCardIds: string[];
  onToggleLearned: (cardId: string) => void;
}

export default function FlashcardsView({
  unit,
  learnedCardIds,
  onToggleLearned,
}: FlashcardsViewProps) {
  const [cards, setCards] = useState<FlashcardItem[]>(unit.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      } else if (e.code === 'ArrowLeft') {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length]);

  const currentCard = cards[currentIndex] ?? cards[0];
  if (!currentCard) return null;

  const isLearned = learnedCardIds.includes(currentCard.id);
  const learnedCount = unit.flashcards.filter((c) =>
    learnedCardIds.includes(c.id)
  ).length;

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            3D Kavram Kartları
          </h2>
          <p className="mt-0.5 text-sm text-slate-600">
            Karta tıkla veya Boşluk tuşuna basarak tanımı ve günlük hayat örneğini gör.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span className="font-mono text-xs font-medium tabular-nums">
            Öğrenilen: {learnedCount} / {unit.flashcards.length}
          </span>
          <button
            type="button"
            onClick={handleShuffle}
            className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <Shuffle className="h-3.5 w-3.5 text-slate-500" />
            <span>Kartları Karıştır</span>
          </button>
        </div>
      </div>

      <div className="perspective-1200">
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          aria-pressed={isFlipped}
          aria-label={`${currentCard.term} kavram kartını çevir`}
          className="group relative block h-[340px] w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 sm:h-[360px]"
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="preserve-3d relative h-full w-full"
          >
            {/* Front Face */}
            <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition-colors group-hover:border-sky-300 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="font-mono tabular-nums">
                    Kart {String(currentIndex + 1).padStart(2, '0')} /{' '}
                    {String(cards.length).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{unit.shortTitle}</span>
                </div>

                {isLearned && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Öğrenildi</span>
                  </span>
                )}
              </div>

              <div className="my-auto py-4 text-center">
                <span className="text-xs font-medium text-sky-700">
                  Kavram · Ön Yüz
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {currentCard.term}
                </h3>
                <p className="mt-3 text-sm text-slate-500">
                  İpucu: {currentCard.hint}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                <RotateCw className="h-3.5 w-3.5 text-sky-600" />
                <span>Tanımı görmek için tıkla</span>
              </div>
            </div>

            {/* Back Face */}
            <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-2xl border border-sky-200 bg-slate-900 p-7 text-white shadow-xs sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <span className="font-mono tabular-nums">
                    {currentCard.term}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Tanım & Örnek</span>
                </div>

                {isLearned && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Öğrenildi</span>
                  </span>
                )}
              </div>

              <div className="my-auto space-y-5">
                <div>
                  <span className="text-xs font-medium text-sky-400">
                    Açıklama
                  </span>
                  <p className="mt-1.5 text-lg font-medium leading-relaxed text-slate-50 sm:text-xl">
                    {currentCard.definition}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4">
                  <span className="text-xs font-medium text-amber-400">
                    Günlük Hayat Örneği
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    {currentCard.example}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                <RotateCw className="h-3.5 w-3.5 text-sky-400" />
                <span>Ön yüze dönmek için tıkla</span>
              </div>
            </div>
          </motion.div>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Önceki</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <span>Sonraki</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5" aria-label="Kart seçimi">
          {cards.map((card, idx) => {
            const active = idx === currentIndex;
            const learned = learnedCardIds.includes(card.id);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentIndex(idx);
                }}
                aria-label={`${idx + 1}. kart: ${card.term}`}
                className={`h-9 min-w-[36px] rounded-md px-2 font-mono text-xs font-medium tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                  active
                    ? 'bg-sky-600 text-white'
                    : learned
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onToggleLearned(currentCard.id)}
          className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
            isLearned
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{isLearned ? 'Öğrenildi İşaretli' : 'Öğrendim Olarak İşaretle'}</span>
        </button>
      </div>
    </div>
  );
}
