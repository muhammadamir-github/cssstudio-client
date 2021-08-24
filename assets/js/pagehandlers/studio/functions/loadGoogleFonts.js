function loadGoogleFonts(response,element,mode){
    Globals.pageHandler.WebFonts = JSON.parse(response).items;

    var fonts = document.createElement('combobox');
    fonts.setAttribute('id','googlefonts');

    if(mode == 'elementCreator'){
        fonts.style.left = '50%';
        fonts.style.top = '50%';
        fonts.style.marginTop = '25px';
        fonts.style.marginLeft = '0px';
        fonts.style.transform = 'translate(-50%,-50%)';
    }

    var fonts_customedit = document.createElement('input');
    fonts_customedit.classList.add('custom');

    var fonts_selected = document.createElement('selected');
    var fonts_selected_a = document.createElement('a');
    var fonts_selected_a_span = document.createElement('span');
    fonts_selected_a_span.innerText = 'Google Fonts';

    fonts_selected_a.style.borderTop = '#f4c20d 3px solid';
    fonts_selected_a.style.borderRight = '#3cba54 3px solid';
    fonts_selected_a.style.borderLeft = '#4885ed 3px solid';
    fonts_selected_a.style.borderBottom = '#db3236 3px solid';

    var fonts_options = document.createElement('options');
    var fonts_options_ul = document.createElement('ul');
    fonts_options_ul.style.overflowY = 'scroll';
    fonts_options_ul.style.overflowX = 'hidden';
    fonts_options_ul.style.height = '300px';
    fonts_options_ul.style.top = '-315px';
    fonts_options_ul.style.borderTopRightRadius = '10px';
    fonts_options_ul.style.borderTopLeftRadius = '10px';
    fonts_options_ul.style.borderBottomRightRadius = '0px';
    fonts_options_ul.style.borderBottomLeftRadius = '0px';
    fonts_options_ul.style.minWidth = '0';

    if(mode == 'webpageBuilder'){
        fonts.style.marginTop = '0px';
        fonts_options_ul.style.height = '400px';
        fonts_options_ul.style.top = '60px';
        fonts_options_ul.style.borderTopRightRadius = '0px';
        fonts_options_ul.style.borderTopLeftRadius = '0px';
        fonts_options_ul.style.borderBottomRightRadius = '10px';
        fonts_options_ul.style.borderBottomLeftRadius = '10px';
    }

    var items = JSON.parse(response).items;
    for(var i=0; i < items.length; i++){
        for(var o=0; o < items[i].variants.length; o++){

            var fontfamily = items[i].family + ' ' + items[i].variants[o];
            fontfamily = fontfamily.replace(/ /g,"_");

            /*var css = style.innerText + '\n' + '@font-face { \n' + 'font-family:' + fontfamily + ';\n'  + 'src: url("' + items[i].files[items[i].variants[o]] +'") ' + 'format("truetype"); \n' + '}';

            if(items[i].variants[o] == '100' || items[i].variants[o] == '200' || items[i].variants[o] == '300' || items[i].variants[o] == '400' || items[i].variants[o] == '500' || items[i].variants[o] == '600' || items[i].variants[o] == '700' || items[i].variants[o] == '800' || items[i].variants[o] == '900' || items[i].variants[o] == '1000' || items[i].variants[o] == 'bold' || items[i].variants[o] == 'bolder'){
            css = style.innerText + '\n' + '@font-face { \n' + 'font-family:' + fontfamily + ';\n'  + 'src: url("' + items[i].files[items[i].variants[o]] +'") ' + 'format("truetype"); \n' + 'font-weight: ' + items[i].variants[o] + ';\n' + '}';
        }

        if(items[i].variants[o] == '100italic' || items[i].variants[o] == '200italic' || items[i].variants[o] == '300italic' || items[i].variants[o] == '400italic' || items[i].variants[o] == '500italic' || items[i].variants[o] == '600italic' || items[i].variants[o] == '700italic' || items[i].variants[o] == '800italic' || items[i].variants[o] == '900italic' || items[i].variants[o] == '1000italic'){
        css = style.innerText + '\n' + '@font-face { \n' + 'font-family:' + fontfamily + ';\n'  + 'src: url("' + items[i].files[items[i].variants[o]] +'") ' + 'format("truetype"); \n' + 'font-weight: ' + items[i].variants[o].split('italic')[0] + ';\n' + 'font-style: italic; \n' + '}';
    }

    stylecss = stylecss + css;*/

    var fonts_options_1 = document.createElement('li');

    var fonts_options_1_a = document.createElement('a');
    fonts_options_1_a.innerText = items[i].family + ' ' + items[i].variants[o];

    var fonts_options_1_a_span = document.createElement('span');
    fonts_options_1_a_span.innerText = items[i].family + ' ' + items[i].variants[o];
    fonts_options_1_a_span.setAttribute('class','value');

    fonts_options_1_a.appendChild(fonts_options_1_a_span);
    fonts_options_1.appendChild(fonts_options_1_a);

    if(mode == 'elementCreator'){
        fonts_options_1.addEventListener('click',function(){
            tb(element,'gff',this.getElementsByTagName('a')[0].innerText);
        });
    }else{
        if(mode == 'webpageBuilder'){
            (function(fontfamily,fonts_options_1,element,fonts_selected_a_span,fonts_options){
                fonts_options_1.addEventListener('click',function(){
                    element.style.fontFamily = fontfamily;
                    fonts_selected_a_span.innerText = 'Google Fonts: '+fontfamily;
                    fonts_options.style.display = 'none';
                });
            })(fontfamily,fonts_options_1,element,fonts_selected_a_span,fonts_options);
        }
    }

    (function(fontfamily,fonts_options_1_a,element,fonts_options_ul){

        if(mode == 'elementCreator'){
            fonts_options_1.addEventListener('mouseover',function(){
                fonts_options_1_a.style.fontFamily = fontfamily;
                document.getElementById('preview'+element).style.fontFamily = fontfamily;
            });
        }else{
            fonts_options_1.addEventListener('mouseover',function(){
                fonts_options_1_a.style.fontFamily = fontfamily;
                element.style.fontFamily = fontfamily;
            });
        }

        fonts_options_1.addEventListener('mouseout',function(){
            fonts_options_1_a.style.fontFamily = 'sans-serif';
        });

    })(fontfamily,fonts_options_1_a,element,fonts_options_ul);

    fonts_options_ul.appendChild(fonts_options_1);
}
}

fonts_selected_a.appendChild(fonts_selected_a_span);
fonts_selected.appendChild(fonts_selected_a);
//fonts_selected.appendChild(fonts_customedit);

fonts_options.appendChild(fonts_options_ul);

fonts.appendChild(fonts_selected);
fonts.appendChild(fonts_options);

//-----------------Event Handlers--------------------

fonts_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

        if(fonts_options.style.display == 'block'){

            fonts_options.style.display = 'none';
            fonts_options_ul.style.display = 'none';
            //fonts_customedit.style.display = 'none';
            fonts_selected_a_span.style.textAlign = '';

        }else{

            fonts_options.style.display = 'block';
            fonts_options_ul.style.display = 'block';
            //fonts_customedit.style.display = 'block';
            fonts_selected_a_span.style.textAlign = 'left';

        }

    }else{

    }

});

/*var style = document.createElement('link');
style.href = '../assets/css/fonts.css';
style.rel = 'stylesheet';
style.type = 'text/css';*/

//$('head').append(style);

if(mode == 'elementCreator'){
    setTimeout(function(){document.getElementById('googlefontssdiv').appendChild(fonts);},5500);
}else{
    if(mode == 'webpageBuilder'){
        setTimeout(function(){document.getElementsByClassName('fontManager')[0].appendChild(fonts); document.getElementsByClassName('fontManager')[0].style.display = 'inline-block'; Globals.pageHandler.progressLoader.hide();},5500);
    }
}

}