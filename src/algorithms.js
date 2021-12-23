export function insertionSort(array){
    // Returns animations for the sort, doesn't modify input-array.
    let arr = Array.from(array, (bar) => bar.value);
    let animations = []
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
    return animations;
}
