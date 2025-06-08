"use client";

import { AnimatePresence, motion, useSpring, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BASE_RADIUS = 20;
const HOVER_RADIUS = 120;
const CONTAINER_SIZE = 400;
const MAX_SCALE = 1.5;
const HEX_SPACING = BASE_RADIUS * 2 * 0.85; // Slightly less than diameter for tight packing

// Helper for honeycomb grid
function hexToPixel(q: number, r: number, centerX: number, centerY: number) {
  const x = HEX_SPACING * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  const y = HEX_SPACING * (3 / 2) * r;
  return { x: centerX + x, y: centerY + y };
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

type Vec2 = { x: number; y: number };

function distance(a: Vec2, b: Vec2) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillPoolProps {
  skills: Skill[];
}

export const SkillPool = ({ skills }: SkillPoolProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<Vec2 | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [autoHoverIdx, setAutoHoverIdx] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const remainingSkillsRef = useRef<number[]>(shuffleArray(Array.from({ length: skills.length }, (_, i) => i)));

  // Auto-cycle hovered skill before user interaction
  useEffect(() => {
    if (userInteracted) return;
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      // If we've shown all skills, reset the queue with a new random order
      if (remainingSkillsRef.current.length === 0) {
        remainingSkillsRef.current = shuffleArray(Array.from({ length: skills.length }, (_, i) => i));
      }

      const nextIdx = remainingSkillsRef.current[0];
      setAutoHoverIdx(nextIdx);
      remainingSkillsRef.current = remainingSkillsRef.current.slice(1);
    }, 3000); // 3 seconds between each
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [skills.length, userInteracted]);

  // Stop auto-cycling on user interaction
  useEffect(() => {
    if (!containerRef.current) return;
    const handlePointerMove = () => setUserInteracted(true);
    const el = containerRef.current;
    el.addEventListener("pointermove", handlePointerMove, { once: true });
    return () => el.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    const handleLeave = () => {
      setMouse(null);
      setHoveredIdx(null);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // --- Honeycomb packing ---
  const centerX = CONTAINER_SIZE / 2;
  const centerY = CONTAINER_SIZE / 2;
  const maxHexRadius = Math.floor((Math.sqrt(skills.length) - 1) / 2) + 1; // How many rings out from center
  const positions: { x: number; y: number; skillIdx: number }[] = [];
  let skillIdx = 0;

  // Spiral out from the center in hex coordinates (q, r)
  for (let r = -maxHexRadius; r <= maxHexRadius; r++) {
    for (let q = -maxHexRadius; q <= maxHexRadius; q++) {
      // Only fill positions that are within a hexagonal/circular boundary
      if (Math.abs(q + r) <= maxHexRadius) {
        if (skillIdx < skills.length) {
          const { x, y } = hexToPixel(q, r, centerX, centerY);
          // Only render if within a circle boundary
          const dist = distance({ x, y }, { x: centerX, y: centerY });
          if (dist < CONTAINER_SIZE / 2 - BASE_RADIUS * 1.2) {
            positions.push({ x, y, skillIdx });
            skillIdx++;
          }
        }
      }
    }
  }

  // If we didn't fit all skills, just add the rest in the center
  while (skillIdx < skills.length) {
    positions.push({ x: centerX, y: centerY, skillIdx });
    skillIdx++;
  }

  // Determine which index is hovered (manual or auto)
  const effectiveHoveredIdx = userInteracted ? hoveredIdx : autoHoverIdx;

  // Simulate mouse position for auto-hovered circle
  let simulatedMouse: Vec2 | null = mouse;
  if (!userInteracted && effectiveHoveredIdx !== null) {
    const hoveredPos = positions.find((p) => p.skillIdx === effectiveHoveredIdx);
    if (hoveredPos) {
      simulatedMouse = { x: hoveredPos.x, y: hoveredPos.y };
    }
  }

  const skillText = effectiveHoveredIdx !== null ? skills[effectiveHoveredIdx].name : "Skills";

  const variants: Variants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1, x: -25 },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={containerRef} className="relative overflow-visible" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>
        {positions.map(({ x, y, skillIdx }) => (
          <AnimatedCircle
            key={skillIdx}
            baseX={x}
            baseY={y}
            icon={skills[skillIdx].icon}
            mouse={effectiveHoveredIdx === skillIdx ? simulatedMouse : mouse}
            hovered={effectiveHoveredIdx === skillIdx}
            setHovered={() => setHoveredIdx(skillIdx)}
            // unsetHovered={() => setHoveredIdx(null)}
          />
        ))}
        <AnimatePresence>
          <div className="absolute top-5 left-1/2 -translate-x-1/2">
            <motion.p variants={variants} initial="initial" animate="animate" exit="exit" key={skillText} className="text-2xl font-semibold tracking-tighter">
              {skillText}
            </motion.p>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

function AnimatedCircle({
  baseX,
  baseY,
  icon,
  mouse,
  hovered,
  setHovered,
  unsetHovered,
}: {
  baseX: number;
  baseY: number;
  icon: React.ReactNode;
  mouse: Vec2 | null;
  hovered: boolean;
  setHovered: () => void;
  unsetHovered?: () => void;
}) {
  const x = useSpring(baseX, { stiffness: 300, damping: 30 });
  const y = useSpring(baseY, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (!mouse) {
      x.set(baseX);
      y.set(baseY);
      scale.set(1);
      return;
    }
    const dist = distance({ x: baseX, y: baseY }, mouse);
    const hoverRadius = BASE_RADIUS * MAX_SCALE;
    if (dist < hoverRadius) {
      // Focused: grow and center under mouse
      x.set(mouse.x);
      y.set(mouse.y);
      scale.set(MAX_SCALE);
    } else if (dist < HOVER_RADIUS) {
      // Repel: move away from mouse, no scale
      const influence = Math.max(0, HOVER_RADIUS - dist) / HOVER_RADIUS;
      const repelStrength = influence * 15;
      const angle = Math.atan2(baseY - mouse.y, baseX - mouse.x);
      x.set(baseX + Math.cos(angle) * repelStrength);
      y.set(baseY + Math.sin(angle) * repelStrength);
      scale.set(1);
    } else {
      // At rest
      x.set(baseX);
      y.set(baseY);
      scale.set(1);
    }
  }, [mouse, baseX, baseY, x, y, scale]);

  return (
    <motion.div
      className="absolute rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
      style={{
        x,
        y,
        scale,
        width: BASE_RADIUS * 2,
        height: BASE_RADIUS * 2,
        marginLeft: -BASE_RADIUS,
        marginTop: -BASE_RADIUS,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={setHovered}
      onMouseLeave={() => unsetHovered?.()}
    >
      {icon}
    </motion.div>
  );
}
