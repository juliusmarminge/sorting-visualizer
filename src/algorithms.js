/* ALL SORTING ALGORITHMS SHOULD RETURN ON FORM OF [sortedArray :number[], animations :Object[]],
 * sortedArray USED FOR TESTING, animations USED FOR VISUALIZATION OF THE ALGORITHM. INPUT ARRAY
 * IS NOT MUTATED BY THE SORTING ALGORITHMS */

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
                animations.push({swap: [j+1, j, arr[j]]});
                animations.push({resetSwap: [j+1, j]});

                animations.push({resetComparison: [j, i]});
            }
            else {
                animations.push({resetComparison: [j, i]});
                break;
            }
        }
        arr[j+1] = key;
        animations.push({swap: [j+1, i, key]});
        animations.push({resetSwap: [j+1, i]});
    }
    return [arr, animations];
}

export function mergeSort(array) {
    let arr = [...array];
    let animations = [];

    return [arr, animations];
}

export function heapSort(array) {
    let arr = [...array];
    let animations = []
    return [arr, animations];
}
