"use client";

import { useState } from "react";
import { materials } from "@/data/materials";

export default function ComparePage() {
  const [selected, setSelected] = useState([
    "Si",
    "Ge",
    "GaN",
    "SiC",
  ]);

  function toggleMaterial(symbol: string) {
    setSelected((current) => {
      if (current.includes(symbol)) {
        return current.filter(
          (item) => item !== symbol
        );
      }

      return [...current, symbol];
    });
  }

  const selectedMaterials = materials.filter(
    (material) =>
      selected.includes(material.symbol)
  );

  const highestBandGap = [...selectedMaterials].sort(
    (a, b) => b.bandGap - a.bandGap
  )[0];

  const highestMobility = [...selectedMaterials].sort(
    (a, b) => b.mobility - a.mobility
  )[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <h1 className="text-xl font-bold">
            ⚛ Semiconductor Simulator
          </h1>

          <div className="flex gap-6 text-sm text-slate-400">
            <a
              href="/"
              className="hover:text-white"
            >
              Home
            </a>

            <a
              href="/simulator"
              className="hover:text-white"
            >
              Simulator
            </a>

            <a
              href="/materials"
              className="hover:text-white"
            >
              Materials
            </a>

            <a
              href="/learn"
              className="hover:text-white"
            >
              Learn
            </a>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-10">

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Compare
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Material Comparison
        </h2>

        <p className="mt-3 text-slate-400">
          여러 반도체 소재의 핵심 물성을 한눈에 비교해보세요.
        </p>

        {/* Material selection */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h3 className="text-lg font-semibold">
            Select Materials
          </h3>

          <div className="mt-5 flex flex-wrap gap-3">

            {materials.map((material) => (

              <button
                key={material.symbol}
                onClick={() =>
                  toggleMaterial(material.symbol)
                }
                className={`rounded-xl border px-5 py-3 font-semibold transition ${
                  selected.includes(material.symbol)
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                    : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500"
                }`}
              >
                {material.symbol}
              </button>

            ))}

          </div>

        </section>

        {/* Comparison table */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          {selectedMaterials.length === 0 ? (

            <div className="p-10 text-center text-slate-500">
              비교할 소재를 하나 이상 선택하세요.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px] text-left">

                <thead className="border-b border-slate-800 bg-slate-950">

                  <tr>

                    <th className="px-6 py-5 text-sm text-slate-500">
                      Property
                    </th>

                    {selectedMaterials.map(
                      (material) => (
                        <th
                          key={material.symbol}
                          className="px-6 py-5 text-center"
                        >

                          <span className="text-xl font-bold text-cyan-400">
                            {material.symbol}
                          </span>

                          <p className="mt-1 text-xs font-normal text-slate-500">
                            {material.name}
                          </p>

                        </th>
                      )
                    )}

                  </tr>

                </thead>

                <tbody>

                  {/* Band Gap */}

                  <tr className="border-b border-slate-800">

                    <td className="px-6 py-5 text-slate-400">
                      Band Gap
                    </td>

                    {selectedMaterials.map(
                      (material) => (
                        <td
                          key={material.symbol}
                          className="px-6 py-5 text-center text-lg font-semibold"
                        >
                          {material.bandGap.toFixed(2)}

                          <span className="ml-1 text-sm text-slate-500">
                            eV
                          </span>
                        </td>
                      )
                    )}

                  </tr>

                  {/* Mobility */}

                  <tr className="border-b border-slate-800">

                    <td className="px-6 py-5 text-slate-400">
                      Electron Mobility
                    </td>

                    {selectedMaterials.map(
                      (material) => (
                        <td
                          key={material.symbol}
                          className="px-6 py-5 text-center font-semibold"
                        >
                          {material.mobility.toLocaleString()}

                          <span className="ml-1 text-xs text-slate-500">
                            cm²/V·s
                          </span>
                        </td>
                      )
                    )}

                  </tr>

                  {/* Structure */}

                  <tr className="border-b border-slate-800">

                    <td className="px-6 py-5 text-slate-400">
                      Crystal Structure
                    </td>

                    {selectedMaterials.map(
                      (material) => (
                        <td
                          key={material.symbol}
                          className="px-6 py-5 text-center"
                        >
                          {material.structure}
                        </td>
                      )
                    )}

                  </tr>

                  {/* Type */}

                  <tr>

                    <td className="px-6 py-5 text-slate-400">
                      Material Type
                    </td>

                    {selectedMaterials.map(
                      (material) => (
                        <td
                          key={material.symbol}
                          className="px-6 py-5 text-center"
                        >
                          {material.type}
                        </td>
                      )
                    )}

                  </tr>

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* Insight */}

        {selectedMaterials.length > 0 && (
          <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-900 p-6">

            <h3 className="text-lg font-semibold">
              Quick Insight
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-300">

              <p>
                • 가장 높은 Band Gap:{" "}
                <span className="font-semibold text-cyan-400">
                  {highestBandGap.symbol}
                </span>
                {" "}
                ({highestBandGap.bandGap} eV)
              </p>

              <p>
                • 가장 높은 Electron Mobility:{" "}
                <span className="font-semibold text-cyan-400">
                  {highestMobility.symbol}
                </span>
                {" "}
                ({highestMobility.mobility.toLocaleString()} cm²/V·s)
              </p>

              <p>
                • 선택한 소재의 결정 구조와 물성을 비교한 결과입니다.
              </p>

            </div>

          </section>
        )}

        {/* CTA */}

        <div className="mt-8 text-center">

          <a
            href="/simulator"
            className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Simulator에서 자세히 분석하기 →
          </a>

        </div>

      </div>

    </main>
  );
}