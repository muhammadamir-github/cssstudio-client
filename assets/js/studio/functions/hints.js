function hints(action,shape){
    if(shape == 'triangle' || shape == 'trapezoid'){
        if(action == 'show'){
            $('#bordercolor').find('hintlabel').remove();
            var hint = document.createElement('hintlabel');
            hint.innerText = 'Background Color';
            $('#bordercolor').append(hint);
            $('#bordercolor').css({'border':'1px solid darkred'});
            $('#backgroundcolor').css({'opacity':'0.5','pointer-events':'none'});
        }
        if(action == 'hide'){
            $('#bordercolor').find('hintlabel').remove();
            $('#bordercolor').css({'border':'0px'});
            $('#backgroundcolor').css({'opacity':'1','pointer-events':'unset'});
            $('#bcd').css({'backgroundColor':'white'});
        }
    }
}
