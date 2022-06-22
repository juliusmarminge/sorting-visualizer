import React from "react";
import { Navbar } from "./Navbar";
import { Bar } from "./Bar";
import type { Algorithm } from "../utils/algorithms";
import { generateBars } from "../utils/generate-bars";
import { handleAnimation } from "../utils/handle-animation";

export const SortingVisualizer: React.FC = () => {
  const [barCount, setBarCount] = React.useState(55);
  const [bars, setBars] = React.useState(generateBars(barCount));
  const [speed, setSpeed] = React.useState(10); // ms between animations
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
    <div>
      <div className="w-full h-screen flex flex-col items-center">
        <Navbar
          startVisualization={startVisualization}
          isAnimating={isAnimating}
          speed={speed}
          setSpeed={setSpeed}
          generateArray={() => setBars(generateBars(barCount))}
          barCount={barCount}
          setBarCount={setBarCount}
        />
        <div className={`flex justify-center w-[80%] h-[90%] gap-[1px]`}>
          {bars.map((bar, i) => (
            <Bar key={i} bar={bar} />
          ))}
        </div>
      </div>
    </div>
  );
};
