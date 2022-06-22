import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { config } from "../utils/config";
import type { Algorithm } from "../utils/algorithms";

const { algorithms } = config;

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
            <FontAwesomeIcon className="fa-icon" icon={faRedoAlt} />
            New Bars
          </button>
          <button
            className="btn btn-primary gap-1"
            onClick={visualize}
            disabled={isAnimating}
          >
            <FontAwesomeIcon className="fa-icon" icon={faPlayCircle} />
            Visualize!
          </button>
        </div>
      </div>
    </div>
  );
};
