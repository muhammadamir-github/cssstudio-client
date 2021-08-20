function shape(el,sh){
    var element = document.getElementById('preview'+el);

    if(sh == 'square'){
        element.style.width = '125px';
        element.style.height = '125px';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'rectangle'){
        element.style.width = '175px';
        element.style.height = '100px';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'circle'){
        element.style.width = '150px';
        element.style.height = '150px';
        element.style.borderRadius = '50%';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'oval'){
        element.style.width = '225px';
        element.style.height = '125px';
        element.style.borderRadius = '50%';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'trapezoid'){
        element.style.width = '100px';
        element.style.height = '0px';
        element.style.borderBottom = '100px solid black';
        element.style.borderLeft = '50px solid transparent';
        element.style.borderRight = '50px solid transparent';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.borderTop = '0px';
        element.style.padding = '0px';
        element.style.borderRadius = '0px';
        hints('hide','triangle');
        hints('show','trapezoid');
    }

    if(sh == 'parallelogram'){
        element.style.width = '175px';
        element.style.height = '125px';
        element.style.transform = 'translate(-50%,-50%) skewX(20deg)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        document.getElementById('skewbox').getElementsByTagName('div')[0].getElementsByTagName('input')[0].value = '20';
        hints('hide','triangle');
    }

    if(sh == 'triangle'){
        element.style.content = ' ';
        element.style.width = '0px';
        element.style.height = '0px';
        element.style.borderBottom = '140px solid '+element.style.borderColor;
        element.style.borderLeft = '70px solid transparent';
        element.style.borderRight = '70px solid transparent';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderTop = '0px';
        element.style.padding = '0px';
        element.style.borderRadius = '0px';

        $('#bordercolor').find('hintlabel').remove();
        hints('show','triangle');

    }

    document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
    setTimeout(function(){document.getElementsByClassName('shapechangediv')[0].style.display = 'none';},500);
}
