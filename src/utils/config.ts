import { insertionSort, selectionSort } from "./algorithms";

export const config = {
  range: 100,
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
