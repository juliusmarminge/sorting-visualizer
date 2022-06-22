import React from "react";
import { Navbar } from "./Navbar";
import { Bar, type BarType } from "./Bar";
import { config } from "../utils/config";
import type { Algorithm } from "../utils/algorithms";
import "../styles/SortingVisualizer.css";
import { generateBars } from "../utils/generate-bars";
import { handleAnimation } from "../utils/handle-animation";

export const SortingVisualizer: React.FC = () => {
  const [barCount, setBarCount] = React.useState(config.defaultBarCount);
  const [bars, setBars] = React.useState(generateBars(barCount));
  const [speed, setSpeed] = React.useState(config.defaultSpeed);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const startVisualization = (algorithm: Algorithm) => {
    const barValues = Array.from(bars, (bar) => bar.value);
    const animations = algorithm(barValues)[1];

    setIsAnimating(true);
    animations.forEach((animation, i) => {
      setTimeout(() => {
        setBars((prev) => handleAnimation(prev, animation));
      }, speed * i);
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, speed * animations.length);
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
