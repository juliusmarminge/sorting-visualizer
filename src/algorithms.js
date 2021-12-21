export function* insertionSort(array){
    //let arr = [...array];

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j;
        for (j = i-1; j > -1; j--) {
            if (array[j] > key) {
                array[j+1] = array[j];
            }
            else {
                break;
            }
            yield* array;
        }
        array[j+1] = key;
        //yield i;
    }
    return array;
}
