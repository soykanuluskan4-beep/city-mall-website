"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/types/content";

declare global {
  interface Window {
    THREE?: any;
  }
}

type FloorMap3DProps = {
  locale: Locale;
};

type Category =
  | "market"
  | "entertainment"
  | "food"
  | "technology"
  | "beauty"
  | "service"
  | "parking"
  | "closed"
  | "home";

type BasementBlock = {
  id: string;
  name: string;
  category: Category;
  x: number;
  z: number;
  w: number;
  d: number;
  height?: number;
  clickable?: boolean;
  opacity?: number;
  visualColor?: string;
  description: {
    tr: string;
    en: string;
  };
  route?: string;
};

type SceneApi = {
  applySearch: (query: string, matchIds: Set<string>) => void;
  focusBlock: (id: string | null) => void;
};

const THREE_CDN_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const PLAN_WIDTH = 46;
const PLAN_DEPTH = 62;

const COLORS: Record<Category, string> = {
  market: "#39B54A",
  entertainment: "#FFD100",
  food: "#F7941D",
  technology: "#0072BC",
  beauty: "#EC008C",
  service: "#6B6256",
  parking: "#2a2a2a",
  closed: "#444444",
  home: "#F7941D",
};

const BLOCK_VISUAL_COLORS = [
  "#E8312A",
  "#F7941D",
  "#FFD100",
  "#39B54A",
  "#0072BC",
  "#EC008C",
  "#8B5CF6",
  "#14B8A6",
  "#F43F5E",
  "#84CC16",
  "#06B6D4",
  "#A855F7",
  "#F97316",
  "#22C55E",
  "#0EA5E9",
  "#D946EF",
  "#64748B",
  "#92400E",
  "#BE185D",
  "#6B6256",
  "#2A2A2A",
  "#444444",
];

const CATEGORY_LABELS: Record<
  Category,
  {
    tr: string;
    en: string;
  }
> = {
  market: { tr: "Market", en: "Market" },
  entertainment: { tr: "Eğlence", en: "Entertainment" },
  food: { tr: "Yeme-İçme", en: "Food & Dining" },
  technology: { tr: "Teknoloji", en: "Technology" },
  beauty: { tr: "Güzellik", en: "Beauty" },
  service: { tr: "Hizmet", en: "Service" },
  parking: { tr: "Otopark", en: "Parking" },
  closed: { tr: "Kapalı", en: "Closed" },
  home: { tr: "Ev & Yaşam", en: "Home & Living" },
};

const copy = {
  tr: {
    title: "CityMall · Kat Rehberi",
    subtitle: "-1. Kat",
    searchPlaceholder: "Mağaza ara...",
    noResult: "Bulunamadı",
    result: "sonuç",
    defaultHint: "Bir mağazaya tıkla veya arama yap.",
    floor: "Kat",
    viewStores: "Mağazaları Gör",
    close: "Kapat",
    loading: "3B kat planı hazırlanıyor...",
  },
  en: {
    title: "CityMall · Floor Guide",
    subtitle: "Basement Floor",
    searchPlaceholder: "Search stores...",
    noResult: "No results",
    result: "result",
    defaultHint: "Click a store or search.",
    floor: "Floor",
    viewStores: "View Stores",
    close: "Close",
    loading: "Preparing 3D floor guide...",
  },
};

function makeBlock(
  id: string,
  name: string,
  category: Category,
  left: number,
  top: number,
  width: number,
  depth: number,
  options?: Partial<
    Pick<BasementBlock, "clickable" | "opacity" | "height" | "description" | "route">
  >
): BasementBlock {
  const x = ((left + width / 2) / 100 - 0.5) * PLAN_WIDTH;
  const z = ((top + depth / 2) / 100 - 0.5) * PLAN_DEPTH;

  return {
    id,
    name,
    category,
    x,
    z,
    w: (width / 100) * PLAN_WIDTH,
    d: (depth / 100) * PLAN_DEPTH,
    height: options?.height,
    clickable: options?.clickable ?? true,
    opacity: options?.opacity,
    route: options?.route,
    description:
      options?.description ??
      {
        tr: `${name}, CityMall -1. katta yer alıyor.`,
        en: `${name} is located on CityMall basement floor.`,
      },
  };
}

const BASEMENT_BLOCKS: BasementBlock[] = [
  makeBlock("unimar-top", "Ünimar", "service", 0, 0, 28.5, 6.3, {
    route: "/stores",
  }),
  makeBlock("sconto", "Sconto Super Store", "service", 28.5, 0, 71.5, 12.5, {
    route: "/stores",
  }),

  makeBlock("unimar-left", "Ünimar", "service", 0, 6.3, 8.1, 15.6, {
    route: "/stores",
  }),
  makeBlock("jupiter", "Jupiter", "technology", 0, 21.9, 8.1, 9.3, {
    route: "/stores",
  }),
  makeBlock("toyzz-shop", "Toyzz Shop", "entertainment", 0, 31.2, 8.1, 13.7, {
    route: "/kids",
  }),
  makeBlock("chicco", "Chicco", "market", 0, 52.0, 8.1, 9.5, {
    route: "/stores",
  }),
  makeBlock("techno-life", "Techno Life", "technology", 0, 61.5, 8.1, 26.3, {
    route: "/stores",
  }),
  makeBlock("closed-left", "Closed", "closed", 0, 87.8, 18.2, 12.2, {
    clickable: false,
    opacity: 0.4,
    height: 1.2,
    description: {
      tr: "Kapalı alan.",
      en: "Closed area.",
    },
  }),

  makeBlock("toilet-stairs", "Tuvalet ve Merdiven", "service", 90.6, 14.4, 9.4, 5.0, {
    clickable: false,
    opacity: 0.55,
    height: 1.4,
    description: {
      tr: "Tuvalet ve merdiven alanı.",
      en: "Toilet and stairs area.",
    },
  }),
  makeBlock("ates-kuruyemis", "Ateş Kuruyemiş", "food", 90.6, 19.4, 9.4, 7.1, {
    route: "/dining",
  }),
  makeBlock("lokmazade", "Lokmazade", "food", 90.6, 26.5, 9.4, 7.3, {
    route: "/dining",
  }),
  makeBlock("tatliaci-cigkofte", "Tatlıacı Çiğköfte", "food", 90.6, 33.8, 9.4, 7.4, {
    route: "/dining",
  }),
  makeBlock("en-zirve", "En Zirve Beauty Center", "beauty", 90.6, 41.2, 9.4, 10.6, {
    route: "/stores",
  }),
  makeBlock("atom-master-cafe", "Atom Master Cafe", "food", 84.9, 51.8, 15.1, 15.0, {
    route: "/dining",
  }),
  makeBlock("nxg-computer", "NXG Computer", "technology", 84.9, 66.8, 15.1, 7.5, {
    route: "/stores",
  }),
  makeBlock("closed-right", "Closed", "closed", 84.9, 74.3, 15.1, 7.3, {
    clickable: false,
    opacity: 0.4,
    height: 1.2,
    description: {
      tr: "Kapalı alan.",
      en: "Closed area.",
    },
  }),
  makeBlock("city-barber", "City Barber Shop", "service", 84.9, 81.6, 15.1, 7.2, {
    route: "/stores",
  }),
  makeBlock("edera", "Edera Accessories", "beauty", 79.2, 88.8, 20.8, 11.2, {
    route: "/stores",
  }),

  makeBlock("playground", "Oyun Alanı", "entertainment", 39.0, 28.8, 22.0, 22.8, {
    route: "/kids",
    height: 2.1,
    description: {
      tr: "Çocuklar ve aileler için eğlence alanı.",
      en: "Entertainment area for children and families.",
    },
  }),
  makeBlock("candy-shop", "Candy Shop", "food", 39.1, 53.2, 5.2, 4.2, {
    route: "/dining",
    height: 2.0,
  }),
  makeBlock("mini-golf", "Mini Golf", "entertainment", 39.2, 63.3, 22.2, 18.8, {
    route: "/kids",
    height: 2.1,
    description: {
      tr: "Mini golf ve eğlence deneyimi.",
      en: "Mini golf and entertainment experience.",
    },
  }),
  makeBlock("parking", "Kapalı Otopark", "parking", 19.2, 94.4, 58.0, 5.6, {
    clickable: false,
    opacity: 0.9,
    height: 0.75,
    description: {
      tr: "Kapalı otopark alanı.",
      en: "Indoor parking area.",
    },
  }),
].map((block, index) => ({
  ...block,
  visualColor: BLOCK_VISUAL_COLORS[index % BLOCK_VISUAL_COLORS.length],
}));

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getContrastText(category: Category) {
  return category === "entertainment" || category === "food" ? "text-black" : "text-white";
}

function getBlockColor(block: BasementBlock) {
  return block.visualColor ?? COLORS[block.category];
}

function getBlockHref(locale: Locale, block: BasementBlock) {
  return `/${locale}${block.route ?? "/stores"}`;
}

function loadThreeScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("window is not available"));
  }

  if (window.THREE) {
    return Promise.resolve(window.THREE);
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[data-three-r128="true"]'
  );

  if (existingScript) {
    return new Promise<any>((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(window.THREE));
      existingScript.addEventListener("error", reject);
    });
  }

  return new Promise<any>((resolve, reject) => {
    const script = document.createElement("script");

    script.src = THREE_CDN_URL;
    script.async = true;
    script.dataset.threeR128 = "true";

    script.onload = () => resolve(window.THREE);
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

export function FloorMap3D({ locale }: FloorMap3DProps) {
  const text = copy[locale];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneApiRef = useRef<SceneApi | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [resultCount, setResultCount] = useState<number | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<BasementBlock | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<BasementBlock | null>(null);

  const clickableBlocks = useMemo(
    () => BASEMENT_BLOCKS.filter((block) => block.clickable !== false),
    []
  );

  useEffect(() => {
    const normalizedQuery = normalizeText(query.trim());

    if (!normalizedQuery) {
      setResultCount(null);
      sceneApiRef.current?.applySearch("", new Set());
      sceneApiRef.current?.focusBlock(null);
      return;
    }

    const matches = clickableBlocks.filter((block) =>
      normalizeText(block.name).includes(normalizedQuery)
    );

    setResultCount(matches.length);

    const matchIds = new Set(matches.map((block) => block.id));

    sceneApiRef.current?.applySearch(normalizedQuery, matchIds);

    if (matches[0]) {
      sceneApiRef.current?.focusBlock(matches[0].id);
    }
  }, [query, clickableBlocks]);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    loadThreeScript()
      .then((THREE) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        cleanup = initScene({
          THREE,
          container: containerRef.current,
          sceneApiRef,
          setHoveredBlock,
          setSelectedBlock,
          setIsReady,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
        }
      });

    return () => {
      cancelled = true;
      cleanup();
      sceneApiRef.current = null;
    };
  }, []);

  return (
    <div
      className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-border-default bg-[#0f0f10] shadow-card md:h-[500px]"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      <div ref={containerRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(232,49,42,0.16),transparent_28%),linear-gradient(180deg,rgba(15,15,16,0.05),rgba(15,15,16,0.34))]" />

      <div className="absolute left-3 top-3 z-20 w-[min(330px,calc(100%-24px))] rounded-2xl border border-white/14 bg-black/42 p-4 text-white shadow-[0_18px_54px_rgba(0,0,0,0.28)] backdrop-blur-xl md:left-4 md:top-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/52">
              {text.subtitle}
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">
              {text.title}
            </h3>
          </div>

          <span className="rounded-full bg-[#E8312A] px-3 py-1 text-xs font-semibold text-white">
            -1
          </span>
        </div>

        <label className="mt-4 flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-3 text-sm text-white/80">
          <Search className="h-4 w-4 shrink-0 text-white/52" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/42"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 rounded-full p-1 text-white/56 transition hover:bg-white/10 hover:text-white"
              aria-label={text.close}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </label>

        <p className="mt-3 text-xs leading-5 text-white/58">
          {resultCount === null
            ? text.defaultHint
            : resultCount === 0
              ? text.noResult
              : `${resultCount} ${text.result}`}
        </p>
      </div>

      {hoveredBlock ? (
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden rounded-2xl border border-white/14 bg-black/50 px-4 py-3 text-white shadow-[0_18px_54px_rgba(0,0,0,0.26)] backdrop-blur-xl md:block">
          <p className="text-sm font-semibold">{hoveredBlock.name}</p>
          <p className="mt-1 text-xs text-white/52">
            {CATEGORY_LABELS[hoveredBlock.category][locale]}
          </p>
        </div>
      ) : null}

      <div
        className={`absolute bottom-0 right-0 top-auto z-30 w-full border-t border-white/10 bg-[#0f0f10]/92 p-5 text-white shadow-[0_-20px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-300 md:bottom-4 md:right-4 md:top-4 md:w-[330px] md:rounded-2xl md:border ${
          selectedBlock
            ? "translate-y-0 opacity-100 md:translate-x-0"
            : "translate-y-full opacity-0 md:translate-x-[calc(100%+2rem)] md:translate-y-0"
        }`}
      >
        {selectedBlock ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getContrastText(
                    selectedBlock.category
                  )}`}
                  style={{ backgroundColor: COLORS[selectedBlock.category] }}
                >
                  {CATEGORY_LABELS[selectedBlock.category][locale]}
                </span>

                <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                  {selectedBlock.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBlock(null)}
                className="rounded-full border border-white/14 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label={text.close}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                {text.floor}
              </p>
              <p className="mt-1 text-base font-semibold">-1. Kat</p>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/68">
              {selectedBlock.description[locale]}
            </p>

            <Link
              href={getBlockHref(locale, selectedBlock)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD100] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#F7941D]"
            >
              {text.viewStores}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </>
        ) : null}
      </div>

      {!isReady && !loadError ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0f0f10] text-white">
          <p className="text-sm font-semibold tracking-wide text-white/70">
            {text.loading}
          </p>
        </div>
      ) : null}

      {loadError ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0f0f10] p-6 text-center text-white">
          <p className="max-w-sm text-sm leading-6 text-white/70">
            3D kat planı yüklenemedi. Sayfayı yenileyip tekrar deneyin.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function initScene({
  THREE,
  container,
  sceneApiRef,
  setHoveredBlock,
  setSelectedBlock,
  setIsReady,
}: {
  THREE: any;
  container: HTMLDivElement;
  sceneApiRef: React.MutableRefObject<SceneApi | null>;
  setHoveredBlock: (block: BasementBlock | null) => void;
  setSelectedBlock: (block: BasementBlock | null) => void;
  setIsReady: (value: boolean) => void;
}) {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color("#0f0f10");
  scene.fog = new THREE.Fog("#0f0f10", 54, 110);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 220);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
  });

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.touchAction = "none";

  container.appendChild(renderer.domElement);

  const root = new THREE.Group();

  scene.add(root);

  const ambient = new THREE.AmbientLight("#ffffff", 0.78);
  const key = new THREE.DirectionalLight("#ffffff", 1.08);
  const fill = new THREE.PointLight("#FFD100", 0.62, 80);
  const rim = new THREE.PointLight("#0072BC", 0.38, 90);

  key.position.set(20, 34, 18);
  key.castShadow = true;
  key.shadow.mapSize.width = 1024;
  key.shadow.mapSize.height = 1024;

  fill.position.set(-18, 14, -20);
  rim.position.set(18, 12, 22);

  scene.add(ambient, key, fill, rim);

  const floorGroup = new THREE.Group();

  root.add(floorGroup);
  floorGroup.add(makeBasementFloor(THREE));
  floorGroup.add(makeParkingRampHint(THREE));

  const blockMeshes = new Map<string, any>();
  const clickableMeshes: any[] = [];

  BASEMENT_BLOCKS.forEach((block) => {
    const mesh = makeStoreBlock(THREE, block);

    floorGroup.add(mesh);
    blockMeshes.set(block.id, mesh);

    if (block.clickable !== false) {
      clickableMeshes.push(mesh);
    }
  });

  floorGroup.add(makeEscalator(THREE, -8.5, -13.2, -1));
  floorGroup.add(makeEscalator(THREE, -8.5, 8.8, 1));

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const rig = {
    theta: -0.58,
    thetaTarget: -0.58,
    phi: 0.98,
    phiTarget: 0.98,
    radius: 68,
    radiusTarget: 68,
    target: new THREE.Vector3(0, 0, 0),
    targetTarget: new THREE.Vector3(0, 0, 0),
  };

  const pointerState = {
    isDown: false,
    moved: false,
    lastX: 0,
    lastY: 0,
    hoverMesh: null as any,
  };

  function updateSize() {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function updateCamera() {
    rig.theta += (rig.thetaTarget - rig.theta) * 0.08;
    rig.phi += (rig.phiTarget - rig.phi) * 0.08;
    rig.radius += (rig.radiusTarget - rig.radius) * 0.08;
    rig.target.lerp(rig.targetTarget, 0.08);

    const y = Math.cos(rig.phi) * rig.radius;
    const flat = Math.sin(rig.phi) * rig.radius;
    const x = Math.sin(rig.theta) * flat;
    const z = Math.cos(rig.theta) * flat;

    camera.position.set(rig.target.x + x, rig.target.y + y + 10, rig.target.z + z);
    camera.lookAt(rig.target.x, rig.target.y, rig.target.z);
  }

  function setPointerFromEvent(event: PointerEvent) {
    const rect = renderer.domElement.getBoundingClientRect();

    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function getIntersection(event: PointerEvent) {
    setPointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObjects(clickableMeshes, false);

    return hits[0]?.object ?? null;
  }

  function paintMesh(mesh: any, mode: "default" | "dim" | "match" | "hover" | "selected") {
    const block = mesh.userData.block as BasementBlock;
    const material = mesh.material;

    const baseOpacity = block.opacity ?? 1;

    material.color.set(getBlockColor(block));
    material.transparent = baseOpacity < 1 || mode === "dim";
    material.opacity = mode === "dim" ? 0.25 : baseOpacity;
    material.roughness = 0.62;
    material.metalness = 0.05;

    if (material.emissive) {
      material.emissive.set("#000000");
      material.emissiveIntensity = 0;
    }

    mesh.scale.set(1, 1, 1);

    if (mode === "match") {
      material.opacity = 1;
      material.transparent = false;
      material.emissive?.set(getBlockColor(block));
      material.emissiveIntensity = 0.18;
    }

    if (mode === "hover") {
      material.opacity = 1;
      material.transparent = false;
      material.emissive?.set("#ffffff");
      material.emissiveIntensity = 0.16;
      mesh.scale.set(1.025, 1.025, 1.025);
    }

    if (mode === "selected") {
      material.opacity = 1;
      material.transparent = false;
      material.emissive?.set("#FFD100");
      material.emissiveIntensity = 0.24;
      mesh.scale.set(1.035, 1.035, 1.035);
    }
  }

  function clearHover() {
    if (pointerState.hoverMesh) {
      paintMesh(pointerState.hoverMesh, "default");
      pointerState.hoverMesh = null;
    }

    setHoveredBlock(null);
    renderer.domElement.style.cursor = "grab";
  }

  function applySearch(query: string, matchIds: Set<string>) {
    const hasQuery = Boolean(query);

    blockMeshes.forEach((mesh, id) => {
      const block = mesh.userData.block as BasementBlock;

      if (block.clickable === false) {
        paintMesh(mesh, "default");
        return;
      }

      if (!hasQuery) {
        paintMesh(mesh, "default");
        return;
      }

      paintMesh(mesh, matchIds.has(id) ? "match" : "dim");
    });
  }

  function focusBlock(id: string | null) {
    if (!id) {
      rig.targetTarget.set(0, 0, 0);
      rig.radiusTarget = 68;
      rig.phiTarget = 0.98;
      return;
    }

    const mesh = blockMeshes.get(id);

    if (!mesh) {
      return;
    }

    const block = mesh.userData.block as BasementBlock;

    rig.targetTarget.set(block.x, 0, block.z);
    rig.radiusTarget = 36;
    rig.phiTarget = 0.84;
  }

  sceneApiRef.current = {
    applySearch,
    focusBlock,
  };

  function onPointerDown(event: PointerEvent) {
    pointerState.isDown = true;
    pointerState.moved = false;
    pointerState.lastX = event.clientX;
    pointerState.lastY = event.clientY;
    renderer.domElement.style.cursor = "grabbing";
    event.preventDefault();
  }

  function onPointerMove(event: PointerEvent) {
    if (pointerState.isDown) {
      const dx = event.clientX - pointerState.lastX;
      const dy = event.clientY - pointerState.lastY;

      if (Math.abs(dx) + Math.abs(dy) > 3) {
        pointerState.moved = true;
      }

      rig.thetaTarget -= dx * 0.006;
      rig.phiTarget += dy * 0.005;
      rig.phiTarget = Math.max(0.42, Math.min(1.24, rig.phiTarget));

      pointerState.lastX = event.clientX;
      pointerState.lastY = event.clientY;

      return;
    }

    const mesh = getIntersection(event);

    if (mesh === pointerState.hoverMesh) {
      return;
    }

    if (pointerState.hoverMesh) {
      paintMesh(pointerState.hoverMesh, "default");
    }

    pointerState.hoverMesh = mesh;

    if (mesh) {
      const block = mesh.userData.block as BasementBlock;

      paintMesh(mesh, "hover");
      setHoveredBlock(block);
      renderer.domElement.style.cursor = "pointer";
      return;
    }

    clearHover();
  }

  function onPointerUp(event: PointerEvent) {
    if (!pointerState.isDown) {
      return;
    }

    pointerState.isDown = false;
    renderer.domElement.style.cursor = "grab";

    if (!pointerState.moved) {
      const mesh = getIntersection(event);

      if (mesh) {
        const block = mesh.userData.block as BasementBlock;

        setSelectedBlock(block);
        paintMesh(mesh, "selected");
        focusBlock(block.id);
      }
    }
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault();
    rig.radiusTarget += event.deltaY * 0.035;
    rig.radiusTarget = Math.max(30, Math.min(88, rig.radiusTarget));
  }

  const resizeObserver = new ResizeObserver(updateSize);

  resizeObserver.observe(container);

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

  let frame = 0;

  function animate() {
    frame = window.requestAnimationFrame(animate);

    if (!pointerState.isDown) {
      rig.thetaTarget += 0.00045;
    }

    updateCamera();
    renderer.render(scene, camera);
  }

  updateSize();
  updateCamera();
  animate();
  setIsReady(true);

  return () => {
    window.cancelAnimationFrame(frame);
    resizeObserver.disconnect();

    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    renderer.domElement.removeEventListener("wheel", onWheel);

    scene.traverse((object: any) => {
      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material: any) => material.dispose?.());
        } else {
          object.material.dispose?.();
        }
      }
    });

    renderer.dispose();

    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}

function makeBasementFloor(THREE: any) {
  const shape = new THREE.Shape();

  const left = -PLAN_WIDTH / 2;
  const right = PLAN_WIDTH / 2;
  const top = -PLAN_DEPTH / 2;
  const bottom = PLAN_DEPTH / 2;

  shape.moveTo(left, top);
  shape.lineTo(right, top);
  shape.lineTo(right, bottom - 9);
  shape.lineTo(right - 6.8, bottom);
  shape.lineTo(left + 7.5, bottom);
  shape.lineTo(left, bottom - 8);
  shape.lineTo(left, top);

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshStandardMaterial({
    color: "#f7f4ee",
    roughness: 0.84,
    metalness: 0.02,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;

  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.28,
    })
  );

  border.rotation.x = -Math.PI / 2;
  border.position.y = 0.03;

  const group = new THREE.Group();

  group.add(mesh, border);

  return group;
}

function makeStoreBlock(THREE: any, block: BasementBlock) {
  const height =
    block.height ??
    (block.category === "parking" ? 0.7 : block.clickable === false ? 1.15 : 2.8);

  const geometry = new THREE.BoxGeometry(block.w, height, block.d);
  const material = new THREE.MeshStandardMaterial({
    color: getBlockColor(block),
    roughness: 0.58,
    metalness: 0.04,
    transparent: (block.opacity ?? 1) < 1,
    opacity: block.opacity ?? 1,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(block.x, height / 2, block.z);
  mesh.castShadow = block.category !== "parking";
  mesh.receiveShadow = true;
  mesh.userData.block = block;

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: block.clickable === false ? 0.16 : 0.34,
    })
  );

  mesh.add(edges);

  return mesh;
}

function makeEscalator(THREE: any, x: number, z: number, dir: 1 | -1) {
  const group = new THREE.Group();

  const baseMaterial = new THREE.MeshStandardMaterial({
    color: "#5b18e8",
    roughness: 0.42,
    metalness: 0.08,
  });

  const railMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: 0.35,
    metalness: 0.16,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.22, 6.4), baseMaterial);

  base.position.y = 0.28;
  base.castShadow = true;
  base.receiveShadow = true;

  group.add(base);

  for (let i = 0; i < 9; i += 1) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 0.08, 0.38),
      new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? "#3b0dbb" : "#6d28ff",
        roughness: 0.5,
      })
    );

    step.position.set(0, 0.48 + i * 0.025, -2.7 + i * 0.68);
    step.castShadow = true;
    group.add(step);
  }

  const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 6.5), railMaterial);
  const rightRail = leftRail.clone();

  leftRail.position.set(-1.22, 0.72, 0);
  rightRail.position.set(1.22, 0.72, 0);

  group.add(leftRail, rightRail);

  group.position.set(x, 0.04, z);
  group.rotation.y = dir === 1 ? 0 : Math.PI;

  return group;
}

function makeParkingRampHint(THREE: any) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: "#111111",
    roughness: 0.78,
    metalness: 0.02,
    transparent: true,
    opacity: 0.58,
  });

  const leftCut = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 8), material);

  leftCut.position.set(-19.5, 0.01, 28.2);
  leftCut.rotation.y = Math.PI / 4;

  const rightCut = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 8), material);

  rightCut.position.set(20.5, 0.01, 27.8);
  rightCut.rotation.y = -Math.PI / 4;

  group.add(leftCut, rightCut);

  return group;
}