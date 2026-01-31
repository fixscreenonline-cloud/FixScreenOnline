"use client";

import { createContext, useContext } from "react";
import { MotionValue } from "motion/react";

interface HeroScrollContextType {
  scrollYProgress: MotionValue<number>;
}

const HeroScrollContext = createContext<HeroScrollContextType | null>(null);

export function useHeroScroll(): HeroScrollContextType | null {
  return useContext(HeroScrollContext);
}

export { HeroScrollContext };
