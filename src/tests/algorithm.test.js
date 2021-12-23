import {insertionSort,
        selectionSort,
        quickSort,
        heapSort}
    from "../algorithms.js";

const ITERATIONS = 1000;
const MAX_SIZE = 1000;
const MAX_VAL = 10000;
const ALGORITHMS = {
    "InsertionSort": insertionSort,
    "SelectionSort": selectionSort,
    //"QuickSort": quickSort,
    //"HeapSort": heapSort,
};

describe("All algorithms can sort empty arrays", () => {
    for (let algName in ALGORITHMS) {
        test(`${algName} can sort empty array`, () => {
            let arr = [];
            expect(ALGORITHMS[algName](arr)[0]).toEqual(arr);
        });
    }
});

describe("All algorithms can sort arrays containing 1 element", () => {
   for (let algName in ALGORITHMS) {
       test(`${algName} can sort arrays containing 1 element`, () => {
           for (let i=0; i<ITERATIONS; i++) {
               let arr = [];
               arr.push(Math.random()*MAX_VAL);
               expect(ALGORITHMS[algName](arr)[0]).toEqual(arr);
           }
       });
   }
});

describe("All algorithms can sort arbitrary arrays", () => {
    for (let algName in ALGORITHMS) {
        test(`${algName} can sort arbitrary array`, () => {
            for (let i=0; i<ITERATIONS; i++) {
                let arr = [];
                const len = Math.floor(Math.random()*MAX_SIZE);
                for (let j=0; j<len; j++) {
                    arr.push(Math.random() * MAX_VAL);
                }
                let sorted = [...arr].sort((a, b) => a - b);
                expect(ALGORITHMS[algName](arr)[0]).toEqual(sorted);
            }
        });
    }
});
