"use client";

import { useEffect, useState } from "react";

import CrystalViewer from "@/components/CrystalViewer";
import BandChart from "@/components/BandChart";
import IVChart from "@/components/IVChart";
import AIAnalysis from "@/components/AIAnalysis";
import { materials } from "@/data/materials";
import { calculateProperties } from "@/lib/simulation";

export default function SimulatorPage() {
  const [selectedMaterial, setSelectedMaterial] = useState(
    materials[0]
  );

  const [doping, setDoping] = useState("None");

  const [temperature, setTemperature] = useState(300);

  const [dopingConcentration, setDopingConcentration] =
    useState("");

  // Materials 페이지에서 넘어온 소재 자동 선택
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const materialSymbol = params.get("material");

    if (!materialSymbol) {
      return;
    }

    const material = materials.find(
      (item) => item.symbol === materialSymbol
    );

    if (material) {
      setSelectedMaterial(material);
    }
  }, []);

  // 물성 계산
  const properties = calculateProperties(
    selectedMaterial.symbol,
    doping,
    dopingConcentration,
    temperature
  );

  // Fermi Level 계산
  // 현재는 교육용 모델
  let fermiLevel = properties.bandGap * 0.5;

  const concentrationValue = Number(
    dopingConcentration
  );

  if (
    doping !== "None" &&
    Number.isFinite(concentrationValue) &&
    concentrationValue > 0
  ) {
    const logValue = Math.log10(
      concentrationValue
    );

    const strength = Math.max(
      0,
      Math.min(1, (logValue - 15) / 5)
    );

    if (doping === "n-type") {
      fermiLevel =
        properties.bandGap *
        (0.5 + 0.35 * strength);
    }

    if (doping === "p-type") {
      fermiLevel =
        properties.bandGap *
        (0.5 - 0.35 * strength);
    }
  }

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
              className="transition hover:text-white"
            >
              Home
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
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-8">

        {/* Title */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Simulation
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Semiconductor Material Simulator
          </h2>

          <p className="mt-2 text-slate-400">
            반도체 소재와 조건을 선택하여 물성을 분석해보세요.
          </p>

        </div>

        {/* ===================================
            TOP AREA
        =================================== */}

        <div className="grid gap-6 lg:grid-cols-12">

          {/* Controls */}

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-3">

            <h3 className="text-lg font-semibold">
              Simulation Controls
            </h3>

            {/* Material */}

            <div className="mt-6">

              <label className="text-sm text-slate-400">
                Material
              </label>

              <select
                value={selectedMaterial.symbol}
                onChange={(e) => {

                  const material = materials.find(
                    (item) =>
                      item.symbol === e.target.value
                  );

                  if (material) {
                    setSelectedMaterial(material);
                  }

                }}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-cyan-400"
              >

                {materials.map((material) => (

                  <option
                    key={material.symbol}
                    value={material.symbol}
                  >
                    {material.symbol} - {material.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Doping */}

            <div className="mt-6">

              <label className="text-sm text-slate-400">
                Doping Type
              </label>

              <select
                value={doping}
                onChange={(e) =>
                  setDoping(e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-cyan-400"
              >

                <option>None</option>
                <option>n-type</option>
                <option>p-type</option>

              </select>

            </div>

            {/* Doping Concentration */}

            <div className="mt-6">

              <label className="text-sm text-slate-400">
                Doping Concentration
              </label>

              <input
                type="text"
                value={dopingConcentration}
                onChange={(e) =>
                  setDopingConcentration(
                    e.target.value
                  )
                }
                placeholder="예: 1e16"
                disabled={doping === "None"}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              />

              <p className="mt-2 text-xs text-slate-500">
                단위: cm⁻³
              </p>

            </div>

            {/* Temperature */}

            <div className="mt-6">

              <div className="flex justify-between">

                <label className="text-sm text-slate-400">
                  Temperature
                </label>

                <span className="text-sm font-semibold text-cyan-400">
                  {temperature} K
                </span>

              </div>

              <input
                type="range"
                min="100"
                max="600"
                value={temperature}
                onChange={(e) =>
                  setTemperature(
                    Number(e.target.value)
                  )
                }
                className="mt-4 w-full"
              />

            </div>

          </section>

          {/* Crystal Viewer */}

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-6">

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-semibold">
                Crystal Structure
              </h3>

              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">
                {selectedMaterial.structure}
              </span>

            </div>

            <div className="mt-6 h-[460px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">

              <CrystalViewer
                material={selectedMaterial.symbol}
                doping={doping}
                concentration={dopingConcentration}
              />

            </div>

          </section>

          {/* Properties */}

          <section className="space-y-4 lg:col-span-3">

            <h3 className="text-lg font-semibold">
              Material Properties
            </h3>

            {/* Material */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Material
              </p>

              <p className="mt-2 text-2xl font-bold text-cyan-400">
                {selectedMaterial.symbol}
              </p>

            </div>

            {/* Band Gap */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Band Gap
              </p>

              <p className="mt-2 text-2xl font-bold">
                {properties.bandGap.toFixed(2)} eV
              </p>

            </div>

            {/* Fermi Level */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Fermi Level
              </p>

              <p className="mt-2 text-2xl font-bold text-yellow-400">
                {fermiLevel.toFixed(2)} eV
              </p>

              <p className="mt-1 text-xs text-slate-500">
                EF
              </p>

            </div>

            {/* Mobility */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Electron Mobility
              </p>

              <p className="mt-2 text-xl font-bold">
                {properties.mobility.toFixed(0)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                cm²/V·s
              </p>

            </div>

            {/* Carrier */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Carrier Concentration
              </p>

              <p className="mt-2 text-xl font-bold">
                {properties.carrierConcentration.toExponential(
                  2
                )}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                cm⁻³
              </p>

            </div>

            {/* Conductivity */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Conductivity
              </p>

              <p className="mt-2 text-xl font-bold">
                {properties.conductivity.toExponential(
                  2
                )}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                S/cm · educational model
              </p>

            </div>

            {/* Doping */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Doping
              </p>

              <p className="mt-2 text-xl font-bold">
                {doping}
              </p>

              {doping !== "None" && (
                <p className="mt-1 text-sm text-slate-500">
                  {dopingConcentration ||
                    "농도 미입력"}{" "}
                  cm⁻³
                </p>
              )}

            </div>

            {/* Temperature */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <p className="text-sm text-slate-500">
                Temperature
              </p>

              <p className="mt-2 text-xl font-bold">
                {temperature} K
              </p>

            </div>

          </section>
        </div>

        {/* ===================================
            GRAPHS
        =================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Band Structure */}

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-lg font-semibold">
              Band Structure
            </h3>

            <div className="mt-6 h-80 rounded-xl border border-slate-800 bg-slate-950 p-4">

              <BandChart
                material={selectedMaterial.symbol}
                bandGap={properties.bandGap}
                doping={doping}
                concentration={dopingConcentration}
              />

            </div>

          </section>

          {/* I-V */}

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-lg font-semibold">
              I-V Characteristics
            </h3>

            <div className="mt-6 h-80 rounded-xl border border-slate-800 bg-slate-950 p-4">

              <IVChart
                material={selectedMaterial.symbol}
                doping={doping}
                concentration={dopingConcentration}
              />

            </div>

          </section>

        </div>

        {/* ===================================
            AI ANALYSIS
        =================================== */}

        <AIAnalysis
          material={selectedMaterial.symbol}
          doping={doping}
          concentration={dopingConcentration}
          temperature={temperature}
          bandGap={properties.bandGap}
          fermiLevel={fermiLevel}
          mobility={properties.mobility}
          carrierConcentration={
            properties.carrierConcentration
          }
          conductivity={properties.conductivity}
        />

      </div>

    </main>
  );
}