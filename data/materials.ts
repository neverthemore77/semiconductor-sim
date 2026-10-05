export type Material = {
  name: string;
  symbol: string;

  description: string;

  bandGap: number;
  bandGapType: "Direct" | "Indirect";

  mobility: number;
  electronMobility: number;

  structure: string;
  crystalSystem: string;

  type: "Elemental Semiconductor" | "Compound Semiconductor";

  applications: string[];

  dielectricConstant: number;

  highlight: string;

  sourceName: string;
  sourceUrl: string;
};

export const materials: Material[] = [
  {
    name: "Silicon",
    symbol: "Si",

    description:
      "가장 널리 사용되는 대표적인 원소 반도체로 CMOS와 메모리 소자의 핵심 재료입니다.",

    bandGap: 1.12,
    bandGapType: "Indirect",

    mobility: 1350,
    electronMobility: 1350,

    structure: "Diamond Cubic",
    crystalSystem: "Cubic",

    type: "Elemental Semiconductor",

    applications: [
      "CMOS",
      "Logic",
      "Memory",
      "Power Electronics",
    ],

    dielectricConstant: 11.9,

    highlight:
      "낮은 밴드갭과 높은 공정 성숙도로 대규모 집적회로에 적합",

    sourceName: "NIST · Semiconductor Measurement Technology",
    sourceUrl:
      "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nbsspecialpublication400-4.pdf",
  },

  {
    name: "Germanium",
    symbol: "Ge",

    description:
      "높은 전자·정공 이동도를 갖는 원소 반도체로 고속 소자와 광전자 분야에서 연구됩니다.",

    bandGap: 0.66,
    bandGapType: "Indirect",

    mobility: 3900,
    electronMobility: 3900,

    structure: "Diamond Cubic",
    crystalSystem: "Cubic",

    type: "Elemental Semiconductor",

    applications: [
      "High-speed Devices",
      "Photodetectors",
      "SiGe Devices",
      "Sensors",
    ],

    dielectricConstant: 16.2,

    highlight:
      "Si보다 높은 캐리어 이동도와 작은 밴드갭이 특징",

    sourceName:
      "Wiley · Germanium surface passivation study",
    sourceUrl:
      "https://onlinelibrary.wiley.com/doi/full/10.1002/pssr.202400297",
  },

  {
    name: "Gallium Nitride",
    symbol: "GaN",

    description:
      "넓은 직접 밴드갭과 높은 항복 전계 특성을 가진 대표적인 와이드 밴드갭 화합물 반도체입니다.",

    bandGap: 3.4,
    bandGapType: "Direct",

    mobility: 1000,
    electronMobility: 1000,

    structure: "Wurtzite",
    crystalSystem: "Hexagonal",

    type: "Compound Semiconductor",

    applications: [
      "Power Electronics",
      "RF Devices",
      "LED",
      "Laser Diodes",
    ],

    dielectricConstant: 9.0,

    highlight:
      "넓은 밴드갭과 높은 전자 이동도로 고주파·고전력 소자에 유리",

    sourceName:
      "ScienceDirect · Electron mobility model for wurtzite GaN",
    sourceUrl:
      "https://www.sciencedirect.com/science/article/pii/S0038110105000870",
  },

  {
    name: "Silicon Carbide",
    symbol: "SiC",

    description:
      "여러 결정 다형을 가지는 와이드 밴드갭 반도체이며, 여기서는 전력반도체에 널리 사용되는 4H-SiC 대표값을 사용합니다.",

    bandGap: 3.26,
    bandGapType: "Indirect",

    mobility: 800,
    electronMobility: 800,

    structure: "4H-SiC",
    crystalSystem: "Hexagonal",

    type: "Compound Semiconductor",

    applications: [
      "EV Inverter",
      "Power Electronics",
      "High-voltage Devices",
      "High-temperature Devices",
    ],

    dielectricConstant: 9.7,

    highlight:
      "높은 밴드갭과 높은 항복 전계로 고전압·고온 전력소자에 적합",

    sourceName:
      "University of Pretoria · 4H-SiC electrical properties",
    sourceUrl:
      "https://repository.up.ac.za/server/api/core/bitstreams/3b01f8be-56f3-498b-ba31-f1780db84047/content",
  },
];

export function getMaterial(symbol: string) {
  return materials.find(
    (material) => material.symbol === symbol
  );
}