function textToColorPickerColor(e,property,elem){
    var colorpicker_box = e.parentElement.getElementsByClassName('colorpickerbox')[0];
    var colordisplay = e.parentElement.parentElement.getElementsByTagName('colordisplay')[0];

    if(elem == '.selected'){
        var element = document.getElementsByClassName('selected')[0];
    }else{
        var element = document.getElementById('preview'+elem);
    }

    var color;

    var text = e.value;

    if(text.includes('Color Rgba:') || text.includes('Color Hex:')){
        color = text.split(':')[1];
    }else{
        if(text.includes('(') || text.includes(')') || text.includes('rgba')){
            color = 'rgba('+text.split('(')[1];
        }

        if(text.includes('#')){
            color = text;
        }
    }

    colordisplay.style.backgroundColor = color;

    if(text.includes('Color Rgba:') || text.includes('(') || text.includes(')') || text.includes('rgba')){
        e.value = 'Color Rgba: rgba('+text.split('(')[1];
    }else{
        if(text.includes('#')){
            e.value = 'Color Hex: #'+text.split('#')[1];
        }
    }

    if(property.includes('animation') || property.includes('backgroundGradient')){

    }else{
        $(element).css(property,color);
    }
}
