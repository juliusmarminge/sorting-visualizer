import React from 'react';
import {useState} from 'react';
import '../styles/Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRedoAlt, faPlayCircle} from '@fortawesome/free-solid-svg-icons'

export default function Navbar(props) {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState({name: "", callback:()=>{}});
    const [active, setActive] = useState("");
    const {
        algorithms,
        startVisualization,
        animationSpeeds,
        isAnimating,
        setSpeed,
        generateArray,
        setAmountOfBars,
        barCountRange,
        defaultBarCount,
        defaultAnimationSpeed,
        logArray,
    } = props;
    const defaultAnimationSpeedIndex = animationSpeeds.indexOf(defaultAnimationSpeed);

    const selectAlgorithm = (index) => {
        const name = Array.from(Object.keys(algorithms))[index];
        const callback = algorithms[name];
        setSelectedAlgorithm({name, callback});
    }

    const visualize = () => {
        const callback = selectedAlgorithm.callback;
        startVisualization(callback);
    }

    const updateSpeed = (event) => {
        const idx = event.target.value;
        const timeoutMs = animationSpeeds[idx];
        setSpeed(timeoutMs);
    }

    const updateAmountOfBars = (event) => {
        const newBarCount = event.target.value;
        setAmountOfBars(newBarCount);
    }

    const toggleActive = () => {
        if (active) setActive("");
        else setActive("active");
    }

    return (
        <nav>
            <div className={`wrapper-dropdown ${active}`}
                 onClick={() => toggleActive()}>
                <p>{selectedAlgorithm.name || "Select Algorithm"}</p>
                <ul className="dropdown">
                    {Array.from(Object.keys(algorithms)).map((key, idx) => {
                        return (<li key={idx} onClick={() => selectAlgorithm(idx)}>
                            <p>{key}</p>
                        </li>);
                    })}
                </ul>
            </div>
            <div className="wrapper-slider">
                <label htmlFor="speedSlider" className="slider-label">Animation Speed</label>
                <input name="speedSlider" className="slider slider-speed" type="range" step={1}
                       min={0} max={animationSpeeds.length-1} defaultValue={defaultAnimationSpeedIndex} onChange={updateSpeed}/>
            </div>
            <div className="wrapper-slider">
                <label htmlFor="barSlider" className="slider-label">Bar Count</label>
                <input name="barSlider" className="slider slider-bars" type="range" step={2}
                       min={barCountRange[0]} max={barCountRange[1]} defaultValue={defaultBarCount} onChange={updateAmountOfBars}/>
            </div>
            <button className={`btn ${isAnimating ? "disabled" : ""}`} onClick={generateArray} disabled={isAnimating}>
                <FontAwesomeIcon className="fa-icon" icon={faRedoAlt}/>New Bars
            </button>
            <button className={`btn ${isAnimating || !selectedAlgorithm.name ? "disabled" : ""}`} onClick={visualize} disabled={isAnimating || !selectedAlgorithm.name}>
                <FontAwesomeIcon className="fa-icon" icon={faPlayCircle}/>Visualize!
            </button>
            <button className={`btn ${isAnimating ? "disabled" : ""}`} onClick={logArray} disabled={isAnimating}>
                Log Array
            </button>
        </nav>
    );
}
