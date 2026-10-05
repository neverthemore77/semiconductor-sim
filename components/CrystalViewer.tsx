"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type AtomData = {
  position: [number, number, number];
  color: string;
  isDopant?: boolean;
};

function Atom({
  position,
  color,
  isDopant = false,
}: {
  position: [number, number, number];
  color: string;
  isDopant?: boolean;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry
        args={[isDopant ? 0.34 : 0.28, 32, 32]}
      />

      <meshStandardMaterial
        color={color}
        emissive={isDopant ? color : "#000000"}
        emissiveIntensity={isDopant ? 0.35 : 0}
      />
    </mesh>
  );
}

function Bond({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const startVector = new THREE.Vector3(...start);
  const endVector = new THREE.Vector3(...end);

  const direction = new THREE.Vector3()
    .subVectors(endVector, startVector);

  const length = direction.length();

  const midpoint = new THREE.Vector3()
    .addVectors(startVector, endVector)
    .multiplyScalar(0.5);

  direction.normalize();

  const quaternion = new THREE.Quaternion();

  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry
        args={[0.055, 0.055, length, 16]}
      />

      <meshStandardMaterial color="#64748b" />
    </mesh>
  );
}

function calculateDopantCount(
  doping: string,
  concentration: string
) {
  if (doping === "None") {
    return 0;
  }

  const value = Number(concentration);

  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  const exponent = Math.log10(value);

  const count = Math.floor(
    (exponent - 15) * 1.5
  ) + 1;

  return Math.max(1, Math.min(count, 6));
}

function getAtoms(
  material: string,
  doping: string,
  concentration: string
): AtomData[] {
  let atoms: AtomData[] = [];

  if (material === "Si" || material === "Ge") {
    const color =
      material === "Si"
        ? "#22d3ee"
        : "#a78bfa";

    atoms = [
      { position: [-1.5, 1.5, 1.5], color },
      { position: [1.5, 1.5, 1.5], color },
      { position: [-1.5, -1.5, 1.5], color },
      { position: [1.5, -1.5, 1.5], color },

      { position: [-1.5, 1.5, -1.5], color },
      { position: [1.5, 1.5, -1.5], color },
      { position: [-1.5, -1.5, -1.5], color },
      { position: [1.5, -1.5, -1.5], color },

      { position: [0, 0, 0], color },
    ];
  }

  if (material === "GaN") {
    atoms = [
      { position: [0, 1.5, 0], color: "#f97316" },
      { position: [1.3, 0.5, 0], color: "#38bdf8" },
      { position: [-1.3, 0.5, 0], color: "#38bdf8" },

      { position: [0, -0.5, 1.3], color: "#f97316" },
      { position: [0, -0.5, -1.3], color: "#38bdf8" },

      { position: [1.3, -1.2, 0], color: "#f97316" },
      { position: [-1.3, -1.2, 0], color: "#38bdf8" },
    ];
  }

  if (material === "SiC") {
    atoms = [
      { position: [0, 1.5, 0], color: "#22d3ee" },
      { position: [1.3, 0.5, 0], color: "#facc15" },
      { position: [-1.3, 0.5, 0], color: "#facc15" },

      { position: [0, -0.5, 1.3], color: "#22d3ee" },
      { position: [0, -0.5, -1.3], color: "#facc15" },

      { position: [1.3, -1.2, 0], color: "#22d3ee" },
      { position: [-1.3, -1.2, 0], color: "#facc15" },
    ];
  }

  const dopantCount = calculateDopantCount(
    doping,
    concentration
  );

  if (dopantCount > 0) {
    const dopantColor =
      doping === "n-type"
        ? "#fb923c"
        : "#f472b6";

    for (
      let i = 0;
      i < dopantCount && i < atoms.length;
      i++
    ) {
      atoms[i] = {
        ...atoms[i],
        color: dopantColor,
        isDopant: true,
      };
    }
  }

  return atoms;
}

function CrystalStructure({
  material,
  doping,
  concentration,
}: {
  material: string;
  doping: string;
  concentration: string;
}) {
  const atoms = getAtoms(
    material,
    doping,
    concentration
  );

  const bonds: {
    start: [number, number, number];
    end: [number, number, number];
  }[] = [];

  const maxBondDistance = 2.8;

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const distance = new THREE.Vector3(
        atoms[i].position[0] -
          atoms[j].position[0],

        atoms[i].position[1] -
          atoms[j].position[1],

        atoms[i].position[2] -
          atoms[j].position[2]
      ).length();

      if (distance <= maxBondDistance) {
        bonds.push({
          start: atoms[i].position,
          end: atoms[j].position,
        });
      }
    }
  }

  return (
    <>
      {bonds.map((bond, index) => (
        <Bond
          key={`bond-${index}`}
          start={bond.start}
          end={bond.end}
        />
      ))}

      {atoms.map((atom, index) => (
        <Atom
          key={`${material}-${index}`}
          position={atom.position}
          color={atom.color}
          isDopant={atom.isDopant}
        />
      ))}
    </>
  );
}

export default function CrystalViewer({
  material,
  doping,
  concentration,
}: {
  material: string;
  doping: string;
  concentration: string;
}) {
  const dopantCount = calculateDopantCount(
    doping,
    concentration
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <CrystalStructure
          material={material}
          doping={doping}
          concentration={concentration}
        />

        <OrbitControls />
      </Canvas>

      <div className="absolute bottom-4 left-4 rounded-lg border border-slate-700 bg-slate-950/85 px-4 py-3 text-xs">
        <p className="mb-2 font-semibold text-white">
          Crystal Viewer
        </p>

        <p className="text-slate-400">
          🖱️ 드래그: 회전
        </p>

        <p className="text-slate-400">
          🖱️ 휠: 확대 / 축소
        </p>

        {doping !== "None" && (
          <>
            <p className="mt-2 font-semibold text-orange-400">
              ● {doping} 도핑
            </p>

            <p className="mt-1 text-slate-400">
              농도:{" "}
              {concentration || "입력 필요"} cm⁻³
            </p>

            <p className="mt-1 text-slate-500">
              시각화된 도핑 원자: {dopantCount}개
            </p>
          </>
        )}
      </div>
    </div>
  );
}