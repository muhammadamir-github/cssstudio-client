function stringToArray(string,splitCharacter){
    var array = [''];
    var splits = string.split(splitCharacter);

    for(var i=0; i < splits.length; i++){
        array.push(splits[i]);
    }

    return array;
}
