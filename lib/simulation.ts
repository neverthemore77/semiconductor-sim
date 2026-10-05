const q = 1.602e-19;

type MaterialProperty = {
  bandGap: number;
  electronMobility: number;
  holeMobility: number;
  intrinsicCarrier: number;
};

const materialProperties: Record<
  string,
  MaterialProperty
> = {
  Si: {
    bandGap: 1.12,
    electronMobility: 1350,
    holeMobility: 480,
    intrinsicCarrier: 1e10,
  },

  Ge: {
    bandGap: 0.66,
    electronMobility: 3900,
    holeMobility: 1900,
    intrinsicCarrier: 2.4e13,
  },

  GaN: {
    bandGap: 3.4,
    electronMobility: 1000,
    holeMobility: 20,
    intrinsicCarrier: 1e-10,
  },

  SiC: {
    bandGap: 3.26,
    electronMobility: 800,
    holeMobility: 120,
    intrinsicCarrier: 1e-20,
  },
};

export function calculateProperties(
  material: string,
  doping: string,
  concentration: string,
  temperature: number
) {
  const base =
    materialProperties[material] ??
    materialProperties.Si;

  const dopingValue = Number(concentration);

  const validDoping =
    Number.isFinite(dopingValue) &&
    dopingValue > 0
      ? dopingValue
      : 0;

  // 교육용 온도 보정 모델
  const temperatureFactor =
    1 -
    0.0004 *
      (temperature - 300);

  const bandGap = Math.max(
    0.1,
    base.bandGap * temperatureFactor
  );

  let mobility =
    base.electronMobility;

  let carrierConcentration =
    base.intrinsicCarrier;

  if (doping === "n-type") {
    mobility =
      base.electronMobility *
      Math.max(
        0.5,
        1 -
          Math.log10(
            Math.max(validDoping, 1)
          ) *
            0.015
      );

    carrierConcentration =
      Math.max(
        validDoping,
        base.intrinsicCarrier
      );
  }

  if (doping === "p-type") {
    mobility =
      base.holeMobility *
      Math.max(
        0.5,
        1 -
          Math.log10(
            Math.max(validDoping, 1)
          ) *
            0.015
      );

    carrierConcentration =
      Math.max(
        validDoping,
        base.intrinsicCarrier
      );
  }

  const conductivity =
    q *
    carrierConcentration *
    mobility;

  return {
    bandGap,
    mobility,
    carrierConcentration,
    conductivity,
  };
}