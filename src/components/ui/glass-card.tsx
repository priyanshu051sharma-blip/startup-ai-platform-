"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  tilt?: boolean;
  glow?: "blue" | "purple" | "emerald" | "none";
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, tilt = false, glow = "none", hover = true, children, style, onClick }, ref) => {
    const [rotateX, setRotateX] = React.useState(0);
    const [rotateY, setRotateY] = React.useState(0);

    const glowStyles = {
      blue: "hover:shadow-[0_0_40px_rgba(79,140,255,0.2)]",
      purple: "hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]",
      emerald: "hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]",
      none: "",
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientY - centerY) / rect.height;
      const deltaY = -(e.clientX - centerX) / rect.width;
      setRotateX(deltaX * 8);
      setRotateY(deltaY * 8);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass rounded-[24px] shadow-ambient transition-shadow duration-300",
          hover && "cursor-pointer",
          hover && glowStyles[glow],
          className
        )}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d", ...style }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
