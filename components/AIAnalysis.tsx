"use client";

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
  const analysis: string[] = [];

  if (doping === "None") {
    analysis.push(
      `${material}에 도핑이 적용되지 않은 상태입니다.`
    );
    analysis.push(
      "현재 모델에서는 Fermi level이 밴드갭 중앙 부근에 위치합니다."
    );
  }

  if (doping === "n-type") {
    analysis.push(
      `${material}에 n-type 도핑이 적용되어 전자 농도가 증가하는 조건입니다.`
    );
    analysis.push(
      "Fermi level이 conduction band 방향으로 이동하는 모습을 보여줍니다."
    );
  }

  if (doping === "p-type") {
    analysis.push(
      `${material}에 p-type 도핑이 적용되어 정공 농도가 증가하는 조건입니다.`
    );
    analysis.push(
      "Fermi level이 valence band 방향으로 이동하는 모습을 보여줍니다."
    );
  }

  if (Number(concentration) >= 1e18) {
    analysis.push(
      "상대적으로 높은 도핑 농도이므로 carrier concentration과 conductivity가 증가하는 방향으로 계산됩니다."
    );
  }

  if (temperature > 400) {
    analysis.push(
      "400 K 이상의 온도 조건에서는 온도 변화가 물성에 영향을 주는 조건입니다."
    );
  }

  if (bandGap >= 3) {
    analysis.push(
      `${material}은 현재 모델에서 넓은 band gap을 가지는 소재입니다.`
    );
  }

  return (
    <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-900 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">
          ✨
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            AI Analysis
          </h3>

          <p className="text-xs text-slate-500">
            Simulation result interpretation
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Material
          </p>

          <p className="mt-1 font-semibold text-cyan-400">
            {material}
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Doping
          </p>

          <p className="mt-1 font-semibold">
            {doping}
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Band Gap
          </p>

          <p className="mt-1 font-semibold">
            {bandGap.toFixed(2)} eV
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs text-slate-500">
            Fermi Level
          </p>

          <p className="mt-1 font-semibold text-yellow-400">
            {fermiLevel.toFixed(2)} eV
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
        <h4 className="font-semibold text-white">
          Analysis
        </h4>

        <div className="mt-4 space-y-3">
          {analysis.map((item, index) => (
            <p
              key={index}
              className="text-sm leading-6 text-slate-300"
            >
              <span className="mr-2 text-cyan-400">
                •
              </span>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs text-slate-500">
            Carrier Concentration
          </p>

          <p className="mt-1 text-sm font-semibold">
            {carrierConcentration.toExponential(2)} cm⁻³
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Mobility
          </p>

          <p className="mt-1 text-sm font-semibold">
            {mobility.toFixed(0)} cm²/V·s
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Conductivity
          </p>

          <p className="mt-1 text-sm font-semibold">
            {conductivity.toExponential(2)} S/cm
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-600">
        * 현재 분석은 교육용 시뮬레이션 모델에 기반한 자동 해석입니다.
      </p>
    </section>
  );
}