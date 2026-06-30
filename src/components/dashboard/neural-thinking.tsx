"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  r: number;
  color: string;
  speed: number;
  angle: number;
}

interface Edge {
  from: number;
  to: number;
  opacity: number;
  color: string;
}

const COLORS = ["#4F8CFF", "#7C3AED", "#10B981", "#F59E0B"];

function makeNodes(count: number, w: number, h: number): Node[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * w,
    y: Math.random() * h,
    r: 2 + Math.random() * 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: 0.2 + Math.random() * 0.4,
    angle: Math.random() * Math.PI * 2,
  }));
}

function makeEdges(nodes: Node[]): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80 && Math.random() > 0.5) {
        edges.push({ from: i, to: j, opacity: Math.random() * 0.4 + 0.1, color: COLORS[Math.floor(Math.random() * COLORS.length)] });
      }
    }
  }
  return edges;
}

interface NeuralThinkingProps {
  width?: number;
  height?: number;
  active?: boolean;
  label?: string;
}

export function NeuralThinking({ width = 280, height = 160, active = true, label = "AI is analyzing..." }: NeuralThinkingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const rafRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    nodesRef.current = makeNodes(18, width, height);
    edgesRef.current = makeEdges(nodesRef.current);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Update node positions
      nodesRef.current.forEach((n) => {
        n.angle += 0.005;
        n.x += Math.cos(n.angle) * n.speed;
        n.y += Math.sin(n.angle) * n.speed;
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      });

      // Recompute edges periodically
      if (frame % 60 === 0) {
        edgesRef.current = makeEdges(nodesRef.current);
      }

      // Draw edges
      edgesRef.current.forEach((e) => {
        const a = nodesRef.current[e.from];
        const b = nodesRef.current[e.to];
        if (!a || !b) return;
        const pulse = Math.sin(frame * 0.04 + e.from) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = e.color + Math.floor(e.opacity * pulse * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes
      nodesRef.current.forEach((n) => {
        const glow = Math.sin(frame * 0.06 + n.id) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.floor((0.6 + glow * 0.4) * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Outer ring pulse
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3 * glow, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + Math.floor(0.15 * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Progress animation
    let p = 0;
    const pInterval = setInterval(() => {
      p = Math.min(p + Math.random() * 3, 95);
      setProgress(Math.round(p));
    }, 150);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(pInterval);
    };
  }, [active, width, height]);

  if (!active) return null;

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(79,140,255,0.04)",
          border: "1px solid rgba(79,140,255,0.12)",
        }}
      >
        <canvas ref={canvasRef} className="block" style={{ width, height }} />

        {/* Scan line */}
        <motion.div
          animate={{ y: [0, height, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.6), transparent)" }}
        />
      </div>

      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]"
            />
            <span className="text-[#B4B4B4]">{label}</span>
          </div>
          <span className="text-[#4F8CFF] font-medium">{progress}%</span>
        </div>
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#4F8CFF,#7C3AED)" }}
          />
        </div>
      </div>
    </div>
  );
}
