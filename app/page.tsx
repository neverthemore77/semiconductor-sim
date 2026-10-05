"use client";

import { materials } from "@/data/materials";

const features = [
  {
    title: "Simulator",
    description:
      "소재, 도핑, 온도를 설정하고 반도체 물성을 시뮬레이션합니다.",
    href: "/simulator",
    icon: "◈",
  },
  {
    title: "Compare",
    description:
      "Si, Ge, GaN, SiC의 핵심 물성을 한눈에 비교합니다.",
    href: "/compare",
    icon: "⇄",
  },
  {
    title: "Materials",
    description:
      "주요 반도체 소재의 결정 구조와 대표 물성을 확인합니다.",
    href: "/materials",
    icon: "◎",
  },
  {
    title: "Learn",
    description:
      "원자 결합부터 Band Gap과 도핑까지 단계별로 학습합니다.",
    href: "/learn",
    icon: "?",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* =========================
          HEADER
      ========================= */}

      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <a
            href="/"
            className="text-xl font-bold"
          >
            ⚛ Semiconductor Simulator
          </a>

          <nav className="hidden gap-7 text-sm text-slate-400 md:flex">

            <a
              href="/"
              className="transition hover:text-white"
            >
              Home
            </a>

            <a
              href="/simulator"
              className="transition hover:text-white"
            >
              Simulator
            </a>

            <a
              href="/compare"
              className="transition hover:text-white"
            >
              Compare
            </a>

            <a
              href="/materials"
              className="transition hover:text-white"
            >
              Materials
            </a>

            <a
              href="/learn"
              className="transition hover:text-white"
            >
              Learn
            </a>

          </nav>

        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}

      <section className="mx-auto max-w-7xl px-8 py-20">

        <div className="max-w-4xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            AI-Based Semiconductor Simulation
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">

            원자 구조부터
            <br />

            <span className="text-cyan-400">
              반도체 물성
            </span>
            까지

          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            반도체 소재의 결정 구조와 도핑 조건을 설정하고
            Band Gap, Fermi Level, Carrier Concentration,
            Conductivity 등의 변화를 직관적으로 분석할 수 있습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="/simulator"
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              시뮬레이션 시작하기 →
            </a>

            <a
              href="/learn"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              먼저 학습하기
            </a>

          </div>

        </div>

      </section>

      {/* =========================
          FEATURES
      ========================= */}

      <section className="mx-auto max-w-7xl px-8 pb-20">

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (

            <a
              key={feature.title}
              href={feature.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400/50"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-xl font-bold text-cyan-400">
                {feature.icon}
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>

              <p className="mt-5 text-sm font-semibold text-cyan-400">
                Open →
              </p>

            </a>

          ))}

        </div>

      </section>

      {/* =========================
          MATERIALS
      ========================= */}

      <section className="border-y border-slate-800 bg-slate-900/40">

        <div className="mx-auto max-w-7xl px-8 py-16">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Featured Materials
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Semiconductor Materials
              </h2>

              <p className="mt-2 text-slate-400">
                대표적인 반도체 소재를 빠르게 확인해보세요.
              </p>

            </div>

            <a
              href="/materials"
              className="text-sm font-semibold text-cyan-400"
            >
              모든 소재 보기 →
            </a>

          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {materials.map((material) => (

              <a
                key={material.symbol}
                href={`/simulator?material=${material.symbol}`}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-400/50"
              >

                <p className="text-4xl font-bold text-cyan-400">
                  {material.symbol}
                </p>

                <h3 className="mt-4 font-semibold">
                  {material.name}
                </h3>

                <div className="mt-5 space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Band Gap
                    </span>

                    <span>
                      {material.bandGap} eV
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Mobility
                    </span>

                    <span>
                      {material.mobility.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Structure
                    </span>

                    <span className="text-right">
                      {material.structure}
                    </span>
                  </div>

                </div>

                <p className="mt-5 text-sm font-semibold text-cyan-400">
                  Simulator에서 분석 →
                </p>

              </a>

            ))}

          </div>

        </div>

      </section>

      {/* =========================
          WORKFLOW
      ========================= */}

      <section className="mx-auto max-w-7xl px-8 py-20">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            How It Works
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            시뮬레이션 과정
          </h2>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">

          {[
            {
              number: "01",
              title: "Material",
              description: "분석할 반도체 소재를 선택합니다.",
            },
            {
              number: "02",
              title: "Condition",
              description: "도핑과 농도, 온도를 설정합니다.",
            },
            {
              number: "03",
              title: "Simulation",
              description: "3D 구조와 물성 변화를 확인합니다.",
            },
            {
              number: "04",
              title: "Analysis",
              description: "그래프와 AI Analysis로 결과를 해석합니다.",
            },
          ].map((step) => (

            <div
              key={step.number}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >

              <p className="text-sm font-bold text-cyan-400">
                {step.number}
              </p>

              <h3 className="mt-4 text-lg font-semibold">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* =========================
          CTA
      ========================= */}

      <section className="border-t border-slate-800 bg-cyan-400/5">

        <div className="mx-auto max-w-4xl px-8 py-20 text-center">

          <h2 className="text-3xl font-bold">
            직접 반도체를 분석해보세요.
          </h2>

          <p className="mt-4 text-slate-400">
            소재와 도핑 조건을 바꾸면서 3D 구조와 전기적 특성의
            변화를 확인할 수 있습니다.
          </p>

          <a
            href="/simulator"
            className="mt-7 inline-block rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Simulator 시작하기 →
          </a>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-600">
        Semiconductor Materials Simulation WebApp
      </footer>

    </main>
  );
}