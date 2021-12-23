/* ALL SORTING ALGORITHMS SHOULD RETURN ON FORM OF [sortedArray :number[], animations :Object[]],
 * sortedArray[] USED FOR TESTING AND animations[] USED FOR VISUALIZATION OF THE ALGORITHM.
 * INPUT ARRAY IS NOT MUTATED BY THE SORTING ALGORITHMS */

export function insertionSort(array){
    let arr = [...array];
    let animations = [];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j;
        for (j = i-1; j > -1; j--) {
            animations.push({comparison: [j, i]});
            if (arr[j] > key) {
                arr[j+1] = arr[j];
                animations.push({assign: [j+1, arr[j]]});
                animations.push({resetAssign: j+1});

                animations.push({resetComparison: [j, i]});
            }
            else {
                animations.push({resetComparison: [j, i]});
                break;
            }
        }
        arr[j+1] = key;
        animations.push({assign: [j+1, key]});
        animations.push({resetAssign: j+1});
    }
    return [arr, animations];
}

export function selectionSort(array) {
    let arr = [...array];
    let animations = [];
    for (let i=0; i<arr.length; i++) {
        let minIdx = i;
        animations.push({min: [minIdx]});
        for (let j=i+1; j<arr.length; j++) {
            animations.push({comparison: [j, minIdx]});
            animations.push({resetComparison: [j, minIdx]});
            if (arr[j] < arr[minIdx]) {
                animations.push({resetMin: [minIdx]});
                minIdx = j;
                animations.push({min: [minIdx]});
            }
        }
        animations.push({resetMin: [minIdx]});
        if (minIdx !== i) {
            let tmp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = tmp;
            animations.push({swap: [i, minIdx, arr[i], arr[minIdx]]});
            animations.push({resetSwap: [i, minIdx]});
        }
    }
    return [arr, animations];
}

export function quickSort(array) {
    let arr = [...array];
    let animations = [];
    let startIdx = 0;
    let endIdx = array.length - 1
    return recursiveQuicksort(array, startIdx, endIdx, animations);
}

function selectPivot(array, startIdx, endIdx, animations) {
    let startValue = array[startIdx];
    let endValue = array[endIdx];
    let midIdx = Math.floor(endIdx / 2);
    let midValue = array[midIdx];

    // Element start_value is the median
    if (midValue <= startValue && startValue < endValue ||
        endValue < startValue && startValue <= midValue) {
        let tmp = array[startIdx];
        array[startIdx] = array[endIdx];
        array[endIdx] = tmp;
    }
    // Element mid_value is the median
    else if (startValue < midValue && midValue < endValue ||
             endValue < midValue && midValue < startValue) {
        let tmp = array[midIdx];
        array[midIdx] = array[endIdx];
        array[endIdx] = tmp;
    }
    // Else end_value is the median and nothing should be done
    return array[endIdx]
}

function  partition(array, startIdx, endIdx, animations) {
    let pivotElement = selectPivot(array, startIdx, endIdx, animations);
    /* select_pivot() will place a median value at the end of the array
     * and return it, to minimize the risk of landing in worst case O(n^2) */
    let lowIdx = startIdx - 1;
    let highIdx = endIdx;

    /* Iterate all elements from left and right until they meet,
     * for-loop with break-statements is used for efficiency over while loop. */
    while (lowIdx < highIdx) {
        //for lowIdx in range(lowIdx + 1, highIdx + 1) {
        for (lowIdx = lowIdx + 1; lowIdx <= highIdx; lowIdx++) {
            // When the low counter has found a larger element than pivot it stops
            if (array[lowIdx] > pivotElement)
                break
        }
        //for highIdx in range(highIdx - 1, lowIdx - 1, -1) {
        for (highIdx = highIdx - 1; highIdx >= lowIdx; highIdx--) {
            // High counter stops when it hits a smaller element than pivot.
            if (array[highIdx] < pivotElement)
                break
        }

        // Elements are then swapped so that higher elements are to the right and lower to the left
        let tmp = array[lowIdx];
        array[lowIdx] = array[highIdx];
        array[highIdx] = tmp;
    }
    // When all elements have been iterated the pivot is placed at its sorted position
    let tmp = array[highIdx];
    array[highIdx] = array[endIdx];
    array[endIdx] = tmp;
    return highIdx
}

function recursiveQuicksort(array, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
        let pivotIdx = partition(array, startIdx, endIdx, animations);
        recursiveQuicksort(array, startIdx, pivotIdx-1, animations);
        recursiveQuicksort(array, pivotIdx+1, endIdx, animations);
    }
    return [array, animations];
}

export function heapSort(array) {
    let arr = [...array];
    let animations = []
    return [arr, animations];
}
