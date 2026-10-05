export type Material = {
  name: string;
  symbol: string;
  description: string;
  bandGap: number;
  mobility: number;
  structure: string;
  type: string;
  applications: string;
};

export const materials: Material[] = [
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

export function getMaterial(symbol: string) {
  return materials.find(
    (material) => material.symbol === symbol
  );
}