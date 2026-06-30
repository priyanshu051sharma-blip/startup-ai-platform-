"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#4F8CFF] text-white hover:bg-[#3a7aee] shadow-[0_0_30px_rgba(79,140,255,0.3)] hover:shadow-[0_0_40px_rgba(79,140,255,0.5)]",
        secondary:
          "glass border border-white/10 text-white hover:border-white/20 hover:bg-white/10",
        ghost: "text-[#B4B4B4] hover:text-white hover:bg-white/5",
        gradient:
          "text-white bg-gradient-to-r from-[#4F8CFF] via-[#7C3AED] to-[#10B981] hover:opacity-90 shadow-[0_0_30px_rgba(79,140,255,0.25)]",
        danger: "bg-[#EF4444] text-white hover:bg-[#dc2626]",
        outline: "border border-white/20 text-white hover:bg-white/5",
      },
      size: {
        sm: "h-8 px-4 text-sm rounded-[999px]",
        md: "h-11 px-6 text-base rounded-[999px]",
        lg: "h-13 px-8 text-lg rounded-[999px]",
        xl: "h-16 px-10 text-xl rounded-[999px]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = true, children, ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
