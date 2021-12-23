import React from 'react';
import {useState} from 'react';
import '../styles/Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRedoAlt, faPlayCircle} from '@fortawesome/free-solid-svg-icons'

export default function Navbar(props) {
    const ALGORITHMS = props.algorithms;
    const ANIMATION_SPEEDS = props.animationSpeeds;
    const [selectedAlgorithm, setSelectedAlgorithm] = useState({});
    const [active, setActive] = useState("");
    const minBars = props.barCountRange[0];
    const maxBars = props.barCountRange[1];
    const barCount = props.defaultBarCount;


    const selectAlgorithm = (key) => {
        const callback = ALGORITHMS.get(key);
        setSelectedAlgorithm({key, callback});
    }

    const setSpeed = (event) => {
        const idx = event.target.value;
        const timeoutMs = props.animationSpeeds[idx];
        console.log(`Nav: New Speed: ${timeoutMs}`);
        props.setSpeed(timeoutMs);
    }

    const setAmountOfBars = (event) => {
        props.setAmountOfBars(event.target.value);
    }

    const toggleActive = () => {
        if (active) setActive("");
        else setActive("active");
    }

    return (
        <nav>
            <div className={`wrapper-dropdown ${active}`}
                 onClick={() => toggleActive()}>
                <p>{selectedAlgorithm.key || "Select Algorithm"}</p>
                <ul className="dropdown">
                    {Array.from(ALGORITHMS.keys()).map(key => {
                        return (<li key={key} onClick={() => selectAlgorithm(key)}>
                            <p>{key}</p>
                        </li>);
                    })}
                </ul>
            </div>
            <div className="wrapper-slider">
                <label htmlFor="speedSlider" className="slider-label">Animation Speed</label>
                <input name="speedSlider" className="slider slider-speed" type="range" step={1}
                       min={0} max={ANIMATION_SPEEDS.length-1} defaultValue={props.defaultAnimationSpeed} onChange={setSpeed}/>
            </div>
            <div className="wrapper-slider">
                <label htmlFor="barSlider" className="slider-label">Bar Count</label>
                <input name="barSlider" className="slider slider-bars" type="range" step={2}
                       min={minBars} max={maxBars} defaultValue={barCount} onChange={setAmountOfBars}/>
            </div>
            <button className={`btn`} onClick={props.generateArray}>
                <FontAwesomeIcon className="fa-icon" icon={faRedoAlt}/>New Bars!
            </button>
            <button className={`btn`} onClick={selectedAlgorithm.callback}>
                <FontAwesomeIcon className="fa-icon" icon={faPlayCircle}/>Visualize!
            </button>
            <button className={`btn`} onClick={props.logArray}>
                Log Array
            </button>
        </nav>
    );
}
