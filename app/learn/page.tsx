"use client";

import { useState } from "react";

const lessons = [
  {
    id: 1,
    title: "원자 결합",
    subtitle: "Atomic Bonding",
    description:
      "반도체의 특성을 이해하기 위한 가장 기본적인 개념입니다.",
    content:
      "반도체 내부의 원자들은 서로 결합하여 안정적인 결정 구조를 형성합니다. 특히 공유 결합은 실리콘과 같은 반도체에서 중요한 역할을 합니다.",
    keyPoint:
      "원자 간 결합 방식은 전자의 배치와 물질의 전기적 특성에 영향을 줍니다.",
  },
  {
    id: 2,
    title: "결정 구조",
    subtitle: "Crystal Structure",
    description:
      "원자들이 규칙적으로 배열된 구조를 알아봅니다.",
    content:
      "반도체 원자들은 일정한 규칙에 따라 배열됩니다. 이러한 배열을 결정 구조라고 합니다.",
    keyPoint:
      "Si는 Diamond Cubic, GaN은 Wurtzite와 같은 결정 구조를 가질 수 있습니다.",
  },
  {
    id: 3,
    title: "Band Gap",
    subtitle: "Energy Band",
    description:
      "반도체의 전기적 특성을 결정하는 중요한 에너지 개념입니다.",
    content:
      "Valence Band와 Conduction Band 사이의 에너지 차이를 Band Gap이라고 합니다.",
    keyPoint:
      "Band Gap의 크기는 물질의 전기적·광학적 특성과 관련됩니다.",
  },
  {
    id: 4,
    title: "도핑",
    subtitle: "Doping",
    description:
      "반도체의 전기적 특성을 조절하는 방법을 알아봅니다.",
    content:
      "순수한 반도체에 특정 불순물을 첨가하여 전자 또는 정공의 농도를 변화시키는 과정을 도핑이라고 합니다.",
    keyPoint:
      "n-type은 전자, p-type은 정공의 농도를 증가시키는 방향으로 설명할 수 있습니다.",
  },
];

const quizQuestions = [
  {
    question:
      "Si의 대표적인 결정 구조는 무엇인가요?",
    options: [
      "Diamond Cubic",
      "Wurtzite",
      "Hexagonal",
      "Bcc",
    ],
    answer: 0,
    explanation:
      "Si는 Diamond Cubic 구조를 갖는 대표적인 원소 반도체입니다.",
  },
  {
    question:
      "Band Gap은 무엇을 의미하나요?",
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
    question:
      "n-type 도핑에서 증가하는 주요 캐리어는 무엇인가요?",
    options: [
      "정공",
      "중성 원자",
      "전자",
      "양성자",
    ],
    answer: 2,
    explanation:
      "n-type 반도체에서는 전자가 주요 캐리어가 됩니다.",
  },
  {
    question:
      "p-type 도핑에서 주요 캐리어는 무엇인가요?",
    options: [
      "전자",
      "정공",
      "중성자",
      "광자",
    ],
    answer: 1,
    explanation:
      "p-type 반도체에서는 정공이 주요 캐리어가 됩니다.",
  },
];

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] =
    useState(lessons[0]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [score, setScore] = useState(0);

  const [quizFinished, setQuizFinished] =
    useState(false);

  const question =
    quizQuestions[currentQuestion];

  function handleAnswer(index: number) {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (
      currentQuestion <
      quizQuestions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );

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

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <h1 className="text-xl font-bold">
            ⚛ Semiconductor Simulator
          </h1>

          <a
            href="/"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Home
          </a>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-10">

        {/* Title */}

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Learn
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Semiconductor Fundamentals
        </h2>

        <p className="mt-3 text-slate-400">
          반도체의 핵심 개념을 배우고 퀴즈로 확인해보세요.
        </p>

        {/* Lessons */}

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() =>
                setSelectedLesson(lesson)
              }
              className={`rounded-2xl border p-5 text-left transition ${
                selectedLesson.id === lesson.id
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-slate-800 bg-slate-900 hover:border-slate-600"
              }`}
            >

              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-cyan-400">
                {lesson.id}
              </span>

              <h3 className="mt-5 text-lg font-semibold">
                {lesson.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {lesson.subtitle}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {lesson.description}
              </p>

            </button>
          ))}

        </div>

        {/* Lesson Content */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <p className="text-sm font-semibold text-cyan-400">
            Lesson {selectedLesson.id}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {selectedLesson.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {selectedLesson.subtitle}
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">

            <div>

              <h4 className="font-semibold">
                핵심 개념
              </h4>

              <p className="mt-2 text-sm leading-7 text-slate-400">
                {selectedLesson.content}
              </p>

              <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">

                <p className="text-sm font-semibold text-cyan-400">
                  Key Point
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  {selectedLesson.keyPoint}
                </p>

              </div>

            </div>

            <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-950">

              <div className="text-center">

                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-cyan-400/30">

                  <span className="text-4xl font-bold text-cyan-400">
                    {selectedLesson.id}
                  </span>

                </div>

                <p className="mt-5 font-semibold">
                  {selectedLesson.subtitle}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Quiz */}

        <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-900 p-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-cyan-400">
                Quiz
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                Test Your Knowledge
              </h3>

            </div>

            {!quizFinished && (
              <span className="text-sm text-slate-500">
                {currentQuestion + 1} /{" "}
                {quizQuestions.length}
              </span>
            )}

          </div>

          {quizFinished ? (

            <div className="mt-8 text-center">

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/30">

                <span className="text-3xl font-bold text-cyan-400">
                  {score}
                  <span className="text-lg text-slate-500">
                    /{quizQuestions.length}
                  </span>
                </span>

              </div>

              <h4 className="mt-6 text-2xl font-bold">
                Quiz Complete
              </h4>

              <p className="mt-2 text-slate-400">
                총 {quizQuestions.length}문제 중{" "}
                {score}문제를 맞혔습니다.
              </p>

              <button
                onClick={restartQuiz}
                className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
              >
                다시 풀기
              </button>

            </div>

          ) : (

            <div className="mt-8">

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">

                <p className="text-lg font-semibold leading-8">
                  {question.question}
                </p>

              </div>

              <div className="mt-4 space-y-3">

                {question.options.map(
                  (option, index) => {

                    const isSelected =
                      selectedAnswer === index;

                    const isCorrect =
                      index === question.answer;

                    let buttonStyle =
                      "border-slate-800 bg-slate-950 hover:border-slate-600";

                    if (
                      selectedAnswer !== null &&
                      isCorrect
                    ) {
                      buttonStyle =
                        "border-emerald-400 bg-emerald-400/10";
                    }

                    if (
                      isSelected &&
                      !isCorrect
                    ) {
                      buttonStyle =
                        "border-red-400 bg-red-400/10";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() =>
                          handleAnswer(index)
                        }
                        className={`w-full rounded-xl border p-4 text-left text-sm transition ${buttonStyle}`}
                      >
                        {index + 1}. {option}
                      </button>
                    );
                  }
                )}

              </div>

              {selectedAnswer !== null && (

                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">

                  <p className="font-semibold">
                    {selectedAnswer ===
                    question.answer
                      ? "✅ 정답입니다!"
                      : "❌ 아쉽습니다."}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {question.explanation}
                  </p>

                </div>

              )}

              {selectedAnswer !== null && (

                <div className="mt-5 text-right">

                  <button
                    onClick={nextQuestion}
                    className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
                  >
                    {currentQuestion ===
                    quizQuestions.length - 1
                      ? "결과 보기"
                      : "다음 문제 →"}
                  </button>

                </div>

              )}

            </div>

          )}

        </section>

        {/* Simulator CTA */}

        <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 text-center">

          <h3 className="text-xl font-semibold">
            배운 내용을 직접 시뮬레이션해보세요
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            소재와 도핑 조건을 바꿔가며 실제 변화를 확인할 수 있습니다.
          </p>

          <a
            href="/simulator"
            className="mt-5 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Simulator 시작하기 →
          </a>

        </section>

      </div>

    </main>
  );
}