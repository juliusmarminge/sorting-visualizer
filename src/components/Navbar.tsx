import React from "react";
import { useState } from "react";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { config } from "../utils/config";
import type { Algorithm } from "../utils/algorithms";

const {
  algorithms,
  animationSpeeds,
  defaultSpeed,
  defaultBarCount,
  barCountRange,
} = config;

export const Navbar: React.FC<{
  startVisualization: (algorithm: Algorithm) => void;
  isAnimating: boolean;
  setSpeed: (speed: number) => void;
  generateArray: () => void;
  setBarCount: (amount: number) => void;
}> = ({
  startVisualization,
  isAnimating,
  setSpeed,
  generateArray,
  setBarCount,
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const defaultAnimationSpeedIndex = animationSpeeds.indexOf(defaultSpeed);

  const selectAlgorithm = (name: string) => {
    const entry = algorithms.find((alg) => alg.displayName === name);
    if (entry) setSelectedAlgorithm(entry);
  };

  const visualize = () => {
    const { algorithm } = selectedAlgorithm;
    startVisualization(algorithm);
  };

  const updateSpeed = (idx: number) => {
    const timeoutMs = animationSpeeds[idx];
    setSpeed(timeoutMs);
  };

  const updateBarCount = (count: number) => {
    setBarCount(count);
  };

  return (
    <nav>
      <div
        className={`wrapper-dropdown ${isDropdownActive ? "active" : ""}`}
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        <p>{selectedAlgorithm.displayName || "Select Algorithm"}</p>
        <ul className="dropdown">
          {algorithms.map((algorithm, idx) => {
            return (
              <li
                key={idx}
                onClick={() => selectAlgorithm(algorithm.displayName)}
              >
                <p>{algorithm.displayName}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="wrapper-slider">
        <label htmlFor="speedSlider" className="slider-label">
          Animation Speed
        </label>
        <input
          name="speedSlider"
          className="slider slider-speed"
          type="range"
          step={1}
          min={0}
          max={animationSpeeds.length - 1}
          defaultValue={defaultAnimationSpeedIndex}
          onChange={(e) => updateSpeed(parseFloat(e.target.value))}
        />
      </div>
      <div className="wrapper-slider">
        <label htmlFor="barSlider" className="slider-label">
          Bar Count
        </label>
        <input
          name="barSlider"
          className="slider slider-bars"
          type="range"
          step={2}
          min={barCountRange[0]}
          max={barCountRange[1]}
          defaultValue={defaultBarCount}
          onChange={(e) => setBarCount(e.target.valueAsNumber)}
        />
      </div>
      <button
        className={`btn ${isAnimating ? "disabled" : ""}`}
        onClick={generateArray}
        disabled={isAnimating}
      >
        <FontAwesomeIcon className="fa-icon" icon={faRedoAlt} />
        New Bars
      </button>
      <button
        className={`btn ${isAnimating ? "disabled" : ""}`}
        onClick={visualize}
        disabled={isAnimating}
      >
        <FontAwesomeIcon className="fa-icon" icon={faPlayCircle} />
        Visualize!
      </button>
    </nav>
  );
};
