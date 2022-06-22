import React from "react";
import "../styles/Bar.css";

export type BarType = {
  value: number;
  isCompared: boolean;
  isSwapped: boolean;
  isMin: boolean;
};

export const Bar: React.FC<{ bar: BarType }> = ({ bar }) => {
  const { value, isCompared, isSwapped, isMin } = bar;
  const color = isCompared
    ? "hsl(300, 70%, 65%)"
    : isSwapped
    ? "hsl(100, 70%, 65%)"
    : isMin
    ? "hsl(60, 100%, 50%)"
    : "hsl(219, 70%, 65%)";
  return (
    <div
      className="bar"
      style={{ height: `${value}%`, backgroundColor: color }}
    />
  );
};
