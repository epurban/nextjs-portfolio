"use client";

import { motion, useSpring } from "framer-motion";
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

  return (
    <div ref={containerRef} className="relative w-[400px] h-[400px] overflow-visible" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>
      {positions.map(({ x, y, skillIdx }) => (
        <AnimatedCircle
          key={skillIdx}
          baseX={x}
          baseY={y}
          icon={skills[skillIdx].icon}
          mouse={mouse}
          hovered={hoveredIdx === skillIdx}
          setHovered={() => setHoveredIdx(skillIdx)}
          unsetHovered={() => setHoveredIdx(null)}
        />
      ))}
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
  unsetHovered: () => void;
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
      onMouseLeave={unsetHovered}
    >
      {icon}
    </motion.div>
  );
}
