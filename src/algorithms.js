export const insertionSort = (array) => {
    let comparisons = [];
    let arr = [...array];

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j;
        for (j = i-1; j > -1; j--) {
            if (arr[j] > key) {
                arr[j+1] = arr[j];
                comparisons.push({iVal: j, iKey: i, swap: "j"});
            }
            else {
                comparisons.push({iVal: j, iKey: i, swap: ""});
                break;
            }
        }
        arr[j+1] = key;
        comparisons.push({iVal: j, iKey: i, swap: "k"});
    }
    return [comparisons, arr];
}
