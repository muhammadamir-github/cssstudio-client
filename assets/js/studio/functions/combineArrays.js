function combineArrays(array1,array2){
    var array = [''];

    for(var i=0; i < array1.length; i++){
        array.push(array1[i]);
    }

    for(var o=0; o < array2.length; o++){
        array.push(array2[o]);
    }

    return array;
}
