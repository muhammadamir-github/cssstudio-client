function tb(element,property,value){

    if(property == 'gff'){

        var googlefonts = document.getElementById('googlefonts');

        googlefonts.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Google Fonts: ' + value;
        googlefonts.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
        updateElement(element,'googlefonts',value);

    }

    if(property == 'fs'){

        var fontsize = document.getElementById('fontsize');

        fontsize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Size: ' + value;
        fontsize.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
        fontsize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';

        updateElement(element,'fontsize',value);

    }

    /*if(property == 'fc'){

    var fontcombination = document.getElementById('fontcombination');

    fontcombination.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Combination: ' + value;
    fontcombination.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';

    updateElement(element,'fontcombination',value);

}*/

if(property == 'ff'){

    var fontfamily = document.getElementById('fontfamily');

    fontfamily.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Family: ' + value;
    updateElement(element,'fontfamily',value);

}

if(property == 'fw'){

    var fontweight = document.getElementById('fontweight');

    fontweight.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Weight: ' + value;
    updateElement(element,'fontweight',value);

}

if(property == 'fst'){

    var fontstyle = document.getElementById('fontstyle');

    fontstyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Style: ' + value;
    updateElement(element,'fontstyle',value);

}

if(property == 'fv'){

    var fontvariant = document.getElementById('fontvariant');

    fontvariant.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Variant: ' + value;
    updateElement(element,'fontvariant',value);

}

if(property == 'fstr'){

    var fontstretch = document.getElementById('fontstretch');

    fontstretch.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Stretch: ' + value;
    updateElement(element,'fontstretch',value);

}

if(property == 'ta'){

    var textalign = document.getElementById('textalign');

    textalign.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Text Align: ' + value;
    updateElement(element,'textalign',value);

}

if(property == 'td'){

    var textdecoration = document.getElementById('textdecoration');

    textdecoration.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Text Decoration: ' + value;
    updateElement(element,'textdecoration',value);

}

if(property == 'tds'){

    var textdecorationstyle = document.getElementById('textdecorationstyle');

    textdecorationstyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Text Decoration Style: ' + value;
    updateElement(element,'textdecorationstyle',value);

}

if(property == 'br'){

    var borderradius = document.getElementById('borderradius');

    borderradius.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Border Radius: ' + value;
    borderradius.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
    borderradius.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
    updateElement(element,'borderradius',value);

}

if(property == 'bs'){

    var bordersize = document.getElementById('bordersize');

    bordersize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Border Size: ' + value;
    bordersize.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
    bordersize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
    updateElement(element,'bordersize',value);

}

if(property == 'bsty'){

    var borderstyle = document.getElementById('borderstyle');

    borderstyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Border Style: ' + value;
    updateElement(element,'borderstyle',value);

}

if(property == 'osty'){
    var outlinestyle = document.getElementById('outlinestyle');

    outlinestyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Outline Style: ' + value;
    updateElement(element,'outlinestyle',value);
}

if(property == 'd'){

    var display = document.getElementById('display');

    display.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Display: ' + value;
    updateElement(element,'display',value);

}

if(property == 'ws'){

    var whitespace = document.getElementById('whitespace');

    whitespace.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'White Space: ' + value;
    whitespace.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
    whitespace.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
    updateElement(element,'whitespace',value);

}

if(property == 'bggex'){

    var endx = document.getElementById('endx');
    endx.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'End X: ' + value;

    var endxcombobox_options = document.getElementById('endx').getElementsByTagName( 'options' )[0];
    endxcombobox_options.style.display = 'none';
    endxcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

    document.getElementById('bggexvalue').innerText = value;

}

if(property == 'bggey'){

    var endy = document.getElementById('endy');
    endy.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'End Y: ' + value;

    var endycombobox_options = document.getElementById('endy').getElementsByTagName( 'options' )[0];
    endycombobox_options.style.display = 'none';
    endycombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

    document.getElementById('bggeyvalue').innerText = value;

}

if(property == 'animatet'){

    var timing = document.getElementById('timing');

    timing.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Timing: ' + value;
    timing.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
    updateElement(element,'atiming',value);

}

}
