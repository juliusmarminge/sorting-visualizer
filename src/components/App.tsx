import React from "react";
import { Navbar } from "./Navbar";
import { Bar, type BarType } from "./Bar";
import { config } from "../utils/config";
import type { Algorithm, Animation } from "../utils/algorithms";
import "../styles/SortingVisualizer.css";

const generateBars = (len: number) => {
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

export const SortingVisualizer: React.FC = () => {
  const [barCount, setBarCount] = React.useState(config.defaultBarCount);
  const [bars, setBars] = React.useState(generateBars(barCount));
  const [speed, setSpeed] = React.useState(config.defaultSpeed);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const startVisualization = (algorithm: Algorithm) => {
    const barValues = Array.from(bars, (bar) => bar.value);
    const animations = algorithm(barValues)[1];
    startAnimating(animations);
  };

  const startAnimating = (animations: Animation[]) => {
    setIsAnimating(true);
    const tmpBars = [...bars];
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      setTimeout(() => {
        setBars((prev) => {
          const tmpBars = [...prev];
          if ("comparison" in animation) {
            console.log(animation);
            tmpBars[animation.comparison[0]].isCompared = true;
            tmpBars[animation.comparison[1]].isCompared = true;
          } else if ("resetComparison" in animation) {
            tmpBars[animation.resetComparison[0]].isCompared = false;
            tmpBars[animation.resetComparison[1]].isCompared = false;
          } else if ("assign" in animation) {
            tmpBars[animation.assign[0]].isSwapped = true;
            tmpBars[animation.assign[0]].value = animation.assign[1];
          } else if ("resetAssign" in animation) {
            tmpBars[animation.resetAssign].isSwapped = false;
          } else if ("swap" in animation) {
            tmpBars[animation.swap[0]].isSwapped = true;
            tmpBars[animation.swap[1]].isSwapped = true;
            tmpBars[animation.swap[0]].value = animation.swap[2];
            tmpBars[animation.swap[1]].value = animation.swap[3];
          } else if ("resetSwap" in animation) {
            tmpBars[animation.resetSwap[0]].isSwapped = false;
            tmpBars[animation.resetSwap[1]].isSwapped = false;
          } else if ("min" in animation) {
            tmpBars[animation.min].isMin = true;
          } else if ("resetMin" in animation) {
            tmpBars[animation.resetMin].isMin = false;
          }
          return tmpBars;
        });
      }, speed * i);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, speed * animations.length * 1.1);
  };

  React.useEffect(() => {
    setBars(generateBars(barCount));
  }, [barCount]);

  return (
    <div className="container">
      <div className="SortingVisualizer">
        <Navbar
          startVisualization={startVisualization}
          isAnimating={isAnimating}
          setSpeed={(value) => setSpeed(value)}
          generateArray={() => setBars(generateBars(barCount))}
          setBarCount={(value) => setBarCount(value)}
        />
        <div
          className={"bars"}
          style={{
            width: `${config.barSize[0]}%`,
            height: `${config.barSize[1]}%`,
          }}
        >
          {bars.map((bar, i) => (
            <Bar key={i} bar={bar} />
          ))}
        </div>
      </div>
    </div>
  );
};
