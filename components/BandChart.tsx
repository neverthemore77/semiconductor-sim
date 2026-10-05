"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BandChartProps = {
  material: string;
  bandGap: number;
  doping: string;
  concentration: string;
};

function createBandData(bandGap: number) {
  return [
    {
      kPoint: "Γ",
      valence: 0,
      conduction: bandGap,
    },
    {
      kPoint: "X",
      valence: -0.15,
      conduction: bandGap + 0.15,
    },
    {
      kPoint: "L",
      valence: -0.08,
      conduction: bandGap + 0.08,
    },
    {
      kPoint: "Γ",
      valence: 0,
      conduction: bandGap,
    },
  ];
}

function calculateFermiLevel(
  bandGap: number,
  doping: string,
  concentration: string
) {
  if (doping === "None") {
    return bandGap * 0.5;
  }

  const concentrationValue = Number(concentration);

  if (
    !Number.isFinite(concentrationValue) ||
    concentrationValue <= 0
  ) {
    return bandGap * 0.5;
  }

  const logValue = Math.log10(concentrationValue);

  const strength = Math.max(
    0,
    Math.min(1, (logValue - 15) / 5)
  );

  if (doping === "n-type") {
    return bandGap * (0.5 + 0.35 * strength);
  }

  if (doping === "p-type") {
    return bandGap * (0.5 - 0.35 * strength);
  }

  return bandGap * 0.5;
}

export default function BandChart({
  material,
  bandGap,
  doping,
  concentration,
}: BandChartProps) {
  const data = createBandData(bandGap);

  const fermiLevel = calculateFermiLevel(
    bandGap,
    doping,
    concentration
  );

  return (
    <div className="h-full w-full">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Material
          </p>

          <p className="font-semibold text-white">
            {material}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Band Gap
          </p>

          <p className="font-semibold text-cyan-400">
            {bandGap.toFixed(2)} eV
          </p>
        </div>
      </div>

      <div className="h-[270px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="kPoint"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              domain={[-0.5, 4.0]}
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Energy (eV)",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
            />

            <ReferenceLine
              y={fermiLevel}
              stroke="#facc15"
              strokeDasharray="6 4"
              strokeWidth={2}
              label={{
                value: `EF = ${fermiLevel.toFixed(2)} eV`,
                fill: "#facc15",
                position: "insideTopRight",
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Line
              type="monotone"
              dataKey="valence"
              stroke="#f472b6"
              strokeWidth={3}
              dot
              name="Valence Band"
            />

            <Line
              type="monotone"
              dataKey="conduction"
              stroke="#22d3ee"
              strokeWidth={3}
              dot
              name="Conduction Band"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex justify-center gap-6 text-xs">
        <span className="text-cyan-400">
          ● Conduction Band
        </span>

        <span className="text-pink-400">
          ● Valence Band
        </span>

        <span className="text-yellow-400">
          ┄ EF
        </span>
      </div>
    </div>
  );
}