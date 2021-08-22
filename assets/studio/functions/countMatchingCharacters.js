function countMatchingCharacters(string1,string2){
    var string1_characters = [];
    var string2_characters = [];
    var matchedcharacters = [];
    var unmatchedcharacters = [];

    for(var i = 0; i < string1.length; i++){
        string1_characters.push(string1.charAt(i));
    }

    for(var i2 = 0; i2 < string2.length; i2++){
        string2_characters.push(string2.charAt(i2));
    }

    var totallength = string1_characters.length + string2_characters.length;

    if(string1_characters.length > string2_characters.length){
        for(var o=0; o < string1_characters.length; o++){
            if(string1_characters.includes(string2_characters[o])){
                if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[o] == null){

                }else{
                    matchedcharacters.push(string2_characters[o]);
                }
            }
            else{
                if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[o] == null){

                }else{
                    unmatchedcharacters.push(string2_characters[o]);
                }
            }
        }
    }

    if(string2_characters.length > string1_characters.length){
        for(var o=0; o < string2_characters.length; o++){
            if(string2_characters.includes(string1_characters[o])){
                if(string1_characters[o] == '' || string1_characters[o] == ' ' || string1_characters[o] == null){

                }else{
                    matchedcharacters.push(string1_characters[o]);
                }
            }
            else{
                if(string1_characters[o] == '' || string1_characters[o] == ' ' || string1_characters[o] == null){

                }else{
                    unmatchedcharacters.push(string1_characters[o]);
                }
            }
        }
    }

    if(string1_characters.length === string2_characters.length){
        for(var o=0; o < string1_characters.length; o++){
            if(string1_characters.includes(string2_characters[o])){
                if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[0] == null){

                }else{
                    matchedcharacters.push(string2_characters[o]);
                }
            }
            else{
                if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[0] == null){

                }else{
                    unmatchedcharacters.push(string2_characters[o]);
                }
            }
        }
    }

    matchedcharacters.join('').split('');
    var matchingPercentage = percentage(matchedcharacters.length,totallength);
    //console.log(matchedcharacters + ' & ' + totallength + ' = ' + matchingPercentage);

    if(matchingPercentage > 40){
        //console.log(matchedcharacters + ' > ' + unmatchedcharacters + ' = ' + matchingPercentage + '% Acurate Match.');
        return true;//more matches than half characters.
    }

    if(matchingPercentage < 40){
        //console.log(matchedcharacters + ' < ' + unmatchedcharacters + ' = ' + matchingPercentage + '% Acurate Match.');
        return false;//less matches than half characters.
    }

}
