import React from 'react';
import Navbar from './Navbar';
import Bar from './Bar';
import {insertionSort, mergeSort} from '../algorithms';
import '../styles/SortingVisualizer.css'

const RANGE = 100;
const BARS_SZ = [80, 90];
const BAR_COUNT_RANGE = [11, 83];
const DEFAULT_BAR_COUNT = 51;
const ANIMATION_SPEEDS = [100, 20, 2];
const DEFAULT_SPEED = 2;

let unsorted = []

function hasSameValues (arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    const arr1S = [...arr1].sort((a, b) => a - b);
    const arr2S = [...arr2].sort((a, b) => a - b);
    for (let i=0; i<arr1S.length; i++)
        if (arr1S[i] !== arr2S[i])
            return false;
    return true;
}

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: DEFAULT_SPEED,
            array: [],
            barCount: DEFAULT_BAR_COUNT,
        }
    }

    componentDidMount() {
        this.generateArray();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.barCount !== this.state.barCount)
            this.generateArray();
    }

    startInsertionSort = () => {
        let values = Array.from(this.state.array, (bar) => bar.value);
        const animations = insertionSort(values)[1];
        this.startAnimation(animations);
    }

    startQuickSort = () => {
        let values = Array.from(this.state.array, (bar) => bar.value);
        const animations = mergeSort(values)[1];
        this.startAnimation(animations);
    }

    startHeapSort = () => {

    }

    startAnimation(animations) {
        let tmpArray = [...this.state.array];

        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            setTimeout(() => {
                if (animation.hasOwnProperty("comparison")) {
                    tmpArray[animation["comparison"][0]].isCompared = true;
                    tmpArray[animation["comparison"][1]].isCompared = true;
                }
                else if (animation.hasOwnProperty("swap")) {
                    tmpArray[animation["swap"][0]].isSwapped = true;
                    tmpArray[animation["swap"][1]].isSwapped = true;
                    tmpArray[animation["swap"][0]].value = animation["swap"][2];
                }
                else if (animation.hasOwnProperty("resetComparison")) {
                    tmpArray[animation["resetComparison"][0]].isCompared = false;
                    tmpArray[animation["resetComparison"][1]].isCompared = false;
                }
                else if (animation.hasOwnProperty("resetSwap")) {
                    tmpArray[animation["resetSwap"][0]].isSwapped = false;
                    tmpArray[animation["resetSwap"][1]].isSwapped = false;
                }
                else console.log("animation: Unreachable");
                this.setState({array: tmpArray});
            }, this.state.speed * i);
        }
    }

    generateArray = () => {
        let newArr = [];
        for (let i = 0; i < this.state.barCount; i++)
        {
            let value = Math.floor(Math.random() * RANGE + 1);
            newArr[i] = {
                value,
                isCompared: false,
                isSwapped: false,
            }
        }
        this.setState({array: newArr});
        unsorted = Array.from([...newArr], (bar) => bar.value);
    }

    isSorted() {
        const barValues = Array.from(this.state.array, (bar) => bar.value);
        const sortedValues = [...barValues].sort((a, b) => a - b);
        for (let i=0; i<barValues.length; i++) {
            if (barValues[i] !== sortedValues[i])
                return false;
        }
        return true;
    }

    logArray = () => {
        const currVals = Array.from([...this.state.array], (bar) => bar.value);
        const startVals = [...unsorted];

        console.log(`Start array: ${startVals}`);
        console.log(`Current Array: ${currVals}`);
        console.log(`has same values: ${hasSameValues(currVals, startVals)}`)
        console.log(`Current is sorted: ${this.isSorted()}`)
    }

    ALGORITHMS = new Map([
        ["InsertionSort", this.startInsertionSort],
        ["Quick Sort", this.startQuickSort],
        ["Heap Sort", this.startHeapSort],
    ]);

    render() {
        let array = this.state.array;
        return(
            <div className={"container"}>
                <div className="SortingVisualizer">
                    <Navbar
                        algorithms={this.ALGORITHMS}
                        animationSpeeds={ANIMATION_SPEEDS}
                        setSpeed={(value) => this.setState({speed: value})}
                        generateArray={() => this.generateArray()}
                        setAmountOfBars={(value) => this.setState({barCount: value})}
                        barCountRange={BAR_COUNT_RANGE}
                        defaultBarCount={DEFAULT_BAR_COUNT}
                        defaultAnimationSpeed={this.state.speed}
                        logArray={() => this.logArray()}
                    />
                    <div className={"bars"} style={{width: `${BARS_SZ[0]}%`, height: `${BARS_SZ[1]}%`}}>
                        {array.map((bar, index) => {
                            return <Bar
                                value={bar.value}
                                isCompared={bar.isCompared}
                                isSwapped={bar.isSwapped}
                                key={index}
                            />
                        })}

                    </div>
                </div>
            </div>
        );
    }
}

export default SortingVisualizer;
