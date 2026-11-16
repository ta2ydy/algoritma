'use client';

import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Lightbulb,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { CurriculumUnit, LearningMode } from '@/lib/curriculum';

interface SummaryViewProps {
  unit: CurriculumUnit;
  completedOutcomes: string[];
  onToggleOutcome: (outcome: string) => void;
  onNavigateMode: (mode: LearningMode) => void;
}

export default function SummaryView({
  unit,
  completedOutcomes,
  onToggleOutcome,
  onNavigateMode,
}: SummaryViewProps) {
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number>(0);

  const activeSection = unit.sections[selectedSectionIdx] ?? unit.sections[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
      <div className="space-y-6 lg:col-span-8">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-medium text-slate-500">
                Ünite Konu Başlıkları · {unit.sections.length} Bölüm
              </span>
              <h2 className="mt-1 font-display text-xl font-semibold text-slate-900">
                Konu Özeti
              </h2>
            </div>

            <div
              className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1"
              role="tablist"
              aria-label="Konu bölümleri"
            >
              {unit.sections.map((section, idx) => {
                const isSelected = idx === selectedSectionIdx;
                return (
                  <button
                    key={section.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedSectionIdx(idx)}
                    className={`min-h-[36px] whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="font-mono tabular-nums">0{idx + 1}.</span>{' '}
                    {section.title.split(' ').slice(0, 2).join(' ')}
                  </button>
                );
              })}
            </div>
          </div>

          {activeSection && (
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="pt-5"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-sky-700">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span className="font-mono tabular-nums">
                  Bölüm 0{selectedSectionIdx + 1} / 0{unit.sections.length}
                </span>
              </div>

              <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">
                {activeSection.title}
              </h3>

              <p className="mt-2.5 max-w-[70ch] text-base leading-relaxed text-slate-600">
                {activeSection.summary}
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h4 className="text-sm font-semibold text-slate-900">
                  Temel Kavramlar ve Noktalar
                </h4>
                <ul className="mt-3 space-y-3">
                  {activeSection.keyPoints.map((point, pIdx) => {
                    const colonIdx = point.indexOf(':');
                    const hasLabel = colonIdx > 0 && colonIdx < 42;
                    const label = hasLabel ? point.slice(0, colonIdx) : null;
                    const body = hasLabel ? point.slice(colonIdx + 1).trim() : point;

                    return (
                      <li
                        key={pIdx}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                      >
                        <span className="mt-0.5 font-mono text-xs font-medium text-sky-600 tabular-nums">
                          {String(pIdx + 1).padStart(2, '0')}
                        </span>
                        <span>
                          {label && (
                            <strong className="font-semibold text-slate-900">
                              {label}:{' '}
                            </strong>
                          )}
                          {body}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Ünite Kazanım Kontrol Listesi
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Öğrendiğin kazanımları işaretleyerek çalışma ilerlemeni takip et.
              </p>
            </div>
            <span className="font-mono text-xs font-medium text-slate-600 tabular-nums">
              {completedOutcomes.length} / {unit.learningOutcomes.length} Tamamlandı
            </span>
          </div>

          <ul className="mt-4 divide-y divide-slate-100">
            {unit.learningOutcomes.map((outcome) => {
              const checked = completedOutcomes.includes(outcome);
              return (
                <li key={outcome} className="py-2.5 first:pt-1 last:pb-0">
                  <button
                    type="button"
                    onClick={() => onToggleOutcome(outcome)}
                    className="flex min-h-[40px] w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
                  >
                    {checked ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-slate-300" />
                    )}
                    <span
                      className={`text-sm leading-relaxed ${
                        checked
                          ? 'text-slate-500 line-through'
                          : 'font-medium text-slate-800'
                      }`}
                    >
                      {outcome}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <aside className="space-y-6 lg:col-span-4">
        <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Altın Bilişim İpuçları
              </h3>
              <p className="text-xs text-amber-900/70">
                Sınavda ve günlük kullanımda hayat kurtaran notlar
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y divide-amber-200/70">
            {unit.goldenTips.map((item, idx) => (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-semibold text-amber-700 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h4>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-display text-base font-semibold text-slate-900">
            Sıradaki Adım
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Konu özetini tamamladıysan 3D kavram kartlarıyla bilgilerini pekiştirebilir veya test çözebilirsin.
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateMode('flashcards')}
              className="inline-flex min-h-[42px] w-full items-center justify-between whitespace-nowrap rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <span>Kavram Kartlarına Geç</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateMode('quiz')}
              className="inline-flex min-h-[42px] w-full items-center justify-between whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <span>Bilişim Testini Başlat</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}
