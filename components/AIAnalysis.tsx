"use client";

import { useState } from "react";

type AIAnalysisProps = {
  material: string;
  doping: string;
  concentration: string;
  temperature: number;
  bandGap: number;
  fermiLevel: number;
  mobility: number;
  carrierConcentration: number;
  conductivity: number;
};

export default function AIAnalysis({
  material,
  doping,
  concentration,
  temperature,
  bandGap,
  fermiLevel,
  mobility,
  carrierConcentration,
  conductivity,
}: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runAnalysis() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          material,
          doping,
          concentration,
          temperature,
          bandGap,
          fermiLevel,
          mobility,
          carrierConcentration,
          conductivity,
        }),
      });

      // 먼저 일반 텍스트로 응답을 받습니다.
      // JSON이 아닌 응답이 와도 정확한 오류를 보여주기 위함입니다.
      const raw = await response.text();

      let data: {
        analysis?: string;
        error?: string;
      };

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          `서버가 JSON 응답을 보내지 않았습니다. 상태 코드: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || "AI 분석에 실패했습니다."
        );
      }

      setAnalysis(data.analysis || "");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "AI 분석에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">
            ✨
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              AI Analysis
            </h3>

            <p className="text-xs text-slate-500">
              Simulation result interpretation
            </p>
          </div>
        </div>

        <button
          onClick={runAnalysis}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "분석 중..." : "AI 분석하기"}
        </button>
      </div>

      {/* Simulation metrics */}
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Material
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {material}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Doping
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {doping}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Temperature
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {temperature} K
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Concentration
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {concentration} cm⁻³
          </p>
        </div>
      </div>

      {/* Calculated properties */}
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Band Gap
          </p>

          <p className="mt-2 text-lg font-semibold text-cyan-300">
            {bandGap.toFixed(3)} eV
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Fermi Level
          </p>

          <p className="mt-2 text-lg font-semibold text-cyan-300">
            {fermiLevel.toFixed(3)} eV
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Mobility
          </p>

          <p className="mt-2 text-lg font-semibold text-cyan-300">
            {mobility.toFixed(2)} cm²/V·s
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Conductivity
          </p>

          <p className="mt-2 text-lg font-semibold text-cyan-300">
            {conductivity.toExponential(3)} S/cm
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 p-5">
          <p className="text-sm font-semibold text-red-300">
            AI 분석 오류
          </p>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-red-200/80">
            {error}
          </p>
        </div>
      )}

      {/* Analysis result */}
      {analysis && (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>

            <h4 className="font-semibold text-white">
              AI 분석 결과
            </h4>
          </div>

          <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">
            {analysis}
          </div>
        </div>
      )}

      {/* Explanation */}
      {!analysis && !error && !loading && (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-sm leading-6 text-slate-400">
            현재 시뮬레이션 결과를 바탕으로 AI가 반도체 재료의
            밴드갭, 도핑, 페르미 준위, 이동도, 전도도 등을
            분석합니다.
          </p>
        </div>
      )}

      {loading && (
        <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-5">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <p className="text-sm text-cyan-200">
              Gemini AI가 시뮬레이션 결과를 분석하고 있습니다...
            </p>
          </div>
        </div>
      )}
    </section>
  );
}