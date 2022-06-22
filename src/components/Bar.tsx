import React from "react";

export type BarType = {
  value: number;
  isCompared: boolean;
  isSwapped: boolean;
  isMin: boolean;
};

export const Bar: React.FC<{ bar: BarType }> = ({ bar }) => {
  const { value, isCompared, isSwapped, isMin } = bar;
  const color = isCompared
    ? "bg-pink-500"
    : isSwapped
    ? "bg-green-500"
    : isMin
    ? "bg-yellow-500"
    : "bg-blue-500";
  return (
    <div
      className={`${color} w-5 rounded-b-md`}
      style={{ height: `${value}%`, backgroundColor: color }}
    />
  );
};
