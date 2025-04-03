import { useMemo } from "react";

export type LiftCategory =
  | "Bench Press"
  | "Squat"
  | "Deadlift"
  | "Overhead Press"
  | "Accessory";

export type Week = 1 | 2 | 3 | 4;

export interface TrainingSet {
  setNumber: number;
  percentage: number;
  weight: number;
}

export interface TrainingPlan {
  week: Week;
  sets: TrainingSet[];
}

interface Options {
  week: Week;
  working1RM: number;
}

const WEEK_PERCENTAGE_MATRIX: Record<Week, number[]> = {
  1: [0.7, 0.75, 0.8, 0.85, 0.9],
  2: [0.65, 0.7, 0.75, 0.8, 0.85],
  3: [0.7, 0.75, 0.8, 0.85, 0.9],
  4: [0.6, 0.65, 0.7, 0.75, 0.8], // optional deload or taper
};

function roundToNearestFive(value: number): number {
  return Math.round(value / 5) * 5;
}

export const useTrainingWeights = ({
  week,
  working1RM,
}: Options): TrainingPlan => {
  const sets = useMemo(() => {
    return WEEK_PERCENTAGE_MATRIX[week].map((percent, i) => {
      const rawWeight = working1RM * percent;
      const weight = roundToNearestFive(rawWeight);
      return {
        setNumber: i + 1,
        percentage: percent,
        weight,
      };
    });
  }, [week, working1RM]);

  return {
    week,
    sets,
  };
};
