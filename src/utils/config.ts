import { insertionSort, selectionSort } from "./algorithms";

export const config = {
  barSize: [80, 90] as const,
  range: 100,
  barCountRange: [11, 83] as const,
  defaultBarCount: 51,
  animationSpeeds: [1000, 700, 500, 250, 100, 50, 25, 10, 5, 2],
  defaultSpeed: 5,
  algorithms: [
    {
      displayName: "Insertion Sort",
      algorithm: insertionSort,
    },
    {
      displayName: "Selection Sort",
      algorithm: selectionSort,
    },
  ],
};
