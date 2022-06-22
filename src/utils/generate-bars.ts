import { config } from "./config";
import { type BarType } from "../components/Bar";

export const generateBars = (len: number) => {
  console.log("generating");
  const array: BarType[] = [];
  for (let i = 0; i < len; i++) {
    const value = Math.floor(Math.random() * config.range + 1);
    array[i] = {
      value,
      isCompared: false,
      isSwapped: false,
      isMin: false,
    };
  }
  return array;
};
