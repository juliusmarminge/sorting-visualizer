import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { config } from "../utils/config";
import type { Algorithm } from "../utils/algorithms";

const { algorithms } = config;

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const Navbar: React.FC<{
  startVisualization: (algorithm: Algorithm) => void;
  isAnimating: boolean;
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  generateArray: () => void;
  barCount: number;
  setBarCount: Dispatch<SetStateAction<number>>;
}> = ({
  startVisualization,
  isAnimating,
  speed,
  setSpeed,
  generateArray,
  barCount,
  setBarCount,
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);

  const selectAlgorithm = (name: string) => {
    const entry = algorithms.find((alg) => alg.displayName === name);
    if (entry) setSelectedAlgorithm(entry);
  };

  const visualize = () => {
    const { algorithm } = selectedAlgorithm;
    startVisualization(algorithm);
  };

  return (
    <div className="navbar bg-base-300">
      <div className="w-4/5 mx-auto flex gap-16 justify-evenly">
        {/** ALGORITHM SELECTOR */}
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1 w-max btn-primary">
            {selectedAlgorithm.displayName || "Select Algorithm"}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
          >
            {algorithms.map((algorithm, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => selectAlgorithm(algorithm.displayName)}
                >
                  <a>{algorithm.displayName}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {/** SPEED SLIDER */}
        <div className="form-control flex-1">
          <label className="label" htmlFor="animation-speed-slider">
            <span className="label-text">Animation Speed</span>
          </label>
          <input
            name="animation-speed-slider"
            className="range range-xs range-primary direction-rtl"
            type="range"
            min={1}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(e.target.valueAsNumber)}
          />
        </div>
        {/** BAR COUNT SLIDER */}
        <div className="form-control flex-1">
          <label className="label" htmlFor="bar-count-slider">
            <span className="label-text">Bar Count</span>
          </label>
          <input
            name="bar-count-slider"
            className="range range-xs range-primary"
            type="range"
            min={9}
            max={85}
            value={barCount}
            onChange={(e) => setBarCount(e.target.valueAsNumber)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-primary gap-1"
            onClick={generateArray}
            disabled={isAnimating}
          >
            <RefreshIcon />
            New Bars
          </button>
          <button
            className="btn btn-primary gap-1"
            onClick={visualize}
            disabled={isAnimating}
          >
            <PlayIcon />
            Visualize!
          </button>
        </div>
      </div>
    </div>
  );
};
