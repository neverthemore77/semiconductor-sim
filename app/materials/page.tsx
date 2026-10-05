"use client";

const materials = [
  {
    name: "Silicon",
    symbol: "Si",
    description: "대표적인 원소 반도체 소재",
    bandGap: 1.12,
    mobility: 1350,
    structure: "Diamond Cubic",
    type: "Elemental Semiconductor",
    applications: "CMOS, Logic, Memory, Power",
  },
  {
    name: "Germanium",
    symbol: "Ge",
    description: "높은 캐리어 이동도를 가진 원소 반도체",
    bandGap: 0.66,
    mobility: 3900,
    structure: "Diamond Cubic",
    type: "Elemental Semiconductor",
    applications: "High-speed devices, Sensors",
  },
  {
    name: "Gallium Nitride",
    symbol: "GaN",
    description: "넓은 밴드갭을 가진 화합물 반도체",
    bandGap: 3.4,
    mobility: 1000,
    structure: "Wurtzite",
    type: "Compound Semiconductor",
    applications: "Power, RF, LED",
  },
  {
    name: "Silicon Carbide",
    symbol: "SiC",
    description: "고온·고전압 환경에 적합한 화합물 반도체",
    bandGap: 3.26,
    mobility: 800,
    structure: "Hexagonal",
    type: "Compound Semiconductor",
    applications: "EV, Power Electronics",
  },
];

export default function MaterialsPage() {
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
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Home
          </a>

        </div>
      </header>

      {/* Main */}

      <div className="mx-auto max-w-7xl px-8 py-10">

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Materials
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Semiconductor Materials
        </h2>

        <p className="mt-3 text-slate-400">
          주요 반도체 소재의 결정 구조와 대표적인 물성을 확인해보세요.
        </p>

        {/* Material Cards */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {materials.map((material) => (

            <div
              key={material.symbol}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/50"
            >

              {/* Top */}

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-5xl font-bold text-cyan-400">
                    {material.symbol}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold">
                    {material.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {material.description}
                  </p>

                </div>

                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">
                  {material.type}
                </span>

              </div>

              {/* Properties */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-950 p-4">

                  <p className="text-xs text-slate-500">
                    Band Gap
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {material.bandGap} eV
                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-4">

                  <p className="text-xs text-slate-500">
                    Mobility
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {material.mobility}
                  </p>

                  <p className="text-xs text-slate-600">
                    cm²/V·s
                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-4">

                  <p className="text-xs text-slate-500">
                    Crystal Structure
                  </p>

                  <p className="mt-1 font-semibold">
                    {material.structure}
                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-4">

                  <p className="text-xs text-slate-500">
                    Applications
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {material.applications}
                  </p>

                </div>

              </div>

              {/* Button */}

              <div className="mt-6 flex gap-3">

                <a
                  href={`/simulator?material=${material.symbol}`}
                  className="flex-1 rounded-xl bg-cyan-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Simulator에서 분석
                </a>

                <a
                  href="/compare"
                  className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  비교
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}