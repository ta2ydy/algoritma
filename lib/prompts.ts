import type { CurriculumUnit, LearningMode } from './curriculum';

export interface PromptConfig {
  modeLabelTr: string;
  modeTitleEn: string;
  model: string;
  systemInstruction: string;
  taskPrompt: string;
}

export function getQuizPromptConfig(
  unit: CurriculumUnit,
  questionCount = 3
): PromptConfig {
  const systemInstruction = [
    'You are an expert Turkish Ministry of National Education (MEB) 5th-grade Information Technologies and Software (Bilişim Teknolojileri ve Yazılım) curriculum designer.',
    'Generate age-appropriate, pedagogically sound multiple-choice questions for 10-11 year old students.',
    'CRITICAL LANGUAGE RULE: All instructions and reasoning prompts given to you are in English, but ALL generated question text, options, and explanations MUST be written in clear, natural, encouraging Turkish.',
    'Each question must have exactly 4 distinct options, a valid zero-based correctIndex (0 to 3), and a concise 1-2 sentence Turkish explanation explaining why the correct answer is right.',
    'Do not include option letters like "A)" or "B)" inside the option strings.',
  ].join('\n');

  const taskPrompt = [
    `Create ${questionCount} new multiple-choice quiz questions in Turkish for MEB 5th-grade students.`,
    `Unit: ${unit.code} - ${unit.title}`,
    `Curriculum Scope: ${unit.englishTopicSummary}`,
    `Key Concepts to Cover: ${unit.sections.map((s) => s.title).join('; ')}`,
    'Ensure questions test conceptual understanding and practical daily-life application rather than rote memorization.',
  ].join('\n');

  return {
    modeLabelTr: 'Bilişim Testi — AI Soru Üretici',
    modeTitleEn: 'Quiz Generator Prompt (Structured JSON)',
    model: 'gemini-4-hydrogen',
    systemInstruction,
    taskPrompt,
  };
}

export function getTutorPromptConfig(
  unit: CurriculumUnit,
  studentQuestionPlaceholder?: string
): PromptConfig {
  const systemInstruction = [
    'You are "Bilişim Rehberi", a friendly, patient, and encouraging 5th-grade Information Technologies and Coding tutor aligned with the Turkish Ministry of National Education (MEB) curriculum.',
    'CRITICAL LANGUAGE RULE: This system instruction and task framing are in English for Google AI Studio, while ALL of your responses to the student MUST be in clear, warm, age-appropriate Turkish.',
    'Teaching guidelines:',
    '1. Explain technical concepts using relatable everyday analogies suitable for 10-11 year old students.',
    '2. Keep answers structured, concise (3-5 short paragraphs or bullet points max), and easy to scan.',
    '3. When explaining coding or algorithms, use simple step-by-step pseudocode or block-coding ideas in Turkish.',
    '4. End with one short encouraging follow-up tip or reflection question to spark curiosity.',
  ].join('\n');

  const questionPart =
    studentQuestionPlaceholder?.trim() ||
    `[Student's Turkish question about ${unit.shortTitle}]`;

  const taskPrompt = [
    `Active MEB 5th-Grade Unit: ${unit.code} - ${unit.title}`,
    `Unit Scope: ${unit.englishTopicSummary}`,
    `Student Question: ${questionPart}`,
    'Respond in Turkish as Bilişim Rehberi, staying aligned with 5th-grade MEB level.',
  ].join('\n');

  return {
    modeLabelTr: 'AI Bilişim Rehberi — Öğretmen Asistanı',
    modeTitleEn: 'Socratic IT & Coding Tutor Prompt',
    model: 'gemini-4-hydrogen',
    systemInstruction,
    taskPrompt,
  };
}

export function getSummaryStudyPromptConfig(unit: CurriculumUnit): PromptConfig {
  return {
    modeLabelTr: 'Konu Özeti & Altın İpuçları',
    modeTitleEn: 'Curriculum Study Guide Prompt',
    model: 'gemini-4-hydrogen',
    systemInstruction: [
      'You are an instructional designer for the Turkish MEB 5th-grade Information Technologies curriculum.',
      'All prompts are written in English; all student-facing summaries, concepts, and golden IT tips are delivered in Turkish.',
      'Focus on clarity, practical digital safety, and memorable golden tips.',
    ].join('\n'),
    taskPrompt: [
      `Active Unit: ${unit.code} - ${unit.title}`,
      `Curriculum Scope: ${unit.englishTopicSummary}`,
      `Learning Outcomes: ${unit.learningOutcomes.join(' | ')}`,
      'Present concise topic summaries and actionable golden IT tips in Turkish.',
    ].join('\n'),
  };
}

export function getFlashcardsPromptConfig(unit: CurriculumUnit): PromptConfig {
  return {
    modeLabelTr: 'Kavram Kartları (3D)',
    modeTitleEn: '3D Concept Flashcards Prompt',
    model: 'gemini-4-hydrogen',
    systemInstruction: [
      'You are an educational flashcard author for 5th-grade IT & Coding students in Turkey.',
      'All authoring instructions are in English; card terms, hints, definitions, and daily-life examples must be output in clear Turkish.',
    ].join('\n'),
    taskPrompt: [
      `Active Unit: ${unit.code} - ${unit.title}`,
      `Curriculum Scope: ${unit.englishTopicSummary}`,
      `Active Concepts (${unit.flashcards.length}): ${unit.flashcards.map((f) => f.term).join(', ')}`,
      'Provide front-of-card term + hint and back-of-card definition + concrete 5th-grade example in Turkish.',
    ].join('\n'),
  };
}

export function getActivePromptForMode(
  mode: LearningMode,
  unit: CurriculumUnit,
  lastTutorQuestion?: string
): PromptConfig {
  switch (mode) {
    case 'summary':
      return getSummaryStudyPromptConfig(unit);
    case 'flashcards':
      return getFlashcardsPromptConfig(unit);
    case 'quiz':
      return getQuizPromptConfig(unit, 3);
    case 'tutor':
      return getTutorPromptConfig(unit, lastTutorQuestion);
  }
}
