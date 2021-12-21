import React from 'react';
import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import {insertionSort} from '../algorithms';
import '../styles/SortingVisualizer.css'

const RANGE = 20;
const BARS_SZ = [80, 80];

function SortingVisualizer() {
    const ANIMATION_SPEEDS = new Map([
        ["Slow", 1000],
        ["Medium", 80],
        ["Fast", 20]
    ]);

    const [speed, setSpeed] = useState(ANIMATION_SPEEDS.get("Slow") || 20);
    const [array, setArray] = useState([]);
    const [barCount, setBarCount] = useState(20);

    const startInsertionSort = () => {
        const iS = insertionSort(array);
        for (let value of iS)
            console.log(value);
        /*let i = 0;
        while (!iS.next().done) {
            setTimeout(() => {
                for (let value of iS)
                    console.log(value);
                setArray(array);
            }, 100 * i);
            i++;
        }
        //setArray(array);*/
    }

    const startQuickSort = () => {
        return 0;
    }

    const setAmountOfBars = (value) => {
        setBarCount(value);
        generateArray();
    }

    const generateArray = () => {
        let arr = Array.from({length: barCount}, () => Math.floor(Math.random() * RANGE + 1));
        setArray(arr);
        console.log(arr);
    }
    useEffect(generateArray, [barCount]);

    const ALGORITHMS = new Map([
        ["InsertionSort", startInsertionSort],
        ["Quick Sort", startQuickSort],
    ]);
    return (
        <div className={"container"}>
            <div className="SortingVisualizer">
                <Navbar
                    algorithms={ALGORITHMS}
                    animationSpeeds={ANIMATION_SPEEDS}
                    setSpeed={setSpeed}
                    generateArray={generateArray}
                    setAmountOfBars={setAmountOfBars}
                />
                <div className={"bars"} style={{width: `${BARS_SZ[0]}%`, height: `${BARS_SZ[1]}%`}}>
                    {array.map((value, index) =>
                    {
                        return <div className={`bar`} key={index} style={{height: `${value}%`}} />
                    })}

                </div>
            </div>
        </div>
    );
}



export default SortingVisualizer;
