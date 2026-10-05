"use client";

import Link from "next/link";
import { useState } from "react";

type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  keyPoint: string;
};

const lessons: Lesson[] = [
  {
    id: 1,
    title: "원자 결합",
    subtitle: "Atomic Bonding",
    description:
      "반도체 원자 사이의 결합과 전자 배치를 이해합니다.",
    content:
      "반도체에서는 원자들이 서로 결합하여 안정적인 구조를 형성합니다. 실리콘과 같은 물질에서는 공유 결합이 결정 구조와 전자 상태를 이해하는 데 중요한 출발점이 됩니다.",
    keyPoint:
      "원자 사이의 결합 방식은 전자 배치와 물질의 전기적 특성을 이해하는 기초가 됩니다.",
  },
  {
    id: 2,
    title: "결정 구조",
    subtitle: "Crystal Structure",
    description:
      "원자들이 규칙적으로 배열되는 결정 구조를 알아봅니다.",
    content:
      "반도체의 원자들은 무작위로 존재하는 것이 아니라 일정한 규칙에 따라 배열됩니다. 이러한 규칙적인 배열이 결정 구조이며, 재료에 따라 서로 다른 구조를 가질 수 있습니다.",
    keyPoint:
      "Si는 Diamond Cubic, GaN은 Wurtzite와 같은 대표적인 결정 구조를 가집니다.",
  },
  {
    id: 3,
    title: "Band Gap",
    subtitle: "Energy Band",
    description:
      "Valence Band와 Conduction Band 사이의 에너지 차이를 이해합니다.",
    content:
      "고체 내부에서는 전자의 에너지 상태가 밴드 형태로 나타납니다. 전자가 주로 존재하는 Valence Band와 전도에 기여할 수 있는 Conduction Band 사이의 에너지 차이를 Band Gap이라고 합니다.",
    keyPoint:
      "Band Gap은 반도체 재료의 전기적·광학적 특성을 이해하는 핵심 개념입니다.",
  },
  {
    id: 4,
    title: "도핑",
    subtitle: "Doping",
    description:
      "도핑을 이용하여 반도체의 전기적 특성을 조절하는 방법을 알아봅니다.",
    content:
      "순수한 반도체에 특정 불순물을 첨가하면 전자 또는 정공의 농도를 변화시킬 수 있습니다. 이를 도핑이라고 하며, n-type과 p-type 반도체를 만드는 기본적인 방법입니다.",
    keyPoint:
      "n-type에서는 전자가 주요 캐리어가 되고, p-type에서는 정공이 주요 캐리어가 됩니다.",
  },
];

const quizQuestions = [
  {
    question: "Si의 대표적인 결정 구조는 무엇인가요?",
    options: [
      "Diamond Cubic",
      "Wurtzite",
      "Body-Centered Cubic",
      "Face-Centered Cubic",
    ],
    answer: 0,
    explanation:
      "Si는 대표적으로 Diamond Cubic 구조를 갖는 원소 반도체입니다.",
  },
  {
    question: "Band Gap은 무엇을 의미하나요?",
    options: [
      "원자 사이의 거리",
      "Valence Band와 Conduction Band 사이의 에너지 차이",
      "도핑 원자의 개수",
      "전자의 질량",
    ],
    answer: 1,
    explanation:
      "Band Gap은 Valence Band와 Conduction Band 사이의 에너지 차이를 의미합니다.",
  },
  {
    question: "n-type 도핑에서 주요 캐리어는 무엇인가요?",
    options: ["정공", "중성 원자", "전자", "양성자"],
    answer: 2,
    explanation:
      "n-type 반도체에서는 전자가 주요 캐리어가 됩니다.",
  },
  {
    question: "p-type 도핑에서 주요 캐리어는 무엇인가요?",
    options: ["전자", "정공", "중성자", "광자"],
    answer: 1,
    explanation:
      "p-type 반도체에서는 정공이 주요 캐리어가 됩니다.",
  },
];

function Atom({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`h-8 w-8 rounded-full border border-cyan-300/30 bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.25)] ${className}`}
    />
  );
}

function BondVisual() {
  return (
    <div className="relative flex h-full min-h-[280px] items-center justify-center rounded-2xl bg-slate-950">
      <div className="relative h-48 w-64">
        <div className="absolute left-1/2 top-1/2 h-px w-44 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/50" />

        <Atom className="absolute left-2 top-1/2 -translate-y-1/2" />
        <Atom className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Atom className="absolute right-2 top-1/2 -translate-y-1/2" />

        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-xs text-slate-500">
          공유
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-slate-500">
          결합
        </div>
      </div>
    </div>
  );
}

function CrystalVisual() {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-slate-950 p-8">
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="flex h-10 w-10 items-center justify-center"
          >
            <div className="h-7 w-7 rounded-full border border-cyan-300/30 bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.2)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BandGapVisual() {
  return (
    <div className="relative min-h-[280px] rounded-2xl bg-slate-950 p-8">
      <div className="absolute left-8 right-8 top-16 h-3 rounded-full bg-slate-700" />

      <div className="absolute left-8 right-8 bottom-16 h-3 rounded-full bg-violet-400/60" />

      <p className="absolute right-8 top-10 text-xs font-semibold text-cyan-300">
        Conduction Band
      </p>

      <p className="absolute right-8 bottom-10 text-xs font-semibold text-violet-300">
        Valence Band
      </p>

      <div className="absolute left-1/2 top-20 bottom-24 -translate-x-1/2">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="h-28 border-l border-dashed border-cyan-400/50" />

          <span className="mt-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            Band Gap
          </span>
        </div>
      </div>
    </div>
  );
}

function DopingVisual() {
  return (
    <div className="grid min-h-[280px] gap-4 rounded-2xl bg-slate-950 p-6 md:grid-cols-2">
      <div className="rounded-xl border border-orange-400/20 bg-orange-400/5 p-5">
        <p className="text-sm font-semibold text-orange-300">
          n-type
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-full border border-slate-500 bg-slate-700" />
          <div className="text-2xl text-orange-300">e⁻</div>
          <div className="h-8 w-8 rounded-full bg-orange-400" />
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
          전자 농도를 증가시키는 방향의 도핑
        </p>
      </div>

      <div className="rounded-xl border border-pink-400/20 bg-pink-400/5 p-5">
        <p className="text-sm font-semibold text-pink-300">
          p-type
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-full border border-slate-500 bg-slate-700" />
          <div className="text-2xl text-pink-300">h⁺</div>
          <div className="h-8 w-8 rounded-full bg-pink-400" />
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
          정공 농도를 증가시키는 방향의 도핑
        </p>
      </div>
    </div>
  );
}

function LessonVisual({ lessonId }: { lessonId: number }) {
  if (lessonId === 1) {
    return <BondVisual />;
  }

  if (lessonId === 2) {
    return <CrystalVisual />;
  }

  if (lessonId === 3) {
    return <BandGapVisual />;
  }

  return <DopingVisual />;
}

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] =
    useState<Lesson>(lessons[0]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [score, setScore] = useState(0);

  const [quizFinished, setQuizFinished] =
    useState(false);

  const question = quizQuestions[currentQuestion];

  function handleLessonChange(lesson: Lesson) {
    setSelectedLesson(lesson);
  }

  function handleAnswer(index: number) {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);

    if (index === question.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  }

  const progress =
    ((selectedLesson.id - 1) /
      (lessons.length - 1)) *
    100;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold"
          >
            Semiconductor Sim
          </Link>

          <nav className="flex gap-5 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link
              href="/simulator"
              className="hover:text-white"
            >
              Simulator
            </Link>

            <Link
              href="/compare"
              className="hover:text-white"
            >
              Compare
            </Link>

            <Link
              href="/materials"
              className="hover:text-white"
            >
              Materials
            </Link>

            <Link
              href="/learn"
              className="text-cyan-400"
            >
              Learn
            </Link>
          </nav>
        </div>
      </header>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Learn
        </p>

        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          Semiconductor Fundamentals
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          반도체의 핵심 개념을 학습하고, 직접 시뮬레이션과
          퀴즈를 통해 이해도를 확인해보세요.
        </p>
      </section>

      {/* Progress */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-300">
              Learning Progress
            </p>

            <p className="text-sm text-cyan-400">
              {selectedLesson.id} / {lessons.length}
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() =>
                handleLessonChange(lesson)
              }
              className={`rounded-2xl border p-5 text-left transition ${
                selectedLesson.id === lesson.id
                  ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-950/20"
                  : "border-slate-800 bg-slate-900 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-cyan-400">
                  {lesson.id}
                </span>

                {selectedLesson.id ===
                  lesson.id && (
                  <span className="text-xs text-cyan-400">
                    CURRENT
                  </span>
                )}
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {lesson.title}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {lesson.subtitle}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {lesson.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Lesson detail */}
      <section className="mx-auto max-w-7xl px-6 pt-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div>
            <p className="text-sm font-semibold text-cyan-400">
              Lesson {selectedLesson.id}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {selectedLesson.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedLesson.subtitle}
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold">
                핵심 개념
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {selectedLesson.content}
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Key Point
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedLesson.keyPoint}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/simulator"
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Open Simulator
                </Link>

                <Link
                  href="/materials"
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Browse Materials
                </Link>
              </div>
            </div>

            {/* Visual */}
            <LessonVisual
              lessonId={selectedLesson.id}
            />
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <div className="rounded-2xl border border-cyan-400/20 bg-slate-900 p-6 md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-400">
                Quiz
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Test Your Knowledge
              </h2>
            </div>

            {!quizFinished && (
              <p className="text-sm text-slate-500">
                Question {currentQuestion + 1} /{" "}
                {quizQuestions.length}
              </p>
            )}
          </div>

          {quizFinished ? (
            <div className="mt-8 text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5">
                <span className="text-4xl font-bold text-cyan-400">
                  {score}
                  <span className="text-xl text-slate-500">
                    /{quizQuestions.length}
                  </span>
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Quiz Complete
              </h3>

              <p className="mt-2 text-slate-400">
                총 {quizQuestions.length}문제 중{" "}
                {score}문제를 맞혔습니다.
              </p>

              <button
                onClick={restartQuiz}
                className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <h3 className="text-lg font-semibold leading-7">
                  {question.question}
                </h3>

                <div className="mt-6 grid gap-3">
                  {question.options.map(
                    (option, index) => {
                      const isSelected =
                        selectedAnswer === index;

                      const isCorrect =
                        selectedAnswer !== null &&
                        index === question.answer;

                      let className =
                        "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600";

                      if (isCorrect) {
                        className =
                          "border-emerald-400/40 bg-emerald-400/10 text-emerald-300";
                      } else if (
                        isSelected &&
                        !isCorrect
                      ) {
                        className =
                          "border-red-400/40 bg-red-400/10 text-red-300";
                      }

                      return (
                        <button
                          key={option}
                          onClick={() =>
                            handleAnswer(index)
                          }
                          disabled={
                            selectedAnswer !== null
                          }
                          className={`rounded-xl border p-4 text-left text-sm transition ${className}`}
                        >
                          <span className="mr-3 font-semibold">
                            {String.fromCharCode(
                              65 + index
                            )}
                            .
                          </span>

                          {option}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {selectedAnswer !== null && (
                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p
                    className={`text-sm font-semibold ${
                      selectedAnswer ===
                      question.answer
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                  >
                    {selectedAnswer ===
                    question.answer
                      ? "정답입니다!"
                      : "아쉽지만 오답입니다."}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {question.explanation}
                  </p>
                </div>
              )}

              {selectedAnswer !== null && (
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={nextQuestion}
                    className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                  >
                    {currentQuestion <
                    quizQuestions.length - 1
                      ? "Next Question"
                      : "Finish Quiz"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}