"use client";;
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

export const CounterButton = ({
  initialCount = 0,
  value,
  min = 0,
  max = 99,
  onChange,
  className
}) => {
  const isControlled = value !== undefined;
  const [internalCount, setInternalCount] = React.useState(initialCount);
  const [direction, setDirection] = React.useState(1);

  const count = isControlled ? value : internalCount;

  React.useEffect(() => {
    if (!isControlled) return;
    setInternalCount(value);
  }, [value, isControlled]);

  const increment = () => {
    if (count >= max) return;
    setDirection(1);
    const next = count + 1;
    if (!isControlled) setInternalCount(next);
    onChange?.(next);
  };

  const decrement = () => {
    if (count <= min) return;
    setDirection(-1);
    const next = count - 1;
    if (!isControlled) setInternalCount(next);
    onChange?.(next);
  };

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center text-primary rounded-md bg-background",
        className
      )}>
      <button
        type="button"
        onClick={decrement}
        disabled={count <= min}
        className="flex h-full w-9 items-center justify-center rounded-l-md transition-colors disabled:pointer-events-none disabled:opacity-50">
        <Minus className="size-8" />
      </button>
      <div
        className="flex h-full w-30 items-center justify-center overflow-hidden text-3xl font-medium">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: direction * 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction * -20, opacity: 0 }}
            transition={{ duration: 0.30, ease: "easeOut" }}>
            {count}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={increment}
        disabled={count >= max}
        className="flex h-full w-9 items-center justify-center rounded-r-md transition-colors disabled:pointer-events-none disabled:opacity-50">
        <Plus className="size-8" />
      </button>
    </div>
  );
};
