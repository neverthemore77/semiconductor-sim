"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { materials } from "@/data/materials";

type FilterType = "All" | "Elemental Semiconductor" | "Compound Semiconductor";

export default function MaterialsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const filteredMaterials = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return materials.filter((material) => {
      const matchesType =
        filter === "All" || material.type === filter;

      const searchableText = [
        material.name,
        material.symbol,
        material.description,
        material.structure,
        material.crystalSystem,
        material.type,
        material.bandGapType,
        material.highlight,
        ...material.applications,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        keyword.length === 0 ||
        searchableText.includes(keyword);

      return matchesType && matchesSearch;
    });
  }, [search, filter]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            Semiconductor Sim
          </Link>

          <nav className="flex items-center gap-6 text-sm text-slate-400">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/simulator"
              className="transition hover:text-white"
            >
              Simulator
            </Link>

            <Link
              href="/compare"
              className="transition hover:text-white"
            >
              Compare
            </Link>

            <Link
              href="/materials"
              className="text-cyan-400"
            >
              Materials
            </Link>

            <Link
              href="/learn"
              className="transition hover:text-white"
            >
              Learn
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Material Database
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Semiconductor Materials
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-400 md:text-lg">
            주요 반도체 재료의 밴드갭, 이동도, 결정 구조,
            적용 분야를 비교하고 시뮬레이션으로 바로 연결할 수
            있습니다.
          </p>
        </div>
      </section>

      {/* Search / Filter */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-xl">
              <label
                htmlFor="material-search"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Search materials
              </label>

              <input
                id="material-search"
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="예: Si, GaN, Wurtzite, Power..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">
                Material type
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("All")}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    filter === "All"
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() =>
                    setFilter("Elemental Semiconductor")
                  }
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    filter === "Elemental Semiconductor"
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Elemental
                </button>

                <button
                  onClick={() =>
                    setFilter("Compound Semiconductor")
                  }
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    filter === "Compound Semiconductor"
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Compound
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Count */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-300">
              {filteredMaterials.length}
            </span>{" "}
            materials
          </p>
        </div>
      </section>

      {/* Material Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-5">
        {filteredMaterials.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <div className="text-3xl">🔎</div>

            <h2 className="mt-4 text-lg font-semibold">
              No materials found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              다른 재료명이나 키워드로 검색해보세요.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredMaterials.map((material) => (
              <article
                key={material.symbol}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-950/20"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl font-bold text-cyan-300">
                        {material.symbol}
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold">
                          {material.name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          {material.type}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      material.bandGapType === "Direct"
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-violet-400/10 text-violet-300"
                    }`}
                  >
                    {material.bandGapType} Band Gap
                  </span>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm leading-6 text-slate-400">
                  {material.description}
                </p>

                {/* Main values */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">
                      Band Gap
                    </p>

                    <p className="mt-2 text-xl font-semibold text-cyan-300">
                      {material.bandGap} eV
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">
                      Electron Mobility
                    </p>

                    <p className="mt-2 text-xl font-semibold text-cyan-300">
                      {material.electronMobility.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      cm²/V·s
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">
                      Crystal Structure
                    </p>

                    <p className="mt-2 text-sm font-semibold text-white">
                      {material.structure}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">
                      Dielectric Constant
                    </p>

                    <p className="mt-2 text-xl font-semibold text-cyan-300">
                      εᵣ {material.dielectricConstant}
                    </p>
                  </div>
                </div>

                {/* Highlight */}
                <div className="mt-5 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    Key characteristic
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {material.highlight}
                  </p>
                </div>

                {/* Applications */}
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Applications
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {material.applications.map(
                      (application) => (
                        <span
                          key={application}
                          className="rounded-full bg-slate-800 px-3 py-1.5 text-xs text-slate-300"
                        >
                          {application}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 border-t border-slate-800 pt-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={material.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 transition hover:text-cyan-400"
                    >
                      Source: {material.sourceName} ↗
                    </a>

                    <Link
                      href={`/simulator?material=${material.symbol}`}
                      className="rounded-xl bg-cyan-500 px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Simulate {material.symbol}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Scientific note */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl border border-amber-400/10 bg-amber-400/5 p-6">
          <div className="flex gap-4">
            <div className="text-xl">⚠️</div>

            <div>
              <h3 className="font-semibold text-amber-200">
                Scientific note
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                표시된 물성값은 대표적인 문헌값을 기반으로 한
                교육용 데이터입니다. 실제 밴드갭과 이동도는
                온도, 결정 구조, 도핑 농도, 결정 결함 및 측정
                조건 등에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}