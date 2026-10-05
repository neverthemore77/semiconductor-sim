"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type IVChartProps = {
  material: string;
  doping: string;
  concentration: string;
};

function createIVData(
  material: string,
  doping: string,
  concentration: string
) {
  const concentrationValue = Number(concentration);

  const concentrationFactor =
    Number.isFinite(concentrationValue) &&
    concentrationValue > 0
      ? Math.log10(concentrationValue) - 15
      : 0;

  let materialFactor = 1;

  if (material === "Ge") {
    materialFactor = 1.2;
  }

  if (material === "GaN") {
    materialFactor = 0.8;
  }

  if (material === "SiC") {
    materialFactor = 0.7;
  }

  const dopingFactor =
    doping === "None"
      ? 0.5
      : 1 + concentrationFactor * 0.15;

  const data = [];

  for (let voltage = -2; voltage <= 2; voltage += 0.25) {
    let current =
      voltage *
      materialFactor *
      dopingFactor;

    if (voltage > 0) {
      current +=
        Math.pow(voltage, 2) *
        0.25 *
        dopingFactor;
    }

    data.push({
      voltage: Number(voltage.toFixed(2)),
      current: Number(current.toFixed(3)),
    });
  }

  return data;
}

export default function IVChart({
  material,
  doping,
  concentration,
}: IVChartProps) {
  const data = createIVData(
    material,
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
            Doping
          </p>

          <p className="font-semibold text-cyan-400">
            {doping}
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
              dataKey="voltage"
              type="number"
              domain={[-2, 2]}
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Voltage (V)",
                position: "insideBottom",
                offset: -5,
                fill: "#94a3b8",
              }}
            />

            <YAxis
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Current (a.u.)",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
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
              dataKey="current"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={false}
              name="Current"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        교육용 모식 모델 · 실제 소자 측정값 아님
      </p>
    </div>
  );
}