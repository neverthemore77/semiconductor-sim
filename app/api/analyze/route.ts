import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTemporaryError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : String(error);

  return (
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand") ||
    message.includes("temporarily")
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY가 설정되지 않았습니다. .env.local을 확인해주세요.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      material,
      doping,
      concentration,
      temperature,
      bandGap,
      fermiLevel,
      mobility,
      carrierConcentration,
      conductivity,
    } = body;

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
반도체 재료 시뮬레이션 결과를 공학적으로 해석해 주세요.

재료: ${material}
도핑: ${doping}
도핑 농도: ${concentration} cm^-3
온도: ${temperature} K
밴드갭: ${bandGap.toFixed(3)} eV
페르미 준위: ${fermiLevel.toFixed(3)} eV
이동도: ${mobility.toFixed(2)} cm^2/Vs
캐리어 농도: ${carrierConcentration.toExponential(3)} cm^-3
전도도: ${conductivity.toExponential(3)} S/cm

다음 순서로 한국어로 설명해 주세요.

1. 현재 재료의 특성
2. 도핑이 캐리어 농도에 미친 영향
3. 페르미 준위의 변화
4. 이동도와 전도도의 관계
5. 실제 반도체 소자 관점에서의 의미

주의사항:
- 교육용 시뮬레이션이라는 점을 고려하세요.
- 실제 측정값이라고 단정하지 마세요.
- 입력된 시뮬레이션 결과를 기준으로 설명하세요.
- 대학 학부 수준에서 이해하기 쉽게 설명하세요.
`;

    let lastError: unknown = null;

    // 여러 모델을 순서대로 시도
    for (const model of MODELS) {
      // 같은 모델에서 최대 2번 시도
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response =
            await ai.models.generateContent({
              model,
              contents: prompt,
            });

          const analysis = response.text;

          if (!analysis) {
            throw new Error(
              "Gemini에서 분석 결과를 받지 못했습니다."
            );
          }

          return NextResponse.json({
            analysis,
            model,
          });
        } catch (error) {
          lastError = error;

          console.error(
            `Gemini error - model: ${model}, attempt: ${
              attempt + 1
            }`,
            error
          );

          // 503 같은 일시적 오류만 재시도
          if (!isTemporaryError(error)) {
            throw error;
          }

          // 1초 → 2초로 대기
          if (attempt === 0) {
            await sleep(1500);
          }
        }
      }
    }

    console.error(
      "All Gemini models failed:",
      lastError
    );

    return NextResponse.json(
      {
        error:
          "현재 Gemini 서버가 혼잡하여 AI 분석을 완료하지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Gemini API 호출 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}