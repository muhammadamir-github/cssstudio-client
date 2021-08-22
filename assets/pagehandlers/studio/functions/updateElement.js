function updateElement(elementtype,attr,value){
    var element = document.getElementById('preview'+elementtype);

    if(attr == 'slidePercentage'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-percentage',value);
    }

    if(attr == 'slideAction1'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-one',value);
    }

    if(attr == 'slideAction1Value'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-one-value',value);
    }

    if(attr == 'slideAction2'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-two',value);
    }

    if(attr == 'slideAction2Value'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-two-value',value);
    }

    if(attr == 'slideAction3'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-three',value);
    }

    if(attr == 'slideAction3Value'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-three-value',value);
    }

    if(attr == 'slideAction4'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-four',value);
    }

    if(attr == 'slideAction4Value'){
        document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-four-value',value);
    }

    if(attr == 'animatedr'){
        element.style.animationDuration = value;
        $('.apelement').css('animation-duration',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
    }

    if(attr == 'animated'){
        element.style.animationDelay = value;
        $('.apelement').css('animation-delay',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
    }

    if(attr == 'animatei'){
        element.style.animationIterationCount = value;
        $('.apelement').css('animation-iteration-count',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
    }

    if(attr == 'atiming'){
        var atimingcombobox_options = document.getElementById('timing').getElementsByTagName( 'options' )[0];

        element.style.animationTimingFunction = value;
        $('.apelement').css('animation-timing-function',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
        atimingcombobox_options.style.display = 'none';
        atimingcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
    }

    if(attr == 'fontsize'){
        var fontsizecombobox_options = document.getElementById('fontsize').getElementsByTagName( 'options' )[0];

        element.style.fontSize = value;
        fontsizecombobox_options.style.display = 'none';
        fontsizecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
    }

    /*if(attr == 'fontcombination'){
    var fontcombination_options = document.getElementById('fontcombination').getElementsByTagName( 'options' )[0];

    element.style.fontFamily = value;
    fontcombination_options.style.display = 'none';
    fontcombination_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}*/

if(attr == 'googlefonts'){
    var googlefontscombobox_options = document.getElementById('googlefonts').getElementsByTagName( 'options' )[0];

    var newvalue = value.replace(/ /g,"_");
    element.style.fontFamily = newvalue;
    googlefontscombobox_options.style.display = 'none';
    googlefontscombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontfamily'){
    var fontfamilycombobox_options = document.getElementById('fontfamily').getElementsByTagName( 'options' )[0];

    element.style.fontFamily = value;
    fontfamilycombobox_options.style.display = 'none';
    fontfamilycombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontweight'){
    var fontweightcombobox_options = document.getElementById('fontweight').getElementsByTagName( 'options' )[0];

    element.style.fontWeight = value;
    fontweightcombobox_options.style.display = 'none';
    fontweightcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontstyle'){
    var fontstylecombobox_options = document.getElementById('fontstyle').getElementsByTagName( 'options' )[0];

    element.style.fontStyle = value;
    fontstylecombobox_options.style.display = 'none';
    fontstylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontvariant'){
    var fontvariantcombobox_options = document.getElementById('fontvariant').getElementsByTagName( 'options' )[0];

    element.style.fontVariant = value;
    fontvariantcombobox_options.style.display = 'none';
    fontvariantcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontstretch'){
    var fontstretchcombobox_options = document.getElementById('fontstretch').getElementsByTagName( 'options' )[0];

    element.style.fontStretch = value;
    fontstretchcombobox_options.style.display = 'none';
    fontstretchcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'textalign'){
    var textaligncombobox_options = document.getElementById('textalign').getElementsByTagName( 'options' )[0];

    element.style.textAlign = value;
    textaligncombobox_options.style.display = 'none';
    textaligncombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'textdecoration'){
    var textdecorationcombobox_options = document.getElementById('textdecoration').getElementsByTagName( 'options' )[0];
    var textdecorationcombobox_selected = document.getElementById('textdecoration').getElementsByTagName( 'selected' )[0];

    element.style.textDecoration = value;
    textdecorationcombobox_options.style.display = 'none';
    textdecorationcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

    textdecorationcombobox_selected.getElementsByTagName( 'colordisplay' )[0].style.display = 'none';

    textdecorationcombobox_selected.getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
    textdecorationcombobox_selected.getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.fontSize = '';
    textdecorationcombobox_selected.getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.width = '';
}

if(attr == 'textdecorationstyle'){
    var textdecorationstylecombobox_options = document.getElementById('textdecorationstyle').getElementsByTagName( 'options' )[0];

    element.style.textDecorationStyle = value;
    textdecorationstylecombobox_options.style.display = 'none';
    textdecorationstylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'borderradius'){
    var borderradiuscombobox_options = document.getElementById('borderradius').getElementsByTagName( 'options' )[0];

    element.style.borderRadius = value;
    borderradiuscombobox_options.style.display = 'none';
    borderradiuscombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'bordersize'){
    var bordersizecombobox_options = document.getElementById('bordersize').getElementsByTagName( 'options' )[0];

    element.style.border = value + ' solid';
    bordersizecombobox_options.style.display = 'none';
    bordersizecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'borderstyle'){
    var borderstylecombobox_options = document.getElementById('borderstyle').getElementsByTagName( 'options' )[0];

    element.style.borderStyle = value;
    borderstylecombobox_options.style.display = 'none';
    borderstylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'boxshadow'){
    var boxshadowcombobox_options = document.getElementById('boxshadow').getElementsByTagName( 'options' )[0];
    element.style.boxShadow = value;

}

if(attr == 'display'){
    var displaycombobox_options = document.getElementById('display').getElementsByTagName( 'options' )[0];

    element.style.display = value;
    displaycombobox_options.style.display = 'none';
    displaycombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

}

if(attr == 'opacity'){
    var opacitycombobox_options = document.getElementById('opacity').getElementsByTagName( 'options' )[0];
    element.style.opacity = value;

}

if(attr == 'whitespace'){
    var whitespacecombobox_options = document.getElementById('whitespace').getElementsByTagName( 'options' )[0];

    element.style.whiteSpace = value;
    whitespacecombobox_options.style.display = 'none';
    whitespacecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

}

if(attr == 'textshadow'){
    var textshadowcombobox_options = document.getElementById('boxshadow').getElementsByTagName( 'options' )[0];
    element.style.textShadow = value;
}

if(attr == 'outlinewidth'){
    element.style.outlineWidth = value;
}

if(attr == 'outlinestyle'){
    var outlinestylecombobox_options = document.getElementById('outlinestyle').getElementsByTagName( 'options' )[0];

    element.style.outlineStyle = value;
    outlinestylecombobox_options.style.display = 'none';
    outlinestylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'margintop'){
    element.style.marginTop = value;
}

if(attr == 'marginleft'){
    element.style.marginLeft = value;
}

if(attr == 'marginbottom'){
    element.style.marginBottom = value;
}

if(attr == 'marginright'){
    element.style.marginRight = value;
}

if(attr == 'paddingtop'){
    element.style.paddingTop = value;
}

if(attr == 'paddingleft'){
    element.style.paddingLeft = value;
}

if(attr == 'paddingbottom'){
    element.style.paddingBottom = value;
}

if(attr == 'paddingright'){
    element.style.paddingRight = value;
}

if(attr == 'letterspace'){
    element.style.letterSpacing = value;
}

if(attr == 'rotateX'){
    var rotateY = '';
    var rotateX = '';
    var skewY = '';
    var skewX = '';
    var scaleX = '';
    var scaleY = '';
    var parts = element.style.transform.split(' ');

    if(element.style.transform.includes('rotateX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateX')){
                rotateX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateY')){
                rotateY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewX')){
                skewX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewY')){
                skewY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleX')){
                scaleX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleY')){
                scaleY = parts[i];
            }
        };

    }

    element.style.transform = 'translate(-50%,-50%) ' + 'rotateX('+value+'deg)' + rotateY + skewX + skewY  + scaleX + scaleY;

}

if(attr == 'rotateY'){
    var rotateY = '';
    var rotateX = '';
    var skewY = '';
    var skewX = '';
    var scaleX = '';
    var scaleY = '';
    var parts = element.style.transform.split(' ');

    if(element.style.transform.includes('rotateX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateX')){
                rotateX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateY')){
                rotateY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewX')){
                skewX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewY')){
                skewY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleX')){
                scaleX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleY')){
                scaleY = parts[i];
            }
        };

    }

    element.style.transform = 'translate(-50%,-50%) ' + rotateX + 'rotateY('+value+'deg)' + skewX + skewY  + scaleX + scaleY;

}

if(attr == 'skewX'){
    var skewY = '';
    var skewX = '';
    var rotateY = '';
    var rotateX = '';
    var scaleX = '';
    var scaleY = '';
    var parts = element.style.transform.split(' ');

    if(element.style.transform.includes('skewX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewX')){
                skewX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewY')){
                skewY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateX')){
                rotateX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateY')){
                rotateY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleX')){
                scaleX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleY')){
                scaleY = parts[i];
            }
        };

    }

    element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + 'skewX('+value+'deg)' + skewY  + scaleX + scaleY;

}

if(attr == 'skewY'){
    var skewY = '';
    var skewX = '';
    var rotateY = '';
    var rotateX = '';
    var scaleX = '';
    var scaleY = '';
    var parts = element.style.transform.split(' ');

    if(element.style.transform.includes('skewX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewX')){
                skewX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewY')){
                skewY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateX')){
                rotateX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateY')){
                rotateY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleX')){
                scaleX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleY')){
                scaleY = parts[i];
            }
        };

    }

    element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + 'skewY('+value+'deg)' + scaleX + scaleY;

}

if(attr == 'scaleX'){
    var skewY = '';
    var skewX = '';
    var rotateY = '';
    var rotateX = '';
    var scaleY = '';
    var scaleX = '';
    var parts = element.style.transform.split(' ');

    if(element.style.transform.includes('scaleX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleX')){
                scaleX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleY')){
                scaleY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateX')){
                rotateX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateY')){
                rotateY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewX')){
                skewX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewY')){
                skewY = parts[i];
            }
        };

    }

    element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + skewY + 'scaleX('+value+')' + scaleY;

}

if(attr == 'scaleY'){
    var skewY = '';
    var skewX = '';
    var rotateY = '';
    var rotateX = '';
    var scaleY = '';
    var scaleX = '';
    var parts = element.style.transform.split(' ');

    if(element.style.transform.includes('scaleX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleX')){
                scaleX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('scaleY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('scaleY')){
                scaleY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateX')){
                rotateX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('rotateY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('rotateY')){
                rotateY = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewX')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewX')){
                skewX = parts[i];
            }
        };

    }

    if(element.style.transform.includes('skewY')){

        for(var i = 0; i < parts.length; ++i) {
            if(parts[i].includes('skewY')){
                skewY = parts[i];
            }
        };

    }

    element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + skewY + scaleX+ 'scaleY('+value+')';

}
}
